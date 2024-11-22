import { Book } from "@src/models/book.model";
import { http, HttpResponse } from "msw";
import { fakerKO as faker } from "@faker-js/faker";
import { BASE_URL } from "./review";

const bestBooksData: Book[] = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    title: faker.lorem.sentence(),
    img: (faker.helpers as any).rangeToNumber({ min: 100, max: 200 }),
    category_id: (faker.helpers as any).rangeToNumber({ min: 0, max: 5 }),
    form: "종이책",
    isbn: faker.commerce.isbn(),
    summary: faker.lorem.paragraph(),
    detail: faker.lorem.paragraph(),
    author: faker.person.firstName(),
    pages: (faker.helpers as any).rangeToNumber({ min: 100, max: 500 }),
    contents: faker.lorem.paragraph(),
    price: (faker.helpers as any).rangeToNumber({ min: 10000, max: 50000 }),
    likes: (faker.helpers as any).rangeToNumber({ min: 0, max: 100 }),
    pubDate: faker.date.past().toISOString(),
}));

export const bestBooks = http.get(`${BASE_URL}/books/best`, () => {
    return HttpResponse.json(bestBooksData, {
        status: 200,
    });
});
