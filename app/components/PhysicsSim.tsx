"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Physics simulation component. Runs a canvas-based real-time simulation
 * for one of several scenarios. Each scenario has its own set of sliders.
 * All simulations use the same <canvas> and RAF loop — switching scenarios
 * swaps the update function.
 */

export type SimKind =
  | "projectile"
  | "pendulum"
  | "spring"
  | "incline"
  | "circuit"
  | "waves"
  | "orbit"
  | "collision"
  | "fluid";

type Config = {
  label: string;
  description: string;
  controls: { key: string; label: string; min: number; max: number; step: number; default: number; unit?: string }[];
};

const CONFIGS: Record<SimKind, Config> = {
  projectile: {
    label: "Projectile motion",
    description:
      "A ball launched at angle θ with speed v. Gravity g acts downward. Kinematic equations show horizontal and vertical motion are independent.",
    controls: [
      { key: "v", label: "Initial speed", min: 1, max: 50, step: 1, default: 25, unit: "m/s" },
      { key: "theta", label: "Angle", min: 0, max: 90, step: 1, default: 45, unit: "°" },
      { key: "g", label: "Gravity", min: 1, max: 25, step: 0.5, default: 9.8, unit: "m/s²" },
    ],
  },
  pendulum: {
    label: "Simple pendulum",
    description:
      "A mass m on a string of length L. For small angles, T = 2π√(L/g). Larger amplitudes deviate from SHM.",
    controls: [
      { key: "L", label: "Length", min: 0.5, max: 5, step: 0.1, default: 2, unit: "m" },
      { key: "theta0", label: "Initial angle", min: 5, max: 80, step: 5, default: 30, unit: "°" },
      { key: "g", label: "Gravity", min: 1, max: 25, step: 0.5, default: 9.8, unit: "m/s²" },
    ],
  },
  spring: {
    label: "Spring oscillator",
    description:
      "A mass m on a spring with constant k. Restoring force F = −kx. Period T = 2π√(m/k) is independent of amplitude.",
    controls: [
      { key: "m", label: "Mass", min: 0.5, max: 10, step: 0.1, default: 1, unit: "kg" },
      { key: "k", label: "Spring constant", min: 1, max: 100, step: 1, default: 20, unit: "N/m" },
      { key: "A", label: "Amplitude", min: 0.2, max: 2, step: 0.1, default: 1, unit: "m" },
    ],
  },
  incline: {
    label: "Block on an incline",
    description:
      "A block on a ramp with friction coefficient μ. Acceleration a = g(sin θ − μ cos θ). Tilt axes parallel and perpendicular to the ramp.",
    controls: [
      { key: "theta", label: "Angle", min: 5, max: 75, step: 1, default: 30, unit: "°" },
      { key: "mu", label: "Friction μ", min: 0, max: 1, step: 0.05, default: 0.2 },
      { key: "g", label: "Gravity", min: 1, max: 25, step: 0.5, default: 9.8, unit: "m/s²" },
    ],
  },
  circuit: {
    label: "RC circuit charging",
    description:
      "A capacitor C charging through a resistor R from a voltage source V. Q(t) = CV(1 − e^(−t/RC)). Time constant τ = RC.",
    controls: [
      { key: "V", label: "Voltage", min: 1, max: 20, step: 1, default: 10, unit: "V" },
      { key: "R", label: "Resistance", min: 100, max: 5000, step: 100, default: 1000, unit: "Ω" },
      { key: "C", label: "Capacitance μF", min: 1, max: 1000, step: 10, default: 100, unit: "μF" },
    ],
  },
  waves: {
    label: "Standing wave on a string",
    description:
      "A string fixed at both ends has allowed wavelengths λ_n = 2L/n. Frequencies f_n = nv/(2L). The first 4 harmonics are shown.",
    controls: [
      { key: "n", label: "Harmonic", min: 1, max: 6, step: 1, default: 2 },
      { key: "L", label: "Length", min: 1, max: 5, step: 0.1, default: 3, unit: "m" },
      { key: "v", label: "Wave speed", min: 1, max: 20, step: 0.5, default: 10, unit: "m/s" },
    ],
  },
  orbit: {
    label: "Circular orbit",
    description:
      "A satellite in circular orbit around a central mass. Orbital speed v = √(GM/r). Gravity provides the centripetal force.",
    controls: [
      { key: "r", label: "Orbit radius", min: 50, max: 200, step: 5, default: 120, unit: "px" },
      { key: "GM", label: "GM", min: 200, max: 5000, step: 50, default: 1500 },
      { key: "trail", label: "Trail length", min: 0, max: 500, step: 20, default: 200 },
    ],
  },
  collision: {
    label: "1D elastic collision",
    description:
      "Two carts of mass m₁ and m₂ collide elastically. Both momentum and KE are conserved. Use v₁' and v₂' formulas.",
    controls: [
      { key: "m1", label: "Mass 1", min: 0.5, max: 5, step: 0.1, default: 2, unit: "kg" },
      { key: "m2", label: "Mass 2", min: 0.5, max: 5, step: 0.1, default: 1, unit: "kg" },
      { key: "v1", label: "Initial v₁", min: -10, max: 10, step: 0.5, default: 4, unit: "m/s" },
    ],
  },
  fluid: {
    label: "Buoyancy",
    description:
      "An object in a fluid of density ρ. Buoyant force F_b = ρ_fluid · V_displaced · g. Floats if its average density is less than the fluid.",
    controls: [
      { key: "rhoF", label: "Fluid density", min: 500, max: 2000, step: 50, default: 1000, unit: "kg/m³" },
      { key: "rhoO", label: "Object density", min: 200, max: 3000, step: 50, default: 800, unit: "kg/m³" },
      { key: "g", label: "Gravity", min: 1, max: 25, step: 0.5, default: 9.8, unit: "m/s²" },
    ],
  },
};

