import { FC, useState } from "react";
import { styled } from "styled-components";
import useToastStore, { ToastItem } from "@src/store/toastStore";
import { FaBan, FaInfoCircle, FaPlus } from "react-icons/fa";
import { useTimeout } from "@src/hooks/useTimeout";

export const TOAST_REMOVE_TIME = 3000; // 3초

const Toast: FC<ToastItem> = ({ id, message, type }) => {
    const { removeToast } = useToastStore();
    const [isFadingOut, setIsFadingOut] = useState(false);
    const handleRemoveToast = () => {
        setIsFadingOut(true);
    };

    const handleAnimationEnd = () => {
        if (isFadingOut) {
            removeToast(id);
        }
    };

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setIsFadingOut(true);
    //     }, TOAST_REMOVE_TIME);
    //     return () => clearTimeout(timer);
    // }, []);

    useTimeout(() => {
        setIsFadingOut(true);
    }, TOAST_REMOVE_TIME);

    return (
        <ToastStyle
            className={isFadingOut ? "fade-out" : "fade-in"}
            onAnimationEnd={handleAnimationEnd}
        >
            <p>
                {type === "info" && <FaInfoCircle />}
                {type === "error" && <FaBan />}
                {message}
            </p>
            <button onClick={handleRemoveToast}>
                <FaPlus />
            </button>
        </ToastStyle>
    );
};

const ToastStyle = styled.div`
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes fade-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    &.fade-in {
        animation: fade-in 0.3s ease-in-out forwards;
    }

    &.fade-out {
        animation: fade-out 0.3s ease-in-out forwards;
    }

    background-color: ${({ theme }) => theme.color.background};
    padding: 12px;
    border-radius: ${({ theme }) => theme.borderRadius.default};

    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 24px;

    p {
        color: ${({ theme }) => theme.color.text};
        line-height: 1;
        margin: 0;
        flex: 1;

        display: flex;
        align-items: end;
        gap: 4px;
    }
    button {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        margin: 0;

        svg {
            transform: rotate(45deg);
        }
    }
`;

export default Toast;
