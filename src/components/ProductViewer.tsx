import { Component } from "react";
import Chevron from "../assets/CaretLeft.svg";

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
          <img
            src={Chevron}
            alt="left"
            className="cursor-pointer absolute left-5 top-1/2 translate-y-[-50%] rotate-180 bg-gray-700 bg-opacity-65"
            onClick={onPrev}
          />
        )}
        <img
          src={imageUrl}
          alt=""
          className="lg:max-w-[600px] lg:max-h-[600px] object-contain"
        />
        {showChevron && (
          <img
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
