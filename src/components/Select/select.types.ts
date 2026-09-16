import type * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithRef } from "react";

export type SelectProps = {
  invalid?: boolean;
  style?: stylex.StyleXStyles;
} & Omit<ComponentPropsWithRef<"select">, "style">;