export default function PhysicsSim({
  kind,
  height = 280,
}: {
  kind: SimKind;
  height?: number;
}) {
  const config = CONFIGS[kind];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const tRef = useRef(0);
  const stateRef = useRef<any>({});
  const [params, setParams] = useState<Record<string, number>>(() =>
    Object.fromEntries(config.controls.map((c) => [c.key, c.default]))
  );
  const [running, setRunning] = useState(true);

  useEffect(() => {
    setParams(
      Object.fromEntries(config.controls.map((c) => [c.key, c.default]))
    );
    tRef.current = 0;
    stateRef.current = {};
  }, [kind, config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;

    let lastT = performance.now();
    let stopped = false;

    function loop(now: number) {
      if (stopped) return;
      const dt = Math.min(0.05, (now - lastT) / 1000);
      lastT = now;
      if (running) tRef.current += dt;
      ctx.clearRect(0, 0, w, h);
      try {
        draw(kind, ctx, w, h, tRef.current, params, stateRef, dt, running);
      } catch {}
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      stopped = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [kind, params, running, height]);

  function reset() {
    tRef.current = 0;
    stateRef.current = {};
  }

  return (
    <div className="rounded-xl border border-hair bg-paper p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            Interactive sim
          </div>
          <div className="mt-0.5 text-[13px] font-semibold text-ink">
            {config.label}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setRunning((r) => !r)}
            className="rounded-md border border-hair bg-offwhite px-3 py-1 text-xs text-ink hover:border-orange"
          >
            {running ? "Pause" : "Play"}
          </button>
          <button
            onClick={reset}
            className="rounded-md border border-hair bg-offwhite px-3 py-1 text-xs text-ink hover:border-orange"
          >
            Reset
          </button>
        </div>
      </div>
      <p className="mt-2 text-[12px] text-muted">{config.description}</p>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: `${height}px` }}
        className="mt-3 rounded-md border border-hair bg-paper"
      />
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {config.controls.map((c) => (
          <label key={c.key} className="flex flex-col text-[11px] text-muted">
            <span className="mb-1 text-ink">
              {c.label}: <span className="font-mono text-orange">{params[c.key]?.toFixed(2)}{c.unit ? ` ${c.unit}` : ""}</span>
            </span>
            <input
              type="range"
              min={c.min}
              max={c.max}
              step={c.step}
              value={params[c.key]}
              onChange={(e) =>
                setParams((p) => ({ ...p, [c.key]: Number(e.target.value) }))
              }
              className="accent-orange"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function draw(
  kind: SimKind,
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  p: Record<string, number>,
  stateRef: React.MutableRefObject<any>,
  dt: number,
  running: boolean
) {
  switch (kind) {
    case "projectile":
      drawProjectile(ctx, w, h, t, p);
      break;
    case "pendulum":
      drawPendulum(ctx, w, h, t, p);
      break;
    case "spring":
      drawSpring(ctx, w, h, t, p);
      break;
    case "incline":
      drawIncline(ctx, w, h, t, p);
      break;
    case "circuit":
      drawCircuit(ctx, w, h, t, p);
      break;
    case "waves":
      drawWaves(ctx, w, h, t, p);
      break;
    case "orbit":
      drawOrbit(ctx, w, h, t, p, stateRef, dt, running);
      break;
    case "collision":
      drawCollision(ctx, w, h, t, p, stateRef, dt, running);
      break;
    case "fluid":
      drawFluid(ctx, w, h, t, p);
      break;
  }
}

// -------- Scenarios --------

function drawProjectile(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  p: Record<string, number>
) {
  const { v, theta, g } = p;
  const rad = (theta * Math.PI) / 180;
  const vx = v * Math.cos(rad);
  const vy = v * Math.sin(rad);
  const tMax = (2 * vy) / g;
  const tt = t % (tMax + 0.5);
  const x = vx * tt;
  const y = vy * tt - 0.5 * g * tt * tt;
  const scale = Math.min((w - 40) / (vx * tMax + 1), h / (vy * vy / (2 * g) + 1));
  const originX = 20;
  const originY = h - 20;

  // Ground
  ctx.strokeStyle = "#0a0e1a";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, originY);
  ctx.lineTo(w, originY);
  ctx.stroke();

  // Trajectory trace
  ctx.strokeStyle = "#4f46e5";
  ctx.setLineDash([3, 3]);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let i = 0; i <= 60; i++) {
    const ti = (tMax * i) / 60;
    const xi = vx * ti * scale;
    const yi = (vy * ti - 0.5 * g * ti * ti) * scale;
    const px = originX + xi;
    const py = originY - yi;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  // Ball position
  if (y >= 0) {
    const px = originX + x * scale;
    const py = originY - y * scale;
    ctx.fillStyle = "#ec4899";
    ctx.beginPath();
    ctx.arc(px, py, 7, 0, Math.PI * 2);
    ctx.fill();

    // Velocity vectors
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px + vx * 3, py);
    ctx.stroke();
    const curVy = vy - g * tt;
    ctx.strokeStyle = "#f59e0b";
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px, py - curVy * 3);
    ctx.stroke();
  }

  // Readouts
  ctx.fillStyle = "#0a0e1a";
  ctx.font = "11px ui-sans-serif";
  const range = (vx * 2 * vy) / g;
  const height = (vy * vy) / (2 * g);
  ctx.fillText(`range ≈ ${range.toFixed(1)} m`, 12, 16);
  ctx.fillText(`max height ≈ ${height.toFixed(1)} m`, 12, 30);
  ctx.fillText(`time of flight ≈ ${tMax.toFixed(2)} s`, 12, 44);
}

function drawPendulum(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  p: Record<string, number>
) {
  const { L, theta0, g } = p;
  const theta0Rad = (theta0 * Math.PI) / 180;
  const omega = Math.sqrt(g / L);
  const theta = theta0Rad * Math.cos(omega * t);
  const cx = w / 2;
  const cy = 30;
  const rod = Math.min(h - 60, L * 60);
  const bx = cx + rod * Math.sin(theta);
  const by = cy + rod * Math.cos(theta);

  // Arc guide
  ctx.strokeStyle = "#e5e7eb";
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.arc(cx, cy, rod, Math.PI / 2 - theta0Rad, Math.PI / 2 + theta0Rad);
  ctx.stroke();
  ctx.setLineDash([]);

  // Rod
  ctx.strokeStyle = "#0a0e1a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(bx, by);
  ctx.stroke();

  // Bob
  ctx.fillStyle = "#ec4899";
  ctx.beginPath();
  ctx.arc(bx, by, 14, 0, Math.PI * 2);
  ctx.fill();

  // Anchor
  ctx.fillStyle = "#0a0e1a";
  ctx.fillRect(cx - 12, cy - 4, 24, 4);

  ctx.fillStyle = "#0a0e1a";
  ctx.font = "11px ui-sans-serif";
  const T = (2 * Math.PI) / omega;
  ctx.fillText(`T = 2π√(L/g) = ${T.toFixed(2)} s`, 12, 16);
  ctx.fillText(`θ = ${((theta * 180) / Math.PI).toFixed(1)}°`, 12, 30);
}

function drawSpring(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  p: Record<string, number>
) {
  const { m, k, A } = p;
  const omega = Math.sqrt(k / m);
  const x = A * Math.cos(omega * t);
  const mid = h / 2;
  const anchor = 20;
  const blockX = w / 2 + x * 60;

  // Anchor wall
  ctx.fillStyle = "#0a0e1a";
  ctx.fillRect(anchor - 10, mid - 30, 10, 60);
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(anchor - 10, mid - 30 + i * 12);
    ctx.lineTo(anchor - 18, mid - 22 + i * 12);
    ctx.stroke();
  }

  // Spring
  ctx.strokeStyle = "#4f46e5";
  ctx.lineWidth = 2;
  ctx.beginPath();
  const coils = 14;
  const start = anchor;
  const end = blockX - 15;
  const span = end - start;
  for (let i = 0; i <= coils * 10; i++) {
    const s = i / (coils * 10);
    const px = start + span * s;
    const py = mid + (i % 2 === 0 ? -6 : 6);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.lineTo(end, mid);
  ctx.stroke();

  // Block
  ctx.fillStyle = "#ec4899";
  ctx.fillRect(blockX - 15, mid - 20, 30, 40);
  ctx.strokeStyle = "#0a0e1a";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(blockX - 15, mid - 20, 30, 40);

  // Equilibrium line
  ctx.strokeStyle = "#94a3b8";
  ctx.setLineDash([2, 2]);
  ctx.beginPath();
  ctx.moveTo(w / 2, mid + 30);
  ctx.lineTo(w / 2, mid - 40);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#0a0e1a";
  ctx.font = "11px ui-sans-serif";
  const T = (2 * Math.PI) / omega;
  ctx.fillText(`T = 2π√(m/k) = ${T.toFixed(2)} s`, 12, 16);
  ctx.fillText(`x = ${x.toFixed(2)} m`, 12, 30);
}

function drawIncline(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  p: Record<string, number>
) {
  const { theta, mu, g } = p;
  const rad = (theta * Math.PI) / 180;
  const a = g * (Math.sin(rad) - mu * Math.cos(rad));
  const L = Math.min(w, h * 2) - 80;
  const cx = 40;
  const cy = h - 30;
  const topX = cx + L * Math.cos(rad);
  const topY = cy - L * Math.sin(rad);

  // Triangle ramp
  ctx.fillStyle = "#eef2ff";
  ctx.strokeStyle = "#0a0e1a";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(topX, topY);
  ctx.lineTo(topX, cy);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Block position based on a
  const displacement = Math.max(0, Math.min(L - 40, 0.5 * Math.abs(a) * t * t * 8));
  const s = a >= 0 ? L - 30 - displacement : 30 + displacement;
  const bx = cx + s * Math.cos(rad) - 20 * Math.sin(rad);
  const by = cy - s * Math.sin(rad) - 20 * Math.cos(rad);

  ctx.save();
  ctx.translate(bx, by);
  ctx.rotate(-rad);
  ctx.fillStyle = "#ec4899";
  ctx.fillRect(-20, -14, 40, 28);
  ctx.strokeStyle = "#0a0e1a";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(-20, -14, 40, 28);
  ctx.restore();

  ctx.fillStyle = "#0a0e1a";
  ctx.font = "11px ui-sans-serif";
  ctx.fillText(`a = g(sin θ − μ cos θ) = ${a.toFixed(2)} m/s²`, 12, 16);
  ctx.fillText(a >= 0 ? "Slides down" : "Stays put (friction wins)", 12, 30);
}

function drawCircuit(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  p: Record<string, number>
) {
  const { V, R, C } = p;
  const tau = R * C * 1e-6;
  const frac = 1 - Math.exp(-t / tau);
  const Q = C * V * frac * 1e-6; // Coulombs
  const vC = V * frac;

  // Schematic
  const boxX = 40;
  const boxY = 40;
  const boxW = w - 80;
  const boxH = h - 80;
  ctx.strokeStyle = "#0a0e1a";
  ctx.lineWidth = 2;
  ctx.strokeRect(boxX, boxY, boxW, boxH);
  // Battery
  ctx.beginPath();
  ctx.moveTo(boxX - 10, boxY + boxH / 2 - 10);
  ctx.lineTo(boxX - 10, boxY + boxH / 2 + 10);
  ctx.moveTo(boxX - 20, boxY + boxH / 2 - 5);
  ctx.lineTo(boxX - 20, boxY + boxH / 2 + 5);
  ctx.stroke();
  ctx.fillStyle = "#0a0e1a";
  ctx.font = "11px ui-sans-serif";
  ctx.fillText(`${V.toFixed(0)} V`, boxX - 28, boxY + boxH / 2 + 25);

  // Resistor
  const rx = boxX + boxW / 2 - 40;
  const ry = boxY - 5;
  ctx.strokeRect(rx, ry, 80, 14);
  ctx.fillText(`R`, rx + 32, ry - 3);

  // Capacitor
  const cx = boxX + boxW - 20;
  const cy = boxY + boxH / 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 20);
  ctx.lineTo(cx, cy + 20);
  ctx.moveTo(cx + 10, cy - 20);
  ctx.lineTo(cx + 10, cy + 20);
  ctx.stroke();
  ctx.fillText(`C`, cx + 16, cy + 5);

  // Fill level
  ctx.fillStyle = `rgba(236, 72, 153, ${0.2 + 0.6 * frac})`;
  ctx.fillRect(cx - 30, cy - 20, 30, 40 * frac);
  ctx.strokeStyle = "#ec4899";
  ctx.strokeRect(cx - 30, cy - 20, 30, 40);

  // Curve
  ctx.fillStyle = "#0a0e1a";
  ctx.fillText(`τ = RC = ${(tau * 1000).toFixed(1)} ms`, 12, 14);
  ctx.fillText(`V_C = ${vC.toFixed(2)} V`, 12, 28);
  ctx.fillText(`charge = ${(Q * 1000).toFixed(2)} mC`, 12, 42);
}

