import React, { Component, ContextType } from "react";
import Header from "./Header";
import Overlay from "./Overlay";
import CheckoutModal from "./CheckoutModal";
import { CartContext } from "../context/CartContext";

export default class Layout extends Component<{ children: React.ReactNode }> {
  static contextType = CartContext;
  declare context: ContextType<typeof CartContext>;
  render() {
    const { errors, showCheckoutModal, setShowCheckoutModal } = this.context;
    return (
      <>
        <Header />
        {showCheckoutModal && (
          <CheckoutModal
            isSuccess={errors.length === 0}
            message={
              errors.length > 0
                ? "Something went wrong"
                : "Your order has been placed, we will contact you"
            }
            handleClose={() => setShowCheckoutModal(false)}
          />
        )}
        <Overlay />
        <div className="py-20">{this.props.children}</div>
      </>
    );
  }
}
