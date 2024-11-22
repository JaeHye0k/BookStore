import { Book } from "@src/models/book.model";
import { FC } from "react";
import { styled } from "styled-components";
import BookBestItem from "../book/BookBestItem";

interface Props {
    books: Book[];
}

const MainBestBooks: FC<Props> = ({ books }) => {
    return (
        <MainBestBooksStyle>
            {books.map((book) => (
                <BookBestItem book={book} itemIndex={book.id} />
            ))}
        </MainBestBooksStyle>
    );
};

const MainBestBooksStyle = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
`;

export default MainBestBooks;
