"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import MathRender from "@/app/components/Math";
import { LogoMark } from "@/app/components/Logo";
import SiteNav from "@/app/components/SiteNav";
import AuthGate from "@/app/components/AuthGate";
import { useAuth } from "@/app/components/AuthProvider";
import { planLabel, type PlanTier } from "@/lib/plans";
import {
  createConversation,
  deleteConversation,
  listConversations,
  titleFromFirstMessage,
  updateConversation,
  type StoredConversation,
} from "@/lib/chatStore";
import { bumpStreak } from "@/lib/streaks";

type UploadImage = { mediaType: string; data: string; thumb: string };
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
    <main className="flex h-screen bg-paper text-body">
      <AuthGate>
        <ChatInner />
      </AuthGate>
    </main>
  );
}

function ChatInner() {
  const { user, getIdToken, plan } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState(() => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    const q = url.searchParams.get("q");
    if (q) {
      url.searchParams.delete("q");
      window.history.replaceState(null, "", url.toString());
      return q;
    }
    return "";
  });
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState("");
  const [limitHit, setLimitHit] = useState(false);
  const [tokensRemaining, setTokensRemaining] = useState<number | null>(null);
  const [resetMinutes, setResetMinutes] = useState<number | null>(null);
  const [historyOpen, setHistoryOpen] = useState(true);
  const [conversations, setConversations] = useState<StoredConversation[]>([]);
  const [currentConvId, setCurrentConvId] = useState<string | null>(null);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const url = new URL(window.location.href);
    const p = url.searchParams.get("project");
    return p && /^[A-Za-z0-9_-]{6,64}$/.test(p) ? p : null;
  });
  const [thinking, setThinking] = useState(false);
  const [pendingImages, setPendingImages] = useState<UploadImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          next,
          currentProjectId
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

  async function handleImagePick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    e.target.value = ""; // allow re-selecting the same file
    if (plan === "learner") {
      setError("Image uploads are a Pro feature. Upgrade to attach photos.");
      return;
    }
    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} is over 5MB. Try a smaller image.`);
        continue;
      }
      const data = await new Promise<string>((resolve) => {
        const r = new FileReader();
        r.onload = () => resolve((r.result as string).split(",")[1] || "");
        r.readAsDataURL(file);
      });
      const thumb = `data:${file.type};base64,${data}`;
      setPendingImages((imgs) => [
        ...imgs,
        { mediaType: file.type, data, thumb },
      ]);
    }
  }

  function removeImage(idx: number) {
    setPendingImages((imgs) => imgs.filter((_, i) => i !== idx));
  }

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if ((!content && pendingImages.length === 0) || loading || streaming) return;

    if (user?.uid) void bumpStreak(user.uid);
    const imagesForMessage = pendingImages;
    const visibleContent = content + (imagesForMessage.length > 0
      ? `\n\n[${imagesForMessage.length} image${imagesForMessage.length === 1 ? "" : "s"} attached]`
      : "");
    const withUser: Msg[] = [...messages, { role: "user", content: visibleContent || "[image]" }];
    const withPlaceholder: Msg[] = [
      ...withUser,
      { role: "assistant", content: "", streaming: true },
    ];
    setMessages(withPlaceholder);
    setInput("");
    setPendingImages([]);
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
        body: JSON.stringify({
          messages: withUser,
          thinking: plan !== "learner" && thinking,
          ...(pendingImages.length > 0
            ? {
                images: pendingImages.map((i) => ({
                  mediaType: i.mediaType,
                  data: i.data,
                })),
              }
            : {}),
        }),
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

  async function buy(
    checkoutPlan:
      | "pro-monthly"
      | "pro-sixmonth"
      | "hacker-monthly"
      | "hacker-sixmonth" = "pro-monthly"
  ) {
    const token = await getIdToken();
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ plan: checkoutPlan }),
    });
    const { url, error } = await res.json();
    if (url) window.location.href = url;
    else alert(error || "Checkout isn't wired up yet.");
  }

  const [convSearch, setConvSearch] = useState("");
  const filteredConversations = convSearch.trim()
    ? conversations.filter((c) =>
        c.title.toLowerCase().includes(convSearch.trim().toLowerCase())
      )
    : conversations;

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* LEFT SIDEBAR — persistent ChatGPT-style nav */}
      <aside
        className={`shrink-0 border-r border-hair bg-[#f5f3ed] transition-all duration-200 ease-out ${
          historyOpen ? "w-64" : "w-14"
        } overflow-hidden`}
      >
        {historyOpen ? (
          <ExpandedSidebar
            userEmail={user?.email}
            conversations={filteredConversations}
            currentConvId={currentConvId}
            convSearch={convSearch}
            setConvSearch={setConvSearch}
            startNewChat={startNewChat}
            openConversation={openConversation}
            removeConversation={removeConversation}
            collapse={() => setHistoryOpen(false)}
          />
        ) : (
          <CollapsedSidebar
            startNewChat={startNewChat}
            expand={() => setHistoryOpen(true)}
          />
        )}
      </aside>

      {/* Main chat column */}
      <div className="flex flex-1 flex-col">
        {/* Thin top strip: breadcrumb + current chat title + link to study */}
        <div className="flex items-center justify-between border-b border-hair bg-white px-6 py-3">
          <div className="text-xs text-muted">
            {currentConvId ? "Editing saved chat" : "New chat"}
          </div>
          <a href="/study" className="text-xs text-muted hover:text-ink">
            ← Study tool
          </a>
        </div>

        {/* MESSAGES */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            // Empty state: vertically + horizontally centered hero
            <div className="mx-auto flex min-h-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
              <div className="animate-slideInUp w-full">
                <h1 className="font-serif text-4xl font-normal leading-[1.15] text-ink sm:text-5xl">
                  What are you stuck on?
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-muted">
                  Paste a problem, describe your confusion, or ask a
                  conceptual question. Math renders in LaTeX. Responses stream
                  in real time.
                </p>
                <div className="mt-10 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                  Try one of these
                </div>
                <div className="mx-auto mt-3 grid max-w-2xl gap-2 sm:grid-cols-2">
                  {STARTERS.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      style={{ animationDelay: `${80 + i * 60}ms` }}
                      className="animate-fadeUpSm group rounded-md border border-hair bg-white p-4 text-left text-sm text-body hover:-translate-y-0.5 hover:border-orange hover:bg-orange-tint hover:shadow-[0_2px_0_rgba(0,0,0,0.02),0_10px_24px_-10px_rgba(194,65,12,0.25)]"
                    >
                      <span className="text-muted group-hover:text-orange-ink">→</span>{" "}
                      <MathRender auto>{s}</MathRender>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl px-6 pb-8 pt-10">
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
            </div>
          )}

          {error && (
            <div className="mx-auto max-w-4xl px-6 pb-6">
              <div
                className={`animate-fadeUpSm rounded-md border p-4 text-sm ${
                  limitHit
                    ? "border-orange/40 bg-orange-tint text-orange-ink"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}
              >
                <div>{error}</div>
                {limitHit && plan === "learner" && (
                  <button onClick={() => buy("pro-monthly")} className="btn-link mt-2">
                    Upgrade to Pro - $16/month →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* COMPOSER */}
        <div className="bg-white pb-6 pt-4">
          <div className="mx-auto max-w-3xl px-6">
            {pendingImages.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2 rounded-lg border border-hair bg-offwhite p-2">
                {pendingImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative h-16 w-16 overflow-hidden rounded border border-hair"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.thumb}
                      alt={`attachment ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      aria-label="Remove image"
                      className="absolute right-0.5 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-black/60 text-[10px] text-white hover:bg-black/80"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div
              className={`animate-fadeUp relative flex items-center gap-2.5 rounded-[28px] border border-white/10 bg-[#1f1f22] px-3.5 py-3 shadow-[0_16px_50px_-16px_rgba(0,0,0,0.45)] transition-all focus-within:border-white/20 focus-within:shadow-[0_18px_60px_-16px_rgba(0,0,0,0.6)] ${
                loading || streaming ? "opacity-95" : ""
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagePick}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => {
                  if (plan === "learner") {
                    setError("Image uploads are a Pro feature. Upgrade to attach photos of your work.");
                    return;
                  }
                  fileInputRef.current?.click();
                }}
                disabled={streaming || loading}
                aria-label="Attach image"
                title={plan === "learner" ? "Upload images (Pro feature)" : "Attach an image"}
                className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white active:scale-95 disabled:opacity-40"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M21 12.5 12.5 21a5.5 5.5 0 0 1-7.8-7.8L13 5a4 4 0 1 1 5.7 5.7l-8.5 8.5a2.5 2.5 0 1 1-3.5-3.5L14 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {plan === "learner" && (
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-500" />
                )}
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
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 px-2 text-center text-[11px] text-muted">
              <span>{planStatus(plan)}</span>
              {plan !== "learner" && (
                <>
                  <span className="text-dim">·</span>
                  <button
                    type="button"
                    onClick={() => setThinking((v) => !v)}
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] transition ${
                      thinking
                        ? "bg-amber-500 text-white"
                        : "border border-hair bg-white text-muted hover:text-ink"
                    }`}
                    title={
                      thinking
                        ? "Thinking mode on — uses a stronger model, counts extra tokens"
                        : "Turn on Thinking mode for hard problems"
                    }
                  >
                    <span aria-hidden="true">{thinking ? "✨" : "○"}</span>
                    Thinking {thinking ? "on" : "off"}
                  </button>
                </>
              )}
              {tokensRemaining !== null && (
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
          <div className="whitespace-pre-wrap">
            <MathRender auto>{content}</MathRender>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="animate-messageIn flex gap-3">
      <div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-orange/40 bg-orange-tint text-orange-ink">
        <LogoMark size={15} className="text-orange-ink" />
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
            <MathRender auto>{content}</MathRender>
            {streaming && <span className="stream-cursor" aria-hidden="true" />}
          </>
        )}
      </div>
    </div>
  );
}

function planStatus(plan: PlanTier): string {
  switch (plan) {
    case "pro":
      return `${planLabel(plan)} · 20k tokens / day`;
    case "hacker":
      return `${planLabel(plan)} · 80k tokens / day · priority traffic`;
    default:
      return `${planLabel(plan)} · 10k tokens / day`;
  }
}

function SidebarItem({
  href,
  onClick,
  icon,
  label,
  active,
}: {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  const cls = `flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[14px] transition-colors ${
    active ? "bg-white text-ink" : "text-body hover:bg-white/60 hover:text-ink"
  }`;
  if (href) {
    return (
      <a href={href} className={cls}>
        <span className="h-4 w-4 shrink-0 text-muted">{icon}</span>
        <span className="truncate">{label}</span>
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      <span className="h-4 w-4 shrink-0 text-muted">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}

function ExpandedSidebar({
  userEmail,
  conversations,
  currentConvId,
  convSearch,
  setConvSearch,
  startNewChat,
  openConversation,
  removeConversation,
  collapse,
}: {
  userEmail: string | null | undefined;
  conversations: StoredConversation[];
  currentConvId: string | null;
  convSearch: string;
  setConvSearch: (v: string) => void;
  startNewChat: () => void;
  openConversation: (c: StoredConversation) => void;
  removeConversation: (c: StoredConversation) => void;
  collapse: () => void;
}) {
  return (
    <div className="flex h-full w-64 flex-col">
      {/* Logo + collapse */}
      <div className="flex items-center justify-between px-3 py-4">
        <a href="/" className="flex items-center gap-2 px-1 text-sm font-medium text-ink">
          <svg width="20" height="18" viewBox="0 0 44 32" fill="none" className="text-ink">
            <path d="M6 7.5C9.6 5.2 13.8 4 18.6 4C20.4 4 21.8 5.4 21.8 7.2V27.5C17.2 27.5 12.2 28.7 6 31V7.5Z" fill="currentColor" fillOpacity="0.08" />
            <path d="M38 7.5C34.4 5.2 30.2 4 25.4 4C23.6 4 22.2 5.4 22.2 7.2V27.5C26.8 27.5 31.8 28.7 38 31V7.5Z" fill="currentColor" fillOpacity="0.08" />
            <path d="M6 7.5C9.6 5.2 13.8 4 18.6 4C20.4 4 21.8 5.4 21.8 7.2V27.5C17.2 27.5 12.2 28.7 6 31V7.5Z M38 7.5C34.4 5.2 30.2 4 25.4 4C23.6 4 22.2 5.4 22.2 7.2V27.5C26.8 27.5 31.8 28.7 38 31V7.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <span>FinalsPrep</span>
        </a>
        <button
          onClick={collapse}
          className="rounded p-1 text-muted hover:bg-white/60 hover:text-ink"
          title="Collapse sidebar"
          aria-label="Collapse sidebar"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
            <path d="M9 4v16" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </button>
      </div>

      <div className="px-2">
        <button
          onClick={startNewChat}
          className="mb-2 flex w-full items-center gap-3 rounded-lg border border-hair bg-white px-3 py-2 text-[14px] font-medium text-ink hover:border-orange"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-muted">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          New chat
        </button>
        <div className="relative mb-3">
          <svg
            className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={convSearch}
            onChange={(e) => setConvSearch(e.target.value)}
            placeholder="Search chats"
            className="w-full rounded-lg border border-hair bg-white px-7 py-1.5 text-[13px] text-ink placeholder-dim outline-none focus:border-orange"
          />
        </div>
      </div>

      <nav className="flex flex-col gap-0.5 px-2">
        <SidebarItem
          href="/projects"
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          }
          label="Projects"
        />
        <SidebarItem
          href="/interactives"
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 17l4-4 4 4 6-6 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7" cy="13" r="1.5" fill="currentColor" />
              <circle cx="17" cy="11" r="1.5" fill="currentColor" />
            </svg>
          }
          label="Interactives"
        />
        <SidebarItem
          href="/review"
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M8 10h8M8 14h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          }
          label="Review bank"
        />
        <SidebarItem
          href="/insights"
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 20V10m6 10V4m6 16v-8m6 8v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          }
          label="Insights"
        />
        <SidebarItem
          href="/schedule"
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          }
          label="Schedule"
        />
        <SidebarItem
          href="/shop"
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 7h14l-1.5 11a2 2 0 0 1-2 1.8h-7a2 2 0 0 1-2-1.8L5 7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M9 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          }
          label="Shop tokens"
        />
      </nav>

      {/* Recents */}
      <div className="mt-4 flex min-h-0 flex-1 flex-col">
        <div className="px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
          Recents
        </div>
        <div className="flex-1 overflow-y-auto px-2">
          {conversations.length === 0 ? (
            <div className="px-3 py-2 text-[12px] text-muted">
              No chats yet.
            </div>
          ) : (
            <ul className="space-y-0.5">
              {conversations.map((c) => (
                <li key={c.id}>
                  <div className="group flex items-center gap-1">
                    <button
                      onClick={() => openConversation(c)}
                      className={`flex-1 truncate rounded-lg px-3 py-1.5 text-left text-[13px] ${
                        currentConvId === c.id
                          ? "bg-white font-medium text-ink"
                          : "text-body hover:bg-white/60 hover:text-ink"
                      }`}
                    >
                      {c.title}
                    </button>
                    <button
                      onClick={() => removeConversation(c)}
                      className="opacity-0 transition-opacity hover:text-red-600 group-hover:opacity-100"
                      aria-label="Delete"
                      title="Delete"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Footer: account */}
      <div className="mt-auto border-t border-hair px-3 py-3">
        <a
          href="/account"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] text-muted hover:bg-white/60 hover:text-ink"
          title={userEmail || ""}
        >
          <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange-tint text-[10px] font-medium text-orange-ink">
            {(userEmail || "?").charAt(0).toUpperCase()}
          </div>
          <span className="truncate">{userEmail || "Account"}</span>
        </a>
      </div>
    </div>
  );
}

function CollapsedSidebar({
  startNewChat,
  expand,
}: {
  startNewChat: () => void;
  expand: () => void;
}) {
  return (
    <div className="flex h-full w-14 flex-col items-center gap-3 py-4">
      <button
        onClick={expand}
        className="rounded p-2 text-muted hover:bg-white/60 hover:text-ink"
        title="Expand sidebar"
        aria-label="Expand sidebar"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9 4v16" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </button>
      <button
        onClick={startNewChat}
        className="rounded p-2 text-muted hover:bg-white/60 hover:text-ink"
        title="New chat"
        aria-label="New chat"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <a
        href="/projects"
        className="rounded p-2 text-muted hover:bg-white/60 hover:text-ink"
        title="Projects"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      </a>
      <a
        href="/interactives"
        className="rounded p-2 text-muted hover:bg-white/60 hover:text-ink"
        title="Interactives"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M3 17l4-4 4 4 6-6 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <a
        href="/review"
        className="rounded p-2 text-muted hover:bg-white/60 hover:text-ink"
        title="Review bank"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}
