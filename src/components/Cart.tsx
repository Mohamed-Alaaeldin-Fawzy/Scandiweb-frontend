import React from "react";
import CartItem from "./CartItem";
import { CartContext, CartContextType } from "../context/CartContext";
import { ToastContext, ToastContextType } from "../context/ToasterContext";

class Cart extends React.Component {
  static contextType = CartContext;

  getTotalPrice = (items: CartContextType["cartItems"]) => {
    let total = 0;
    items.forEach(({ product, quantity }) => {
      const price = Number(product.prices[0].amount);
      total += price * quantity;
    });
    return total.toFixed(2);
  };

  render() {
    const { cartItems, addItemQuantity, removeItemQuantity, checkout, errors } =
      this.context as CartContextType;

    return (
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-2xl font-bold">Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="h-full w-full overflow-y-auto">
            <h2 className="text-xl">
              <span className="font-bold">My Bag:</span> {cartItems.length}{" "}
              {cartItems.length === 1 ? "item" : "items"}
            </h2>
            {cartItems.map(({ product, quantity, selectedAttributes }) => (
              <CartItem
                key={product.id}
                selectedAttributesItems={selectedAttributes}
                id={product.id}
                name={product.name}
                price={Number(product.prices[0].amount).toFixed(2)}
                image={product.gallery[0].imageUrl}
                attributes={product.attributes}
                quantity={quantity}
                addItemQuantity={addItemQuantity}
                removeItemQuantity={removeItemQuantity}
              />
            ))}
          </div>
        )}
        <p className="flex justify-between gap-4">
          <span>Total:</span>
          <span>$ {this.getTotalPrice(cartItems)}</span>
        </p>

        <ToastContext.Consumer>
          {(toast: ToastContextType) => (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg w-full"
              onClick={() => {
                checkout();
                if (errors.length > 0) {
                  toast.addToast({
                    id: "error",
                    message: "Something went wrong",
                    type: "error",
                  });
                }
                if (errors.length === 0) {
                  toast.addToast({
                    id: "success",
                    message: "Order placed successfully!",
                    type: "success",
                  });
                }
              }}
            >
              Checkout
            </button>
          )}
        </ToastContext.Consumer>
      </div>
    );
  }
}

export default Cart;
