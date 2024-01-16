import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

//components
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import CustomRadio from "components/selectInputs/CustomRadio";
import CustomDnD from "components/customDnD/CustomDnD";
import PageLoading from "components/partials/pageLoading";

//redux
import { getDataSheetById, completeDatasheet } from "store/actions";

const AttachDocuments = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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

  const [cac, setCac] = useState("");
  const [cacError, setCacError] = useState(false);

  const [ctin, setCtin] = useState("");
  const [ctinError, setCtinError] = useState(false);

  const [commercialInvoice, setCommercialInvoice] = useState("");
  const [commercialInvoiceError, setCommercialInvoiceError] = useState(false);

  const [approvedNxp, setApprovedNxp] = useState("");
  const [approvedNxpError, setApprovedNxpError] = useState(false);

  const [agenciesCertificate, setAgenciesCertificate] = useState("");
  const [agenciesCertificateError, setAgenciesCertificateError] =
    useState(false);

  const [exportPermit, setExportPermit] = useState("");
  const [exportPermitError, setExportPermitError] = useState(false);

  const [proformaInvoice, setProformaInvoice] = useState("");
  const [proformaInvoiceError, setProformaInvoiceError] = useState(false);

  const [nepcc, setNepcc] = useState("");
  const [nepccError, setNepccError] = useState(false);

  const [parkingList, setParkingList] = useState("");
  const [parkingListError, setParkingListError] = useState(false);

  const [nessReceipt, setNessReceipt] = useState("");
  const [nessReceiptError, setNessReceiptError] = useState(false);

  const [certificateOfAnalysis, setCertificateOfAnalysis] = useState("");
  const [certificateOfAnalysisError, setCertificateOfAnalysisError] =
    useState(false);

  const [testCertificate, setTestCertificate] = useState("");
  const [testCertificateError, setTestCertificateError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const datasheet_id =
      specific_datasheet_section?.datasheet_id || urlParams.get("datasheet");

    if (datasheet_id) {
      getDataSheetById(
        {
          rate_id: params.id,
          datasheet_id,
          sheet_section: "attach_documents",
        },
        null
      );
    }
  }, []);

  const redirect = () => {
    window.location.replace(`${window.location.origin}/invoices`);
  };

  const uploadDoc = (name, doc) => {
    const formData = new FormData();
    formData.append("document_name", name);
    formData.append("document_file", doc);

    const newData = {
      rate_id: params.id,
      sheet_section: "attach_documents",
      data: formData,
    };

    completeDatasheet(newData, null);
  };

  const onSubmit = () => {
    redirect();
  };

  return (
    <>
      {fetching_datasheet || completing_datasheet ? (
        <>
          {" "}
          <PageLoading />{" "}
        </>
      ) : (
        <>
          <div className="mb-10">
            <h3 className="text-xl font-semibold black-text">
              Attach these Documents
            </h3>
            <p className="grey-text text-xs mt-1">
              Upload a soft copy of each shipping document below.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-24 lg:w-7/12">
            <div className="mb-3">
              <label className="text-xs font-medium black-text">CAC</label>
              <div className="mt-1">
                <CustomDnD
                  handleChange={(doc) => uploadDoc("cac", doc)}
                  file={cac}
                  error={cacError}
                  name={"cac"}
                  defaultValue={
                    specific_datasheet_section?.cac_original_document_name
                  }
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="text-xs font-medium black-text">
                CTIN Number and TIN Certificate AC
              </label>
              <div className="mt-1">
                <CustomDnD
                  handleChange={(doc) => uploadDoc("ctin", doc)}
                  file={ctin}
                  error={ctinError}
                  name={"CTIN Number and TIN Certificate AC"}
                  defaultValue={
                    specific_datasheet_section?.ctin_original_document_name
                  }
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="text-xs font-medium black-text">
                Commercial Invoice (include NXP number)
              </label>
              <div className="mt-1">
                <CustomDnD
                  handleChange={(doc) => uploadDoc("commercial_invoice", doc)}
                  file={commercialInvoice}
                  error={commercialInvoiceError}
                  name={"Commercial Invoice"}
                  defaultValue={
                    specific_datasheet_section?.commercial_invoice_original_document_name
                  }
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="text-xs font-medium black-text">
                Approved NXP Form
              </label>
              <div className="mt-1">
                <CustomDnD
                  handleChange={(doc) => uploadDoc("approved_nxp_form", doc)}
                  file={approvedNxp}
                  error={approvedNxpError}
                  name={"Approved NXP Form"}
                  defaultValue={
                    specific_datasheet_section?.approved_nxp_form_original_document_name
                  }
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="text-xs font-medium black-text">
                Agencies Certificates (NAFDAC, SON etc.)
              </label>
              <div className="mt-1">
                <CustomDnD
                  handleChange={(doc) => uploadDoc("agencies", doc)}
                  file={agenciesCertificate}
                  error={agenciesCertificateError}
                  name={"Agencies Certificates"}
                  defaultValue={
                    specific_datasheet_section?.agencies_original_document_name
                  }
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="text-xs font-medium black-text">
                Export permit from Ministry of Mines/Power
              </label>
              <div className="mt-1">
                <CustomDnD
                  handleChange={(doc) => uploadDoc("export_permit", doc)}
                  file={exportPermit}
                  error={exportPermitError}
                  name={"Export permit"}
                  defaultValue={
                    specific_datasheet_section?.export_permit_original_document_name
                  }
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="text-xs font-medium black-text">
                Proforma Invoice
              </label>
              <div className="mt-1">
                <CustomDnD
                  handleChange={(doc) => uploadDoc("proforma", doc)}
                  file={proformaInvoice}
                  error={proformaInvoiceError}
                  name={"NXP Form"}
                  defaultValue={
                    specific_datasheet_section?.proforma_original_document_name
                  }
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="text-xs font-medium black-text">
                Nigerian Export Promotion Council Certificate
              </label>
              <div className="mt-1">
                <CustomDnD
                  handleChange={(doc) => uploadDoc("nepcc", doc)}
                  file={nepcc}
                  error={nepccError}
                  name={"Nigerian Export Promotion Council Certificate"}
                  defaultValue={
                    specific_datasheet_section?.nepcc_original_document_name
                  }
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="text-xs font-medium black-text">
                Packing List (include NXP number)
              </label>
              <div className="mt-1">
                <CustomDnD
                  handleChange={(doc) => uploadDoc("packing_list", doc)}
                  file={parkingList}
                  error={parkingListError}
                  name={"Packing List"}
                  defaultValue={
                    specific_datasheet_section?.packing_list_original_document_name
                  }
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="text-xs font-medium black-text">
                NESS Bank Payment Receipt
              </label>
              <div className="mt-1">
                <CustomDnD
                  handleChange={(doc) => uploadDoc("ness", doc)}
                  file={nessReceipt}
                  error={nessReceiptError}
                  name={"NESS Bank Payment Receipt"}
                  defaultValue={
                    specific_datasheet_section?.ness_original_document_name
                  }
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="text-xs font-medium black-text">
                Certificate of Analysis
              </label>
              <div className="mt-1">
                <CustomDnD
                  handleChange={(doc) =>
                    uploadDoc("certificate_of_analysis", doc)
                  }
                  file={certificateOfAnalysis}
                  error={certificateOfAnalysisError}
                  name={"Certificate of Analysis"}
                  defaultValue={
                    specific_datasheet_section?.certificate_of_analysis_original_document_name
                  }
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="text-xs font-medium black-text">
                Test Certificate (For mineral resources export)
              </label>
              <div className="mt-1">
                <CustomDnD
                  handleChange={(doc) => uploadDoc("test_certificate", doc)}
                  file={testCertificate}
                  error={testCertificateError}
                  name={"Test Certificate"}
                  defaultValue={
                    specific_datasheet_section?.test_certificate_original_document_name
                  }
                />
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
})(AttachDocuments);
