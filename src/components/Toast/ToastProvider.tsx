import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { Toast } from "./Toast";
import { ToastContext } from "./ToastContext";
import { useToastHost, useToastTimeout } from "./toast.hooks";
import type { ShowToast, Toast as ToastValue } from "./toast.types";

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastValue | null>(null);
  const host = useToastHost(toast !== null);

  const clear = useCallback(() => setToast(null), []);
  const show = useCallback<ShowToast>((message, action) => setToast({ message, action }), []);
  useToastTimeout(toast, clear);

  return (
    <ToastContext value={show}>
      {children}
      {toast &&
        host &&
        createPortal(
          <Toast
            toast={toast}
            onAction={() => {
              toast.action?.run();
              clear();
            }}
          />,
          host,
        )}
    </ToastContext>
  );
}
