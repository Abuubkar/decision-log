import * as stylex from "@stylexjs/stylex";
import { controlStyles } from "../controls.styles";
import type { TextareaProps } from "./textarea.types";

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
