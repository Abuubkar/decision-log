import * as stylex from "@stylexjs/stylex";
import { colors } from "@/tokens.stylex";

export const styles = stylex.create({
  dot: {
    width: "8px",
    height: "8px",
    flex: "none",
    borderRadius: "50%",
    borderWidth: "1.5px",
    borderStyle: "solid",
    backgroundColor: "transparent",
  },
  // A decision that stopped holding keeps its place and loses its fill, so the
  // dot says whether it holds before the colour says which status it is in.
  filled: { backgroundColor: "currentColor" },
  green: { color: colors.active, borderColor: colors.active },
  amber: { color: colors.superseded, borderColor: colors.superseded },
  red: { color: colors.reversed, borderColor: colors.reversed },
  slate: { color: colors.slate, borderColor: colors.slate },
  blue: { color: colors.blue, borderColor: colors.blue },
});
