import React from 'react';
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PrimaryButton from "components/buttons/PrimaryButton";

const Document = (props: any) => {
    // const { single_quote, } = props;
    const { loading, single_quote, quote_document_data } = props;
    console.log(single_quote);
    console.log(quote_document_data);
    return (
        <>
            <div className="solid-br p-4 flex items-center mt-5" >
                <p className="black-text ml-3 font-semibold text-sm">
                    Documents
                </p>
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
                            {
                                single_quote[0]?.shipping_type == 'export' ? (
                                    <div className="rounded overflow-hidden">
                                        <div className="px-6 py-1 right-divider bottom-divider left-divider w-full">
                                            <div className="flex items-center">
                                                <p className="text-base black-text upload-text-2">NXP FORM</p>
                                                <div className="ml-auto">
                                                    <p  className="green-text text-sm py-3 px-4 w-full flex">
                                                    {quote_document_data[0]?.['document_location'] === undefined ? 
                                                    (
                                                        <>
                                                            N/A
                                                        </>
                                                    ) : (
                                                            <>
                                                                <a 
                                                                    className="green-text"
                                                                    href={quote_document_data[0]?.['document_location']}
                                                                    target="_blank"
                                                                >
                                                                    View
                                                                    {/* {quote_document_data[0]?.['document_location'] !==  undefined ? "View" : 'N/A'} */}
                                                                </a>
                                                            </>
                                                        )
                                                    }
                                                    
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <p className="text-base black-text upload-text-2">PFI FORM</p>
                                                <div className="ml-auto">
                                                    <p  className="green-text text-sm py-3 px-4 w-full flex">
                                                        {quote_document_data[1]?.['document_location'] === undefined ? 
                                                        (
                                                            <>
                                                                N/A
                                                            </>
                                                        ) : (
                                                                <>
                                                                    <a 
                                                                        className="green-text"
                                                                        href={quote_document_data[1]?.['document_location']}
                                                                        target="_blank"
                                                                    >
                                                                        View
                                                                        {/* {quote_document_data[1]?.['document_location'] !==  undefined ? "View" : 'N/A'} */}
                                                                    </a>
                                                                </>
                                                            )
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rounded overflow-hidden">
                                        <div className="px-6 py-1 right-divider bottom-divider left-divider w-full">
                                            <div className="flex items-center">
                                                <p className="text-base black-text upload-text-2">FORM_M FORM</p>
                                                <div className="ml-auto">
                                                    <p  className="green-text text-sm py-3 px-4 w-full flex">
                                                    {/* {single_quote[0].form_m_file === "true"
                                                        ? 'Did Not Upload'
                                                        : 'Uploaded Successfully'
                                                    } */}
                                                    {quote_document_data[0]?.['document_location'] === undefined ? 
                                                        (
                                                            <>
                                                                N/A
                                                            </>
                                                        ) : (
                                                                <>
                                                                    <a 
                                                                        className="green-text"
                                                                        href={quote_document_data[0]?.['document_location']}
                                                                        target="_blank"
                                                                    >
                                                                        View
                                                                        {/* {quote_document_data[1]?.['document_location'] !==  undefined ? "View" : 'N/A'} */}
                                                                    </a>
                                                                </>
                                                            )
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                                
                            </>
                    )
                
            }
        </>
    )
}

export default Document;