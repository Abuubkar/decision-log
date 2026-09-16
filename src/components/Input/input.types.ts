import type * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithRef } from "react";

export type InputProps = {
  invalid?: boolean;
  style?: stylex.StyleXStyles;
} & Omit<ComponentPropsWithRef<"input">, "style">;
