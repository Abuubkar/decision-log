import * as stylex from "@stylexjs/stylex";
import { radii, space, type } from "../../tokens.stylex";

export const styles = stylex.create({
  toast: {
    position: "fixed",
    bottom: { default: space.lg, "@media (max-width: 780px)": space.md },
    right: { default: space.lg, "@media (max-width: 780px)": space.md },
    left: { default: "auto", "@media (max-width: 780px)": space.md },
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    gap: space.base,
    backgroundColor: "#17161a",
    color: "#fff",
    borderRadius: radii.md,
    paddingBlock: space.md,
    paddingInline: space.base,
    fontFamily: type.sans,
    fontSize: type.body,
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
  },
  // Undo is a real action, so it gets the shape of one against the dark toast.
  action: {
    backgroundColor: { default: "transparent", ":hover": "rgba(255, 255, 255, 0.14)" },
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: { default: "rgba(255, 255, 255, 0.4)", ":hover": "rgba(255, 255, 255, 0.7)" },
    borderRadius: radii.pill,
    paddingBlock: "4px",
    paddingInline: space.md,
    color: "#fff",
    fontFamily: type.sans,
    fontSize: type.small,
    fontWeight: 500,
    cursor: "pointer",
    outlineColor: "#fff",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: "2px",
    outlineOffset: "2px",
  },
});
