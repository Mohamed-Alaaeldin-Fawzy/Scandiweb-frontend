import { Component } from "react";

interface ImageProps {
  width: number | string;
  height: number | string;
  src: string;
  isLazy?: boolean;
  alt: string;
  objectFit?: string;
  className?: string;
  onClick?: () => void;
}

class Image extends Component<ImageProps> {
  static defaultProps = {
    isLazy: false,
    className: "",
  };

  render() {
    const {
      width,
      height,
      src,
      isLazy,
      alt,
      className,
      onClick,
      objectFit = "cover",
      ...rest
    } = this.props;
    const imageStyles = `${
      objectFit === "contain" ? "object-contain" : "object-cover"
    } ${className ? className : ""}`;

    return (
      <img
        width={width}
        height={height}
        src={src}
        loading={isLazy ? "lazy" : "eager"}
        alt={alt}
        className={imageStyles}
        onClick={onClick}
        {...rest}
      />
    );
  }
}

export default Image;
