import { useState } from "react";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

//components
import CustomDnD from "components/customDnD/CustomDnD";
import CustomSwitch from "components/customSwitch/CustomSwitch";
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
// @ts-ignore
import ShippingFormRequest from "components/rates/ShippingFormRequest";

import { uploadRatesDocs } from "store/actions";
import { uploadAdminRatesDocs } from "store/actions";

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
        uploadAdminRatesDocs, 
        admin_rate_data, 
        showStep 
    } = props;

    // const [NXPerror, setNXPerror] = useState(false);
    // const [PFIerror, setPFIerror] = useState(false);
    // const [FormMerror, setFormMerror] = useState(false);
    // const [modalOpen, setModalOpen] = useState(false);

    // const onToggleNXPSwitch = () => {
    //     if (hasNXP) {
    //         setModalOpen(true);
    //     }
    //     setHasNXP(!hasNXP);
    // };
    // const onTogglePFISwitch = () => {
    //     if (hasPFI) {
    //         setModalOpen(true);
    //     }
    //     setHasPFI(!hasPFI);
    // };
    // const onToggleFormMSwitch = () => {
    //     if (hasFormM) {
    //       setModalOpen(true);
    //     }
    //     setHasFormM(!hasFormM);
    // };
    // const closeModal = () => {
    //     setModalOpen(false);
    //     setHasNXP(true);
    //     setHasPFI(true);
    // };

    const location = useLocation();
    // const urlParams = useParams();
    // console.log(urlParams.id)
    const urlParams = new URLSearchParams(location.search);

    //validation
    const onSubmitExport = () => {
        // if (hasNXP && !NXPdoc) {
        //     setNXPerror(true);
        // } else {
        //     setNXPerror(false);
        // }
        // if (hasPFI && !PFIdoc) {
        //     setPFIerror(true);
        // } else {
        //     setPFIerror(false);
        // }

        if (hasNXP && NXPdoc && hasPFI && PFIdoc) {
            const formData = new FormData();
            formData.append("nxp_document", NXPdoc);
            formData.append("proforma_document", PFIdoc);

            const data = {
                id: urlParams.get("id") || admin_rate_data?._id,
                // id: urlParams.id || admin_rate_data?._id,
                data: formData,
            };
            uploadAdminRatesDocs(data, nextStep, "export");
            console.log(data);
        }
    };

    const onSubmitImport = () => {
        // if (hasFormM && !formMdoc) {
        //     setFormMerror(true);
        // } else {
        //     setFormMerror(false);
        // }

        if (hasFormM && formMdoc) {
            const formData = new FormData();
            formData.append("form_m", formMdoc);
            
      
            const data = {
                id: urlParams.get("id") || admin_rate_data?._id,
                // id: urlParams.id || admin_rate_data?._id,
                data: formData,
            };
      
            uploadAdminRatesDocs(data, nextStep, "import");
        }
    };

    return (
        <div className="dashboard-content">
            <div className="mb-24">
                {shipmentType === "export" ? (
                    <div className="booking-docs">
                        <div className="">
                            <p className="text-sm black-text font-medium">1. Upload your NXP Form</p>
                            <div className="my-2">
                                <CustomDnD 
                                    handleChange={setNXPdoc} 
                                    file={NXPdoc} 
                                    // error={NXPerror} 
                                    name={"NXP Form"}
                                    required={false}  
                                />
                            </div>
                            {/* <div className="flex items-center">
                                <CustomSwitch checked={!hasNXP} onChange={onToggleNXPSwitch} />

                                <p className="text-sm black-text ml-2">
                                    I do not have my <span className="font-semibold">NXP Form</span>
                                </p>
                            </div> */}
                        </div>
                        <hr className="dashed-hr mt-10 mb-5" />
                        <div className="">
                            <p className="text-sm black-text font-medium">1. Upload your PFI Form</p>
                            <div className="my-2">
                                <CustomDnD 
                                    handleChange={setPFIdoc} 
                                    file={PFIdoc} 
                                    // error={PFIerror} 
                                    name={"PFI Form"} 
                                    required={false} 
                                />
                            </div>
                            {/* <div className="flex items-center">
                                <CustomSwitch checked={!hasPFI} onChange={onTogglePFISwitch} />

                                <p className="text-sm black-text ml-2">
                                    I do not have my <span className="font-semibold">PFI Form</span>
                                </p>
                            </div> */}
                        </div>

                        <div className="grid grid-cols-3 mt-10 items-center ">
                            <div className="">
                                {/* @ts-ignore */}
                                <SecondaryButton title="Previous Step" icon="ion-ios-arrow-round-back" onClick={previousStep} />
                            </div>
                            <div className=" mx-auto">{showStep ? <p className="black-text font-medium text-base">Step 2 of 4</p> : <></>}</div>
                            <div className="">
                                {/* @ts-ignore */}
                                <PrimaryButton title="Continue" loading={loading} onClick={onSubmitExport} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="booking-docs">
                        <div className="">
                            <p className="text-sm black-text font-medium">1. Upload your Form M</p>
                            <div className="my-2">
                                <CustomDnD 
                                    handleChange={setFormMdoc} 
                                    file={formMdoc} 
                                    // error={FormMerror} 
                                    name={"Form M"} 
                                    required={false} 
                                />
                            </div>
                            {/* <div className="flex items-center">
                                <CustomSwitch checked={!hasFormM} onChange={onToggleFormMSwitch}/>
                                onChange={setHasFormM(!hasFormM)}
                                <p className="text-sm black-text ml-2">
                                    I do not have my <span className="font-semibold">Form M</span>
                                </p>
                            </div> */}
                        </div>

                        <div className="grid grid-cols-3 mt-10 items-center ">
                            <div className="">
                                {/* @ts-ignore */}
                                <SecondaryButton title="Previous Step" icon="ion-ios-arrow-round-back" onClick={previousStep} />
                            </div>
                            <div className=" mx-auto">{showStep ? <p className="black-text font-medium text-base">Step 2 of 4</p> : <></>}</div>
                            <div className="">
                                {/* @ts-ignore */}
                                <PrimaryButton title="Continue" loading={loading} onClick={onSubmitImport} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* <ShippingFormRequest 
                modalIsOpen={modalOpen} 
                closeModal={closeModal} 
                rateId={urlParams.get("id") || admin_rate_data?._id} 
                nextStep={nextStep} shipmentType={shipmentType} 
            /> */}
        </div>
    );
};

// export default Document;

const mapStateToProps = (state: any) => {
    const { loading, admin_rate_data } = state.adminrate;
    return { loading, admin_rate_data };
};
export default connect(mapStateToProps, { uploadAdminRatesDocs })(Document);
