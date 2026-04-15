"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import MathRender from "@/app/components/Math";
import { LogoMark } from "@/app/components/Logo";
import AuthGate from "@/app/components/AuthGate";
import { useAuth } from "@/app/components/AuthProvider";
import {
  BuyProButton,
  NavUserArea,
  ThemePicker,
} from "@/app/components/SiteNav";
import {
  AI_MODE_OPTIONS,
  AI_PERSONALITY_OPTIONS,
  AI_VERBOSITY_OPTIONS,
  DEFAULT_AI_PREFS,
  normalizeAiPrefs,
  type AiPrefs,
} from "@/lib/aiPrefs";
import { getDb } from "@/lib/firebase";
import { planLabel, type PlanTier } from "@/lib/plans";
import {
  createConversation,
  deleteConversation,
  listConversations,
  listConversationsInProject,
  titleFromFirstMessage,
  updateConversation,
  type StoredConversation,
} from "@/lib/chatStore";
import { bumpStreak } from "@/lib/streaks";
import {
  createProject,
  deleteProject,
  listProjects,
  type Project,
} from "@/lib/projects";

type UploadImage = { mediaType: string; data: string; thumb: string };
type Msg = { role: "user" | "assistant"; content: string; streaming?: boolean };

type ChatExtensionKey =
  | "interactives"
  | "review"
  | "insights"
  | "schedule"
  | "shop";

const CHAT_EXTENSIONS: Record<
  ChatExtensionKey,
  { title: string; path: string }
> = {
  interactives: { title: "Interactives", path: "/interactives" },
  review: { title: "Review bank", path: "/review" },
  insights: { title: "Insights", path: "/insights" },
  schedule: { title: "Schedule", path: "/schedule" },
  shop: { title: "Shop tokens", path: "/shop" },
};

