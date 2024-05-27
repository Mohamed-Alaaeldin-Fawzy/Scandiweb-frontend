import { Component, ContextType } from "react";
import Logo from "../assets/Brand icon.svg";
import cart from "../assets/Cart.svg";
import { NavLink } from "react-router-dom";
import Cart from "./Cart";
import { CartContext } from "../context/CartContext";
import menu from "../assets/burger-menu-left-svgrepo-com.svg";
import Sidebar from "./Sidebar";
import Image from "./Image";
import { fetchCategories } from "../graphql/query";
import { SelectedCategoryContext } from "../context/SelectedCategoryContext";

interface Category {
  id: number;
  name: string;
}

export interface HeaderState {
  isOpened: boolean;
  categories: Category[];
  isLoading: boolean;
}

export default class Header extends Component<{}, HeaderState> {
  static contextType = SelectedCategoryContext;
  declare context: ContextType<typeof SelectedCategoryContext>;
  state = {
    isOpened: false,
    categories: [],
    isLoading: true,
  };

  componentDidMount() {
    const getCategories = async () => {
      const categories = await fetchCategories();
      this.setState((prevState) => {
        return {
          ...prevState,
          categories,
          isLoading: false,
        };
      });
      this.context.setSelectedCategory(categories[0].name);
    };
    getCategories();
  }

  toggleSidebar = () => {
    this.setState((prevState) => ({
      isOpened: !prevState.isOpened,
    }));
  };

  handleCloseSidebar = () => {
    this.setState({ isOpened: false });
  };
  render() {
    const { categories, isLoading } = this.state as HeaderState;
    const { setSelectedCategory, selectedCategory } = this.context;
    const { isOpened } = this.state;
    return isLoading ? null : (
      <nav className="h-20 bg-white fixed top-0 inset-x-0 z-30">
        <div className="container mx-auto flex justify-between items-center h-full">
          <button
            aria-label="Menu to open sidebar"
            onClick={this.toggleSidebar}
            className="cursor-pointer bg-white w-8 md:hidden"
          >
            <Image width={24} height={24} src={menu} alt="menu" />
          </button>
          <div className="md:flex gap-x-6 h-full items-center hidden">
            {categories.map((category) => (
              <NavLink
                to={`/`}
                className={`h-full flex items-center border-b-2 px-4 capitalize ${
                  selectedCategory === category.name
                    ? "border-b-green-400 text-green-400"
                    : "border-b-transparent"
                }`}
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.name);
                }}
                aria-label={`Category: ${category.name}`}
              >
                {category.name}
              </NavLink>
            ))}
          </div>
          <Sidebar
            isOpened={isOpened}
            onClose={this.handleCloseSidebar}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            selectedCategory={selectedCategory}
            isLoading={isLoading}
          />
          <NavLink to={`/`} aria-label="Logo">
            <Image
              width={50}
              height={50}
              src={Logo}
              alt="logo"
              aria-label="Home"
            />
          </NavLink>
          <CartContext.Consumer>
            {({ cartItems, isCartOpened, toggleIsCartOpened }) => (
              <div className="relative flex h-full items-center">
                <button
                  className="cursor-pointer p-4"
                  onClick={toggleIsCartOpened}
                  aria-label="Toggle cart"
                >
                  <Image
                    width={24}
                    height={24}
                    src={cart}
                    alt="cart"
                    aria-label="Cart"
                  />
                  {cartItems.length > 0 && (
                    <span className="h-4 w-4 bg-gray-900 absolute top-6 right-0 rounded-full text-white text-center text-xs">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                {isCartOpened && (
                  <div className="absolute right-0 top-full bg-white min-w-[350px] max-h-[600px] z-20 shadow-lg">
                    <Cart />
                  </div>
                )}
              </div>
            )}
          </CartContext.Consumer>
        </div>
      </nav>
    );
  }
}
