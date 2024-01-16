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

//assets
import ocean from "assets/dock/ocean-service.png";
import oceanFast from "assets/dock/ocean-faster.svg";
import container from "assets/dock/container-fast.svg";

const OceanFreight = () => {
  return (
    <Layout>
      <div className="services-section pb-20 lg:pb-[226px]">
        <div className="max-w-[1200px] mx-auto items-center gap-x-[10px] px-6">
          {/* heading */}
          <ServiceHeader
            text="Ocean Freight Forwarding Service Made Easier. Ship Your Container, Across The Globe"
            subtext="Our team of experts is dedicated to providing personalized, hassle-free freight solutions for businesses of all sizes."
          />
          <SectionOneServiceComp
            heading={"Start Shipping Across the Oceans"}
            body={
              "We ensures your cargo sails at favourable rates, on schedule, giving you greater end-to-end control and visibility"
            }
            image={ocean}
          />
          <Partners isDock={false} />

          {/* section 2 and 3 */}
          <div>
            <div className="lg:mb-[64px] mb-[48px]">
              {/* main */}
              <p className="lg:text-5xl text-[24px] text-[#1F2937] w-[80%] lg:w-auto mx-auto mb-[16px] lg:mb-[24px] block text-center leading-[34px] lg:leading-[67px] lg:max-w-[630px] sato">
                Why Our{" "}
                <span className="font-medium sato">
                  Ocean freight solutions
                </span>{" "}
                are superior.
              </p>
              <p className="lg:text-[20px] text-[14px] mx-auto block text-[#4B5563] w-[80%] lg:w-auto text-center leading-[23px] lg:leading-[32px] lg:max-w-[448px] sato">
                Let us handle the details and you can focus on growing your
                business.
              </p>
            </div>

            {/* section 2 */}
            <div className="mb-[40px] grid md:grid-cols-2 gap-[40px]">
              <ServicesBoxComp
                image={oceanFast}
                header={"Start Shipping Your Goods Faster"}
                body={"Don't let slow shipping hold you back—let's boost your business together. Say Goodbye to delays!"}
                button={"Get started for free"}
              />
              <ServicesBoxComp
                image={container}
                header={"Track All Your Containers"}
                body={"Advanced tracking system monitors containers' location, providing real-time visibility and peace of mind."}
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

export default OceanFreight;
