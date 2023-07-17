import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getSingleCustomer } from "store/actions";
import PrimaryButton from "components/buttons/PrimaryButton";

const ContactPersonDetails = (props: any) => {
    const params = useParams();
    const { loading, single_customer, single_quote } = props;
    console.log(single_quote)
    console.log(single_quote[0]?.['user_id']);
    const user_id = single_quote[0]?.['user_id']
    console.log(user_id)
    console.log(single_customer?.data?.data?.customer_data)
    const customer_data = single_customer?.data?.data?.customer_data

    useEffect(() => {
        props.getSingleCustomer(user_id)
    }, [getSingleCustomer]);

    return (
        <>
            <div className="solid-br p-4 flex items-center mt-2" style={{ backgroundColor: "#F9FAFB" }}>
                <p className="black-text ml-3 font-semibold text-sm">
                    Contact Person's Details
                </p>
            </div>
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
                        <>
                            <div className="rounded overflow-hidden">
                                <div className="px-6 py-4 right-divider top-divider bottom-divider left-divider rounded w-full" style={{ backgroundColor: "#F9FAFB" }}>
                                    <div className="flex items-center">
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

                                                    {
                                                        single_quote[0]?.['user_id'] == null || undefined ? (
                                                            <>Customer Details Unavailable</>
                                                        ) : (
                                                            <>
                                                                {/* <img src={`https://ui-avatars.com/api/?name=${customer_data.firstname + customer_data.lastname}`} height={50} width={50} className="rounded-full" /> */}
                                                                <div className="ml-4">
                                                                    {/* <label htmlFor="upload-image" className="green-text text-sm cursor-pointer">
                                                            <div className="customer-shipment mb-0">{customer_data.firstname}&nbsp;{customer_data.lastname}</div>
                                                            <p className="customer-shipment mb-0">{customer_data.email}</p>
                                                            <p className="customer-shipment mb-0">{customer_data.phone}</p>
                                                            <p className="customer-shipment mb-0">{customer_data.company_address}</p>
                                                        </label> */}
                                                                </div>
                                                                {/* <div className="p-4 rounded-full flex ml-auto">
                                                        <Link 
                                                            className="bg-green white-text text-sm px-2 w-full rounded mb-2 shipment-filter-button"
                                                            to={`/shipment-creation-for-customer?user_id=${customer_data._id}`}
                                                            state={{
                                                                firstname: customer_data.firstname,
                                                                lastname: customer_data.lastname,
                                                                data: customer_data._id
                                                            }}
                                                            
                                                        >
                                                            Add Shipment+
                                                        </Link>
                                                    </div> */}
                                                            </>
                                                        )
                                                    }

                                                </>

                                        }
                                    </div>

                                </div>
                            </div>
                            {/* <div className="rounded overflow-hidden">
                            <div className="px-6 py-1 right-divider bottom-divider left-divider w-full">
                                <div className="flex items-center">
                                    <p className="text-base black-text upload-text-2">Contact Person's Name</p>
                                    <div className="ml-auto">
                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                            {customer_data?.firstname} {customer_data?.lastname} 
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-base black-text upload-text-2">Contact Person's Company</p>
                                    <div className="ml-auto">
                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                            {customer_data?.company_name} 
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-base black-text upload-text-2">Company Person's Address</p>
                                    <div className="ml-auto">
                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                            {customer_data?.company_address}
                                            
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-base black-text upload-text-2">Company Person's Email</p>
                                    <div className="ml-auto">
                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                            {customer_data?.email}
                                            
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-base black-text upload-text-2">Company Person's Phone</p>
                                    <div className="ml-auto">
                                        <p  className="black-text text-sm py-2 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                            {customer_data?.phone}
                                            
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        </>
                    )
            }

        </>
    )
}

// export default ContactPersonDetails


const mapStateToProps = (state: any) => {
    const { loading, single_customer } = state.customers;
    return { loading, single_customer };
};

export default connect(mapStateToProps, { getSingleCustomer })(ContactPersonDetails);
