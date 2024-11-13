import { styled } from "styled-components";
import { ButtonScheme, ButtonSize } from "../../style/theme";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size: ButtonSize;
    scheme: ButtonScheme;
    disabled?: boolean;
    isLoading?: boolean;
}

const Button: React.FC<Props> = ({ children, size, scheme, disabled, isLoading, ...props }) => {
    return (
        <ButtonStyle
            size={size}
            scheme={scheme}
            disabled={disabled}
            isLoading={isLoading}
            {...props}
        >
            {children}
        </ButtonStyle>
    );
};

const ButtonStyle = styled.button<Omit<Props, "children">>`
    font-size: ${({ theme, size }) => theme.button[size].fontSize};
    padding: ${({ theme, size }) => theme.button[size].padding};
    color: ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
    background-color: ${({ theme, scheme }) => theme.buttonScheme[scheme].backgroundColor};
    border: 0;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    opacity: ${({ disabled = false }) => (disabled ? 0.5 : 1)};
    pointer-events: ${({ disabled = false }) => (disabled ? "none" : "auto")};
    cursor: ${({ disabled = false }) => (disabled ? "none" : "pointer")};
`;

export default Button;
