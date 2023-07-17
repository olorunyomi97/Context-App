import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import PrimaryButton from "components/buttons/PrimaryButton";

const Collection = (props:any) => {
    const params = useParams();
    const { loading } = props;
    return (
        <div className="mr-10">
            <div>
                <div className='dashbaord-content-scroll'>
                    <div className="">
                        <div className="dashbaord-content-scroll container mx-10 w-full" style={{marginBottom: '50px'}}>
                            <div className="flex items-center mb-3">
                                <div className="flex items-center">
                                    <Link 
                                        to=""
                                        // to={`/accepted-quote-details/${params.id}`}
                                        onClick={() => {
                                            window.location.href = `/customer-shipment-details/loan-history/${params.id}`
                                        }}
                                    >
                                        <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                                    </Link>
                                </div>
                                <h3 className="font-semibold black-text">Loan ID: {params.id}</h3>
                            </div>

                            {loading ? (
                                <div className="text-center my-3 ml-5">
                                    <Link to="#" className="text-success">
                                        {/* @ts-ignore */}
                                        <PrimaryButton title="Loading" loading={loading} />
                                    </Link>
                                </div>
                            ) : ( 
                                <>
                                    <div className="solid-br p-4 flex items-center mt-5">
                                        <p className="black-text ml-3 font-semibold text-sm">
                                            Collection / Pick Up
                                        </p>
                                    </div>
                                    <> 
                                        <div className="rounded overflow-hidden">
                                            <div className="px-6 py-1 right-divider bottom-divider left-divider w-full">
                                                <div className="flex items-center mb-3 mt-3">
                                                    <p className="text-base black-text upload-text-2">Registered Company Name</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-3 px-4 w-full flex">
                                                            {/* {
                                                                datasheet_data['data']?.['data']?.['datasheet_section'] == null ? (
                                                                    <>
                                                                        N/A
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {datasheet_data['data']?.['data']?.['datasheet_section'].company_name}
                                                                    </>
                                                                )
                                                            } */}
                                                            
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center mb-3">
                                                    <p className="text-base black-text upload-text-2">Physical Address</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-3 px-4 w-full flex">
                                                        {/* {
                                                            datasheet_data['data']?.['data']?.['datasheet_section'] == null ? (
                                                                <>
                                                                    N/A
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {datasheet_data['data']?.['data']?.['datasheet_section'].postal_code}
                                                                </>
                                                            )
                                                        } */}
                                                            
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center mb-3">
                                                    <p className="text-base black-text upload-text-2">City</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-3 px-4 w-full flex">
                                                            
                                                            {/* {
                                                                datasheet_data['data']?.['data']?.['datasheet_section'] == null ? (
                                                                    <>
                                                                        N/A
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {datasheet_data['data']?.['data']?.['datasheet_section'].contact_person}
                                                                    </>
                                                                )
                                                            } */}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center mb-3">
                                                    <p className="text-base black-text upload-text-2">State</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-3 px-4 w-full flex">
                                                            {/* {
                                                                datasheet_data['data']?.['data']?.['datasheet_section'] == null ? (
                                                                    <>
                                                                        N/A
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {datasheet_data['data']?.['data']?.['datasheet_section'].contact_person_email}
                                                                    </>
                                                                )
                                                            } */}
                                                            
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center mb-3">
                                                    <p className="text-base black-text upload-text-2">Phone Number</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-3 px-4 w-full flex">
                                                            {/* {
                                                                datasheet_data['data']?.['data']?.['datasheet_section'] == null ? (
                                                                    <>
                                                                        N/A
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {datasheet_data['data']?.['data']?.['datasheet_section'].contact_person_phone}
                                                                    </>
                                                                )
                                                            } */}
                                                            
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center mb-3">
                                                    <p className="text-base black-text upload-text-2">Time for Pick-Up and Deliveries</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-3 px-4 w-full flex">
                                                            {/* {
                                                                datasheet_data['data']?.['data']?.['datasheet_section'] == null ? (
                                                                    <>
                                                                        N/A
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {datasheet_data['data']?.['data']?.['datasheet_section'].tax_id}
                                                                    </>
                                                                )
                                                            } */}
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center mb-3">
                                                    <p className="text-base black-text upload-text-2">Please confirm if you work on saturdays</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-3 px-4 w-full flex">
                                                            {/* {
                                                                datasheet_data['data']?.['data']?.['datasheet_section'] == null ? (
                                                                    <>
                                                                        N/A
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {datasheet_data['data']?.['data']?.['datasheet_section'].tax_id}
                                                                    </>
                                                                )
                                                            } */}
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </>
                                </>
                            )
                        }
                            
                        </div>
                    </div>

                </div>
                
            </div>
        </div>

    )
}


export default Collection