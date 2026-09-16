import * as stylex from "@stylexjs/stylex";
import { controlStyles } from "../controls.styles";
import type { SelectProps } from "./select.types";

export function Select({ invalid, style, ...rest }: SelectProps) {
  return (
    <select
      aria-invalid={invalid || undefined}
      {...rest}
      {...stylex.props(controlStyles.base, invalid && controlStyles.invalid, style)}
    />
  );
}
