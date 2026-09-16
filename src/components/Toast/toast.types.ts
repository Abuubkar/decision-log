export type ToastAction = { label: string; run: () => void };

export type Toast = { message: string; action?: ToastAction };

export type ShowToast = (message: string, action?: ToastAction) => void;
