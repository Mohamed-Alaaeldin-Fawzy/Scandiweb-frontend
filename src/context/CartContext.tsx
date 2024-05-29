import React from "react";
import { Product } from "../types/product";
import { createOrder } from "../graphql/mutation";
import { compareObjects } from "../utils/compareObjects";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedAttributes: { [key: string]: string };
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    selectedAttributes: { [key: string]: string }
  ) => void;
  addItemQuantity: (productId: string) => void;
  removeItemQuantity: (productId: string) => void;
  isCartOpened: boolean;
  toggleIsCartOpened: () => void;
  checkout: () => void;
  errors: string[];
  showCheckoutModal: boolean;
  setShowCheckoutModal: (value: boolean) => void;
}

const storedCartItems = sessionStorage.getItem("cartItems");
let initialCartItems: CartItem[] = [];
if (storedCartItems) {
  try {
    initialCartItems = JSON.parse(storedCartItems);
  } catch (error) {
    console.error("Error parsing stored cart items:", error);
  }
}
const initialContextValue: CartContextType = {
  cartItems: initialCartItems,
  addToCart: () => {},
  isCartOpened: false,
  toggleIsCartOpened: () => {},
  addItemQuantity: () => {},
  removeItemQuantity: () => {},
  checkout: () => {},
  errors: [],
  showCheckoutModal: false,
  setShowCheckoutModal: () => {},
};

const CartContext = React.createContext(initialContextValue);

class CartProvider extends React.Component<
  { children: React.ReactNode },
  {
    cartItems: CartItem[];
    isCartOpened: boolean;
    errors?: string[];
    showCheckoutModal: boolean;
  }
> {
  state = {
    cartItems: initialCartItems as CartItem[],
    isCartOpened: false,
    errors: [],
    showCheckoutModal: false,
  };

  updateSessionStorage = (): void => {
    sessionStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
  };

  componentDidUpdate(
    _prevProps: any,
    prevState: { cartItems: CartItem[]; isCartOpened: boolean }
  ): void {
    if (prevState.cartItems !== this.state.cartItems) {
      this.updateSessionStorage();
    }
  }

  toggleIsCartOpened = () => {
    this.setState((prevState) => {
      return { isCartOpened: !prevState.isCartOpened };
    });
  };

  addItemQuantity = (productId: string): void => {
    this.setState((prevState) => {
      const updatedCartItems = prevState.cartItems.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return { cartItems: updatedCartItems };
    });
  };

  removeItemQuantity = (productId: string): void => {
    this.setState((prevState) => {
      const updatedCartItems = prevState.cartItems
        .map((item) => {
          if (item.product.id === productId) {
            const updatedItem = { ...item, quantity: item.quantity - 1 };
            return updatedItem;
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
      return { cartItems: updatedCartItems };
    });
  };

  addToCart = (
    product: Product,
    selectedAttributes: { [key: string]: string }
  ): void => {
    const existingCartItem = this.state.cartItems.find(
      (item) =>
        item.product.id === product.id &&
        compareObjects(item.selectedAttributes, selectedAttributes)
    );
    if (existingCartItem) {
      this.addItemQuantity(product.id);
    } else {
      this.setState((prevState) => {
        return {
          cartItems: [
            ...prevState.cartItems,
            { product, quantity: 1, selectedAttributes },
          ],
        };
      });
    }
  };

  checkout = async (): Promise<void> => {
    const data = await createOrder(this.state.cartItems);

    if (data.errors) {
      this.setState({ ...this.state, errors: data.errors });
      return;
    }

    this.setState({ ...this.state, showCheckoutModal: true });
    this.emptyCart();
  };

  emptyCart = (): void => {
    this.setState({ cartItems: [], isCartOpened: false, errors: [] });
    sessionStorage.removeItem("cartItems");
  };

  setShowCheckoutModal = (value: boolean): void => {
    this.setState((prevState) => {
      return { ...prevState, showCheckoutModal: value };
    });
  };

  render() {
    const { cartItems, isCartOpened } = this.state;
    const { children } = this.props;

    return (
      <CartContext.Provider
        value={{
          cartItems,
          addToCart: this.addToCart,
          toggleIsCartOpened: this.toggleIsCartOpened,
          isCartOpened,
          addItemQuantity: this.addItemQuantity,
          removeItemQuantity: this.removeItemQuantity,
          checkout: this.checkout,
          errors: this.state.errors,
          showCheckoutModal: this.state.showCheckoutModal,
          setShowCheckoutModal: this.setShowCheckoutModal,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }
}

const CartConsumer = CartContext.Consumer;

export { CartProvider, CartConsumer, CartContext };
