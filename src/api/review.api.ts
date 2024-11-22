import { BookReviewItem, BookReviewItemWrite } from "@src/models/book.model";
import { requestHandler } from "./http";

export const fetchBookReview = async (bookId: string) => {
    return requestHandler<BookReviewItem>("get", `/reviews/${bookId}`);
};

export const fetchBookReviews = async () => {
    return requestHandler<BookReviewItem[]>("get", `/reviews`);
};

interface AddBookReviewResponse {
    message: string;
}

export const addBookReview = async (bookId: string, data: BookReviewItemWrite) => {
    return requestHandler<AddBookReviewResponse>("post", `/reviews/${bookId}`);
};
