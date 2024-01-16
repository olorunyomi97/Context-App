import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

//components
import CustomInput from "components/textInputs/CustomInput";
import CustomTextarea from "components/textInputs/CustomTextarea";
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import CustomPhoneInput from "components/textInputs/CustomPhoneInput";
import PageLoading from "components/partials/pageLoading";

//redux
import { getDataSheetById, completeDatasheet } from "store/actions";

const PointOfStuffing = (props: any) => {
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
          sheet_section: "point_of_stuffing",
        },
        reset
      );
    }
  }, []);

  const onSubmit = (data: any) => {
    data.address_for_stuffing = data.address_for_stuffing.label
      ? data.address_for_stuffing.label
      : data.address_for_stuffing;
    data.point_of_stuffing_contact_person_phone = data
      .point_of_stuffing_contact_person_phone.phone
      ? data.point_of_stuffing_contact_person_phone.phone
      : data.point_of_stuffing_contact_person_phone;

    const newData = {
      rate_id: params.id,
      sheet_section: "point_of_stuffing",
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
              Point Of Stuffing
            </h3>
            <p className="grey-text text-xs mt-1">
              Choose your preferred location, scheduled date and specify the
              contact who will be available for stuffing.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-24 lg:w-7/12">
            <div className="">
              <CustomInput
                control={control}
                name={"scheduled_date"}
                id={"scheduled_date"}
                label={"Scheduled Date for Container Stuffing"}
                placeholder={"DD/MM/YY"}
                isRequired={true}
                type={"date"}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.scheduled_date}
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
                name={"address_for_stuffing"}
                id={"address_for_stuffing"}
                label={"Exact Address for Container Stuffing"}
                placeholder={`Enter address`}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.address_for_stuffing}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                control={control}
                name={"point_of_stuffing_contact_person"}
                id={"point_of_stuffing_contact_person"}
                label={"Contact Person"}
                placeholder={"Enter full name of contact person"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={
                  specific_datasheet_section?.point_of_stuffing_contact_person
                }
                min={""}
                max={""}
                icon=""
              />

              <CustomPhoneInput
                control={control}
                name={"point_of_stuffing_contact_person_phone"}
                id={"point_of_stuffing_contact_person_phone"}
                label={"Contact Number"}
                isRequired={true}
                defaultValue={
                  specific_datasheet_section?.point_of_stuffing_contact_person_phone
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
})(PointOfStuffing);
