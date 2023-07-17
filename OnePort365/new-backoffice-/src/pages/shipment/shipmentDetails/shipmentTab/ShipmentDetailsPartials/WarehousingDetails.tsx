import React from 'react'


function WarehousingDetails(props: any) {
    const { single_shipment } = props;
    const single_shipment_data = single_shipment?.data?.data;
    console.log(single_shipment);
    console.log(single_shipment_data)
    const single_shipment_warehouse = single_shipment?.data?.data?.warehousing_data;

    return (
        <div>
            <p className="black-text text-base mt-10 mb-3 font-semibold">
                Warehousing
            </p>
            {
                single_shipment_data?.shipment_data?.shipment_type === 'export' ? (
                    <>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Port of Loading</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_data?.shipment_data?.port_of_loading === "" ? 'N/A' : single_shipment_data?.shipment_data?.port_of_loading}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Is Cargo Bagged</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_warehouse?.cargo_bagged === true ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Total Number of Bags</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_warehouse?.total_cargo_bags === null ? 'N/A' : single_shipment_warehouse?.total_cargo_bags}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Warehousing Duration</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_warehouse?.warehousing_duration === "" ? 'N/A' : single_shipment_warehouse?.warehousing_duration} (Weeks)
                                </p>
                            </div>
                        </div>
                    </>
                ) : single_shipment_data?.shipment_data?.shipment_type === 'import' ? (
                    <>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Port of Discharge</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_data?.shipment_data?.port_of_discharge === "" ? 'N/A' : single_shipment_data?.shipment_data?.port_of_discharge}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Is Cargo Bagged</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_warehouse?.cargo_bagged === true ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Total Number of Bags</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_warehouse?.total_cargo_bags === null ? 'N/A' : single_shipment_warehouse?.total_cargo_bags}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Warehousing Duration</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_shipment_warehouse?.warehousing_duration === "" ? 'N/A' : single_shipment_warehouse?.warehousing_duration}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                    </>
                )
            }
        </div>
    )
}

export default WarehousingDetails
