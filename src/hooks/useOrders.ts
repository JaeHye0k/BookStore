import { useEffect, useState } from "react";
import { OrderListItem } from "../models/order.model";
import { fetchOrder, fetchOrders } from "../api/order.api";

export const useOrders = () => {
    const [orders, setOrders] = useState<OrderListItem[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    useEffect(() => {
        fetchOrders().then((orders) => {
            setOrders(orders);
        });
    }, []);

    const selectOrderItem = (orderId: number) => {
        // 이미 detail 항목이 있다면 요청 방어
        if (orders.find((order) => order.id === orderId)?.detail) {
            setSelectedItemId(orderId);
            return;
        }

        fetchOrder(orderId).then((orderDetail) => {
            setSelectedItemId(orderId);
            setOrders(
                orders.map((order) => {
                    if (order.id === orderId) {
                        return {
                            ...order,
                            detail: orderDetail,
                        };
                    }
                    return order;
                }),
            );
        });
    };

    return { orders, selectOrderItem, selectedItemId };
};
