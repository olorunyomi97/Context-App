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
import haulageOne from "assets/dock/haulageOne.png";
import haulageTwo from "assets/dock/haulageTwo.svg";
import haulageThree from "assets/dock/haulageThree.svg";

const InlandLogistics = () => {
  return (
    <Layout>
      <div className="services-section pb-20 lg:pb-[226px]">
        <div className="max-w-[1200px] mx-auto  items-center gap-x-[10px] px-6">
          {/* heading */}
          <ServiceHeader
            text="Flexible and multimodal inland transportation services for full
            container load (FCL)."
            subtext="These also include rail haulage to give you the option to haul
            your cargo at your required capacity and barge services via
            waterways for the speed you need."
          />
          <SectionOneServiceComp
            heading={"Start Shipping Across the Oceans"}
            body={"We ensures your cargo sails at favourable rates, on schedule, giving you greater end-to-end control and visibility"}
            image={haulageOne}
          />
          <Partners isDock={false} />

          {/* section 2 qnd 3 */}
          <div>
            <div className="lg:mb-[64px] mb-[48px]">
              {/* main */}
              <p className="lg:text-5xl text-[24px] text-[#1F2937] w-[80%] lg:w-auto mx-auto mb-[16px] lg:mb-[24px] block text-center leading-[34px] lg:leading-[67px] lg:max-w-[630px] sato">
                Why Our{" "}
                <span className="font-medium sato">
                  Inland Logistics solutions
                </span>{" "}
                are superior.
              </p>
              <p className="lg:text-[20px] text-[14px] mx-auto block text-[#4B5563] w-[80%] lg:w-auto text-center leading-[23px] lg:leading-[32px] lg:max-w-[448px] sato">
                Let us handle the details and you can focus on growing your
                business.
              </p>
            </div>

            {/* section 2 */}
            <div className="mb-[40px]  grid md:grid-cols-2 grid-row-2 gap-[40px]">
              <ServicesBoxComp
                image={haulageTwo}
                header={"Fleet of Versatile Vehicles"}
                body={"Our experienced team are here to ensure swift and reliable delivery of your goods to their destination."}
                button={"Get started for free"}
              />
              <ServicesBoxComp
                image={haulageThree}
                header={"Tailored Logistics Solutions"}
                body={"We provide you real time monitoring of your deliveries from pickup to drop-off."}
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

export default InlandLogistics;
