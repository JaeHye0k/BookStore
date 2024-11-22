import { BookReviewItemWrite } from "@src/models/book.model";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import Button from "../common/Button";

interface Props {
    onAdd: (data: BookReviewItemWrite) => void;
}

const BookReviewAdd: FC<Props> = ({ onAdd }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BookReviewItemWrite>();

    const handleAdd = (data: BookReviewItemWrite) => {
        onAdd(data);
    };

    return (
        <BookReviewAddStyle>
            <form onSubmit={handleSubmit(handleAdd)}>
                <fieldset>
                    <textarea {...register("content", { required: true })}></textarea>
                    {errors.content && <p className="error-text">리뷰를 입력해주세요.</p>}
                </fieldset>
                <div className="submit">
                    <fieldset>
                        <select {...register("score", { required: true, valueAsNumber: true })}>
                            <option value="1">1점</option>
                            <option value="2">2점</option>
                            <option value="3">3점</option>
                            <option value="4">4점</option>
                            <option value="5">5점</option>
                        </select>
                    </fieldset>
                    <Button size="medium" scheme="primary">
                        작성하기
                    </Button>
                </div>
            </form>
        </BookReviewAddStyle>
    );
};

const BookReviewAddStyle = styled.div`
    form {
        display: flex;
        flex-direction: column;
        gap: 6px;

        fieldset {
            display: flex;
            gap: 12px;
            flex-direction: column;
            border: 0;
            padding: 0;
            border: 0;
            margin: 0;

            .error-text {
                color: red;
                margin: 0;
            }

            textarea {
                width: 100%;
                height: 100px;
                border: 1px solid ${({ theme }) => theme.color.border};
                border-radius: ${({ theme }) => theme.borderRadius.default};
                padding: 12px;
            }

            select {
                height: 100%;
                margin: 0 8px 0 0;
            }
        }
        .submit {
            display: flex;
            justify-content: end;
        }
    }
`;

export default BookReviewAdd;
