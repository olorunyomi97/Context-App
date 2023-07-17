import React from "react";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import Moment from "react-moment";



function OceanFreightDetails(props: any) {
    const { single_shipment } = props;
    console.log(single_shipment?.data?.data);
    const single_shipment_data = single_shipment?.data?.data?.shipment_data;
    console.log("single-shipment-data", single_shipment_data);


    return (
        <div>
            {
                single_shipment_data?.shipment_type === "export" && single_shipment_data?.shipment_transport_type === "ocean_freight" ? (

                    <>
                        {/* Ocean Freight With Haulage */}
                        <p className="black-text text-base mt-10 mb-3 font-semibold">
                            Ocean Freight Locations; Haulage Included
                        </p>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Origin Port</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_data?.origin_port_code}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Destination Port</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_data?.destination_port_code}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Haulage Pick Up Location</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {
                                        single_shipment_data?.with_haulage === false ? (
                                            <>
                                                Haulage Not Selected
                                            </>
                                        ) : (
                                            <>
                                                {single_shipment_data?.pickup_location}
                                            </>
                                        )
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Haulage Drop Off Location</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {
                                        single_shipment_data?.with_haulage === false ? (
                                            <>
                                                Haulage Not Selected
                                            </>
                                        ) : (
                                            <>
                                                {single_shipment_data?.origin_port_code}
                                            </>
                                        )
                                    }
                                </p>
                            </div>
                        </div>

                    </>
                ) : (
                    <></>
                )
            }

            {/* Ocean & Import details */}
            {
                single_shipment_data?.shipment_type === "import" && single_shipment_data?.shipment_transport_type === "ocean_freight" ? (
                    <>
                        <>
                            {/* Ocean Freight With Haulage */}
                            <p className="black-text text-base mt-10 mb-3 font-semibold">
                                Ocean Freight Locations; Haulage Included
                            </p>
                            <div className="solid-br ">
                                <div className="grid grid-cols-2">
                                    <p className="black-text text-sm py-3 px-5 ">Port of Discharge</p>
                                    <p className="black-text text-sm left-divider py-3 px-5 ">
                                        {single_shipment_data?.port_of_discharge}
                                    </p>
                                </div>
                            </div>
                            <div className="solid-br ">
                                <div className="grid grid-cols-2">
                                    <p className="black-text text-sm py-3 px-5 ">Delivery Location</p>
                                    <p className="black-text text-sm left-divider py-3 px-5 ">
                                        {single_shipment_data?.delivery_location}
                                    </p>
                                </div>
                            </div>
                            <div className="solid-br ">
                                <div className="grid grid-cols-2">
                                    <p className="black-text text-sm py-3 px-5 ">Haulage Drop off Location</p>
                                    <p className="black-text text-sm left-divider py-3 px-5 ">
                                        {
                                            single_shipment_data?.with_haulage === false ? (
                                                <>
                                                    Haulage Not Selected
                                                </>
                                            ) : (
                                                <>
                                                    {single_shipment_data?.port_of_discharge}
                                                </>
                                            )
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="solid-br ">
                                <div className="grid grid-cols-2">
                                    <p className="black-text text-sm py-3 px-5 ">Haulage Delivery Location</p>
                                    <p className="black-text text-sm left-divider py-3 px-5 ">
                                        {
                                            single_shipment_data?.with_haulage === false ? (
                                                <>
                                                    Haulage Not Selected
                                                </>
                                            ) : (
                                                <>
                                                    {single_shipment_data?.delivery_location}
                                                </>
                                            )
                                        }
                                    </p>
                                </div>
                            </div>

                        </>

                        <p className="black-text text-base mt-10 mb-3 font-semibold">
                            Customs Brokerage Additional Details
                        </p>
                        {
                            single_shipment_data?.customs_brokerage === false ? (
                                <>
                                    <div className="top-divider left-divider right-divider bottom-divider rounded-t-lg">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">
                                                Customs Brokerage was not selected
                                            </p>
                                            <p className="black-text text-sm left-divider py-3 px-5">
                                                No Customs Brokerage Services Added
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>

                                    <div className="top-divider left-divider right-divider bottom-divider rounded-t-lg">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">
                                                Fast Track License
                                            </p>
                                            {
                                                single_shipment_data?.brokerage_type === "Fast Track CBT" ? (
                                                    <>
                                                        <p className="black-text text-sm left-divider py-3 px-5 ">
                                                            Yes
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="black-text text-sm left-divider py-3 px-5 ">
                                                            No
                                                        </p>
                                                    </>
                                                )
                                            }

                                        </div>
                                    </div>
                                    <div className="top-divider left-divider right-divider bottom-divider rounded-t-lg">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">
                                                Brokerage Type
                                            </p>
                                            <p className="black-text text-sm left-divider py-3 px-5">
                                                {single_shipment_data?.brokerage_type}
                                            </p>
                                        </div>
                                    </div>

                                    {/* TBL */}
                                    <div className="top-divider left-divider right-divider bottom-divider rounded-t-lg">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">
                                                TBL
                                            </p>
                                            <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                                {single_shipment_data?.with_tbl === false ? "No" : "Yes"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="top-divider left-divider right-divider bottom-divider rounded-t-lg">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">
                                                TBL Type
                                            </p>
                                            <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                                {/* {single_shipment_data?.tbl_type === "" ? "TBL Type Not Selected" : single_shipment_data?.tbl_type} */}
                                                {single_shipment_data?.with_tbl === false ? "TBL Type Not Selected" : single_shipment_data?.tbl_type}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )
                        }


                    </>
                ) : (
                    <></>
                )
            }
        </div>
    )
}

export default OceanFreightDetails
