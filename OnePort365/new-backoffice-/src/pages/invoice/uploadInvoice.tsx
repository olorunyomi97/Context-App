import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import CustomDnD from "components/customDnD/CustomDnD";
import PrimaryButton from "components/buttons/PrimaryButton";
import { getSingleInvoice } from 'store/actions';
import { attachInvoice } from "store/actions";

const UploadInvoice = (props:any) => {
    const params = useParams();
    const { loading, single_invoice } = props;
    const [invoiceFile, setInvoiceFile] = useState("");
    const [invoiceFileerror, setInvoiceFileerror] = useState(false);
    const { handleSubmit, control, formState: { errors }} = useForm();

    console.log(single_invoice);
    console.log(single_invoice['data']?.['data']);
    console.log(single_invoice['data']?.['data']?.['invoice_details']);
    const invoice_data = single_invoice['data']?.['data']?.['invoice_details'];
    const invoice_upload_data = single_invoice['data']?.['data']?.['invoice_uploads'];

    useEffect(() => {
        props.getSingleInvoice(params.id);
    }, [getSingleInvoice]);

    const { attachInvoice  } = props;
    const urlParams = useParams();
    // console.log(urlParams.id)

    const onSubmit = () => { 
        const formData = new FormData();
        formData.append("invoice_file" , invoiceFile);
        
        const data = {
            data: formData,
            id:urlParams.id,
            
        };
        console.log(data);
        attachInvoice(data, setInvoiceFile(''));
    };


    return (
        <>
        <div className="flex">
            <Aside activeTab="invoice" />
            <div className="">
                <TopBar title={"Invoice"} />
                <div className="lg:px-14 lg:pt-10 container mx-auto  w-full">
                    {
                        loading ? 
                        (
                            <div className="text-center my-3">
                                <Link to="#" className="text-success">
                                    {/* @ts-ignore */}
                                    <PrimaryButton title="Loading" loading={loading} />
                                </Link>
                            </div>
                        ) : ( 
                            <>
                                <div className="flex items-center">
                                    <Link 
                                        to="#"
                                        onClick={() => {
                                            window.location.href = `/shipment-invoice/${params.id}`
                                        }}
                                    >
                                        <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                                    </Link>
                                    <p className="text-lg black-text font-semibold">Shipping ID: {invoice_data[0]._id}</p>
                                </div>
                                <div className="dashboard-content">
                                    <div>
                                        <div className="mt-5 bg-grey rounded p-4"></div>
                                        <div className="mt-5">
                                        </div>
                                        <hr className="solid-br my-5" />
                                    </div>
                                    <div className="mt-7">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <CustomDnD handleChange={setInvoiceFile} file={invoiceFile} error={invoiceFileerror} name={"Invoice Document"} pdfOnly={false} onClick={onSubmit} />
                                            <div className="flex">
                                                <div className="mt-5 ml-auto">
                                                    {/* @ts-ignore */}
                                                    <PrimaryButton loading={loading} title="Upload Invoice" style={{ paddingRight: 25, paddingLeft: 25 }} />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </>
                        )
                    } 
                </div>
            </div>
        </div>
    </>
    )
}

// export default UploadInvoice;

const mapStateToProps = (state: any) => {
    const { single_invoice, loading } = state.invoices;
    return { single_invoice, loading };
};

export default connect(mapStateToProps, { getSingleInvoice, attachInvoice })(UploadInvoice);

