import { FaList, FaTh } from "react-icons/fa";
import { styled } from "styled-components";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";
import { useEffect } from "react";

const viewOptions = [
    {
        value: "list",
        icon: <FaList />,
    },
    {
        value: "grid",
        icon: <FaTh />,
    },
];

export type ViewMode = "grid" | "list";

const BookViewSwitcher = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSwitch = (value: ViewMode) => {
        const newSearchParams = new URLSearchParams(searchParams);

        newSearchParams.set(QUERYSTRING.VIEW, value);

        setSearchParams(newSearchParams);
    };

    // 최초의 VIEW 기본값 설정
    useEffect(() => {
        if (!searchParams.get(QUERYSTRING.VIEW)) {
            handleSwitch("grid");
        }
    }, []);

    return (
        <BookViewSwitcherStyle>
            {viewOptions.map((option) => (
                <Button
                    size="medium"
                    scheme={
                        searchParams.get(QUERYSTRING.VIEW) === option.value ? "primary" : "normal"
                    }
                    onClick={() => handleSwitch(option.value as ViewMode)}
                >
                    {option.icon}
                </Button>
            ))}
        </BookViewSwitcherStyle>
    );
};

const BookViewSwitcherStyle = styled.div`
    display: flex;
    gap: 8px;
    svg {
        fill: #fff;
    }
`;

export default BookViewSwitcher;
