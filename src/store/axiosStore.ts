import { AxiosInstance, AxiosRequestConfig } from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createClient, httpClient } from "../api/http";

interface StoreState {
    httpClient: AxiosInstance;
    storeAxiosInstance: (config?: AxiosRequestConfig) => void;
}

export const useAxiosStore = create<StoreState>()(
    immer((set) => ({
        httpClient: httpClient,
        storeAxiosInstance: (config) =>
            set((state) => {
                state.httpClient = createClient(config);
            }),
    })),
);
