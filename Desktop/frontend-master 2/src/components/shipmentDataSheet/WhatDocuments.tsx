import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

//components
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import DataSheetSuccessModal from "components/shipmentDataSheet/DataSheetSuccessModal";
import PageLoading from "components/partials/pageLoading";

//icons
import warning from "assets/icons/warning.svg";

//redux
import { getDataSheetById, completeDatasheet } from "store/actions";

const WhatDocuments = (props: any) => {
  const params = useParams();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const {
    fetching_datasheet,
    completing_datasheet,
    specific_datasheet_section,

    getDataSheetById,
    completeDatasheet,
    previousStep,
  } = props;

  const [openModal, setOpenModal] = useState(false);
  const [attestation, setAttestation] = useState(true);
  const [cci, setCci] = useState(false);
  const [coo, setCoo] = useState(false);
  const [sgd, setSgd] = useState(false);
  const [fumigation, setFumigation] = useState(false);
  const [thc, setThc] = useState(false);
  const [phyto, setPhyto] = useState(false);
  const [others, setOthers] = useState(false);

  const populateData = () => {
    if (specific_datasheet_section.attestation) {
      const { attestation, cci, coo, sgd, fumigation, thc, phyto, others } =
        specific_datasheet_section;

      setAttestation(attestation);
      setCci(cci);
      setCoo(coo);
      setSgd(sgd);
      setFumigation(fumigation);
      setThc(thc);
      setPhyto(phyto);
      setOthers(others);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const datasheet_id =
      specific_datasheet_section?.datasheet_id || urlParams.get("datasheet");
    if (datasheet_id) {
      getDataSheetById(
        {
          rate_id: params.id,
          datasheet_id,
          sheet_section: "required_documents",
        },
        populateData
      );
    }
  }, []);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    window.location.replace(`${window.location.origin}/quotes`);
  };

  const onSubmit = () => {
    const newData = {
      rate_id: params.id,
      sheet_section: "required_documents",
      data: {
        attestation,
        cci,
        coo,
        sgd,
        fumigation,
        thc,
        phyto,
        others,
      },
    };

    completeDatasheet(newData, onOpenModal);
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
              What Documents Would You Require ?
            </h3>
            <p className="grey-text text-xs mt-1">
              Please tick the document needed for your shipment.
            </p>
          </div>

          <div className="mb-24 lg:w-8/12">
            <p className="grey-text text-sm mb-7">
              Please tick the needed services
            </p>

            <div className="mb-7">
              <CustomCheckBox
                name="cci"
                id="cci"
                label="CCI"
                isRequired={false}
                isDisabled={false}
                onChange={(e) => setCci(e)}
                defaultChecked={specific_datasheet_section?.cci}
              />
            </div>
            <div className="mb-7">
              <CustomCheckBox
                name="sgd"
                id="sgd"
                label="SGD"
                isRequired={false}
                isDisabled={false}
                onChange={(e) => setSgd(e)}
                defaultChecked={specific_datasheet_section?.sgd}
              />
            </div>
            <div className="mb-7">
              <CustomCheckBox
                name="coo"
                id="coo"
                label="COO"
                isRequired={false}
                isDisabled={false}
                onChange={(e) => setCoo(e)}
                defaultChecked={specific_datasheet_section?.coo}
              />
            </div>
            <div className="mb-7">
              <CustomCheckBox
                name="fumigation"
                id="fumigation"
                label="Fumigation"
                isRequired={false}
                isDisabled={false}
                onChange={(e) => setFumigation(e)}
                defaultChecked={specific_datasheet_section?.fumigation}
              />
            </div>
            <div className="mb-7">
              <CustomCheckBox
                name="thc"
                id="thc"
                label="THC"
                isRequired={false}
                isDisabled={false}
                onChange={(e) => setThc(e)}
                defaultChecked={specific_datasheet_section?.thc}
              />
            </div>
            <div className="mb-7">
              <CustomCheckBox
                name="phyto"
                id="phyto"
                label="PHYTO"
                isRequired={false}
                isDisabled={false}
                onChange={(e) => setPhyto(e)}
                defaultChecked={specific_datasheet_section?.phyto}
              />
            </div>
            <div className="mb-7">
              <CustomCheckBox
                name="others"
                id="others"
                label="Others (If others, please state)"
                isRequired={false}
                isDisabled={false}
                onChange={(e) => setOthers(e)}
                defaultChecked={specific_datasheet_section?.others}
              />
            </div>

            <div className="my-10">
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
                  isRequired={false}
                  isDisabled={false}
                  onChange={(e) => setAttestation(e)}
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
                  onClick={onSubmit}
                />
              </div>
            </div>
          </div>

          <DataSheetSuccessModal
            modalIsOpen={openModal}
            closeModal={closeModal}
            // status="awaiting verification"
          />
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
})(WhatDocuments);
