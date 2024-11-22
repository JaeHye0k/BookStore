import { BookReviewItemWrite, BookReviewItem as IBookReviewItem } from "@src/models/book.model";
import { FC } from "react";
import { styled } from "styled-components";
import BookReviewItem from "./BookReviewItem";
import BookReviewAdd from "./BookReviewAdd";

interface Props {
    reviews: IBookReviewItem[];
    onAdd: (data: BookReviewItemWrite) => void;
}

const BookReview: FC<Props> = ({ reviews, onAdd }) => {
    return (
        <BookReviewStyle>
            <BookReviewAdd onAdd={onAdd} />
            {reviews.map((review) => (
                <BookReviewItem review={review} />
            ))}
        </BookReviewStyle>
    );
};

const BookReviewStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export default BookReview;
