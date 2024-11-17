import { styled } from "styled-components";
import Button from "../common/Button";
import { FaHeart } from "react-icons/fa";
import { BookDetail } from "../../models/book.model";
import { FC } from "react";

interface Props {
    book: BookDetail;
    onClick: () => void;
}

const LikeButton: FC<Props> = ({ book, onClick }) => {
    return (
        <LikeButtonStyle size="medium" scheme={book.liked ? "like" : "normal"} onClick={onClick}>
            <FaHeart />
            {book.likes}
        </LikeButtonStyle>
    );
};

const LikeButtonStyle = styled(Button)`
    display: flex;
    gap: 6px;
    svg {
        color: inherit;
        * {
            color: inherit;
        }
    }
`;

export default LikeButton;
