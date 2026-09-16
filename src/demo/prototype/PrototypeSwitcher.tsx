// THROWAWAY. Deliberately ugly so it reads as scaffolding, not design.
import { useEffect } from "react";
import { VARIANTS, VARIANT_NAMES, currentVariant, goToVariant } from "./variant";

const bar: React.CSSProperties = {
  position: "fixed",
  left: "50%",
  bottom: 20,
  transform: "translateX(-50%)",
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  gap: 4,
  background: "#17161A",
  color: "#fff",
  borderRadius: 999,
  padding: 6,
  boxShadow: "0 8px 30px rgba(0,0,0,.28)",
  font: "13px system-ui, sans-serif",
};

const arrow: React.CSSProperties = {
  background: "transparent",
  border: 0,
  color: "#fff",
  padding: "6px 12px",
  borderRadius: 999,
  cursor: "pointer",
};

export function PrototypeSwitcher() {
  const variant = currentVariant();

  function step(by: number) {
    const index = VARIANTS.indexOf(variant);
    goToVariant(VARIANTS[(index + by + VARIANTS.length) % VARIANTS.length]!);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) return;
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (import.meta.env.PROD) return null;

  return (
    <div style={bar}>
      <button type="button" style={arrow} onClick={() => step(-1)}>
        &larr;
      </button>
      <span style={{ padding: "0 14px", fontWeight: 500, whiteSpace: "nowrap" }}>
        <b>{variant}</b>
        {"  "}
        {VARIANT_NAMES[variant]}
      </span>
      <button type="button" style={arrow} onClick={() => step(1)}>
        &rarr;
      </button>
    </div>
  );
}
