import React from "react";
import { useNavigate } from "react-router-dom";
import cart from "../assets/Empty Cart_inverted_bg.svg";
import { CartContext, CartContextType } from "../context/CartContext";
import { Product } from "../context/ProductContext";

interface CardProps {
  product: Product;
  navigate?: any;
}

const Card = ({ product }: CardProps) => {
  const navigate = useNavigate();

  return <CardDetails navigate={navigate} product={product} />;
};

class CardDetails extends React.Component<CardProps> {
  static contextType = CartContext;

  render() {
    const { addToCart } = this.context as CartContextType;
    const { product, navigate } = this.props;
    const { name, inStock, gallery, prices, id } = product;
    return (
      <div
        className={`relative group rounded overflow-hidden hover:shadow-md flex flex-col p-4 max-w-md cursor-pointer ${
          !inStock && "opacity-50"
        }`}
        onClick={() => navigate(`/productDetails/${id}`)}
      >
        <div className="relative md:w-[360px] md:h-[330px] flex justify-center mx-auto p-2">
          <img
            className="w-full h-full object-contain self-center"
            src={gallery[0].imageUrl}
            alt={name}
          />
          <button
            className={`hidden group-hover:block absolute -bottom-2 right-4 p-4 ${
              inStock
                ? "bg-green-400 hover:bg-green-600 hover:shadow-2xl"
                : "bg-gray-300"
            } rounded-full`}
            onClick={(e) => {
              e.stopPropagation();
              let defaultAttributes: { [key: string]: string } = {};
              product.attributes.forEach((attribute) => {
                defaultAttributes[attribute.id] = attribute.items[0].id;
              });
              addToCart(product, defaultAttributes);
            }}
            disabled={!inStock}
          >
            <img src={cart} alt="Quick Shop" className="w-[20px]" />
          </button>
        </div>
        <div className="px-6 py-4 bg-white">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">
            {prices[0].symbol}
            {Number(prices[0].amount).toFixed(2)}
          </p>
          {!inStock && (
            <div className="absolute inset-0 bg-gray-500 bg-opacity-10 text-gray-700 flex items-center justify-center text-2xl">
              Out of Stock
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Card;