function drawWaves(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  p: Record<string, number>
) {
  const { n, L, v } = p;
  const f = (n * v) / (2 * L);
  const omega = 2 * Math.PI * f;
  const mid = h / 2;
  const margin = 20;
  const span = w - 2 * margin;

  // String fixed ends
  ctx.fillStyle = "#0a0e1a";
  ctx.fillRect(margin - 4, mid - 12, 4, 24);
  ctx.fillRect(w - margin, mid - 12, 4, 24);

  // Standing wave
  ctx.strokeStyle = "#4f46e5";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= 200; i++) {
    const x = (span * i) / 200;
    const y =
      (h / 4) * Math.sin((n * Math.PI * x) / span) * Math.cos(omega * t);
    const px = margin + x;
    const py = mid - y;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Nodes
  ctx.fillStyle = "#10b981";
  for (let k = 0; k <= n; k++) {
    const x = margin + (span * k) / n;
    ctx.beginPath();
    ctx.arc(x, mid, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "#0a0e1a";
  ctx.font = "11px ui-sans-serif";
  ctx.fillText(`λ = 2L/n = ${(2 * L / n).toFixed(2)} m`, 12, 16);
  ctx.fillText(`f_${n} = ${f.toFixed(2)} Hz`, 12, 30);
}

function drawOrbit(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  p: Record<string, number>,
  stateRef: React.MutableRefObject<any>,
  dt: number,
  running: boolean
) {
  const { r, GM, trail } = p;
  const cx = w / 2;
  const cy = h / 2;
  const v = Math.sqrt(GM / r);
  const omega = v / r;
  const angle = omega * t;
  const x = cx + r * Math.cos(angle);
  const y = cy + r * Math.sin(angle);

  // Central body
  ctx.fillStyle = "#f59e0b";
  ctx.beginPath();
  ctx.arc(cx, cy, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#0a0e1a";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Orbit guide
  ctx.strokeStyle = "#e5e7eb";
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Satellite
  ctx.fillStyle = "#4f46e5";
  ctx.beginPath();
  ctx.arc(x, y, 7, 0, Math.PI * 2);
  ctx.fill();
  // Velocity vector
  ctx.strokeStyle = "#10b981";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - Math.sin(angle) * 20, y + Math.cos(angle) * 20);
  ctx.stroke();

  ctx.fillStyle = "#0a0e1a";
  ctx.font = "11px ui-sans-serif";
  ctx.fillText(`v = √(GM/r) = ${v.toFixed(1)} u/s`, 12, 16);
  ctx.fillText(`T = ${(2 * Math.PI / omega).toFixed(2)} s`, 12, 30);
}

function drawCollision(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  p: Record<string, number>,
  stateRef: React.MutableRefObject<any>,
  dt: number,
  running: boolean
) {
  const { m1, m2, v1: v1Init } = p;
  const state = stateRef.current;
  if (state.m1 !== m1 || state.m2 !== m2 || state.v1 !== v1Init) {
    state.m1 = m1;
    state.m2 = m2;
    state.v1 = v1Init;
    state.x1 = 100;
    state.x2 = w - 150;
    state.curV1 = v1Init;
    state.curV2 = 0;
    state.collided = false;
  }
  if (running) {
    state.x1 += state.curV1 * dt * 20;
    state.x2 += state.curV2 * dt * 20;
    if (
      !state.collided &&
      state.x1 + 20 >= state.x2 - 20 &&
      state.curV1 > state.curV2
    ) {
      // Elastic collision formulas
      const v1New = ((m1 - m2) / (m1 + m2)) * state.curV1 + ((2 * m2) / (m1 + m2)) * state.curV2;
      const v2New = ((2 * m1) / (m1 + m2)) * state.curV1 + ((m2 - m1) / (m1 + m2)) * state.curV2;
      state.curV1 = v1New;
      state.curV2 = v2New;
      state.collided = true;
    }
    // Bounce off walls
    if (state.x1 < 20 && state.curV1 < 0) state.curV1 *= -1;
    if (state.x2 > w - 20 && state.curV2 > 0) state.curV2 *= -1;
    if (state.x1 + 20 < state.x2 - 20) state.collided = false;
  }

  const ground = h - 20;
  ctx.strokeStyle = "#0a0e1a";
  ctx.beginPath();
  ctx.moveTo(0, ground);
  ctx.lineTo(w, ground);
  ctx.stroke();

  // Cart 1
  const s1 = 14 + m1 * 3;
  ctx.fillStyle = "#ec4899";
  ctx.fillRect(state.x1 - s1, ground - s1 * 2, s1 * 2, s1 * 2);
  ctx.strokeRect(state.x1 - s1, ground - s1 * 2, s1 * 2, s1 * 2);
  // Cart 2
  const s2 = 14 + m2 * 3;
  ctx.fillStyle = "#4f46e5";
  ctx.fillRect(state.x2 - s2, ground - s2 * 2, s2 * 2, s2 * 2);
  ctx.strokeRect(state.x2 - s2, ground - s2 * 2, s2 * 2, s2 * 2);

  ctx.fillStyle = "#0a0e1a";
  ctx.font = "11px ui-sans-serif";
  ctx.fillText(`v₁ = ${state.curV1.toFixed(2)} m/s`, 12, 16);
  ctx.fillText(`v₂ = ${state.curV2.toFixed(2)} m/s`, 12, 30);
  const pTotal = m1 * state.curV1 + m2 * state.curV2;
  const kTotal = 0.5 * m1 * state.curV1 ** 2 + 0.5 * m2 * state.curV2 ** 2;
  ctx.fillText(`p = ${pTotal.toFixed(2)} kg·m/s`, 12, 44);
  ctx.fillText(`KE = ${kTotal.toFixed(2)} J`, 12, 58);
}

function drawFluid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  p: Record<string, number>
) {
  const { rhoF, rhoO, g } = p;
  const submergedFraction = Math.max(0, Math.min(1.1, rhoO / rhoF));

  // Water
  ctx.fillStyle = "#dbeafe";
  ctx.fillRect(20, h * 0.3, w - 40, h * 0.6);
  ctx.strokeStyle = "#0a0e1a";
  ctx.strokeRect(20, h * 0.3, w - 40, h * 0.6);

  // Waves
  ctx.strokeStyle = "#60a5fa";
  ctx.beginPath();
  for (let i = 0; i < w; i++) {
    const y = h * 0.3 + Math.sin((i + t * 50) * 0.1) * 2;
    if (i === 0) ctx.moveTo(i, y);
    else ctx.lineTo(i, y);
  }
  ctx.stroke();

  // Object
  const objW = 80;
  const objH = 60;
  const waterTop = h * 0.3;
  const objBottom = waterTop + submergedFraction * objH;
  const objTop = objBottom - objH;
  ctx.fillStyle = "#ec4899";
  ctx.fillRect(w / 2 - objW / 2, objTop, objW, objH);
  ctx.strokeStyle = "#0a0e1a";
  ctx.strokeRect(w / 2 - objW / 2, objTop, objW, objH);

  ctx.fillStyle = "#0a0e1a";
  ctx.font = "11px ui-sans-serif";
  ctx.fillText(`ρ_fluid = ${rhoF} kg/m³`, 12, 14);
  ctx.fillText(`ρ_object = ${rhoO} kg/m³`, 12, 28);
  ctx.fillText(
    rhoO < rhoF
      ? `Floats: ${(submergedFraction * 100).toFixed(0)}% submerged`
      : "Sinks",
    12,
    42
  );
}
