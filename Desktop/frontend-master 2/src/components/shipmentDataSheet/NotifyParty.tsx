import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

//components
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import CustomPhoneInput from "components/textInputs/CustomPhoneInput";
import PageLoading from "components/partials/pageLoading";

//redux
import { getDataSheetById, completeDatasheet } from "store/actions";

const NotifyParty = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const params = useParams();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const {
    fetching_datasheet,
    completing_datasheet,
    specific_datasheet_section,
    updateDataSheetAside,
    getDataSheetById,
    completeDatasheet,
    previousStep,
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);

    const datasheet_id =
      specific_datasheet_section?.datasheet_id || urlParams.get("datasheet");
    if (datasheet_id) {
      getDataSheetById(
        {
          rate_id: params.id,
          datasheet_id,
          sheet_section: "notify_party",
        },
        reset
      );
    }
  }, []);

  const onSubmit = (data: any) => {
    data.notify_party_address = data.notify_party_address.label
      ? data.notify_party_address.label
      : data.notify_party_address;
    data.notify_party_contact_person_phone = data
      .notify_party_contact_person_phone.phone
      ? data.notify_party_contact_person_phone.phone
      : data.notify_party_contact_person_phone;
    const newData = {
      rate_id: params.id,
      sheet_section: "notify_party",
      data,
    };
    completeDatasheet(newData, updateDataSheetAside);
  };

  return (
    <>
      {fetching_datasheet ? (
        <>
          {" "}
          <PageLoading />{" "}
        </>
      ) : (
        <>
          <div className="mb-10">
            <h3 className="text-xl font-semibold black-text">Notify Party</h3>
            <p className="grey-text text-xs mt-1">
              Fill in the details of the party to be notified when your shipment
              arrives at its destination.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-24 lg:w-7/12">
            <div className="">
              <CustomInput
                control={control}
                name={"notify_party_name"}
                id={"notify_party_name"}
                label={"Name"}
                placeholder={"Enter notify party name"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.notify_party_name}
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="">
              <CustomGoogleInput
                // icon={"ion-ios-pin"}
                icon=""
                control={control}
                name={"notify_party_address"}
                id={"notify_party_address"}
                label={"Address"}
                placeholder={`Enter your address`}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.notify_party_address}
              />
            </div>
            <div className="">
              <CustomInput
                control={control}
                name={"notify_party_postal_code"}
                id={"notify_party_postal_code"}
                label={"Postal Code"}
                placeholder={"Enter postal code"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={
                  specific_datasheet_section?.notify_party_postal_code
                }
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="">
              <CustomInput
                control={control}
                name={"notify_party_contact_person"}
                id={"notify_party_contact_person"}
                label={"Contact Person"}
                placeholder={"Enter full name of contact person"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={
                  specific_datasheet_section?.notify_party_contact_person
                }
                min={""}
                max={""}
                icon=""
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                control={control}
                name={"notify_party_contact_person_email"}
                id={"notify_party_contact_person_email"}
                label={"Email"}
                placeholder={"Enter contact person's email"}
                isRequired={true}
                type={"email"}
                errors={errors}
                isDisabled={false}
                defaultValue={
                  specific_datasheet_section?.notify_party_contact_person_email
                }
                min={"1"}
                max={""}
                icon=""
              />

              <CustomPhoneInput
                control={control}
                name={"notify_party_contact_person_phone"}
                id={"notify_party_contact_person_phone"}
                label={"Contact Number"}
                isRequired={true}
                defaultValue={
                  specific_datasheet_section?.notify_party_contact_person_phone
                }
                placeholder={"Enter contact phone number"}
                isDisabled={false}
                errors={errors}
              />
            </div>

            {/* <div className="">
              <CustomInput
                control={control}
                name={"tax_reference"}
                id={"tax_reference"}
                label={"Tax/VAT reference ID"}
                placeholder={"123456"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                min={""}
                max={""}
                icon=""
              />
            </div> */}
            <div className="grid grid-cols-3 mt-10 items-center">
              <div className="">
                {/* @ts-ignore */}
                <SecondaryButton
                  title="Back"
                  icon="ion-ios-arrow-round-back"
                  onClick={previousStep}
                />

                {/* <p className="text-sm font-semibold">Back</p> */}
              </div>
              <div className="mx-auto"></div>
              <div className="">
                {/* @ts-ignore */}
                <PrimaryButton
                  title="Save & Continue"
                  loading={completing_datasheet}
                />
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  const {
    fetching_datasheet,
    completing_datasheet,
    specific_datasheet_section,
  } = state.shipmentDataSheet;
  return {
    fetching_datasheet,
    completing_datasheet,
    specific_datasheet_section,
  };
};

export default connect(mapStateToProps, {
  getDataSheetById,
  completeDatasheet,
})(NotifyParty);
