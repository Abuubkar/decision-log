import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * Drives a native dialog from React state. `focusKey` changes when the drawer
 * swaps content without closing, which is when a form needs its first field.
 */
export function useDialog(
  ref: RefObject<HTMLDialogElement | null>,
  open: boolean,
  focusKey?: string,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
    // showModal lands on the first focusable element, which is the close button
    // in the header. A form would rather have its first field.
    if (open) el.querySelector<HTMLElement>("[data-autofocus]")?.focus();
  }, [ref, open, focusKey]);
}
