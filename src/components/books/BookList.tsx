import { styled } from "styled-components";
import { Book } from "@models/book.model";
import BookItem from "@components/books/BookItem";
import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { QUERYSTRING } from "@src/constants/querystring";
import { ViewMode } from "@components/books/BookViewSwitcher";

interface Props {
    books: Book[];
}

const BookList: FC<Props> = ({ books }) => {
    const [view, setView] = useState<ViewMode>("grid");
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const view = params.get(QUERYSTRING.VIEW);
        if (view) {
            setView(view as ViewMode);
        }
    }, [location.search]);

    return (
        <BookListStyle view={view}>
            {books.map((book) => (
                <BookItem book={book} key={book.id} view={view} />
            ))}
        </BookListStyle>
    );
};

interface BookListStyleProps {
    view: ViewMode;
}

const BookListStyle = styled.div<BookListStyleProps>`
    display: grid;
    grid-template-columns: ${({ view }) => (view === "grid" ? "repeat(4, 1fr)" : "repeat(1, 1fr)")};
    gap: 24px;
`;

export default BookList;
