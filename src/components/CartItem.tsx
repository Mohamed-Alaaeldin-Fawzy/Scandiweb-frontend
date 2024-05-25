import React from "react";
import { Product } from "../context/ProductContext";
import ProductAttributes from "./ProductAttributes";
import increaseIcon from "../assets/plus-square.svg";
import decreaseIcon from "../assets/minus-square.svg";

interface CartItemProps {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
  attributes: Product["attributes"];
  selectedAttributesItems: { [key: string]: string };
  addItemQuantity: (productId: string) => void;
  removeItemQuantity: (productId: string) => void;
}

class CartItem extends React.Component<CartItemProps> {
  render() {
    const {
      name,
      price,
      quantity,
      image,
      attributes,
      selectedAttributesItems,
    } = this.props;

    return (
      <div className="w-full flex items-center justify-between py-2 gap-8 h-full">
        <div>
          <h3 className="truncate">{name}</h3>
          <p>Price: ${price}</p>
          <ProductAttributes
            attributes={attributes}
            selectedAttributes={selectedAttributesItems}
            inCart={true}
          />
        </div>
        <div className="flex gap-4 h-full w-full items-center justify-end">
          <div className="h-full flex flex-col justify-between">
            <button
              aria-label="Increase quantity"
              className="bg-white hover:bg-gray-100 cursor-pointer w-5 h-5"
              onClick={() => this.props.addItemQuantity(this.props.id)}
            >
              <img
                src={increaseIcon}
                alt="increase"
                className="w-full h-full object-cover"
              />
            </button>
            <p className="text-center py-4">{quantity}</p>
            <button
              aria-label="Decrease quantity"
              className="bg-white hover:bg-gray-100 cursor-pointer w-5 h-5"
              onClick={() => this.props.removeItemQuantity(this.props.id)}
            >
              <img
                src={decreaseIcon}
                alt="decrease"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
          <img src={image} alt={name} className="object-contain h-40 w-24" />
        </div>
      </div>
    );
  }
}

export default CartItem;
