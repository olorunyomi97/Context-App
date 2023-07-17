import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import CustomDnD from "components/customDnD/CustomDnD";
import PrimaryButton from "components/buttons/PrimaryButton";
import { attachInvoice, getSingleInvoiceDetails } from "store/actions";

const ProofOfPaymentDrawer = (props: any) => {
	const params = useParams();
    const { isOpen, setIsOpen, single_invoice_upload_data, loading } = props;
	console.log(single_invoice_upload_data);
	const [proofFile, setProofFile] = useState("");
    const [proofFileerror, setProofFileerror] = useState(false);
    const { handleSubmit, control, formState: { errors }} = useForm();
    const [paymentFile, setPaymentFile] = useState("");

    const error = "";

	// useEffect(() => {
    //     props.getSingleInvoiceDetails(params.id);
    // }, [getSingleInvoiceDetails]);

    // const { attachInvoice  } = props;
    // const urlParams = useParams();

	// const onSubmit = () => { 
    //     const formData = new FormData();
    //     formData.append("invoice_file" , proofFile);
        
    //     const data = {
    //         data: formData,
    //         id:urlParams.id,
            
    //     };
    //     console.log(data);
    //     attachInvoice(data, setProofFile(''));
    // };

    return (
        <>
            <SlidingPane
                className="custom-slider"
                overlayClassName="some-custom-overlay-class"
                isOpen={isOpen}
                hideHeader={true}
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    setIsOpen(false);
                }}
            >
                <i className="ion-ios-arrow-round-back py-1.5 px-4 bg-grey text-3xl rounded-full black-text cursor-pointer" onClick={() => setIsOpen(false)}></i>

                <div className="flex items-center mt-10 mb-5">
                    <div className="">
                        <h3 className="text-lg lg:text-xl black-text font-semibold">Proof of payment</h3>
                        {/* <p className="text-xs lg:text-sm grey-text desktop-only">Rhoncus dui convallis lorem egestas molestie vitae nibh.</p> */}
                    </div>

                    <p className="text-sm lg:text-lg black-text font-semibold ml-auto">Invoices No: {single_invoice_upload_data.invoice_no}</p>
                </div>

                <div className="">
				<form>
					<CustomDnD handleChange={setProofFile} file={proofFile} error={proofFileerror} name={"Invoice Document"} pdfOnly={false}  />
					<div className="flex">
						<div className="mt-5 ml-auto">
							{/* @ts-ignore */}
							<PrimaryButton loading={loading} title="Upload Invoice" style={{ paddingRight: 25, paddingLeft: 25 }} />
						</div>
					</div>
				</form>
                </div>
            </SlidingPane>
        </>
    );
};

// export default ProofOfPaymentDrawer;

const mapStateToProps = (state: any) => {
    const { single_invoice, loading } = state.invoices;
    return { single_invoice, loading };
};

export default connect(mapStateToProps, { getSingleInvoiceDetails, attachInvoice })(ProofOfPaymentDrawer);

