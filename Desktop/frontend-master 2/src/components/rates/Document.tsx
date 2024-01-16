import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

//components
import CustomDnD from "components/customDnD/CustomDnD";
import CustomSwitch from "components/customSwitch/CustomSwitch";
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
// @ts-ignore
import ShippingFormRequest from "components/rates/ShippingFormRequest";

//redux
import { getRateById } from "store/actions";
import { uploadRatesDocs } from "store/actions";
import PageLoading from "components/partials/pageLoading";

const Document = (props: any) => {
  const [hasNXP, setHasNXP] = useState(true);
  const [NXPdoc, setNXPdoc] = useState("");
  const [hasPFI, setHasPFI] = useState(true);
  const [PFIdoc, setPFIdoc] = useState("");

  const [hasFormM, setHasFormM] = useState(true);
  const [formMdoc, setFormMdoc] = useState("");

  const {
    previousStep,
    nextStep,
    shipmentType,
    loading,
    uploadRatesDocs,
    rate_data,
    showStep,
    getting_rates,
    getRateById,
    rates_documents,
  } = props;

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const id = urlParams.get("id");

  useEffect(() => {
    if (id || rate_data?._id) {
      getRateById(id || rate_data._id);
    }
  }, []);

  const [NXPerror, setNXPerror] = useState(false);
  const [PFIerror, setPFIerror] = useState(false);
  const [FormMerror, setFormMerror] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const onToggleNXPSwitch = () => {
    if (hasNXP) {
      setModalOpen(true);
    }
    setHasNXP(!hasNXP);
  };

  const onTogglePFISwitch = () => {
    if (hasPFI) {
      setModalOpen(true);
    }
    setHasPFI(!hasPFI);
  };

  const onToggleFormMSwitch = () => {
    if (hasFormM) {
      setModalOpen(true);
    }
    setHasFormM(!hasFormM);
  };

  const closeModal = () => {
    setModalOpen(false);
    setHasNXP(true);
    setHasPFI(true);
  };

  //validation
  const onSubmitExport = () => {
    if (hasNXP && !NXPdoc && !rates_documents[0]) {
      setNXPerror(true);
    } else {
      setNXPerror(false);
    }
    if (hasPFI && !PFIdoc && !rates_documents[1]) {
      setPFIerror(true);
    } else {
      setPFIerror(false);
    }

    if (
      (hasNXP && NXPdoc && hasPFI && PFIdoc) ||
      rates_documents.length === 2
    ) {
      const formData = new FormData();
      formData.append("nxp_document", NXPdoc);
      formData.append("proforma_document", PFIdoc);

      const data = {
        id: urlParams.get("id") || rate_data?._id,
        data: formData,
      };

      uploadRatesDocs(data, nextStep, "export");
    }
  };

  const onSubmitImport = () => {
    if (hasFormM && !formMdoc && !rates_documents[0]) {
      setFormMerror(true);
    } else {
      setFormMerror(false);
    }

    if ((hasFormM && formMdoc) || rates_documents.length === 1) {
      const formData = new FormData();
      formData.append("form_m", formMdoc);

      const data = {
        id: urlParams.get("id") || rate_data?._id,
        data: formData,
      };

      uploadRatesDocs(data, nextStep, "import");
    }
  };

  return (
    <>
      {getting_rates ? (
        // @to-od complete the page loading
        <>
          {" "}
          <PageLoading title={"documents"} />
        </>
      ) : (
        <>
          {" "}
          <div className="mb-24">
            {shipmentType === "export" ? (
              <div className="booking-docs">
                <div className="">
                  <p className="text-sm black-text font-medium">
                    Upload your NXP Form
                  </p>
                  <div className="my-2">
                    <CustomDnD
                      handleChange={setNXPdoc}
                      file={NXPdoc}
                      error={NXPerror}
                      name={"NXP Form"}
                      defaultValue={
                        rates_documents.length
                          ? rates_documents[0].original_file_name
                          : ""
                      }
                    />
                  </div>
                  <div className="flex items-center">
                    <CustomSwitch
                      checked={!hasNXP}
                      onChange={onToggleNXPSwitch}
                    />

                    <p className="text-sm black-text ml-2">
                      I do not have my{" "}
                      <span className="font-semibold">NXP Form</span>
                    </p>
                  </div>
                </div>
                <hr className="dashed-hr mt-10 mb-5" />
                <div className="">
                  <p className="text-sm black-text font-medium">
                    Upload your PFI Form
                  </p>
                  <div className="my-2">
                    <CustomDnD
                      handleChange={setPFIdoc}
                      file={PFIdoc}
                      error={PFIerror}
                      name={"PFI Form"}
                      defaultValue={
                        rates_documents.length
                          ? rates_documents[1].original_file_name
                          : ""
                      } //for images that has been uploaded already
                    />
                  </div>
                  <div className="flex items-center">
                    <CustomSwitch
                      checked={!hasPFI}
                      onChange={onTogglePFISwitch}
                    />

                    <p className="text-sm black-text ml-2">
                      I do not have my{" "}
                      <span className="font-semibold">PFI Form</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 mt-10 items-center ">
                  <div className="">
                    {/* @ts-ignore */}
                    <SecondaryButton
                      title="Previous Step"
                      icon="ion-ios-arrow-round-back"
                      onClick={previousStep}
                    />
                  </div>
                  <div className=" mx-auto">
                    {showStep ? (
                      <p className="black-text font-medium text-base">
                        Step 2 of 4
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="">
                    {/* @ts-ignore */}
                    <PrimaryButton
                      title="Continue"
                      loading={loading}
                      disabled={loading}
                      onClick={onSubmitExport}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="booking-docs">
                  <div className="">
                    <p className="text-sm black-text font-medium">
                      Upload your Form M
                    </p>
                    <div className="my-2">
                      <CustomDnD
                        handleChange={setFormMdoc}
                        file={formMdoc}
                        error={FormMerror}
                        name={"Form M"}
                        defaultValue={
                          rates_documents.length
                            ? rates_documents[0].original_file_name
                            : ""
                        }
                      />
                    </div>
                    <div className="flex items-center">
                      <CustomSwitch
                        checked={!hasFormM}
                        onChange={onToggleFormMSwitch}
                      />

                      <p className="text-sm black-text ml-2">
                        I do not have my{" "}
                        <span className="font-semibold">Form M</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 mt-10 items-center ">
                    <div className="">
                      {/* @ts-ignore */}
                      <SecondaryButton
                        title="Previous Step"
                        icon="ion-ios-arrow-round-back"
                        onClick={previousStep}
                      />
                    </div>
                    <div className=" mx-auto">
                      {showStep ? (
                        <p className="black-text font-medium text-base">
                          Step 2 of 4
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="">
                      {/* @ts-ignore */}
                      <PrimaryButton
                        title="Continue"
                        loading={loading}
                        disabled={loading}
                        onClick={onSubmitImport}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <ShippingFormRequest
            modalIsOpen={modalOpen}
            closeModal={closeModal}
            rateId={urlParams.get("id") || rate_data?._id}
            nextStep={nextStep}
            shipmentType={shipmentType}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { loading, rate_data, getting_rates, rates_documents } = state.rate;
  return { loading, rate_data, getting_rates, rates_documents };
};
export default connect(mapStateToProps, { uploadRatesDocs, getRateById })(
  Document
);
