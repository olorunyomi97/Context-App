import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

//components
import CustomPhoneInput from "../../components/textInputs/CustomPhoneInput";
import CustomTextarea from "components/textInputs/CustomTextarea";
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";

//icon
import CargoIcon from "assets/icons/cargo.svg";
import AircraftIcon from "assets/icons/aircraft.svg";

const EmptyResult = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { title } = props;

  const { loading } = props;

  const onSubmit = (data: any) => {};

  return (
    <>
      <div className="mx-14">
        <div className="flex w-full">
          <div className="mx-auto">
            <img
              className="mt-5"
              src={title === "Import" ? CargoIcon : AircraftIcon}
              alt=""
              // height="50"
              width="300"
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-5 rounded w-full mb-5"
        >
          <div className="flex ">
            <div className="mx-auto text-center">
              <p className="mb-2 text-base black-text f">Book your {title}</p>
              <p className="text-xs grey-text">
                Chat with our trade experts via whatsapp to begin your{" "}
                {title.toLowerCase()} shipment.
              </p>
            </div>
          </div>
          <div className="mx-auto text-center my-5">
            <a
              className=" bg-green white-text font-semibold text-xs px-5 py-2 rounded"
              href="https://marketing.oneport365.com/e3t/Ctc/OR+113/d2nMYx04/VW1tlJ1RqxbgN8-BGfj5V85xW1vWpFD4LpnFyN7swVvS3lLB3V1-WJV7Cg-6bW8TwqHl7PWVXwW8qXjmw3qcYL5N6zQDPX_pqMDW55lz-Q3PbrHfW2c3dHS6zn2ZXW8nqg3p36x2hSN7qmxkYn8d9kW4CXTjf4fVWhDW34SdCs6WRrZHW8TY1NR2yJjhhW92Cv-S4tD4dpW6Sd8CR1T8MFMW3sshHw8MRrnwW9dSP061MgwqlW8VWg8-2Qp3-7W2DTCKS1-gdZkW49bjG24V1Bt0W1BZS0p387M16N5lS-NSf0_37W4sRBLV2glGbS3crj1"
              target="_blank"
              rel="noreferrer"
            >
              Contact our experts via Whatsapp
            </a>
          </div>
          <div>
            {/* <div className="grid grid-cols-2 gap-4">
              <div className="">
                <CustomInput
                  control={control}
                  name={"firstname"}
                  id={"firstname"}
                  label={"Full name"}
                  placeholder={"Enter your Full name"}
                  isRequired={true}
                  type={"text"}
                  errors={errors}
                  isDisabled={false}
                  defaultValue={""}
                  min={""}
                  max={""}
                  icon={""}
                />
              </div>
              <div className="">
                <CustomPhoneInput
                  control={control}
                  name={"phone"}
                  id={"phone"}
                  label={"Phone number"}
                  isRequired={true}
                  defaultValue={""}
                  placeholder={"Enter your phone number"}
                  isDisabled={false}
                  errors={errors}
                />
              </div>
            </div>
            <div className="mr-1">
              <CustomInput
                control={control}
                name={"firstname"}
                id={"firstname"}
                label={"Commodities"}
                placeholder={"Enter Commodity here"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                min={""}
                max={""}
                icon={""}
              />
            </div>
            <div className="mt-5">
              <CustomTextarea
                control={control}
                name={"cargo_description"}
                id={"cargo_description"}
                label={"Comments(Optional)"}
                placeholder={"Is there anything we should know?"}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                icon=""
              />
            </div> */}
            {/* <p className="text-xs green-text" style={{ textAlign: "left" }}>
              <i
                className="fa-light fa-circle-plus"
                style={{ color: "#3ab44a" }}
              ></i>
              We Couldn't Find any Quotes for this route.
            </p> */}
          </div>
          <div className="mt-5 py-2">
            {/* @ts-ignore */}
            {/* <PrimaryButton title="Request A Custom Quote" loading={loading} /> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default EmptyResult;
