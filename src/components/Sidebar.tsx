import { Component } from "react";
import {
  CategoryContext,
  CategoryContextType,
} from "../context/CategoryContext";
import { NavLink } from "react-router-dom";

export default class Sidebar extends Component<{
  isOpened: boolean;
  onClose: () => void;
}> {
  static contextType = CategoryContext;
  render() {
    const { categories, activeCategory, setActiveCategory } = this
      .context as CategoryContextType;
    return (
      <div
        className={`md:hidden flex flex-col gap-x-6 h-full items-start fixed top-20 ${
          this.props.isOpened ? "left-0" : "-left-full"
        } bottom-0 max-w-1/5 z-30 bg-white shadow-sm transition-all duration-300 ease-linear`}
      >
        {categories.map((category) => (
          <NavLink
            to={`/`}
            className={`p-4 flex w-full capitalize ${
              activeCategory === category.name && "text-green-400"
            }`}
            key={category.id}
            onClick={() => {
              setActiveCategory(category.name);
              this.props.onClose();
            }}
            aria-label={`Category: ${category.name}`}
          >
            {category.name}
          </NavLink>
        ))}
      </div>
    );
  }
}
