import { Cart } from "../models/cart.model";
import { deleteCart, fetchCart } from "../api/carts.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCart = () => {
    const queryClient = useQueryClient();

    const { data: carts = [], isLoading } = useQuery({
        queryKey: ["carts"],
        queryFn: () => fetchCart(),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteCart(id),
        onSuccess: (carts, id) => {
            queryClient.setQueryData(
                ["carts"],
                carts.filter((cart: Cart) => cart.id !== id),
            );
        },
    });

    const deleteCartItem = (id: number) => {
        deleteMutation.mutate(id);
    };

    return { carts, deleteCartItem, isEmpty: carts.length === 0, isLoading };
};
