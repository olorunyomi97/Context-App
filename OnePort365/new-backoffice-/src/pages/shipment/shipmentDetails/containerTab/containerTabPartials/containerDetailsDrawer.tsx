import { useState, useEffect } from "react";
import SlidingPane from "react-sliding-pane";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomInput from "components/textInputs/CustomInput";
import NewCustomInput from "components/textInputs/NewCustomInput";
import CustomSelect from "components/selectInputs/CustomSelect";
import { getSingleShipment, editContainerDetails } from "store/actions";
import mixpanel from "helpers/mixpanel";
import { useSelector } from "react-redux";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		padding: " 1.5rem",
		transform: "translate(-50%, -50%)",
		width: "410px",
		borderRadius: "5px",
		border: "0.01px solid #888",
	},
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.8)",
	},
};

const ContainerDetailsDrawer = (props: any) => {
	const params = useParams();
	const { isOpen, setIsOpen, container_id, loading, single_shipment, selectedContainer, setSelectedContainer } = props;
	const { handleSubmit, control, reset, formState: { errors } } = useForm();

	// console.log(selectedContainer);
	// console.log(container_id)
	// console.log(single_shipment?.data?.data[0].container_details)
	// console.log("selectedContainer=>", selectedContainer)

	let admin_data = useSelector((state: any) => state.auth.admin_data);
	// @ts-ignore
	admin_data = JSON.parse(localStorage.getItem("admin_data"))
		? localStorage.getItem("admin_data")
		: localStorage.getItem("admin_data");

	const onSubmit = (data: any) => {
		const newData = {
			id: params.id,
			container_id: container_id,
			container_number: data?.container_number,
			seal_number: data?.seal_number,
			sealing_date: data?.sealing_date,
			truck_positioned_date: data?.truck_positioned_date,
			truck_gate_in_date: data?.truck_gate_in_date,
			stuffing_date: data?.stuffing_date,
			sailing_date: data?.sailing_date,
			post_shipment_docs: data?.post_shipment_docs,
		};
		props.editContainerDetails(newData);
		// console.log(newData)

		mixpanel.track("Admin Updated Container Details", {
			email: admin_data.email,
		});
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={() => {
				selectedContainer("");
				setIsOpen(false);
			}}
			style={customStyles}
			contentLabel="Update Container Status Modal"
		>
			<div className="flex">
				<i
					className="ion-ios-close text-3xl ml-auto cursor-pointer"
					onClick={() => setIsOpen(false)}
				/>
			</div>
			<div className=" flex flex-col">
				{/* <img src={success} alt="" width={100} className="mx-auto" /> */}
				{loading ? (
					<div className="text-center my-3">
						<Link to="#" className="text-success">
							{/* @ts-ignore */}
							<PrimaryButton
								title="Loading Container Details"
								loading={loading}
							/>
						</Link>
					</div>
				) : (
					<>
						<div className="mb-10">
							<p className="text-lg quote-text font-semibold mb-3 text-center">
								Update Container
								<span className="green-text">
									(
									{selectedContainer?.container_number === null
										? "No Number Assigned Yet"
										: selectedContainer?.container_number}
									)
								</span>
							</p>
							<div className="mt-5">
								<div className="mb-5">
									<form className="p-5" onSubmit={handleSubmit(onSubmit)}>
										<div className="rounded-t-lg">
											<div className="mb-5">
												<p className="text-xs black-text font-medium">
													Container Number<span className="red-text">*</span>
												</p>
												{/* { */}
												{/* // selectedContainer.container_number !== null ? ( */}
												<>
													<NewCustomInput
														control={control}
														name={"container_number"}
														id={"container_number"}
														label={""}
														placeholder={"Enter Container Number"}
														isRequired={true}
														type={"text"}
														errors={errors}
														isDisabled={false}
														defaultValue={selectedContainer?.container_number}
														min={"11"}
														max={"11"}
														icon={""}
													/>
												</>

												<p className="text-xs black-text font-medium">
													Seal Number<small>(optional)</small>
												</p>
												<NewCustomInput
													control={control}
													name={"seal_number"}
													id={"seal_number"}
													label={""}
													placeholder={"Enter Seal Number"}
													isRequired={false}
													type={"text"}
													errors={errors}
													isDisabled={false}
													defaultValue={selectedContainer?.shipping_line_seal_number}
													min={"11"}
													max={"11"}
													icon={""}
												/>
											</div>

											<div className="ml-auto">
												{" "}
												{/* @ts-ignore */}
												<PrimaryButton title="Save" loading={loading} />
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</Modal>
	);
};

// export default ContainerDetailsDrawer

const mapStateToProps = (state: any) => {
	const { loading } = state.shipments;
	return { loading };
};

export default connect(mapStateToProps, {
	getSingleShipment,
	editContainerDetails,
})(ContainerDetailsDrawer);
