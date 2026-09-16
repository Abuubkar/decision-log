import * as stylex from "@stylexjs/stylex";
import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import { colors, type } from "../tokens.stylex";

const styles = stylex.create({
  base: {
    margin: 0,
    fontFamily: type.sans,
    fontSize: type.body,
    lineHeight: 1.6,
    color: colors.ink,
  },
  display: {
    fontFamily: type.serif,
    fontSize: type.display,
    fontWeight: 600,
    lineHeight: 0.99,
    letterSpacing: "-0.03em",
  },
  title: {
    fontFamily: type.serif,
    fontSize: type.title,
    fontWeight: 600,
    lineHeight: 1.1,
    letterSpacing: "-0.015em",
  },
  heading: {
    fontFamily: type.serif,
    fontSize: type.heading,
    fontWeight: 600,
    lineHeight: 1.3,
  },
  body: {},
  small: {
    fontSize: type.small,
    lineHeight: 1.62,
  },
  // Uppercase metadata: dates, owners, field labels.
  label: {
    fontSize: type.label,
    letterSpacing: "0.09em",
    textTransform: "uppercase",
    color: colors.inkFaint,
  },
  muted: { color: colors.inkMuted },
  faint: { color: colors.inkFaint },
});

type Tone = "default" | "muted" | "faint";
type Variant = keyof typeof styles & ("display" | "title" | "heading" | "body" | "small" | "label");

type TextProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  tone?: Tone;
  style?: stylex.StyleXStyles;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "style" | "children">;

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
