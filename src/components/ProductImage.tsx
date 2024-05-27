import { Component } from "react";
import Image from "./Image";

export default class ProductImages extends Component<{
  images: string[];
  onClick: (imageUrl: string) => void;
}> {
  render() {
    const { images, onClick } = this.props;
    return images.length > 1 ? (
      <div className="flex md:flex-col gap-2">
        {images.map((image, index) => (
          <Image
            width={80}
            height={80}
            key={index}
            src={image}
            isLazy={false}
            alt="gallery images"
            className="md:w-[80px] md:h-[80px] min-w-[35px] min-h-[35px] block object-cover cursor-pointer hover:border"
            onClick={() => onClick(image)}
          />
        ))}
      </div>
    ) : null;
  }
}
