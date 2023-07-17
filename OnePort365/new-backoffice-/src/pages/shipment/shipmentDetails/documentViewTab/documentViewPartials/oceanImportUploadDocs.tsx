import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomDnD from "components/customDnD/CustomDnD";
import CustomDocsDnD from "components/customDocsDnD/customDocsDnd";
import { getSingleShipment, uploadShipmentDocs } from "store/actions";
import Moment from "react-moment";

const OceanImportUploadDocs = (props: any) => {
    const { loading, single_shipment_data } = props;
    const uploadDocData = single_shipment_data?.document_details
    const uploadDocDataReversed = [...uploadDocData].reverse();

    const uniqueDocumentNames = [];
    const uniqueDocs = uploadDocDataReversed.filter(element => {
        // @ts-ignore
        const isDuplicate = uniqueDocumentNames.includes(element.document_name);
        if (!isDuplicate) {
            // @ts-ignore
            uniqueDocumentNames.push(element.document_name);

            return true;
        }

        return false;
    })

    console.log(uniqueDocs);
    return (
        <div>
            {
                loading ? (
                    <div className="text-center my-3 ml-5">
                        <Link to="#" className="text-success">
                            {/* @ts-ignore */}
                            <PrimaryButton title="Loading" loading={loading} />
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="lg:grid lg:grid-cols-3 gap-4 mobile-padding">
                            <div className="lg:col-span-2">
                                <div className="solid-br p-4 flex items-center mt-5">
                                    <p className="black-text ml-3 font-semibold text-sm">
                                        Documents Upload History
                                    </p>
                                </div>

                                <div className="rounded overflow-hidden">
                                    {
                                        uploadDocData.length === 0 ? (
                                            <p>No Document Uploaded Yet.</p>
                                        ) : (
                                            <div className="px-6 py-1 right-divider bottom-divider left-divider w-full">
                                                {
                                                    uniqueDocs?.map((uploadDocDataReversed, index) => {
                                                        return (
                                                            <>
                                                                <>
                                                                    <div className="flex items-center mb-3 mt-3" key={index}>
                                                                        <p className="green-text text-sm py-3 px-4 w-full flex">
                                                                            <p
                                                                                className="green-text"
                                                                            // href={data?.document_location}
                                                                            // target="_blank"
                                                                            >
                                                                                {uploadDocDataReversed?.document_name}&nbsp;<small className='grey-text'>Uploaded at <Moment format="DD-MM-YYYY hh:ss a">{uploadDocDataReversed?.createdAt}</Moment></small>
                                                                            </p>
                                                                        </p>
                                                                        <div className="ml-auto">
                                                                            {
                                                                                uploadDocDataReversed?.document_name === undefined || null ? (
                                                                                    'Document Not Uploaded'
                                                                                ) : (
                                                                                    <a
                                                                                        className="green-text"
                                                                                        href={uploadDocDataReversed?.document_location}
                                                                                        target="_blank"
                                                                                    >
                                                                                        <a
                                                                                            href={uploadDocDataReversed?.document_location}
                                                                                            className="solid-br py-2 px-3 rounded ml-auto text-sm black-text"
                                                                                            target="_blank"
                                                                                        >
                                                                                            View
                                                                                        </a>
                                                                                    </a>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </>

                                                            </>
                                                        )

                                                    })
                                                }



                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                    </>
                )
            }
        </div>
    )
}


export default OceanImportUploadDocs 