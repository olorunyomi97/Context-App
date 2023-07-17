import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useSearchParams } from "react-router-dom";
import { connect } from "react-redux";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import ShipmentDetails from "components/shipment/ShipmentDetails";
import PrimaryButton from "components/buttons/PrimaryButton";
import arrowUp from "assets/icons/arrow-up.svg";
import movement from "assets/icons/movement.svg";

const LoanHistory = (props:any) => {
    const params = useParams();
    const { loading } = props;
    return (
        <>
        <div className="flex">
            <Aside activeTab="customer" />
            <div className="">
                <TopBar title={"Loan History"} />
                <div className="lg:px-14 lg:pt-10 container mx-auto  w-full">
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
                            <p className="admin-text black-text">Invoice No: {params.id} </p>
                            <div className="mt-5">
                                {/* desktop view  */}
                                <table className="desktop-only">
                                    <tr className="pb-5">
                                        <th className="admin-text grey-text uppercase text-xs font-semibold text-left pl-3 pb-3">Loan Number</th>
                                        <th className="admin-text grey-text mx-2 uppercase text-xs font-semibold text-left px-7 pb-3">Date  of Issue</th>
                                        {/* <th></th> */}
                                        <th className="admin-text grey-text mx-2 uppercase text-xs font-semibold text-left px-7 pb-3">Amount</th>
                                        {/* <th className="admin-text grey-text uppercase text-xs font-semibold text-left pb-3">date of issue</th> */}
                                        <th className="admin-text grey-text mx-2 uppercase text-xs font-semibold text-left px-7 pb-3">Provider</th>
                                        <th className="admin-text grey-text mx-2 uppercase text-xs font-semibold text-left px-7 pb-3">Extension Request</th>
                                        <th className="admin-text grey-text mx-2 uppercase text-xs font-semibold text-left px-7 pb-3">Status</th>
                                        <th className="admin-text grey-text mx-2 uppercase text-xs font-semibold text-left px-7 pb-3">Action</th>
                                        <th></th>
                                    </tr>
                                    <tr className="right-divider top-divider bottom-divider left-divider rounded w-full">
                                        <td className="py-5 pl-3">
                                            <div className="flex items-center">
                                                {/* <img src={arrowUp} alt="" width={40} height={40} className="bg-light-green p-2 rounded-full" /> */}
                                                <p className="ml-2 upload-text-2 black-text font-semibold text-sm">9Q193QNR</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mx-10">
                                                <p className="upload-text-2 black-text font-semibold text-sm"> Apr 02, 2022</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mx-5">
                                                <p className="upload-text-2 black-text font-semibold text-sm">2,570,000</p>
                                            </div>
                                        </td>
                                        <td>
                                            <p className=" mx-6 upload-text-2 black-text font-semibold text-sm">Extinversa</p>
                                        </td>
                                        <td>
                                            <p className="mx-10 upload-text-2 black-text font-semibold text-sm">12 Weeks</p>
                                        </td>
                                        <td>
                                        <Link to="#" className="bg-light-green upload-text-2 black-text-2 text-sm py-2 px-2 green-text mx-5 text-center rounded-full">
                                            Approved
                                        </Link>
                                        </td>
                                        <td>
                                            <Link 
                                                to="" 
                                                className="mx-5 bg-green white-text text-sm py-3 px-4 w-full rounded mr-3"
                                                onClick={() => {
                                                    window.location.href = `/customer-shipment-details/extinversa-loan-summary/${params.id}`
                                                }}
                                            >
                                            <small>View Details</small>
                                            </Link>
                                        </td>
                                    </tr>

                                    <tr className="right-divider top-divider bottom-divider left-divider rounded w-full">
                                        <td className="py-5 pl-3">
                                            <div className="flex items-center">
                                                {/* <img src={arrowUp} alt="" width={40} height={40} className="bg-light-green p-2 rounded-full" /> */}
                                                <p className="ml-2 upload-text-2 black-text font-semibold text-sm">9Q193QNR</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mx-10">
                                                <p className="upload-text-2 black-text font-semibold text-sm"> Apr 02, 2022</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mx-5">
                                                <p className="upload-text-2 black-text font-semibold text-sm">2,570,000</p>
                                            </div>
                                        </td>
                                        <td>
                                            <p className=" mx-6 upload-text-2 black-text font-semibold text-sm">Traction</p>
                                        </td>
                                        <td>
                                            <p className="mx-10 upload-text-2 black-text font-semibold text-sm">12 Weeks</p>
                                        </td>
                                        <td>
                                        <Link to="#" className="bg-light-green upload-text-2 black-text-2 text-sm py-2 px-2 green-text mx-5 text-center rounded-full">
                                            Approved
                                        </Link>
                                        </td>
                                        <td>
                                            <Link 
                                                to="" 
                                                className="mx-5 bg-green white-text text-sm py-3 px-4 w-full rounded mr-3"
                                                onClick={() => {
                                                    window.location.href = `/customer-shipment-details/traction-loan-summary/${params.id}`
                                                }}
                                            >
                                            <small>View Details</small>
                                            </Link>
                                        </td>
                                    </tr>

                                    <tr className="right-divider top-divider bottom-divider left-divider rounded w-full">
                                        <td className="py-5 pl-3">
                                            <div className="flex items-center">
                                                {/* <img src={arrowUp} alt="" width={40} height={40} className="bg-light-green p-2 rounded-full" /> */}
                                                <p className="ml-2 upload-text-2 black-text font-semibold text-sm">9Q193QNR</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mx-10">
                                                <p className="upload-text-2 black-text font-semibold text-sm"> Apr 02, 2022</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="mx-5">
                                                <p className="upload-text-2 black-text font-semibold text-sm">2,570,000</p>
                                            </div>
                                        </td>
                                        <td>
                                            <p className=" mx-6 upload-text-2 black-text font-semibold text-sm">OnePort365</p>
                                        </td>
                                        <td>
                                            <p className="mx-10 upload-text-2 black-text font-semibold text-sm">12 Weeks</p>
                                        </td>
                                        <td>
                                        <Link to="#" className="bg-light-red upload-text-2 black-text-2 text-sm py-2 px-2 red-text mx-5 text-center rounded-full">
                                            Denied
                                        </Link>
                                        </td>
                                        <td>
                                            <Link 
                                                to="" 
                                                className="mx-5 bg-green white-text text-sm py-3 px-4 w-full rounded mr-3"
                                                // onClick={() => {
                                                //     window.location.href = `/customer-shipment-details/oneport-loan-summary/${params.id}`
                                                // }}
                                                onClick={() => {
                                                    window.location.href = `/customer-shipment-details/oneport-loan-summary/${params.id}?&sheet_section=company_details`
                                                }}
                                                
                                            >
                                            <small>View Details</small>
                                            </Link>
                                        </td>
                                    </tr>
                                
                                </table>
                            </div>
                        </>
                    )}
                </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default LoanHistory