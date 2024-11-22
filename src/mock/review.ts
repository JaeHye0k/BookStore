import { BookReviewItem } from "@src/models/book.model";
import { http, HttpResponse } from "msw";
import { fakerKO as faker } from "@faker-js/faker";

// const data: BookReviewItem[] = [
//     {
//         id: 1,
//         content: "안녕하세요",
//         createdAt: "2024-11-20",
//         score: 5,
//         userName: "Lee",
//     },
//     {
//         id: 2,
//         content: "안녕하세요!!!",
//         createdAt: "2024-11-19",
//         score: 3,
//         userName: "Kim",
//     },
// ];

const data: BookReviewItem[] = Array.from({ length: 8 }, (_, index) => ({
    id: index,
    userName: `${faker.person.lastName()}${faker.person.firstName()}`,
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(), // YYYY-MM-DDTHH:mm:ss.sssZ
    score: (faker.helpers as any).rangeToNumber({ min: 1, max: 5 }), // any 로 안 해주면 에러 발생함
}));

export const BASE_URL = "http://localhost:9999";

export const reviewsById = http.get(`${BASE_URL}/reviews/:bookId`, () => {
    return HttpResponse.json(data, {
        status: 200,
    });
});

export const addReview = http.post(`${BASE_URL}/reviews/:bookId`, () => {
    return HttpResponse.json(
        {
            message: "리뷰가 등록되었습니다.",
        },
        {
            status: 200,
        },
    );
});

export const reviewForMain = http.get(`${BASE_URL}/reviews`, () => {
    return HttpResponse.json(data, {
        status: 200,
    });
});
