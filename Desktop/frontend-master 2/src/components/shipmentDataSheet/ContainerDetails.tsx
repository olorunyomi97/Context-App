import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

//components
import CustomInput from "components/textInputs/CustomInput";
import CustomTextarea from "components/textInputs/CustomTextarea";
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import PageLoading from "components/partials/pageLoading";

//redux
import { getDataSheetById, completeDatasheet } from "store/actions";

const ContainerDetails = (props: any) => {
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
    nextStep,
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
          sheet_section: "container",
        },
        reset
      );
    }
  }, []);

  const onSubmit = (data: any) => {
    data.company_name = "test";
    data.volume_unit = "mt";
    data.quantity = data.quantity.toString();
    data.volume = data.volume.toString();

    const newData = {
      rate_id: params.id,
      sheet_section: "container",
      data,
    };
    completeDatasheet(newData, nextStep);
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
              Container Details
            </h3>
            <p className="grey-text text-xs mt-1">
              Amet morbi risus dui lectus id ultrices justo vel. Ut morbi donec
              est orci facilisi velit cursus quisque amet.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-24 lg:w-7/12">
            <div className="">
              <CustomInput
                control={control}
                name={"hs_code"}
                id={"hs_code"}
                label={"HS-CODE"}
                placeholder={"#1234HS"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.hs_code}
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="">
              <CustomInput
                control={control}
                name={"commodity"}
                id={"commodity"}
                label={"Commodity"}
                placeholder={"Raw materials"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.commodity}
                min={""}
                max={""}
                icon=""
              />
            </div>
            <div className="">
              <CustomTextarea
                control={control}
                name={"goods_description"}
                id={"goods_description"}
                label={"goods description"}
                placeholder={"Enter goods description"}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.goods_description}
                icon=""
              />
            </div>

            <div className="">
              <CustomInput
                control={control}
                name={"packaging_type"}
                id={"packaging_type"}
                label={"Packaging Type"}
                placeholder={"Box"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.packaging_type}
                min={""}
                max={""}
                icon=""
              />
            </div>
            <div className="">
              <CustomInput
                control={control}
                name={"quantity"}
                id={"quantity"}
                label={"Quantity"}
                placeholder={"40"}
                isRequired={true}
                type={"number"}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.quantity}
                min={"1"}
                max={""}
                icon=""
              />
            </div>
            <div className="">
              <CustomInput
                control={control}
                name={"volume"}
                id={"volume"}
                label={"Volume (MT)"}
                placeholder={"50"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.volume}
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="">
              <CustomInput
                control={control}
                name={"nxp_number"}
                id={"nxp_number"}
                label={"NXP Number"}
                placeholder={"123456"}
                isRequired={true}
                type={"number"}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.nxp_number}
                min={""}
                max={""}
                icon=""
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
})(ContainerDetails);
