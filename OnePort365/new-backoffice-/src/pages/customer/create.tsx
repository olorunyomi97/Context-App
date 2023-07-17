import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import CustomInput from "components/textInputs/CustomInput";
import CustomPhoneInput from "../../components/textInputs/CustomPhoneInput";
import CustomGoogleInput from "../../components/textInputs/CustomGoogleInput";
import CustomRadio from "components/selectInputs/CustomRadio";
import userIcon from "assets/icons/user-plus.svg";
import { createCustomer, CustomerApiError } from "store/actions";
import "../../index.css"

const CreateCustomer = (props: any) => {
    const [openAside, SetOpenAside] = useState(false);
    const { handleSubmit, control, formState: { errors }} = useForm();
    const { createCustomer, loading } = props;
    const [error, seterror] = useState(null);
    const [companyStructure, setCompanyStructure] = useState(false);
    
    const onSubmit = (data: any) => {
        let phone_details = data.phone;
        data.phone = phone_details.phone;
        data.phone_code = phone_details.country_code;
        data.company_address = data.company_address.label;
        data.enterprise = companyStructure;

        console.log(data);
        createCustomer(data, "/customers")
    }

  return (
    <div className="flex">
		    <Aside 
                activeTab="customer" 
                openAside={openAside}
                SetOpenAside={SetOpenAside}
            />
		<div className="">
            <TopBar title={"Customers"} SetOpenAside={SetOpenAside}/>
            <div className="">
                    <div className="lg:mt-10 lg:pl-14 create-card create-card-mobile">
                        <div className="flex items-center">
                            <Link to="/customers">
                                <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                            </Link>
                            <p className="text-lg black-text font-semibold">Add Customer</p>
                        </div>

                        <div className="mt-7">
                            {error ? (
                                <p className="bg-error p-3 text-center black-text text-sm my-4 rounded">
                                    {error}
                                </p>
                            ) : (
                                <div></div>
                            )}
                            <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
                                <div className="">
                                    <div className="grid grid-cols-2">
                                        <div className="mr-1">
                                            <CustomInput
                                                control={control}
                                                name={"firstname"}
                                                id={"firstname"}
                                                label={"First name"}
                                                placeholder={"Enter your first name"}
                                                isRequired={false}
                                                type={"text"}
                                                errors={errors}
                                                isDisabled={false}
                                                defaultValue={""}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            />
                                        </div>

                                        <div className="ml-1">
                                            <CustomInput
                                                control={control}
                                                name={"lastname"}
                                                id={"lastname"}
                                                label={"Last name"}
                                                placeholder={"Enter your last name"}
                                                isRequired={false}
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

                                    <div className="">
                                        <CustomInput
                                            control={control}
                                            name={"company_name"}
                                            id={"company_name"}
                                            label={"Company name"}
                                            placeholder={"Enter your company name"}
                                            isRequired={false}
                                            type={"text"}
                                            errors={errors}
                                            isDisabled={false}
                                            defaultValue={""}
                                            min={""}
                                            max={""}
                                            icon={""}
                                        />
                                    </div>

                                    <div className="">
                                        <CustomGoogleInput
                                            icon=""
                                            control={control}
                                            name={"company_address"}
                                            id={"company_address"}
                                            label={"Company address"}
                                            placeholder={"Enter your company address"}
                                            isRequired={false}
                                            errors={errors}
                                            isDisabled={false}
                                            defaultValue={""}
                                        />
                                    </div>

                                    <div className="">
                                        <CustomInput
                                            control={control}
                                            name={"email"}
                                            id={"email"}
                                            label={"Email Address"}
                                            placeholder={"Enter your email"}
                                            isRequired={false}
                                            type={"email"}
                                            errors={errors}
                                            isDisabled={false}
                                            defaultValue={""}
                                            min={""}
                                            max={""}
                                            icon=""
                                        />
                                    </div>

                                    <div className="">
                                        <CustomPhoneInput
                                            control={control}
                                            name={"phone"}
                                            id={"phone"}
                                            label={"Phone number"}
                                            isRequired={false}
                                            defaultValue={""}
                                            placeholder={"Enter your phone number"}
                                            isDisabled={false}
                                            errors={errors}
                                        />
                                    </div>

                                    {/* <div className="mt-2">
                                        <p className="text-sm black-text mb-2"><small>Company Structure</small></p>
                                        <div className="grid grid-cols-2">
                                            <div className="mr-1">
                                                <CustomRadio 
                                                    selected={companyStructure === true ? true : false} 
                                                    label={"Enterprise"} 
                                                    onClick={() => setCompanyStructure(true)} 
                                                />
                                            </div>

                                            <div className="ml-1">
                                                <CustomRadio 
                                                    selected={companyStructure === false ? true : false} 
                                                    label={"Non-Enterprise"} 
                                                    onClick={() => setCompanyStructure(false)} 
                                                />
                                            </div>
                                        </div>
                                    </div> */}

                                    <div className="w-20">
                                        {" "}
                                        {/* @ts-ignore */}
                                        <PrimaryButton title="Save" loading={loading} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
		</div>
    </div>
  );
};

// export default CreateCustomer;

const mapStateToProps = (state: any) => {
    const { customers, error, loading } = state.customers;
    return { customers, error, loading };
};

export default connect(mapStateToProps, {createCustomer,CustomerApiError})(CreateCustomer);
