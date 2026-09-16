import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef } from "react";
import type { ReactNode, MouseEvent } from "react";
import { colors, space, type } from "../tokens.stylex";

const styles = stylex.create({
  // A native dialog gives us the focus trap, the Escape key and the backdrop
  // without a library.
  dialog: {
    width: "min(520px, 100%)",
    maxWidth: "none",
    height: "100dvh",
    maxHeight: "none",
    margin: 0,
    marginLeft: "auto",
    padding: 0,
    borderWidth: 0,
    borderLeftWidth: { default: "1px", "@media (max-width: 780px)": 0 },
    borderStyle: "solid",
    borderColor: colors.ruleStrong,
    backgroundColor: colors.card,
    color: colors.ink,
    fontFamily: type.sans,
    "::backdrop": { backgroundColor: "rgba(27, 24, 21, 0.28)" },
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space.md,
    paddingBlock: space.base,
    paddingInline: space.lg,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.rule,
  },
  body: {
    flex: 1,
    overflowY: "auto",
    padding: space.lg,
  },
  foot: {
    display: "flex",
    justifyContent: "flex-end",
    gap: space.sm,
    paddingBlock: space.base,
    paddingInline: space.lg,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.rule,
  },
});

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  /** Rendered in the header, next to the close control. */
  heading: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export function Drawer({ open, onClose, heading, children, footer }: DrawerProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

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
