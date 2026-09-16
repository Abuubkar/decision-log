import type * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithRef } from "react";

export type TextareaProps = {
  invalid?: boolean;
  style?: stylex.StyleXStyles;
} & Omit<ComponentPropsWithRef<"textarea">, "style">;
