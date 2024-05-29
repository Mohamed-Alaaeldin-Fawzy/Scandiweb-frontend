import { Component } from "react";

class ProductDescription extends Component<{ description: React.ReactNode }> {
  render() {
    const { description } = this.props;
    return (
      <div className="container" data-testid="product-description">
        {description}
      </div>
    );
  }
}

export default ProductDescription;
