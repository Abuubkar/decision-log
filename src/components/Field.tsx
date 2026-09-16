import * as stylex from "@stylexjs/stylex";
import { useId } from "react";
import type { ReactElement, ReactNode } from "react";
import { cloneElement } from "react";
import { colors, space, type } from "../tokens.stylex";

const styles = stylex.create({
  field: {
    display: "block",
  },
  label: {
    display: "block",
    marginBottom: space.xs,
    fontFamily: type.sans,
    fontSize: type.small,
    fontWeight: 500,
    color: colors.ink,
  },
  error: {
    margin: 0,
    marginTop: space.xs,
    fontFamily: type.sans,
    fontSize: type.small,
    color: colors.reversed,
  },
  below: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: space.md,
  },
  count: {
    margin: 0,
    marginTop: space.xs,
    marginLeft: "auto",
    fontFamily: type.sans,
    fontSize: type.small,
    fontVariantNumeric: "tabular-nums",
    color: colors.inkFaint,
  },
  countFull: { color: colors.reversed },
});

/** The counter stays out of the way until the limit is close enough to matter. */
const COUNTER_SHOWS_WITHIN = 40;

type FieldProps = {
  label: string;
  error?: string;
  /** Renders an `X / Y` count once the value approaches the limit. */
  count?: { current: number; max: number };
  /** A single control: Input, Textarea or Select. */
  children: ReactElement<{ id?: string; "aria-describedby"?: string; invalid?: boolean }>;
};

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
