import { Book } from "@src/models/book.model";
import { FC } from "react";
import { styled } from "styled-components";
import BookItem, { BookItemStyle } from "../books/BookItem";

interface Props {
    book: Book;
    itemIndex: number;
}

const BookBestItem: FC<Props> = ({ book, itemIndex }) => {
    return (
        <BookBestItemStyle>
            <BookItem book={book} key={itemIndex} view="grid" />
            <div className="rank">{itemIndex + 1}</div>
        </BookBestItemStyle>
    );
};

const BookBestItemStyle = styled.div`
    ${BookItemStyle} {
        .summary,
        .price,
        .likes {
            display: none;
        }
    }

    position: relative;

    .rank {
        position: absolute;
        top: -10px;
        left: -10px;
        width: 40px;
        height: 40px;
        background: ${({ theme }) => theme.color.primary};
        border-radius: 50%;
        text-align: center;
        align-content: center;
    }
`;

export default BookBestItem;
