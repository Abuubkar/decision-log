import { createContext } from "react";
import type { ShowToast } from "./toast.types";

export const ToastContext = createContext<ShowToast>(() => {});
