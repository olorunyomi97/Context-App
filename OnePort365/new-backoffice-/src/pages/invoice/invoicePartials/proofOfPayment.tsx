import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import CustomDnD from "components/customDnD/CustomDnD";
import PrimaryButton from "components/buttons/PrimaryButton";
import { getSingleInvoiceDetails, attachProofOfPayment } from "store/actions";

const ProofOfPayment = (props:any) => {
    const { single_invoice_details, attachProofOfPayment, loading } = props;
	// console.log(single_invoice_details);

    const params = useParams();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const invoice_id = urlParams.get("invoice_id");

    const single_invoice_data = single_invoice_details["data"]?.["data"]?.["invoice_details"];
    const single_invoice_upload_data = single_invoice_details["data"]?.["data"]?.["single_invoice_details"];
    console.log(single_invoice_data);
    console.log(single_invoice_upload_data);

	const [proofFile, setProofFile] = useState("");
    const [proofFileerror, setProofFileerror] = useState(false);
    const { handleSubmit, control, formState: { errors }} = useForm();

    useEffect(() => {
        const data = {
            id: params.id,
            invoice_id: invoice_id,
        };
        console.log(data);
        props.getSingleInvoiceDetails(data);
    }, [getSingleInvoiceDetails]);

    const onSubmit = () => { 
        const formData = new FormData();
        formData.append("proof_of_payment_file" , proofFile);
        
        const newData = {
            data: formData,
            id: invoice_id,
        };
        console.log(newData);
        attachProofOfPayment(newData, setProofFile(''));
    };


    return (
        <>
        <div className="flex">
            <Aside activeTab="invoice" />
            <div className="">
                <TopBar title={"Proof of Payment for Invoice"} />
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
                                            window.location.href = `/invoice-details/${params.id}?invoice_id=${single_invoice_upload_data._id}`
                                        }}
                                    >
                                        <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                                    </Link>
                                    <p className="text-lg black-text font-semibold">Invoice Number: {single_invoice_upload_data.invoice_no} </p>
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
                                            <CustomDnD handleChange={setProofFile} file={proofFile} error={proofFileerror} name={"Proof Of Payment Document"} pdfOnly={false}  onClick={onSubmit} />
                                            <div className="flex">
                                                <div className="mt-5 ml-auto">
                                                    {/* @ts-ignore */}
                                                    <PrimaryButton loading={loading} title="Upload Proof of Payment" style={{ paddingRight: 25, paddingLeft: 25 }} />
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

// export default ProofOfPayment;

const mapStateToProps = (state: any) => {
    const { single_invoice_details, loading } = state.invoices;
    return { single_invoice_details, loading };
};

export default connect(mapStateToProps, { getSingleInvoiceDetails, attachProofOfPayment })(ProofOfPayment);
