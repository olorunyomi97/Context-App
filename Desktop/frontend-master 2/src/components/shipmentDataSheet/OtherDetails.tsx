import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

//components
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import CustomRadio from "components/selectInputs/CustomRadio";
import CustomSelect from "components/selectInputs/CustomSelect";
import CustomDnD from "components/customDnD/CustomDnD";
import PageLoading from "components/partials/pageLoading";

//helpers
import { parseGeoCoding, parseAllPorts } from "helpers/index";

//redux
import { getDataSheetById, completeDatasheet } from "store/actions";

const _Json = require("sea-ports");

const OtherDetails = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [splitBl, setSplitBl] = useState(true);
  const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
  const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState(
    []
  );
  const [shippingDoc, setShippingDoc] = useState("");
  const [shippingDocError, setShippingDocError] = useState(false);
  const [originBl, setOriginBl] = useState("");
  const [originBlError, setOriginBlError] = useState(false);

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
    const parsePorts = parseAllPorts(_Json.JSON);
    setDefaultPortsOfOrigin(parsePorts.origin);
    setDefaultPortsOfDestination(parsePorts.destination);

    const datasheet_id =
      specific_datasheet_section?.datasheet_id || urlParams.get("datasheet");
    if (datasheet_id) {
      getDataSheetById(
        {
          rate_id: params.id,
          datasheet_id,
          sheet_section: "other_details",
        },
        reset
      );
    }
  }, []);

  const onSubmit = (data: any) => {
    if (
      !shippingDoc &&
      !specific_datasheet_section.shipping_document_type_location
    ) {
      setShippingDocError(true);
      return;
    } else {
      setShippingDocError(false);
    }
    if (!originBl && !specific_datasheet_section.origin_bl_location) {
      setOriginBlError(true);
      return;
    } else {
      setOriginBlError(false);
    }

    const formData = new FormData();
    formData.append("shipping_line", data.shipping_line);
    formData.append("split_bl", splitBl.toString());
    formData.append("shipping_document", shippingDoc);
    formData.append("origin_bl", originBl);

    const newData = {
      rate_id: params.id,
      sheet_section: "other_details",
      data: formData,
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
            <h3 className="text-xl font-semibold black-text">Other Details</h3>
            <p className="grey-text text-xs mt-1">
              Choose your preferred shipping details and upload the necessary
              documents below.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-24 lg:w-7/12">
            <div className="">
              <CustomInput
                control={control}
                name={"shipping_line"}
                id={"shipping_line"}
                label={"Shipping Line"}
                placeholder={"Enter Shipping Line"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.shipping_line}
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="mb-3">
              <label className="text-xs font-medium black-text">
                Shipping Document Type SWB / BL
              </label>
              <div className="mt-1">
                <CustomDnD
                  handleChange={setShippingDoc}
                  file={shippingDoc}
                  error={shippingDocError}
                  name={"shipping document"}
                  defaultValue={
                    specific_datasheet_section?.shipping_document_type_original_name
                  }
                />
              </div>
            </div>
            <div className="mb-5">
              <label className="text-xs font-medium black-text">
                Origin B/L or Telex Release?
              </label>
              <div className="mt-1">
                <CustomDnD
                  handleChange={setOriginBl}
                  file={originBl}
                  error={originBlError}
                  name={"origin bl"}
                  defaultValue={
                    specific_datasheet_section?.origin_bl_original_name
                  }
                />
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs black-text font-medium mb-2">
                Are You Open to Split BL?
              </p>
              <div className="grid grid-cols-2">
                <div className="mr-1">
                  <CustomRadio
                    selected={splitBl}
                    label={"Yes, I'm"}
                    onClick={() => setSplitBl(true)}
                  />
                </div>

                <div className="ml-1">
                  <CustomRadio
                    selected={!splitBl}
                    label={"No, I'm fine"}
                    onClick={() => setSplitBl(false)}
                  />
                </div>
              </div>
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
})(OtherDetails);
