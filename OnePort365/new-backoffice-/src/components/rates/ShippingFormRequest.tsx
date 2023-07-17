import { useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

//components
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomPhoneInput from "components/textInputs/CustomPhoneInput";
import CustomTextarea from "components/textInputs/CustomTextarea";

//redux
import { requestShippingForm, clearRateErrors } from "store/actions";

// Modal.defaultStyles.overlay?.backgroundColor = "#000";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "2rem 2.5rem",
    transform: "translate(-50%, -50%)",
    width: "28rem",
    borderRadius: "10px",
    border: "0.01px solid #888",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
};

const ShippingFormRequest = (props: any): JSX.Element => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {
    modalIsOpen,
    closeModal,
    nextStep,
    rateId,
    requestShippingForm,
    clearRateErrors,
    shipmentType,
    loading,
    error,
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
    clearRateErrors();
  }, []);

  const onSubmit = (data: any) => {
    data.customer_phone = data.customer_phone.phone;

    const newData = {
      id: rateId,
      data,
    };

    requestShippingForm(newData, nextStep, shipmentType);
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        //   onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="NXP Request"
      >
        <div className="mb-10 flex flex-col">
          <div
            className="bg-grey rounded-full py-0 px-2.5 self-end cursor-pointer"
            onClick={closeModal}
          >
            <i className="ion-ios-close text-lg"></i>
          </div>
          <p className="text-center black-text text-3xl my-4 font-semibold">
            Get your NXP form
          </p>
          <p className="text-center grey-text text-xs">
            To proceed with your booking, get your NXP form from us with for a
            fee:
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="grid grid-cols-2">
              <div className="mr-1">
                <CustomInput
                  control={control}
                  name={"customer_firstname"}
                  id={"customer_firstname"}
                  label={"First name"}
                  placeholder={"Enter your first name"}
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

              <div className="ml-1">
                <CustomInput
                  control={control}
                  name={"customer_lastname"}
                  id={"customer_lastname"}
                  label={"Last name"}
                  placeholder={"Enter your last name"}
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
            </div>
            <div className="">
              <CustomInput
                control={control}
                name={"customer_email"}
                id={"customer_email"}
                label={"Email Address"}
                placeholder={"Enter your email"}
                isRequired={true}
                type={"email"}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                min={""}
                max={""}
                icon=""
              />
            </div>
            <div className="">
              <CustomPhoneInput
                control={control}
                name={"customer_phone"}
                id={"customer_phone"}
                label={"Phone number"}
                isRequired={true}
                defaultValue={""}
                placeholder={"Enter your phone number"}
                isDisabled={false}
                errors={errors}
              />
            </div>
            <div className="">
              <CustomTextarea
                control={control}
                name={"additional_message"}
                id={"additional_message"}
                label={"Message"}
                placeholder={" "}
                isRequired={false}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                icon=""
              />
            </div>

            <div className="mt-5">
              <div className="grid grid-cols-3">
                {/* @ts-ignore */}
                <PrimaryButton title="Submit" loading={loading} />

                <div className=""></div>
                <div className=""></div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading } = state.rate;

  return { error, loading };
};

export default connect(mapStateToProps, {
  requestShippingForm,
  clearRateErrors,
})(ShippingFormRequest);
