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
});

type FieldProps = {
  label: string;
  error?: string;
  /** A single control: Input, Textarea or Select. */
  children: ReactElement<{ id?: string; "aria-describedby"?: string; invalid?: boolean }>;
};

/**
 * Owns the label, the control and the error message, so a form only has to
 * hand over the control. react-hook-form plugs in through the control's props.
 */
export function Field({ label, error, children }: FieldProps): ReactNode {
  const id = useId();
  const errorId = `${id}-error`;
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
      {error && (
        <p id={errorId} {...stylex.props(styles.error)}>
          {error}
        </p>
      )}
    </div>
  );
}
