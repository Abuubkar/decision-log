import { use, useEffect, useLayoutEffect, useState } from "react";
import { ToastContext } from "./ToastContext";
import type { Toast } from "./toast.types";

export function useToast() {
  return use(ToastContext);
}

/** A toast carrying an action stays longer, because it asks to be read. */
const PLAIN_MS = 3000;
const WITH_ACTION_MS = 6000;

/**
 * A modal dialog paints in the browser's top layer, above anything in the page
 * however high its z-index. So a toast goes inside the open dialog when there
 * is one, and into the body when there is not.
 */
export function useToastHost(active: boolean) {
  const [host, setHost] = useState<HTMLElement | null>(null);
  // No dependency list: this has to re-check after every commit, so the toast
  // follows the drawer as it opens and closes.
  useLayoutEffect(() => {
    if (!active) {
      setHost(null);
      return;
    }
    const dialog = document.querySelector("dialog:modal");
    setHost(dialog instanceof HTMLElement ? dialog : document.body);
  });
  return host;
}

/** Clears the toast once it has been up long enough. */
export function useToastTimeout(toast: Toast | null, clear: () => void) {
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(clear, toast.action ? WITH_ACTION_MS : PLAIN_MS);
    return () => clearTimeout(id);
  }, [toast, clear]);
}
