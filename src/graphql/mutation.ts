import { client } from "./client";
import { gql } from "@apollo/client";
import { CartItem } from "../context/CartContext";

export const createOrder = async (cartItems: CartItem[]) => {
  const orderItems = cartItems.map((item) => ({
    product_id: item.product.id,
    attributes: Object.values(item.selectedAttributes),
    quantity: item.quantity,
    price: Number(item.product.prices[0].amount) * item.quantity,
  }));

  const { data } = await client.mutate({
    mutation: gql`
      mutation ($orderItems: [OrderItemInput!]!) {
        createOrder(order_items: $orderItems) {
          id
          order_items {
            product_id
            attributes {
              id
              attribute_id
              display_value
              value
            }
            quantity
            price
          }
        }
      }
    `,
    variables: {
      orderItems,
    },
  });
  return data;
};
