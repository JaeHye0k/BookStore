import { FC, useEffect } from "react";
import { styled } from "styled-components";
import Button from "../common/Button";

interface Props {
    onCompleted: (address: string) => void;
}

const SCRIPT_URL = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

const FindAddressButton: FC<Props> = ({ onCompleted }) => {
    // 핸들러
    const handleOpen = () => {
        new window.daum.Postcode({
            oncomplete: (data: any) => {
                onCompleted(data.address);
            },
        }).open();
    };

    // 스크립트 로드
    useEffect(() => {
        const script = document.createElement("script"); // <scaript></scaript>
        script.src = SCRIPT_URL; // <script src="..."></script>
        // script.async = true; 동적 스크립트는 기본적으로 async 스크립트처럼 동작한다.
        document.head.appendChild(script); // * script 태그가 DOM에 추가되자마자 src로부터 스크립트 로드가 시작된다.

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <FindAddressButtonStyle>
            <Button type="button" size="medium" scheme="normal" onClick={handleOpen}>
                주소 찾기
            </Button>
        </FindAddressButtonStyle>
    );
};

const FindAddressButtonStyle = styled.div``;

export default FindAddressButton;
