import React from "react";
import { useForm } from "react-hook-form";


//icons
import right from "assets/icons/arrow-right.svg";
import close from "assets/icons/close.svg";

//library
import Modal from "react-modal";
import { connect, useSelector } from "react-redux";

//components
import CustomInput from "components/textInputs/CustomInput";
import CustomTextarea from "components/textInputs/CustomTextarea";
import CustomPhoneInput from "components/textInputs/CustomPhoneInput";
import PrimaryButtons from "components/buttons/PrimaryButtons";
import SuccessModal from "components/partials/SuccessModal";

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

const EnquiryModal = (props: any) => {
  const { closeModal, isOpen, loading, error, id, requestCallBack, setShowContactSuccess, setShowContactModal } = props;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  let user = useSelector((state: any) => state.auth.user_data);
  // @ts-ignore
  user = user ? user : JSON.parse(localStorage.getItem("user_data"));

  const onSuccess = () => {
    setShowContactModal(false);
    setShowContactSuccess(true);
}

  const onSubmit = (data: any) => {
    const _data = {
      fullname: user.firstname + " " + user.lastname,
      email: user.email,
      contact_number: user.phone,
      reason_for_callback: "User Enquiry",
      best_time_to_call: data.call_time,
      message_body: data.message,
      shipment_id: id,
    };

    requestCallBack(_data, onSuccess)
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} className={"uploadmodal"}>
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
        <div className="py-4 md:py-8 px-6 flex flex-col gap-y-4 max-h-[calc(100vh_-_300px)] overflow-auto">
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

export default connect(mapStateToProps, { requestCallBack })(EnquiryModal);
