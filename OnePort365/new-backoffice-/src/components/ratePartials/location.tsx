import React from 'react';
import { connect } from "react-redux";
import { getSingleQuote } from "store/actions";

const Location = (props: any) => {
    const { single_quote } = props;
    // console.log(single_quote);
    // console.log(single_quote['data']?.['data']);
    const quote_data = single_quote['data']?.['data']?.['quote_data'];
    const quote_upload_data = single_quote['data']?.['data']?.['uploads_data'];
    // console.log(quote_data)
    // console.log(quote_upload_data)

    return (
        <>
            <div className="solid-br p-4 flex items-center mt-5" >
                <p className="black-text ml-3 font-semibold text-sm">
                    Location
                </p>
            </div>
            {/* {
                single_quote?.data?.data.map((data) => {
                    return ( */}
                        <> 
                            {
                                quote_data[0].shipping_type == 'export' ? (
                                    <>
                                        <div className="rounded overflow-hidden">
                                            <div className="px-6 py-1 right-divider bottom-divider left-divider w-full">
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Type Of Shipment</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-3 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                        {quote_data[0].shipping_type}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">pickup Location</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-3 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            {quote_data[0].pickup_location}
                                                            {/* {quote_data?.['shipping_type'] === "export"
                                                                ? quote_data?.['pickup_location']
                                                                : quote_data?.['delivery_location']
                                                            } */}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Port Of Destination</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-3 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            {quote_data[0].destination_port}
                                                            {/* {quote_data?.['shipping_type'] === "export"
                                                                ? quote_data?.['destination_port']
                                                                : quote_data?.['origin_port']
                                                            } */}
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="rounded overflow-hidden">
                                            <div className="px-6 py-1 right-divider bottom-divider left-divider w-full">
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Type Of Shipment</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-3 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                        {quote_data[0].shipping_type}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Delivery Location</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-3 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            {quote_data[0].delivery_location}
                                                            {/* {quote_data?.['shipping_type'] === "export"
                                                                ? quote_data?.['pickup_location']
                                                                : quote_data?.['delivery_location']
                                                            } */}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base black-text upload-text-2">Origin Of Destination</p>
                                                    <div className="ml-auto">
                                                        <p  className="black-text text-sm py-3 px-4 w-full flex"style={{textTransform: 'capitalize'}}>
                                                            {quote_data[0].origin_port}
                                                            {/* {quote_data?.['shipping_type'] === "export"
                                                                ? quote_data?.['destination_port']
                                                                : quote_data?.['origin_port']
                                                            } */}
                                                            
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </>
                            
                    {/* )
                }
            )} */}
        </>
    )
}

// export default location;

const mapStateToProps = (state: any) => {
    const { single_quote, loading, attachQuote } = state.quotes;
    return { single_quote, loading, attachQuote };
};

export default connect(mapStateToProps, { getSingleQuote })(Location);

