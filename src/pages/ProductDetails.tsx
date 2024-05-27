import { Component } from "react";
import { RouteProps, useParams } from "react-router-dom";
import ProductAttributes from "../components/ProductAttributes";
import ProductImages from "../components/ProductImage";
import { ProductViewer } from "../components/ProductViewer";
import { parseHtml } from "../utils/htmlParser";
import ProductDescription from "../components/ProductDescription";
import Loading from "../assets/loading.png";
import { CartContext, CartContextType } from "../context/CartContext";
import Image from "../components/Image";
import { getProductById } from "../graphql/query";
import { Product } from "../types/product";

const ProductDetailsPage = () => {
  const { id } = useParams();
  return <ProductDetails id={id} />;
};

interface StateType {
  imageUrl: string;
  product: Product;
  selectedAttributes: { [key: string]: string };
  isButtonDisabled: boolean;
  isLoading: boolean;
}

class ProductDetails extends Component<RouteProps, StateType> {
  state: StateType = {
    imageUrl: "",
    product: {} as Product,
    selectedAttributes: {} as { [key: string]: string },
    isButtonDisabled: true,
    isLoading: true,
  };

  componentDidMount() {
    const { id } = this.props;
    const fetchProductById = async (id: string) => {
      const product = await getProductById(id);
      this.setState((prevState) => {
        return {
          ...prevState,
          product,
          isLoading: false,
          imageUrl: product?.gallery[0]?.imageUrl,
          isButtonDisabled: !product.inStock
            ? true
            : product.attributes.length > 0
            ? true
            : false,
        };
      });
    };

    if (!id) return;
    fetchProductById(id);
  }

  handleAttributeSelect = (attributeId: string, itemId: string) => {
    this.setState((prevState) => {
      const { product, selectedAttributes } = prevState;
      const updatedSelectedAttributes = {
        ...selectedAttributes,
        [attributeId]: itemId,
      };

      let disableButton = false;
      if (product.inStock) {
        disableButton = product.attributes.every(
          (attr) => updatedSelectedAttributes[attr.id]
        );
      } else {
        disableButton = false;
      }
      return {
        selectedAttributes: updatedSelectedAttributes,
        isButtonDisabled: !disableButton,
      };
    });
  };

  goToNextImage = () => {
    const { gallery } = this.state.product;
    const { imageUrl } = this.state;
    const index = gallery.findIndex((item) => item.imageUrl === imageUrl);
    if (index < gallery.length - 1) {
      this.setState({
        imageUrl: gallery[index + 1].imageUrl,
      });
    }
    if (index === gallery.length - 1) {
      this.setState({
        imageUrl: gallery[0].imageUrl,
      });
    }
  };

  goToPreviousImage = () => {
    const { gallery } = this.state.product;
    const { imageUrl } = this.state;
    const index = gallery.findIndex((item) => item.imageUrl === imageUrl);
    if (index > 0) {
      this.setState({
        imageUrl: gallery[index - 1].imageUrl,
      });
    }
    if (index === 0) {
      this.setState({
        imageUrl: gallery[gallery.length - 1].imageUrl,
      });
    }
  };

  render() {
    const { product, imageUrl } = this.state;

    return product.id ? (
      <CartContext.Consumer>
        {(cart: CartContextType) => (
          <form className="container mx-auto py-8 flex flex-col lg:flex-row gap-10 justify-center">
            <div className="flex flex-col-reverse gap-4 items-center md:flex-row">
              <ProductImages
                images={product.gallery.map((image) => image.imageUrl)}
                onClick={(imageUrl) => this.setState({ imageUrl })}
              />
              <ProductViewer
                imageUrl={imageUrl}
                onNext={this.goToNextImage}
                onPrev={this.goToPreviousImage}
                showChevron={product.gallery.length > 1}
              />
            </div>
            <div className="p-4 lg:max-w-[400px]">
              <h1 className="text-2xl">{product.name}</h1>
              {product.attributes && (
                <ProductAttributes
                  attributes={product.attributes}
                  onAttributeSelect={this.handleAttributeSelect}
                  selectedAttributes={this.state.selectedAttributes}
                />
              )}
              <div className="py-6">
                <h2 className="text-xl py-4">Price:</h2>
                <p className="text-2xl font-bold">
                  {product.prices[0].symbol +
                    " " +
                    Number(product.prices[0].amount).toFixed(2)}
                </p>
              </div>
              <button
                className={`${
                  !this.state.isButtonDisabled
                    ? "bg-green-500"
                    : "bg-gray-500 bg-opacity-50"
                } text-white py-4 px-8 w-full rounded-sm ${
                  !this.state.isButtonDisabled && "hover:bg-green-600"
                }
            ${
              this.state.isButtonDisabled
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }
            `}
                disabled={this.state.isButtonDisabled}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  cart.addToCart(product, this.state.selectedAttributes);
                }}
              >
                Add to cart
              </button>
              <ProductDescription
                description={parseHtml(product.description)}
              />
            </div>
          </form>
        )}
      </CartContext.Consumer>
    ) : (
      <div className="container items-center h-screen flex justify-center mx-auto p-2">
        <Image
          width={60}
          height={60}
          className="self-center animate-spin"
          src={Loading}
          alt="loading"
        />
      </div>
    );
  }
}

export default ProductDetailsPage;
