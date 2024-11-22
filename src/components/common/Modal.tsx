import { FC, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaPlus } from "react-icons/fa";
import { styled } from "styled-components";

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: FC<Props> = ({ children, isOpen, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const handleClose = (e?: React.MouseEvent) => {
        setIsFadingOut(true);
        e?.stopPropagation(); // 없으면 이벤트 버블링 떄문에 isOpen이 다시 true가 됨
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            handleClose(e);
        }
    };

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            handleClose();
        }
    };

    const handleAnimationEnd = () => {
        if (isFadingOut) {
            onClose();
            setIsFadingOut(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", handleKeydown);
        } else {
            window.removeEventListener("keydown", handleKeydown);
        }

        return () => window.removeEventListener("keydown", handleKeydown);
    }, [isOpen]);

    return createPortal(
        <>
            {isOpen && (
                <ModalStyle
                    onClick={handleOverlayClick}
                    className={isFadingOut ? "fade-out" : "fade-in"}
                    onAnimationEnd={handleAnimationEnd}
                >
                    <div className="modal-body" ref={modalRef}>
                        <div className="modal-content">{children}</div>
                        <button className="modal-close" onClick={handleClose}>
                            <FaPlus />
                        </button>
                    </div>
                </ModalStyle>
            )}
        </>,
        document.body,
    );
};

const ModalStyle = styled.div`
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

    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.6);

    .modal-body {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        max-width: 80%;
        padding: 56px 32px 32px;
        border-radius: ${({ theme }) => theme.borderRadius.default};
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

        .modal-close {
            border: none;
            background-color: transparent;
            cursor: pointer;

            position: absolute;
            top: 0;
            right: 0;
            padding: 12px;

            svg {
                transform: rotate(45deg);
                width: 20px;
                height: 20px;
            }
        }

        .modal-content {
            img {
                width: 100%;
            }
        }
    }
`;

export default Modal;
