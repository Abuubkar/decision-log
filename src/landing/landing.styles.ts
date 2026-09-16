import * as stylex from "@stylexjs/stylex";
import { colors, radii, space, type } from "../tokens.stylex";

export const styles = stylex.create({
  page: { backgroundColor: colors.paper, color: colors.ink },
  wrap: {
    maxWidth: "760px",
    marginInline: "auto",
    paddingInline: { default: space.lg, "@media (max-width: 780px)": space.base },
  },
  wide: {
    maxWidth: "1100px",
    marginInline: "auto",
    paddingInline: { default: space.lg, "@media (max-width: 780px)": space.base },
  },
  hero: {
    paddingTop: { default: "140px", "@media (max-width: 780px)": space.xxl },
    paddingBottom: { default: "100px", "@media (max-width: 780px)": space.xl },
  },
  headline: { maxWidth: "11ch" },
  support: {
    fontSize: { default: "19px", "@media (max-width: 780px)": "17px" },
    maxWidth: "46ch",
    marginTop: space.xl,
  },
  cta: {
    display: "inline-block",
    marginTop: space.xl,
    backgroundColor: { default: colors.ink, ":hover": "#000" },
    color: colors.paper,
    borderRadius: radii.sm,
    paddingBlock: "14px",
    paddingInline: space.lg,
    fontSize: "16px",
    fontWeight: 500,
    textDecorationLine: "none",
    outlineColor: colors.accent,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: "2px",
    outlineOffset: "3px",
  },
  section: {
    paddingBlock: { default: "88px", "@media (max-width: 780px)": space.xxl },
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.rule,
  },
  sunk: { backgroundColor: colors.paperSunk },
  prose: {
    fontSize: { default: "18px", "@media (max-width: 780px)": "16px" },
    lineHeight: 1.7,
    maxWidth: "58ch",
    marginTop: space.lg,
  },
  shotFrame: {
    marginTop: space.xl,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.ruleStrong,
    borderRadius: radii.lg,
    overflow: "hidden",
    boxShadow: "0 18px 50px rgba(27, 24, 21, 0.10)",
  },
  shot: { display: "block", width: "100%", height: "auto" },
  caption: { marginTop: space.md },
  list: { margin: 0, marginTop: space.xl, display: "grid", gap: space.lg },
  entry: {
    display: "grid",
    gridTemplateColumns: { default: "220px 1fr", "@media (max-width: 780px)": "1fr" },
    gap: { default: space.lg, "@media (max-width: 780px)": space.xs },
    paddingTop: space.base,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.rule,
  },
  term: { fontFamily: type.serif, fontSize: "20px", fontWeight: 600, margin: 0 },
  definition: { margin: 0, maxWidth: "52ch" },
  footer: {
    paddingBlock: space.xl,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.rule,
  },
});

/** Both calls to action point at the same place. */
export const DEMO_HREF = "./demo.html";
