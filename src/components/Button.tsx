import * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithRef } from "react";
import { colors, radii, space, type } from "../tokens.stylex";

const styles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: space.sm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: radii.md,
    fontFamily: type.sans,
    fontSize: type.body,
    fontWeight: 500,
    cursor: "pointer",
    paddingBlock: space.sm,
    paddingInline: space.base,
    outlineOffset: "2px",
  },
  primary: {
    backgroundColor: { default: colors.ink, ":hover": "#000" },
    borderColor: colors.ink,
    color: colors.paper,
  },
  secondary: {
    backgroundColor: "transparent",
    borderColor: { default: colors.ruleStrong, ":hover": colors.ink },
    color: { default: colors.inkMuted, ":hover": colors.ink },
  },
  // A control that should read as a link: used for Clear filters and Undo.
  quiet: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: { default: colors.inkMuted, ":hover": colors.ink },
    fontSize: type.small,
    paddingInline: space.xs,
    textDecorationLine: "underline",
    textUnderlineOffset: "3px",
  },
  disabled: {
    cursor: "not-allowed",
    opacity: 0.5,
  },
});

type ButtonProps = {
  variant?: "primary" | "secondary" | "quiet";
  style?: stylex.StyleXStyles;
} & Omit<ComponentPropsWithRef<"button">, "style">;

export function Button({ variant = "secondary", style, type: htmlType, ...rest }: ButtonProps) {
  return (
    <button
      type={htmlType ?? "button"}
      {...rest}
      {...stylex.props(styles.base, styles[variant], rest.disabled && styles.disabled, style)}
    />
  );
}
