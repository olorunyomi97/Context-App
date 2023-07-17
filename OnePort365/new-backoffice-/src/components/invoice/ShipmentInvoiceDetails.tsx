import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PrimaryButton from "components/buttons/PrimaryButton";
//icons
import arrowUp from "assets/icons/arrow-up.svg";
import arrowDown from "assets/icons/arrow-down.svg";
import movement from "assets/icons/movement.svg";
import "../../pages/shipment/index.css"
import Moment from 'react-moment';
import { getSingleInvoice } from 'store/actions';

const ShipmentDetails = (props: any) => {
    const { single_invoice, loading } = props
    const invoice_data = single_invoice['data']?.['data']?.['invoice_details'];
    const invoice_upload_data = single_invoice['data']?.['data']?.['invoice_uploads'];
    // console.log(invoice_data)
    // console.log(invoice_upload_data)
    return (
        
        <div>
            {
				loading ? 
				(
					<div className="text-center my-3">
						<Link to="#" className="text-success">
							{/* @ts-ignore */}
							<PrimaryButton title="Loading Quotes" loading={loading} />
						</Link>
					</div>
				) : <>
                        {
                            invoice_data[0].shipping_type == "export" ? (
                                <>
                                    <div className="grid grid-cols-3 items-center p-5 bg-green rounded-t-lg">
                                        <div className="flex items-center">
                                            <img src={arrowUp} alt="" width={40} height={40} className="bg-light-green p-2 rounded-full" />

                                            <p className="white-text ml-2"style={{textTransform: 'capitalize'}}>{invoice_data[0].shipping_type}</p>
                                        </div>
                                        <div className="text-center ">
                                            {/* <p className="white-text">Apr 02, 2022</p> */}
                                            <Moment className="white-text" format="DD-MM-YYYY">{invoice_data[0].createdAt}</Moment>
                                        </div>
                                        <div className="text-right">
                                            <p className="white-text text-xs opacity-75">Shipment ID</p>
                                            <p className="white-text">{invoice_data[0]._id}</p>
                                        </div>
                                    </div>
                                    {/* <div className="bg-spiral"></div> */}
                                    <div className="bg-light-green  grid grid-cols-3 rounded-b-lg p-7 items-center ">
                                        <div className="">
                                            <p className="black-text text-xs mb-5 font-semibold uppercase">Pickup Location</p>
                                            <p className="black-text text-2xl font-bold"style={{textTransform: 'capitalize'}}>{invoice_data[0].pickup_location}</p>
                                            <p className="black-text text-sm mb-5 font-semibold">{invoice_data[0].state}</p>
                                        </div>
                                        <div className="">
                                            <img src={movement} alt="" width={120} height={12} className="" />
                                        </div>
                                        <div className="">
                                            <p className="black-text text-xs mb-5 font-semibold uppercase">Port Of Destination</p>
                                            <p className="black-text text-2xl font-bold"style={{textTransform: 'capitalize'}}>{invoice_data[0].destination_port}</p>
                                            <p className="black-text text-sm mb-5 font-semibold">{invoice_data[0].destination_port_country}.</p>
                                        </div>
                                    </div>
                                
                                </>
                            ) : (
                                <>
                                    <div className="grid grid-cols-3 items-center p-5 bg-green rounded-t-lg">
                                        <div className="flex items-center">
                                            <img src={arrowDown} alt="" width={40} height={40} className="bg-light-green p-2 rounded-full" />

                                            <p className="white-text ml-2"style={{textTransform: 'capitalize'}}>{invoice_data[0].shipping_type}</p>
                                        </div>
                                        <div className="text-center ">
                                            {/* <p className="white-text">Apr 02, 2022</p> */}
                                            <Moment className="white-text" format="DD-MM-YYYY">{invoice_data[0].createdAt}</Moment>
                                        </div>
                                        <div className="text-right">
                                            <p className="white-text text-xs opacity-75">Shipment ID</p>
                                            <p className="white-text">{invoice_data[0]._id}</p>
                                        </div>
                                    </div>
                                    {/* <div className="bg-spiral"></div> */}
                                    <div className="bg-light-green  grid grid-cols-3 rounded-b-lg p-7 items-center ">
                                        <div className="">
                                            <p className="black-text text-xs mb-5 font-semibold uppercase">Port of Origin</p>
                                            <p className="black-text text-2xl font-bold"style={{textTransform: 'capitalize'}}>{invoice_data[0].origin_port}</p>
                                            {/* <p className="black-text text-sm mb-5 font-semibold">{invoice_data[0].state}</p> */}
                                        </div>
                                        <div className="">
                                            <img src={movement} alt="" width={120} height={12} className="" />
                                        </div>
                                        <div className="">
                                            <p className="black-text text-xs mb-5 font-semibold uppercase">Delivery Location</p>
                                            <p className="black-text text-2xl font-bold"style={{textTransform: 'capitalize'}}>{invoice_data[0].delivery_location}</p>
                                            {/* <p className="black-text text-sm mb-5 font-semibold">{invoice_data[0].delivery_location}.</p> */}
                                        </div>
                                    </div>
                                
                                </>
                            )
                        }
                    </>
                }
            
        </div>  
    );
};

// export default ShipmentDetails;
const mapStateToProps = (state: any) => {
    const { single_invoice, loading } = state.invoices;
    return { single_invoice, loading };
};

export default connect(mapStateToProps, { getSingleInvoice })(ShipmentDetails);


