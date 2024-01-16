import React from "react";
import { useNavigate } from "react-router-dom";

//icons
import arrowR from "assets/dock/arrow-right-white.svg";

//components
import Button from "./Button";

const CTA = () => {
  const navigate = useNavigate();
  return (
    <div className="py-[120px] lg:py-20" id="cta">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="black-text-3 max-w-[757px] md:leading-[90px] lg:leading-[122px] text-[40px] md:text-[70px] lg:text-8xl mx-auto text-center font-black sato">
          It’s super easy to get started.
        </h2>
        <p className="black-text-4 text-xl font-light mt-8 mb-12 lg:my-12 text-center sato max-w-[529px] mx-auto">
          Your booking is entirely FREE, it's time to embark on your shipping journey with us.
        </p>
        <div className="flex justify-center">
          <Button
            title="Get started for free"
            icon={arrowR}
            iconRight={true}
            style={{ width: "332px" }}
            onClick={() => navigate("/signup")}
          />
        </div>
      </div>
    </div>
  );
};

export default CTA;
