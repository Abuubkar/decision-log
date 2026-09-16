import * as stylex from "@stylexjs/stylex";
import { useRef } from "react";
import type { MouseEvent } from "react";
import { useDialog } from "./drawer.hooks";
import { styles } from "./drawer.styles";
import type { DrawerProps } from "./drawer.types";

export function Drawer({ open, focusKey, onClose, heading, children, footer }: DrawerProps) {
  const ref = useRef<HTMLDialogElement>(null);
  useDialog(ref, open, focusKey);

  // A click that lands on the dialog element itself landed on the backdrop.
  function onBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === ref.current) onClose();
  }

  return (
    <dialog ref={ref} onClose={onClose} onClick={onBackdrop} {...stylex.props(styles.dialog)}>
      <div {...stylex.props(styles.inner)}>
        <div {...stylex.props(styles.head)}>{heading}</div>
        <div {...stylex.props(styles.body)}>{children}</div>
        {footer && <div {...stylex.props(styles.foot)}>{footer}</div>}
      </div>
    </dialog>
  );
}
