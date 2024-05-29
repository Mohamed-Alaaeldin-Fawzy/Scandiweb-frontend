import { Component, ContextType } from "react";
import { SelectedCategoryContext } from "../context/SelectedCategoryContext";
import Card from "../components/Card";
import Loading from "../assets/loading.png";
import Image from "../components/Image";
import { fetchProducts } from "../graphql/query";
import { Product } from "../types/product";

interface ProductStateType {
  products: Product[];
  loading: boolean;
}

export default class Home extends Component<{}, ProductStateType> {
  static contextType = SelectedCategoryContext;
  declare context: ContextType<typeof SelectedCategoryContext>;

  state: ProductStateType = {
    products: [],
    loading: true,
  };

  componentDidMount() {
    const getProducts = async () => {
      const products = await fetchProducts();
      this.setState({ products, loading: false });
    };
    getProducts();
  }

  render() {
    const { selectedCategory } = this.context;
    const { products, loading } = this.state;

    return loading ? (
      <div className="container items-center h-screen flex justify-center mx-auto p-4">
        <Image
          width={60}
          height={60}
          className="self-center animate-spin"
          src={Loading}
          alt="loading"
        />
      </div>
    ) : products.length > 0 ? (
      <div className="relative w-screen">
        <div className="container mx-auto py-8">
          <h1 className="text-2xl md:text-3xl py-8 capitalize px-4">
            {selectedCategory}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 place-items-center">
            {products
              .filter(
                (product) =>
                  product.category.name === selectedCategory ||
                  selectedCategory === "all"
              )
              .map((product) => (
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
  }
}
