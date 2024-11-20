import { FC } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { styled } from "styled-components";

interface Props {
    isChecked: boolean;
    onCheck: () => void;
}

const CheckIconButton: FC<Props> = ({ isChecked, onCheck }) => {
    return (
        <CheckIconButtonStyle onClick={onCheck}>
            {isChecked ? <FaCheckCircle /> : <FaRegCircle />}
        </CheckIconButtonStyle>
    );
};

const CheckIconButtonStyle = styled.button`
    background: none;
    border: 0;
    cursor: pointer;

    svg {
        width: 24px;
        height: 24px;
    }
`;

export default CheckIconButton;
