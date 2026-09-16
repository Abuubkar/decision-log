import type { ReactElement } from "react";

/** The props Field injects into whichever control it wraps. */
export type FieldControl = ReactElement<{
  id?: string;
  "aria-describedby"?: string;
  invalid?: boolean;
}>;

export type FieldProps = {
  label: string;
  error?: string;
  /** Renders an `X / Y` count once the value approaches the limit. */
  count?: { current: number; max: number };
  /** A single control: Input, Textarea or Select. */
  children: FieldControl;
};
