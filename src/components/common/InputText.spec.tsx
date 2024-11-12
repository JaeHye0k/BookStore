import { render, screen } from "@testing-library/react";
import InputText from "./InputText";
import { BookStoreThemeProvider } from "../../context/themeContext";
import { createRef } from "react";

describe("InputText 테스트", () => {
    it("렌더 확인", () => {
        // 1. 렌더
        render(
            <BookStoreThemeProvider>
                <InputText placeholder="여기에 입력하세요" />
            </BookStoreThemeProvider>,
        );

        // 2. 확인
        expect(screen.getByPlaceholderText("여기에 입력하세요")).toBeInTheDocument();
    });

    it("forwardRef 확인", () => {
        const ref = createRef<HTMLInputElement>();
        render(
            <BookStoreThemeProvider>
                <InputText placeholder="여기에 입력하세요" ref={ref} />
            </BookStoreThemeProvider>,
        );

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
});
