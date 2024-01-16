import React, { useState } from "react";

//styles
import "./index.css";

//icons
import carouselLeft from "assets/icons/carousel-left.svg";
import carouselRight from "assets/icons/carousel-right.svg";

export const HomeCarouselItem = ({ children, width }) => {
  return (
    <div className="home-carousel-item" style={{ width: width }}>
      {children}
    </div>
  );
};

const HomeCarousel = ({ children }) => {
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
    <div className="home-carousel relative">
      <div
        className="home-inner"
        style={{ transform: `translateX(-${activeIndex * 20}%)` }}
      >
        {React.Children.map(children, (child, idx) => {
          return React.cloneElement(child, { width: "36%" });
        })}
      </div>
      <div className="home-indicators">
        <button
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
          //   className={` ${activeIndex === 0 ? "hidden" : ""}`}
        >
          <img src={carouselLeft} alt="" />
        </button>
        <button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
          //   className={`ml-[96%]`}
        >
          <img src={carouselRight} alt="" />
        </button>
      </div>
      {/* <div className="indicators-two flex justify-center w-[96%] mt-6 gap-x-1 items-center">
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
      </div> */}
    </div>
  );
};

export default HomeCarousel;
