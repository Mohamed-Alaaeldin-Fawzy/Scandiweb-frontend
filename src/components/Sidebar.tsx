import { Component } from "react";
import { HeaderState } from "./Header";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  onClose: () => void;
  setSelectedCategory: (category: string) => void;
  selectedCategory: string;
}

export default class Sidebar extends Component<HeaderState & SidebarProps> {
  render() {
    const {
      categories,
      selectedCategory,
      setSelectedCategory,
      onClose,
      isOpened,
    } = this.props as HeaderState & SidebarProps;
    return (
      <div
        className={`md:hidden flex flex-col gap-x-6 h-full items-start fixed top-20 ${
          isOpened ? "left-0" : "-left-full"
        } bottom-0 max-w-1/5 z-30 bg-white shadow-sm transition-all duration-300 ease-linear`}
      >
        {categories.map((category) => (
          <NavLink
            to={`/`}
            className={`p-4 flex w-full capitalize ${
              selectedCategory === category.name && "text-green-400"
            }`}
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.name);
              onClose();
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
