import { styled } from "styled-components";
import { ColorKey, HeadingSize } from "../../style/theme";

interface Props {
    children: React.ReactNode;
    size: HeadingSize;
    color?: ColorKey;
}

const Title: React.FC<Props> = ({ children, size, color }) => {
    return (
        <TitleStyle size={size} color={color}>
            {children}
        </TitleStyle>
    );
};

// ThemeProvider 에서 theme 를 가져오고,
// TitleStyle 의 props로 전달된 size 를 가져옴
const TitleStyle = styled.h1<Omit<Props, "children">>`
    font-size: ${({ theme, size }) => theme.heading[size].fontSize};
    color: ${({ theme, color = "primary" }) => theme.color[color]};
`;

export default Title;
