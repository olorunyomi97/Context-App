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

const TradePartners = (props: any) => {
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
      const data = {
        rate_id: params.id,
        datasheet_id,
        sheet_section: "trade_partners",
      };
      getDataSheetById(data, reset);
    }
  }, []);

  const onSubmit = (data: any) => {
    data.trade_partner_address = data.trade_partner_address.label
      ? data.trade_partner_address.label
      : data.trade_partner_address;
    data.trade_partner_contact_person_phone = data
      .trade_partner_contact_person_phone.phone
      ? data.trade_partner_contact_person_phone.phone
      : data.trade_partner_contact_person_phone;

    const newData = {
      rate_id: params.id,
      sheet_section: "trade_partners",
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
            <h3 className="text-xl font-semibold black-text">
              Trade Partners (Shippers)
            </h3>
            <p className="grey-text text-xs mt-1">
              Please fill out your trade partner's details.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-24 lg:w-7/12">
            <div className="">
              <CustomInput
                control={control}
                name={"trade_partner_name"}
                id={"trade_partner_name"}
                label={"Name"}
                placeholder={"Enter trade partner's name"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.trade_partner_name}
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
                name={"trade_partner_address"}
                id={"trade_partner_address"}
                label={"Address 1"}
                placeholder={`Enter trade partner's address`}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.trade_partner_address}
              />
            </div>
            <div className="">
              <CustomInput
                control={control}
                name={"trade_partner_postal_code"}
                id={"trade_partner_postal_code"}
                label={"Postal Code"}
                placeholder={"Enter trade partner's postal code"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={
                  specific_datasheet_section?.trade_partner_postal_code
                }
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="">
              <CustomInput
                control={control}
                name={"trade_partner_contact_person"}
                id={"trade_partner_contact_person"}
                label={"Contact Person"}
                placeholder={"Enter full name of contact person"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={
                  specific_datasheet_section?.trade_partner_contact_person
                }
                min={""}
                max={""}
                icon=""
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                control={control}
                name={"trade_partner_contact_person_email"}
                id={"trade_partner_contact_person_email"}
                label={"Email"}
                placeholder={"Enter contact person's email"}
                isRequired={true}
                type={"email"}
                errors={errors}
                isDisabled={false}
                defaultValue={
                  specific_datasheet_section?.trade_partner_contact_person_email
                }
                min={"1"}
                max={""}
                icon=""
              />

              <CustomPhoneInput
                control={control}
                name={"trade_partner_contact_person_phone"}
                id={"trade_partner_contact_person_phone"}
                label={"Contact Number"}
                isRequired={true}
                defaultValue={
                  specific_datasheet_section?.trade_partner_contact_person_phone
                }
                placeholder={"Enter contact phone number"}
                isDisabled={false}
                errors={errors}
              />
            </div>

            <div className="grid grid-cols-3 mt-10 items-center">
              <div className="">
                {/* @ts-ignore */}
                <SecondaryButton
                  title="Back"
                  icon="ion-ios-arrow-round-back"
                  onClick={previousStep}
                />
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
    error,
  } = state.shipmentDataSheet;
  return {
    fetching_datasheet,
    completing_datasheet,
    specific_datasheet_section,
    error,
  };
};

export default connect(mapStateToProps, {
  getDataSheetById,
  completeDatasheet,
})(TradePartners);
