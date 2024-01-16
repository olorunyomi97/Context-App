import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

//icons
import close from "assets/icons/close.svg";
import threeDots from "assets/icons/three-dots.svg";
import disclaimer from "assets/icons/disclaimer-orange.svg";
import arrowLeft from "assets/icons/arrow-left2.svg";

import greenEye from "assets/icons/green-eye.svg";
import swap from "assets/icons/swap.svg";
import deleted from "assets/icons/small-delete.svg";

//library
import Modal from "react-modal";
import { useForm } from "react-hook-form";

//components
import CustomSelect from "components/selectInputs/CustomSelect";
import ShipmentUploadInput from "./ShipmentUploadInput";
import LoadingSpinner from "components/partials/LoadingSpinner";

//redux actions
import { uploadShipmentDoc, deleteShipmentDoc } from "store/actions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    // padding: " 1.5rem",
    // maxHeight: "calc(100vh - 100px)",
    // overflow: "auto",
    // WebkitOverflowScrolling: "touch",
    transform: "translate(-50%, -50%)",
    width: "calc(100vw - 10%)",
    borderRadius: "10px",
    border: "0.01px solid #888",
  },
  overlay: {
    zIndex: "90",
    backgroundColor: "rgba(6, 24, 2, 0.55)",
  },
};

const Actions = ({ linkView, docId, deleteDoc, delete_shipdoc_loading }) => (
  <div className="p-1 w-36 bg-white shadow-[1px_4px_12px_-1px_rgba(44,78,39,0.15)]">
    <a href={linkView} target="_blank" rel="noreferrer" className="hover:bg-[#139c330f] flex items-center gap-x-2 p-2 rounded cursor-pointer">
      <span><img src={greenEye} alt="" /></span>
      <span className="green-text-2 text-xs">View File</span>
    </a>
    {/* <div className="hover:bg-[#139c330f] flex items-center gap-x-2 p-2 rounded cursor-pointer">
            <span>
                <img src={swap} alt="" />
            </span>
            <p className="black-text-3 text-xs">Change File</p>
        </div> */}
    <div className="hover:bg-[#139c330f] flex items-center gap-x-2 p-2 rounded cursor-pointer">
      <span><img src={deleted} alt="" /></span>
      <p className="text-[#AD0013] text-xs" onClick={() => deleteDoc(docId)}>Delete File</p>
      <div>
        {delete_shipdoc_loading && <LoadingSpinner top={false} color={"#AD0013"} height={"4"} />}
      </div>
    </div>
  </div>
);

