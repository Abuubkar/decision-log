import * as stylex from "@stylexjs/stylex";
import { useEffect, useState } from "react";

/**
 * PROTOTYPE. Throwaway. A floating pill that cycles ?variant= on the current
 * URL. Never rendered in a production build.
 */

export type VariantKey = string;

const styles = stylex.create({
  bar: {
    position: "fixed",
    bottom: "18px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    paddingBlock: "8px",
    paddingInline: "10px",
    borderRadius: "999px",
    backgroundColor: "#111",
    color: "#fff",
    fontFamily: "ui-monospace, Menlo, monospace",
    fontSize: "13px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
  },
  arrow: {
    background: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.35)",
    borderRadius: "999px",
    width: "28px",
    height: "28px",
    cursor: "pointer",
  },
  label: { minWidth: "180px", textAlign: "center" },
});

export function readVariant(fallback: string) {
  return new URLSearchParams(window.location.search).get("variant") ?? fallback;
}

function writeVariant(key: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("variant", key);
  window.history.replaceState(null, "", url);
}

export function useVariant(keys: string[]) {
  const [variant, setVariant] = useState(() => {
    const initial = readVariant(keys[0]!);
    return keys.includes(initial) ? initial : keys[0]!;
  });
  const go = (step: number) => {
    const index = keys.indexOf(variant);
    const next = keys[(index + step + keys.length) % keys.length]!;
    writeVariant(next);
    setVariant(next);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  return { variant, go };
}

type Props = { variants: Record<string, string>; current: string; go: (step: number) => void };

export function PrototypeSwitcher({ variants, current, go }: Props) {
  if (import.meta.env.PROD) return null;
  return (
    <div {...stylex.props(styles.bar)}>
      <button
        type="button"
        aria-label="Previous variant"
        onClick={() => go(-1)}
        {...stylex.props(styles.arrow)}
      >
        ←
      </button>
      <span {...stylex.props(styles.label)}>
        {current} ({variants[current]})
      </span>
      <button
        type="button"
        aria-label="Next variant"
        onClick={() => go(1)}
        {...stylex.props(styles.arrow)}
      >
        →
      </button>
    </div>
  );
}
