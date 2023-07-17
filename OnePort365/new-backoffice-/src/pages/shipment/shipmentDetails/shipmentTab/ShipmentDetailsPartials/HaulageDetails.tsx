import React from "react";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import Moment from "react-moment";


function HaulageDetails(props: any) {
    const { single_shipment } = props;
    console.log(single_shipment?.data?.data);
    const single_shipment_data = single_shipment?.data?.data?.shipment_data;
    console.log("single-shipment-data", single_shipment_data);

    return (
        <div>
            {/* HAULAGE DETAILS */}

            {single_shipment_data?.shipment_type === "export" && single_shipment_data?.shipment_transport_type === "haulage" ? (
                <>
                    <p className="black-text text-base mt-10 mb-3 font-semibold">
                        Haulage Details
                    </p>

                    <div className="top-divider left-divider right-divider bottom-divider ">
                        <div className="grid grid-cols-2">
                            <p className="black-text text-sm py-3 px-5 ">
                                Stuffing Location
                            </p>
                            <p className="black-text text-sm left-divider py-3 px-5 ">
                                {single_shipment_data?.stuffing_location}
                            </p>
                        </div>
                    </div>

                    <div className="top-divider left-divider right-divider bottom-divider ">
                        <div className="grid grid-cols-2">
                            <p className="black-text text-sm py-3 px-5 ">Port of Loading</p>
                            <p className="black-text text-sm left-divider py-3 px-5 ">
                                {single_shipment_data?.origin_port_code}
                            </p>
                        </div>
                    </div>

                    <div className="top-divider left-divider right-divider bottom-divider ">
                        <div className="grid grid-cols-2">
                            <p className="black-text text-sm py-3 px-5 ">
                                Terminal Location
                            </p>
                            <p className="black-text text-sm left-divider py-3 px-5 ">
                                {single_shipment_data?.terminal_port}
                            </p>
                        </div>
                    </div>
                </>
            ) : single_shipment_data?.shipment_type === "import" && single_shipment_data?.shipment_transport_type === "haulage" ? (
                <>
                    <>
                        <p className="black-text text-base mt-10 mb-3 font-semibold">
                            Haulage Details
                        </p>

                        <div className="top-divider left-divider right-divider bottom-divider ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">
                                    Haulage Port of Discharge
                                </p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_data?.pickup_location}
                                </p>
                            </div>
                        </div>

                        <div className="top-divider left-divider right-divider bottom-divider ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">
                                    Haulage Destination
                                </p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_data?.delivery_location}
                                </p>
                            </div>
                        </div>
                        <>
                            <p className="black-text text-base mt-10 mb-3 font-semibold">
                                Additional Details
                            </p>
                            {
                                single_shipment_data?.with_tbl === false ? (
                                    <>
                                        <>
                                            {/* <div className="top-divider left-divider right-divider bottom-divider ">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">
                                                        TBL was not selected
                                                    </p>
                                                    <p className="black-text text-sm left-divider py-3 px-5">
                                                        No Services Added
                                                    </p>
                                                </div>
                                            </div> */}
                                            <div className="top-divider left-divider right-divider bottom-divider ">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">
                                                        TBL
                                                    </p>
                                                    <p className="black-text text-sm left-divider py-3 px-5">
                                                        {single_shipment_data?.with_tbl === true ? "Yes" : "TBL Was Not Selected"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="top-divider left-divider right-divider bottom-divider ">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">
                                                        TBL Type
                                                    </p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                                        {single_shipment_data?.tbl_type === '' ? ' TBL Type Was Not Selected' : single_shipment_data?.tbl_type}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="top-divider left-divider right-divider bottom-divider ">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">
                                                        Customs Brokerage
                                                    </p>
                                                    <p className="black-text text-sm left-divider py-3 px-5">
                                                        {single_shipment_data?.customs_brokerage === false ? 'Customs Brokerage Was Not Selected' : single_shipment_data?.customs_brokerage}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="top-divider left-divider right-divider bottom-divider ">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">
                                                        Brokerage Type
                                                    </p>
                                                    <p className="black-text text-sm left-divider py-3 px-5">
                                                        {single_shipment_data?.brokerage_type === '' ? 'Brokerage Type Was Not Selected' : single_shipment_data?.brokerage_type}
                                                    </p>
                                                </div>
                                            </div>

                                        </>
                                    </>
                                ) : single_shipment_data?.with_tbl === true ? (
                                    <>
                                        <div className="top-divider left-divider right-divider bottom-divider ">
                                            <div className="grid grid-cols-2">
                                                <p className="black-text text-sm py-3 px-5 ">
                                                    TBL
                                                </p>
                                                <p className="black-text text-sm left-divider py-3 px-5">
                                                    {single_shipment_data?.with_tbl === true ? "Yes" : "No"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="top-divider left-divider right-divider bottom-divider ">
                                            <div className="grid grid-cols-2">
                                                <p className="black-text text-sm py-3 px-5 ">
                                                    TBL Type
                                                </p>
                                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                                    {single_shipment_data?.tbl_type === '' ? ' TBL Was Not Selected' : single_shipment_data?.tbl_type}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="top-divider left-divider right-divider bottom-divider ">
                                            <div className="grid grid-cols-2">
                                                <p className="black-text text-sm py-3 px-5 ">
                                                    Customs Brokerage
                                                </p>
                                                <p className="black-text text-sm left-divider py-3 px-5">
                                                    {single_shipment_data?.customs_brokerage === true ? "Yes" : "No"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="top-divider left-divider right-divider bottom-divider ">
                                            <div className="grid grid-cols-2">
                                                <p className="black-text text-sm py-3 px-5 ">
                                                    Brokerage Type
                                                </p>
                                                <p className="black-text text-sm left-divider py-3 px-5">
                                                    {single_shipment_data?.brokerage_type === '' ? 'Customs Brokerage Was Not Selected' : single_shipment_data?.brokerage_type}
                                                </p>
                                            </div>
                                        </div>

                                    </>
                                ) : (
                                    <></>
                                )
                            }

                        </>
                    </>
                </>
            ) : (
                <></>
            )}

        </div>
    )
}

export default HaulageDetails