const DocumentUploadModal = (props: any) => {
  const {
    handleSubmit,
    control,
    resetField,
    reset,
    formState: { errors },
  } = useForm();

  const {
    isOpen,
    closeModal,
    id,
    upload_loading,
    uploaded_data,
    uploadShipmentDoc,
    deleteShipmentDoc,
    delete_shipdoc_loading,
    documents,
  } = props;

  const [docName, setDocName] = useState<any>();

  const ref = useRef<HTMLDivElement>(null);

  const [showAction, setShowAction] = useState([]); //array that stores the true/false state of the document items based on the open state

  //when a load is clicked it takes the index of that load and spreads the array and sets it's open state to it's opposite, for this instance it is initially null which is equals to false in js so it makes it true
  const toggle = (index) => {
    const temp = [...showAction];
    //@ts-ignore
    temp[index] = !temp[index];
    setShowAction([...temp]);
  };

  //reset show filter array on successful submission
  const resetShowAction = () => {
    setShowAction([]);
  };

  //delete a document()
  const deleteDoc = (id: string) => {
    deleteShipmentDoc(id, resetShowAction);
    // setShowAction([]) //ask iwatannaye about this
  };

  //holds select options
  const [options, setOptions] = useState([
    { label: "Approved NXP Form", value: "nxp_document" },
    { label: "Proforma Invoice", value: "proforma_invoice" },
    { label: "Shipping Datasheet", value: "shipping_datasheet" },
    { label: "Packing List", value: "packing_list" },
    {
      label: "Commercial Invoice (include NXP number)",
      value: "commercial_invoice",
    },
    { label: "CCI Clean Certificate of inspection", value: "cci" },
    { label: "SGD And Inspection Act", value: "sgd" },
    { label: "Custom Export Clearance", value: "custom_export_clearance" },
    { label: "OBL / SEAWAY BILL / TELEX", value: "obl" },
    { label: "Post Shipment Documents", value: "post_shipment_docs" },
  ]);

  // console.log("documents>>>", documents);

  // console.log("uploadimg>>>", upload_loading);

  //function that submits doc
  const onSubmit = (data: any) => {
    console.log("dateHere>>>", data);
    const uploadData = new FormData();
    uploadData.append("document_name", `${docName.value}`);
    uploadData.append("shipment_file", data.ship_doc[0]);

    const finalData = {
      id: id,
      data: uploadData,
    };
    resetField("doc_upload");
    setDocName("");
    uploadShipmentDoc(finalData);
  };

  // console.log("result>>>", uploaded_data)

  // console.log("doc_name>>>", docName)

  const [uploadError, setUploadError] = useState("");
  //handles file submission
  const handleFileChange = (val) => {
    // let selected = val.target.files[0]
    // setFileName(selected.name)

    if (val.target.files[0].size > 10000000) {
      setUploadError("Maximum file size of 10MB");
      return;
    }
    if (!["application/pdf"].includes(val.target.files[0]?.type)) {
      setUploadError("Only PDF format allowed.");
      return;
    }
    setUploadError("");
    onSubmit({
      ship_doc: val.target.files,
    });
  };

  //creating the click outside to close drop down effect
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu, then close the menu
      if (showAction && ref.current && !ref.current.contains(e.target)) {
        setShowAction([]);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showAction]);

  return (
    <>
      <Modal isOpen={isOpen} style={customStyles} className={"uploadmodal"}>
        <div>
          <div className="flex justify-between items-center px-6 pt-6 pb-3">
            <div>
              <p className="black-text-3 font-medium text-base md:text-lg xl:text-xl flex flex-col">
                View Documents
              </p>
              <p className="grey-text text-sm font-light">
                {documents?.length} document(s) uploaded
              </p>
            </div>
            <span className="cursor-pointer" onClick={closeModal}>
              <img src={close} alt="" />
            </span>
          </div>
          <div className="max-h-[calc(100vh_-_300px)] overflow-auto">
            <div className="pb-5 px-6 bg-[#F9FAFB]">
              <form
                className="w-full flex justify-between gap-x-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="w-[85%]">
                  <CustomSelect
                    control={control}
                    name={`doc_upload`}
                    id={`doc_upload`}
                    label={" "}
                    placeholder={`Select document`}
                    isRequired={true}
                    errors={errors}
                    isDisabled={false}
                    options={options.filter(
                      (item) =>
                        !documents
                          ?.map((doc) => doc?.document_name)
                          ?.includes(item?.value)
                    )}
                    defaultValue={""}
                    icon=""
                    customOnChange={setDocName}
                  />
                </div>
                <div
                  className={`w-[15%] self-center ${upload_loading ? "mt-0" : "mt-3"
                    }`}
                >
                  {upload_loading ? (
                    <LoadingSpinner />
                  ) : (
                    <ShipmentUploadInput
                      control={control}
                      id={"ship_doc"}
                      name={"ship_doc"}
                      label={""}
                      placeholder={""}
                      defaultValue={""}
                      errors={errors}
                      isRequired={true}
                      // submit={onSubmit}
                      // docName={docName}
                      disabled={!docName}
                      handleFileChange={handleFileChange}
                    />
                  )}
                </div>
                {/* <span className="w-[15%] self-center mt-4"><img src={exportImg} alt="" /></span> */}
                {/* <button type='submit'>hello</button> */}
              </form>
              {uploadError && <p className="mt-2 error-text">{uploadError}</p>}
              <div className="flex gap-x-2 mt-3">
                <>
                  <span>
                    <img
                      src={disclaimer}
                      alt=""
                      className="mt-[2px] min-w-[16px]"
                    />
                  </span>
                  {/* <p className="text-[#A96000] text-sm font-light">
                                        <span className="font-medium">Remaining</span>{" "}
                                        {options
                                            .filter(
                                                (item) =>
                                                    !documents
                                                        ?.map((doc) => doc?.document_name)
                                                        ?.includes(item?.value)
                                            )
                                            ?.map((item) => item.label)
                                            .join(", ")}
                                    </p> */}
                  <p className="text-[#A96000] text-sm font-light">
                    <span className="font-medium">Note, </span>
                    <span>
                      only upload PDFs files with a maximum file size of 10mb.
                    </span>
                  </p>
                </>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 py-4 px-6">
              {documents?.length > 0 ? (
                documents.map((item, idx) => (
                  <div
                    key={item?.document_location}
                    className="p-4 solid-br rounded flex justify-between items-center relative"
                  >
                    <div>
                      <p className="black-text-4 text-sm mb-1">{item?.document_name}</p>
                      <p className="grey-text-1 text-sm font-light">{item?.createdAt?.slice(0, 10)}</p>
                    </div>
                    <span className="cursor-pointer" onClick={() => toggle(idx)}>
                      <img src={threeDots} alt="" />
                    </span>
                    {showAction[idx] && (
                      <div ref={ref} className="absolute right-5 top-12 z-20">
                        <Actions
                          linkView={item?.document_location}
                          docId={item?._id}
                          deleteDoc={deleteDoc}
                          delete_shipdoc_loading={delete_shipdoc_loading}
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="black-text-3 text-[15px] text-center py-16">
                  You have no uploaded documents yet.
                </p>
              )}
              {/* <div className="p-4 solid-br rounded flex justify-between items-center relative">
                                <div>
                                    <p className="black-text-4 text-sm mb-1">Shipper's Export Declarati...</p>
                                    <p className="grey-text-1 text-sm font-light">190kb</p>
                                </div>
                                <span className="cursor-pointer" onClick={() => setShowAction(!showAction)}><img src={threeDots} alt="" /></span>
                                {showAction && <div ref={ref} className="absolute right-5 top-12"><Actions /></div>}
                            </div>
                            <div className="p-4 solid-br rounded flex justify-between items-center">
                                <div>
                                    <p className="black-text-4 text-sm mb-1">Shipper's Export Declarati...</p>
                                    <p className="grey-text-1 text-sm font-light">190kb</p>
                                </div>
                                <span><img src={threeDots} alt="" /></span>
                            </div>
                            <div className="p-4 solid-br rounded flex justify-between items-center">
                                <div>
                                    <p className="black-text-4 text-sm mb-1">Shipper's Export Declarati...</p>
                                    <p className="grey-text-1 text-sm font-light">190kb</p>
                                </div>
                                <span><img src={threeDots} alt="" /></span>
                            </div> */}
            </div>
          </div>
          <div className="p-6 top-divider-2">
            <div
              className="flex items-center gap-x-4 py-3 px-6 solid-green-br rounded w-fit cursor-pointer"
              onClick={closeModal}
            >
              <img src={arrowLeft} alt="" />
              <span className="text-[#59725C] text-sm">
                Go Back to Shipment Details
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { upload_loading, uploaded_data, delete_shipdoc_loading } =
    state.booking;
  return { upload_loading, uploaded_data, delete_shipdoc_loading };
};

export default connect(mapStateToProps, {
  uploadShipmentDoc,
  deleteShipmentDoc,
})(DocumentUploadModal);
