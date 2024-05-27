import { Component } from "react";
import Chevron from "../assets/CaretLeft.svg";
import Image from "./Image";

export class ProductViewer extends Component<{
  imageUrl: string;
  onNext: () => void;
  onPrev: () => void;
  showChevron: boolean;
}> {
  render() {
    const { imageUrl, onNext, onPrev, showChevron } = this.props;
    return (
      <div className="relative h-[450px] md:w-[600px] md:h-[600px] flex justify-center">
        {showChevron && (
          <Image
            width={20}
            height={20}
            src={Chevron}
            alt="left"
            isLazy={false}
            className="cursor-pointer absolute left-5 top-1/2 translate-y-[-50%] rotate-180 bg-gray-700 bg-opacity-65"
            onClick={onPrev}
          />
        )}
        <Image
          width={600}
          height={600}
          src={imageUrl}
          objectFit="contain"
          alt="Product image"
          className="object-contain"
        />
        {showChevron && (
          <Image
            width={20}
            height={20}
            isLazy={false}
            src={Chevron}
            className="cursor-pointer absolute right-5 top-1/2 translate-y-[-50%] bg-gray-700 bg-opacity-65"
            alt="right"
            onClick={onNext}
          />
        )}
      </div>
    );
  }
}
