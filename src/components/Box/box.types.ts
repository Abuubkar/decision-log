import type * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type BoxProps<T extends ElementType> = {
  as?: T;
  style?: stylex.StyleXStyles;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "style" | "children">;
