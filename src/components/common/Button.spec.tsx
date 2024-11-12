import { render, screen } from "@testing-library/react";
import Button from "./Button";
import { BookStoreThemeProvider } from "../../context/themeContext";

describe("Button 테스트", () => {
    it("렌더 확인", () => {
        // 1. 렌더
        render(
            <BookStoreThemeProvider>
                <Button size="large" scheme="primary">
                    버튼 테스트
                </Button>
            </BookStoreThemeProvider>,
        );

        // 2. 확인
        expect(screen.getByText("버튼 테스트")).toBeInTheDocument();
    });

    it("size props 확인", () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" scheme="primary">
                    버튼 테스트
                </Button>
            </BookStoreThemeProvider>,
        );

        expect(screen.getByRole("button")).toHaveStyle({
            fontSize: "1.5rem",
            padding: "1rem 2rem",
        });
    });

    it("scheme props 확인", () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" scheme="primary">
                    버튼 테스트
                </Button>
            </BookStoreThemeProvider>,
        );

        expect(screen.getByRole("button")).toHaveStyle({
            color: "white",
            backgroundColor: "midnightblue",
        });
    });

    it("disabled props 확인", () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" scheme="primary" disabled={true}>
                    버튼 테스트
                </Button>
            </BookStoreThemeProvider>,
        );

        expect(screen.getByRole("button")).toHaveStyle({
            opacity: 0.5,
            pointerEvents: "none",
            cursor: "none",
        });
    });
});
