import { Component, createContext, ReactNode } from "react";
import { fetchCategories } from "../graphql/query";

interface CategoryProp {
  id: number;
  name: string;
}

export interface CategoryContextType {
  categories: CategoryProp[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  isLoading: boolean;
}

const defaultContext: CategoryContextType = {
  categories: [],
  activeCategory: "",
  setActiveCategory: () => {},
  isLoading: true,
};

const CategoryContext = createContext<CategoryContextType>(defaultContext);

class CategoryProvider extends Component<
  { children: ReactNode },
  CategoryContextType
> {
  state: CategoryContextType = {
    categories: [],
    activeCategory: "",
    setActiveCategory: (category: string) => {
      this.setState({ activeCategory: category });
    },
    isLoading: true,
  };

  componentDidMount() {
    const getCategories = async () => {
      const categories = await fetchCategories();
      this.setState({ categories, activeCategory: "all", isLoading: false });
    };
    getCategories();
  }

  render() {
    return (
      <CategoryContext.Provider value={this.state}>
        {this.props.children}
      </CategoryContext.Provider>
    );
  }
}

export { CategoryContext, CategoryProvider };
