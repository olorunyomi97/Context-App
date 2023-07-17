import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import PrimaryButton from "components/buttons/PrimaryButton";

const LoadTab = (props: any) => {
    const {customer_details} = props;
    console.log(customer_details);
    const params = useParams();
    return (
        <div>
            <p className="black-text font-semibold">Loan for {customer_details.company_name}</p>
            <div className="solid-br p-3 flex items-center rounded mb-2">
                <p className="black-text mt-2 mb-2">{params.id}01</p>
                <div className="ml-auto mr-3">
                    <Link 
                        className="bg-green py-2 px-4 white-text rounded cursor-pointer"
                        to=""
                        onClick={() => {
                            window.location.href = `/customer-shipment-details/loan-history/${params.id}`
                        }}
                    >
                        <small>View Loan History</small>
                    </Link>
                    
                </div>
                {/* <Link 
                    className="py-2 px-4 bg-green white-text rounded cursor-pointer"
                    to=""
                    onClick={() => {
                        window.location.href = `/customer-shipment-details/invoice/${params.id}`
                    }}
                >
                    <small>View Invoice</small>
                </Link> */}
            </div>
        </div>
    )
}

export default LoadTab;