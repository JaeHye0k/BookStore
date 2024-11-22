import BookReviewItem from "@src/components/book/BookReviewItem";
import { BookReviewItem as IBookReviewItem } from "@src/models/book.model";
import { FC } from "react";
import { styled } from "styled-components";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
    reviews: IBookReviewItem[];
}

const MainReviews: FC<Props> = ({ reviews }) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        speed: 500,
        gap: 16,
    };
    return (
        <MainReviewsStyle>
            <Slider {...sliderSettings}>
                {reviews.map((review) => (
                    <BookReviewItem review={review} key={review.id} />
                ))}
            </Slider>
        </MainReviewsStyle>
    );
};

const MainReviewsStyle = styled.div`
    padding: 0 0 24px 0;

    .slick-track {
        padding: 12px 0;
    }

    .slick-slide > div {
        margin: 0 12px;
    }

    .slick-prev:before,
    .slick-next:before {
        color: #000;
    }
`;

export default MainReviews;
