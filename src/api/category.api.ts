import { Category } from "../models/category.model";
import { requestHandler } from "./http";

export const fetchCategory = async () => {
    return requestHandler<Category[]>("get", "/category");
};
