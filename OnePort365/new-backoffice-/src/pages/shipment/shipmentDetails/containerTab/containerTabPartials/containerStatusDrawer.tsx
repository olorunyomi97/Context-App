import { useState, useEffect } from "react";
import SlidingPane from "react-sliding-pane";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import PrimaryButton from 'components/buttons/PrimaryButton';
import CustomInput from "components/textInputs/CustomInput";
import CustomSelect from "components/selectInputs/CustomSelect";
import CustomTextarea from "components/textInputs/CustomTextarea";
import { getSingleShipment, editContainerStatus } from "store/actions";
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import NewCustomSelect from "components/selectInputs/NewCustomSelect";
import Modal from "react-modal";
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

const ContainerStatusDrawer = (props: any) => {
    const params = useParams();
    const { isOpen, setIsOpen, single_shipment, loading, row_number, containerId } = props;
    // console.log(containerId)
    const { handleSubmit, control, reset, formState: { errors } } = useForm();
    const [customs, setCustoms] = useState(false);
    const single_shipment_data = single_shipment?.data?.data[0]
    // console.log(row_number)

    let admin_data = useSelector((state: any) => state.auth.admin_data);
    // @ts-ignore
    admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));


    const onSubmit = (data: any) => {
        const newData = {
            id: params.id,
            containers_id: containerId,
            status: data?.status.label,
            remarks: data?.remarks,
            // container_number: data?.container_number,
        }
        props.editContainerStatus(newData);
        console.log(newData)

        mixpanel.track("Admin Updated Container Status", {
            email: admin_data.email,
        });
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => {
                setIsOpen(false);
            }}
            style={customStyles}
            contentLabel="Update Container Status Modal"
        >
            <div className="flex">
                <i className="ion-ios-close text-3xl ml-auto cursor-pointer" onClick={() => setIsOpen(false)}></i>
            </div>
            <div className=" flex flex-col">
                {/* <img src={success} alt="" width={100} className="mx-auto" /> */}

                <div className="mb-10">
                    <p className="text-lg quote-text font-semibold mb-3 text-center">Update Container Status</p>
                    <div className="mt-5">
                        <div className="mb-5">
                            <form className='p-5' onSubmit={handleSubmit(onSubmit)}>
                                <div className="rounded-t-lg">

                                    <div className="mb-5">
                                        <p className="text-xs black-text font-medium" style={{ textAlign: 'left' }}>Select Container Status<span className="red-text">*</span></p>
                                        {/* <CustomSelect
                                        control={control}
                                        name={`status`}
                                        id={`status`}
                                        label={""}
                                        placeholder={`Container Status`}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        options={[
                                            { label: "File Opening", value: "File Opening" },
                                            { label: "In Transit", value: "In Transit" },
                                            { label: "File Closed", value: "File Closed" },
                                        ]}
                                        defaultValue={''}
                                        icon=""
                                    /> */}
                                        {
                                            single_shipment_data?.shipment_transport_type === 'ocean_freight' && single_shipment_data?.shipment_type === 'export' && single_shipment_data?.inland_logistics === false ? (
                                                <>
                                                    <NewCustomSelect
                                                        control={control}
                                                        name={`status`}
                                                        id={`status`}
                                                        label={""}
                                                        placeholder={`Container Status`}
                                                        isRequired={true}
                                                        errors={errors}
                                                        isDisabled={false}
                                                        options={[
                                                            { label: "File Opening", value: "File Opening" },
                                                            { label: "Booking", value: "Booking" },
                                                            { label: "Sourcing of Empty Containers", value: "Sourcing of Empty Containers" },
                                                            { label: "Stuffing at Warehouse", value: "Stuffing at Warehouse" },
                                                            { label: "PIA Inspection/CCI", value: "PIA Inspection/CCI" },
                                                            { label: "SGD", value: "SGD" },
                                                            { label: "Customs Export Clearance", value: "Customs Export Clearance" },
                                                            { label: "Gate In Full Export/Seals", value: "Gate In Full Export/Seals" },
                                                            { label: "Shipping Instruction/BL Draft", value: "Shipping Instruction/BL Draft" },
                                                            { label: "Planning on Vessel", value: "Planning on Vessel" },
                                                            { label: "Collection of Invoices & Receipt", value: "Collection of Invoices & Receipt" },
                                                            { label: "Collection Of OBL/Seaway Bill", value: "Collection Of OBL/Seaway Bill" },
                                                            { label: "Other Post Shipment Documents", value: "Other Post Shipment Documents" },
                                                        ]}
                                                        defaultValue={{ label: row_number?.container_status, value: row_number?.container_status }}
                                                        icon=""
                                                    />
                                                </>

                                            ) : single_shipment_data?.shipment_transport_type === 'ocean_freight' && single_shipment_data?.shipment_type === 'import' && single_shipment_data?.inland_logistics === false ? (
                                                <>
                                                    <NewCustomSelect
                                                        control={control}
                                                        name={`status`}
                                                        id={`status`}
                                                        label={""}
                                                        placeholder={`Container Status`}
                                                        isRequired={true}
                                                        errors={errors}
                                                        isDisabled={false}
                                                        // options={[
                                                        //     { label: "File Opening", value: "File Opening" },
                                                        //     { label: "In Transit", value: "In Transit" },
                                                        //     { label: "File Closed", value: "File Closed" },
                                                        // ]}
                                                        options={[
                                                            { label: "File Opening/Documentation Checks", value: "File Opening/Documentation Checks" },
                                                            { label: "Vessel Tracking / Rotation Number", value: "Vessel Tracking / Rotation Number" },
                                                            { label: "Duty Assessment", value: "Duty Assessment" },
                                                            { label: "Payment Of Terminal/Shipping/SON/NAFDAC", value: "Payment Of Terminal/Shipping/SON/NAFDAC" },
                                                            { label: "Joint Inspection", value: "Joint Inspection" },
                                                            { label: "Shipping Release", value: "Shipping Release" },
                                                            { label: "TDO", value: "TDO" },
                                                            { label: "Delivery", value: "Delivery" },
                                                            { label: "Empty Return/Container Card", value: "Empty Return/Container Card" },
                                                            { label: "Refund Processing/File Closure", value: "Refund Processing/File Closure" },
                                                        ]}
                                                        defaultValue={{ label: row_number?.container_status, value: row_number?.container_status }}
                                                        icon=""
                                                    />
                                                </>
                                            ) : single_shipment_data?.shipment_transport_type === 'haulage' && single_shipment_data?.shipment_type === 'import' && single_shipment_data?.with_tbl === true && single_shipment_data?.tbl_type === "Normal" ? (
                                                <>
                                                    <NewCustomSelect
                                                        control={control}
                                                        name={`status`}
                                                        id={`status`}
                                                        label={""}
                                                        placeholder={`Container Status`}
                                                        isRequired={true}
                                                        errors={errors}
                                                        isDisabled={false}
                                                        // options={[
                                                        //     { label: "File Opening", value: "File Opening" },
                                                        //     { label: "In Transit", value: "In Transit" },
                                                        //     { label: "File Closed", value: "File Closed" },
                                                        // ]}
                                                        options={[
                                                            { label: "Execution Mail", value: "Execution Mail" },
                                                            { label: "TDO Pick Up", value: "TDO Pick Up" },
                                                            { label: "Revalidated", value: "Revalidated" },
                                                            { label: "Loaded", value: "Loaded" },
                                                            { label: "In Transit", value: "In Transit" },
                                                            { label: "In Transit(Rivers)", value: "In Transit(Rivers)" },
                                                            { label: "In Transit(Lagos)", value: "In Transit(Lagos)" },
                                                            { label: "In Transit(Mid-Country)", value: "In Transit(Mid-Country)" },
                                                            { label: "In Transit(In Nigeria)", value: "In Transit(In Nigeria)" },
                                                            { label: "In Transit(Kano)", value: "In Transit(Kano)" },
                                                            { label: "Terminal (APMT Kano)", value: "Terminal (APMT Kano)" },
                                                            { label: "Terminal Fees Paid(APMT Kano)", value: "Terminal Fees Paid(APMT Kano)" },
                                                            { label: "Customs Completed(APMT Kano)", value: "Customs Completed(APMT Kano)" },
                                                            { label: "Heading to Offload(APMT Kano)", value: "Heading to Offload(APMT Kano)" },
                                                            { label: "Warehouse(Kano)", value: "Warehouse(Kano)" },
                                                            { label: "Offloaded(Kano)", value: "Offloaded(Kano)" },
                                                            { label: "Empty Returned/Triangulated", value: "Empty Returned/Triangulated" },
                                                            { label: "File Closed", value: "File Closed" },
                                                        ]}
                                                        defaultValue={{ label: row_number?.container_status, value: row_number?.container_status }}
                                                        icon=""
                                                    />
                                                </>
                                            ) : single_shipment_data?.shipment_transport_type === 'haulage' && single_shipment_data?.shipment_type === 'import' && single_shipment_data?.with_tbl === true && single_shipment_data?.tbl_type === "Triangulation" ? (
                                                <>
                                                    <NewCustomSelect
                                                        control={control}
                                                        name={`status`}
                                                        id={`status`}
                                                        label={""}
                                                        placeholder={`Container Status`}
                                                        isRequired={true}
                                                        errors={errors}
                                                        isDisabled={false}
                                                        // options={[
                                                        //     { label: "File Opening", value: "File Opening" },
                                                        //     { label: "In Transit", value: "In Transit" },
                                                        //     { label: "File Closed", value: "File Closed" },
                                                        // ]}
                                                        options={[
                                                            { label: "Pre-Arrival Docs Recieved", value: "Pre-Arrival Docs Recieved" },
                                                            { label: "Sent to APMT", value: "Sent to APMT" },
                                                            { label: "Vessel Arrived", value: "Vessel Arrived" },
                                                            { label: "DO Recieved From Customer", value: "DO Recieved From Customer" },
                                                            { label: "TDO Pick Up", value: "TDO Pick Up" },
                                                            { label: "Revalidated", value: "Revalidated" },
                                                            { label: "Loaded", value: "Loaded" },
                                                            // { label: "In Transit", value: "In Transit" },
                                                            { label: "In Transit(Rivers)", value: "In Transit(Rivers)" },
                                                            { label: "In Transit(Lagos)", value: "In Transit(Lagos)" },
                                                            { label: "In Transit(Mid-Country)", value: "In Transit(Mid-Country)" },
                                                            { label: "In Transit(N Nigeria)", value: "In Transit(N Nigeria)" },
                                                            { label: "In Transit(Kano)", value: "In Transit(Kano)" },
                                                            { label: "Terminal (APMT Kano)", value: "Terminal (APMT Kano)" },
                                                            { label: "Terminal Fees Paid(APMT Kano)", value: "Terminal Fees Paid(APMT Kano)" },
                                                            { label: "Customs Completed(APMT Kano)", value: "Customs Completed(APMT Kano)" },
                                                            { label: "Heading to Offload(APMT Kano)", value: "Heading to Offload(APMT Kano)" },
                                                            { label: "Warehouse(Kano)", value: "Warehouse(Kano)" },
                                                            { label: "Offloaded(Kano)", value: "Offloaded(Kano)" },
                                                            { label: "Empty Returned", value: "Empty Returned" },
                                                            { label: "File Closed", value: "File Closed" },
                                                        ]}
                                                        defaultValue={{ label: row_number?.container_status, value: row_number?.container_status }}
                                                        icon=""
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <NewCustomSelect
                                                        control={control}
                                                        name={`status`}
                                                        id={`status`}
                                                        label={""}
                                                        placeholder={`Container Status`}
                                                        isRequired={true}
                                                        errors={errors}
                                                        isDisabled={false}
                                                        // options={[
                                                        //     { label: "File Opening", value: "File Opening" },
                                                        //     { label: "In Transit", value: "In Transit" },
                                                        //     { label: "File Closed", value: "File Closed" },
                                                        // ]}
                                                        options={[
                                                            { label: "File Opening", value: "File Opening" },
                                                            { label: "In Transit", value: "In Transit" },
                                                            { label: "File Closed", value: "File Closed" },
                                                            { label: "NEW", value: "NEW" },
                                                        ]}
                                                        defaultValue={{ label: row_number?.container_status, value: row_number?.container_status }}
                                                        icon=""
                                                    />
                                                </>
                                            )
                                        }

                                        <p className="text-xs black-text font-medium mt-5"></p>
                                        <CustomTextarea
                                            control={control}
                                            name={"remarks"}
                                            id={"remarks"}
                                            label={"Remarks"}
                                            placeholder={" "}
                                            isRequired={false}
                                            errors={errors}
                                            isDisabled={false}
                                            defaultValue={""}
                                            icon=""
                                        />
                                    </div>

                                    <div className="ml-auto">
                                        {" "}
                                        {/* @ts-ignore */}
                                        <PrimaryButton
                                            title="Save"
                                            loading={loading}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

// export default ContainerStatusDrawer;

const mapStateToProps = (state: any) => {
    const { loading } = state.shipments;
    return { loading };
};

export default connect(mapStateToProps, { getSingleShipment, editContainerStatus })(ContainerStatusDrawer);
