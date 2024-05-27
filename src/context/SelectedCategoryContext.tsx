import { Component, createContext, ReactNode } from "react";

export interface SelectedCategoryContextType {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const defaultContext: SelectedCategoryContextType = {
  selectedCategory: "",
  setSelectedCategory: () => {},
};

const SelectedCategoryContext =
  createContext<SelectedCategoryContextType>(defaultContext);

class SelectedCategoryProvider extends Component<
  { children: ReactNode },
  SelectedCategoryContextType
> {
  state: SelectedCategoryContextType = {
    selectedCategory: "",
    setSelectedCategory: (category: string) => {
      this.setState({ selectedCategory: category });
    },
  };

  render() {
    return (
      <SelectedCategoryContext.Provider value={this.state}>
        {this.props.children}
      </SelectedCategoryContext.Provider>
    );
  }
}

export { SelectedCategoryContext, SelectedCategoryProvider };
