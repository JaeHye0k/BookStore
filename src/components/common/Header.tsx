import styled from "styled-components";

const Header = () => {
    return (
        <StyledHeader>
            <h1>Book Store</h1>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    background-color: ${(props) => props.theme.color.background};

    h1 {
        color: ${(props) => props.theme.color.primary};
    }
`;

export default Header;
