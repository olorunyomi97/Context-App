import React from "react";
import { useForm } from "react-hook-form";
import { connect, useSelector } from "react-redux";

//icons
import right from "assets/icons/arrow-right.svg";
import close from "assets/icons/close.svg";
import port from "assets/icons/home-port.svg";
import destination from "assets/icons/location-pin.svg";

//library
import Modal from "react-modal";
import moment from "moment";

//components
import CustomInput from "components/textInputs/CustomInput";
import CustomTextarea from "components/textInputs/CustomTextarea";
import CustomPhoneInput from "components/textInputs/CustomPhoneInput";
import PrimaryButtons from "components/buttons/PrimaryButtons";

import { requestCallBack } from "store/actions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    // padding: " 1.5rem",
    // maxHeight: "calc(100vh - 100px)",
    // overflow: "auto",
    // WebkitOverflowScrolling: "touch",
    transform: "translate(-50%, -50%)",
    width: "calc(100vw - 10%)",
    borderRadius: "10px",
    border: "0.01px solid #888",
  },
  overlay: {
    zIndex: "90",
    backgroundColor: "rgba(6, 24, 2, 0.55)",
  },
};

interface ContactProp {
  closeModal: () => void;
  isOpen?: any;
  booking_data?: any;
  requestCallBack?: any;
  loading?: boolean;
  error?: any;
  id?: any;
  setShowSuccessModal?: any;
}

const ContactUsModal = (props: ContactProp) => {
  const {
    closeModal,
    isOpen,
    booking_data,
    requestCallBack,
    loading,
    error,
    id,
    setShowSuccessModal,
  } = props;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  let user = useSelector((state: any) => state.auth.user_data);
  // @ts-ignore
  user = user ? user : JSON.parse(localStorage.getItem("user_data"));

  const showSuccess = () => {
    closeModal();
    setShowSuccessModal(true);
  };

  const onSubmit = (data: any) => {
    const _data = {
      fullname: user.firstname + " " + user.lastname,
      email: user.email,
      contact_number: user.phone,
      reason_for_callback: "No Ocean Freight Rate Found",
      best_time_to_call: data.call_time,
      message_body: data.message,
      shipment_id: id,
    };
    requestCallBack(_data, showSuccess);
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} className={"newratemodal"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center pt-6 px-6 pb-4 border-solid border-b-[1px] border-[#e6e7ec80]">
          <div>
            <p className="text-xl black-text-3 font-semibold">Enquiry</p>
            <p className="text-sm grey-text font-light">
              Please fill in the reqired details.
            </p>
          </div>
          <>
            <img
              className="cursor-pointer"
              onClick={closeModal}
              src={close}
              alt="close"
            />
          </>
        </div>
        <div className="py-4 md:py-8 px-6 flex flex-col gap-y-2 max-h-[calc(100vh_-_300px)] overflow-auto">
          <div className="border-2 border-solid border-[#109B32] rounded-[10px] p-6 mb-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-0 pb-6 bottom-divider-2">
              <div className="flex items-center gap-2">
                <span>
                  <img className="min-w-[32px]" src={port} alt="" />
                </span>
                <div className="">
                  <p className="grey-text font-light text-sm mb-1">
                    Port of Loading
                  </p>
                  <p className="black-text-4 text-sm font-medium">
                    {booking_data?.origin_port}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  <img className="min-w-[32px]" src={destination} alt="" />
                </span>
                <div className="">
                  <p className="grey-text font-light text-sm mb-1">
                    Port of Destination
                  </p>
                  <p className="black-text-4 text-sm font-medium">
                    {booking_data?.destination_port}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 md:gap-y-0 md:grid-cols-3 pt-6">
              <div className="">
                <p className="grey-text font-light text-sm mb-1">
                  Cargo Ready Date
                </p>
                <p className="black-text-4 text-sm font-medium">
                  {moment(booking_data?.cargo_ready_date).format("DD-MM-YYYY")}
                </p>
              </div>
              <div className="">
                <p className="grey-text font-light text-sm mb-1">
                  Container Size
                </p>
                <p className="black-text-4 text-sm font-medium">
                  {booking_data?.container_details
                    ? booking_data?.container_details[0]?.container_size
                    : "N/A"}
                </p>
              </div>
              <div className="">
                <p className="grey-text font-light text-sm mb-1">
                  Container Type
                </p>
                <p className="black-text-4 text-sm font-medium capitalize">
                  {booking_data?.container_details
                    ? booking_data?.container_details[0]?.container_type
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
          {/* <CustomInput
            control={control}
            name={"contact_name"}
            id={"contact_name"}
            label={"Contact Name"}
            placeholder={"Please enter your name"}
            isRequired={true}
            type="text"
            errors={errors}
            isDisabled={false}
            //@ts-ignore
            defaultValue={""}
            min={""}
            max={""}
            icon={""}
          />
          <CustomPhoneInput
            control={control}
            name={"phone_number"}
            id={"phone_number"}
            label={"Phone Number"}
            isRequired={true}
            //@ts-ignore
            defaultValue={""}
            placeholder={"Enter phone number"}
            isDisabled={false}
            errors={errors}
          /> */}
          <CustomInput
            control={control}
            name={"call_time"}
            id={"call_time"}
            label={"Preferred Call Time"}
            placeholder={"When can we contact you"}
            isRequired={true}
            type="text"
            errors={errors}
            isDisabled={false}
            //@ts-ignore
            defaultValue={""}
            min={""}
            max={""}
            icon={""}
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
        </div>
        <div className="p-4 border-solid border-t-[1px] border-[#e6e7ec80] shadow-[0_-3px_32px_-12px_rgba(0,0,0,0.18)]">
          <PrimaryButtons
            title={"Send"}
            style={{ color: "#59725C" }}
            // onClick={closeModal}
            disabled={false}
            loading={loading}
            icon={right}
          />
        </div>
      </form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  const { error, loading } = state.contact;

  return { error, loading };
};

export default connect(mapStateToProps, { requestCallBack })(ContactUsModal);
