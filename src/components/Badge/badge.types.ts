import type * as stylex from "@stylexjs/stylex";

export type BadgeProps = {
  tone: "active" | "superseded" | "reversed";
  children: string;
  style?: stylex.StyleXStyles;
};
