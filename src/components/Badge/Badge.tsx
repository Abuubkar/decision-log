import * as stylex from "@stylexjs/stylex";
import { styles } from "./badge.styles";
import type { BadgeProps } from "./badge.types";

export function Badge({ tone, children, style }: BadgeProps) {
  return <span {...stylex.props(styles.badge, styles[tone], style)}>{children}</span>;
}
