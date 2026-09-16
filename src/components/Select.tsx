import * as stylex from "@stylexjs/stylex";
import type { ComponentPropsWithRef } from "react";
import { controlStyles } from "./Input";

type SelectProps = {
  invalid?: boolean;
  style?: stylex.StyleXStyles;
} & Omit<ComponentPropsWithRef<"select">, "style">;

export function Select({ invalid, style, ...rest }: SelectProps) {
  return (
    <select
      aria-invalid={invalid || undefined}
      {...rest}
      {...stylex.props(controlStyles.base, invalid && controlStyles.invalid, style)}
    />
  );
}
