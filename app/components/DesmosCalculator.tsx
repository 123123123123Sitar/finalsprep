"use client";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    Desmos: any;
  }
}

export default function DesmosCalculator({
  initialExprs,
}: {
  initialExprs: string[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const calcRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [showExpressions, setShowExpressions] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.Desmos) {
      initializeDesmos();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
    script.type = "text/javascript";

    script.onload = () => {
      initializeDesmos();
    };

    script.onerror = () => {
      console.error("Failed to load Desmos API from CDN");
      if (container) {
        container.innerHTML =
          '<div style="padding: 20px; color: red;">Failed to load graphing calculator.</div>';
      }
    };

    document.head.appendChild(script);

    function initializeDesmos() {
      if (!window.Desmos || !container) return;
      container.innerHTML = "";

      try {
        const calc = window.Desmos.GraphingCalculator(container, {
          expressions: true,
          expressionsCollapsed: false,
          lockViewport: false,
          zoomButtons: true,
          settingsMenu: false,
          border: false,
          expressionsTopbar: false,
          keypad: true,
          graphpaper: true,
          showGrid: true,
          fontSize: 14,
        });
        calcRef.current = calc;

        // Orange color palette matching app
        const orangeColors = ["#c2410c", "#ea580c", "#f97316", "#fb923c", "#fdba74"];

        initialExprs.forEach((expr, i) => {
          if (expr?.trim()) {
            calc.setExpression({
              id: `expr-${i}`,
              latex: expr,
              color: orangeColors[i % orangeColors.length],
            });
          }
        });

        setReady(true);
      } catch (error) {
        console.error("Desmos initialization error:", error);
      }
    }

    return () => {
      // Destroy Desmos first — it needs to clean up its own DOM before
      // React unmounts the container
      if (calcRef.current) {
        try {
          calcRef.current.destroy();
        } catch {}
        calcRef.current = null;
      }
    };
  }, []);

  // Sync expressions visibility
  useEffect(() => {
    if (!calcRef.current) return;
    try {
      calcRef.current.updateSettings({
        expressionsCollapsed: !showExpressions,
      });
    } catch {}
  }, [showExpressions]);

  // Sync grid visibility
  useEffect(() => {
    if (!calcRef.current) return;
    try {
      calcRef.current.updateSettings({ showGrid });
    } catch {}
  }, [showGrid]);

  function resetView() {
    if (!calcRef.current) return;
    try {
      calcRef.current.setMathBounds({ left: -10, right: 10, bottom: -10, top: 10 });
    } catch {}
  }

  function addExpression() {
    if (!calcRef.current) return;
    try {
      const state = calcRef.current.getState();
      const count = state.expressions.list.length;
      calcRef.current.setExpression({
        id: `user-${Date.now()}`,
        latex: "",
        color: "#c2410c",
      });
    } catch {}
  }

  function screenshot() {
    if (!calcRef.current) return;
    try {
      const dataUrl = calcRef.current.screenshot({ width: 800, height: 600 });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "graph.png";
      link.click();
    } catch {}
  }

  return (
    <div
      className={`desmos-root ${isFullscreen ? "desmos-fullscreen" : ""}`}
      style={{
        border: "1px solid rgb(var(--hair))",
        borderRadius: "0.5rem",
        overflow: "hidden",
        backgroundColor: "rgb(var(--paper))",
      }}
    >
      {/* Custom header with app styling */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderBottom: "1px solid rgb(var(--hair))",
          backgroundColor: "rgb(var(--offwhite))",
          gap: 12,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgb(var(--muted))",
          }}
        >
          Graphing Calculator
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <ToolbarButton
            active={showExpressions}
            onClick={() => setShowExpressions((v) => !v)}
            title="Toggle expressions"
          >
            {showExpressions ? "Hide" : "Show"} eqs
          </ToolbarButton>
          <ToolbarButton
            active={showGrid}
            onClick={() => setShowGrid((v) => !v)}
            title="Toggle grid"
          >
            Grid
          </ToolbarButton>
          <ToolbarButton onClick={resetView} title="Reset view">
            Reset
          </ToolbarButton>
          <ToolbarButton onClick={addExpression} title="Add expression">
            + Eq
          </ToolbarButton>
          <ToolbarButton onClick={screenshot} title="Download image">
            Save PNG
          </ToolbarButton>
          <ToolbarButton
            onClick={() => setIsFullscreen((v) => !v)}
            title="Toggle fullscreen"
          >
            {isFullscreen ? "Exit" : "Full"}
          </ToolbarButton>
        </div>
      </div>

      {/* Desmos calculator container — no children, Desmos manages DOM */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: isFullscreen ? "calc(100vh - 46px)" : "500px",
          backgroundColor: "rgb(var(--paper))",
        }}
      >
        <div
          ref={containerRef}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        {!ready && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgb(var(--muted))",
              fontSize: 14,
              pointerEvents: "none",
            }}
          >
            Loading calculator…
          </div>
        )}
      </div>

      <style jsx global>{`
        .desmos-fullscreen {
          position: fixed;
          inset: 0;
          z-index: 9999;
          border-radius: 0 !important;
          border: none !important;
        }

        /* Style Desmos internal UI to match app */
        .desmos-root .dcg-calculator-api-container {
          background: rgb(var(--paper)) !important;
          font-family: inherit !important;
        }
        .desmos-root .dcg-expression-item {
          background: rgb(var(--paper)) !important;
          border-bottom: 1px solid rgb(var(--hair)) !important;
        }
        .desmos-root .dcg-expression-item.dcg-hovered,
        .desmos-root .dcg-expression-item:hover {
          background: rgb(var(--offwhite)) !important;
        }
        .desmos-root .dcg-expression-item.dcg-selected {
          background: rgb(var(--offwhite)) !important;
          box-shadow: inset 2px 0 0 rgb(var(--orange)) !important;
        }
        .desmos-root .dcg-exp-equation-container,
        .desmos-root .dcg-exppanel {
          background: rgb(var(--paper)) !important;
        }
        .desmos-root .dcg-exp-tab,
        .desmos-root .dcg-exp-tab-container {
          background: rgb(var(--offwhite)) !important;
          border-color: rgb(var(--hair)) !important;
        }
        .desmos-root .dcg-action-newexpression,
        .desmos-root .dcg-action-toggleexpressionsvisibility {
          color: rgb(var(--muted)) !important;
        }
        .desmos-root .dcg-action-newexpression:hover,
        .desmos-root .dcg-action-toggleexpressionsvisibility:hover {
          color: rgb(var(--orange)) !important;
        }
        .desmos-root .dcg-btn-blue,
        .desmos-root .dcg-btn-primary {
          background: rgb(var(--orange)) !important;
          border-color: rgb(var(--orange)) !important;
        }
        .desmos-root .dcg-zoom-buttons-container,
        .desmos-root .dcg-graph-outer .dcg-zoom-buttons {
          background: rgb(var(--paper)) !important;
          border: 1px solid rgb(var(--hair)) !important;
          border-radius: 6px !important;
          overflow: hidden;
        }
        .desmos-root .dcg-zoom-buttons button,
        .desmos-root .dcg-zoom-buttons-container button {
          background: rgb(var(--paper)) !important;
          color: rgb(var(--ink)) !important;
          border-color: rgb(var(--hair)) !important;
        }
        .desmos-root .dcg-zoom-buttons button:hover,
        .desmos-root .dcg-zoom-buttons-container button:hover {
          background: rgb(var(--offwhite)) !important;
          color: rgb(var(--orange)) !important;
        }
        .desmos-root .dcg-keypad,
        .desmos-root .dcg-keypad-container {
          background: rgb(var(--offwhite)) !important;
          border-color: rgb(var(--hair)) !important;
        }
        .desmos-root .dcg-keypad button {
          background: rgb(var(--paper)) !important;
          color: rgb(var(--ink)) !important;
          border-color: rgb(var(--hair)) !important;
        }
        .desmos-root .dcg-keypad button:hover {
          border-color: rgb(var(--orange)) !important;
          color: rgb(var(--orange)) !important;
        }
        .desmos-root .dcg-resize-handle,
        .desmos-root .dcg-resize-handle-container {
          background: rgb(var(--hair)) !important;
        }
        .desmos-root .dcg-resize-handle:hover {
          background: rgb(var(--orange)) !important;
        }
        .desmos-root .dcg-mq-cursor {
          border-color: rgb(var(--orange)) !important;
        }
        .desmos-root .dcg-mq-selection {
          background: rgb(var(--orange) / 0.2) !important;
        }
        .desmos-root .dcg-expression-icon-container svg {
          fill: rgb(var(--muted)) !important;
        }
        .desmos-root input,
        .desmos-root textarea {
          font-family: inherit !important;
        }
        .desmos-root .dcg-tooltip {
          background: rgb(var(--ink)) !important;
          color: rgb(var(--paper)) !important;
          border-radius: 4px !important;
          font-family: inherit !important;
          font-size: 12px !important;
        }
      `}</style>
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  title,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title?: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      style={{
        fontSize: 11,
        fontWeight: 500,
        padding: "4px 10px",
        borderRadius: 5,
        border: "1px solid rgb(var(--hair))",
        backgroundColor: active ? "rgb(var(--orange))" : "rgb(var(--paper))",
        color: active ? "rgb(var(--paper))" : "rgb(var(--ink))",
        cursor: "pointer",
        transition: "all 150ms ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = "rgb(var(--orange))";
          e.currentTarget.style.color = "rgb(var(--orange))";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = "rgb(var(--hair))";
          e.currentTarget.style.color = "rgb(var(--ink))";
        }
      }}
    >
      {children}
    </button>
  );
}
