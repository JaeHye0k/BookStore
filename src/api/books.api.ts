import { Book, BookDetail } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http";

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
        const response = await httpClient.get<FetchBooksResponse>("/books", {
            params,
        });
        return response.data;
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
    const response = await httpClient.get<BookDetail>(`/books/${bookId}`);
    return response.data;
};

export const likeBook = async (bookId: number) => {
    const response = await httpClient.post(`/likes/${bookId}`);
    console.log(response);
    return response.data;
};

export const unlikeBook = async (bookId: number) => {
    const response = await httpClient.delete(`/likes/${bookId}`);
    return response.data;
};
