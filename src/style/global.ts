import "sanitize.css";
import { createGlobalStyle } from "styled-components";
import { ThemeName } from "./theme";

interface Props {
    themeName: ThemeName;
}

// GlobalStyle 컴포넌트에 직접 전달된 props 는 (props) => props.themeName 처럼 콜백 형식으로 접근할 수 있음
// ThemeProvier에서 Context API를 통해 전달된 Props도 (props) => props.theme.name 처럼 콜백 형식으로 접근할 수 있음
export const GlobalStyle = createGlobalStyle<Props>`
    body {
        padding: 0;
        margin: 0;
        background-color: ${({ themeName }) => (themeName === "light" ? "white" : "black")};
    }
    
    h1 {
        margin: 0
    }

    * {
        color: ${({ themeName }) => (themeName === "light" ? "black" : "white")};
    }
`;
