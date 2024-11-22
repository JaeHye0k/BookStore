// import { useEffect, useState } from "react";
// import { BookDetail } from "../models/book.model";
// import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
// import { useAlert } from "./useAlert";
// import { useAuthStore } from "../store/authStore";
// import { addCart } from "../api/carts.api";

// export const useBook = (bookId: string | undefined) => {
//     const [book, setBook] = useState<BookDetail | null>(null);
//     const { isLoggedIn } = useAuthStore();
//     const { showAlert } = useAlert();
//     const [cartAdded, setCartAdded] = useState(false);

//     const likeToggle = () => {
//         if (!book) return;
//         if (!isLoggedIn) {
//             showAlert("로그인이 필요합니다.");
//             return;
//         }
//         if (book.liked) {
//             // 라이크 상태 -> 언라이크 실행
//             unlikeBook(book.id).then(() => {
//                 setBook({
//                     ...book,
//                     liked: false,
//                     likes: book.likes - 1,
//                 });
//             });
//         } else {
//             // 언라이크 상태 -> 라이크 실행
//             likeBook(book.id).then(() => {
//                 setBook({
//                     ...book,
//                     liked: true,
//                     likes: book.likes + 1,
//                 });
//             });
//         }
//     };

//     const addToCart = (quantity: number) => {
//         if (!book) return;

//         addCart({
//             bookId: book.id,
//             quantity: quantity,
//         }).then(() => {
//             setCartAdded(true);
//             setTimeout(() => {
//                 setCartAdded(false);
//             }, 3000);
//         });
//     };

//     useEffect(() => {
//         if (!bookId) return;

//         fetchBook(bookId).then((book) => {
//             setBook(book);
//         });
//     }, [bookId]);

//     return { book, likeToggle, addToCart, cartAdded };
// };

import { useEffect, useState } from "react";
import { BookDetail, BookReviewItem, BookReviewItemWrite } from "../models/book.model";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAlert } from "./useAlert";
import { useAuthStore } from "../store/authStore";
import { addCart } from "../api/carts.api";
import { addBookReview, fetchBookReview } from "@src/api/review.api";
import { useToast } from "./useToast";

export const useBook = (bookId: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);
    const { isLoggedIn } = useAuthStore();
    const { showAlert } = useAlert();
    const [cartAdded, setCartAdded] = useState(false);
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);
    const { showToast } = useToast();

    // 낙관적 업데이트
    const likeToggle = () => {
        if (!book) return;
        if (!isLoggedIn) {
            showAlert("로그인이 필요합니다.");
            return;
        }

        const previousBook = { ...book }; // 이전 상태 백업
        if (book.liked) {
            // 라이크 상태 -> 언라이크 실행
            setBook({
                ...book,
                liked: false,
                likes: book.likes - 1,
            });

            // 요청 실패 시 복원
            unlikeBook(book.id)
                .then(() => {
                    showToast("좋아요가 취소되었습니다");
                })
                .catch(() => {
                    setBook(previousBook);
                    showAlert("좋아요 취소에 실패했습니다.");
                });
        } else {
            // 언라이크 상태 -> 라이크 실행
            setBook({
                ...book,
                liked: true,
                likes: book.likes + 1,
            });
            likeBook(book.id)
                .then(() => {
                    showToast("좋아요가 성공했습니다");
                })
                .catch(() => {
                    // 요청 실패 시 복원
                    setBook(previousBook);
                    showAlert("좋아요에 실패했습니다.");
                });
        }
    };

    const addToCart = (quantity: number) => {
        if (!book) return;

        addCart({
            bookId: book.id,
            quantity: quantity,
        }).then(() => {
            setCartAdded(true);
            setTimeout(() => {
                setCartAdded(false);
            }, 3000);
        });
    };

    const addReview = (data: BookReviewItemWrite) => {
        if (!book) return;
        addBookReview(book.id.toString(), data).then((res) => {
            fetchBookReview(book.id.toString()).then((reviews) => {
                showAlert(res.message);
                setReviews(reviews);
            });
        });
    };

    useEffect(() => {
        if (!bookId) return;

        fetchBook(bookId).then((book) => {
            setBook(book);
        });

        fetchBookReview(bookId).then((reviews) => {
            setReviews(reviews);
        });
    }, [bookId]);

    return { book, likeToggle, addToCart, cartAdded, reviews, addReview };
};
