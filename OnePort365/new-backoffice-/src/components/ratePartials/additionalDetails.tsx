import React from 'react';
import Moment from 'react-moment';
// import lockIcon from "assets/icons/lock.svg";
// import { connect } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { getSingleQuote } from "store/actions";


    const AdditionalDetails = (props:any) => {
        const { single_quote } = props;
        console.log(single_quote[0].warehousing)
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
                Additional Details
            </p>
        </div>
        {/* {
            single_quote?.data?.data.map((data) => {
                return ( */}
                    <> 
                        <div className="rounded overflow-hidden">
                            <div className="px-6 py-1 right-divider bottom-divider left-divider w-full">
                                <div className="flex items-center">
                                    <p className="text-base black-text upload-text-2">Do you need warehousing?</p>
                                    <div className="ml-auto">
                                        <p  className="black-text text-sm py-3 px-4 w-full flex">
                                        {single_quote[0].warehousing === true
                                            ? 'Yes'
                                            : 'No'
                                        }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-base black-text upload-text-2">Insurance Option</p>
                                    <div className="ml-auto">
                                        <p  className="black-text text-sm py-3 px-4 w-full flex">
                                            {single_quote[0].insurance === true
                                                ? 'Yes'
                                                : 'No'
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-base black-text upload-text-2">Duration</p>
                                    <div className="ml-auto">
                                        <p  className="black-text text-sm py-3 px-4 w-full flex">
                                            {single_quote[0].warehousing_duration}week(s)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-base black-text upload-text-2">Pickup date</p>
                                    <div className="ml-auto">
                                        <p  className="black-text text-sm py-3 px-4 w-full flex">
                                        <Moment format="DD-MM-YYYY">{single_quote[0].shipment_pickup_date}</Moment>
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

export default AdditionalDetails;