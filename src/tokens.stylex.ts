import * as stylex from "@stylexjs/stylex";

export const colors = stylex.defineVars({
  paper: "#fbf9f5",
  paperSunk: "#f4f0e7",
  card: "#fffdfa",
  ink: "#1b1815",
  inkMuted: "#6a635a",
  inkFaint: "#9b9389",
  rule: "#e4ddd1",
  ruleStrong: "#cfc6b6",
  accent: "#34506b",
  // One colour per status. Muted on purpose: a log of settled decisions
  // should not read like a dashboard of alarms.
  active: "#3e6b4f",
  superseded: "#8a6d3b",
  reversed: "#8c4a45",
});

const narrow = "@media (max-width: 780px)";

export const type = stylex.defineVars({
  serif: '"Source Serif 4", Georgia, serif',
  sans: '"IBM Plex Sans", system-ui, sans-serif',
  display: { default: "84px", [narrow]: "44px" },
  title: { default: "42px", [narrow]: "30px" },
  heading: { default: "19px", [narrow]: "18px" },
  body: "15px",
  small: "13px",
  label: "11.5px",
});

export const space = stylex.defineVars({
  xs: "4px",
  sm: "8px",
  md: "12px",
  base: "16px",
  lg: "24px",
  xl: "40px",
  xxl: "64px",
});

export const radii = stylex.defineVars({
  sm: "2px",
  md: "3px",
  lg: "6px",
  pill: "999px",
});
