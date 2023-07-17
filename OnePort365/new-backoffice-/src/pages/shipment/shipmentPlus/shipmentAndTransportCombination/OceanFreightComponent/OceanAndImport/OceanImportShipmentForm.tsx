import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CustomInput from "components/textInputs/CustomInput";
import CustomSelect from "components/selectInputs/CustomSelect";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import NewCustomCheckbox from "components/checkBox/NewCustomCheckbox";
import NewCustomCheckbox2 from "components/checkBox/NewCustomCheckbox2";
import CustomerAutocomplete from "components/customerAutocomplete/customerAutocomplete";
import CustomTextarea from "components/textInputs/CustomTextarea";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import { createShipment } from "store/actions";
import CustomRadio from "components/selectInputs/CustomRadio";
import { parseAllPorts } from "helpers/index";
import NewCustomRadio from "components/selectInputs/NewCustomRadio";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";
import mixpanel from "helpers/mixpanel";
import { useSelector } from "react-redux";
const _Json = require("sea-ports");

const OceanImportShipment = (props: any) => {
	const { nextStep, previousStep } = props;
	const { loading, shipmentType, transportationType } = props;
	const { handleSubmit, control, formState: { errors } } = useForm();
	const [customs, setCustoms] = useState(false);
	const [warehousing, setWarehousing] = useState(false);
	const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
	const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
	const [haulage, setHaulage] = useState("");
	const [showImportHaulage, setShowImportHaulage] = useState(false);
	const [showCbt, setShowCbt] = useState(false);
	const [showFastTrackLicense, setShowFastTrackLicense] = useState(false);
	const [tbl, setTbl] = useState(false);
	const [showTbl, setShowTbl] = useState(false);
	const [EnableTbl, setEnableTbl] = useState(false);
	const [tracker, setTracker] = useState(false);
	const [escort, setEscort] = useState(false);
	const [tblType, setTblType] = useState("normal");
	const [brokerageType, setBrokerageType] = useState("Normal CBT");
	const [hazardous, setHazardous] = useState(false);
	const [fasttrackLicense, setFasttrackLicense] = useState(true);

	let admin_data = useSelector((state: any) => state.auth.admin_data);
	// @ts-ignore
	// prettier-ignore
	admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));


	useEffect(() => {
		const parsePorts = parseAllPorts(_Json.JSON);
		setDefaultPortsOfOrigin(parsePorts.origin);
		setDefaultPortsOfDestination(parsePorts.destination);
		mixpanel.track("Start new shipment", {
			email: admin_data.email,
		});
	}, []);

	// useEffect to fire a render when customs is changed
	useEffect(() => {
		if (tbl) {
			setCustoms(true);
			setShowFastTrackLicense(true);
			setFasttrackLicense(false);
			setShowCbt(true);
			setBrokerageType("Transire");
		} else {
			setCustoms(false);
			// setShowCbt(false);
			setShowFastTrackLicense(false);
		}
	}, [tbl]);

	console.log("fast track", fasttrackLicense);

	useEffect(() => {
		if (!fasttrackLicense) {
			setShowCbt(true);
		}

		if (!customs) {
			setShowCbt(false);
		}
	}, [customs]);

	useEffect(() => {
		if (!haulage) {
			setTbl(false);
			setShowTbl(false);
		}
	}, [haulage]);

	const onSubmit = (data: any) => {
		const newData = {
			shipment_type: "import",
			shipment_transport_type: "ocean_freight",
			customs,
			warehousing,
			with_haulage: haulage,
			customer_id: data.customer_id.value,
			port_of_discharge: data?.port_of_discharge?.label,
			delivery_location: data?.delivery_location?.label,
			destination_port_code: data?.destination_port?.value?.unlocs[0],
			dropoff_location_port: data?.port_of_discharge?.value?.unlocs[0],
			container_size: data?.container_size.value,
			container_type: data?.container_type.value,
			container_count: data?.container_count,
			container_weight: data?.container_weight,
			goods_value: data?.goods_value,
			goods_type: data?.goods_type,
			bl_number: data?.bl_number,
			branch: data?.branch.value,
			pickup_location: data?.pickup_location?.label,
			terminal_location_port: data?.terminal_location_port?.value,
			cargo_pickup_date: data?.cargo_pickup_date,
			tdo_date: data?.tdo_date,
			tdo_expiry: data?.tdo_expiry,
			brokerage_type: fasttrackLicense ? "Fast Track CBT" : brokerageType,
			with_tbl: tbl,
			tbl_type: fasttrackLicense ? "" : tblType,
			with_tracker: tracker,
			with_escort: escort,
			is_product_hazardous: hazardous,
			additional_comments: data?.additional_comments,
			with_fast_track_license: fasttrackLicense,
		};
		props.createShipment(newData);
	};

	return (
		<div className="lg:px-10 px-5  py-10 mb-3">
			<form onSubmit={handleSubmit(onSubmit)} className="my-5">
				<div className="">
					<p className="add-shipment-text mb-5">
						Import Shipment & Ocean Freight
					</p>
					<div className="grid grid-cols-1 mb-3">
						<div className="mr-1">
							<p className="text-xs mb-2 font-medium">
								Customer Name<span className="red-text">*</span>
								<Link to="/customers/customer-creation">
									<small>if customer is not registered</small>
									<small className="green-text">(Create Customer)</small>
								</Link>
							</p>
							<CustomerAutocomplete
								control={control}
								name={"customer_id"}
								id={"customer_id"}
								label={"Customer Selection"}
								placeholder={"Customer Name"}
								isRequired={true}
								errors={errors}
								isDisabled={false}
								icon=""
							/>
						</div>
					</div>

					<div className="mt-3 grid grid-cols-2 ">
						<div className="mr-1">
							<p className="text-xs black-text font-medium">
								{" "}
								Port of discharge<span className="red-text">*</span>
							</p>
							<CustomSelect
								control={control}
								name={"port_of_discharge"}
								id={"port_of_discharge"}
								label={""}
								placeholder={""}
								isRequired={true}
								errors={errors}
								isDisabled={false}
								options={defaultPortsOfOrigin}
								defaultValue={""}
								icon=""
							/>
						</div>

						<div className="mr-1">
							<p className="text-xs black-text font-medium">
								{" "}
								Delivery location <span className="red-text">*</span>
							</p>
							<CustomGoogleInput
								control={control}
								name={"delivery_location"}
								id={"delivery_location"}
								label={""}
								placeholder={""}
								isRequired={true}
								errors={errors}
								isDisabled={false}
								defaultValue={""}
								icon=""
							/>
						</div>
					</div>
				</div>

				<div className="mt-3 grid grid-cols-4 desktop-only">
					<div className="">
						<p className="text-xs black-text font-medium">
							Size of Container<span className="red-text">*</span>
						</p>
						<CustomSelect
							control={control}
							name={`container_size`}
							id={`container_size`}
							label={""}
							placeholder={`Size`}
							isRequired={true}
							errors={errors}
							isDisabled={false}
							options={[
								{ label: "20 FT", value: "20FT" },
								{ label: "40 FT", value: "40FT" },
								{ label: "40 HC", value: "40HC" },
								{ label: "45 FT", value: "45FT" },
							]}
							defaultValue={""}
							icon=""
						/>
					</div>

					<div className="ml-1">
						<p className="text-xs black-text font-medium">
							Type of Container<span className="red-text">*</span>
						</p>
						<CustomSelect
							control={control}
							name={`container_type`}
							id={`container_type`}
							label={""}
							placeholder={`Type`}
							isRequired={true}
							errors={errors}
							isDisabled={false}
							options={[
								{ label: "Dry", value: "dry" },
								{ label: "Reefer", value: "reefer" },
							]}
							defaultValue={""}
							icon=""
						/>
					</div>

					<div className="ml-1">
						<p className="text-xs black-text font-medium">
							Number Of Containers<span className="red-text">*</span>
						</p>
						<CustomInput
							control={control}
							name={"container_count"}
							id={"container_count"}
							label={""}
							placeholder={"Number Of Containers"}
							isRequired={true}
							type={"number"}
							errors={errors}
							isDisabled={false}
							defaultValue={""}
							min={""}
							max={""}
							icon={""}
						/>
					</div>

					<div className="ml-1">
						<p className="text-xs black-text font-medium">
							Weight of Goods (Metric Ton)<span className="red-text">*</span>
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
							defaultValue={""}
							min={""}
							max={""}
							icon={""}
						/>
					</div>
				</div>

				<div className="mt-3 grid grid-cols-4 desktop-only">
					<div className="ml-1">
						<p className="text-xs black-text font-medium">
							Total value of Goods(₦)
						</p>
						<CustomCurrencyInput
							control={control}
							name={"goods_value"}
							id={"goods_value"}
							label={""}
							placeholder={"value(₦)"}
							isRequired={false}
							type={"number"}
							errors={errors}
							isDisabled={false}
							defaultValue={""}
							min={1}
							max={""}
							icon=""
						/>
					</div>

					<div className="ml-1">
						<p className="text-xs black-text font-medium">
							Commodity Description<span className="red-text">*</span>
						</p>
						<CustomInput
							control={control}
							name={"goods_type"}
							id={"goods_type"}
							label={""}
							placeholder={"Commodity Description"}
							isRequired={true}
							type={"text"}
							errors={errors}
							isDisabled={false}
							defaultValue={""}
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
							placeholder={"B/L"}
							isRequired={false}
							type={"text"}
							errors={errors}
							isDisabled={false}
							defaultValue={""}
							min={""}
							max={""}
							icon={""}
						/>
					</div>

					<div className="ml-1">
						<p className="text-xs black-text font-medium">
							Office / Branch<span className="red-text">*</span>
						</p>
						<CustomSelect
							control={control}
							name={"branch"}
							id={"branch"}
							label={""}
							placeholder={"Branch"}
							isRequired={true}
							errors={errors}
							isDisabled={false}
							options={[
								{ label: "Lagos", value: "LOS" },
								{ label: "Kano", value: "KAN" },
								{ label: "Port Harcourt", value: "PHC" },
							]}
							defaultValue={""}
							icon=""
						/>
					</div>
				</div>

				{/* Mobile Form */}
				<div className="mb-3 grid grid-cols-2 mobile-device-only">
					<div className="mr-1">
						<p className="text-xs black-text font-medium">
							Size of Container<span className="red-text">*</span>
						</p>
						<CustomSelect
							control={control}
							name={`container_size`}
							id={`container_size`}
							label={""}
							placeholder={`Size`}
							isRequired={true}
							errors={errors}
							isDisabled={false}
							options={[
								{ label: "20 FT", value: "20FT" },
								{ label: "40 FT", value: "40FT" },
								{ label: "40 HC", value: "40HC" },
								{ label: "45 FT", value: "45FT" },
							]}
							defaultValue={""}
							icon=""
						/>
					</div>

					<div className="mr-1">
						<p className="text-xs black-text font-medium">
							Type of Container<span className="red-text">*</span>
						</p>
						<CustomSelect
							control={control}
							name={`container_type`}
							id={`container_type`}
							label={""}
							placeholder={`Type`}
							isRequired={true}
							errors={errors}
							isDisabled={false}
							options={[
								{ label: "Dry", value: "dry" },
								{ label: "Reefer", value: "reefer" },
							]}
							defaultValue={""}
							icon=""
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 mobile-device-only">
					<div className="mr-1">
						<p className="text-xs black-text font-medium">
							Number Of Containers<span className="red-text">*</span>
						</p>
						<CustomInput
							control={control}
							name={"container_count"}
							id={"container_count"}
							label={""}
							placeholder={"Number Of Containers"}
							isRequired={true}
							type={"text"}
							errors={errors}
							isDisabled={false}
							defaultValue={""}
							min={""}
							max={""}
							icon={""}
						/>
					</div>

					<div className="mr-1">
						<p className="text-xs black-text font-medium">
							Weight of Goods (Metric Ton)<span className="red-text">*</span>
						</p>
						<CustomInput
							control={control}
							name={"container_weight"}
							id={"container_weight"}
							label={""}
							placeholder={"Weight"}
							isRequired={true}
							type={"text"}
							errors={errors}
							isDisabled={false}
							defaultValue={""}
							min={""}
							max={""}
							icon={""}
						/>
					</div>
				</div>

				<div className="mb-3 grid grid-cols-2 mobile-device-only">
					<div className="ml-1">
						<p className="text-xs black-text font-medium">
							Total value of Goods(₦)
						</p>
						<CustomCurrencyInput
							control={control}
							name={"goods_value"}
							id={"goods_value"}
							label={""}
							placeholder={"value(₦)"}
							isRequired={false}
							type={"number"}
							errors={errors}
							isDisabled={false}
							defaultValue={""}
							min={1}
							max={""}
							icon=""
						/>
					</div>
					<div className="ml-1">
						<p className="text-xs black-text font-medium">
							Commodity<span className="red-text">*</span>
						</p>
						<CustomInput
							control={control}
							name={"goods_type"}
							id={"goods_type"}
							label={""}
							placeholder={"Commodity"}
							isRequired={true}
							type={"text"}
							errors={errors}
							isDisabled={false}
							defaultValue={""}
							min={""}
							max={""}
							icon={""}
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 mobile-device-only">
					<div className="ml-1">
						<p className="text-xs black-text font-medium">
							B/L Number<small>(optional)</small>
						</p>
						<CustomInput
							control={control}
							name={"bl_number"}
							id={"bl_number"}
							label={""}
							placeholder={"B/L"}
							isRequired={false}
							type={"text"}
							errors={errors}
							isDisabled={false}
							defaultValue={""}
							min={""}
							max={""}
							icon={""}
						/>
					</div>

					<div className="ml-1">
						<p className="text-xs black-text font-medium">
							Office / Branch<span className="red-text">*</span>
						</p>
						<CustomSelect
							control={control}
							name={"branch"}
							id={"branch"}
							label={""}
							placeholder={"Branch"}
							isRequired={true}
							errors={errors}
							isDisabled={false}
							options={[
								{ label: "Lagos", value: "LOS" },
								{ label: "Kano", value: "KAN" },
								{ label: "Port Harcourt", value: "PHC" },
							]}
							defaultValue={""}
							icon=""
						/>
					</div>
				</div>
				{/* Mobile Form */}

				<div className="mt-2">
					<p className="text-xs black-text mb-2 font-medium">
						Services Provided <small>(Select all that apply)</small>
					</p>
					<div className="grid grid-cols-1">
						<div className="flex items-center mb-5">
							<div className="mr-3">
								<NewCustomCheckbox2
									name="lagos"
									id="lagos"
									label="Customs Brokerage & Terminal"
									isRequired={false}
									isDisabled={tbl ? true : false}
									onChange={(e: any) => {
										setCustoms(e.target.checked);
										console.log(e);
									}}
									defaultChecked={customs ? true : false}
									onClick={() => {
										showFastTrackLicense
											? setShowFastTrackLicense(false)
											: setShowFastTrackLicense(true);
										setShowCbt(false);
										tbl && setCustoms(true);
									}}
									checked={customs ? true : false}
								/>
							</div>

							<div className="mr-3">
								<CustomCheckBox
									name="warehousing"
									id="warehousing"
									label="Warehousing"
									isRequired={false}
									isDisabled={false}
									onChange={(e: any) => setWarehousing(e.target.checked)}
									defaultChecked={false}
								/>
							</div>
						</div>
					</div>

					{showFastTrackLicense ? (
						<>
							<div className="mt-3">
								<p className="text-xs black-text font-medium mb-2">
									Do you have a Fast Track License?
								</p>
								<div className="grid grid-cols-4">
									{tbl ? (
										<>
											<div>
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
													onClick={() => { }}
												/>
											</div>
										</>
									) : (
										<>
											<div>
												<CustomRadio
													selected={fasttrackLicense}
													label={"Yes"}
													onClick={() => {
														setFasttrackLicense(true);
														setShowCbt(false);
														setBrokerageType("Fast Track CBT")
													}}
												/>
											</div>

											<div className="ml-2">
												<CustomRadio
													selected={!fasttrackLicense}
													label={"No"}
													onClick={() => {
														setFasttrackLicense(false);
														setShowCbt(true);
													}}
												/>
											</div>
										</>
									)}
								</div>
							</div>
						</>
					) : (
						<></>
					)}
					{showCbt ? (
						<>
							<div>
								<p className="text-sm quote-text mb-2">
									Select Custom Brokerage Type{" "}
									<small className="green-text">
										(Select CBT that applies)
									</small>
								</p>
								<div className="grid grid-cols-4">
									{tbl ? (
										<div className="">
											<NewCustomRadio
												selected={brokerageType === "Normal CBT" ? true : false}
												label={"Normal CBT"}
												icon={""}
												isDisabled={true}
												onClick={() => { }}
											/>
										</div>
									) : (
										<div className="">
											<NewCustomRadio
												selected={brokerageType === "Normal CBT" ? true : false}
												label={"Normal CBT"}
												icon={""}
												isDisabled={true}
												onClick={() => {
													setBrokerageType("Normal CBT");
													setEnableTbl(false);
												}}
											/>
										</div>
									)}
									{tbl ? (
										<div className="ml-2">
											<NewCustomRadio
												selected={brokerageType === "Transire" ? true : false}
												label={"Transire CBT"}
												icon={""}
												isDisabled={true}
												onClick={() => { }}
											/>
										</div>
									) : (
										<div className="ml-2">
											<NewCustomRadio
												selected={brokerageType === "Transire" ? true : false}
												label={"Transire CBT"}
												icon={""}
												isDisabled={true}
												onClick={() => {
													setBrokerageType("Transire");
													setEnableTbl(!EnableTbl);
												}}
											/>
										</div>
									)}

									{tbl ? (
										<div className="ml-2">
											<NewCustomRadio
												selected={brokerageType === "Scan" ? true : false}
												label={"Scan CBT"}
												icon={""}
												isDisabled={true}
												// onClick={() => setBrokerageType('Fast Track')}
												onClick={() => { }}
											/>
										</div>
									) : (
										<div className="ml-2">
											<NewCustomRadio
												selected={brokerageType === "Scan" ? true : false}
												label={"Scan CBT"}
												icon={""}
												isDisabled={true}
												// onClick={() => setBrokerageType('Fast Track')}
												onClick={() => {
													setBrokerageType("Scan");
													setEnableTbl(false);
												}}
											/>
										</div>
									)}
								</div>
							</div>
							<div></div>
						</>
					) : (
						<></>
					)}
				</div>

				<div className="mb-5">
					<div>
						<p className="add-shipment-text py-1">
							Add Haulage to this Shipment?
						</p>
						<div>
							<div className="grid grid-cols-3 mt-2">
								<div className="mr-3">
									<NewCustomCheckbox
										name="haulage"
										id="haulage"
										label="Haulage"
										isRequired={false}
										isDisabled={false}
										onChange={(e: any) => setHaulage(e.target.checked)}
										defaultChecked={false}
										onClick={() => {
											setShowImportHaulage(!showImportHaulage);
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				{showImportHaulage ? (
					<>
						<div className="">
							<div className="grid grid-cols-1 mb-3">
								<div>
									<p className="add-shipment-text py-2">
										Do you require TBL?
										<small className="text-xs font-light">
											(Transire CBT is selected)
										</small>
									</p>
									<div>
										<div className="grid grid-cols-3 mt-2">
											<div className="mr-3">
												<NewCustomCheckbox
													name="tbl"
													id="tbl"
													label="TBL"
													isRequired={false}
													isDisabled={false}
													onChange={(e: any) => setTbl(e.target.checked)}
													defaultChecked={false}
													onClick={() => {
														setShowTbl(!showTbl);
													}}
												/>
											</div>
										</div>
										{showTbl ? (
											<>
												<div className="grid grid-cols-3">
													<div>
														<>
															<div className="py-2">
																<p className="text-sm quote-text mb-2">
																	Select TBL Type
																</p>
																<div
																	className="bg-light-yellow p-4 rounded-md mb-7"
																	style={{ background: " #fef3c7" }}
																>
																	<p className="black-text text-sm font-semibold mb-2">
																		Disclaimer
																	</p>
																	<p className="black-text text-xs">
																		If TBL is selected, CBT/Transire is
																		automatically Selected.
																	</p>
																</div>
																{/* TBL TYPE */}
																<div className="grid grid-cols-2">
																	<div className="">
																		<CustomRadio
																			selected={
																				tblType === "normal" ? true : false
																			}
																			label={"Normal"}
																			onClick={() => setTblType("normal")}
																		/>
																	</div>

																	<div className="ml-2">
																		<CustomRadio
																			selected={
																				tblType === "triangulation"
																					? true
																					: false
																			}
																			label={"Triangulation"}
																			onClick={() =>
																				setTblType("triangulation")
																			}
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

								{/* <div className="mt-3 grid grid-cols-2 mb-2">
									<div className="mr-1">
										<p className="text-xs black-text font-medium">
											{" "}
											Port of Discharge<span className="red-text">*</span>
										</p>
										<CustomSelect
											control={control}
											name={"port_of_discharge"}
											id={"port_of_discharge"}
											label={""}
											placeholder={""}
											isRequired={false}
											errors={errors}
											isDisabled={false}
											options={defaultPortsOfOrigin}
											defaultValue={""}
											icon=""
										/>
									</div>

									<div className="mr-1">
										<p className="text-xs black-text font-medium">
											{" "}
											Delivery Location<span className="red-text">*</span>
										</p>
										<CustomSelect
											control={control}
											name={"delivery_location"}
											id={"delivery_location"}
											label={""}
											placeholder={""}
											isRequired={false}
											errors={errors}
											isDisabled={false}
											options={defaultPortsOfOrigin}
											defaultValue={""}
											icon=""
										/>
									</div>
								</div> */}
							</div>

							<div className="grid grid-cols-2">
								<div className="mr-1">
									<p className="text-xs black-text font-medium">
										TDO Written Date<small>(Optional)</small>
									</p>
									<CustomInput
										control={control}
										name={"tdo"}
										id={"tdo"}
										label={""}
										placeholder={"TDO Written Date"}
										isRequired={false}
										type={"date"}
										errors={errors}
										isDisabled={false}
										defaultValue={""}
										min={""}
										max={""}
										icon={""}
									/>
								</div>

								<div className="mr-1">
									<p className="text-xs black-text font-medium">
										TDO Expiry Date<small>(Optional)</small>
									</p>
									<CustomInput
										control={control}
										name={"tdo_expiry"}
										id={"tdo_expiry"}
										label={""}
										placeholder={"TDO Date"}
										isRequired={false}
										type={"date"}
										errors={errors}
										isDisabled={false}
										defaultValue={""}
										min={""}
										max={""}
										icon={""}
									/>
								</div>
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
					</>
				) : (
					<></>
				)}

				<div className="mb-5">
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

				{/* <hr className={`solid-br`} /> */}
				<div className="grid grid-cols-3 mt-10 items-center">
					<div></div>
					<div></div>
					{/* <div className="w-22" style={{ justifyContent: "left" }}>
						{" "}
						@ts-ignore
						<PrimaryButton title="Submit" loading={loading} />
					</div> */}
					<div className="w-22" style={{ justifyContent: "left" }}>
						{" "}
						{/* @ts-ignore */}
						<PrimaryButton
							title="Submit"
							// onClick={loading}
							loading={loading}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

// export default TransportationType

const mapStateToProps = (state: any) => {
	const { error, loading } = state.shipmentsPlus;
	return { error, loading };
};
export default connect(mapStateToProps, { createShipment })(
	OceanImportShipment
);
