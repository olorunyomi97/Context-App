import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import CustomInput from "components/textInputs/CustomInput";
import CustomPhoneInput from "../../components/textInputs/CustomPhoneInput";
import CustomGoogleInput from "../../components/textInputs/CustomGoogleInput";
import CustomRadio from "components/selectInputs/CustomRadio";
import { updateCustomer, getSingleCustomer, CustomerApiError } from "store/actions";
import "../../index.css"

const EditCustomer = (props: any) => {
    const params = useParams();
    const [openAside, SetOpenAside] = useState(false);
    const { handleSubmit, control, reset, formState: { errors }} = useForm();
    const [error, seterror] = useState(null);
    const { single_customer, loading } = props;

    useEffect(() => {
		props.getSingleCustomer(params.id, reset);
	},[]);
    

    // console.log(single_customer?.data?.data?.customer_data)
    const customer_default_data = single_customer?.data?.data?.customer_data;
    // console.log(customer_default_data)

    const onSubmit = (data: any) => {
        let phone_details = data.phone;
        data.phone = phone_details.phone;
        data.phone_code = phone_details.country_code;

        const newData = {
            id: params.id,
        };

        console.log(data);
        props.updateCustomer(newData, data)
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
                            <Link 
                                to=""
                                onClick={() => {
                                    // window.location.href = `/customers/customer-shipment/${params.id}`
                                    window.location.href = `/customers`
                                }}
                            >
                                <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                            </Link>
                            <p className="text-lg black-text font-semibold">Edit Customer</p>
                        </div>
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
                                                            isRequired={true}
                                                            type={"text"}
                                                            errors={errors}
                                                            isDisabled={false}
                                                            defaultValue={customer_default_data?.firstname}
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
                                                            isRequired={true}
                                                            type={"text"}
                                                            errors={errors}
                                                            isDisabled={false}
                                                            defaultValue={customer_default_data?.lastname}
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
                                                        isRequired={true}
                                                        type={"text"}
                                                        errors={errors}
                                                        isDisabled={false}
                                                        defaultValue={customer_default_data?.company_name}
                                                        min={""}
                                                        max={""}
                                                        icon={""}
                                                    />
                                                </div>

                                                <div className="">
                                                    {/* <CustomGoogleInput */}
                                                    <CustomInput
                                                        control={control}
                                                        name={"company_address"}
                                                        id={"company_address"}
                                                        label={"Company address"}
                                                        placeholder={"Enter your company address"}
                                                        isRequired={true}
                                                        errors={errors}
                                                        isDisabled={false}
                                                        type={"text"}
                                                        defaultValue={customer_default_data?.company_address}
                                                        min={""}
                                                        max={""}
                                                        icon=""
                                                    />
                                                </div>

                                                <div className="">
                                                    <CustomInput
                                                        control={control}
                                                        name={"email"}
                                                        id={"email"}
                                                        label={"Email Address"}
                                                        placeholder={"Enter your email"}
                                                        isRequired={true}
                                                        type={"email"}
                                                        errors={errors}
                                                        isDisabled={false}
                                                        defaultValue={customer_default_data?.email}
                                                        min={""}
                                                        max={""}
                                                        icon=""
                                                    />
                                                </div>

                                                {/* <div className="">
                                                    <CustomInput
                                                        control={control}
                                                        name={"phone"}
                                                        id={"phone"}
                                                        label={"Phone number"}
                                                        isRequired={true}
                                                        defaultValue={customer_default_data?.['phone']}
                                                        placeholder={"Enter your phone number"}
                                                        isDisabled={false}
                                                        errors={errors}
                                                        type={"numeric"}
                                                        min={""}
                                                        max={""}
                                                        icon=""
                                                    />
                                                </div> */}

                                                <div>
                                                    <CustomPhoneInput
                                                        control={control}
                                                        name={"phone"}
                                                        id={"phone"}
                                                        label={"Phone number"}
                                                        isRequired={true}
                                                        defaultValue={customer_default_data?.phone}
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
                                </>
                            
                            }
                    </div>
                </div>
		    </div>
		</div>
  );
};

// export default EditCustomer;

const mapStateToProps = (state: any) => {
    const { single_customer, error, loading } = state.customers;
    return { single_customer, error, loading };
};

export default connect(mapStateToProps, {getSingleCustomer, updateCustomer, CustomerApiError})(EditCustomer);
