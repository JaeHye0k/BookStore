import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface StoreState {
    test1: boolean;
    test2: boolean;
    setTest1: () => void;
    setTest2: () => void;
}

export const useTestStore = create<StoreState>()(
    immer((set) => ({
        test1: false,
        test2: false,
        setTest1: () =>
            set((state) => {
                console.log("테스트 1번 액션");
                state.test1 = !state.test1;
            }),
        setTest2: () =>
            set((state) => {
                console.log("테스트 2번 액션");
                state.test2 = !state.test2;
            }),
    })),
);
