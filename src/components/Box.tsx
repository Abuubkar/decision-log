import * as stylex from "@stylexjs/stylex";
import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

type BoxProps<T extends ElementType> = {
  as?: T;
  style?: stylex.StyleXStyles;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "style" | "children">;

/**
 * A div that takes StyleX styles, or any other element through `as` when the
 * tag carries meaning (section, header, article, aside).
 */
export function Box<T extends ElementType = "div">({ as, style, ...rest }: BoxProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return <Tag {...rest} {...stylex.props(style)} />;
}
