import { useLayoutEffect } from "react";
import type { RefObject } from "react";

/**
 * Drives a native dialog from React state. `focusKey` changes when the drawer
 * swaps content without closing, which is when a form needs its first field.
 *
 * A layout effect, so the dialog has opened or closed before anything above it
 * in the tree looks. The toast picks its host by asking for the open dialog,
 * and a passive effect here left it rendering into a drawer that had already
 * gone: deleting a decision closes the drawer, and the undo went with it.
 */
export function useDialog(
  ref: RefObject<HTMLDialogElement | null>,
  open: boolean,
  focusKey?: string,
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
    // showModal lands on the first focusable element, which is the close button
    // in the header. A form would rather have its first field.
    if (open) el.querySelector<HTMLElement>("[data-autofocus]")?.focus();
  }, [ref, open, focusKey]);
}
