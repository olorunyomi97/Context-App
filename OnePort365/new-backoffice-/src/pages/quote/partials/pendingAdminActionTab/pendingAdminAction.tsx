import { useEffect, useState } from "react";
import { Link, useParams, useLocation} from "react-router-dom";
import { connect } from "react-redux";
import PrimaryButton from "components/buttons/PrimaryButton";
import Moment from 'react-moment';
import arrowUp from "assets/icons/arrow-up.svg";
import arrowDown from "assets/icons/arrow-down.svg";
import movement from "assets/icons/movement.svg";
import ReactPaginate from "react-paginate";
import ProcessModal from "../myQuotesTab/myQuotesPartials/myQuoteModal";
import moment from "moment";
import { getPendingAdminQuotes } from "store/actions";
import documentIcon from "assets/icons/document.svg";
import { useSelector } from "react-redux";

const PendingQuotes = (props: any) => {
	let admin_data = useSelector((state: any) => state.auth.admin_data);
    // @ts-ignore
    admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));
	const pricing_manager_email = admin_data?.email
	console.log(pricing_manager_email);

	const [isOpen, setIsOpen] = useState(false);
	const [quoteToProcess, setQuoteToProcess] = useState({});
	const { pending_admin_quotes, loading } = props;
	console.log(pending_admin_quotes['data']?.['data']);
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 10
	console.log(currentItems);
	

	const today = new Date();
	const one_hour = 60 * 60 * 1000;
	const anHourAgo = Date.now() - one_hour

	const location:any = useLocation();
	const urlParams = new URLSearchParams(location.search)

	let url = ""
	if(urlParams.has("shipping_type")){
		url += `&shipping_type=${urlParams.get("shipping_type")}`
	}
	if(urlParams.has("status")){
		url += `&status=${urlParams.get("status")}`
	}
	if(urlParams.has("creator")){
		url += `&creator=${urlParams.get("creator")}`
	}
	// if(urlParams.has("date_range")){
	// 	url += `&date_range=${urlParams.get("date_range")}`
	// }
	

	useEffect(() => {
		props.getPendingAdminQuotes(url);
	}, [getPendingAdminQuotes]);
	
	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		console.log(`Loading items from ${itemOffset} to ${endOffset}`);
		setCurrentItems(pending_admin_quotes['data']?.['data'].slice(itemOffset, endOffset));
		setPageCount(Math.ceil(pending_admin_quotes['data']?.['data'].length / itemsPerPage));
	}, [itemOffset, itemsPerPage, pending_admin_quotes['data']?.['data']]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % pending_admin_quotes['data']?.['data'].length;
		setItemOffset(newOffset);
	};

	const handleSearch = (event) => {
	
		let value = event.target.value.toLowerCase();
		const results: any = []
		
		pending_admin_quotes['data']?.['data'].filter(admin_quote => {
			
			if(admin_quote?.shipping_type?.toLowerCase().includes(value.toLowerCase())
			|| admin_quote?.customer_details[0]?.company_name?.toLowerCase().includes(value.toLowerCase())
			){
				results.push(admin_quote)
			}
		});

	
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(results.slice(itemOffset, endOffset));
	}
	

	return (
		<div>
			<>
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
						<div className="flex items-center mobile-padding">
							<div className="ml-auto">
								<input 
									onChange={(e) => handleSearch(e)}  
									placeholder={'Search Pending Admin Quotes'}
									className="form-input px-4 py-1.5 custom-input w-full black-text"
								/>
							</div>
						</div>

					{
						currentItems?.length === 0 || undefined || null ? (
							<> 
								<div className="mt-5 flex flex-col item-center justify-center solid-br rounded mobile-dashboar" style={{ minHeight: 500 }}>
                                    <img src={documentIcon} alt="" width={113} height={113} className="mx-auto mt-20" />

                                    <div className="mx-auto my-2" style={{textAlign:'center'}}>
                                        <p className="grey-text my-3">No Quotes Pending Admin Action Yet</p>
                                    </div>
                                </div>
							</>
						) : ( 
							<>
								<div className="mt-4">
									
									<table className="desktop-only" style={{marginBottom:'20px', marginTop:'10px'}}>
									<div>
										{/* <QuoteFilter 
											filterValueSelected={onFilterValueSelected}
										/> */}
									</div>
									<tr className="pb-5"> 
											<th className="admin-text grey-text uppercase text-xs font-semibold text-left pl-3 pb-3">
												shipment type
											</th>
											<th className="admin-text grey-text mx-2 uppercase text-xs font-semibold text-left pl-8 pb-3">
												Company Name
											</th>
											<th className="admin-text grey-text mx-2 uppercase text-xs font-semibold text-left px-10 pb-3">
												origin
											</th>
											<th className="px-1"></th>
											<th className="admin-text grey-text mx-2 uppercase text-xs font-semibold text-left px-3 pb-3">
												destination
											</th>
											{/* <th className="admin-text grey-text mx-2 uppercase text-xs font-semibold text-left  px-5 pr-5 pb-3">
												date of issue
											</th> */}
											<th className="admin-text grey-text mx-2 uppercase text-xs font-semibold text-left pl-5 pb-3">
												Expiration
											</th>
											<th className="admin-text grey-text mx-2 uppercase text-xs font-semibold text-left pl-5 pb-3">
												Status
											</th>
											<th className="admin-text grey-text mx-2 uppercase text-xs font-semibold text-left pl-5 pb-3">
												Created By
											</th>
											<th className="admin-text grey-text uppercase text-xs font-semibold text-left px-7 pb-3">
												Action
											</th>
											{/* <th className="px-16"></th> */}
									</tr>
										{
											currentItems?.map((data: any, index: any) => {
												return (
													<>
													{
														<tr 
															className="right-divider top-divider bottom-divider left-divider rounded w-full" 
															key={index}
														>
															{/* {
																data?.['quote_status'] === 'pending_admin'  ? ( */}
																	<>

																	
																		<td className="py-4 pl-3 pr-3">
																			<div className="flex items-center">
																			<img
																				src={
																				data?.['shipping_type'] === "export"
																					? arrowUp
																					: arrowDown
																				}
																				alt=""
																				width={30}
																				height={30}
																				className="bg-light-green p-2 rounded-full"
																				style={{textTransform: 'capitalize'}}
																			/>
																			<p className="ml-2 upload-text-2 black-text font-semibold text-sm"style={{textTransform: 'capitalize'}}>
																				{data?.['shipping_type']}
																			</p>
																			</div>
																		</td>

																		<td className="px-10">
																			<p className="text-sm quote-black-text w-full">
																				{
																					data?.['customer_details'][0]?.['company_name']
																				}
																			</p>
																		</td>

																		<td className="">
																			<div className="ml-10">
																				<p className="quote-black-text"style={{textTransform: 'capitalize',  width:'150px'}}>
																				{data?.['shipping_type'] === "export"
																					? data?.['pickup_location']
																					: 	<>
																							<p className="quote-black-text"style={{textTransform: "uppercase", width:'100px'}}>
																								{data?.['shipping_type'] === "export"
																									? data?.['destination_port_code']
																									: data?.['origin_port_code']
																									
																								}
																								</p>
																								<p className="upload-text-2"style={{textTransform: "capitalize", width:'100px', color:'#6B7280'}}>
																								{data?.['shipping_type'] === "export"
																									? data?.['destination_port_country']
																									: data?.['origin_port_country']
																								}
																							</p>
																						</>
																				}
																				</p>
																			</div>
																		</td>

																		<td>
																			<img src={movement} alt="" width='50%' height='50%' className="" />
																		</td>
																		<td>
																			<div className="">
																			<p className="ml-2 quote-black-text"style={{textTransform: "uppercase", width:'100px'}}>
																				{data?.['shipping_type'] === "export"
																					? data?.['destination_port_code']
																					: data?.['delivery_location']
																					// : data?.['origin_port_code']
																					
																				}
																				</p>
																				<p className="ml-2 upload-text-2"style={{textTransform: "capitalize", width:'100px', color:'#6B7280'}}>
																				{data?.['shipping_type'] === "export"
																					? data?.['destination_port_country']
																					: data?.['origin_port_country']
																				}
																				</p>
																			</div>
																		</td>
																		<td>
																			<p className="upload-text-2 black-text  pl-5">
																			<Moment format="DD-MM-YYYY  hh:mmA">{data?.['createdAt']}</Moment>
																			</p>
																		</td>
																		<td>
																			{
																				data?.['quote_expiry'] <= today.toISOString() ? (
																					<>
																						<Link to="#" className="bg-light-red black-text-2 text-sm py-2 px-2 red-text mx-5 text-center rounded-full">
																							Late
																						</Link>
																					</>
																				) : (
																					<>
																						<Link to="#" className="bg-light-green black-text-2 text-sm py-2 px-2 green-text mx-5 text-center rounded-full">
																							Early
																						</Link>
																					</>
																				)
																			}
																		</td>
																		<td className="px-5">
																			<p className="text-sm quote-black-text w-full">
																				{
																					data?.['admin_creator_details'] === null ? (
																							<p> Platform</p>
																					) : (
																						<>
																							{data?.['admin_creator_details']?.['firstname']} {data?.['admin_creator_details']?.['lastname']}
																						</>
																						
																					)
																				}
																			</p>
																		</td>

																		{/* <td>
																			<Link 
																				to="" 
																				onClick={() => {
																					window.location.href = `/quote-details/${data?.['_id']}`
																				}}
																				className="bg-green white-text text-xs py-2 px-3 text-center w-full rounded mr-3"
																			>
																				View Details
																			</Link>
																		</td> */}
																		<td className="px-5">
																			{/* <>
																				<Link
																					onClick={() => {
																						setQuoteToProcess(data?.['_id'])
																						setIsOpen(true)}
																					}
																					to=""
																					className="bg-green white-text py-2 px-3 w-full rounded mr-3"
																					style={{textDecoration: 'none'}}
																					>
																					<small>Process</small>
																				</Link>
																			</> */}
																			{
																				pricing_manager_email === 'rufusu@oneport365.com'
																				? (
																					<>
																						<Link
																							onClick={() => {
																								setQuoteToProcess(data?.['_id'])
																								setIsOpen(true)}
																							}
																							to=""
																							className="bg-green white-text py-2 px-3 w-full rounded mr-3"
																							style={{textDecoration: 'none'}}
																							>
																							<small>Process</small>
																						</Link>
																					</>
																				) : (
																					<>
																						{/* <Link
																							to=""
																							className="not-allowed solid-br black-text py-2 px-3 w-full rounded mr-3 "
																							style={{background: 'rgba(136, 136, 136, 0.15)', textDecoration: 'none'}}
																							>
																							<small>Process</small>
																						</Link> */}
																					</>
																				)
																			}
																			
																		</td>
																	</>
																{/* ) : (
																	<></>
																)
															} */}
															
															
														</tr>
													}
													</>
												)
											})
										}
									</table>
									{/* Mobile View */}
									<div className="bg-grey py-2 mobile-only">
										{
											currentItems?.map((data: any, index: any) => {
												return (
													<div className="bg-white mb-3" key={index}>
														{/* {
																data?.['quote_status'] === 'pending_admin' ? ( */}
																<>
																	<div className="flex items-center py-3 px-7 bottom-divider">
																		<img 
																			src={
																				data?.['shipping_type'] === "export"
																					? arrowUp
																					: arrowDown
																				}
																			alt="" 
																			width={35} 
																			height={35} 
																			className="bg-light-green p-2 rounded-full"
																		/>
																		<p className="ml-2 black-text font-semibold text-sm capitalize">{data?.['shipping_type']}</p>

																		<p className="ml-auto black-text font-semibold text-sm">ID: {data._id.substring(0, 9)}...</p>
																	</div>

																	<div className="grid grid-cols-3 gap-8 py-3 px-7 bottom-divider items-center ">
																		<div className="">
																			<p className="black-text font-semibold text-sm">
																				{data.shipping_type === "export" ? data.origin_port_province : data.origin_port_code}
																			</p>
																			<p className="grey-text text-xs">
																				{data.pickup_location ? data.pickup_location : data.origin_port_country}
																			</p>
																		</div>

																		<div className="px-5">
																			<img src={movement} alt="" width={80} height={12} className="" />
																		</div>

																		<div className="text-right">
																			<p className="black-text font-semibold  text-sm">{data.shipping_type === "export" ? data.destination_port_code : data.delivery_location}</p>
																			<p className="grey-text text-xs">{data.destination_port_country}</p>
																		</div>
																	</div>

																	<div className="grid grid-cols-3 gap-4 py-3 px-7 bottom-divider items-center">
																		<div className="">
																			<p className="black-text font-semibold text-sm">{moment(data.createdAt).format("LL")}</p>
																		</div>
																		<div className="">
																			<p>
																				{
																					data?.['quote_expiry'] <= today.toISOString() ? (
																						<>	
																							<Link to="#" className="bg-light-red black-text-2 text-sm py-2 px-2 red-text mx-5 text-center rounded-full">
																								Late
																							</Link>
																						</>
																					) : data?.['quote_expiry'] <= anHourAgo ? (
																						<>	
																							<Link to="#" className="bg-yellow black-text-2 text-sm py-2 px-2 yellow-text mx-5 text-center rounded-full">
																								Grace Period
																							</Link>
																						</>
																					) : (
																						<>
																							<Link to="#" className="bg-light-green black-text-2 text-sm py-2 px-2 green-text mx-5 text-center rounded-full">
																								Early
																							</Link>
																						</>
																					)
																				}
																			</p>
																			{/* <div className="">
																				<p className="upload-text-2">Created By</p>
																				<p className="text-sm quote-black-text w-full">
																					{
																						data?.['admin_creator_details'] === undefined ? (
																								<p> Platform</p>
																						) : (
																							<>
																								{data?.['admin_creator_details']?.['firstname']} {data?.['admin_creator_details']?.['lastname']}
																							</>
																							
																						)
																					}
																				</p>
																			</div> */}
																		</div>

																		<Link 
																			to="" 
																			onClick={() => {
																				window.location.href = `/quote-details/${data?.['_id']}`
																			}}
																			className="bg-green white-text text-xs py-2 text-center w-full rounded mr-3"
																		>
																			View Details
																		</Link>
																	</div>
																	<div className="grid grid-cols-1 gap-4 py-3 px-7 bottom-divider items-center">
																		<div className="">
																		<p className="text-sm quote-black-text w-full">
																			{/* {data?.['admin_creator_details']?.['firstname']} */}
																			{
																				data?.['admin_creator_details'] === null || undefined ? (
																						<p> Quote Created via Platform</p>
																				) : (
																					<>
																						Quote Created by: {data?.['admin_creator_details']?.['firstname']} {data?.['admin_creator_details']?.['lastname']}
																					</>
																					
																				)
																			}
																		</p>
																		</div>
																	</div>
																</>
															{/* ) : (
																<></>
															)
														} */}
													</div>
												);
											})
										}
									</div>
									{/* Mobile View */}
									<ProcessModal 
										isOpen={isOpen} 
										setIsOpen={setIsOpen} 
										id={quoteToProcess}
									/>
									<ReactPaginate
										breakLabel="..."
										onPageChange={handlePageClick}
										pageRangeDisplayed={3}
										pageCount={pageCount}
										previousLabel="Previous"
										nextLabel="Next"
										containerClassName="pagination"
										pageLinkClassName="page-num"
										previousLinkClassName="page-num"
										nextLinkClassName="page-num"
										activeLinkClassName="active"
										activeClassName="active"
										// renderOnZeroPageCount={null}
									/>
								</div>
							</>
						)
					}
						
					</>
				}
			</>
		</div>
	)
}

// export default PendingQuotes;


const mapStateToProps = (state: any) => {
    const { pending_admin_quotes, error, loading } = state.quotes;
    return { pending_admin_quotes, error, loading };
};

export default connect(mapStateToProps, {getPendingAdminQuotes})(PendingQuotes);
