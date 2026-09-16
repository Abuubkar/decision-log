import * as stylex from "@stylexjs/stylex";
import { createContext, use, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { radii, space, type } from "../tokens.stylex";

const styles = stylex.create({
  toast: {
    position: "fixed",
    top: { default: space.lg, "@media (max-width: 780px)": space.md },
    right: { default: space.lg, "@media (max-width: 780px)": space.md },
    left: { default: "auto", "@media (max-width: 780px)": space.md },
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    gap: space.base,
    backgroundColor: "#17161a",
    color: "#fff",
    borderRadius: radii.md,
    paddingBlock: space.md,
    paddingInline: space.base,
    fontFamily: type.sans,
    fontSize: type.body,
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
  },
  action: {
    background: "none",
    borderWidth: 0,
    padding: 0,
    color: "inherit",
    fontWeight: 600,
    cursor: "pointer",
    textDecorationLine: "underline",
    textUnderlineOffset: "3px",
  },
});

type Toast = { message: string; action?: { label: string; run: () => void } };
type ShowToast = (message: string, action?: Toast["action"]) => void;

const ToastContext = createContext<ShowToast>(() => {});

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
function useToastHost(active: boolean) {
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

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const host = useToastHost(toast !== null);

  const show = useCallback<ShowToast>((message, action) => {
    setToast({ message, action });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), toast.action ? WITH_ACTION_MS : PLAIN_MS);
    return () => clearTimeout(id);
  }, [toast]);

  return (
    <ToastContext value={show}>
      {children}
      {toast &&
        host &&
        createPortal(
          <div role="status" {...stylex.props(styles.toast)}>
            <span>{toast.message}</span>
            {toast.action && (
              <button
                type="button"
                {...stylex.props(styles.action)}
                onClick={() => {
                  toast.action?.run();
                  setToast(null);
                }}
              >
                {toast.action.label}
              </button>
            )}
          </div>,
          host,
        )}
    </ToastContext>
  );
}
