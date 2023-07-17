import { useEffect, useState } from "react";
import { Link, useParams, useLocation} from "react-router-dom";
import { connect } from "react-redux";
import PrimaryButton from "components/buttons/PrimaryButton";
import Moment from 'react-moment';
import arrowUp from "assets/icons/arrow-up.svg";
import arrowDown from "assets/icons/arrow-down.svg";
import movement from "assets/icons/movement.svg";
import { getAllQuotes } from "store/actions";
import ReactPaginate from "react-paginate";
import ProcessModal from "../myQuotesTab/myQuotesPartials/myQuoteModal";
import moment from "moment";
import shippingLine from "pages/shippingLine/shippingLine";
import QuoteFilter from "../QuotesFilter/filter";

const AllQuotes = (props : any) => {
	const [openAside, SetOpenAside] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
	const [quoteToProcess, setQuoteToProcess] = useState({});
	const { quotes, loading } = props;
	// console.log(quotes['data']?.['data']);
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 10
	console.log(currentItems);
	
	const today = new Date();
	const one_hour = 60 * 60 * 1000;
	const anHourAgo = Date.now() - one_hour
	
	const params = useParams();
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
	
	useEffect(() => {
		window.scrollTo(0, 0);
		props.getAllQuotes(url);
	}, [getAllQuotes]);


	useEffect(() => {
		window.scrollTo(0, 0);
		const endOffset = itemOffset + itemsPerPage;
		console.log(`Loading items from ${itemOffset} to ${endOffset}`);
		setCurrentItems(quotes['data']?.['data'].slice(itemOffset, endOffset));
		setPageCount(Math.ceil(quotes['data']?.['data'].length / itemsPerPage));
	}, [itemOffset, itemsPerPage, quotes['data']?.['data']]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % quotes['data']?.['data'].length;
		setItemOffset(newOffset);
	};

	const handleSearch = (event) => {
	
		let value = event.target.value.toLowerCase();
		const results: any = []
		
		quotes['data']?.['data'].filter(quote => {
			
			if(quote?.shipping_type?.toLowerCase().includes(value.toLowerCase())
			|| quote?.customer_details[0]?.company_name?.toLowerCase().includes(value.toLowerCase())
			){
				results.push(quote)
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
						<div className="mt-4">
							<div className="flex items-center mobile-padding">
								<div className="ml-auto">
									<input 
										onChange={(e) => handleSearch(e)}  
										placeholder={'Search All Quotes'}
										className="form-input px-4 py-1.5 custom-input w-full black-text"
									/>
								</div>
							</div>
							<table className="desktop-only" style={{marginBottom:'20px', marginTop:'10px'}}>
							
							<tr className="pb-5"> 
									<th className="admin-text grey-text uppercase text-xs font-semibold text-left pl-3 pb-3">
										shipment type
									</th>
									<th className="admin-text grey-text mx-2 uppercase text-xs font-semibold text-left pl-5 pb-3">
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
										date of issue
									</th>
									
									<th className="admin-text grey-text mx-2 uppercase text-xs font-semibold text-left px-5 pb-3">
										Created By
									</th>
									<th className="admin-text grey-text mx-2 uppercase text-xs font-semibold text-left px-5 pb-3">
										Quote Status
									</th>
									<th className="admin-text grey-text uppercase text-xs font-semibold text-left px-3 pb-3">
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
														data?.['quote_status'] == 'pending_admin' && data?.['admin_id'] == undefined ? ( */}
															<>

															
																<td className="py-4 pl-3">
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
																	<p className="ml-2 upload-text-2 black-text font-semibold text-sm"style={{textTransform: 'capitalize',  width:'50px'}}>
																		{data?.['shipping_type']}
																	</p>
																	</div>
																</td>

																<td className="px-5">
																	<p className="text-sm quote-black-text w-full">
																		{
																			data?.['customer_details'][0]?.['company_name']
																		}
																	</p>
																</td>

																<td className="">
																	<div className="ml-10 mt-2 pb-2">
																		<p className="quote-black-text"style={{textTransform: 'capitalize',  width:'100px'}}>
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
																	<p className="upload-text-2 black-text pl-5" style={{width:'100px'}}>
																	<Moment format="DD-MM-YYYY  hh:mmA">{data?.['createdAt']}</Moment>
																	</p>
																</td>
																{/* <td>
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
																</td> */}
																
																<td className="px-3">
																	<p className="text-sm quote-black-text w-full">
																		{/* {data?.['admin_creator_details']?.['firstname']} */}
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
																<td>
																	<div className="">
																		<p className="admin-table-text black-text w-full">
																			{
																				data?.['quote_status'] === "pending_admin" ? (
																					<Link to="#" className="bg-light-red black-text-2 text-sm py-2 px-3 red-text mx-5 text-center rounded-full">
																						Pending Admin
																					</Link>
																				): data?.['quote_status'] === "pending_customer" ? (
																					<Link to="#" className="bg-yellow black-text-2 text-sm py-2 px-3 yellow-text mx-5 text-center rounded-full">
																						Pending Customer
																					</Link>
																				) : (
																					<Link to="#" className="bg-light-green black-text-2 text-sm py-2 px-2 green-text mx-5 text-center rounded-full">
																						Quote Accepted
																					</Link>
																				)
																			}
																		</p>
																	</div>
																</td>
																<td>
																<Link
																	onClick={() => {
																		window.location.href = `/quote-details/${data?.['_id']}`
																	}}
																	to=""
																	className="bg-green white-text py-2 px-3 w-full rounded mr-3 "
																	style={{textDecoration: 'none'}}
																	>
																	<small>Details</small>
																</Link>
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
															{/* {data.shipping_type === "export" ? data.origin_port_province : data.origin_port_code} */}
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
														{/* <p className="grey-text text-xs">
															{data?.['shipping_type'] === "export"
																? data?.['destination_port_code']
																: data?.['delivery_location']
																
															}
														</p>
														<p className="grey-text text-xs">
															{data?.['shipping_type'] === "export"
																? data?.['destination_port_country']
																: data?.['origin_port_country']
															}
														</p> */}
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
														<p
															// className={`${
															// 	data?.['quote_expiry'] <= today.toISOString()
															// 		? "bg-light-red  red-text"
															// 		: data?.['quote_expiry'] <= anHourAgo
															// 		? "bg-light-yellow yellow-text"
															// 		: "bg-light-green green-text"
															// }  text-xs font-semibold py-2 px-1.5  text-center rounded-full`}
														>
															{/* {data.quote_expiry === today.toISOString() ? "Late" : data.quote_expiry === "anHourAgo" ? "Grace Period"  : "Early"} */}
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
															data?.['admin_creator_details'] === null ? (
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
											</div>
										);
									})
								}
							</div>
							{/* Mobile View */}


							{/* <ProcessModal 
								isOpen={isOpen} 
								setIsOpen={setIsOpen} 
								id={quoteToProcess}
								// single_quote={props.getSingleQuote}
							/> */}
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
				}
			</>
		</div>
    )
}

// export default AllQuotes;

const mapStateToProps = (state: any) => {
    const { quotes, error, loading } = state.quotes;
    return { quotes, error, loading };
};

export default connect(mapStateToProps, {getAllQuotes})(AllQuotes);
