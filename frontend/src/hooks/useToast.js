import { toast } from "react-toastify";

const useToast = () => {
  const infoToast = (label, onClick) => {
    toast.info(label, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      onClick: () => {
        onClick();
      },
    });
  };
  const warnToast = (label, onClick) => {
    toast.warn(label, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      onClick: () => {
        onClick();
      },
    });
  };

  return { infoToast, warnToast };
};

export default useToast;
