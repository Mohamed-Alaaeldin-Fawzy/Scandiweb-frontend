import React from "react";
import { Product } from "../types/product";
import ProductAttributes from "./ProductAttributes";
import increaseIcon from "../assets/plus-square.svg";
import decreaseIcon from "../assets/minus-square.svg";
import Image from "./Image";

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
      <div className="flex justify-between py-4 gap-4 border-b-2 items-center">
        <div className="flex flex-col gap-2">
          <h3 className="truncate text-xl">{name}</h3>
          <p className="text-xl font-bold">${price}</p>
          <div className="flex gap-1 px-2">
            <ProductAttributes
              attributes={attributes}
              selectedAttributes={selectedAttributesItems}
              inCart={true}
            />
          </div>
        </div>

        <div className="flex gap-2 h-full w-full min-h-[150px] min-w-[100px] justify-end">
          <div className="flex flex-col justify-between h-[150px] w-[20px]">
            <button
              aria-label="Increase quantity"
              data-testid="cart-item-amount-increase"
              className="bg-white hover:bg-gray-100 cursor-pointer w-5 h-5 justify-self-start"
              onClick={() => this.props.addItemQuantity(this.props.id)}
            >
              <Image
                src={increaseIcon}
                width={20}
                height={20}
                alt="increase"
                objectFit="cover"
              />
            </button>
            <p className="text-center py-4" data-testid="cart-item-amount">
              {quantity}
            </p>
            <button
              aria-label="Decrease quantity"
              data-testid="cart-item-amount-decrease"
              className="bg-white hover:bg-gray-100 cursor-pointer w-5 h-5 justify-self-end"
              onClick={() => this.props.removeItemQuantity(this.props.id)}
            >
              <Image
                src={decreaseIcon}
                width={20}
                height={20}
                alt="decrease"
                objectFit="cover"
              />
            </button>
          </div>
          <Image
            src={image}
            alt={name}
            objectFit="contain"
            width={100}
            height={150}
          />
        </div>
      </div>
    );
  }
}

export default CartItem;
