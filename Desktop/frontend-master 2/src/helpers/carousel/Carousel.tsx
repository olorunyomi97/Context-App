import React, { useState } from "react";

//styles
import "./index.css";

//icons
import carouselLeft from "assets/icons/carousel-left.svg";
import carouselRight from "assets/icons/carousel-right.svg";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = React.Children.count(children - 1);
    }

    setActiveIndex(newIndex);
  };

  return (
    <div className="carousel relative">
      <div
        className="inner max-h-72 h-72"
        style={{ transform: `translateX(-${activeIndex * 30.5}%)` }}
      >
        {React.Children.map(children, (child, idx) => {
          return React.cloneElement(child, { width: "96%" });
        })}
      </div>
      <div className="indicators">
        <button
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
          className={` ${activeIndex === 0 ? "hidden" : ""}`}
        >
          <img src={carouselLeft} alt="" />
        </button>
        <button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
          className={`ml-[96%] ${activeIndex !== 0 ? "hidden" : ""}`}
        >
          <img src={carouselRight} alt="" />
        </button>
      </div>
      <div className="indicators-two flex justify-center w-[96%] mt-6 gap-x-1 items-center">
        <div
          className={`${
            activeIndex === 0
              ? "h-[6px] w-6 rounded-full bg-[#3AB44A]"
              : "h-[8px] w-[8px] bg-[#D9D9D9] rounded-full"
          }`}
        ></div>
        <div
          className={`${
            activeIndex !== 0
              ? "h-[6px] w-6 rounded-full bg-[#3AB44A]"
              : "h-[8px] w-[8px] bg-[#D9D9D9] rounded-full"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Carousel;
