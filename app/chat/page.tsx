"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import MathRender from "@/app/components/Math";
import SiteNav from "@/app/components/SiteNav";
import AuthGate from "@/app/components/AuthGate";
import { useAuth } from "@/app/components/AuthProvider";
import {
  createConversation,
  deleteConversation,
  listConversations,
  titleFromFirstMessage,
  updateConversation,
  type StoredConversation,
} from "@/lib/chatStore";

type Msg = { role: "user" | "assistant"; content: string; streaming?: boolean };

function formatMinutes(mins: number): string {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

const STARTERS = [
  "Solve 2x^2 - 5x - 3 = 0 and show me the factoring trick",
  "How do I set up a related rates problem? Use a ladder sliding down a wall.",
  "Explain u-substitution on $\\int 2x(x^2+1)^3\\,dx$ step by step",
  "A 5 kg box on a 30° incline with friction μ = 0.2 - find the acceleration",
];

export default function ChatPage() {
  return (
    <main className="flex h-screen flex-col bg-paper text-body">
      <SiteNav maxWidth="max-w-6xl">
        <a href="/study" className="nav-link">Study</a>
        <a href="/" className="nav-link">Home</a>
      </SiteNav>
      <AuthGate>
        <ChatInner />
      </AuthGate>
    </main>
  );
}

function ChatInner() {
  const { user, getIdToken, plan } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState("");
  const [limitHit, setLimitHit] = useState(false);
  const [tokensRemaining, setTokensRemaining] = useState<number | null>(null);
  const [resetMinutes, setResetMinutes] = useState<number | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [conversations, setConversations] = useState<StoredConversation[]>([]);
  const [currentConvId, setCurrentConvId] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const [listening, setListening] = useState(false);
  const [voiceUnsupported, setVoiceUnsupported] = useState(false);

  // Load past conversations once user is ready
  useEffect(() => {
    if (!user) return;
    listConversations(user.uid).then(setConversations).catch(() => {});
  }, [user]);

  // Smooth auto-scroll on new content
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const resize = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, []);
  useEffect(() => {
    resize();
  }, [input, resize]);

  async function persist(next: Msg[]) {
    if (!user) return;
    try {
      if (!currentConvId) {
        const id = await createConversation(
          user.uid,
          titleFromFirstMessage(next),
          next
        );
        setCurrentConvId(id);
      } else {
        await updateConversation(
          user.uid,
          currentConvId,
          next,
          titleFromFirstMessage(next)
        );
      }
      const list = await listConversations(user.uid);
      setConversations(list);
    } catch (e) {
      console.warn("Failed to persist conversation", e);
    }
  }

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading || streaming) return;

    const withUser: Msg[] = [...messages, { role: "user", content }];
    const withPlaceholder: Msg[] = [
      ...withUser,
      { role: "assistant", content: "", streaming: true },
    ];
    setMessages(withPlaceholder);
    setInput("");
    setLoading(true);
    setError("");
    setLimitHit(false);

    try {
      const token = await getIdToken();
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ messages: withUser }),
      });

      if (!res.ok) {
        let data: any = {};
        try {
          data = await res.json();
        } catch {}
        if (data?.limitReached) setLimitHit(true);
        setError(data?.message || data?.error || "Something went wrong.");
        if (typeof data?.tokensRemaining === "number") setTokensRemaining(data.tokensRemaining);
        if (typeof data?.resetMinutes === "number") setResetMinutes(data.resetMinutes);
        setMessages((ms) => ms.slice(0, -1));
        return;
      }

      const tr = res.headers.get("X-Tokens-Remaining");
      if (tr !== null && tr !== "") setTokensRemaining(parseInt(tr, 10));
      const rm = res.headers.get("X-Reset-Minutes");
      if (rm !== null && rm !== "") setResetMinutes(parseInt(rm, 10));

      const reader = res.body?.getReader();
      if (!reader) {
        setError("No response body.");
        return;
      }
      const decoder = new TextDecoder();
      setStreaming(true);
      setLoading(false);
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        acc += chunk;
        setMessages((ms) => {
          const next = [...ms];
          const last = next[next.length - 1];
          if (!last || last.role !== "assistant") return ms;
          next[next.length - 1] = { ...last, content: acc, streaming: true };
          return next;
        });
      }
      const finalMessages: Msg[] = [
        ...withUser,
        { role: "assistant", content: acc, streaming: false },
      ];
      setMessages(finalMessages);
      persist(finalMessages);
    } catch (e: any) {
      setError(e?.message || "Network error.");
      setMessages((ms) =>
        ms[ms.length - 1]?.role === "assistant" && ms[ms.length - 1]?.content === ""
          ? ms.slice(0, -1)
          : ms
      );
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  }

  function startNewChat() {
    setMessages([]);
    setCurrentConvId(null);
    setError("");
    setLimitHit(false);
  }

  async function openConversation(c: StoredConversation) {
    setMessages(c.messages.map((m) => ({ role: m.role, content: m.content })));
    setCurrentConvId(c.id);
    setHistoryOpen(false);
    setError("");
  }

  async function removeConversation(c: StoredConversation) {
    if (!user) return;
    if (!confirm(`Delete "${c.title}"?`)) return;
    try {
      await deleteConversation(user.uid, c.id);
      setConversations((list) => list.filter((x) => x.id !== c.id));
      if (currentConvId === c.id) startNewChat();
    } catch {}
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function toggleMic() {
    if (listening) {
      try {
        recognitionRef.current?.stop();
      } catch {}
      setListening(false);
      return;
    }
    const SR: any =
      (typeof window !== "undefined" && (window as any).SpeechRecognition) ||
      (typeof window !== "undefined" && (window as any).webkitSpeechRecognition);
    if (!SR) {
      setVoiceUnsupported(true);
      setError(
        "Voice input isn't supported in this browser. Chrome, Edge, or Safari work best."
      );
      return;
    }
    try {
      const rec = new SR();
      rec.lang = "en-US";
      rec.continuous = false;
      rec.interimResults = true;
      rec.maxAlternatives = 1;
      let finalText = "";
      rec.onresult = (event: any) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const res = event.results[i];
          if (res.isFinal) finalText += res[0].transcript;
          else interim += res[0].transcript;
        }
        setInput(() => (finalText + interim).replace(/\s+/g, " ").trimStart());
      };
      rec.onerror = (e: any) => {
        setListening(false);
        if (e?.error && e.error !== "no-speech" && e.error !== "aborted") {
          setError(`Voice error: ${e.error}`);
        }
      };
      rec.onend = () => {
        setListening(false);
        setTimeout(() => inputRef.current?.focus(), 0);
      };
      recognitionRef.current = rec;
      rec.start();
      setListening(true);
      setError("");
    } catch (e: any) {
      setListening(false);
      setError(e?.message || "Could not start voice input.");
    }
  }

  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.stop();
      } catch {}
    };
  }, []);

  async function buy(planKind: "monthly" | "yearly" = "monthly") {
    const token = await getIdToken();
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ plan: planKind }),
    });
    const { url, error } = await res.json();
    if (url) window.location.href = url;
    else alert(error || "Checkout isn't wired up yet.");
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* History sidebar */}
      <aside
        className={`shrink-0 border-r border-hair bg-offwhite transition-all duration-300 ease-out ${
          historyOpen ? "w-72" : "w-0"
        } overflow-hidden`}
      >
        <div className="flex h-full w-72 flex-col">
          <div className="flex items-center justify-between border-b border-hair px-4 py-3">
            <div className="label">History</div>
            <button
              onClick={startNewChat}
              className="rounded-md border border-hair bg-white px-2 py-1 text-xs text-ink hover:border-rule hover:bg-offwhite"
            >
              + New
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-4 text-xs text-muted">
                No conversations yet. Start a new chat to see it here.
              </div>
            ) : (
              <ul className="space-y-0.5 p-2">
                {conversations.map((c) => (
                  <li key={c.id}>
                    <div className="group flex items-center gap-1">
                      <button
                        onClick={() => openConversation(c)}
                        className={`flex-1 truncate rounded-md px-3 py-2 text-left text-sm transition-colors ${
                          currentConvId === c.id
                            ? "bg-white font-medium text-ink shadow-sm"
                            : "text-body hover:bg-white"
                        }`}
                      >
                        {c.title}
                      </button>
                      <button
                        onClick={() => removeConversation(c)}
                        className="opacity-0 transition-opacity hover:text-red-600 group-hover:opacity-100"
                        aria-label="Delete conversation"
                        title="Delete"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M6 6l12 12M6 18L18 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-t border-hair px-4 py-3 text-xs text-muted">
            Signed in as <span className="text-ink">{user?.email}</span>
          </div>
        </div>
      </aside>

      {/* Main chat column */}
      <div className="flex flex-1 flex-col">
        {/* Header with history toggle */}
        <div className="border-b border-hair bg-white">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-2">
            <button
              onClick={() => setHistoryOpen((v) => !v)}
              className="inline-flex items-center gap-2 text-xs text-muted hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {historyOpen ? "Hide history" : "History"}
            </button>
            <div className="text-xs text-muted">
              {currentConvId ? "Editing saved chat" : "New chat"}
            </div>
          </div>
        </div>

        {/* MESSAGES */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-6 py-8">
            {messages.length === 0 ? (
              <div className="animate-slideInUp py-12">
                <h1 className="font-serif text-4xl font-normal leading-tight text-ink sm:text-5xl">
                  What are you stuck on?
                </h1>
                <p className="mt-3 max-w-xl text-muted">
                  Paste a problem, describe your confusion, or ask a
                  conceptual question. Math renders in LaTeX. Responses stream
                  in real time. Your conversations are saved to your account.
                </p>
                <div className="mt-8 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                  Try one of these
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {STARTERS.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      style={{ animationDelay: `${80 + i * 60}ms` }}
                      className="animate-fadeUpSm group rounded-md border border-hair bg-white p-4 text-left text-sm text-body hover:-translate-y-0.5 hover:border-orange hover:bg-orange-tint hover:shadow-[0_2px_0_rgba(0,0,0,0.02),0_10px_24px_-10px_rgba(194,65,12,0.25)]"
                    >
                      <span className="text-muted group-hover:text-orange-ink">→</span>{" "}
                      <MathRender>{s}</MathRender>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {messages.map((m, i) => (
                  <Message
                    key={i}
                    role={m.role}
                    content={m.content}
                    streaming={m.streaming}
                    isLastAssistantEmpty={
                      m.role === "assistant" && i === messages.length - 1 && m.content === ""
                    }
                  />
                ))}
              </div>
            )}

            {error && (
              <div
                className={`animate-fadeUpSm mt-6 rounded-md border p-4 text-sm ${
                  limitHit
                    ? "border-orange/40 bg-orange-tint text-orange-ink"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}
              >
                <div>{error}</div>
                {limitHit && (
                  <button onClick={() => buy("monthly")} className="btn-link mt-2">
                    Unlock unlimited - $9/month →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* COMPOSER */}
        <div className="bg-white pb-6 pt-4">
          <div className="mx-auto max-w-3xl px-6">
            <div
              className={`animate-fadeUp relative flex items-center gap-2.5 rounded-[28px] border border-white/10 bg-[#1f1f22] px-3.5 py-3 shadow-[0_16px_50px_-16px_rgba(0,0,0,0.45)] transition-all focus-within:border-white/20 focus-within:shadow-[0_18px_60px_-16px_rgba(0,0,0,0.6)] ${
                loading || streaming ? "opacity-95" : ""
              }`}
            >
              <button
                type="button"
                onClick={startNewChat}
                disabled={streaming || loading || messages.length === 0}
                aria-label="Start a new chat"
                title="New chat"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white active:scale-95 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-white/70"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                rows={1}
                placeholder="Ask anything…"
                className="flex-1 resize-none self-center overflow-y-auto bg-transparent px-2 py-2.5 font-sans text-[15.5px] leading-6 text-white placeholder-white/40 outline-none"
                disabled={loading || streaming}
                style={{ minHeight: 40, maxHeight: 180 }}
              />

              <button
                type="button"
                onClick={toggleMic}
                aria-label={listening ? "Stop recording" : "Start voice input"}
                title={listening ? "Stop recording" : "Speak your problem"}
                disabled={loading || streaming || voiceUnsupported}
                className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all active:scale-95 ${
                  listening
                    ? "bg-orange text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                } disabled:cursor-not-allowed disabled:opacity-40`}
              >
                {listening && (
                  <span className="absolute inset-0 rounded-full bg-orange/60 animate-ping" />
                )}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="relative">
                  <rect x="9" y="3" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => send()}
                disabled={loading || streaming || !input.trim()}
                aria-label="Send message"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-ink shadow-sm transition-all hover:-translate-y-[1px] hover:bg-white/95 hover:shadow-md active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:bg-white/30 disabled:text-ink/50 disabled:hover:translate-y-0"
              >
                {loading || streaming ? (
                  <span className="typing-dots" aria-label="sending">
                    <span /> <span /> <span />
                  </span>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
            <div className="mt-2 flex items-center justify-center gap-2 px-2 text-center text-[11px] text-muted">
              <span>
                {plan === "pro" ? "Pro plan · unlimited" : "Free plan · budget refills every 5h"}
              </span>
              {tokensRemaining !== null && plan !== "pro" && (
                <>
                  <span className="text-dim">·</span>
                  <span>
                    {tokensRemaining.toLocaleString()} tokens left
                    {resetMinutes && tokensRemaining === 0
                      ? ` (resets in ${formatMinutes(resetMinutes)})`
                      : ""}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Message({
  role,
  content,
  streaming,
  isLastAssistantEmpty,
}: {
  role: Msg["role"];
  content: string;
  streaming?: boolean;
  isLastAssistantEmpty?: boolean;
}) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="animate-messageIn max-w-[80%] rounded-2xl rounded-tr-sm bg-ink px-4 py-3 text-[15px] text-white">
          <div className="whitespace-pre-wrap">{content}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="animate-messageIn flex gap-3">
      <div className="mt-1 h-7 w-7 shrink-0 rounded-full border border-orange/40 bg-orange-tint text-center font-serif text-sm leading-7 text-orange-ink">
        ∫
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-hair bg-white px-5 py-4 text-[15.5px] leading-relaxed text-body">
        {isLastAssistantEmpty ? (
          <div className="flex items-center gap-2 text-muted">
            <span className="typing-dots">
              <span /> <span /> <span />
            </span>
            <span className="text-xs">thinking through it…</span>
          </div>
        ) : (
          <>
            <MathRender>{content}</MathRender>
            {streaming && <span className="stream-cursor" aria-hidden="true" />}
          </>
        )}
      </div>
    </div>
  );
}
