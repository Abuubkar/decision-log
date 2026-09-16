import * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithRef } from "react";
import { controlStyles } from "./Input";

type TextareaProps = {
  invalid?: boolean;
  style?: stylex.StyleXStyles;
} & Omit<ComponentPropsWithRef<"textarea">, "style">;

export function Textarea({ invalid, style, ...rest }: TextareaProps) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      {...rest}
      {...stylex.props(
        controlStyles.base,
        controlStyles.textarea,
        invalid && controlStyles.invalid,
        style,
      )}
    />
  );
}
