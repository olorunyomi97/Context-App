import { useEffect, useState } from "react";
import { Link, useParams, useLocation, useSearchParams } from "react-router-dom";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PrimaryButton from "components/buttons/PrimaryButton";

const TractionLoanSummary = (props:any) => {
    const params = useParams();
    const [isLoanOpen, setIsLoanOpen] = useState(false);
    const [isDenyOpen, setIsDenyOpen] = useState(false);
    const { loading } = props;
    return (
        <>
        <div className="flex">
            <Aside activeTab="customer" />
            <div className="">
                <TopBar title={"Traction Loan Application"} />
                <div className="dashboard-content-scroll">
                <div className="container mx-auto w-full">
                    <>
                        <div className="lg:grid lg:grid-cols-2 lg:gap-4 mb-10">
                            {
                                loading ? 
                                (
                                    <div className="text-center my-3 ml-5">
                                        <Link to="#" className="text-success">
                                            {/* @ts-ignore */}
                                            <PrimaryButton title="Loading Quotes" loading={loading} />
                                        </Link>
                                    </div>
                                ) : (
                                <div className="" style={{ marginLeft: "40px" }}>
                                    <>
                                        <div className="flex items-center mt-10 mb-5">
                                            <div className="flex items-center">
                                                <Link 
                                                    to=""
                                                    onClick={() => {
                                                        window.location.href = `/customer-shipment-details/loan-history/${params.id}`
                                                    }}
                                                >
                                                    <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                                                </Link>
                                            </div>
                                            <h3 className="quote-summary black-text">Traction Loan History Summary</h3>
                                            <div className="flex items-center ml-auto">
                                                <div className="ml-auto">
                                                    <p className='admin-table-text'>STATUS</p>
                                                    
                                                </div>
                                                <div className="mb-1">
                                                    <Link to="#" className="bg-light-green black-text-2 text-sm py-2 px-2 green-text mx-5 text-center rounded-full">
                                                        Approved
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    <>
                                        <div className="solid-br p-4 flex items-center mt-5" >
                                            <p className="black-text text-lg ml-3 font-semibold text-sm">
                                                Customer Details
                                            </p>
                                        </div>
                                        <div className="rounded overflow-hidden">
                                            <div className="px-6 py-1 right-divider bottom-divider left-divider w-full">
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Email</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            Biggie@gail.com
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Company Structure</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            LLC
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Business Name</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            ABC Logistics
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Business Address</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            6391 Elgin Delaware
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">RC Number</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            9Q193QNR
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">TIN</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            9876001234
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* Director 1 Stuff */}
                                                <div className="flex items-center mb-3 mt-3">
                                                    <p className="text-base black-text text-lg font-semibold">Director 1</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Full Name</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            Brooks Campbell
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Email</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            Brooks@gmail.com
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">BVN</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            2340012345678
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Date of Birth</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            12 August 2022
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Means of ID</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            International Passport
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">ID Number</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            00565437789
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">CAC Certificate</p>
                                                    <div className="ml-auto">
                                                        <p  className="green-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            View
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">CAC Memart</p>
                                                    <div className="ml-auto">
                                                        <p  className="green-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            View
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>

                                        <div className="solid-br p-4 flex items-center mt-5" >
                                            <p className="black-text ml-3 text-lg font-semibold text-sm">
                                                Loan Details
                                            </p>
                                        </div>
                                        <div className="rounded overflow-hidden">
                                            <div className="px-6 py-1 right-divider bottom-divider left-divider w-full">
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Product Service Type</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            Ocean Freights
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Cargo Destination</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            LLC
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Loan Amount</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            ABC Logistics
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Monthly Business Turneover</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            6391 Elgin Delaware
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Business Sector</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            9Q193QNR
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Active Period</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            9876001234
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Nature of Business</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            9876001234
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Period of Required Service</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            9876001234
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Invoice Document</p>
                                                    <div className="ml-auto">
                                                        <p  className="green-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            View
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Invoice Date</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            9876001234
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Account Reference</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            9876001234
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Application ID</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            9876001234
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">CAC Certification Value</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            9876001234
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="flex items-center ml-auto mt-5">
                                            <div className="ml-auto">
                                                <>
                                                    <div className="ml-auto mr-3">
                                                        <Link 
                                                            to=""
                                                            className="solid-br black-text-2 text-sm py-3 px-4 w-full rounded flex"
                                                            onClick={() => {
                                                                // setLoanToApprove(params.id);
                                                                setIsDenyOpen(true)}
                                                            } 
                                                        >
                                                            Deny Application
                                                        </Link>
                                                    </div>
                                                </>
                                            </div>
                                            <div className="mb-1">
                                            <>
                                                <div className="ml-auto">
                                                    <Link 
                                                        to=""
                                                        className="bg-green white-text-2 text-sm py-3 px-4 w-full rounded flex" 
                                                        onClick={() => {
                                                            // setLoanToApprove(params.id);
                                                            setIsLoanOpen(true)}
                                                        }
                                                    >
                                                        Approve Application
                                                    </Link>
                                                </div>
                                            </>
                                            </div>
                                        </div> */}
                                    </>
                                </div>
                             )
                            }
                        </div>
                    </>
                </div>
                </div>
            </div>
            </div>                         
        </>
    )
}

export default TractionLoanSummary;