import { useLocation } from "react-router-dom";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useBooksInfinite = () => {
    const location = useLocation();

    const getBooks = ({ pageParam }: { pageParam: number }) => {
        const params = new URLSearchParams(location.search);
        return fetchBooks({
            category_id: params.get(QUERYSTRING.CATEGORY_ID)
                ? Number(params.get(QUERYSTRING.CATEGORY_ID))
                : undefined,
            news: params.get(QUERYSTRING.NEWS) ? true : undefined,
            currentPage: pageParam,
            limit: LIMIT,
        });
    };

    // initialPageParam = 초기 pageParam 값
    // hasNextPage = getNextPageParam 이 null 또는 undefined 를 반환하는 경우 false 그 외에는 true
    // getNextPageParam(lastPage, pages) = 다음 pageParam 의 값을 반환함.
    //      lastPage = 마지막 페이지 데이터
    //      pages = 지금까지 fetch한 전체 페이지 배열
    const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
        queryKey: ["books", location.search],
        queryFn: ({ pageParam }) => {
            // console.log(pageParam);
            return getBooks({ pageParam });
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            // console.log(lastPage);
            const isLastPage =
                Math.ceil(lastPage.pagination.totalBooks / LIMIT) ===
                lastPage.pagination.currentPage;

            return isLastPage ? null : lastPage.pagination.currentPage + 1;
        },
    });

    const books = data ? data.pages.flatMap((page) => page.books) : [];
    const pagination = data ? data.pages[data.pages.length - 1].pagination : {};
    const isEmpty = books.length === 0;

    return {
        books,
        pagination,
        isEmpty,
        isBooksLoading: isFetching,
        fetchNextPage,
        hasNextPage,
    };
};

/*
data = {
    pages: [
        {books, pagination},
        {books, pagination},
        {books, pagination},
        ...
    ]
}
*/
