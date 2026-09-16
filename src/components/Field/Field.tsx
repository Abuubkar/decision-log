import * as stylex from "@stylexjs/stylex";
import { cloneElement, useId } from "react";
import type { ReactNode } from "react";
import { styles } from "./field.styles";
import type { FieldProps } from "./field.types";

/**
 * Owns the label, the control and the error message, so a form only has to
 * hand over the control. react-hook-form plugs in through the control's props.
 */
export function Field({ label, error, count, children }: FieldProps): ReactNode {
  const id = useId();
  const errorId = `${id}-error`;
  // Always rendered when a field has a cap, so nothing below it moves as you type.
  const showCount = count !== undefined;
  return (
    <div {...stylex.props(styles.field)}>
      <label htmlFor={id} {...stylex.props(styles.label)}>
        {label}
      </label>
      {cloneElement(children, {
        id,
        invalid: Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}
      {(error || showCount) && (
        <div {...stylex.props(styles.below)}>
          {error && (
            <p id={errorId} {...stylex.props(styles.error)}>
              {error}
            </p>
          )}
          {count && (
            <p
              {...stylex.props(styles.count, count.current >= count.max && styles.countFull)}
              aria-hidden="true"
            >
              {count.current} / {count.max}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
