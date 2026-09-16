import * as stylex from "@stylexjs/stylex";
import { styles } from "./button.styles";
import type { ButtonProps } from "./button.types";

export function Button({ variant = "secondary", style, type: htmlType, ...rest }: ButtonProps) {
  return (
    <button
      type={htmlType ?? "button"}
      {...rest}
      {...stylex.props(styles.base, styles[variant], rest.disabled && styles.disabled, style)}
    />
  );
}
