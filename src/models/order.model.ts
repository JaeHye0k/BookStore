export interface Order {
    id: number;
    address: string;
    receiver: string;
    contact: string;
    bookTitle: string;
    totalQuantity: number;
    totalPrice: number;
    orderedAt: string;
}

export interface OrderSheet {
    orderItems: number[];
    delivery: Delivery;
    totalPrice: number;
    totalQuantity: number;
    firstBookTitle: string;
}

export interface Delivery {
    address: string;
    receiver: string;
    contact: string;
}

export interface OrderDetailItem {
    title: string;
    author: string;
    price: number;
    quantity: number;
    bookId: number;
}

export interface OrderListItem extends Order {
    detail?: OrderDetailItem[];
}
