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
