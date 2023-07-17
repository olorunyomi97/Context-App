import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import NewCustomCheckbox from "components/checkBox/NewCustomCheckbox";
import CustomTextarea from "components/textInputs/CustomTextarea";
import CustomRadio from "components/selectInputs/CustomRadio";
import NewCustomRadio from "components/selectInputs/NewCustomRadio";
import { getSingleShipment, editShipmentDetails } from "store/actions";
import { parseAllPorts } from "helpers/index";
const _Json = require("sea-ports");

const EditOceamImport = (props: any) => {
	const params = useParams();
	const navigate = useNavigate();
	const [openAside, SetOpenAside] = useState(false);
	const { loading, single_shipment } = props;
	const single_shipment_data = single_shipment?.data?.data?.shipment_data;
	console.log(single_shipment_data);
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();
	const [customs, setCustoms] = useState(false);
	const [warehousing, setWarehousing] = useState(false);
	const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
	const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState(
		[]
	);
	const [haulage, setHaulage] = useState(false);
	const [showImportHaulage, setShowImportHaulage] = useState(false);
	const [showCbt, setShowCbt] = useState(false);
	const [showFastTrackLicense, setShowFastTrackLicense] = useState(true);
	const [brokerageType, setBrokerageType] = useState("");
	const [tbl, setTbl] = useState(false);
	const [showTbl, setShowTbl] = useState(false);
	const [tblType, setTblType] = useState("");
	const [DisableTbl, setDisableTbl] = useState(false);
	const [EnableTbl, setEnableTbl] = useState(false);
	const [fasttrackLicense, setFasttrackLicense] = useState(false);
	const [tracker, setTracker] = useState(false);
	const [escort, setEscort] = useState(false);
	const [hazardous, setHazardous] = useState(false);

	console.log("haulage-check", haulage);

	useEffect(() => {
		const parsePorts = parseAllPorts(_Json.JSON);
		setDefaultPortsOfOrigin(parsePorts.origin);
		setDefaultPortsOfDestination(parsePorts.destination);
	}, []);

	useEffect(() => {
		// props.getSingleShipment(params.id);
		props.getSingleShipment(params.id, `format_containers=${true}`);
	}, []);

	useEffect(() => {
		if (!fasttrackLicense) {
			setShowCbt(true);
		}

		if (!customs) {
			setShowCbt(false);
		}
	}, [customs]);

	useEffect(() => {
		if (single_shipment_data) {
			setCustoms(single_shipment_data?.customs_brokerage);
			//   setInsurance(single_shipment_data?.marine_insurance);
			setWarehousing(single_shipment_data?.warehousing);
			setHaulage(single_shipment_data?.with_haulage);
			setTracker(single_shipment_data?.with_tracker);
			setHazardous(single_shipment_data?.is_product_hazardous);
			setEscort(single_shipment_data?.with_escort);
			setFasttrackLicense(single_shipment_data?.with_fast_track_license);
			setTbl(single_shipment_data?.with_tbl);
			setBrokerageType(single_shipment_data?.brokerage_type);
		}
	}, [single_shipment_data]);

	// useEffect to use when tbl===true
	useEffect(() => {
		if (single_shipment_data?.with_tbl) {
			setFasttrackLicense(false);
			setBrokerageType("Transire");
			setShowCbt(true);
			setEnableTbl(true);
			setShowTbl(true);
			setTblType(single_shipment_data?.tbl_type);
		}
	}, [single_shipment_data?.with_tbl]);

	// useEffect to make fastTracking true
	useEffect(() => {
		if (single_shipment_data?.with_fast_track_license) {
			setFasttrackLicense(true);
			setShowCbt(false);
			setEnableTbl(false);
			setShowTbl(false);
		}
	}, [single_shipment_data?.with_fast_track_license]);

	// useEffect to show if haulage is true or false
	useEffect(() => {
		if (single_shipment_data?.with_haulage) {
			setHaulage(true);
			setShowImportHaulage(true);
		} else {
			setHaulage(false);
		}
	}, [single_shipment_data?.with_haulage]);

	// if haulage is false let everything under be false
	useEffect(() => {
		if (!haulage) {
			setHazardous(false);
			setEscort(false);
			setTracker(false);
		}
	}, [haulage]);

	const goToShipmentDetails = () => {
		navigate(`/shipments/shipment-details/${params.id}`);
	};

	const onSubmit = (data: any) => {
		const newData = {
			id: params.id,
			customs,
			warehousing,
			with_haulage: haulage,
			customer_id: data.customer_id.value,
			delivery_location: data?.delivery_location,
			port_of_discharge: data?.port_of_discharge,
			origin_port_code: data?.origin_port?.value?.unlocs[0],
			destination_port_code: data?.destination_port?.value?.unlocs[0],
			container_size: data?.container_size,
			container_type: data?.container_type,
			container_count: data?.container_count,
			container_weight: data?.container_weight,
			goods_value: data?.goods_value,
			goods_type: data?.goods_type,
			bl_number: data?.bl_number,
			branch: data?.branch,
			pickup_location: data?.pickup_location?.label,
			terminal_location_port: data?.terminal_location_port?.value,
			cargo_pickup_date: data?.cargo_pickup_date,
			tdo_expiry: data?.tdo_expiry,
			brokerage_type: brokerageType,
			with_tbl: tbl,
			tbl_type: tblType,
			with_tracker: tracker,
			with_escort: escort,
			is_product_hazardous: hazardous,
			with_fast_track_license: fasttrackLicense,
			additional_comments: data?.additional_comments,
		};
		props.editShipmentDetails(newData, goToShipmentDetails);
	};

	return (
		<div className="flex">
			<Aside
				activeTab="Shipment"
				openAside={openAside}
				SetOpenAside={SetOpenAside}
			/>
			<div className="dashboard-content">
				<TopBar title={"Shipment"} SetOpenAside={SetOpenAside} />
				{loading ? (
					<div className="text-center my-3 ml-5">
						<Link to="#" className="text-success">
							{/* @ts-ignore */}
							<PrimaryButton
								title="Loading Shipment Details"
								loading={loading}
							/>
						</Link>
					</div>
				) : (
					<>
						<div className="">
							<div>
								<div className="lg:px-14 lg:pb-5 lg:pt-5 grid grid-cols-2 gap-4 px-5">
									<div className="mt-2">
										<p className="font-semibold text-lg">
											Job Number : {single_shipment_data?.job_number}
										</p>
									</div>
									<div className="mt-2 ml-auto" style={{ textAlign: "right" }}>
										<small>Shipments </small>
										<small style={{ color: "grey" }}>
											{" "}
											/ Edit Import Shipment & Ocean Freight
										</small>
									</div>
								</div>
							</div>
						</div>
						<div className="lg:px-10 px-5 mb-3">
							<div className="py-10 right-divider left-divider top-divider bottom-divider shadow-2xl">
								<form onSubmit={handleSubmit(onSubmit)} className="py-5 px-8">
									<div className="lg:px-8">
										<p className="add-shipment-text mb-5">
											Import Shipment & Ocean Freight
										</p>
										<div className="grid grid-cols-1 mb-3">
											<div className="mr-1">
												<p className="text-xs black-text mb-2 font-medium">
													Customer Name<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"customer_id"}
													id={"customer_id"}
													label={""}
													placeholder={"Select Company & Customer Name"}
													isRequired={false}
													type={"text"}
													errors={errors}
													isDisabled={true}
													defaultValue={`${single_shipment_data?.customer_details[0]?.firstname} ${single_shipment_data?.customer_details[0]?.lastname}`}
													min={""}
													max={""}
													icon={""}
												/>
											</div>
										</div>

										<div className="mt-3 grid grid-cols-2 ">
											<div className="mr-1">
												<p className="text-xs black-text font-medium">
													{" "}
													Port of discharge<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"port_of_discharge"}
													id={"port_of_discharge"}
													label={""}
													placeholder={""}
													isRequired={false}
													type={"text"}
													errors={errors}
													isDisabled={true}
													defaultValue={single_shipment_data?.port_of_discharge}
													min={""}
													max={""}
													icon={""}
												/>
											</div>

											<div className="mr-1">
												<p className="text-xs black-text font-medium">
													{" "}
													Delivery location<span className="red-text">
														*
													</span>{" "}
												</p>
												<CustomInput
													control={control}
													name={"delivery_location"}
													id={"delivery_location"}
													label={""}
													placeholder={""}
													isRequired={false}
													type={"text"}
													errors={errors}
													isDisabled={true}
													defaultValue={single_shipment_data?.delivery_location}
													min={""}
													max={""}
													icon={""}
												/>
											</div>
										</div>
										{/* <p className="text-xs black-text font-medium">Number of Containers</p>
										<div className="solid-br p-3">
											{
												single_shipment_data?.container_details?.map((data: any) => {
													return (
														<>
															<div className="mt-3 grid grid-cols-3">
																<div className="">
																	<p className="text-xs black-text font-medium">
																		Size of Container<span className="red-text">*</span>
																	</p>
																	<CustomInput
																		control={control}
																		name={"container_size"}
																		id={"container_size"}
																		label={""}
																		placeholder={""}
																		isRequired={true}
																		type={"text"}
																		errors={errors}
																		isDisabled={true}
																		defaultValue={data?.container_size}
																		min={""}
																		max={""}
																		icon={""}
																	/>
																</div>

																<div className="ml-1">
																	<p className="text-xs black-text font-medium">
																		Type of Container<span className="red-text">*</span>
																	</p>
																	<CustomInput
																		control={control}
																		name={"container_type"}
																		id={"container_type"}
																		label={""}
																		placeholder={""}
																		isRequired={true}
																		type={"text"}
																		errors={errors}
																		isDisabled={true}
																		defaultValue={data?.container_type}
																		min={""}
																		max={""}
																		icon={""}
																	/>
																</div>
																<div className="ml-1">
																	<p className="text-xs black-text font-medium">
																		Weight of Goods (Metric Ton)
																		<span className="red-text">*</span>
																	</p>
																	<CustomInput
																		control={control}
																		name={"container_weight"}
																		id={"container_weight"}
																		label={""}
																		placeholder={"Weight"}
																		isRequired={true}
																		type={"number"}
																		errors={errors}
																		isDisabled={false}
																		defaultValue={data?.container_weight}
																		min={""}
																		max={""}
																		icon={""}
																	/>
																</div>
															</div>
														</>
													)
												})
											}
										</div> */}

										<div className="mt-3 grid grid-cols-4 items-center">
											<div className="">
												<p className="text-xs black-text font-medium">
													Size of Container<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"container_size"}
													id={"container_size"}
													label={""}
													placeholder={""}
													isRequired={true}
													type={"text"}
													errors={errors}
													isDisabled={true}
													defaultValue={
														single_shipment_data?.container_details[0]
															?.container_size
													}
													min={""}
													max={""}
													icon={""}
												/>
											</div>

											<div className="ml-1">
												<p className="text-xs black-text font-medium">
													Type of Container<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"container_type"}
													id={"container_type"}
													label={""}
													placeholder={""}
													isRequired={true}
													type={"text"}
													errors={errors}
													isDisabled={true}
													defaultValue={
														single_shipment_data?.container_details[0]
															?.container_type
													}
													min={""}
													max={""}
													icon={""}
												/>
											</div>

											<div className="ml-1">
												<p className="text-xs black-text font-medium">
													Weight of Goods (Metric Ton)
													<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"container_weight"}
													id={"container_weight"}
													label={""}
													placeholder={"Weight"}
													isRequired={true}
													type={"number"}
													errors={errors}
													isDisabled={true}
													defaultValue={
														single_shipment_data?.container_details[0]
															?.container_weight
													}
													min={""}
													max={""}
													icon={""}
												/>
											</div>
											<div className="ml-1">
												<p className="text-xs black-text font-medium">
													Number of Containers (Metric Ton)
													<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"container_count"}
													id={"container_count"}
													label={""}
													placeholder={"Container Count"}
													isRequired={true}
													type={"number"}
													errors={errors}
													isDisabled={true}
													defaultValue={single_shipment_data?.container_details[0]?.container_count?.toString()}
													min={""}
													max={""}
													icon={""}
												/>
											</div>
										</div>

										<div className="mt-3 grid grid-cols-4">
											<div className="ml-1">
												<p className="text-xs black-text font-medium">
													Total value of Goods(₦)<small>(optioanl)</small>
												</p>
												<CustomInput
													control={control}
													name={"goods_value"}
													id={"goods_value"}
													label={""}
													placeholder={"Value of Goods"}
													isRequired={false}
													type={"number"}
													errors={errors}
													isDisabled={false}
													defaultValue={single_shipment_data?.goods_value}
													min={""}
													max={""}
													icon={""}
												/>
											</div>

											<div className="ml-1">
												<p className="text-xs black-text font-medium">
													Commodity Description
													<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"goods_type"}
													id={"goods_type"}
													label={""}
													placeholder={"Commodity Description"}
													isRequired={false}
													type={"text"}
													errors={errors}
													isDisabled={false}
													defaultValue={single_shipment_data?.goods_type}
													min={""}
													max={""}
													icon={""}
												/>
											</div>

											<div className="ml-1">
												<p className="text-xs black-text font-medium">
													B/L Number<small>(optional)</small>
												</p>
												<CustomInput
													control={control}
													name={"bl_number"}
													id={"bl_number"}
													label={""}
													placeholder={""}
													isRequired={false}
													type={"text"}
													errors={errors}
													isDisabled={false}
													defaultValue={
														single_shipment_data?.bl_number === undefined
															? "N/A"
															: single_shipment_data?.bl_number
													}
													min={""}
													max={""}
													icon={""}
												/>
											</div>

											<div className="ml-1">
												<p className="text-xs black-text font-medium">
													Office / Branch<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"branch"}
													id={"branch"}
													label={""}
													placeholder={""}
													isRequired={false}
													type={"text"}
													errors={errors}
													isDisabled={true}
													defaultValue={single_shipment_data?.branch}
													min={""}
													max={""}
													icon={""}
												/>
											</div>
										</div>

										<div className="mt-2">
											<p className="text-xs black-text mb-2 font-medium">
												Services Provided <small>(Select all that apply)</small>
											</p>
											<div className="grid grid-cols-1">
												<div className="flex items-center mb-5">
													<div className="mr-3">
														<NewCustomCheckbox
															name="customs_brokerage"
															id="customs_brokerage"
															label="Customs Brokerage & Terminal"
															isRequired={false}
															isDisabled={true}
															onChange={(e: any) =>
																setCustoms(e.target.checked)
															}
															defaultChecked={
																single_shipment_data?.customs_brokerage
															}
															onClick={() => {
																setShowFastTrackLicense(!showFastTrackLicense);
															}}
														// onClick={() => {
														//     setShowCbt(!showCbt);
														// }}
														/>
													</div>

													<div className="mr-3">
														<CustomCheckBox
															name="harcourt"
															id="harcourt"
															label="Warehousing"
															isRequired={false}
															isDisabled={false}
															onChange={(e: any) =>
																setWarehousing(e.target.checked)
															}
															// defaultChecked={false}
															defaultChecked={single_shipment_data?.warehousing}
														/>
													</div>
												</div>
											</div>
											<>
												<div className="grid grid-cols-1 mb-3">
													{single_shipment_data?.customs_brokerage === true ? (
														<>
															{showFastTrackLicense ? (
																<>
																	<div className="mt-3">
																		<p className="text-xs black-text font-medium mb-2">
																			Do you have a Fast Track License?{" "}
																			<small>
																				(Disabled. As Changes here affects
																				price)
																			</small>
																		</p>
																		<div className="grid grid-cols-4">
																			{single_shipment_data?.with_tbl ===
																				true ? (
																				<>
																					<div className="">
																						<CustomRadio
																							selected={fasttrackLicense}
																							label={"Yes"}
																							onClick={() => { }}
																						/>
																					</div>
																					<div className="ml-2">
																						<CustomRadio
																							selected={!fasttrackLicense}
																							label={"No"}
																							// onClick={() => setFasttrackLicense(false)}
																							onClick={() => { }}
																						/>
																					</div>
																				</>
																			) : (
																				<>
																					<div className="">
																						<CustomRadio
																							selected={fasttrackLicense}
																							label={"Yes"}
																							onClick={() => { }}
																						/>
																					</div>
																					<div className="ml-2">
																						<CustomRadio
																							selected={!fasttrackLicense}
																							label={"No"}
																							// onClick={() => setFasttrackLicense(false)}
																							onClick={() => { }}
																						/>
																					</div>
																				</>
																			)}
																		</div>
																	</div>
																	{single_shipment_data?.customs_brokerage ===
																		true ? (
																		<>
																			{showCbt ? (
																				<>
																					<div>
																						<p className="text-sm quote-text mb-2">
																							Select Custom Brokerage Type
																							<small>
																								(Disabled. As Changes here
																								affects price)
																							</small>
																						</p>

																						{single_shipment_data?.with_tbl ===
																							true ? (
																							<div className="grid grid-cols-4">
																								<div className="">
																									<NewCustomRadio
																										selected={
																											brokerageType === "Normal"
																												? true
																												: false
																										}
																										label={"Normal CBT"}
																										icon={""}
																										isDisabled={true}
																										onClick={() => { }}
																									/>
																								</div>

																								<div className="ml-2">
																									<NewCustomRadio
																										selected={
																											brokerageType ===
																												"Transire"
																												? true
																												: false
																										}
																										label={"Transire CBT"}
																										icon={""}
																										isDisabled={true}
																										onClick={() => { }}
																									/>
																								</div>

																								<div className="ml-2">
																									<NewCustomRadio
																										selected={
																											brokerageType === "Scan"
																												? true
																												: false
																										}
																										label={"Scan CBT"}
																										icon={""}
																										isDisabled={true}
																										onClick={() => { }}
																									/>
																								</div>
																							</div>
																						) : (
																							<div className="grid grid-cols-4">
																								<div className="">
																									<NewCustomRadio
																										selected={
																											brokerageType === "Normal"
																												? true
																												: false
																										}
																										label={"Normal CBT"}
																										icon={""}
																										isDisabled={true}
																										onClick={() => { }}
																									/>
																								</div>

																								<div className="ml-2">
																									<NewCustomRadio
																										selected={
																											brokerageType ===
																												"Transire"
																												? true
																												: false
																										}
																										label={"Transire CBT"}
																										icon={""}
																										isDisabled={true}
																										onClick={() => { }}
																									/>
																								</div>

																								<div className="ml-2">
																									<NewCustomRadio
																										selected={
																											brokerageType === "Scan"
																												? true
																												: false
																										}
																										label={"Scan CBT"}
																										icon={""}
																										isDisabled={true}
																										onClick={() => { }}
																									/>
																								</div>
																							</div>
																						)}
																					</div>
																					<div></div>
																					<div className="grid grid-cols-1 mb-5">
																						{EnableTbl ? (
																							<>
																								<div>
																									<p className="add-shipment-text py-2">
																										Do you require TBL?
																										<small className="text-xs font-light">
																											(Transire CBT is selected
																											and disabled. As Changes
																											here affects price)
																										</small>
																									</p>
																									<div>
																										<>
																											<div className="grid grid-cols-3 mt-2">
																												<div className="mr-3">
																													<NewCustomCheckbox
																														name="tbl"
																														id="tbl"
																														label="TBL"
																														isRequired={false}
																														isDisabled={true}
																														onChange={(
																															e: any
																														) =>
																															setTbl(
																																e.target.checked
																															)
																														}
																														defaultChecked={
																															true
																														}
																														onClick={() => { }}
																													/>
																												</div>
																											</div>
																										</>

																										{showTbl ? (
																											<>
																												<div className="grid grid-cols-1">
																													<div>
																														<>
																															<div className="py-3">
																																<p className="text-sm quote-text mb-2">
																																	Select TBL
																																	Type
																																</p>
																																<div className="grid grid-cols-3">
																																	<div className="mr-3">
																																		<CustomRadio
																																			selected={
																																				tblType ===
																																					"normal"
																																					? true
																																					: false
																																			}
																																			label={
																																				"Normal"
																																			}
																																			onClick={() => { }}
																																		/>
																																	</div>

																																	<div>
																																		<CustomRadio
																																			selected={
																																				tblType ===
																																					"triangulation"
																																					? true
																																					: false
																																			}
																																			label={
																																				"Triangulation"
																																			}
																																			onClick={() => { }}
																																		/>
																																	</div>
																																</div>
																															</div>
																														</>
																													</div>
																												</div>
																											</>
																										) : (
																											<></>
																										)}
																									</div>
																								</div>
																							</>
																						) : (
																							<></>
																						)}
																					</div>
																				</>
																			) : (
																				<></>
																			)}
																		</>
																	) : (
																		<></>
																	)}
																</>
															) : (
																<></>
															)}
														</>
													) : (
														<></>
													)}
												</div>
											</>
										</div>

										<div>
											<p className="add-shipment-text py-1">
												Add Haulage to this Shipment?
												<small>(Disabled. As Changes here affects price)</small>
											</p>
											<div className="grid grid-cols-3 mt-2">
												<div className="mr-3">
													<NewCustomCheckbox
														name="haulage"
														id="haulage"
														label="Haulage"
														isRequired={false}
														isDisabled={true}
														onChange={(e: any) => { }}
														defaultChecked={single_shipment_data?.with_haulage}
														onClick={() => {
															if (haulage) {
																setHaulage(false);
															} else {
																setHaulage(true);
															}

															setShowImportHaulage(!showImportHaulage);
														}}
													/>
												</div>
											</div>
										</div>
									</div>

									<>
										{showImportHaulage ? (
											<>
												<div className="lg:px-8">
													<div className="mt-3 grid grid-cols-3 mb-2">
														<div className="mr-1">
															<p className="text-xs black-text font-medium">
																{" "}
																Pickup location{" "}
															</p>
															<CustomInput
																control={control}
																name={"pickup_location"}
																id={"pickup_location"}
																label={""}
																placeholder={""}
																isRequired={false}
																type={"text"}
																errors={errors}
																isDisabled={true}
																defaultValue={
																	single_shipment_data.port_of_discharge
																}
																min={""}
																max={""}
																icon={""}
															/>
														</div>

														<div className="mr-1">
															<p className="text-xs black-text font-medium">
																Select Terminal Location
															</p>
															<CustomInput
																control={control}
																name={"terminal_port"}
																id={"terminal_port"}
																label={""}
																placeholder={""}
																isRequired={false}
																type={"text"}
																errors={errors}
																isDisabled={true}
																defaultValue={
																	single_shipment_data.delivery_location
																}
																min={""}
																max={""}
																icon={""}
															/>
														</div>

														<div className="mr-1">
															<p className="text-xs black-text font-medium">
																Pick Up Date
															</p>
															<CustomInput
																control={control}
																name={"cargo_pickup_date"}
																id={"cargo_pickup_date"}
																label={""}
																placeholder={"Stuffing Date"}
																isRequired={false}
																type={"date"}
																errors={errors}
																isDisabled={false}
																defaultValue={
																	single_shipment_data.cargo_pickup_date
																}
																min={""}
																max={""}
																icon={""}
															/>
														</div>
													</div>

													<div className="lg:grid grid-cols-3">
														<div className="mt-3">
															<p className="text-xs black-text font-medium mb-2">
																Do you require an Haulage Tracker ?
																<span className="red-text">*</span>
															</p>
															<div className="grid grid-cols-3">
																<div className="">
																	<CustomRadio
																		selected={tracker}
																		label={"Yes"}
																		onClick={() => setTracker(true)}
																	/>
																</div>

																<div className="ml-2">
																	<CustomRadio
																		selected={!tracker}
																		label={"No"}
																		onClick={() => setTracker(false)}
																	/>
																</div>
															</div>
														</div>

														<div className="mt-3">
															<p className="text-xs black-text font-medium mb-2">
																Do you require an Haulage Escort ?
																<span className="red-text">*</span>
															</p>
															<div className="grid grid-cols-3">
																<div className="">
																	<CustomRadio
																		selected={escort}
																		label={"Yes"}
																		onClick={() => setEscort(true)}
																	/>
																</div>

																<div className="ml-2">
																	<CustomRadio
																		selected={!escort}
																		label={"No"}
																		onClick={() => setEscort(false)}
																	/>
																</div>
															</div>
														</div>

														<div className="mt-3">
															<p className="text-xs black-text font-medium mb-2">
																Is the Shipped Product Hazardous ?
																<span className="red-text">*</span>
															</p>
															<div className="grid grid-cols-3">
																<div className="">
																	<CustomRadio
																		selected={hazardous}
																		label={"Yes"}
																		onClick={() => setHazardous(true)}
																	/>
																</div>

																<div className="ml-2">
																	<CustomRadio
																		selected={!hazardous}
																		label={"No"}
																		onClick={() => setHazardous(false)}
																	/>
																</div>
															</div>
														</div>
													</div>
												</div>
											</>
										) : (
											<></>
										)}
									</>

									<div className="lg:px-8 px-5 mb-5">
										<div className="grid grid-cols-1">
											<div className="mt-5">
												<p className="text-xs black-text mb-2 font-medium">
													Additional Comments <small>(Optional)</small>
												</p>
												<CustomTextarea
													control={control}
													name={"additional_comments"}
													id={"additional_comments"}
													label={""}
													placeholder={"Enter Comments here if necessary"}
													isRequired={false}
													errors={errors}
													isDisabled={false}
													defaultValue={""}
													icon=""
												/>
											</div>
										</div>
									</div>
									<div className="grid grid-cols-3 mt-10 items-center">
										<div></div>
										<div></div>
										<div className="w-22" style={{ justifyContent: "left" }}>
											{" "}
											{/* @ts-ignore */}
											<PrimaryButton title="Submit" loading={loading} />
										</div>
									</div>
								</form>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

// export default EditOceamImport

const mapStateToProps = (state: any) => {
	const { single_shipment, loading } = state.shipments;
	return { single_shipment, loading };
};

export default connect(mapStateToProps, {
	getSingleShipment,
	editShipmentDetails,
})(EditOceamImport);
