import React from "react";

//components
import Layout from "components/dock/Layout";
import CTA from "components/dock/CTA";
import Partners from "components/dock/Partners";
import DataCounter from "components/dock/DataCounter";
import ServiceHeader from "components/dock/ServiceHeader";
import CustomerSuccess from "components/dock/CustomerSuccess";
import ServicesBoxComp from "components/dock/ServicesBoxComp";
import GreenGradientBoxComp from "components/dock/GreenGradientBoxComp";
import SectionOneServiceComp from "components/dock/SectionOneServiceComp";

// assests
import airOne from "assets/dock/airfreight-one.png";
import airTwo from "assets/dock/airfreight-two.svg";
import airThree from "assets/dock/airfreight-three.svg";

const AirFreight = () => {
  return (
    <Layout>
      <div className="services-section pb-20 lg:pb-[226px]">
        <div className="max-w-[1200px] mx-auto  items-center gap-x-[10px] px-6">
          {/* heading */}
          <ServiceHeader
            text="Our Air Freight Service Offer Is Highly Flexible To Meet Your Specific Requirements."
            subtext="The expert knowledge of carefully selected carriers and operators
            ensures that all aspects of your air freight management are
            covered."
          />
          <SectionOneServiceComp
            heading={"Start Shipping Through the Air"}
            body={"We ensures your cargo sails at favourable rates, on schedule, giving you greater end-to-end control and visibility"}
            image={airOne}
          />
          <Partners isDock={false} />

          {/* section 2 and 3 */}
          <div>
            <div className="lg:mb-[64px] mb-[48px]">
              {/* main */}
              <p className="lg:text-5xl text-[24px] text-[#1F2937] w-[80%] lg:w-auto mx-auto mb-[16px] lg:mb-[24px] block text-center leading-[34px] lg:leading-[67px] lg:max-w-[630px] sato">
                Why Our{" "}
                <span className="font-medium sato">Air freight solutions</span>{" "}
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
                image={airTwo}
                header={"Express Delivery Options"}
                body={"Experience swift airfreight logistics with our dedicated team, ensuring reliable transportation and reduced delivery time."}
                button={"Get started for free"}
              />
              <ServicesBoxComp
                image={airThree}
                header={"Cargo Tracking and Monitoring"}
                body={"Stay informed about the exact location and estimated arrival time of your goods, ensuring a smooth and efficient delivery."}
                button={"Get started for free"}
              />
            </div>

            {/* section 3 */}
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

export default AirFreight;
