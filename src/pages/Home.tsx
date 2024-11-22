import BookReviewItem from "@src/components/book/BookReviewItem";
import MainNewBooks from "@src/components/main/MainNewBooks";
import MainReviews from "@src/components/main/MainReviews";
import Title from "@src/components/common/Title";
import { useMain } from "@src/hooks/useMain";
import { styled } from "styled-components";
import MainBestBooks from "@src/components/main/MainBestBooks";

const Home = () => {
    const { reviews, newBooks, bestBooks } = useMain();
    return (
        <HomeStyle>
            {/* 배너 */}
            {/* 베스트 셀러 */}
            <section className="section">
                <Title size="large" color="primary">
                    베스트 셀러
                </Title>
                <MainBestBooks books={bestBooks} />
            </section>
            {/* 신간 */}
            <section className="section">
                <Title size="large" color="primary">
                    신간
                </Title>
                <MainNewBooks books={newBooks} />
            </section>
            {/* 리뷰 */}
            <section className="section">
                <Title size="large" color="primary">
                    리뷰
                </Title>
                <MainReviews reviews={reviews} />
            </section>
        </HomeStyle>
    );
};

const HomeStyle = styled.div`
    color: ${({ theme }) => theme.color.primary};
`;

export default Home;
