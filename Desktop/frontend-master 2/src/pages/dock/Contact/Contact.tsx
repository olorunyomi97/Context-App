import React, { useState, useRef } from "react";
import { connect, useSelector } from "react-redux";

//libraries
import { useForm } from "react-hook-form";

//icons
import mail from "assets/dock/mail.svg";
import arrowR from "assets/dock/arrow-right-white.svg";

//components
import Layout from "components/dock/Layout";
import CTA from "components/dock/CTA";
import Button from "components/dock/Button";
import CustomInput from "components/textInputs/CustomInput";
import CustomTextarea from "components/textInputs/CustomTextarea";

//icons
import chevronDown from "assets/dock/chevronblack-down.svg";
import arrow from "assets/dock/arrow-right-white.svg";

import { requestCallBack } from "store/actions";

const faqs = [
  {
    id: 1,
    header: "What do you do at OnePort 365?",
    text: `We provide digital freight management services to Africa's cross-border traders. Our web-based application enables you search negotiated real-time rates and comprehensive quotes, book freight services and view all shipment activity on a personalised dashboard. Our clients are also able to track and monitor the progress of their containerised cargo from loading to delivery, from anywhere in the world. We offer ocean freight, inland logistics, pay as you go and off-dock warehousing, customs brokerage, terminal handling services, and marine insurance.`,
  },
  // {
  //   id: 2,
  //   header: "How do I create an account?",
  //   text: `We’re the people saving the world from what might have been. The world will never know what could happen. And even if they did, they wouldn’t care. Because no one cares about the bomb that didn’t go off. Only the one that did.`,
  // },
  // {
  //   id: 3,
  //   header: "What is your pricing?",
  //   text: `Remember this day, men, for it will be yours for all time. Spartans! Lay down your weapons! Persians! Come and get them! Spartans never retreat! Spartans never surrender! Go spread the word.`,
  // },
  // {
  //   id: 4,
  //   header: "Can I negotiate the prices I see on your platform?",
  //   text: `What's happened, happened. Which is an expression of faith in the mechanics of the world. It's not an excuse to do nothing."        `,
  // },
  // {
  //   id: 5,
  //   header: "How do I get a quote on your platform?",
  //   text: `Some people, were born to sit by a river. Some get struck by lightning. Some have an ear for music. Some are artists. Some swim. Some know buttons. Some know Shakespeare. Some are mothers. And some people, dance.`,
  // },
  // {
  //   id: 6,
  //   header: "How can I book a shipment on your platform?",
  //   text: `It's funny how sometimes the people we remember the least make the greatest impression on us."        `,
  // },
  {
    id: 2,
    header: "How can I track my shipment / cargo?",
    text: `A tracking link will be assigned to your shipment once your booking has been confirmed. With this, you are able to track the status of your order from your dashboard.`,
  },
  {
    id: 3,
    header: "What services can I book on your platform?",
    text: `We offer ocean freight, inland haulage, pay-as-you-go warehousing, terminal handling and customs brokerage services. We also manage freight documentation, and provide marine insurance.`,
  },
  {
    id: 4,
    header: "Do you provide insurance coverage?",
    text: `We provide marine insurance. This certifies that your cargo is insured while in transit on the sea and is supported by a copy of an insurance policy. We partner with insurance companies to deliver marine cargo and GIT insurance at cost-effective rates, giving you peace of mind and nothing to worry about in the event of any disruption.`,
  },
  {
    id: 5,
    header: "What industries do you ship for?",
    text: `At OnePort 365, we optimise freight processes for various industries including but not limited to agro-allied and agribusiness, solid minerals, recycling, manufacturing, retail, FMCGs, plastics, building materials, automotives, medical equipment and supplies."        `,
  },
];

const AccordionItem = (props: any) => {
  const contentEl = useRef<HTMLDivElement>(null);
  const { handleToggle, active, faqs } = props;
  const { header, id, text } = faqs;

  return (
    <div>
      <div
        className={`flex justify-between items-start cursor-pointer`}
        onClick={() => handleToggle(id)}
      >
        <div className="flex gap-x-6 lg:gap-x-8">
          <p className="black-text font-medium text-xl lg:text-2xl sato">
            {id}.
          </p>
          <p className="black-text font-medium text-xl lg:text-2xl flex items-center sato">
            {header}
          </p>
        </div>
        <div>
          <img
            className={`min-w-[24px] transition-all ${
              active === id ? "rotate-180" : ""
            }`}
            src={chevronDown}
            alt=""
          />
        </div>
      </div>
      <div
        ref={contentEl}
        className={`mt-3 ml-[43px] lg:ml-[52px] black-text-4 text-lg font-light relative h-0 overflow-hidden transition-[height] ease-in duration-75 sato ${
          active === id ? "h-auto" : ""
        }`}
        style={
          //@ts-ignore
          active === id
            ? { height: contentEl?.current?.scrollHeight }
            : { height: "0px" }
        }
      >
        {text}
      </div>
    </div>
  );
};

