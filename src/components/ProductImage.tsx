import { Component } from "react";

export default class ProductImages extends Component<{
  images: string[];
  onClick: (imageUrl: string) => void;
}> {
  render() {
    const { images, onClick } = this.props;
    return (
      <div className="flex md:flex-col gap-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="gallery images"
            className="md:w-[80px] md:h-[80px] min-w-[35px] min-h-[35px] block object-cover cursor-pointer hover:border"
            onClick={() => onClick(image)}
          />
        ))}
      </div>
    );
  }
}
