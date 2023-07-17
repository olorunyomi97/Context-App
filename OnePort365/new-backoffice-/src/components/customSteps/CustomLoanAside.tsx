import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import PrimaryButton from "components/buttons/PrimaryButton";

import { getDatasheetGeneral } from "store/actions";
const CustomLoanAside = (props:any) => {
    const { items, step, setStep } = props;
    const { loading } = props;

    const params = useParams();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const sheet_section = urlParams.get("sheet_section")
    useEffect(() => {
        const data = {
            id: params.id,
            sheet_section: sheet_section
        }
        // console.log(data);
        props.getDatasheetGeneral(data)
    }, [getDatasheetGeneral])


    return (
        <>
            {loading ? (
                    <div className="text-center my-3 ml-5">
                        <Link to="#" className="text-success">
                            {/* @ts-ignore */}
                            {/* <PrimaryButton title="Loading Datasheet Navigation" loading={loading} /> */}
                        </Link>
                    </div>
                ) : (
                    <div
                        className="pl-14 pr-7 pt-5 lg:py-16 right-divider dashboard-content-scroll"
                        style={{
                            boxShadow: "0 0px 20px -15px rgba(0, 0, 0, 0.3)",
                            minHeight: "90vh",
                        }}
                    >
                        <ul>
                            <div className="items-center cursor-pointer">
                                <ul className='mb-3'>
                                    <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'company_details' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                        
                                         <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                        <Link 
                                            to={`/customer-shipment-details/oneport-loan-summary/${params.id}?&sheet_section=company_details`}
                                            // onClick={() => {
                                            //     window.location.href = `/customer-shipment-details/oneport-loan-summary/${params.id}?&sheet_section=company_details`
                                            // }}
                                            state={{
                                                sheet_section: sheet_section,
                                            }}
                                        >
                                            <span style={{fontSize: '13px'}}>Company Details</span>
                                        </Link>
                                    </li>

                                    <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'credit_application' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                        
                                        <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                        <Link 
                                            to={`/customer-shipment-details/oneport-loan-summary/${params.id}?&sheet_section=credit_application`}
                                            // onClick={() => {
                                            //     window.location.href = `/customer-shipment-details/oneport-loan-summary/${params.id}?&sheet_section=credit_application`
                                            // }}
                                            state={{
                                                sheet_section: sheet_section,
                                            }}
                                        >
                                            <span style={{fontSize: '13px'}}>Credit Application</span>
                                        </Link>
                                    </li>

                                    <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'billing_address' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                        
                                        <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                        <Link 
                                            to={`/customer-shipment-details/oneport-loan-summary/${params.id}?&sheet_section=billing_address`}
                                            // onClick={() => {
                                            //     window.location.href = `/customer-shipment-details/oneport-loan-summary/${params.id}?&sheet_section=billing_address`
                                            // }}
                                            state={{
                                                sheet_section: sheet_section,
                                            }}
                                        >
                                            <span style={{fontSize: '13px'}}>Billing Address</span>
                                        </Link>
                                    </li>

                                    <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'collection' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                        
                                        <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                        <Link 
                                            to={`/customer-shipment-details/oneport-loan-summary/${params.id}?&sheet_section=collection`}
                                            // onClick={() => {
                                            //     window.location.href = `/customer-shipment-details/oneport-loan-summary/${params.id}?&sheet_section=collection`
                                            // }}
                                            state={{
                                                sheet_section: sheet_section,
                                            }}
                                        >
                                            <span style={{fontSize: '13px'}}>Collection/Pick Up</span>
                                        </Link>
                                    </li>

                                    <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'products_solicited' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                        
                                        <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                        <Link 
                                            to={`/customer-shipment-details/oneport-loan-summary/${params.id}?&sheet_section=products_solicited`}
                                            // onClick={() => {
                                            //     window.location.href = `/customer-shipment-details/oneport-loan-summary/${params.id}?&sheet_section=products_solicited`
                                            // }}
                                            state={{
                                                sheet_section: sheet_section,
                                            }}
                                        >
                                            <span style={{fontSize: '13px'}}>Products Solicited</span>
                                        </Link>
                                    </li>

                                    <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'credit_facility_requested' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                        
                                        <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                        <Link 
                                            to={`/customer-shipment-details/oneport-loan-summary/${params.id}?&sheet_section=credit_facility_requested`}
                                            // onClick={() => {
                                            //     window.location.href = `/customer-shipment-details/oneport-loan-summary/${params.id}?&sheet_section=credit_facility_requested`
                                            // }}
                                            state={{
                                                sheet_section: sheet_section,
                                            }}
                                        >
                                            <span style={{fontSize: '13px'}}>Credit Facility Requested</span>
                                        </Link>
                                    </li>

                                    <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'uploaded_documents' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                        
                                        <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                        <Link 
                                            to={`/customer-shipment-details/oneport-loan-summary/${params.id}?&sheet_section=uploaded_documents`}
                                            // onClick={() => {
                                            //     window.location.href = `/customer-shipment-details/oneport-loan-summary/${params.id}?&sheet_section=uploaded_documents`
                                            // }}
                                            state={{
                                                sheet_section: sheet_section,
                                            }}
                                        >
                                        <span style={{fontSize: '13px'}}>Uploaded Documents</span>
                                        </Link>
                                    </li>

                                   
                                </ul>
                            </div>
                        </ul>
                    </div>
                )
            }
        </>
    );
}

// export default CustomStepAside;

const mapStateToProps = (state: any) => {
    const { datasheet_nav, error, loading } = state.datasheet;
    return { datasheet_nav, error, loading };
};

export default connect(mapStateToProps, {getDatasheetGeneral})(CustomLoanAside);


