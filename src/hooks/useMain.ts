import { fetchBestBooks, fetchBooks } from "@src/api/books.api";
import { fetchBookReviews } from "@src/api/review.api";
import { Book, BookReviewItem } from "@src/models/book.model";
import { useEffect, useState } from "react";

export const useMain = () => {
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);
    const [newBooks, setNewBooks] = useState<Book[]>([]);
    const [bestBooks, setBestBooks] = useState<Book[]>([]);

    useEffect(() => {
        fetchBookReviews().then((reviews) => {
            setReviews(reviews);
        });
        fetchBooks({ limit: 4, news: true }).then(({ books }) => {
            setNewBooks(books);
        });
        fetchBestBooks().then((books) => {
            setBestBooks(books);
        });
    }, []);

    return { reviews, newBooks, bestBooks };
};
