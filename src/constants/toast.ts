import { Slide, type ToastContainerProps, type ToastPosition } from "react-toastify";

const toastConfig: ToastContainerProps = {
  position: 'top-center' as ToastPosition,
  transition: Slide,
  autoClose: 5000,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'dark',
};

export { toastConfig };
