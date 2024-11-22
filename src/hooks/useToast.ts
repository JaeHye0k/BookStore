import useToastStore from "@src/store/toastStore";

export const useToast = () => {
    const showToast = useToastStore((state) => state.addToast);
    const removeToast = useToastStore((state) => state.removeToast);

    return { showToast, removeToast };
};
