import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CustomInput from "components/textInputs/CustomInput";
import CustomSelect from "components/selectInputs/CustomSelect";
import PrimaryButton from "components/buttons/PrimaryButton";
import NewCustomCheckbox from "components/checkBox/NewCustomCheckbox";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";
import CustomerAutocomplete from "components/customerAutocomplete/customerAutocomplete";
import NewCustomRadio from "components/selectInputs/NewCustomRadio";
import CustomTextarea from "components/textInputs/CustomTextarea";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import { createShipment } from "store/actions";
import CustomRadio from "components/selectInputs/CustomRadio";
import { parseAllPorts } from "helpers/index";
import mixpanel from "helpers/mixpanel";
import { useSelector } from "react-redux";
const _Json = require("sea-ports");

const ImportAndHaulage = (props: any) => {
	const { loading, shipmentType } = props;
	const { handleSubmit, control, formState: { errors } } = useForm();
	const [haulage, setHaulage] = useState(false);
	const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
	const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
	const [tracker, setTracker] = useState(false);
	const [escort, setEscort] = useState(false);
	const [hazardous, setHazardous] = useState(false);
	const [tbl, setTbl] = useState(false);
	const [showTbl, setShowTbl] = useState(false);
	const [customs, setCustoms] = useState(false);
	const [tblType, setTblType] = useState('');
	const [brokerageType, setBrokerageType] = useState('');

	let admin_data = useSelector((state: any) => state.auth.admin_data);
	// @ts-ignore
	admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));


	useEffect(() => {
		const parsePorts = parseAllPorts(_Json.JSON);
		setDefaultPortsOfOrigin(parsePorts.origin);
		setDefaultPortsOfDestination(parsePorts.destination);
		mixpanel.track("Start new shipment", {
			email: admin_data.email,
		});
	}, []);

	const onSubmit = (data: any) => {
		console.log(data.customer_id);
		const newData = {
			shipment_type: "import",
			shipment_transport_type: "haulage",
			pickup_location: data?.pickup_location?.label,
			delivery_location: data?.delivery_location?.label,
			origin_port_code: data?.origin_port?.value?.unlocs[0],
			destination_port_code: data?.destination_port?.value?.unlocs[0],
			port_of_discharge: data?.port_of_discharge?.label,
			customer_id: data.customer_id.value,
			cargo_pickup_date: data?.cargo_pickup_date,
			branch: data?.branch.value,
			container_size: data?.container_size.value,
			container_type: data?.container_type.value,
			container_count: data?.container_count,
			container_weight: data?.container_weight,
			goods_type: data?.goods_type,
			goods_value: data?.goods_value,
			bl_number: data?.bl_number,
			tdo_written_date: data?.tdo_written_date,
			tdo_expiry: data?.tdo_expiry,
			with_tracker: tracker,
			with_escort: escort,
			is_product_hazardous: hazardous,
			with_tbl: tbl,
			tbl_type: tblType,
			customs: customs,
			brokerage_type: brokerageType,
			additional_comments: data?.additional_comments,
		};
		props.createShipment(newData);
		console.log(JSON.stringify(newData))
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className="my-5">
				<div className="lg:px-8 px-5">
					<p className="add-shipment-text mb-5">Import Shipment & Haulage</p>
					<div className="grid grid-cols-1 mb-3">
						<div className="mr-1">
							<p className="text-xs mb-2 font-medium">Customer Name<span className="red-text">*</span>
								<Link
									to="/customers/customer-creation"
								>
									<small>if customer is not registered</small><small className="green-text">(Create Customer)</small>
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
					<div className="mt-3 grid grid-cols-2 mb-2">
						<div className="mr-1">
							<p className="text-xs black-text font-medium">Port Of Discharge<span className="red-text">*</span></p>
							<CustomSelect
								control={control}
								name={"pickup_location"}
								id={"pickup_location"}
								label={""}
								placeholder={""}
								isRequired={true}
								errors={errors}
								isDisabled={false}
								defaultValue={""}
								options={defaultPortsOfOrigin}
								icon=""
							/>
						</div>

						<div className="mr-1">
							<p className="text-xs black-text font-medium">Destination<span className="red-text">*</span></p>
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

					<div className="grid grid-cols-2">
						<div className="ml-1">
							<p className="text-xs black-text font-medium">Commodity Description<span className="red-text">*</span></p>
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
							<p className="text-xs black-text font-medium">Total Value of Goods (₦)<span className="red-text">*</span></p>
							<CustomCurrencyInput
								control={control}
								name={"goods_value"}
								id={"goods_value"}
								label={""}
								placeholder={"value(₦)"}
								isRequired={true}
								type={"number"}
								errors={errors}
								isDisabled={false}
								defaultValue={""}
								min={1}
								max={""}
								icon=""
							/>
						</div>
					</div>
					{/* Desktop Form */}
					<div className="mt-3 grid grid-cols-4 desktop-only">
						<div className="">
							<p className="text-xs black-text font-medium">Size of Container<span className="red-text">*</span></p>
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
							<p className="text-xs black-text font-medium">Type of Container<span className="red-text">*</span></p>
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
							<p className="text-xs black-text font-medium">Number Of Containers<span className="red-text">*</span></p>
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
							<p className="text-xs black-text font-medium">Weight of Goods (Metric Ton)<span className="red-text">*</span></p>
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
					{/* Desktop Form */}

					{/* Mobile Form */}
					<div className="mb-3 grid grid-cols-2 mobile-device-only">
						<div className="mr-1">
							<p className="text-xs black-text font-medium">Size of Container<span className="red-text">*</span></p>
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
							<p className="text-xs black-text font-medium">Type of Container<span className="red-text">*</span></p>
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
							<p className="text-xs black-text font-medium">Number Of Containers<span className="red-text">*</span></p>
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

						<div className="mr-1">
							<p className="text-xs black-text font-medium">Weight of Goods (Metric Ton)<span className="red-text">*</span></p>
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

					<div className="grid grid-cols-2 mobile-device-only">
						<div className="ml-1">
							<p className="text-xs black-text font-medium">B/L Number<small>(optional)</small></p>
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
							<p className="text-xs black-text font-medium">Office / Branch<span className="red-text">*</span></p>
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
						<div className="grid grid-cols-3 desktop-only">
							<div className="">
								<p className="text-xs black-text font-medium">B/L Number<small>(optional)</small></p>
								<CustomInput
									control={control}
									name={"bl_number"}
									id={"bl_number"}
									label={""}
									placeholder={"B/L Number"}
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

							<div className="ml-1 ">
								<p className="text-xs black-text font-medium">Branch<span className="red-text">*</span></p>
								<CustomSelect
									control={control}
									name={`branch`}
									id={`branch`}
									label={""}
									placeholder={`Branch`}
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

						<div className="grid grid-cols-2">
							<div className="mr-1">
								<p className="text-xs black-text font-medium">TDO Written Date<small>(Optional)</small></p>
								<CustomInput
									control={control}
									name={"tdo_written_date"}
									id={"tdo_written_date"}
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
								<p className="text-xs black-text font-medium">TDO Expiry Date<small>(Optional)</small></p>
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
								<p className="text-xs black-text font-medium mb-2">Do you require an Haulage Escort ?<span className="red-text">*</span></p>
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
								<p className="text-xs black-text font-medium mb-2">Is the Shipped Product Hazardous ?<span className="red-text">*</span></p>
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

					<div className="lg:grid grid-cols-3">
						<div className="mt-2">
							<p className="add-shipment-text py-3">Do you require TBL?</p>
							<div className="grid grid-cols-3">
								<div className="">
									<CustomRadio
										selected={tbl === true ? true : false}
										label={"Yes"}
										onClick={() => {
											setTbl(true);
											setBrokerageType('Transire');
											setCustoms(true);
											setShowTbl(!showTbl);
										}}
									/>
								</div>

								<div className="ml-2">
									<CustomRadio
										selected={tbl === false ? true : false}
										label={"No"}
										onClick={() => {
											setTbl(false);
											setCustoms(false);
											setTblType('')
											setBrokerageType('')
											setShowTbl(false);
										}}
									/>
								</div>
							</div>

							{showTbl ? (
								<>
									<div className="grid grid-cols-1">
										<div>
											<>
												<div className="py-2">
													<p className="text-sm quote-text mb-2">Select TBL Type</p>
													<div className="bg-light-yellow p-4 rounded-md mb-7" style={{ background: " #fef3c7" }}>
														<p className="black-text text-sm font-semibold mb-2">Disclaimer</p>
														<p className="black-text text-xs">If TBL is selected, CBT/Transire is automatically Selected and disabled.</p>
													</div>
													{/* CBT/TRANSIRE BY DEFAULT */}
													<div className="mb-3">
														<div className="mr-3 mb-2">
															<NewCustomCheckbox
																name=""
																id=""
																label="Customs Brokerage & Terminal"
																isRequired={false}
																isDisabled={true}
																onChange={''}
																defaultChecked={true}
																onClick={() => { }}
															/>
														</div>
														<div className="grid grid-cols-2 mt-3 mb-5">
															<NewCustomRadio
																selected={brokerageType === 'Transire' ? true : false}
																label={"Transire CBT"}
																icon={''}
																isDisabled={true}
																onClick={() => {
																	// setBrokerageType('Transire')
																}}
															/>
														</div>
													</div>
													{/* CBT/TRANSIRE BY DEFAULT */}

													{/* TBL TYPE */}
													<div className="grid grid-cols-2">
														<CustomRadio
															selected={tblType === "Normal" ? true : false}
															label={"Normal"}
															onClick={() => setTblType("Normal")}
														/>

														<div className="ml-2">
															<CustomRadio
																selected={tblType === "Triangulation" ? true : false}
																label={"Triangulation"}
																onClick={() => setTblType("Triangulation")}
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



				</div>
				<div className="lg:px-8 px-5 mb-5">
					<div className="grid grid-cols-1">
						<div className="mt-5">
							<p className="text-xs black-text mb-2 font-medium">Additional Comments <small>(Optional)</small></p>
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
					<div className="w-22"></div>
					<div></div>
					<div className="w-22" style={{ justifyContent: 'left' }}>
						{" "}
						{/* @ts-ignore */}
						<PrimaryButton
							title="Submit"
							loading={loading}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

// export default ImportAndHaulage

const mapStateToProps = (state: any) => {
	const { error, loading } = state.shipmentsPlus;
	return { error, loading };
};
export default connect(mapStateToProps, { createShipment })(
	ImportAndHaulage
);
