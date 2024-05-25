import { Component } from "react";
import {
  CategoryContext,
  CategoryContextType,
} from "../context/CategoryContext";
import { ProductContext, ProductContextType } from "../context/ProductContext";
import Card from "./Card";
import Loading from "../assets/loading.png";

export default class CardsSection extends Component {
  static contextType = CategoryContext;

  render() {
    const { activeCategory } = this.context as CategoryContextType;

    return (
      <ProductContext.Consumer>
        {(productContext: ProductContextType) => {
          const { products, loading } = productContext;

          const filteredProducts = products
            ? products.filter((product) =>
                activeCategory === "all"
                  ? true
                  : activeCategory === product.category.name
              )
            : [];

          return loading ? (
            <div className="container items-center h-screen flex justify-center mx-auto p-4">
              <img
                className="w-40 h-40 object-contain self-center animate-spin"
                src={Loading}
                alt="loading"
              />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="relative w-screen p-4 md:p-2">
              <div className="container mx-auto py-8">
                <h1 className="text-2xl md:text-3xl py-8 capitalize">
                  {activeCategory}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 place-items-center">
                  {filteredProducts.map((product) => (
                    <div key={product.id}>
                      <Card product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="container items-center h-screen flex justify-center mx-auto p-2">
              <p>No products available stay tuned</p>
            </div>
          );
        }}
      </ProductContext.Consumer>
    );
  }
}
