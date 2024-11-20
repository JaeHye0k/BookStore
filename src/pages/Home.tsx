import { styled } from "styled-components";

const Home = () => {
    return (
        <HomeStyle>
            <h1>Home</h1>
        </HomeStyle>
    );
};

const HomeStyle = styled.div`
    color: ${({ theme }) => theme.color.primary};
`;

export default Home;
