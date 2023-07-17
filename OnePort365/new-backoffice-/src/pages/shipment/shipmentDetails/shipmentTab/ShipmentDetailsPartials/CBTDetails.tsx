import React from 'react'


function CBTDetails(props: any) {
    const { single_shipment } = props;
    const single_shipment_data = single_shipment?.data?.data;
    console.log(single_shipment);
    console.log(single_shipment_data?.shipment_data?.pickup_location)
    const single_shipment_customs = single_shipment?.data?.data?.customs_brokerage_data;
    console.log(single_shipment_customs)

    return (
        <div>
            <p className="black-text text-base mt-10 mb-3 font-semibold">
                Custom Brokerage
            </p>
            {
                single_shipment_data?.shipment_data?.shipment_type === 'export' ? (
                    <>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Origin Port</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_data?.shipment_data?.origin_port_code === "" ? 'N/A' : single_shipment_data?.shipment_data?.origin_port_code}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Delivery Location</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_data?.shipment_data?.delivery_location === "" ? 'N/A' : single_shipment_data?.shipment_data?.delivery_location}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Consignee Name</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_customs?.consignee_name === "" ? 'N/A' : single_shipment_customs?.consignee_name}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Consignee Address</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_customs?.consignee_address === "" ? 'N/A' : single_shipment_customs?.consignee_address}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Mode Of Transportaion</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                    {single_shipment_customs?.mode_of_transport === "" ? 'N/A' : single_shipment_customs?.mode_of_transport}
                                </p>
                            </div>
                        </div>
                        {/* <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Brokerage Type</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                    {single_shipment_customs?.brokerage_type === "" ? 'N/A' : single_shipment_customs?.brokerage_type}
                                </p>
                            </div>
                        </div> */}
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Nepc Number</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_customs?.nepc_number === "" ? 'N/A' : single_shipment_customs?.nepc_number}
                                </p>
                            </div>
                        </div>
                    </>
                ) : single_shipment_data?.shipment_data?.shipment_type === 'import' ? (
                    <>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Pick Up Location</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_data?.shipment_data?.pickup_location === "" ? 'N/A' : single_shipment_data?.shipment_data?.pickup_location}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Destination Port</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_data?.shipment_data?.destination_port_code === "" ? 'N/A' : single_shipment_data?.shipment_data?.destination_port_code}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Sender Name</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_customs?.sender_name === "" ? 'N/A' : single_shipment_customs?.sender_name}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Sender Address</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_customs?.sender_address === "" ? 'N/A' : single_shipment_customs?.sender_address}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Mode Of Transportaion</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                    {single_shipment_customs?.mode_of_transport === "" ? 'N/A' : single_shipment_customs?.mode_of_transport}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Brokerage Type</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                    {single_shipment_customs?.brokerage_type === "" ? 'N/A' : single_shipment_customs?.brokerage_type}
                                </p>
                            </div>
                        </div>
                        {/* <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Nepc Number</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_customs?.nepc_number === "" ? 'N/A' : single_shipment_customs?.nepc_number}
                                </p>
                            </div>
                        </div> */}
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    )
}

export default CBTDetails
