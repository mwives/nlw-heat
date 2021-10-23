import { toast, ToastOptions } from "react-toastify";

const toastConfigs = {
  position: "top-left",
  theme: "colored",
} as ToastOptions;

export function useToast() {
  return { toast, toastConfigs };
}
