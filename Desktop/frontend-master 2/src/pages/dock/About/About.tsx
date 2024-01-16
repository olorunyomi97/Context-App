import React, { useEffect, useRef, useState } from "react";

//components
import Layout from "components/dock/Layout";
import CTA from "components/dock/CTA";
import DataCounter from "components/dock/DataCounter";
import AboutImageComp from "components/dock/AboutImageComp";
import AboutStoryComp from "components/dock/AboutStoryComp";

//icons

//images
import aboutContainer from "assets/dock/images/aboutContainer.png";
import smallaboutcontainer from "assets/dock/images/smallabout-container.png";
import sola from "assets/dock/sola.png";
import bayo from "assets/dock/bayo.png";
import foluke from "assets/dock/foluke.png";
import empty from "assets/dock/empty.png";
import greenArrow from "assets/dock/green-arrow.svg";
import { set } from "react-hook-form";

const About = () => {
  const [transit, setTransit] = useState(false);
  const scrollref = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(true);
  const [vw, setVw] = useState(window.innerWidth);
  // console.log("scrollref", scrollref);
  var element;
  useEffect(() => {
    element = scrollref.current;
    setTransit(false);
    setScroll(true);
  }, []);

  const handleShift = () => {
    setVw(window.innerWidth);
    if (scroll) {
      if (scrollref.current) {
        scrollref.current.scroll({
          left: +(vw + 200),
          behavior: "smooth",
        });
        console.log("add");
        setScroll(false);
      }
    } else {
      if (scrollref.current) {
        scrollref.current.scroll({
          left: -(vw + 200),
          behavior: "smooth",
        });
        console.log("subtract");
        setScroll(true);
      }
    }
  };

  var prev = (vw - 48) * 0.95;
  var next = (vw - 48) * 3.9;
  var subVw = (vw - 30) * 3.9;
  var sbVw = vw - 38;

  const handleShiftPhoneLeft = () => {
    setVw(window.innerWidth);

    if (scrollref.current && prev) {
      if (scrollref.current.scrollLeft >= prev) {
        scrollref.current.scroll({
          behavior: "smooth",
          left: (subVw -= sbVw),
        });
      } else {
        setTransit(false);
      }
    }
  };
  var addVw = 0;
  const handleShiftPhoneRight = () => {
    setVw(window.innerWidth);

    if (scrollref.current && next) {
      if (scrollref.current.scrollLeft < next) {
        scrollref.current.scroll({
          behavior: "smooth",
          left: (addVw += sbVw),
        });
      } else {
        setTransit(true);
      }
    }
  };
  return (
    <Layout>
      <div className="pt-20 lg:pt-[120px] pb-10 lg:pb-20 about-hero ">
        <div className="max-w-[1200px] mx-auto px-6 ">
          <h1 className="black-text-2 text-[32px] md:text-3xl lg:text-5xl max-w-[770px] leading-[48px] lg:leading-[62px] font-medium sato">
            <span className="green-text-3 sato">Oneport365,</span> Connecting
            Businesses to the World with Seamless Logistics
          </h1>
          <p className="grey-text text-base lg:text-lg font-light leading-[29px] max-w-[662px] mt-[42px] lg:mt-8">
            At Oneport365, we specialize in freight forwarding and logistics
            solutions that are tailored to meet the needs of your business. With
            a focus on reliability, efficiency, and customer service, we are
            committed to providing seamless and cost-effective freight services
            that help streamline your supply chain.
          </p>
        </div>
      </div>
      <div className="pb-20 about-hero ">
        <div className="">
          <img src={aboutContainer} className="w-full hidden md:block" alt="" />
        </div>
        <div className="">
          <img src={smallaboutcontainer} className="w-full md:hidden" alt="" />
        </div>
      </div>
      {/* oneport story section */}
      <div className="bg-[#F9FAFB]">
        <div className="pb-[80px] ">
          {/* header */}
          <div className="max-w-[1200px] pt-[80px] border-t border-[#D9D9D9] mx-auto px-6 ">
            <div className="md:max-w-[770px] ">
              <p className="text-[24px] md:text-[48px] font-medium leading-[33px] md:leading-[62px] black-text-2 sato">
                The <i className="green-text-3 sato">Oneport365</i> Story:{" "}
              </p>
              <p className="text-[24px] md:text-[48px] font-medium leading-[33px] md:leading-[62px] black-text-2 sato">
                Quality Freight Services Built on Trust and Integrity
              </p>
            </div>
          </div>

          {/* actual story section */}
          <div className="relative max-w-[1920px] mt-[80px] lg:border-t border-t-0 border-[#3AB44A] overflow-x-auto overflow-y-hidden margin-left">
            <div className="border-t lg:border-t-0 border-[#3AB44A] lg:mx-0 ">
              <div className="flex overflow-x-auto h-fit scrollbar" ref={scrollref}>
                {/* story comp */}
                <AboutStoryComp
                  year={"2019"}
                  head={"Oneport365 was Founded"}
                  body={
                    "The company was founded in June 2019 but operations started in January 2020, Opened an operational office in Lagos, and partnered with NEXIM"
                  }
                />
                {/* story comp */}
                <AboutStoryComp
                  year={"2020"}
                  head={"MVP Version Launch"}
                  body={
                    "To modernise and simplify the shipping process, we launched the MVP platform and shipped over 500 containers after 4months of inception."
                  }
                />
                {/* story comp */}
                <AboutStoryComp
                  year={"2021"}
                  head={"Oneport365 Platform Launch"}
                  body={
                    "Launched the OnePort 365 platform in April 2021, shipped $15million in value of commodities. Started OnePort 365 Ghana operations in Q4 2021 Since inception, we have shipped over TEUs in excess of 2000 containers"
                  }
                />
                {/* story comp */}
                <AboutStoryComp
                  year={"2022"}
                  head={"Lagos Expansion"}
                  body={
                    "Moved to our new Business hub in Lagos Nigeria, we launched the AGENT 365 program. Onboarding field agents to help grow digital usage of our digital platform."
                  }
                />
                {/* story comp */}
                <AboutStoryComp
                  year={"The Future"}
                  head={"Innovating Freight Services"}
                  body={
                    "Using technology, we aim to simplify trade operations for African businesses through the provision of all-inclusive an transparent freight management solutions."
                  }
                />
              </div>
            </div>
            {/* arrow for large screens */}
            <div
              className={
                transit
                  ? "md:block hidden border-2 border-[#3AB44A] green-arrow-back  rounded-full w-[62px] h-[62px] absolute bottom-[20px] right-[50px] cursor-pointer "
                  : "md:block hidden border-2 border-[#3AB44A] green-arrow-front rounded-full w-[62px] h-[62px] absolute bottom-[20px] right-[50px] cursor-pointer"
              }
              onClick={() => {
                transit ? setTransit(false) : setTransit(true);
                console.log("transit", transit);
                console.log("scroll", transit);
                handleShift();
              }}
            >
              <img
                src={greenArrow}
                className={" mt-[15px] ml-[24px]"}
                alt=""
              ></img>
            </div>
            {/* arrow for smaller screens */}
            <div
              className={
                transit
                  ? "md:hidden block border-2 border-[#3AB44A] green-arrow-back  rounded-full w-[62px] h-[62px] absolute bottom-[20px] right-[50px] cursor-pointer "
                  : "md:hidden block border-2 border-[#3AB44A] green-arrow-front rounded-full w-[62px] h-[62px] absolute bottom-[20px] right-[50px] cursor-pointer"
              }
              onClick={() => {
                // transit ? setTransit(false) : setTransit(true);
                // console.log("transit", transit);
                // console.log("scroll", transit);
                // handleShift();
                transit ? handleShiftPhoneLeft() : handleShiftPhoneRight();
              }}
            >
              <img
                src={greenArrow}
                className={" mt-[15px] ml-[24px]"}
                alt=""
              ></img>
            </div>
          </div>
        </div>
      </div>

      {/* oneport vission and mission */}
      <div className="py-[100px] vission-mission">
        <div className="flex flex-col items-center  md:gap-[48px] md:flex-row max-w-[1200px] mx-auto px-6">
          {/* left */}
          <div className="flex-1">
            <p className="text-[#4B5563] text-[20px] leading-[32px] md:text-[30px] md:leading-[48px] mb-[40px] md:mb-[54px] sato">
              To be the optimally efficient and transparent supply chain system
              for modern businesses and consolidators in Africa and emerging
              markets across the world.
            </p>
            <p className="font-bold text-[24px] md:text-[32px] text-[#007003] sato">
              The Oneport365 Vision
            </p>
          </div>

          {/* right */}
          <div className="md:border-t-0 border-t border-[#D9D9D9] flex-1 mt-[56px] pt-[56px] md:mt-0 md:pt-0">
            <p className="text-[#4B5563] text-[20px] leading-[32px] md:text-[30px] md:leading-[48px] mb-[40px] md:mb-[54px] sato">
              Using the power of technology, we simplify global trade through
              the provision of an all-inclusive and transparent freight
              forwarding service for businesses across Africa.
            </p>
            <p className="font-bold text-[24px] md:text-[32px] text-[#007003] sato">
              The Oneport365 Mission
            </p>
          </div>
        </div>
      </div>

      {/* meet our team */}
      <div className="max-w-[1200px] mx-auto px-6 py-[80px]">
        {/* header */}
        <div className="mb-[40px]">
          <p className="text-[36px] md:text-[48px] font-medium leading-[50px] md:leading-[67px] text-[#111827] max-w-[347px] mb-[24px] sato">
            Meet our Amazing Team{" "}
          </p>
          <p className="text-lg leading-[29px] font-light grey-text max-w-[662px]">
            Our diverse team is committed to providing exceptional shipping
            services. We work together to ensure your goods are delivered safely
            and on time.
          </p>
        </div>

        {/* images */}
        <div className="overflow-x-auto scrollbarOne">
          <div className="border-t border-[#D9D9D9] py-[40px] grid grid-cols-4 gap-[40px] min-w-[1152px]">
            {/* image component */}
            <AboutImageComp
              image={sola}
              name={"Hio Sola Usidame"}
              position={"Founder & CEO"}
            />

            {/* image component */}
            <AboutImageComp
              image={bayo}
              name={"Adewumi Adebayo"}
              position={"Chief Technology Officer"}
            />

            {/* image component */}
            <AboutImageComp
              image={foluke}
              name={"Foluke Shaba"}
              position={"Head of Sales"}
            />

            {/* image component */}
            <AboutImageComp
              image={empty}
              name={"Adaji Okpanachi"}
              position={"Head of Product"}
            />

            {/* image component */}
            <AboutImageComp
              image={empty}
              name={"Iwanntanaye Victor"}
              position={"Senior Backend Engineer"}
            />

            {/* image component */}
            <AboutImageComp
              image={empty}
              name={"Moses Nkechi"}
              position={"Senior Product Manager"}
            />
          </div>
        </div>
      </div>
      <DataCounter />
      <CTA />
    </Layout>
  );
};

export default About;
