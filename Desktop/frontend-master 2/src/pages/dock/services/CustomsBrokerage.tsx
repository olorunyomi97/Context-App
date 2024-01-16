import React from "react";

//components
import Layout from "components/dock/Layout";
import CTA from "components/dock/CTA";
import Partners from "components/dock/Partners";
import DataCounter from "components/dock/DataCounter";
import ServiceHeader from "components/dock/ServiceHeader";
import CustomerSuccess from "components/dock/CustomerSuccess";
import SectionOneServiceComp from "components/dock/SectionOneServiceComp";
import ServicesBoxComp from "components/dock/ServicesBoxComp";
import GreenGradientBoxComp from "components/dock/GreenGradientBoxComp";

// assests
import brokerageOne from "assets/dock/brokerageOne.svg";
import brokerageTwo from "assets/dock/brokerageTwo.svg";
import customsBrokerage from "assets/dock/images/customsBrokerage.png"


const CustomsBrokerage = () => {
  return (
    <Layout>
      <div className="services-section pb-20 lg:pb-[226px]">
        <div className="max-w-[1200px] mx-auto items-center gap-x-[10px] px-6">
          {/* heading */}
          <ServiceHeader
            text="Custom Brokerage Excellence: Navigating Trade Regulations with Ease"
            subtext="Efficiently manage customs compliance and avoid delays, so your goods reach their destination without a hitch"
          />
          <SectionOneServiceComp
            heading={"Start Shipping Through the Air"}
            body={"We ensures your cargo sails at favourable rates, on schedule, giving you greater end-to-end control and visibility"}
            image={customsBrokerage}
          />
          <Partners isDock={false} />
          <div>
            <div className="lg:mb-[64px] mb-[48px]">
              {/* main */}
              <p className="lg:text-5xl text-[24px] text-[#1F2937] w-[80%] lg:w-auto mx-auto mb-[16px] lg:mb-[24px] block text-center leading-[34px] lg:leading-[67px] lg:max-w-[630px] sato">
                Why Our{" "}
                <span className="font-medium sato">
                  Customs Brokerage solutions
                </span>{" "}
                are superior.
              </p>
              <p className="lg:text-[20px] text-[14px] mx-auto block text-[#4B5563] w-[80%] lg:w-auto text-center leading-[23px] lg:leading-[32px] lg:max-w-[448px] sato">
                Let us handle the details and you can focus on growing your
                business.
              </p>
            </div>

            {/* section 2 */}
            <div className="mb-[40px] grid md:grid-cols-2 grid-row-2 gap-[40px]">
              <ServicesBoxComp
                image={brokerageOne}
                header={"Smooth Customs Documentation"}
                body={"Efficiently prepared and verified paperwork for fast customs clearance, ensuring compliance with all regulations."}
                button={"Get started for free"}
              />
              <ServicesBoxComp
                image={brokerageTwo}
                header={"Duty and Tax Optimization"}
                body={"Expert guidance on tariffs and customs valuation, minimizing costs while maintaining full compliance."}
                button={"Get started for free"}
              />
            </div>

            <GreenGradientBoxComp />
          </div>
        </div>
      </div>
      <DataCounter />
      <CustomerSuccess />
      <CTA />
    </Layout>
  );
};

export default CustomsBrokerage;
