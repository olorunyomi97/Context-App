import React from "react";
import { useNavigate } from "react-router-dom";

import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

//icons
import star from "assets/dock/star.svg";

//components
import Button from "./Button";

const DataCounter: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="py-[80px] lg:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-y-0">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-[54px] md:max-w-[516px] lg:max-w-[416px] leading-[50px] md:leading-[65px] lg:leading-[76px] mb-3 sato font-medium">
              Securing your confidence is our{" "}
              <span className="font-bold sato">Top Priority.</span>
            </h2>
            <p className="grey-text text-xl font-normal md:max-w-[500px] lg:max-w-[416px] leading-[32px] mb-10 lg:mb-16 sato">
              Say goodbye to your transportation headaches. Experience worry-free shipping with our comprehensive freight solutions. Let us handle it all for you
            </p>
            <div className="" data-aos="fade-up">
              <Button
                icon={star}
                title="Start Shipping today"
                style={{ width: "257px" }}
                onClick={() => navigate("/signup")}
                manrope={false}
              />
            </div>
          </div>
          <div className="hidden lg:grid lg:grid-cols-2 gap-6">
            <div
              className="h-[258px] one rounded-[20px] flex flex-col justify-center items-center"
              data-aos="flip-left"
            >
              <p className="grey-text-2 text-6xl xl:text-8xl">
                {" "}
                <CountUp end={3} duration={2}>
                  {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                      <span ref={countUpRef} />
                    </VisibilitySensor>
                  )}
                </CountUp>
                +
              </p>
              <p className="text-[#D1D5DB] text-lg xl:text-xl font-normal sato">
                Minutes to Book
              </p>
            </div>
            <div
              className="h-[258px] two rounded-[20px] flex flex-col justify-center items-center"
              data-aos="flip-right"
            >
              <p className="black-text-2 text-6xl xl:text-8xl">
                <CountUp end={100} duration={2}>
                  {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                      <span ref={countUpRef} />
                    </VisibilitySensor>
                  )}
                </CountUp>
                %
              </p>
              <p className="grey-text text-lg xl:text-xl font-norma sato">
                Shipment Visibility
              </p>
            </div>
            <div
              className="h-[258px] three rounded-[20px] flex flex-col justify-center items-center"
              data-aos="flip-left"
            >
              <p className="black-text-2 text-6xl xl:text-8xl">
                {" "}
                <CountUp end={12} duration={3}>
                  {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                      <span ref={countUpRef} />
                    </VisibilitySensor>
                  )}
                </CountUp>
                B+
              </p>
              <p className="grey-text text-lg xl:text-xl font-normal sato">
                Value of Goods Shipped
              </p>
            </div>
            <div
              className="h-[258px] four rounded-[20px] flex flex-col justify-center items-center"
              data-aos="flip-left"
            >
              <p className="grey-text-2 text-6xl xl:text-8xl">
                {" "}
                <CountUp end={360} duration={2}>
                  {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                      <span ref={countUpRef} />
                    </VisibilitySensor>
                  )}
                </CountUp>
              </p>
              <p className="text-[#D1D5DB] text-lg xl:text-xl font-normal sato">
                Container Speed
              </p>
            </div>
          </div>
          <div className="marquee metrics">
            <div className="marquee__content">
              <div className="h-[258px] w-[302px] one rounded-[20px] flex flex-col justify-center items-center">
                <p className="grey-text-2 text-6xl xl:text-8xl">3+</p>
                <p className="text-[#D1D5DB] text-lg xl:text-xl font-normal">
                  Minutes to Book
                </p>
              </div>
              <div className="h-[258px] w-[302px] two rounded-[20px] flex flex-col justify-center items-center">
                <p className="black-text-2 text-6xl xl:text-8xl">100%</p>
                <p className="grey-text text-lg xl:text-xl font-normal">
                  Shipment Visibility
                </p>
              </div>
              <div className="h-[258px] w-[302px] three rounded-[20px] flex flex-col justify-center items-center">
                <p className="black-text-2 text-6xl xl:text-8xl">12B+</p>
                <p className="grey-text text-lg xl:text-xl font-normal">
                  Value of Goods Shipped
                </p>
              </div>
              <div className="h-[258px] w-[302px] four rounded-[20px] flex flex-col justify-center items-center">
                <p className="grey-text-2 text-6xl xl:text-8xl">360</p>
                <p className="text-[#D1D5DB] text-lg xl:text-xl font-normal">
                  Container Speed
                </p>
              </div>
            </div>
            <div className="marquee__content">
              <div className="h-[258px] w-[302px] one rounded-[20px] flex flex-col justify-center items-center">
                <p className="grey-text-2 text-6xl xl:text-8xl">3+</p>
                <p className="text-[#D1D5DB] text-lg xl:text-xl font-normal">
                  Minutes to Book
                </p>
              </div>
              <div className="h-[258px] w-[302px] two rounded-[20px] flex flex-col justify-center items-center">
                <p className="black-text-2 text-6xl xl:text-8xl">100%</p>
                <p className="grey-text text-lg xl:text-xl font-normal">
                  Shipment Visibility
                </p>
              </div>
              <div className="h-[258px] w-[302px] three rounded-[20px] flex flex-col justify-center items-center">
                <p className="black-text-2 text-6xl xl:text-8xl">12B+</p>
                <p className="grey-text text-lg xl:text-xl font-normal">
                  Value of Goods Shipped
                </p>
              </div>
              <div className="h-[258px] w-[302px] four rounded-[20px] flex flex-col justify-center items-center">
                <p className="grey-text-2 text-6xl xl:text-8xl">360</p>
                <p className="text-[#D1D5DB] text-lg xl:text-xl font-normal">
                  Container Speed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCounter;
