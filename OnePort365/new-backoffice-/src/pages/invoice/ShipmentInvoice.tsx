import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import ShipmentDetails from "components/shipment/ShipmentDetails";
import ShipmentInvoiceDetails from "components/invoice/ShipmentInvoiceDetails";
import PrimaryButton from "components/buttons/PrimaryButton";
import { getSingleInvoice } from "store/actions";

const ShipmentInvoice = (props: any) => {
    const params = useParams();
    const { loading, single_invoice } = props;
    // console.log(single_invoice['data']?.['data'])
    const invoice_data = single_invoice['data']?.['data']?.['invoice_details'];
    const invoice_upload_data = single_invoice['data']?.['data']?.['invoice_uploads'];
    console.log(invoice_data)
    console.log(invoice_upload_data)
    // console.log(single_invoice['data']?.['data']?.['invoice_uploads'])
    const [openAside, SetOpenAside] = useState(false);
    //   const { isOpen, setIsOpen } = useState(false);

    useEffect(() => {
        props.getSingleInvoice(params.id);
    }, [getSingleInvoice]);

    return (
        <>
            <div className="flex">
                <Aside activeTab="invoice" openAside={openAside} SetOpenAside={SetOpenAside} />
                <div className="">
                    <TopBar title={"Invoice"} SetOpenAside={SetOpenAside} />
                    <div className="dashboard-content">
                    {
                        loading ? 
                        (
                            <div className="text-center my-3 ml-5">
                                <Link to="#" className="text-success">
                                    {/* @ts-ignore */}
                                    <PrimaryButton title="Loading Invoice Details" loading={loading} />
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="pt-5 lg:px-14 lg:pt-10 container">
                                    <div className="" style={{ maxWidth: 800 }}>
                                        <div className="">
                                            <div className="flex items-center mb-3">
                                                <Link 
                                                    to=""
                                                    onClick={() => {
                                                        window.location.href = `/invoices`
                                                    }}
                                                >
                                                    <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                                                </Link>
                                                <div className="ml-auto">
                                                    <Link  
                                                        // to={`/upload-invoice/${invoice_data[0]._id}`}
                                                        to=""
                                                        className="solid-br black-text-2 text-sm py-3 px-5 w-full rounded flex" 
                                                    >
                                                        View Shipment
                                                    </Link>
                                                </div>
                                            </div>
                                            
                                            <ShipmentInvoiceDetails single_invoice={single_invoice}/>
                                        </div>

                                        <div className="mt-10 px-7 lg:px-0">
                                            <div className="flex items-center">
                                                <h3 className="black-text text-lg font-semibold">All Invoice(s)</h3>
                                                <div className="ml-auto">
                                                    <Link 
                                                        // to="/upload-invoice" 
                                                        to={`/upload-invoice/${invoice_data[0]._id}`}
                                                        className="solid-br black-text-2 text-sm py-3 px-5 w-full rounded flex" 
                                                    >
                                                        Add Invoice +
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                {
                                                    invoice_upload_data.length === 0 ? (
                                                        <>
                                                            <p>No Invoice Uploaded Yet</p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {
                                                               invoice_upload_data?.map((data: any) => {
                                                                   return (
                                                                        <>
                                                                            <div className="solid-br p-3 flex items-center rounded mb-2">
                                                                                <p className="black-text">{data?.['invoice_no']}</p>
                                                                                <div className="ml-auto">
                                                                                    {
                                                                                        data?.['invoice_payment_status'] == "unpaid" ? (
                                                                                            <Link to="#" className="bg-light-red black-text-2 text-sm py-2 px-3 red-text mx-5 text-center rounded-full">
                                                                                                Unpaid
                                                                                            </Link>
                                                                                        ) : (
                                                                                            <Link to="#" className="bg-green solid-br black-text-2 text-sm py-2 px-3 green-text mx-5 text-center rounded-full">
                                                                                                Paid
                                                                                            </Link>
                                                                                        )
                                                                                    }
                                                                                    
                                                                                </div>
                                                                                <Link 
                                                                                    className="solid-br py-2 px-4 bg-green white-text rounded cursor-pointer"
                                                                                    onClick={() => {
                                                                                        window.location.href = `/invoice-details/${params.id}?invoice_id=${data?.['_id']}`
                                                                                    }}
                                                                                    // to={`/invoice-details/${params.id}?invoice_id=${data?.['_id']}`}
                                                                                    to=""
                                                                                >
                                                                                    view
                                                                                </Link>
                                                                            </div>
                                                                        </>
                                                                    )
                                                               }) 
                                                            }
                                                            
                                                        </>
                                                    )
                                                }
                                            

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    </div>
                </div>
            </div>
        </>
    );
};

// export default ShipmentInvoice;

const mapStateToProps = (state: any) => {
    const { single_invoice, loading } = state.invoices;
    return { single_invoice, loading };
};

export default connect(mapStateToProps, { getSingleInvoice })(ShipmentInvoice);

