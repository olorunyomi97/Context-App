import React from 'react';
// import NumberFormat from 'react-number-format';
// import { connect } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { getSingleQuote } from "store/actions";

const Cargo = (props: any) => {
    const { single_quote } = props;
    // console.log(single_quote);
    // console.log(single_quote['data']?.['data']);
    // const quote_data = single_quote['data']?.['data']?.['quote_data'];
    // const quote_upload_data = single_quote['data']?.['data']?.['uploads_data'];
    // console.log(quote_data)
    // console.log(quote_upload_data)
    return (
        <>
            <div className="solid-br p-4 flex items-center mt-5" >
                <p className="black-text ml-3 font-semibold text-sm">
                    Cargo Details
                </p>
            </div>
            {/* {
            single_quote?.data?.data.map((data) => {
                return ( */}
            <>
                <div className="rounded overflow-hidden">
                    <div className="px-6 py-1 right-divider bottom-divider left-divider w-full">
                        <div className="flex items-center">
                            <p className="text-base black-text upload-text-2">No of Containers</p>
                            <div className="ml-auto">
                                <p className="black-text text-sm py-3 px-4 w-full flex">
                                    {single_quote[0].container_count}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <p className="text-base black-text upload-text-2">Size of Container</p>
                            <div className="ml-auto">
                                <p className="black-text text-sm py-3 px-4 w-full flex">
                                    {single_quote[0].container_size} feet
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <p className="text-base black-text upload-text-2">Goods Type</p>
                            <div className="ml-auto">
                                <p className="black-text text-sm py-3 px-4 w-full flex" style={{ textTransform: 'capitalize' }}>
                                    {single_quote[0].goods_type}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <p className="text-base black-text upload-text-2">Total Value of Goods</p>
                            <div className="ml-auto">
                                <p className="black-text text-sm py-3 px-4 w-full flex">


                                    {/* <NumberFormat value={single_quote[0].goods_value} displayType={'text'} thousandSeparator={true} prefix={'₦'} /> */}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <p className="text-base black-text upload-text-2">Cargo Description</p>
                            <div className="ml-auto">
                                <p className="black-text text-sm py-3 px-4 w-full flex">
                                    {single_quote[0].cargo_description}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </>
            {/* )
            }
        )} */}
        </>
    )
}

export default Cargo