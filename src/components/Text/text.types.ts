import type * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import type { styles } from "./text.styles";

export type TextTone = "default" | "muted" | "faint";

export type TextVariant = keyof typeof styles &
  ("display" | "title" | "heading" | "body" | "small" | "label");

export type TextProps<T extends ElementType> = {
  as?: T;
  variant?: TextVariant;
  tone?: TextTone;
  style?: stylex.StyleXStyles;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "style" | "children">;
