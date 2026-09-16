import * as stylex from "@stylexjs/stylex";
import type { ElementType } from "react";
import type { BoxProps } from "./box.types";

/**
 * A div that takes StyleX styles, or any other element through `as` when the
 * tag carries meaning (section, header, article, aside).
 */
export function Box<T extends ElementType = "div">({ as, style, ...rest }: BoxProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return <Tag {...rest} {...stylex.props(style)} />;
}