function formatMinutes(mins: number): string {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

const STARTERS = [
  "Solve 2x^2 - 5x - 3 = 0 by factoring and walk me through the reasoning.",
  "Set up a related rates problem: a 5 m ladder slides down a wall at 0.2 m/s — how fast is the base moving when the top is 3 m high?",
  "Walk me through u-substitution on the integral from 0 to 1 of 2x(x^2 + 1)^3 dx.",
  "A 5 kg box on a 30 degree incline has friction coefficient 0.2. Find the acceleration down the incline.",
  "Explain Hardy-Weinberg equilibrium and why the five assumptions usually fail in real populations.",
  "How did the Columbian Exchange reshape both the Americas and Afro-Eurasia between 1450 and 1700?",
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
  const [aiPrefs, setAiPrefs] = useState<AiPrefs>(DEFAULT_AI_PREFS);
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
  const [currentProjectName, setCurrentProjectName] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsOverlayOpen, setProjectsOverlayOpen] = useState(false);
  const [extensionOverlay, setExtensionOverlay] =
    useState<ChatExtensionKey | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Keep projects list fresh for the overlay.
  useEffect(() => {
    if (!user) return;
    listProjects(user.uid).then(setProjects).catch(() => {});
  }, [user]);

  const selectProject = useCallback((id: string | null) => {
    setCurrentProjectId(id);
    setCurrentConvId(null);
    setMessages([]);
  }, []);

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

  useEffect(() => {
    if (!user) {
      setAiPrefs(DEFAULT_AI_PREFS);
      return;
    }
    const db = getDb();
    if (!db) {
      setAiPrefs(DEFAULT_AI_PREFS);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid, "profile", "prefs"));
        if (cancelled) return;
        setAiPrefs(normalizeAiPrefs((snap.data() as Partial<AiPrefs> | undefined) ?? null));
      } catch {
        if (!cancelled) setAiPrefs(DEFAULT_AI_PREFS);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Resolve project name when a project is selected
  useEffect(() => {
    if (!user || !currentProjectId) {
      setCurrentProjectName(null);
      return;
    }
    let cancelled = false;
    listProjects(user.uid)
      .then((list) => {
        if (cancelled) return;
        const match = list.find((p) => p.id === currentProjectId);
        setCurrentProjectName(match?.name ?? null);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [user, currentProjectId]);


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
          aiPrefs,
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
  const activeConversation =
    currentConvId
      ? conversations.find((c) => c.id === currentConvId) ?? null
      : null;
  const draftTitle = titleFromFirstMessage(
    messages.map(({ role, content }) => ({ role, content }))
  );
  const chatTitle = activeConversation?.title?.trim() || draftTitle || "New chat";
  const chatStatus = currentConvId
    ? "Saved chat"
    : messages.length > 0
      ? "Draft chat"
      : "New chat";
  const chatSubtitle = currentProjectName
    ? "This conversation stays inside the current project context."
    : messages.length > 0
      ? "Keep the thread going or start a fresh one from the sidebar."
      : "Ask a question, paste a problem, or attach an image to get started.";

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
            onOpenProjects={() => setProjectsOverlayOpen(true)}
            onOpenExtension={(k) => setExtensionOverlay(k)}
            onOpenSettings={() => setSettingsOpen(true)}
            currentProjectName={currentProjectName}
          />
        ) : (
          <CollapsedSidebar
            startNewChat={startNewChat}
            expand={() => setHistoryOpen(true)}
            onOpenProjects={() => setProjectsOverlayOpen(true)}
            onOpenExtension={(k) => setExtensionOverlay(k)}
          />
        )}
      </aside>

      {/* Main chat column */}
      <div className="flex flex-1 flex-col">
        <div className="border-b border-hair bg-paper px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <a
                href="/"
                className="inline-flex shrink-0 items-center gap-2.5 text-ink"
                title="FinalsPrep home"
              >
                <LogoMark size={24} className="text-ink" />
                <span className="hidden items-baseline gap-1 sm:inline-flex">
                  <span className="text-sm font-semibold">FinalsPrep</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
                    Chat
                  </span>
                </span>
              </a>
              <div className="hidden h-5 w-px bg-hair md:block" />
              <div className="hidden items-center gap-4 text-sm md:flex">
                <a href="/" className="nav-link" title="FinalsPrep home">
                  Home
                </a>
                <a href="/study" className="nav-link" title="Study tool">
                  Study
                </a>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 text-sm sm:gap-4">
              <ThemePicker />
              <BuyProButton />
              <NavUserArea />
            </div>
          </div>
        </div>

        <div className="border-b border-hair bg-offwhite/60 px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                <div className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M7 8h10M7 12h7M7 16h10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 4h16v16H4z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{chatStatus}</span>
                </div>
              </div>
              <h1 className="mt-2 max-w-3xl break-words font-serif text-2xl font-normal leading-tight text-ink sm:text-[2rem]">
                {chatTitle}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-muted">{chatSubtitle}</p>
            </div>

            {currentProjectName && (
              <button
                onClick={() => setProjectsOverlayOpen(true)}
                className="animate-fadeUp inline-flex min-w-0 max-w-full items-center gap-1.5 self-start rounded-full border border-orange/40 bg-orange-tint px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-orange-ink hover:border-orange hover:bg-orange/20 sm:max-w-[260px]"
                title={`Project: ${currentProjectName}`}
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-3 w-3 shrink-0"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h3.086a1.5 1.5 0 0 1 1.06.44L7.707 3.29a.5.5 0 0 0 .354.146H13.5A1.5 1.5 0 0 1 15 4.935V12.5A1.5 1.5 0 0 1 13.5 14h-11A1.5 1.5 0 0 1 1 12.5v-9Z" />
                </svg>
                <span className="truncate normal-case tracking-normal">
                  {currentProjectName}
                </span>
              </button>
            )}
          </div>
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
            {plan !== "learner" && (
              <div className="mt-2 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setThinking((v) => !v)}
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] transition ${
                    thinking
                      ? "bg-amber-500 text-white"
                      : "border border-hair bg-paper text-muted hover:text-ink"
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
              </div>
            )}
          </div>
        </div>
      </div>

      {projectsOverlayOpen && (
        <ProjectsOverlay
          uid={user?.uid ?? null}
          projects={projects}
          setProjects={setProjects}
          currentProjectId={currentProjectId}
          selectProject={selectProject}
          startNewChat={startNewChat}
          onClose={() => setProjectsOverlayOpen(false)}
        />
      )}

      {extensionOverlay && (
        <ChatExtensionOverlay
          ext={extensionOverlay}
          onClose={() => setExtensionOverlay(null)}
        />
      )}

      {settingsOpen && (
        <AiSettingsOverlay
          uid={user?.uid ?? null}
          initial={aiPrefs}
          onClose={() => setSettingsOpen(false)}
          onSaved={(next) => setAiPrefs(next)}
        />
      )}
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

function labelFor<T extends string>(
  options: Array<{ key: T; label: string }>,
  value: T
): string {
  return options.find((option) => option.key === value)?.label ?? value;
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
  onOpenProjects,
  onOpenExtension,
  onOpenSettings,
  currentProjectName,
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
  onOpenProjects: () => void;
  onOpenExtension: (key: ChatExtensionKey) => void;
  onOpenSettings: () => void;
  currentProjectName: string | null;
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
        <button
          onClick={onOpenProjects}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[14px] transition-colors ${
            currentProjectName
              ? "bg-white text-ink"
              : "text-body hover:bg-white/60 hover:text-ink"
          }`}
          title={currentProjectName ? `Current: ${currentProjectName}` : "Projects"}
        >
          <span className="h-4 w-4 shrink-0 text-muted">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="min-w-0 flex-1 truncate">
            {currentProjectName ? currentProjectName : "Projects"}
          </span>
          {currentProjectName && (
            <span
              className="rounded-full bg-orange-tint px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-orange-ink"
              aria-label="Active project"
            >
              on
            </span>
          )}
        </button>
        <SidebarItem
          onClick={() => onOpenExtension("interactives")}
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
          onClick={() => onOpenExtension("review")}
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M8 10h8M8 14h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          }
          label="Review bank"
        />
        <SidebarItem
          onClick={() => onOpenExtension("insights")}
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 20V10m6 10V4m6 16v-8m6 8v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          }
          label="Insights"
        />
        <SidebarItem
          onClick={() => onOpenExtension("schedule")}
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          }
          label="Schedule"
        />
        <SidebarItem
          onClick={() => onOpenExtension("shop")}
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

      {/* Footer: account + AI settings */}
      <div className="mt-auto border-t border-hair px-3 py-3">
        <div className="flex items-center gap-1">
          <a
            href="/account"
            className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] text-muted hover:bg-white/60 hover:text-ink"
            title={userEmail || ""}
          >
            <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange-tint text-[10px] font-medium text-orange-ink">
              {(userEmail || "?").charAt(0).toUpperCase()}
            </div>
            <span className="truncate">{userEmail || "Account"}</span>
          </a>
          <button
            onClick={onOpenSettings}
            className="shrink-0 rounded-lg p-1.5 text-muted hover:bg-white/60 hover:text-ink"
            aria-label="AI settings"
            title="AI settings"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.56V21a2 2 0 1 1-4 0v-.11a1.7 1.7 0 0 0-1.11-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1H3a2 2 0 1 1 0-4h.11a1.7 1.7 0 0 0 1.56-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.56V3a2 2 0 1 1 4 0v.11a1.7 1.7 0 0 0 1 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.56 1H21a2 2 0 1 1 0 4h-.11a1.7 1.7 0 0 0-1.56 1z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function CollapsedSidebar({
  startNewChat,
  expand,
  onOpenProjects,
  onOpenExtension,
}: {
  startNewChat: () => void;
  expand: () => void;
  onOpenProjects: () => void;
  onOpenExtension: (key: ChatExtensionKey) => void;
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
      <button
        onClick={onOpenProjects}
        className="rounded p-2 text-muted hover:bg-white/60 hover:text-ink"
        title="Projects"
        aria-label="Projects"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={() => onOpenExtension("interactives")}
        className="rounded p-2 text-muted hover:bg-white/60 hover:text-ink"
        title="Interactives"
        aria-label="Interactives"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M3 17l4-4 4 4 6-6 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={() => onOpenExtension("review")}
        className="rounded p-2 text-muted hover:bg-white/60 hover:text-ink"
        title="Review bank"
        aria-label="Review bank"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={() => onOpenExtension("schedule")}
        className="rounded p-2 text-muted hover:bg-white/60 hover:text-ink"
        title="Schedule"
        aria-label="Schedule"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

function ProjectsOverlay({
  uid,
  projects,
  setProjects,
  currentProjectId,
  selectProject,
  startNewChat,
  onClose,
}: {
  uid: string | null;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  currentProjectId: string | null;
  selectProject: (id: string | null) => void;
  startNewChat: () => void;
  onClose: () => void;
}) {
  const [openedId, setOpenedId] = useState<string | null>(currentProjectId);
  const [convs, setConvs] = useState<StoredConversation[]>([]);
  const [convsLoading, setConvsLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(projects.length === 0);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [busy, setBusy] = useState(false);

  const opened = openedId ? projects.find((p) => p.id === openedId) ?? null : null;

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Load conversations when a project is opened.
  useEffect(() => {
    if (!uid || !openedId) {
      setConvs([]);
      return;
    }
    let cancelled = false;
    setConvsLoading(true);
    listConversationsInProject(uid, openedId)
      .then((list) => {
        if (!cancelled) setConvs(list);
      })
      .catch(() => {
        if (!cancelled) setConvs([]);
      })
      .finally(() => {
        if (!cancelled) setConvsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [uid, openedId]);

  async function create() {
    if (!uid) return;
    const name = newName.trim();
    if (!name) return;
    setBusy(true);
    try {
      const id = await createProject(uid, name, newDesc);
      const next: Project = {
        id,
        name,
        description: newDesc.trim(),
        contextNotes: "",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setProjects((prev) => [next, ...prev]);
      setOpenedId(id);
      setNewName("");
      setNewDesc("");
      setShowCreate(false);
    } finally {
      setBusy(false);
    }
  }

  async function remove(p: Project) {
    if (!uid) return;
    if (
      !confirm(
        `Delete "${p.name}"? Conversations inside stay on your account but lose the project link.`
      )
    )
      return;
    await deleteProject(uid, p.id);
    setProjects((prev) => prev.filter((x) => x.id !== p.id));
    if (openedId === p.id) setOpenedId(null);
    if (currentProjectId === p.id) selectProject(null);
  }

  function useAsContext(p: Project) {
    selectProject(p.id);
    onClose();
  }

  function startInProject(p: Project) {
    selectProject(p.id);
    startNewChat();
    onClose();
  }

  return (
    <div
      className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Projects"
    >
      <div
        className="animate-scaleIn relative flex h-[min(88vh,720px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-hair bg-paper shadow-[0_40px_120px_-20px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-hair px-7 py-5">
          <div>
            <div className="label">Projects</div>
            <h2 className="mt-1 font-serif text-2xl font-normal text-ink">
              Group chats by what you're working on
            </h2>
            <p className="mt-1 max-w-xl text-[13px] text-muted">
              A project is a shared context for a series of chats. New chats
              started inside a project remember the project's notes.
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-full p-1.5 text-muted hover:bg-offwhite hover:text-ink"
            aria-label="Close"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
              <path d="M3.28 3.28a.75.75 0 0 1 1.06 0L8 6.94l3.66-3.66a.75.75 0 1 1 1.06 1.06L9.06 8l3.66 3.66a.75.75 0 1 1-1.06 1.06L8 9.06l-3.66 3.66a.75.75 0 0 1-1.06-1.06L6.94 8 3.28 4.34a.75.75 0 0 1 0-1.06Z" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[1fr_1.2fr]">
          {/* LEFT: list + create */}
          <div className="flex min-h-0 flex-col overflow-y-auto border-r border-hair px-5 py-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="label">Your projects</div>
              <button
                onClick={() => setShowCreate((v) => !v)}
                className="text-[12px] font-medium text-orange hover:text-orange-hover"
              >
                {showCreate ? "Cancel" : "+ New"}
              </button>
            </div>

            {showCreate && (
              <div className="mb-4 rounded-lg border border-hair bg-offwhite p-3">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Project name"
                  className="w-full rounded border border-hair bg-white px-3 py-2 text-[13px] text-ink outline-none focus:border-orange"
                  maxLength={120}
                  autoFocus
                />
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="What is this project for? (optional)"
                  className="mt-2 w-full resize-none rounded border border-hair bg-white px-3 py-2 text-[13px] text-ink outline-none focus:border-orange"
                  rows={3}
                  maxLength={500}
                />
                <button
                  onClick={create}
                  disabled={busy || !newName.trim()}
                  className="btn-primary mt-2 w-full justify-center text-[13px] disabled:opacity-50"
                >
                  {busy ? "Creating…" : "Create project"}
                </button>
              </div>
            )}

            <button
              onClick={() => {
                selectProject(null);
                setOpenedId(null);
              }}
              className={`mb-2 flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
                currentProjectId === null
                  ? "border-orange bg-orange-tint/50"
                  : "border-hair bg-paper hover:border-orange"
              }`}
            >
              <div>
                <div className="text-[13px] font-medium text-ink">No project</div>
                <div className="text-[11px] text-muted">
                  Chat without project context
                </div>
              </div>
              {currentProjectId === null && (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-orange-ink">
                  Active
                </span>
              )}
            </button>

            {projects.length === 0 && !showCreate ? (
              <div className="rounded-md border border-dashed border-hair bg-offwhite p-5 text-[13px] text-muted">
                No projects yet. Click <strong className="text-ink">+ New</strong>{" "}
                to create one.
              </div>
            ) : (
              <ul className="space-y-2">
                {projects.map((p) => {
                  const isOpen = openedId === p.id;
                  const isActive = currentProjectId === p.id;
                  return (
                    <li key={p.id}>
                      <div
                        className={`group relative rounded-lg border p-3 transition ${
                          isActive
                            ? "border-orange bg-orange-tint/50"
                            : isOpen
                            ? "border-ink/30 bg-offwhite"
                            : "border-hair bg-paper hover:border-orange/60"
                        }`}
                      >
                        <button
                          onClick={() => setOpenedId(p.id)}
                          className="block w-full pr-8 text-left"
                        >
                          <div className="flex items-center gap-2">
                            <div className="truncate text-[14px] font-medium text-ink">
                              {p.name}
                            </div>
                            {isActive && (
                              <span className="rounded-full bg-orange-tint px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-orange-ink">
                                Active
                              </span>
                            )}
                          </div>
                          {p.description && (
                            <div className="mt-0.5 line-clamp-2 text-[12px] text-muted">
                              {p.description}
                            </div>
                          )}
                        </button>
                        <button
                          onClick={() => remove(p)}
                          className="absolute right-2 top-2 rounded p-1 text-muted opacity-0 transition-opacity hover:text-red-600 group-hover:opacity-100"
                          aria-label="Delete project"
                          title="Delete"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
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
                  );
                })}
              </ul>
            )}
          </div>

          {/* RIGHT: opened project detail */}
          <div className="flex min-h-0 flex-col overflow-y-auto px-7 py-6">
            {opened ? (
              <>
                <div className="label">Project</div>
                <h3 className="mt-1 font-serif text-2xl text-ink">
                  {opened.name}
                </h3>
                {opened.description && (
                  <p className="mt-2 text-[14px] text-body">
                    {opened.description}
                  </p>
                )}
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    onClick={() => startInProject(opened)}
                    className="btn-primary text-[13px]"
                  >
                    + New chat in this project
                  </button>
                  {currentProjectId !== opened.id && (
                    <button
                      onClick={() => useAsContext(opened)}
                      className="btn-ghost text-[13px]"
                    >
                      Use as current context
                    </button>
                  )}
                </div>

                <div className="label mt-7 mb-2">Conversations</div>
                {convsLoading ? (
                  <div className="text-[13px] text-muted">Loading…</div>
                ) : convs.length === 0 ? (
                  <div className="rounded-md border border-dashed border-hair bg-offwhite p-4 text-[13px] text-muted">
                    No chats in this project yet.
                  </div>
                ) : (
                  <ul className="divide-y divide-hair">
                    {convs.map((c) => (
                      <li key={c.id}>
                        <a
                          href={`/chat?conversation=${encodeURIComponent(
                            c.id
                          )}&project=${encodeURIComponent(opened.id)}`}
                          className="block py-3 text-[14px] hover:text-orange"
                        >
                          <div className="text-ink">{c.title}</div>
                          <div className="mt-0.5 text-[11px] text-muted">
                            {new Date(c.updatedAt).toLocaleString()}
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <div className="m-auto max-w-xs text-center">
                <div className="mb-3 text-[36px]">📁</div>
                <p className="text-[13px] text-muted">
                  Pick a project on the left to see its chats, or create a new
                  one.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatExtensionOverlay({
  ext,
  onClose,
}: {
  ext: ChatExtensionKey;
  onClose: () => void;
}) {
  const meta = CHAT_EXTENSIONS[ext];
  // Cache-bust the src so switching between extensions re-renders the iframe.
  const src = `${meta.path}?embed=1`;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={meta.title}
    >
      <div
        className="animate-scaleIn relative flex h-[min(90vh,820px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-hair bg-paper shadow-[0_40px_120px_-20px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-hair px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="label">Chat extension</div>
            <span className="text-dim">·</span>
            <div className="font-serif text-lg text-ink">{meta.title}</div>
          </div>
          <div className="flex items-center gap-1">
            <a
              href={meta.path}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded p-1.5 text-muted hover:bg-offwhite hover:text-ink"
              title="Open in new tab"
              aria-label="Open in new tab"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                <path
                  d="M6 3H3v10h10v-3M10 3h3v3M13 3 7.5 8.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-muted hover:bg-offwhite hover:text-ink"
              aria-label="Close"
              title="Close"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
                <path d="M3.28 3.28a.75.75 0 0 1 1.06 0L8 6.94l3.66-3.66a.75.75 0 1 1 1.06 1.06L9.06 8l3.66 3.66a.75.75 0 1 1-1.06 1.06L8 9.06l-3.66 3.66a.75.75 0 0 1-1.06-1.06L6.94 8 3.28 4.34a.75.75 0 0 1 0-1.06Z" />
              </svg>
            </button>
          </div>
        </div>
        <iframe
          key={ext}
          src={src}
          title={meta.title}
          className="flex-1 border-0 bg-paper"
        />
      </div>
    </div>
  );
}

function AiSettingsOverlay({
  uid,
  initial,
  onClose,
  onSaved,
}: {
  uid: string | null;
  initial: AiPrefs;
  onClose: () => void;
  onSaved: (next: AiPrefs) => void;
}) {
  const [prefs, setPrefs] = useState<AiPrefs>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function save() {
    if (!uid) return;
    setSaving(true);
    setMsg(null);
    try {
      const db = getDb();
      if (db) {
        const { setDoc, serverTimestamp } = await import(
          "firebase/firestore"
        );
        await setDoc(
          doc(db, "users", uid, "profile", "prefs"),
          { ...prefs, updatedAt: serverTimestamp() },
          { merge: true }
        );
      }
      onSaved(prefs);
      setMsg("Saved. Active on your next message.");
    } catch (e: any) {
      setMsg(e?.message || "Couldn't save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="AI settings"
    >
      <div
        className="animate-scaleIn relative flex h-[min(88vh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-hair bg-paper shadow-[0_40px_120px_-20px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-hair px-7 py-5">
          <div>
            <div className="label">Chat settings</div>
            <h2 className="mt-1 font-serif text-2xl font-normal text-ink">
              Customize the AI tutor
            </h2>
            <p className="mt-1 max-w-lg text-[13px] text-muted">
              How the tutor talks to you — verbosity, tone, focus — and any
              standing instructions you want to apply to every chat.
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-full p-1.5 text-muted hover:bg-offwhite hover:text-ink"
            aria-label="Close"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
              <path d="M3.28 3.28a.75.75 0 0 1 1.06 0L8 6.94l3.66-3.66a.75.75 0 1 1 1.06 1.06L9.06 8l3.66 3.66a.75.75 0 1 1-1.06 1.06L8 9.06l-3.66 3.66a.75.75 0 0 1-1.06-1.06L6.94 8 3.28 4.34a.75.75 0 0 1 0-1.06Z" />
            </svg>
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-7 py-6">
          <PrefRadioGroup
            label="Reply length"
            value={prefs.aiVerbosity}
            options={AI_VERBOSITY_OPTIONS}
            onChange={(v) => setPrefs({ ...prefs, aiVerbosity: v })}
          />
          <PrefRadioGroup
            label="Mode"
            value={prefs.aiMode}
            options={AI_MODE_OPTIONS}
            onChange={(v) => setPrefs({ ...prefs, aiMode: v })}
          />
          <PrefRadioGroup
            label="Personality"
            value={prefs.aiPersonality}
            options={AI_PERSONALITY_OPTIONS}
            onChange={(v) => setPrefs({ ...prefs, aiPersonality: v })}
          />
          <div>
            <div className="label mb-2">Custom instructions</div>
            <textarea
              value={prefs.aiCustomInstructions ?? ""}
              onChange={(e) =>
                setPrefs({ ...prefs, aiCustomInstructions: e.target.value })
              }
              rows={4}
              maxLength={1000}
              placeholder="e.g. 'I'm studying for AP Calc BC finals — always connect problems back to series convergence tests.'"
              className="focus-ring w-full rounded-md border border-hair bg-offwhite px-3 py-2 text-[14px] text-ink outline-none"
            />
            <div className="mt-1 text-[11px] text-muted">
              Applied to every chat. Leave blank to turn off.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-hair px-7 py-4">
          <div className="text-[12px] text-muted">{msg ?? ""}</div>
          <div className="flex gap-2">
            <button onClick={onClose} className="btn-ghost text-sm">
              Cancel
            </button>
            <button
              onClick={save}
              disabled={saving || !uid}
              className="btn-primary text-sm disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrefRadioGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly { key: T; label: string; description?: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <div className="label mb-2">{label}</div>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const selected = value === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => onChange(opt.key)}
              className={`rounded-lg border px-3 py-2.5 text-left transition ${
                selected
                  ? "border-orange bg-orange-tint/40"
                  : "border-hair bg-paper hover:border-orange/60"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full border ${
                    selected ? "border-orange bg-orange" : "border-hair"
                  }`}
                />
                <span className="text-[13px] font-medium text-ink">
                  {opt.label}
                </span>
              </div>
              {opt.description && (
                <div className="mt-1 text-[11px] text-muted">
                  {opt.description}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
