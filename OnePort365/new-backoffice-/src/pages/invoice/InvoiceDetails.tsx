import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import ShipmentDetails from "components/shipment/ShipmentDetails";
import PrimaryButton from "components/buttons/PrimaryButton";
// icons
import deleteIcon from "assets/icons/delete.svg";
import PaymentDrawer from "components/invoice/PaymentDrawer";
import BankDetailsDrawer from "components/invoice/BankDetailsDrawer";
import ProofOfPaymentDrawer from "components/invoice/ProofOfPaymentDrawer";
import { getSingleInvoiceDetails } from "store/actions";
import { deleteInvoice } from "store/actions";
import Iframe from "react-iframe";
import DeleteModal from "./Modal/DeleteModal";
import CustomPDFRenderer from "components/pdf/custom PDFRenderer";

const InvoiceDetails = (props: any) => {
    const params = useParams();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const invoice_id = urlParams.get("invoice_id");
    const { loading, single_invoice_details } = props;
    const single_invoice_data = single_invoice_details["data"]?.["data"]?.["invoice_details"];
    const single_invoice_upload_data = single_invoice_details["data"]?.["data"]?.["single_invoice_details"];
    console.log(single_invoice_data);
    console.log(single_invoice_upload_data);

    const [dataToDelete, setDataToDelete] = useState({});
    const [modalOpen, setModalOpen ] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isBankDetailsOpen, setIsBankDetailsOpen] = useState(false);
    const [isProofOpen, setIsProofOpen] = useState(false);
    const [openAside, SetOpenAside] = useState(false);

    useEffect(() => {
        const data = {
            id: params.id,
            invoice_id: invoice_id,
        };
        console.log(data);
        props.getSingleInvoiceDetails(data);
    }, [getSingleInvoiceDetails]);

    return (
        <>
            <div className="flex">
                <Aside activeTab="invoice" openAside={openAside} SetOpenAside={SetOpenAside} />
                <div className="">
                    <TopBar title={"Invoices"} SetOpenAside={SetOpenAside} />
                    <div className="dashboard-content mb-10">
                        {loading ? (
                            <div className="text-center my-3 ml-5">
                                <Link to="#" className="text-success">
                                    {/* @ts-ignore */}
                                    <PrimaryButton title="Loading Invoice" loading={loading} />
                                </Link>
                            </div>
                        ) : (
                            <>
                                <>
                                    <div className=" px-7 lg:px-14 lg:pt-10 container mx-auto w-full">
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                <Link
                                                    to=""
                                                    // to={`/shipment-invoice/${params.id}`}
                                                    onClick={() => {
                                                        window.location.href = `/shipment-invoice/${params.id}`
                                                    }}
                                                >
                                                    <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                                                </Link>
                                                <p className="text-lg black-text font-semibold">Invoice Number: {single_invoice_upload_data.invoice_no} </p>
                                            </div>
                                            {/* <div className="bg-light-red py-2 px-4 ml-auto rounded flex items-center cursor-pointer">
                                                <Link 
                                                    to="#"
                                                    onClick={() => {
                                                        setDataToDelete(single_invoice_upload_data._id)
                                                        setModalOpen(true)}
                                                    }
                                                    className="text-sm red-text mr-2 font-semibold desktop-only"
                                                >
                                                    Delete
                                                </Link>
                                                <img src={deleteIcon} alt="" width={20} height={20} />
                                            </div> */}
                                        </div>
                                        <div className="my-5 bg-grey rounded p-4"></div>
                                        <Iframe 
                                            width="100%" 
                                            height="800px" 
                                            url={single_invoice_upload_data.invoice_location}
                                            allowFullScreen 
                                        />

                                        <div className="flex mt-5 mb-5">
                                            {/* <div className="solid-br py-2 px-4 rounded cursor-pointer ml-auto" onClick={() => setIsProofOpen(true)}>
                                                <p className="text-sm black-text mr-2 font-semibold">Proof of payment</p>
                                            </div> */}

                                            {/* <div className="solid-br py-2 px-4 rounded cursor-pointer ml-auto">
                                                <Link 
                                                    // onClick={() => {
                                                    //     window.location.href = `/invoice-details/${params.id}?invoice_id=${data?.['_id']}`
                                                    // }}
                                                    to={`/upload-payment-proof/${params.id}?invoice_id=${single_invoice_upload_data._id}`}
                                                    className="ext-sm black-text mr-2 font-semibold"

                                                >
                                                    Proof of payment
                                                </Link>
                                            </div> */}

                                            {/* <div className="solid-br py-2 px-4 bg-green rounded ml-3 cursor-pointer" onClick={() => setIsOpen(true)}>
                                                <p className="text-sm white-text mr-2 font-semibold">Proceed to payment</p>
                                            </div> */}
                                        </div>
                                    </div>

                                    <PaymentDrawer isOpen={isOpen} setIsOpen={setIsOpen} setIsBankDetailsOpen={setIsBankDetailsOpen} />
                                    <BankDetailsDrawer isOpen={isBankDetailsOpen} setIsOpen={setIsBankDetailsOpen} setIsProofOpen={setIsProofOpen} />
                                    {/* <ProofOfPaymentDrawer 
                                        isOpen={isProofOpen} 
                                        setIsOpen={setIsProofOpen} 
                                        single_invoice_upload_data={single_invoice_upload_data}
                                    /> */}
                                    <DeleteModal 
                                        modalOpen={modalOpen} 
                                        setModalOpen={setModalOpen} 
                                        id={dataToDelete}
                                        deleteInvoice={props.deleteInvoice}
                                    />
                                </>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

// export default InvoiceDetails;

const mapStateToProps = (state: any) => {
    const { single_invoice_details, loading } = state.invoices;
    return { single_invoice_details, loading };
};

export default connect(mapStateToProps, { getSingleInvoiceDetails, deleteInvoice })(InvoiceDetails);
