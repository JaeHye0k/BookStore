import { Cart } from "../models/cart.model";
import { deleteCart, fetchCart } from "../api/carts.api";
import { DefaultError, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCart = () => {
    const queryClient = useQueryClient();

    // data 타입을 명시해주기 위해 useQuery에 제네릭 타입을 전달함
    const { data: carts = [], isLoading } = useQuery<unknown, DefaultError, Cart[]>({
        queryKey: ["carts"],
        queryFn: () => fetchCart(),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteCart(id),
        onSuccess: (data, id) => {
            queryClient.setQueryData(["carts"], (oldCarts: Cart[]) =>
                oldCarts.filter((cart: Cart) => cart.id !== id),
            );
        },
    });

    const deleteCartItem = (id: number) => {
        deleteMutation.mutate(id);
    };

    return { carts, deleteCartItem, isEmpty: carts.length === 0, isLoading };
};
