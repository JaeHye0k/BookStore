import BookItem from "@src/components/books/BookItem";
import { Book } from "@src/models/book.model";
import { FC } from "react";
import { styled } from "styled-components";

interface Props {
    books: Book[];
}

const MainNewBooks: FC<Props> = ({ books }) => {
    return (
        <MainNewBooksStyle>
            {books.map((book) => (
                <BookItem book={book} key={book.id} view="grid" />
            ))}
        </MainNewBooksStyle>
    );
};

const MainNewBooksStyle = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
`;

export default MainNewBooks;
