import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar"
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomInput from "components/textInputs/CustomInput"
import CustomTextarea from "components/textInputs/CustomTextarea";
import CustomRadio from "components/selectInputs/CustomRadio";
import CustomDnD from "components/customDnD/CustomDnD";
import ApproveModal from "../../../LoanModals/approveModal";
import DenyModal from "../../../LoanModals/denyModal";

const SignOffForm = (props: any) => {
    const params = useParams();
    const { loading } = props;
    const [error, seterror] = useState(null);
    const [shippingDoc, setShippingDoc] = useState("");
	const [shippingDocError, setShippingDocError] = useState(false);
    const [isLoanOpen, setIsLoanOpen] = useState(false);
    const [isDenyOpen, setIsDenyOpen] = useState(false);
    const { handleSubmit, control, reset, formState: { errors } } = useForm();

    const onSubmit = () => {

    }
    return (
        <div className="lg:flex">
			<Aside activeTab="quote"/>
			<div className="dashboard-content-scroll">
				<TopBar title={"Oneport365 Credit Facility Sign-Off"} />
                {loading ? (
					<div className="text-center my-3 ml-5">
						<Link to="#" className="text-success">
							{/* @ts-ignore */}
							<PrimaryButton title="Loading" loading={loading} />
						</Link>
					</div>
				) : ( 
                        <>
                            <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
								<div className="mt-10 pl-14">
                                    <div className="flex items-center">
                                        <Link 
                                            to=""
                                           onClick={() => {
                                            window.location.href = `/customer-shipment-details/oneport-loan-summary/${params.id}?&sheet_section=uploaded_documents`
                                        }}
                                        >
                                            <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                                        </Link>
									    <p className="text-lg black-text font-semibold">Internal Use and Sign-Off</p>
									</div>
                                    <h3 className="quote_text black-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt enim fugiat laborum.</h3>
                                
                                    {error ? (
                                        <p className="bg-error p-3 text-center black-text text-sm my-4 rounded">
                                            {error}
                                        </p>
                                    ) : (
                                        <div></div>
                                    )}

                                    <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="">
                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Customer Name"}
                                                    placeholder={"Enter Customer Name"}
                                                    isRequired={true}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Account Number"}
                                                    placeholder={"Enter Account Name"}
                                                    isRequired={true}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Effective Date"}
                                                    placeholder={"Enter Date"}
                                                    isRequired={true}
                                                    type={"date"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>

                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Location"}
                                                    placeholder={"Enter Location"}
                                                    isRequired={true}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>

                                            <div className="mr-1 mb-5">
                                                <CustomTextarea
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Reason"}
                                                    placeholder={"Reason"}
                                                    isRequired={true}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    icon={""}
                                                />
                                            </div>
                                        </div>
                                        <p className="text-lg black-text font-semibold">Credit Executive</p>
                                        <div className="">
                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Executive Name"}
                                                    placeholder={"Enter Executive Name"}
                                                    isRequired={true}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                            
                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Effective Date"}
                                                    placeholder={"Enter Date"}
                                                    isRequired={true}
                                                    type={"date"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                            <div className="">
											    <p className="text-sm black-text font-medium">Signature</p>
                                                <div className="my-2 mb-5">
                                                    <CustomDnD 
                                                        handleChange={setShippingDoc}
                                                        file={shippingDoc}
                                                        error={shippingDocError}
                                                        name={"shipping document"} 
                                                        defaultValue={""}
                                                    />
                                                </div>
                                                </div>

                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Comment"}
                                                    placeholder={"Comment Here"}
                                                    isRequired={true}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                        </div>

                                        <p className="text-lg black-text font-semibold">Business Development Manager</p>
                                        <div className="">
                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Executive Name"}
                                                    placeholder={"Enter Manager's Name"}
                                                    isRequired={true}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                            
                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Effective Date"}
                                                    placeholder={"Enter Date"}
                                                    isRequired={true}
                                                    type={"date"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                            <div className="">
											    <p className="text-sm black-text font-medium">Signature</p>
                                                <div className="my-2 mb-5">
                                                    <CustomDnD 
                                                        handleChange={setShippingDoc}
                                                        file={shippingDoc}
                                                        error={shippingDocError}
                                                        name={"shipping document"} 
                                                        defaultValue={""}
                                                    />
                                                </div>
                                                </div>

                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Comment"}
                                                    placeholder={"Comment Here"}
                                                    isRequired={true}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                        </div>

                                        <p className="text-lg black-text font-semibold">Commercial General Manager</p>
                                        <div className="">
                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Executive Name"}
                                                    placeholder={"Enter Executive Name"}
                                                    isRequired={true}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                            
                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Effective Date"}
                                                    placeholder={"Enter Date"}
                                                    isRequired={true}
                                                    type={"date"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                            <div className="">
											    <p className="text-sm black-text font-medium">Signature</p>
                                                <div className="my-2 mb-5">
                                                    <CustomDnD 
                                                        handleChange={setShippingDoc}
                                                        file={shippingDoc}
                                                        error={shippingDocError}
                                                        name={"shipping document"} 
                                                        defaultValue={""}
                                                    />
                                                </div>
                                                </div>

                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Comment"}
                                                    placeholder={"Comment Here"}
                                                    isRequired={true}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                        </div>

                                        <p className="text-lg black-text font-semibold">Financial Controller</p>
                                        <div className="">
                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Executive Name"}
                                                    placeholder={"Enter Executive Name"}
                                                    isRequired={true}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                            
                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Effective Date"}
                                                    placeholder={"Enter Date"}
                                                    isRequired={true}
                                                    type={"date"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                            <div className="">
											    <p className="text-sm black-text font-medium">Signature</p>
                                                <div className="my-2 mb-5">
                                                    <CustomDnD 
                                                        handleChange={setShippingDoc}
                                                        file={shippingDoc}
                                                        error={shippingDocError}
                                                        name={"shipping document"} 
                                                        defaultValue={""}
                                                    />
                                                </div>
                                                </div>

                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Comment"}
                                                    placeholder={"Comment Here"}
                                                    isRequired={true}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                        </div>

                                        <p className="text-lg black-text font-semibold">CFO</p>
                                        <div className="">
                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Executive Name"}
                                                    placeholder={"Enter Executive Name"}
                                                    isRequired={true}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                            
                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Effective Date"}
                                                    placeholder={"Enter Date"}
                                                    isRequired={true}
                                                    type={"date"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                            <div className="">
											    <p className="text-sm black-text font-medium">Signature</p>
                                                <div className="my-2 mb-5">
                                                    <CustomDnD 
                                                        handleChange={setShippingDoc}
                                                        file={shippingDoc}
                                                        error={shippingDocError}
                                                        name={"shipping document"} 
                                                        defaultValue={""}
                                                    />
                                                </div>
                                                </div>

                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Comment"}
                                                    placeholder={"Comment Here"}
                                                    isRequired={true}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                        </div>

                                        <p className="text-lg black-text font-semibold">MD/Country Manager</p>
                                        <div className="">
                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Executive Name"}
                                                    placeholder={"Enter Executive Name"}
                                                    isRequired={true}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                            
                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Effective Date"}
                                                    placeholder={"Enter Date"}
                                                    isRequired={true}
                                                    type={"date"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                            <div className="">
											    <p className="text-sm black-text font-medium">Signature</p>
                                                <div className="my-2 mb-5">
                                                    <CustomDnD 
                                                        handleChange={setShippingDoc}
                                                        file={shippingDoc}
                                                        error={shippingDocError}
                                                        name={"shipping document"} 
                                                        defaultValue={""}
                                                    />
                                                </div>
                                                </div>

                                            <div className="mr-1 mb-5">
                                                <CustomInput
                                                    control={control}
                                                    name={"shipping_line"}
                                                    id={"shipping_line"}
                                                    label={"Comment"}
                                                    placeholder={"Comment Here"}
                                                    isRequired={true}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center ml-auto mt-5">
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
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <ApproveModal 
                                isLoanOpen={isLoanOpen}
                                setIsLoanOpen={setIsLoanOpen}
                            />   
                            <DenyModal 
                                isDenyOpen={isDenyOpen}
                                setIsDenyOpen={setIsDenyOpen}
                            />  
                        </>
                        
                    )
                }
            </div>
        </div>
    )
}

export default SignOffForm;