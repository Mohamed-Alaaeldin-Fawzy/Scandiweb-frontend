import { Component } from "react";
import { CartContext, CartContextType } from "../context/CartContext";

export default class Overlay extends Component<{}> {
  static contextType = CartContext;
  render() {
    const { toggleIsCartOpened, isCartOpened } = this
      .context as CartContextType;
    return (
      isCartOpened && (
        <div
          className="bg-gray-800 bg-opacity-60 fixed top-0 cursor-pointer left-0 w-full h-full bottom-0 z-10"
          onClick={toggleIsCartOpened}
        ></div>
      )
    );
  }
}
