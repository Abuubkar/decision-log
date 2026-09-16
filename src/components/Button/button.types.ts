import type * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "quiet";

export type ButtonProps = {
  variant?: ButtonVariant;
  style?: stylex.StyleXStyles;
} & Omit<ComponentPropsWithRef<"button">, "style">;
