import * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithRef } from "react";
import { colors, radii, space, type } from "../tokens.stylex";

export const controlStyles = stylex.create({
  base: {
    width: "100%",
    backgroundColor: colors.card,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: { default: colors.ruleStrong, ":focus": colors.ink },
    borderRadius: radii.md,
    paddingBlock: space.sm,
    paddingInline: space.md,
    fontFamily: type.sans,
    fontSize: type.body,
    color: colors.ink,
    outline: { default: null, ":focus": "none" },
  },
  invalid: {
    borderColor: colors.reversed,
  },
  textarea: {
    minHeight: "88px",
    resize: "vertical",
    lineHeight: 1.55,
  },
});

type InputProps = {
  invalid?: boolean;
  style?: stylex.StyleXStyles;
} & Omit<ComponentPropsWithRef<"input">, "style">;

export function Input({ invalid, style, ...rest }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      {...rest}
      {...stylex.props(controlStyles.base, invalid && controlStyles.invalid, style)}
    />
  );
}
