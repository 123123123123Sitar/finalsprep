"use client";
import { useEffect, useState } from "react";
import SiteNav from "@/app/components/SiteNav";
import { useAuth } from "@/app/components/AuthProvider";
import {
  createProject,
  deleteProject,
  listProjects,
  type Project,
} from "@/lib/projects";
import {
  listConversationsInProject,
  type StoredConversation,
} from "@/lib/chatStore";
import PageLoader from "@/app/components/PageLoader";

export default function ProjectsPage() {
  const { user, loading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [opened, setOpened] = useState<Project | null>(null);
  const [convs, setConvs] = useState<StoredConversation[]>([]);
  const [convsLoading, setConvsLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/signin?next=/projects";
    }
  }, [loading, user]);

  useEffect(() => {
    if (!user) return;
    listProjects(user.uid)
      .then(setProjects)
      .finally(() => setLoaded(true));
  }, [user]);

  async function openProject(p: Project) {
    if (!user) return;
    setOpened(p);
    setConvsLoading(true);
    try {
      const list = await listConversationsInProject(user.uid, p.id);
      setConvs(list);
    } finally {
      setConvsLoading(false);
    }
  }

  async function create() {
    if (!user) return;
    if (!newName.trim()) return;
    setBusy(true);
    try {
      const id = await createProject(user.uid, newName, newDesc);
      setProjects((prev) => [
        {
          id,
          name: newName.trim(),
          description: newDesc.trim(),
          contextNotes: "",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        ...prev,
      ]);
      setNewName("");
      setNewDesc("");
      setShowCreate(false);
    } finally {
      setBusy(false);
    }
  }

  async function remove(p: Project) {
    if (!user) return;
    if (!confirm(`Delete "${p.name}"? Conversations inside stay on your account but lose the project link.`)) return;
    await deleteProject(user.uid, p.id);
    setProjects((prev) => prev.filter((x) => x.id !== p.id));
    if (opened?.id === p.id) {
      setOpened(null);
      setConvs([]);
    }
  }

  if (loading || !user) {
    return (
      <main className="bg-paper">
        <SiteNav>
        </SiteNav>
        <PageLoader />
      </main>
    );
  }

  return (
    <main className="bg-paper text-body">
      <SiteNav>
      </SiteNav>
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="label mb-3">Projects</div>
        <h1 className="font-serif text-[44px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[52px]">
          Group chats by what you're working on.
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] text-muted">
          A project is a shared context for a series of chats: a unit you're
          studying, a take-home exam, a lab writeup. New chats started from
          inside a project remember the project's notes and pull the last
          few conversations for context.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowCreate((v) => !v)}
            className="btn-primary text-sm"
          >
            {showCreate ? "Cancel" : "+ New project"}
          </button>
          <a href="/chat" className="btn-ghost text-sm">
            Start a chat without a project →
          </a>
        </div>

        {showCreate && (
          <div className="mt-5 rounded-xl border border-hair bg-paper p-5">
            <div className="label mb-2">New project</div>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name (e.g. APUSH DBQ practice)"
              className="w-full rounded-md border border-hair bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-orange"
              maxLength={120}
            />
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="What is this project for? (optional)"
              className="mt-3 w-full rounded-md border border-hair bg-paper px-4 py-3 text-[14px] text-ink outline-none focus:border-orange"
              rows={3}
              maxLength={500}
            />
            <div className="mt-3 flex gap-2">
              <button
                onClick={create}
                disabled={busy || !newName.trim()}
                className="btn-primary text-sm disabled:opacity-50"
              >
                {busy ? "Creating…" : "Create"}
              </button>
            </div>
          </div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-[1fr_1.2fr]">
          {/* LEFT: project list */}
          <div>
            <div className="label mb-3">Your projects</div>
            {loaded && projects.length === 0 ? (
              <div className="rounded-md border border-dashed border-hair bg-offwhite p-6 text-sm text-muted">
                No projects yet. Create one to start grouping your chats.
              </div>
            ) : (
              <ul className="space-y-2">
                {projects.map((p) => (
                  <li key={p.id}>
                    <div
                      className={`group relative rounded-lg border p-4 transition ${
                        opened?.id === p.id
                          ? "border-orange bg-orange-tint/50"
                          : "border-hair bg-paper hover:border-orange"
                      }`}
                    >
                      <button
                        onClick={() => openProject(p)}
                        className="block w-full text-left"
                      >
                        <div className="font-medium text-ink">{p.name}</div>
                        {p.description && (
                          <div className="mt-1 line-clamp-2 text-[13px] text-muted">
                            {p.description}
                          </div>
                        )}
                      </button>
                      <button
                        onClick={() => remove(p)}
                        className="absolute right-2 top-2 rounded p-1 text-muted opacity-0 hover:text-red-600 group-hover:opacity-100"
                        aria-label="Delete project"
                        title="Delete"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* RIGHT: opened project detail */}
          <div>
            {opened ? (
              <div className="rounded-xl border border-hair bg-paper p-6">
                <div className="label mb-2">Project</div>
                <h2 className="font-serif text-2xl font-normal text-ink">
                  {opened.name}
                </h2>
                {opened.description && (
                  <p className="mt-2 text-[14px] text-body">
                    {opened.description}
                  </p>
                )}
                <div className="mt-5">
                  <a
                    href={`/chat?project=${encodeURIComponent(opened.id)}`}
                    className="btn-primary text-sm"
                  >
                    + New chat in this project
                  </a>
                </div>

                <div className="mt-7 label mb-2">Conversations</div>
                {convsLoading ? (
                  <div className="text-sm text-muted">Loading…</div>
                ) : convs.length === 0 ? (
                  <div className="rounded-md border border-dashed border-hair bg-offwhite p-4 text-sm text-muted">
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
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-hair bg-offwhite p-8 text-center text-sm text-muted">
                Pick a project on the left to see its chats.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
