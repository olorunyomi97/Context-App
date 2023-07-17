import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import userIcon from "assets/icons/user-plus.svg";
import shipmentIcon from "assets/icons/shipment-icon.png";
import arrowUp from "assets/icons/arrow-up.svg";
import movement from "assets/icons/movement.svg";
import CustomerShipmentFilter from "components/CustomerShipmentFilter/customerShipmentFilter"
import { getSingleCustomer } from "store/actions";
import PrimaryButton from "components/buttons/PrimaryButton";



const CustomerDetails = (props: any) => {
	const params = useParams();
	const { loading, single_customer } = props;
		const [openAside, SetOpenAside] = useState(false);
	// console.log(params)
	// console.log(single_customer);
	// console.log(single_customer['data']?.['data']);
	// console.log(single_customer['data']?.['data']?.['customer_data']);
	// console.log(single_customer['data']?.['data']?.['customer_shipments']);

	const customer_data = single_customer['data']?.['data']?.['customer_data']
	const customer_shipment = single_customer['data']?.['data']?.['customer_shipments']
	console.log(customer_data);
	console.log(customer_shipment);

	useEffect(() => {
		props.getSingleCustomer(params.id);
	},[getSingleCustomer]);

    return (
        <div>
            <>
            <div className="flex">
				<Aside 
					activeTab="customer" 
					openAside={openAside}
					SetOpenAside={SetOpenAside}
				/>

                <div className="">
				<TopBar title={"Customers"} SetOpenAside={SetOpenAside}/>
                    <div className="lg:px-14 lg:pt-10 container mx-auto  w-full mobile-dashboard">
                        <div className="flex items-center">
                            <Link to="/customers">
                                <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                            </Link>
                            <p className="text-lg black-text font-semibold"></p>
                        </div>
						
                        <div className="pr-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
                            <div className="rounded overflow-hidden">
                                <div className="px-6 py-4 right-divider top-divider bottom-divider left-divider rounded w-full" style={{backgroundColor:"#F9FAFB"}}>
                                    <div className="flex items-center">
									{
										loading ? 
										(
											<div className="text-center my-3">
												<Link to="#" className="text-success">
													{/* @ts-ignore */}
													<PrimaryButton title="Loading Customer Details" loading={loading} />
												</Link>
											</div>
										) : <>
												<img src={`https://ui-avatars.com/api/?name=${customer_data.firstname+customer_data.lastname}`}height={50} width={50} className="rounded-full"/>
												<div className="ml-4">
													<label htmlFor="upload-image" className="green-text text-sm cursor-pointer">
														<div className="customer-shipment mb-0">{customer_data.firstname}&nbsp;{customer_data.lastname}</div>
														<p className="customer-shipment mb-0">{customer_data.email}</p>
														<p className="customer-shipment mb-0">{customer_data.phone}</p>
													</label>
												</div>
												<div className="rounded-full flex ml-auto">
													{/* <div className="ml-3">
														<Link 
															to=""
															onClick={() => {
																window.location.href = `/customers/edit-customer/${params.id}`
															}}
															// to={`customers/edit-customer/${params.id}`}
															className="solid-br black-text-2 text-sm py-3 px-4 w-full rounded flex" 
														>
														Edit
														</Link>
													</div> */}
													<div className="ml-3">
														<Link 
															to={`/shipment-creation-for-customer?user_id=${customer_data._id}`}
															state={{
															firstname: customer_data.firstname,
															lastname: customer_data.lastname,
															data: customer_data._id
															}}
															className="bg-green white-text-2 text-sm py-3 px-4 w-full rounded flex" 
														>
														Add Shipment +
														</Link>
													</div>
												</div>
											</>

										}
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        {/* <CustomerShipmentFilter/> */}
                        
						{
							loading ? 
							(
								<div className="text-center my-3">
									<Link to="#" className="text-success">
										{/* @ts-ignore */}
										<PrimaryButton title="Loading Customer Shipments" loading={loading} />
									</Link>
								</div>
							) : (
							<>
							{customer_shipment.length == undefined ? (
							<>
								<div className="mt-5 pt-5">
									<table className="desktop-only">
										<tr className="pb-5">
											<th className="admin-text grey-text mx-5 uppercase text-xs text-left pl-3 pb-3">
												shipment type
											</th>
											<th className="admin-text grey-text mx-5 uppercase text-xs text-left px-10 pb-3">
												origin
											</th>
											<th className="px-16"></th>
											<th className="admin-text grey-text mx-5 uppercase text-xs text-left px-10 pb-3">
												destination
											</th>
											<th className="admin-text grey-text mx-5 uppercase text-xs text-left pb-3" style={{paddingRight: '20px', paddingLeft: '20px'}}>
												date of issue
											</th>
											<th className="admin-text grey-text mx-5 uppercase text-xs text-left px-10 pb-3" >
												shipping id
											</th>
											<th className="px-16"></th>
										</tr>
										<tr className="right-divider top-divider bottom-divider left-divider rounded w-full">
										<td className="py-4 pl-3">
											<div className="flex items-center">
											<img
												src={arrowUp}
												alt=""
												width={40}
												height={40}
												className="bg-light-green p-2 rounded-full"
											/>
											<p className="ml-2 admin-table-text black-text font-semibold text-sm">
												Export
											</p>
											</div>
										</td>
										<td>
											<div className="mx-10">
											<p className="admin-table-text black-text font-semibold text-sm">
												Apapa
											</p>
											<p className="grey-text text-xs">lagos, Nigeria</p>
											</div>
										</td>

										<td>
											<img
											src={movement}
											alt=""
											width={101}
											height={12}
											className=""
											/>
										</td>
										<td>
											<div className="mx-10">
											<p className="admin-table-text black-text font-semibold text-sm">
												Arlington
											</p>
											<p className="grey-text text-xs">va, USA</p>
											</div>
										</td>
										<td>
											<p className="admin-table-text black-text font-semibold text-sm">
											{" "}
											Apr 02, 2022
											</p>
										</td>
										<td>
											<p className="mx-10 admin-table-text black-text font-semibold text-sm">
											588393926
											</p>
										</td>
										<td>
											<Link
											// to="/shipments/shipment-details"
											to=""
											onClick={() => {
												window.location.href = `/customers/customer-shipment-details/${params.id}`
											}}
											className="bg-green white-text py-3 px-4 w-full rounded mr-3"
											style={{textDecoration: 'none'}}
											>
												<small>View Details</small>
											</Link>
										</td>
										</tr>
										
									</table>
								</div>
								</>
								) : ( 
								<>
									<div
										className="flex flex-col item-center justify-center lg:solid-br rounded "
										// style={{ minHeight: 200 }}
									>
										<img src={shipmentIcon} alt="" width={95} height={95} className="mx-auto mt-20" />

										<div className="mx-auto">
											<p className="grey-text my-3">You have no recorded shipments yet</p>
											<Link 
												to={`/shipment-creation-for-customer?user_id=${customer_data._id}`}
                                                state={{
                                                    firstname: customer_data.firstname,
                                                    lastname: customer_data.lastname
                                                }}
												
											>
												<p className="btn bg-green white-text text-sm py-3 px-6 w-full rounded text-center mb-52">Start New Shipment</p>
											</Link>
										</div>
									</div>
								</> 
							)}
								</>
							)
						
						}
                    {/* <ShipmentDetailsDrawer isOpen={isOpen} setIsOpen={setIsOpen} /> */}
                    </div>
                </div>
            </div>
        </>
        </div>
    )
}

// export default CustomerDetails

const mapStateToProps = (state: any) => {
    const { single_customer, loading } = state.customers;
    return { single_customer, loading };
};

export default connect(mapStateToProps, { getSingleCustomer })(CustomerDetails);

