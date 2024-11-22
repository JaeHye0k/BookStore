import { Cart } from "../models/cart.model";
import { requestHandler } from "./http";

interface AddCartParams {
    bookId: number;
    quantity: number;
}

export const addCart = async (params: AddCartParams) => {
    return requestHandler("post", "/carts", params);
};

export const fetchCart = async () => {
    return requestHandler<Cart[]>("get", "/carts");
};

export const deleteCart = async (cartId: number) => {
    return requestHandler("delete", `/carts/${cartId}`);
};
