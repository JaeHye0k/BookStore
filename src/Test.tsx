import { useTestStore } from "./store/testStore";
import { useShallow } from "zustand/shallow";

export const Test1 = () => {
    const { test1, setTest1 } = useTestStore(
        useShallow((state) => ({
            test1: state.test1,
            setTest1: state.setTest1,
        })),
    );

    console.log("render Test1");
    return (
        <>
            <button onClick={() => setTest1()}>테스트1</button>
        </>
    );
};

export const Test2 = () => {
    const [test2, setTest2] = useTestStore(useShallow((state) => [state.test2, state.setTest2]));

    console.log("render Test2");
    return (
        <>
            <button onClick={() => setTest2()}>테스트2</button>
        </>
    );
};
