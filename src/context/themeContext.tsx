import { createContext, ReactNode, useEffect, useState } from "react";
import { getTheme, ThemeName } from "../style/theme";
import { GlobalStyle } from "../style/global";
import { ThemeProvider } from "styled-components";

const DEFALT_THEME_NAME = "light";
const THEME_LOCALSTORAGE_KEY = "book_store_theme";

interface State {
    themeName: ThemeName;
    toggleTheme: () => void;
}

export const state = {
    themeName: DEFALT_THEME_NAME as ThemeName,
    toggleTheme() {},
};

export const ThemeContext = createContext<State>(state);

export const BookStoreThemeProvider = ({ children }: { children: ReactNode }) => {
    const [themeName, setThemeName] = useState<ThemeName>(DEFALT_THEME_NAME);

    const toggleTheme = () => {
        setThemeName(themeName === "light" ? "dark" : "light");
        localStorage.setItem(THEME_LOCALSTORAGE_KEY, themeName === "light" ? "dark" : "light");
    };

    useEffect(() => {
        const savedThemeName = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as ThemeName;
        setThemeName(savedThemeName || DEFALT_THEME_NAME);
    }, []);

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            {/*ThemeProvider 는 Context API 를 이용해서 Props를 자식 컴포넌트에게 전달한다.*/}
            <ThemeProvider theme={getTheme(themeName)}>
                <GlobalStyle themeName={themeName} />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
