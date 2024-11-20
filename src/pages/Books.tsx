import { styled } from "styled-components";
import Title from "../components/common/Title";
import BookFilter from "../components/books/BookFilter";
import BookList from "../components/books/BookList";
import BookEmpty from "../components/books/BookEmpty";
import Pagination from "../components/books/Pagination";
import BookViewSwitcher from "../components/books/BookViewSwitcher";
import { useBooks } from "../hooks/useBooks";
import Loading from "@src/components/common/Loading";

const Books = () => {
    const { books, pagination, isEmpty, isBooksLoading } = useBooks();

    if (isBooksLoading) {
        return <Loading />;
    }

    if (isEmpty || !books || !pagination || !books.length) {
        return <BookEmpty />;
    }

    return (
        <>
            <Title size="large">도서 검색 결과</Title>
            <BooksStyle>
                <div className="filter">
                    <BookFilter />
                    <BookViewSwitcher />
                </div>
                <BookList books={books} />
                <Pagination pagination={pagination} />
            </BooksStyle>
        </>
    );
};

const BooksStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;

    .filter {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
    }
`;

export default Books;