const Contact = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { error, loading, requestCallBack } = props;

  const [active, setActive] = useState(null);

  const handleToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  const onSubmit = (data: any) => {
    const _data = {
      fullname: data?.fullname,
      email: data?.email,
      contact_number: "+234landing",
      reason_for_callback: "Landing page enquiry",
      best_time_to_call: "landing",
      message_body: data.message,
    };
    requestCallBack(_data);
  }

  return (
    <Layout>
      <div className="py-20 lg:py-[120px] contact-background">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* flex or grid */}
          <div className="flex flex-col-reverse md:flex-row">
            <div className="md:border-r-[1px] md:border-t-0 md:border-r-[#F3F4F6] border-r-0 border-t border-t-[#D9D9D9] px-0 mt-[32px] md:mt-0 md:w-1/2 md:pr-5 lg:pr-0">
              <p className="hidden md:block md:text-[48px] lg:text-[75px] black-text-2 leading-[98px] font-medium mb-[64px] lora">
                Contact Us
              </p>
              <div className="pl-0 md:pl-[24px] lg:pl-[48px] mt-8 md:mt-0">
                <div className="mb-10">
                  <p className="grey-text font-light text-xl leading-[24px] mb-4">
                    Location
                  </p>
                  <p className="black-text-3 font-light text-xl md:max-w-[404px] leading-[29px]">
                    7th floor, UAC House, 1-5 Odunlami St, Lagos Island 102273,
                    Lagos.
                  </p>
                </div>
                <div className="mb-10">
                  <p className="grey-text font-light text-[20px] mb-4">
                    Email Address
                  </p>
                  <p className="black-text-3 font-light text-[20px] underline">
                    marketing@oneport365.com
                  </p>
                </div>
                <div className="">
                  <p className="grey-text font-light text-[20px] mb-4">
                    Contact Numbers
                  </p>
                  <p className="text-[#374151] font-light text-xl">
                    (+234) 906-688-5913{" "}
                  </p>
                  <p className="text-[#374151] font-light text-xl">
                    (+234) 555-510-1238
                  </p>
                </div>
              </div>
            </div>

            {/* right */}
            <div className="px-0 md:px-[20px] lg:px-[68px] pt-10 md:w-1/2">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* mobile contact */}
                <p className="block md:hidden text-[48px] text-[#111827] leading-[62px] font-medium mb-16 lora">
                  Contact Us
                </p>
                <CustomInput
                  control={control}
                  name={"fullname"}
                  id={"fullname"}
                  label={"Full Name"}
                  placeholder={"Please input your fullname"}
                  isRequired={true}
                  type="text"
                  errors={errors}
                  isDisabled={false}
                  defaultValue={""}
                  min={""}
                  max={""}
                  icon={""}
                  style={{ marginBottom: "28px" }}
                />
                <CustomInput
                  control={control}
                  name={"email"}
                  id={"email"}
                  label={"Email Address"}
                  placeholder={"Please input your email address"}
                  isRequired={true}
                  type="text"
                  errors={errors}
                  isDisabled={false}
                  defaultValue={""}
                  min={""}
                  max={""}
                  icon={""}
                  style={{ marginBottom: "28px" }}
                />
                <CustomTextarea
                  control={control}
                  name={"message"}
                  id={"message"}
                  label={"Message"}
                  placeholder={"What are your concerns?"}
                  isRequired={false}
                  errors={errors}
                  isDisabled={false}
                  defaultValue={""}
                  icon=""
                  style={{ height: "88px" }}
                />

                <Button
                  title="Send"
                  icon={arrowR}
                  iconRight={true}
                  loading={loading}
                  style={{ width: "100%", marginTop: "36px" }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20 lg:pt-[120px] pb-20 lg:pb-[200px]">
        <div className="max-w-[1200px] mx-auto px-6" id="faq">
          <h2 className="text-4xl pb-16 mb-16 font-semibold leading-[43px] bottom-divider sato">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-y-14">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                active={active}
                handleToggle={handleToggle}
                faqs={faq}
              />
            ))}
          </div>
        </div>
      </div>
      <CTA />
    </Layout>
  );
};

const mapStateToProps = (state) => {
  const { error, loading } = state.contact;

  return { error, loading };
};

export default connect(mapStateToProps, { requestCallBack })(Contact);
