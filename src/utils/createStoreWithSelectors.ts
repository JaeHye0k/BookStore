import { StoreApi, UseBoundStore } from "zustand";

type GenericState = Record<string, any>;
type SelectorFunction<T> = <K extends keyof T>(keys: K[]) => Pick<T, K>;
type CreateStoreWithSelectors = <T extends GenericState>(
    store: UseBoundStore<StoreApi<T>>,
) => <K extends keyof T>(keys: K[]) => Pick<T, K>;

export const createStoreWithSelectors: CreateStoreWithSelectors = <T extends GenericState>(
    store: UseBoundStore<StoreApi<T>>,
) => {
    const useStore: SelectorFunction<T> = <K extends keyof T>(keys: K[]) => {
        return store((state) => {
            const x = keys.reduce((acc, cur) => {
                acc[cur] = state[cur];
                return acc;
            }, {} as T);

            return x as Pick<T, K>;
        });
    };

    return useStore;
};
