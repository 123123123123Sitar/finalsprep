"use client";
import DesmosCalculator from "@/app/components/DesmosCalculator";
import Graph3D from "@/app/components/Graph3D";
import PhysicsSim, { type SimKind } from "@/app/components/PhysicsSim";
import CodeSandbox from "@/app/components/CodeSandbox";

export type InteractiveSpec = {
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

export function isInteractiveSpec(value: unknown): value is InteractiveSpec {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (
    ![
      "graph2d",
      "graph3d",
      "physics-sim",
      "code-java",
      "code-pseudo",
    ].includes(v.kind as string)
  ) {
    return false;
  }
  if (typeof v.title !== "string" || typeof v.description !== "string") {
    return false;
  }
  if (!v.config || typeof v.config !== "object") return false;
  return true;
}

export default function SpecRenderer({ spec }: { spec: InteractiveSpec }) {
  if (spec.kind === "graph2d") {
    const exprs = Array.isArray(spec.config?.expressions)
      ? spec.config.expressions.slice(0, 4).map((e: any) => String(e))
      : ["x^2"];
    return <DesmosCalculator initialExprs={exprs} />;
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
      Unknown widget kind: {String((spec as InteractiveSpec).kind)}
    </div>
  );
}
