import * as stylex from "@stylexjs/stylex";
import { cloneElement, useId } from "react";
import type { ReactNode } from "react";
import { styles } from "./field.styles";
import type { FieldProps } from "./field.types";

/** The counter stays out of the way until the limit is close enough to matter. */
const COUNTER_SHOWS_WITHIN = 40;

/**
 * Owns the label, the control and the error message, so a form only has to
 * hand over the control. react-hook-form plugs in through the control's props.
 */
export function Field({ label, error, count, children }: FieldProps): ReactNode {
  const id = useId();
  const errorId = `${id}-error`;
  const showCount = count !== undefined && count.max - count.current <= COUNTER_SHOWS_WITHIN;
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
          {showCount && (
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
