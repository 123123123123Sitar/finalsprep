"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import SiteNav from "@/app/components/SiteNav";
import UserAvatar from "@/app/components/UserAvatar";
import AuthGate from "@/app/components/AuthGate";
import { useAuth } from "@/app/components/AuthProvider";
import { relativeTime, validateMessageText } from "@/lib/social";

type ConversationListItem = {
  id: string;
  otherUid: string;
  otherUsername: string;
  otherDisplayName: string;
  lastMessage: string;
  lastMessageUid: string;
  lastMessageAt: number;
};

type Message = {
  id: string;
  conversationId: string;
  uid: string;
  text: string;
  createdAt: number;
};

export default function MessagesPage() {
  return (
    <AuthGate>
      <MessagesInner />
    </AuthGate>
  );
}

type SearchHit = {
  uid: string;
  username: string;
  displayName: string;
};

function MessagesInner() {
  const { user, getIdToken } = useAuth();
  const [convos, setConvos] = useState<ConversationListItem[] | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [composerQuery, setComposerQuery] = useState("");
  const [composerResults, setComposerResults] = useState<SearchHit[] | null>(
    null
  );
  const [composerStarting, setComposerStarting] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Pick initial conversation from ?c= query param.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("c");
    if (c) setActiveId(c);
  }, []);

  const loadConvos = useCallback(async () => {
    const token = await getIdToken();
    if (!token) return;
    const res = await fetch("/api/conversations", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) {
      setConvos(data.conversations || []);
      if (!activeId && data.conversations?.[0]) {
        setActiveId(data.conversations[0].id);
      }
    }
  }, [getIdToken, activeId]);

  useEffect(() => {
    loadConvos();
  }, [loadConvos]);

  const loadMessages = useCallback(async () => {
    if (!activeId) {
      setMessages(null);
      return;
    }
    const token = await getIdToken();
    if (!token) return;
    const res = await fetch(`/api/conversations/${activeId}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setMessages(data.messages || []);
  }, [activeId, getIdToken]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // Poll for new messages every 6s while a conversation is open.
  useEffect(() => {
    if (!activeId) return;
    const t = setInterval(() => loadMessages(), 6000);
    return () => clearInterval(t);
  }, [activeId, loadMessages]);

  // Debounced user search inside the new-message composer.
  useEffect(() => {
    if (!composerOpen) return;
    const q = composerQuery.trim();
    if (q.length < 2) {
      setComposerResults(null);
      return;
    }
    let alive = true;
    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/users/search?q=${encodeURIComponent(q)}`
        );
        const data = await res.json();
        if (alive) setComposerResults(data.results || []);
      } catch {
        if (alive) setComposerResults([]);
      }
    }, 200);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [composerOpen, composerQuery]);

  async function startConversationWith(targetUid: string) {
    if (!user) return;
    setComposerStarting(targetUid);
    try {
      const token = await getIdToken();
      if (!token) return;
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ otherUid: targetUid }),
      });
      const data = await res.json();
      if (res.ok && data.conversationId) {
        setActiveId(data.conversationId);
        setComposerOpen(false);
        setComposerQuery("");
        setComposerResults(null);
        loadConvos();
      }
    } finally {
      setComposerStarting(null);
    }
  }

  // Auto-scroll to bottom when messages load or change.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function send() {
    if (!activeId) return;
    const err = validateMessageText(draft);
    if (err) return;
    setSending(true);
    try {
      const token = await getIdToken();
      if (!token) return;
      const res = await fetch(`/api/conversations/${activeId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: draft }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((prev) =>
          prev ? [...prev, data.message] : [data.message]
        );
        setDraft("");
        loadConvos();
      }
    } finally {
      setSending(false);
    }
  }

  const active = convos?.find((c) => c.id === activeId);

  return (
    <main className="min-h-screen bg-paper">
      <SiteNav sticky />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 py-8 md:grid-cols-[280px_1fr]">
        {/* Sidebar: conversation list */}
        <aside className="rounded-xl border border-hair bg-paper">
          <div className="flex items-center justify-between border-b border-hair px-4 py-3">
            <div className="label">Messages</div>
            <button
              onClick={() => {
                setComposerOpen((v) => !v);
                setComposerQuery("");
                setComposerResults(null);
              }}
              className="rounded-md border border-hair bg-paper px-2.5 py-1 text-[12px] text-ink hover:bg-offwhite"
              title="Start a new conversation"
            >
              {composerOpen ? "Cancel" : "+ New"}
            </button>
          </div>

          {composerOpen && (
            <div className="border-b border-hair px-3 py-3">
              <input
                autoFocus
                value={composerQuery}
                onChange={(e) => setComposerQuery(e.target.value)}
                placeholder="Search by username…"
                className="w-full rounded-md border border-hair bg-offwhite/40 px-3 py-2 text-[13px] text-ink placeholder:text-dim focus:border-orange focus:bg-paper focus:outline-none"
              />
              {composerQuery.trim().length < 2 ? (
                <div className="mt-2 px-1 text-[12px] text-muted">
                  Type at least 2 characters.
                </div>
              ) : composerResults === null ? (
                <div className="mt-2 px-1 text-[12px] text-muted">
                  Searching…
                </div>
              ) : composerResults.length === 0 ? (
                <div className="mt-2 px-1 text-[12px] text-muted">
                  No matches.
                </div>
              ) : (
                <ul className="mt-2 space-y-0.5">
                  {composerResults
                    .filter((r) => r.uid !== user?.uid)
                    .map((r) => (
                      <li key={r.uid}>
                        <button
                          onClick={() => startConversationWith(r.uid)}
                          disabled={composerStarting === r.uid}
                          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-offwhite disabled:opacity-50"
                        >
                          <UserAvatar
                            seed={r.uid}
                            label={r.displayName || r.username}
                            size="sm"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[13px] text-ink">
                              {r.displayName}
                            </div>
                            <div className="truncate text-[11px] text-muted">
                              @{r.username}
                            </div>
                          </div>
                          {composerStarting === r.uid && (
                            <span className="text-[11px] text-muted">…</span>
                          )}
                        </button>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          )}

          {convos === null ? (
            <div className="px-4 py-6 text-sm text-muted">Loading…</div>
          ) : convos.length === 0 ? (
            <div className="px-4 py-6 text-sm text-muted">
              {composerOpen
                ? "Search for someone above to start chatting."
                : "No conversations yet. Tap + New to find a classmate."}
            </div>
          ) : (
            <ul className="max-h-[70vh] divide-y divide-hair overflow-y-auto">
              {convos.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => setActiveId(c.id)}
                    className={`flex w-full items-start gap-3 px-3 py-3 text-left transition ${
                      c.id === activeId
                        ? "bg-orange-tint/40"
                        : "hover:bg-offwhite"
                    }`}
                  >
                    <UserAvatar
                      seed={c.otherUid}
                      label={c.otherDisplayName}
                      size="md"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="truncate text-[14px] font-medium text-ink">
                          {c.otherDisplayName}
                        </div>
                        <div className="shrink-0 text-[10.5px] text-muted">
                          {c.lastMessageAt
                            ? relativeTime(c.lastMessageAt)
                            : ""}
                        </div>
                      </div>
                      <div className="truncate text-[12.5px] text-muted">
                        {c.lastMessage || "Say hi"}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Main: message thread */}
        <section className="flex h-[80vh] flex-col overflow-hidden rounded-xl border border-hair bg-paper">
          {active ? (
            <>
              <div className="flex items-center gap-3 border-b border-hair px-5 py-3">
                <UserAvatar
                  seed={active.otherUid}
                  label={active.otherDisplayName}
                  size="sm"
                />
                <a
                  href={`/users/${active.otherUid}`}
                  className="min-w-0 flex-1 hover:underline"
                >
                  <div className="truncate text-[14px] font-medium text-ink">
                    {active.otherDisplayName}
                  </div>
                  <div className="truncate text-[12px] text-muted">
                    @{active.otherUsername}
                  </div>
                </a>
              </div>
              <div
                ref={scrollRef}
                className="flex-1 space-y-2 overflow-y-auto bg-offwhite/30 p-4"
              >
                {messages === null ? (
                  <div className="text-center text-sm text-muted">
                    Loading…
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-sm text-muted">
                    No messages yet. Start the conversation.
                  </div>
                ) : (
                  messages.map((m) => {
                    const mine = m.uid === user?.uid;
                    return (
                      <div
                        key={m.id}
                        className={`flex ${
                          mine ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-[14px] ${
                            mine
                              ? "bg-ink text-paper"
                              : "border border-hair bg-paper text-ink"
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{m.text}</div>
                          <div
                            className={`mt-0.5 text-[10px] ${
                              mine ? "text-paper/60" : "text-muted"
                            }`}
                          >
                            {relativeTime(m.createdAt)}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="border-t border-hair p-3">
                <div className="flex items-end gap-2">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    placeholder="Message…"
                    rows={1}
                    maxLength={2000}
                    className="min-h-[36px] flex-1 resize-none rounded-md border border-hair bg-offwhite/40 px-3 py-2 text-[14px] text-ink placeholder:text-dim focus:border-orange focus:bg-paper focus:outline-none"
                  />
                  <button
                    onClick={send}
                    disabled={sending || draft.trim().length < 1}
                    className="btn-primary disabled:opacity-50"
                  >
                    {sending ? "…" : "Send"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center px-6 text-center text-sm text-muted">
              Pick a conversation, or visit a user's profile to start a new one.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
