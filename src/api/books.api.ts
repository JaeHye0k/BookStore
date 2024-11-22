import { Book, BookDetail } from "@models/book.model";
import { Pagination } from "@models/pagination.model";
import { requestHandler } from "@api/http";

interface FetchBookParams {
    category_id?: number;
    news?: boolean; // false | null
    currentPage?: number;
    limit: number;
}

interface FetchBooksResponse {
    books: Book[];
    pagination: Pagination;
}

export const fetchBooks = async (params: FetchBookParams) => {
    try {
        return requestHandler("get", "/books", { params });
    } catch (error) {
        return {
            books: [],
            pagination: {
                totalBooks: 0,
                currentPage: 1,
            },
        };
    }
};

export const fetchBook = async (bookId: string) => {
    return requestHandler<BookDetail>("get", `/books/${bookId}`);
};

export const likeBook = async (bookId: number) => {
    return requestHandler("post", `/likes/${bookId}`);
};

export const unlikeBook = async (bookId: number) => {
    return requestHandler("delete", `/likes/${bookId}`);
};

export const fetchBestBooks = async () => {
    return requestHandler("get", "/books/best");
};
