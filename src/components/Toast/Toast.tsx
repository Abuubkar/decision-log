import * as stylex from "@stylexjs/stylex";
import { styles } from "./toast.styles";
import type { Toast as ToastValue } from "./toast.types";

type ToastProps = {
  toast: ToastValue;
  onAction: () => void;
};

export function Toast({ toast, onAction }: ToastProps) {
  return (
    <div role="status" {...stylex.props(styles.toast)}>
      <span>{toast.message}</span>
      {toast.action && (
        <button type="button" {...stylex.props(styles.action)} onClick={onAction}>
          {toast.action.label}
        </button>
      )}
    </div>
  );
}
