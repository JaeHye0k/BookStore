import { ThemeProvider } from "styled-components";
import Layout from "./components/layout/Layout";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import { GlobalStyle } from "./style/global";
import { getTheme, ThemeName } from "./style/theme";
import ThemeSwitcher from "./components/header/ThemeSwitcher";
import { useContext, useState } from "react";
import { BookStoreThemeProvider, ThemeContext } from "./context/themeContext";
function App() {
    const { themeName, toggleTheme } = useContext(ThemeContext);
    // const [themeName, setThemeName] = useState<ThemeName>("light");
    return (
        <BookStoreThemeProvider>
            <Layout>
                {/* <ThemeSwitcher /> */}
                <Home />
            </Layout>
        </BookStoreThemeProvider>
    );
}

export default App;
