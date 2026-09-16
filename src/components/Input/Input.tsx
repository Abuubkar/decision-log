import * as stylex from "@stylexjs/stylex";
import { controlStyles } from "../controls.styles";
import type { InputProps } from "./input.types";

export function Input({ invalid, style, ...rest }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      {...rest}
      {...stylex.props(controlStyles.base, invalid && controlStyles.invalid, style)}
    />
  );
}
