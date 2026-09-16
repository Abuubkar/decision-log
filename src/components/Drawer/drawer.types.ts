import type { ReactNode } from "react";

export type DrawerProps = {
  open: boolean;
  /**
   * Changes when the drawer swaps what it is showing, so the first field of a
   * form gets focus even though the drawer never closed.
   */
  focusKey?: string;
  onClose: () => void;
  /** Rendered in the header, next to the close control. */
  heading: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};
