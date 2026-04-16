"use client";
import { useState } from "react";
import SiteNav from "@/app/components/SiteNav";
import { useAuth } from "@/app/components/AuthProvider";
import GraphingCalculator from "@/app/components/GraphingCalculator";
import Graph3D from "@/app/components/Graph3D";
import PhysicsSim, { type SimKind } from "@/app/components/PhysicsSim";
import CodeSandbox from "@/app/components/CodeSandbox";
import PageLoader from "@/app/components/PageLoader";

type Spec = {
  kind: "graph2d" | "graph3d" | "physics-sim" | "code-java" | "code-pseudo";
  title: string;
  description: string;
  config: any;
};

const PHYSICS_KINDS: SimKind[] = [
  "projectile",
  "pendulum",
  "spring",
  "incline",
  "circuit",
  "waves",
  "orbit",
  "collision",
  "fluid",
];

const EXAMPLES = [
  "Graph y = x^2 - 2x - 3 and let me move the curve around.",
  "Show me how projectile motion changes with launch angle.",
  "Let me explore a 3D saddle surface.",
  "Java playground for a 2D array diagonal sum.",
  "Pendulum with adjustable length.",
];

export default function InteractivesPage() {
  const { user, loading, plan, planLoading, getIdToken } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [spec, setSpec] = useState<Spec | null>(null);

  async function generate() {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    setBusy(true);
    setError(null);
    try {
      const token = await getIdToken();
      const res = await fetch("/api/interactives/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ prompt: trimmed }),
      });
      const data = await res.json();
      if (!res.ok || !data?.spec) {
        setError(data?.error || "Couldn't generate an interactive.");
        return;
      }
      setSpec(data.spec as Spec);
    } catch (e: any) {
      setError(e?.message || "Network error");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <main className="bg-paper">
        <SiteNav>
        </SiteNav>
        <PageLoader />
      </main>
    );
  }

  if (!user) {
    if (typeof window !== "undefined") {
      window.location.href = "/signin?next=/interactives";
    }
    return null;
  }

  // Hold the loader until the billing-doc snapshot resolves so paid users
  // never flash the learner paywall on reload.
  if (planLoading) {
    return (
      <main className="bg-paper">
        <SiteNav>
        </SiteNav>
        <PageLoader />
      </main>
    );
  }

  // Pro wall for learners.
  if (plan === "learner") {
    return (
      <main className="bg-paper text-body">
        <SiteNav>
        </SiteNav>
        <section className="mx-auto max-w-2xl px-6 py-20">
          <div className="label mb-3">Interactives</div>
          <h1 className="font-serif text-[44px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[52px]">
            Ask the AI to build you a graph.
          </h1>
          <p className="mt-4 max-w-xl text-[16px] text-body">
            Describe the concept and the tutor generates a live, interactive
            widget you can actually play with — a graphing calculator with
            your functions preloaded, a physics simulation with your
            parameters, a code playground primed with the problem.
          </p>
          <p className="mt-3 max-w-xl text-[15px] text-muted">
            Interactives is a Pro feature. Upgrade to try it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/#price" className="btn-primary text-sm">
              See Pro plans →
            </a>
            <a href="/chat" className="btn-ghost text-sm">
              Back to chat
            </a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-paper text-body">
      <SiteNav>
      </SiteNav>
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="label mb-3">Interactives</div>
        <h1 className="font-serif text-[44px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[52px]">
          Describe the widget.
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] text-muted">
          Type what you want to explore — a graph, a physics simulation, a
          code playground. The tutor picks the right tool and preloads it
          with your parameters.
        </p>

        <div className="mt-8 rounded-xl border border-hair bg-paper p-5">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Graph y = sin(x) and y = x - x^3/6 on the same axes so I can see where Taylor series diverges."
            rows={3}
            maxLength={500}
            className="w-full resize-none rounded-md border border-hair bg-offwhite px-4 py-3 text-[15px] text-ink outline-none focus:border-orange"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="text-[11px] text-muted">
              {prompt.length}/500
            </div>
            <button
              onClick={generate}
              disabled={busy || !prompt.trim()}
              className="btn-primary text-sm disabled:opacity-50"
            >
              {busy ? "Generating…" : "Generate interactive"}
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => setPrompt(ex)}
                className="rounded-full border border-hair bg-offwhite px-3 py-1 text-[12px] text-muted hover:border-orange hover:text-ink"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        )}

        {spec && (
          <div className="mt-8 rounded-xl border border-hair bg-paper p-6">
            <div className="label mb-2">{spec.kind}</div>
            <h2 className="font-serif text-2xl font-normal text-ink">
              {spec.title}
            </h2>
            <p className="mt-2 text-[14px] text-body">{spec.description}</p>
            <div className="mt-5">
              <SpecRenderer spec={spec} />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function SpecRenderer({ spec }: { spec: Spec }) {
  if (spec.kind === "graph2d") {
    const exprs = Array.isArray(spec.config?.expressions)
      ? spec.config.expressions.slice(0, 4).map((e: any) => String(e))
      : ["x^2"];
    return <GraphingCalculator initialExprs={exprs} />;
  }
  if (spec.kind === "graph3d") {
    const expr =
      typeof spec.config?.expression === "string"
        ? spec.config.expression
        : "sin(sqrt(x^2 + y^2))";
    return <Graph3D initialExpr={expr} />;
  }
  if (spec.kind === "physics-sim") {
    const kind: SimKind = PHYSICS_KINDS.includes(spec.config?.kind)
      ? (spec.config.kind as SimKind)
      : "projectile";
    return <PhysicsSim kind={kind} />;
  }
  if (spec.kind === "code-java") {
    return (
      <div>
        {spec.config?.prompt && (
          <p className="mb-2 text-[13px] text-muted">
            {String(spec.config.prompt)}
          </p>
        )}
        <CodeSandbox
          mode="java-trace"
          initialCode={String(spec.config?.initialCode || "")}
          expectedOutput={
            spec.config?.expectedOutput
              ? String(spec.config.expectedOutput)
              : undefined
          }
        />
      </div>
    );
  }
  if (spec.kind === "code-pseudo") {
    return (
      <div>
        {spec.config?.prompt && (
          <p className="mb-2 text-[13px] text-muted">
            {String(spec.config.prompt)}
          </p>
        )}
        <CodeSandbox
          mode="pseudo"
          initialCode={String(spec.config?.initialCode || "")}
          expectedOutput={
            spec.config?.expectedOutput
              ? String(spec.config.expectedOutput)
              : undefined
          }
        />
      </div>
    );
  }
  return (
    <div className="rounded-md border border-dashed border-hair bg-offwhite p-4 text-sm text-muted">
      Unknown widget kind: {spec.kind}
    </div>
  );
}
