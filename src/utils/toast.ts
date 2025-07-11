import toast from "react-hot-toast";

interface CustomToastOptions {
  duration?: number;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

// Custom toast với progress bar
export const showToast = {
  success: (message: string, options?: CustomToastOptions) => {
    const duration = options?.duration || 4000;

    return toast.success(message, {
      duration,
      className: "custom-toast success",
      style: {
        "--duration": `${duration}ms`,
      } as React.CSSProperties,
      position: options?.position || "top-right",
    });
  },

  error: (message: string, options?: CustomToastOptions) => {
    const duration = options?.duration || 5000;

    return toast.error(message, {
      duration,
      className: "custom-toast error",
      style: {
        "--duration": `${duration}ms`,
      } as React.CSSProperties,
      position: options?.position || "top-right",
    });
  },

  info: (message: string, options?: CustomToastOptions) => {
    const duration = options?.duration || 4000;

    return toast(message, {
      duration,
      className: "custom-toast info",
      style: {
        "--duration": `${duration}ms`,
      } as React.CSSProperties,
      position: options?.position || "top-right",
      icon: "ℹ️",
    });
  },

  warning: (message: string, options?: CustomToastOptions) => {
    const duration = options?.duration || 4000;

    return toast(message, {
      duration,
      className: "custom-toast warning",
      style: {
        "--duration": `${duration}ms`,
      } as React.CSSProperties,
      position: options?.position || "top-right",
      icon: "⚠️",
    });
  },
};

// Export default để tương thích với code hiện tại
export default showToast;
