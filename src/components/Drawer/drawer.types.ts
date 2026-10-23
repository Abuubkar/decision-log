import type { ReactNode } from "react";

export type DrawerProps = {
  open: boolean;
  /**
   * Changes when the drawer swaps what it is showing, so the first field of a
   * form gets focus even though the drawer never closed.
   */
  focusKey?: string;
  onClose: () => void;
  /**
   * Asked before Escape or a backdrop click closes the drawer. Returning false
   * keeps it open. The close control in the heading belongs to the caller, so
   * the caller guards that one itself.
   */
  onBeforeClose?: () => boolean;
  /** Rendered in the header, next to the close control. */
  heading: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};
