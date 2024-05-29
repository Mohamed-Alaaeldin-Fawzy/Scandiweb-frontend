import { Component } from "react";
import { Product } from "../types/product";
import { parseToKebabCase } from "../utils/parseToKebabCase";

interface ProductAttributesProps {
  attributes: Product["attributes"];
  onAttributeSelect?: (attributeId: string, itemId: string) => void;
  selectedAttributes: { [key: string]: string };
  inCart?: boolean;
}

export default class ProductAttributes extends Component<ProductAttributesProps> {
  render() {
    const { attributes, onAttributeSelect, selectedAttributes, inCart } =
      this.props;

    return (
      <div className="w-full">
        {attributes.map((attribute) => (
          <div
            key={attribute.id}
            data-testid={
              inCart
                ? `product-attribute-${parseToKebabCase(attribute.name)}`
                : `cart-item-attribute-${parseToKebabCase(attribute.name)}`
            }
          >
            <h2 className={`${inCart ? "text-sm py-2" : "text-xl py-4"}`}>
              {attribute.name}:{" "}
            </h2>
            <div className="flex gap-2">
              {attribute.items.map((item) => (
                <div
                  key={item.id}
                  data-testid={
                    inCart
                      ? `cart-item-attribute-${parseToKebabCase(
                          attribute.name
                        )}-${parseToKebabCase(attribute.name)}${
                          selectedAttributes[attribute.id] === item.id
                            ? "-selected"
                            : ""
                        }`
                      : ""
                  }
                  className={`flex items-center gap-2 border border-gray-300 rounded ${
                    onAttributeSelect && "cursor-pointer"
                  } ${
                    selectedAttributes[attribute.id] === item.id &&
                    "ring-2 ring-green-500"
                  } hover:bg-gray-100 ${
                    selectedAttributes[attribute.id] === item.id
                      ? "bg-gray-100"
                      : ""
                  } ${inCart ? "text-xs" : "text-base"}`}
                  onClick={() =>
                    onAttributeSelect &&
                    onAttributeSelect(attribute.id, item.id)
                  }
                  style={{
                    backgroundColor:
                      attribute.name === "Color" ? `${item.value}` : "white",
                    padding:
                      attribute.name === "Color" && !inCart ? "16px" : "8px",
                  }}
                >
                  {attribute.name !== "Color"
                    ? inCart
                      ? item.value
                      : item.displayValue
                    : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
