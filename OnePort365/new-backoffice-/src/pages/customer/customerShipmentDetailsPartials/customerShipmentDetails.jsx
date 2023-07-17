import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import CustomerShipmentLocation from "./customerShipmentLocation/CustomerShipmentLocationDetails";
import AdditionalDetailsTab from "./customerShipmentTabs/AdditionalDetailsTab/AdditionalDetailsTab"
import DocumentsTab from "./customerShipmentTabs/DocumentsTab/DocumentsTab";
import CargoDetailsTab from "./customerShipmentTabs/CargoDetailsTab/CargoDetailsTab";
import RatesTab from "./customerShipmentTabs/RatesTab/RatesTab";
import InvoiceTab from "./customerShipmentTabs/InvoiceTab/InvoiceTab";
import LoanTab from "./customerShipmentTabs/LoanTab/LoanTab";
import CustomTabs from "components/customTabs/CustomTabs";
import NewCustomTabs from "components/customTabs/NewCustomTabs";
import { getSingleCustomer } from "store/actions";
import PrimaryButton from "components/buttons/PrimaryButton";


const CustomerShipmentDetails = (props) => {
    const [tab, setTab] = useState("Documents");
	const { loading, single_customer } = props;
    const params = useParams();
    console.log(single_customer?.data?.data)
    const customer_details = single_customer?.data?.data?.customer_data
    console.log(customer_details)


	useEffect(() => {
		props.getSingleCustomer(params.id);
	},[getSingleCustomer]);

    const Customer_shipment_tab = [

    ]


    return (
        <>
            <div className="flex" style={{marginBottom: "50px"}}>
                <Aside activeTab="customer" />
                <div className="">
                    <TopBar title={"Customers"} />
                    <div className="dashboard-content-scroll">
                    {
                        loading ? 
                        (
                            <div className="text-center my-3">
                                <Link to="#" className="text-success">
                                    {/* @ts-ignore */}
                                    <PrimaryButton title="Loading Customer Details" loading={loading} />
                                </Link>
                            </div>
                        ) : <>
                                <div className="dashboard-content">
                                    <div className="grid grid-cols-4 gap-4" style={{marginRight : '200px'}}>
                                        <div className="col-span-3" style={{marginLeft: '40px'}}>
                                            <div className="flex items-center mt-3 mb-3">
                                                {/* <h3 className="text-xl black-text font-semibold">Shipment details for {customer_details.company_name} </h3> */}
                                                
                                                <Link 
                                                    to=""
                                                    onClick={() => {
                                                        window.location.href = `/customers/customer-shipment/${params.id}`
                                                    }}
                                                >
                                                    <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                                                </Link>
                                            </div>
                                            <div className="mb-5 px-6 py-1 top-divider right-divider bottom-divider left-divider w-full">
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Company Name</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex">
                                                        {customer_details.company_name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Company Address</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex">
                                                        {customer_details.company_address}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Company Email</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex">
                                                        {customer_details.email}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Company Contact Person</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-2 px-4 w-full flex">
                                                        {customer_details.firstname} {customer_details.lastname}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <CustomerShipmentLocation />

                                            <div className="my-10 w-full">
                                                <NewCustomTabs tabs={["Documents", "Cargo Details", "Additional Services", "Rates", "Invoice", "Loans"]} activeTab={tab} setActiveTab={setTab} />
                                            </div>
                                            {
                                                tab === "Documents" ? (
                                                    <DocumentsTab />
                                                ) : tab === "Cargo Details" ? (
                                                    <CargoDetailsTab />
                                                ) : tab === "Additional Services" ? (
                                                    <AdditionalDetailsTab />
                                                ) : tab === "Rates" ? (
                                                    <RatesTab /> 
                                                ) : tab === "Invoice" ? (
                                                    <InvoiceTab customer_details={customer_details}/>
                                                ) : (
                                                    <LoanTab customer_details={customer_details}/>
                                                )
                                            }
                                        </div>
                                        <div className="pt-14 mt-2"></div>
                                    </div>
                                </div>
                            </>
                    }
                    </div>
                </div>
            </div>
        </>
    );
};

// export default CustomerShipmentDetails;

const mapStateToProps = (state) => {
    const { single_customer, loading } = state.customers;
    return { single_customer, loading };
};

export default connect(mapStateToProps, { getSingleCustomer })(CustomerShipmentDetails);


