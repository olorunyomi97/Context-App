import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

//components
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import PageLoading from "components/partials/pageLoading";

//icons
import warning from "assets/icons/warning.svg";

//redux
import { getDataSheetById, completeDatasheet } from "store/actions";

const Products = (props: any) => {
  const {
    fetching_datasheet,
    completing_datasheet,
    specific_datasheet_section,
    updateDataSheetAside,
    getDataSheetById,
    completeDatasheet,
    previousStep,
  } = props;

  const params = useParams();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const [shipping, setShipping] = useState(false);
  const [inlandTrucking, setInlandTrucking] = useState(false);
  const [inlandBarge, setInlandBarge] = useState(false);
  const [customs, setCustoms] = useState(false);
  const [terminal, setTerminal] = useState(false);
  const [marine, setMarine] = useState(false);
  const [warehousing, setWarehousing] = useState(false);
  const [attestation, setAttestation] = useState(true);

  const populateData = () => {
    if (specific_datasheet_section.shipping) {
      const {
        shipping,
        inland_trucking,
        inland_barge,
        customs,
        terminal,
        marine,
        warehousing,
        // attestation,
      } = specific_datasheet_section;
      setShipping(shipping);
      setInlandTrucking(inland_trucking);
      setInlandBarge(inland_barge);
      setCustoms(customs);
      setTerminal(terminal);
      setMarine(marine);
      setWarehousing(warehousing);
      // setAttestation(attestation);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const datasheet_id =
      specific_datasheet_section?.datasheet_id || urlParams.get("datasheet_id");
    if (datasheet_id) {
      getDataSheetById(
        {
          rate_id: params.id,
          datasheet_id,
          sheet_section: "product_we_offer",
        },
        populateData
      );
    }
  }, []);

  const onSubmit = () => {
    const newData = {
      rate_id: params.id,
      sheet_section: "product_we_offer",
      data: {
        shipping,
        inland_trucking: inlandTrucking,
        inland_barge: inlandBarge,
        customs,
        terminal,
        marine,
        warehousing,
        attestation,
      },
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
              Products We Offer
            </h3>
            <p className="grey-text text-xs mt-1">
              Our range of services are equipped to cater for your shipment
              needs Please tick the needed Services.
            </p>
          </div>

          <div className="mb-24 lg:w-8/12">
            <p className="grey-text text-sm mb-7">
              Please tick the needed services
            </p>

            <div className="mb-7">
              <CustomCheckBox
                name="shipping"
                id="shipping"
                label="Shipping"
                isRequired={false}
                isDisabled={false}
                onChange={(e: boolean) => setShipping(e)}
                defaultChecked={specific_datasheet_section?.shipping}
              />
            </div>
            <div className="mb-7">
              <CustomCheckBox
                name="inland_trucking"
                id="inland_trucking"
                label="Inland Haulage (Trucking alone)"
                isRequired={false}
                isDisabled={false}
                onChange={(e: boolean) => setInlandTrucking(e)}
                defaultChecked={specific_datasheet_section?.inland_trucking}
              />
            </div>
            <div className="mb-7">
              <CustomCheckBox
                name="inland_barge"
                id="inland_barge"
                label="Inland Haulage (Trucking + Barge option)"
                isRequired={false}
                isDisabled={false}
                onChange={(e: boolean) => setInlandBarge(e)}
                defaultChecked={specific_datasheet_section?.inland_barge}
              />
            </div>
            <div className="mb-7">
              <CustomCheckBox
                name="customs_clearance"
                id="customs_clearance"
                label="Customs Clearance"
                isRequired={false}
                isDisabled={false}
                onChange={(e: boolean) => setCustoms(e)}
                defaultChecked={specific_datasheet_section?.customs}
              />
            </div>
            <div className="mb-7">
              <CustomCheckBox
                name="thc"
                id="thc"
                label="THC"
                isRequired={false}
                isDisabled={false}
                onChange={(e: boolean) => setTerminal(e)}
                defaultChecked={specific_datasheet_section?.terminal}
              />
            </div>
            <div className="mb-7">
              <CustomCheckBox
                name="marine_insurance"
                id="marine_insurance"
                label="Marine Insurance"
                isRequired={false}
                isDisabled={false}
                onChange={(e: boolean) => setMarine(e)}
                defaultChecked={specific_datasheet_section?.marine}
              />
            </div>
            <div className="mb-7">
              <CustomCheckBox
                name="warehousing"
                id="warehousing"
                label="Warehousing"
                isRequired={false}
                isDisabled={false}
                onChange={(e: boolean) => setWarehousing(e)}
                defaultChecked={specific_datasheet_section?.warehousing}
              />
            </div>

            {/* <div className="my-10">
              <h5 className="black-text text-lg font-semibold mb-7">
                Important Notice
              </h5>

              <div className="flex items-start mb-6">
                <img src={warning} className="mt-1" alt="" width={65} />
                <p className="black-text text-sm ml-3">
                  This should state all your specific requirements as regards
                  this shipment. Kindly ensure that this is your final
                  instruction in respect of this shipment. However, if you
                  require any amendment after the BL Verified copy has been
                  processed, it would attract an amendment cost of{" "}
                  <span className="font-semibold">$50.00</span> for each change
                  required.
                </p>
              </div>

              <div className="mb-7">
                <CustomCheckBox
                  name="attestation"
                  id="attestation"
                  label="Attestation"
                  isRequired={true}
                  isDisabled={false}
                  onChange={(e: boolean) => setAttestation(e)}
                  defaultChecked={
                    specific_datasheet_section?.attestation || attestation
                  }
                />
              </div>

              <div className="">
                <p className="black-text text-sm">
                  To finalize submission of this document, download this form
                  and print it physically. Sign and stamp the form then scan and
                  upload to us for verification approval
                </p>
              </div>
            </div> */}

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
                  onClick={onSubmit}
                />
              </div>
            </div>
          </div>
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
})(Products);
