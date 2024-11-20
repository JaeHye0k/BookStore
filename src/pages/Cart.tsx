import { styled } from "styled-components";
import Title from "../components/common/Title";
import CartItem from "../components/cart/CartItem";
import { useCart } from "../hooks/useCart";
import { useMemo, useState } from "react";
import Empty from "../components/common/Empty";
import { FaShoppingCart } from "react-icons/fa";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import { useAlert } from "../hooks/useAlert";
import { OrderSheet } from "../models/order.model";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();
    const { showAlert, showConfirm } = useAlert();
    const { carts, deleteCartItem, isEmpty } = useCart();
    const [checkedItems, setCheckedItems] = useState<number[]>([]); // id만 담은 배열
    const handelCheckItem = (id: number) => {
        if (checkedItems.includes(id)) {
            // 언체크
            setCheckedItems(checkedItems.filter((itemId) => itemId !== id));
        } else {
            // 체크
            setCheckedItems([...checkedItems, id]);
        }
    };

    const handleDeleteItem = (id: number) => {
        deleteCartItem(id);
    };

    const totalQuantity = useMemo(() => {
        return carts.reduce((acc, cart) => {
            if (checkedItems.includes(cart.id)) {
                return acc + cart.quantity;
            }
            return acc;
        }, 0);
    }, [carts, checkedItems]);

    const totalPrice = useMemo(() => {
        return carts.reduce((acc, cart) => {
            if (checkedItems.includes(cart.id)) {
                return acc + cart.price * cart.quantity;
            }
            return acc;
        }, 0);
    }, [carts, checkedItems]);

    const handleOrder = () => {
        if (checkedItems.length === 0) {
            showAlert("주문할 상품을 선택해 주세요.");
            return;
        }
        showConfirm("주문하시겠습니까?", () => {
            const orderData: Omit<OrderSheet, "delivery"> = {
                orderItems: checkedItems,
                totalPrice,
                totalQuantity,
                firstBookTitle: carts.find((cart) => cart.id === checkedItems[0])?.title!,
            };

            navigate("/order", { state: orderData });
        });
    };

    return (
        <>
            <Title size="large">장바구니</Title>
            <CartStyle $isEmpty={isEmpty}>
                {!isEmpty && (
                    <>
                        <div className="content">
                            {carts.map((cart) => (
                                <CartItem
                                    key={cart.id}
                                    cart={cart}
                                    checkedItems={checkedItems}
                                    onCheck={handelCheckItem}
                                    onDelete={handleDeleteItem}
                                />
                            ))}
                        </div>
                        <div className="summary">
                            <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
                            <Button size="large" scheme="primary" onClick={handleOrder}>
                                주문하기
                            </Button>
                        </div>
                    </>
                )}
                {isEmpty && (
                    <Empty
                        title="장바구니가 비었습니다."
                        icon={<FaShoppingCart />}
                        description={<>장바구니를 채워보세요.</>}
                    />
                )}
            </CartStyle>
        </>
    );
};

interface CartStyleProps {
    $isEmpty?: boolean;
}

export const CartStyle = styled.div<CartStyleProps>`
    display: flex;
    gap: 24px;
    justify-content: ${({ $isEmpty }) => ($isEmpty ? "center" : "space-between")};
    padding: 24px 0 0 0;

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .summary {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .order-info {
        h1 {
            padding: 0 0 24px 0;
        }

        border: 1px solid ${({ theme }) => theme.color.border};
        border-radius: ${({ theme }) => theme.borderRadius.default};
        padding: 12px;
    }

    .delivery {
        fieldset {
            border: 0;
            padding: 0;
            margin: 0 0 12px 0;
            display: flex;
            justify-content: start;
            align-items: center;
            gap: 8px;

            label {
                width: 80px;
            }

            .input {
                flex: 1;
                input {
                    width: 100%;
                }
            }
        }
        .error-text {
            color: red;
            padding: 0;
            margin: 0 0 12px 0;
            text-align: right;
        }
    }
`;

export default Cart;
