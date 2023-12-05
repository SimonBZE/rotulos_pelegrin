import { toast } from "react-toastify";

export const useToast = () => {
    const notify = (mensaje, type = "") => type === "" ? toast(mensaje) : toast[type](mensaje);
  return { notify }
}
