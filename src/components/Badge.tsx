import * as stylex from "@stylexjs/stylex";
import { colors, radii, space, type } from "../tokens.stylex";

const styles = stylex.create({
  badge: {
    display: "inline-block",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "currentColor",
    borderRadius: radii.pill,
    paddingBlock: "3px",
    paddingInline: space.md,
    fontFamily: type.sans,
    fontSize: type.label,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  active: { color: colors.active },
  superseded: { color: colors.superseded },
  reversed: { color: colors.reversed },
});

type BadgeProps = {
  tone: "active" | "superseded" | "reversed";
  children: string;
  style?: stylex.StyleXStyles;
};

export function Badge({ tone, children, style }: BadgeProps) {
  return <span {...stylex.props(styles.badge, styles[tone], style)}>{children}</span>;
}
