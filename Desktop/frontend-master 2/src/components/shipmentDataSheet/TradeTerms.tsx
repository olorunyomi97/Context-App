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

const TradeTerms = (props: any) => {
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
      specific_datasheet_section?.datasheet_id || urlParams.get("datasheet_id");
    if (datasheet_id) {
      getDataSheetById(
        {
          rate_id: params.id,
          datasheet_id,
          sheet_section: "trade_terms",
        },
        reset
      );
    }
  }, []);

  const onSubmit = (data: any) => {
    const newData = {
      rate_id: params.id,
      sheet_section: "trade_terms",
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
            <h3 className="text-xl font-semibold black-text">Trade Terms</h3>
            <p className="grey-text text-xs mt-1">
              Please specify the required trade agreements (Incoterms) for your
              shipment.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-24 lg:w-7/12">
            <div className="">
              <CustomInput
                control={control}
                name={"incoterms"}
                id={"incoterms"}
                label={"Incoterms"}
                placeholder={"Brooklyn Simmons"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.incoterms}
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
})(TradeTerms);
