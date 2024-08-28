import toast from "react-hot-toast";

export const useToaster = () => {
  return {
    alert: (...params: Parameters<typeof toast>) => {
      params[1] = {
        ...params[1],
        style: {
          ...params[1]?.style,
          backgroundColor: "#EF4444",
          color: "#FFFFFF",
        },
      };
      toast.error(params[0], {
        style: {
          backgroundColor: "#EF4444",
          color: "#FFFFFF",
        },
      });
    },
  };
};
