import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useSearchParams } from "react-router-dom";
import { connect } from "react-redux";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import ShipmentDetails from "components/shipment/ShipmentDetails";
import PrimaryButton from "components/buttons/PrimaryButton";
import Iframe from "react-iframe";

const ViewInvoice = (props: any) => {
    const params = useParams();
    const { loading } = props;
    return (
        <>
        <div className="flex">
            <Aside activeTab="customer" />
            <div className="">
                <TopBar title={"Customers"} />
                <div className="dashboard-content mb-10">
                    {loading ? (
                        <div className="text-center my-3 ml-5">
                            <Link to="#" className="text-success">
                                {/* @ts-ignore */}
                                <PrimaryButton title="Loading Invoice" loading={loading} />
                            </Link>
                        </div>
                    ) : (
                        <>
                            <>
                                <div className=" px-7 lg:px-14 lg:pt-10 container mx-auto w-full">
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            <Link
                                                to=""
                                                onClick={() => {
                                                    window.location.href = `/customers/customer-shipment-details/${params.id}`
                                                }}
                                            >
                                                <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                                            </Link>
                                            <p className="text-lg black-text font-semibold">Invoice Number: {params.id} </p>
                                        </div>
                                    </div>
                                    <div className="my-5 bg-grey rounded p-4"></div>
                                    <Iframe 
                                        width="100%" 
                                        height="800px" 
                                        url={'https://imageio.forbes.com/specials-images/dam/imageserve/1150881602/960x0.jpg?format=jpg&width=960'}
                                        allowFullScreen 
                                    />
                                </div>

                            </>
                        </>
                    )}
                </div>
            </div>
        </div>
    </>
    )
}

export default ViewInvoice