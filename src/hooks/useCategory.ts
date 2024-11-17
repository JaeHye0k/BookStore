import { useEffect, useState } from "react";
import { Category } from "../models/category.model";
import { fetchCategory } from "../api/category.api";
import { useLocation } from "react-router-dom";
import { QUERYSTRING } from "../constants/querystring";

export const useCategory = () => {
    const [category, setCategory] = useState<Category[]>([]);
    const location = useLocation();
    // category에 isActive 필드를 추가해줌
    const setActive = () => {
        const params = new URLSearchParams(location.search);
        const categoryId = params.get(QUERYSTRING.CATEGORY_ID);
        if (categoryId) {
            setCategory((prev) => {
                return prev.map((category) => {
                    return {
                        ...category,
                        isActive: category.categoryId === Number(categoryId),
                    };
                });
            });
        } else {
            // category_id === null 일 경우
            setCategory((prev) => {
                return prev.map((category) => {
                    return {
                        ...category,
                        isActive: false,
                    };
                });
            });
        }
    };

    // 1. 안에서 비동기 작업 실행
    useEffect(() => {
        fetchCategory().then((category) => {
            if (!category.length || !category) return;
            const categoryWithAll = [
                {
                    categoryId: null,
                    categoryName: "전체",
                },
                ...category,
            ];
            setCategory(categoryWithAll);
            setActive();
        });
    }, []);

    // 2. 안에서 동기 작업 실행
    useEffect(() => {
        setActive();
    }, [location]);

    return category;
};
