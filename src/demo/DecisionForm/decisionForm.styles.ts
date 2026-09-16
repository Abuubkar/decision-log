import * as stylex from "@stylexjs/stylex";
import { space } from "../../tokens.stylex";

export const styles = stylex.create({
  form: { display: "flex", flexDirection: "column", height: "100%" },
  fields: { display: "grid", gap: space.base },
  pair: {
    display: "grid",
    gridTemplateColumns: { default: "1fr 1fr", "@media (max-width: 780px)": "1fr" },
    gap: space.base,
  },
  actions: { display: "flex", justifyContent: "flex-end", gap: space.sm, marginTop: space.lg },
});
