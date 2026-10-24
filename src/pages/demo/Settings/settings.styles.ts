import * as stylex from "@stylexjs/stylex";
import { colors, radii, space, type } from "@/tokens.stylex";

export const styles = stylex.create({
  heading: { marginTop: space.md, marginBottom: space.sm },
  lede: { marginTop: 0, marginBottom: space.lg },
  back: { marginTop: space.md, marginLeft: `calc(-1 * ${space.xs})`, paddingInline: space.xs },

  menu: { display: "grid", marginTop: space.lg },
  danger: {
    display: "grid",
    marginTop: space.lg,
    paddingTop: space.md,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.rule,
  },
  choice: {
    display: "grid",
    gap: "2px",
    textAlign: "left",
    width: "100%",
    paddingBlock: space.md,
    paddingInline: space.md,
    marginInline: `calc(-1 * ${space.md})`,
    borderWidth: 0,
    borderRadius: radii.md,
    backgroundColor: { default: "transparent", ":hover": colors.paperSunk },
    cursor: { default: "pointer", ":disabled": "not-allowed" },
    opacity: { default: 1, ":disabled": 0.5 },
    outlineColor: colors.accent,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: "2px",
    outlineOffset: "-2px",
  },
  choiceLabel: { fontSize: type.body, fontWeight: 500, color: colors.ink },
  choiceNote: { fontSize: type.small, color: colors.inkMuted },

  add: { display: "flex", gap: space.sm, alignItems: "stretch" },
  addStatus: { display: "grid", gap: space.md },

  /**
   * Always in the layout, so a message appearing or going does not move the
   * list underneath it. Only the ink changes.
   */
  message: {
    minHeight: "1.4em",
    margin: 0,
    marginTop: space.sm,
    fontSize: type.small,
    color: colors.reversed,
  },
  messageQuiet: { visibility: "hidden" },

  list: {
    listStyle: "none",
    margin: 0,
    marginTop: space.md,
    padding: 0,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.rule,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr auto auto auto",
    alignItems: "center",
    gap: space.sm,
    paddingBlock: space.sm,
    minHeight: "52px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.rule,
  },
  // The row being edited keeps the height of the row it replaced.
  rowEditing: { gridTemplateColumns: "1fr", backgroundColor: colors.paperSunk },
  rowStacked: { gap: space.md, paddingBlock: space.md },

  count: {
    color: colors.inkFaint,
    fontSize: type.small,
    fontVariantNumeric: "tabular-nums",
  },

  statusName: { display: "flex", alignItems: "center", gap: space.sm },
  holds: { fontSize: type.label, color: colors.inkFaint },
  holdsField: {
    display: "flex",
    alignItems: "center",
    gap: space.sm,
    fontSize: type.small,
    color: colors.inkMuted,
  },

  tones: { display: "flex", gap: space.sm },
  tone: {
    width: "22px",
    height: "22px",
    padding: 0,
    borderRadius: "50%",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "transparent",
    backgroundColor: "currentColor",
    cursor: "pointer",
    outlineColor: colors.accent,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: "2px",
    outlineOffset: "2px",
  },
  toneChosen: { borderColor: colors.ink },
  green: { color: colors.active },
  amber: { color: colors.superseded },
  red: { color: colors.reversed },
  slate: { color: colors.slate },
  blue: { color: colors.blue },
});
