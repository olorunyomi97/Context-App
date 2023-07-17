import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import DatasheetButton from "components/buttons/DatasheetButton";
import CustomStepAside from "components/customSteps/CustomStepAside";
import CustomLoanAside from "components/customSteps/CustomLoanAside"
import CompanyDetails from "./OnePortLoanHistoryComponents/companyDetails";
import CreditApplication from "./OnePortLoanHistoryComponents/creditApplication";
import BillingAddress from "./OnePortLoanHistoryComponents/billingAddress";
import Collection from "./OnePortLoanHistoryComponents/collection";
import ProductsSolicited from "./OnePortLoanHistoryComponents/productsSolicited";
import CreditFacilityRequested from "./OnePortLoanHistoryComponents/creditFacilityRequested";
import UploadedDocuments from "./OnePortLoanHistoryComponents/uploadedDocuments";


const OneportLoanHistorySummary = (props: any) => {
    const loading = true
    const [step, setStep] = useState<number>(0);
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const sheet_section = urlParams.get("sheet_section");

    const items: object[] = [
        {
            name: "Company Details",
            submitted: false,
        },
        {
            name: "Credit Application",
            submitted: false,
        },
        {
            name: "Billing Address",
            submitted: false,
        },
        {
            name: "Collection/Pick up",
            submitted: false,
        },
        {
            name: "Products Solicited",
            submitted: false,
        },
        {
            name: "Credit Facilty Requested",
            submitted: false,
        },
        {
            name: "Uploaded Documents",
            submitted: false,
        }
    ];

    const nextStep = () => {
        if (step !== items.length) {
            setStep(step + 1);
        }
    };

    const previousStep = () => {
        if (step !== 0) {
            setStep(step - 1);
        }
    };

    return (
        <>
        <div className="lg:flex">
            <Aside activeTab="customer" />

            <div className="">
                <TopBar title={"Oneport365 Loan Application"} />

                {/* {
                    loading ? 
                    (
                        <div className="text-center my-3 ml-5">
                            <Link to="#" className="text-success">
                                @ts-ignore
                                <PrimaryButton title="Loading Datasheet Navigation" loading={loading} />
                            </Link>
                        </div>
                    ) : (  */}
                        <div className="container flex">
                            <>
                                <div className="w-1/4">
                                    <CustomLoanAside 
                                        items={items} 
                                        step={step} 
                                        setStep={setStep} 
                                    />
                                </div>
                                <div className="w-3/4 dashboard-content-scroll">
                                    <div className="lg:px-14 pt-5 lg:pt-16">
                                        {sheet_section === 'company_details' ? (
                                            <CompanyDetails />
                                        ) : sheet_section === 'credit_application' ? (
                                            <CreditApplication  />

                                        ) :  sheet_section === 'billing_address' ? (
                                            <BillingAddress  />

                                        ) :  sheet_section === 'collection' ? (
                                            <Collection  />

                                        ) :  sheet_section === 'products_solicited' ? (
                                            <ProductsSolicited  />

                                        ) :  sheet_section === 'credit_facility_requested' ? (
                                            <CreditFacilityRequested  />

                                        ) :  sheet_section === 'uploaded_documents' ? (
                                            <UploadedDocuments  />
                                        ) : (
                                            <></>
                                        )
                                    }
                                    </div>
                                </div>
                            </>
                   
                        </div>
                    {/* )
                } */}
            </div>
        </div>
    </>
    )
}

export default OneportLoanHistorySummary;