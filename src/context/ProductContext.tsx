import { Component, createContext, ReactNode } from "react";
import { fetchProducts } from "../graphql/query";

interface Category {
  id: string;
  name: string;
}

interface Prices {
  amount: string;
  currency: string;
  symbol: string;
}

interface Gallery {
  id: string;
  imageUrl: string;
}

interface AttributeItem {
  id: string;
  value: string;
  displayValue: string;
}

interface Attributes {
  id: string;
  name: string;
  items: AttributeItem[];
  type: string;
}
export interface Product {
  id: string;
  name: string;
  inStock: boolean;
  gallery: Gallery[];
  prices: Prices[];
  brand: string;
  category: Category;
  attributes: Attributes[];
  description: string;
}

export interface ProductContextType {
  products: Product[];
  loading: boolean;
}

const defaultContext: ProductContextType = {
  products: [],
  loading: true,
};

const ProductContext = createContext<ProductContextType>(defaultContext);

class ProductProvider extends Component<
  { children: ReactNode },
  ProductContextType
> {
  state: ProductContextType = {
    products: [],
    loading: true,
  };

  componentDidMount(): void {
    const getProducts = async () => {
      const products = await fetchProducts();
      this.setState({ products, loading: false });
    };
    getProducts();
  }

  render() {
    return (
      <ProductContext.Provider value={this.state}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export { ProductContext, ProductProvider };
