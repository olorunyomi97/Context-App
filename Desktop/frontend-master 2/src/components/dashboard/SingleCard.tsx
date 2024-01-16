import React from "react";
import { Link } from "react-router-dom";

interface CardProp {
  to: string;
  text: string;
  data: any;
  image: string;
  style?: any;
}

const SingleCard = ({ to, text, data, image, style }: CardProp) => {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <img src={image} alt="calendar" />
          <p className="grey-text text-base">{text}</p>
        </div>
        <Link to={`/${to}`} className="text-base" style={style}>
          View all
        </Link>
      </div>
      <p className="text-2xl mt-6 black-text-3 font-semibold">{data}</p>
    </div>
  );
};

export default SingleCard;
