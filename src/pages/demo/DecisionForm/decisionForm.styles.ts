import * as stylex from "@stylexjs/stylex";
import { colors, radii, space } from "@/tokens.stylex";

export const styles = stylex.create({
  form: { display: "flex", flexDirection: "column", height: "100%" },
  fields: { display: "grid", gap: space.base },
  pair: {
    display: "grid",
    gridTemplateColumns: { default: "1fr 1fr", "@media (max-width: 780px)": "1fr" },
    gap: space.base,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: space.sm,
    marginTop: space.lg,
  },
  delete: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    // 34px under a mouse, 44px under a finger, matching every other icon.
    width: { default: "34px", "@media (pointer: coarse)": "44px" },
    height: { default: "34px", "@media (pointer: coarse)": "44px" },
    padding: 0,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: { default: "transparent", ":hover": colors.reversed },
    borderRadius: radii.md,
    backgroundColor: "transparent",
    color: { default: colors.reversed, ":hover": colors.reversed },
    cursor: "pointer",
    outlineColor: colors.reversed,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: "2px",
    outlineOffset: "2px",
  },
});
