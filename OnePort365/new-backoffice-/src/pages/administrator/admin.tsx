import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PrimaryButton from "components/buttons/PrimaryButton";
import { getAdmins, deleteAdmin, deactivateAdmin } from "store/actions";
import Moment from 'react-moment';
import DeleteModal from "./Modal/deleteModal";
import DeactivateModal from "./Modal/deactivateModal";
import ReactPaginate from "react-paginate";

const Admin = (props: any) => {
	const { admins, loading } = props;
	const [openAside, SetOpenAside] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [dataToDelete, setDataToDelete] = useState({});
	const [isDeactivate, setIsDeactivate] = useState(false);
	const [dataToDeactivate, setDataToDeactivate] = useState({});
	console.log(admins['data']?.['data']);
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 10
	console.log(currentItems);

	useEffect(() => {
		props.getAdmins();
	}, [getAdmins]);

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		console.log(`Loading items from ${itemOffset} to ${endOffset}`);
		setCurrentItems(admins['data']?.['data'].slice(itemOffset, endOffset));
		setPageCount(Math.ceil(admins['data']?.['data'].length / itemsPerPage));
	}, [itemOffset, itemsPerPage, admins['data']?.['data']]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % admins['data']?.['data'].length;
		setItemOffset(newOffset);
	};

	const handleSearch = (event) => {

		let value = event.target.value.toLowerCase();
		const results: any = []

		admins['data']?.['data'].filter(admin => {

			if (admin.firstname.toLowerCase().includes(value.toLowerCase())
				|| admin.lastname.toLowerCase().includes(value.toLowerCase())
				|| admin.email.toLowerCase().includes(value.toLowerCase())) {
				results.push(admin)
			}
		});


		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(results.slice(itemOffset, endOffset));
	}

	return (
		<div className="flex">
			<Aside
				activeTab="admin"
				openAside={openAside}
				SetOpenAside={SetOpenAside}
			/>
			<div className="">
				<TopBar title={"Admin"} SetOpenAside={SetOpenAside} />
				<div className="dashboard-content">
					<div className="lg:px-14 lg:pt-10 container mx-auto w-full">
						<div className="flex items-center my-10 mobile-padding">
							<Link
								style={{ textDecoration: 'none' }}
								to="/admins/admin-creation"
								className="bg-green white-text text-sm py-3 px-4 rounded lg:mb-3"
							>
								Add Admin +
							</Link>

							<div className="ml-auto">

								<input
									onChange={(e) => handleSearch(e)}
									placeholder={'Search Admins'}
									className="form-input px-4 py-1.5 custom-input w-full black-text"
								/>
							</div>
						</div>
						{
							loading ?
								(
									<div className="text-center my-3">
										<Link to="#" className="text-success">
											{/* @ts-ignore */}
											<PrimaryButton title="Loading Admins" loading={loading} />
										</Link>
									</div>
								) : (
									<>
										<div style={{ marginTop: '30px', marginBottom: '50px' }}>
											<table>
												<tr className="pb-5">
													<th className="admin-text grey-text uppercase text-xs text-left pl-3 pb-3">
														FirstName
													</th>
													<th className="admin-text grey-text mx-2 uppercase text-xs text-left px-10 pb-3">
														LastName
													</th>
													<th className="px-2"></th>
													<th className="admin-text grey-text mx-2 uppercase text-xs text-left px-3 pb-3">
														Company Email Address
													</th>
													<th className="admin-text grey-text uppercase text-xs text-left pr-5 pl-5  pb-3">
														Last Login
													</th>
													<th className="admin-text grey-text mx-2 uppercase text-xs text-left px-8 pb-3">
														Job Role
													</th>
													<th className="admin-text grey-text uppercase text-xs text-left px-10 pb-3">
														{/* status */}
													</th>
													<th className="px-16"></th>
												</tr>
												{
													currentItems?.map((data, index) => {
														return (
															<>
																<tr
																	className="right-divider top-divider bottom-divider left-divider rounded w-full"
																	key={index}
																>
																	<td className="pt-4 pb-4 pl-3">
																		<div className="flex items-center">
																			<p className="admin-table-text ml-2" style={{ textTransform: 'capitalize' }}>
																				{data?.['firstname']}
																			</p>
																		</div>
																	</td>
																	<td>
																		<div className="mx-10">
																			<p className="admin-table-text" style={{ textTransform: 'capitalize' }}>
																				{data?.['lastname']}
																			</p>
																		</div>
																	</td>

																	<td>
																		<img alt="" width="{81}" height="{12}" className="" />
																	</td>
																	<td>
																		<div className="mx-3">
																			<p className="admin-table-text">
																				{data?.['email']}
																			</p>
																		</div>
																	</td>
																	<td>
																		<div className="pl-5">
																			<p className="admin-table-text w-full">
																				{/* <Moment format="DD-MM-YYYY">{admins.data.data[0].last_login_date}</Moment> */}
																				<Moment format="DD-MM-YYYY">{data?.['last_login_date']}</Moment>
																			</p>
																		</div>
																	</td>
																	<td>
																		<div className="mx-10">
																			<p className="admin-table-text  text-sm" style={{ textTransform: 'capitalize' }}>
																				{/* {data?.['role']} */}
																				{
																					data?.['role'] == 'super_admin'
																						? 'Super Admin'
																						: 'Admin'
																				}
																			</p>
																		</div>
																	</td>
																	{
																		data?.['role'] == 'super_admin' ? (
																			<>
																			</>
																		) : (
																			<>
																				<td>
																					{
																						data?.['is_active'] == false ? (
																							<>
																								<Link
																									onClick={() => {
																										setDataToDeactivate(data?.['_id'])
																										setIsDeactivate(true)
																									}
																									}
																									style={{ textDecoration: 'none' }}
																									to="#"
																									className="bg-white solid-br black-text text-sm py-2 px-5 w-full rounded ml-2"
																								>
																									Activate
																								</Link>
																							</>
																						) : (
																							<>
																								<Link
																									onClick={() => {
																										setDataToDeactivate(data?.['_id'])
																										setIsDeactivate(true)
																									}
																									}
																									style={{ textDecoration: 'none' }}
																									to="#"
																									className="bg-white solid-br black-text text-sm py-2 px-5 w-full rounded"
																								>
																									Deactivate
																								</Link>
																							</>
																						)
																					}
																				</td>
																				<td>
																					<Link
																						onClick={() => {
																							setDataToDelete(data?.['_id'])
																							setIsOpen(true)
																						}
																						}
																						style={{ textDecoration: 'none' }}
																						to="#"
																						className="bg-red white-text text-sm py-2 px-4 w-full rounded mr-3 ml-3"
																					>
																						Delete
																					</Link>
																				</td>
																			</>
																		)
																	}

																	{/* <td>
													<Link
														onClick={() => {
															setDataToDelete(data?.['_id'])
															setIsOpen(true)}
														}
														style={{textDecoration: 'none'}}
														to="#"
														className="bg-red white-text text-sm py-2 px-4 w-full rounded mr-3 "
													>
													Delete
													</Link>
												</td> */}
																</tr>
															</>
														)
													})
												}
											</table>
										</div>
									</>
								)
						}
						<DeleteModal
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							id={dataToDelete}
							deleteAdmin={props.deleteAdmin}
						/>
						<DeactivateModal
							isDeactivate={isDeactivate}
							setIsDeactivate={setIsDeactivate}
							id={dataToDeactivate}
							deactivateAdmin={props.deactivateAdmin}
						/>
					</div>
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
			</div>
		</div>
	);
};

// export default Admin;

const mapStateToProps = (state: any) => {
	const { admins, error, loading } = state.admins;
	return { admins, error, loading };
};

export default connect(mapStateToProps, { getAdmins, deleteAdmin, deactivateAdmin })(Admin);
