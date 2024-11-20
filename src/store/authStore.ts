import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface StoreState {
    isLoggedIn: boolean;
    storeLogin: (token: string) => void;
    storeLogout: () => void;
}

export const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
};

const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

export const useAuthStore = create<StoreState>()(
    immer((set) => ({
        isLoggedIn: getToken() ? true : false,
        storeLogin: (token) =>
            set((state) => {
                setToken(token);
                state.isLoggedIn = true;
            }),
        storeLogout: () =>
            set((state) => {
                removeToken();
                state.isLoggedIn = false;
            }),
    })),
);
