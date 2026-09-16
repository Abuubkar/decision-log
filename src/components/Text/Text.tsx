import * as stylex from "@stylexjs/stylex";
import type { ElementType } from "react";
import { styles } from "./text.styles";
import type { TextProps } from "./text.types";

export function Text<T extends ElementType = "p">({
  as,
  variant = "body",
  tone = "default",
  style,
  ...rest
}: TextProps<T>) {
  const Tag = (as ?? "p") as ElementType;
  return (
    <Tag
      {...rest}
      {...stylex.props(
        styles.base,
        styles[variant],
        tone === "muted" && styles.muted,
        tone === "faint" && styles.faint,
        style,
      )}
    />
  );
}
