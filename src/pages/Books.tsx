import { styled } from "styled-components";
import Title from "../components/common/Title";
import BookFilter from "../components/books/BookFilter";
import BookList from "../components/books/BookList";
import BookEmpty from "../components/books/BookEmpty";
import BookViewSwitcher from "../components/books/BookViewSwitcher";
import Loading from "@src/components/common/Loading";
import { useBooksInfinite } from "@src/hooks/useBooksInfinite";
import Button from "@src/components/common/Button";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "@src/hooks/useIntersectionObserver";

const Books = () => {
    const { books, fetchNextPage, hasNextPage, isEmpty, isBooksLoading, pagination } =
        useBooksInfinite();
    // const moreRef = useRef(null);

    // useEffect(() => {
    //     const observer = new IntersectionObserver((entries) => {
    //         entries.forEach((entry) => {
    //             console.log(entry);
    //             if (entry.isIntersecting) {
    //                 loadMore();
    //                 observer.unobserve(entry.target);
    //             }
    //         });
    //     });

    //     if (moreRef.current) {
    //         observer.observe(moreRef.current);
    //     }
    //     return () => observer.disconnect();
    // }, [books, moreRef]);

    /*
    intersectionObserver 의 콜백 함수는 entries 라는 매개변수를 전달받는다.
    entries는 entry의 배열이다.
    entry는 타겟 요소와 루트 컨테이너 간의 교차를 설명하는 객체다. 이를 통해 교차 정보를 확인할 수 있다.
    entry객체의 isIntersecting 속성은 타겟 요소가 루트와 교차하면 true 가 된다.
    */
    const moreRef = useIntersectionObserver(([entry]) => {
        console.log(entry);
        if (entry.isIntersecting) {
            loadMore();
        }
    });
    const loadMore = () => {
        if (!hasNextPage) return;
        fetchNextPage();
    };
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
                {/* <Pagination pagination={pagination} /> */}

                <div className="more" ref={moreRef}>
                    <Button
                        size="medium"
                        scheme="normal"
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage}
                    >
                        {hasNextPage ? "더보기" : "마지막 페이지"}
                    </Button>
                </div>
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
