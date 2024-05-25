import { Component } from "react";

interface StateType {
  isReadMore: boolean;
}

class ReadMore extends Component<{ children: string }, StateType> {
  constructor(props: { children: string }) {
    super(props);
    this.state = {
      isReadMore: true,
    };
  }

  toggleReadMore = () => {
    this.setState((prevState) => ({
      isReadMore: !prevState.isReadMore,
    }));
  };

  render() {
    const { children } = this.props;
    const { isReadMore } = this.state;
    const text = children;

    return text.length > 150 ? (
      <p className="max-w-full py-4">
        {isReadMore ? text.slice(0, 150) : text}
        <span
          onClick={this.toggleReadMore}
          className="text-blue-400 cursor-pointer"
        >
          {isReadMore ? " read more..." : " show less"}
        </span>
      </p>
    ) : (
      <p className="max-w-[350px] py-4">{text}</p>
    );
  }
}

class ProductDescription extends Component<{ description: string }> {
  render() {
    const { description } = this.props;
    return (
      <div className="container">
        <ReadMore>{description}</ReadMore>
      </div>
    );
  }
}

export default ProductDescription;
