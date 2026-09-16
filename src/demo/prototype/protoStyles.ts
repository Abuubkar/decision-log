// THROWAWAY.
import * as stylex from "@stylexjs/stylex";
import { colors, radii, space, type } from "../../tokens.stylex";

export const protoStyles = stylex.create({
  // ── A: a section in the detail drawer ────────────────────────────
  section: {
    marginTop: space.xl,
    paddingTop: space.base,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.rule,
  },
  rows: { marginTop: space.md, display: "grid", gap: space.sm },
  row: {
    display: "grid",
    gridTemplateColumns: "88px 1fr",
    gap: space.md,
    alignItems: "baseline",
  },
  when: { fontVariantNumeric: "tabular-nums" },

  // ── B: tabs across the drawer header ─────────────────────────────
  tabs: { display: "flex", gap: space.lg, alignItems: "baseline" },
  tab: {
    background: "none",
    borderWidth: 0,
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: { default: "transparent", ":hover": colors.ruleStrong },
    borderRadius: 0,
    padding: 0,
    paddingBottom: "4px",
    fontFamily: type.sans,
    fontSize: type.label,
    letterSpacing: "0.09em",
    textTransform: "uppercase",
    fontWeight: 500,
    color: { default: colors.inkFaint, ":hover": colors.inkMuted },
    cursor: "pointer",
  },
  tabOn: { color: colors.ink, borderBottomColor: colors.ink },
  count: { marginLeft: space.sm, color: colors.inkFaint, letterSpacing: 0 },

  // ── B: a timeline with a spine ───────────────────────────────────
  spine: { position: "relative", marginTop: space.sm, paddingLeft: space.lg },
  spineRule: {
    position: "absolute",
    left: "4px",
    top: "10px",
    bottom: "10px",
    width: "1px",
    backgroundColor: colors.rule,
  },
  node: { position: "relative", paddingBottom: space.lg },
  marker: {
    position: "absolute",
    left: "-20px",
    top: "7px",
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderColor: colors.ruleStrong,
    backgroundColor: colors.card,
  },
  markerNow: { borderColor: colors.ink, backgroundColor: colors.ink },
  markerStanding: { borderColor: colors.superseded, backgroundColor: colors.card },

  // ── C: a global feed replacing the log ───────────────────────────
  feed: {
    maxWidth: "1120px",
    marginInline: "auto",
    paddingInline: { default: space.lg, "@media (max-width: 780px)": space.base },
    paddingBlock: space.lg,
  },
  feedBox: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.ruleStrong,
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    overflow: "hidden",
  },
  day: {
    display: "flex",
    alignItems: "center",
    gap: space.md,
    paddingTop: space.base,
    paddingBottom: "6px",
    paddingInline: space.lg,
  },
  dayRule: { flex: 1, height: "1px", backgroundColor: colors.rule },
  feedRow: {
    display: "grid",
    gridTemplateColumns: { default: "1fr 200px", "@media (max-width: 780px)": "1fr" },
    gap: space.lg,
    width: "100%",
    textAlign: "left",
    backgroundColor: { default: "transparent", ":hover": colors.paperSunk },
    borderWidth: 0,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.rule,
    paddingBlock: space.md,
    paddingInline: space.lg,
    cursor: "pointer",
  },
  what: { display: "flex", alignItems: "center", gap: space.md },
  toggle: { marginRight: space.sm },

  // shared tones
  active: { color: colors.active },
  superseded: { color: colors.superseded },
  reversed: { color: colors.reversed },
});
