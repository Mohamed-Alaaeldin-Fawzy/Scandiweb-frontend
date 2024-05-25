import { Component } from "react";
import Logo from "../assets/Brand icon.svg";
import cart from "../assets/Cart.svg";
import {
  CategoryContext,
  CategoryContextType,
} from "../context/CategoryContext";
import { NavLink } from "react-router-dom";
import Cart from "./Cart";
import { CartContext } from "../context/CartContext";
import menu from "../assets/burger-menu-left-svgrepo-com.svg";
import Sidebar from "./Sidebar";

export default class Header extends Component<{}, { isOpened: boolean }> {
  static contextType = CategoryContext;
  state = {
    isOpened: false,
  };

  toggleSidebar = () => {
    this.setState((prevState) => ({
      isOpened: !prevState.isOpened,
    }));
  };

  handleCloseSidebar = () => {
    this.setState({ isOpened: false });
  };
  render() {
    const { categories, activeCategory, setActiveCategory, isLoading } = this
      .context as CategoryContextType;

    const { isOpened } = this.state;
    return isLoading ? null : (
      <nav className="h-20 bg-white fixed top-0 inset-x-0 z-30">
        <div className="container mx-auto flex justify-between items-center h-full">
          <button
            aria-label="Menu to open sidebar"
            onClick={this.toggleSidebar}
            className="cursor-pointer bg-white w-8 md:hidden"
          >
            <img src={menu} alt="menu" />
          </button>
          <div className="md:flex gap-x-6 h-full items-center hidden">
            {categories.map((category) => (
              <NavLink
                to={`/`}
                className={`h-full flex items-center border-b-2 px-4 capitalize ${
                  activeCategory === category.name
                    ? "border-b-green-400 text-green-400"
                    : "border-b-transparent"
                }`}
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.name);
                }}
                aria-label={`Category: ${category.name}`}
              >
                {category.name}
              </NavLink>
            ))}
          </div>
          <Sidebar isOpened={isOpened} onClose={this.handleCloseSidebar} />
          <NavLink to={`/`} aria-label="Logo">
            <img src={Logo} alt="logo" aria-label="Home" />
          </NavLink>
          <CartContext.Consumer>
            {({ cartItems, isCartOpened, toggleIsCartOpened }) => (
              <div className="relative flex h-full items-center">
                <button
                  className="cursor-pointer p-4"
                  onClick={toggleIsCartOpened}
                  aria-label="Toggle cart"
                >
                  <img src={cart} alt="cart" aria-label="Cart" />
                  {cartItems.length > 0 && (
                    <span className="h-4 w-4 bg-gray-900 absolute top-6 right-0 rounded-full text-white text-center text-xs">
                      {cartItems.length}
                    </span>
                  )}
                </button>
                {isCartOpened && (
                  <div className="absolute right-0 top-full bg-white min-w-80 max-h-[600px] overflow-y-scroll z-20 shadow-lg">
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
