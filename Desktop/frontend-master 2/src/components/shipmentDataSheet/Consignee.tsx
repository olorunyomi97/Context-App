import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

//components
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import PageLoading from "components/partials/pageLoading";

//redux
import { getDataSheetById, completeDatasheet } from "store/actions";

const Consignee = (props: any) => {
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
    prevStep,
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
          sheet_section: "consignee",
        },
        reset
      );
    }
  }, []);

  const onSubmit = (data) => {
    const newData = {
      rate_id: params.id,
      sheet_section: "consignee",
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
          <div className="mb-5 mt-3">
            <h3 className="text-xl font-semibold black-text">Consignee</h3>
            <p className="grey-text text-xs mt-1">
              Fill out your consignee details which should include
              specifications of the shipment with other required details stated
              below.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-24 lg:w-7/12">
            <div className="">
              <CustomInput
                control={control}
                name={"container_size"}
                id={"container_size"}
                label={"Container (ft)"}
                placeholder={"40 ft"}
                isRequired={true}
                type={"number"}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.container_size}
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="">
              <CustomInput
                control={control}
                name={"container_count"}
                id={"container_count"}
                label={"Number of container(s)"}
                placeholder={"2"}
                isRequired={true}
                type={"number"}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.container_count}
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="">
              <CustomInput
                control={control}
                name={"postal_code"}
                id={"postal_code"}
                label={"Postal Code"}
                placeholder={"Enter postal code"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.postal_code}
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="">
              <CustomInput
                control={control}
                name={"vgm"}
                id={"vgm"}
                label={"VGM (Container weight + Cargo weight)"}
                placeholder={"Enter VGM"}
                isRequired={true}
                type={"number"}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.vgm}
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
                  onClick={prevStep}
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
})(Consignee);
