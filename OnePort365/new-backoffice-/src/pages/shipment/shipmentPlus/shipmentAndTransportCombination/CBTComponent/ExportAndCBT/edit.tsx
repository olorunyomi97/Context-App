import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import CustomInput from "components/textInputs/CustomInput";
import CustomSelect from "components/selectInputs/CustomSelect";
import CustomRadio from "components/selectInputs/CustomRadio";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomTextarea from "components/textInputs/CustomTextarea";
import CustomerAutocomplete from "components/customerAutocomplete/customerAutocomplete";
import { useForm } from "react-hook-form";
import { parseAllPorts } from "helpers/index";
import mixpanel from "helpers/mixpanel";
import { useSelector } from "react-redux";
import { createShipment } from "store/actions";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";
import NewCustomGoogleInput from "components/textInputs/NewCustomGoogleInput";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import { getSingleShipment, editShipmentDetails } from "store/actions";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
const _Json = require("sea-ports");

function Edit(props: any) {
  const params = useParams();
  const navigate = useNavigate();
  const [openAside, SetOpenAside] = useState(false);
  const { loading, single_shipment } = props;
  console.log(single_shipment);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [terminalHandling, setTerminalHandling] = useState(false);
  const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
  const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState(
    []
  );
  const single_shipment_data = single_shipment?.data?.data?.shipment_data;
  console.log("single-shipment", single_shipment_data);
  console.log("baranch", single_shipment_data?.branch);

  let admin_data = useSelector((state: any) => state.auth.admin_data);
  // @ts-ignore
  //prettier-ignore
  admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));

  useEffect(() => {
    const parsePorts = parseAllPorts(_Json.JSON);
    setDefaultPortsOfOrigin(parsePorts.origin);
    setDefaultPortsOfDestination(parsePorts.destination);

    mixpanel.track("Admin Started New Shipment", {
      email: admin_data.email,
    });
  }, []);

  useEffect(() => {
    props.getSingleShipment(params.id);
  }, []);

  const goToStandaloneDetails = () => {
    navigate(`/shipments/shipment-standalone-details/${params.id}`);
  };

  const onSubmit = (data: any) => {
    console.log(data.customer_id);
    const newData = {
      shipment_type: "export",
      shipment_transport_type: "customs_brokerage",
      customer_id: data.customer_id.value,
      origin_port_code: data?.origin_port?.label,
      // Destination country(delivery location)
      delivery_location: data?.destination_country,
      // transportation mode
      mode_of_transport: data?.transport_mode?.value,
      // NEPC number
      nepc_number: data?.nepc_number,
      // BL number
      bl_number: data?.bl_number,
      goods_type: data?.goods_type,
      //   total gooods value
      goods_value: data?.goods_value,
      // consignee name
      consignee_name: data?.consignee_name,
      // consignee address
      consignee_address: data?.consignee_address?.label,
      // terminal handling
      terminal_handling: terminalHandling,
      branch: data?.branch.value,
      additional_comments: data?.additional_comments,
    };
    // props.createShipment(newData, goToStandaloneDetails);
    console.log(newData);
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
                      Job Number :{single_shipment_data?.job_number}
                    </p>
                  </div>
                  <div className="mt-2 ml-auto" style={{ textAlign: "right" }}>
                    <small>Shipments </small>
                    <small style={{ color: "grey" }}>
                      {" "}
                      / Edit Export Shipment & Custom Brokerage Terminal(CBT)
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:px-10 py-10 mb-3">
              <div className="py-10 px-5 right-divider left-divider top-divider bottom-divider shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                  <div className="lg:px-8 px-5 ">
                    <p className="add-shipment-text mb-5">
                      Export Shipment & Custom Brokerage Terminal(CBT)
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
                          placeholder={"Customer Name"}
                          isRequired={true}
                          type={"text"}
                          errors={errors}
                          isDisabled={true}
                          min={""}
                          max={""}
                          icon={""}
                          defaultValue={`${single_shipment_data?.customer_details[0]?.firstname} ${single_shipment_data?.customer_details[0]?.lastname}`}
                        />
                      </div>
                    </div>

                    {/* grid ************* */}
                    <div className="grid grid-cols-2 mb-3 items-center">
                      {/* origin port */}
                      <div className="mr-1">
                        <p className="text-xs black-text font-medium">
                          {" "}
                          Origin Port<span className="red-text">*</span>
                        </p>
                        <CustomInput
                          control={control}
                          name={"origin_port"}
                          id={"origin_port"}
                          label={""}
                          placeholder={""}
                          isRequired={true}
                          type={"text"}
                          errors={errors}
                          isDisabled={true}
                          defaultValue={single_shipment_data?.origin_port_code}
                          min={""}
                          max={""}
                          icon=""
                        />
                      </div>
                      {/* destination country */}
                      <div className="mr-1">
                        <p className="text-xs black-text font-medium">
                          {" "}
                          Destination Country<span className="red-text">*</span>
                        </p>
                        <CustomInput
                          control={control}
                          name={"destination_country"}
                          id={"destination_country"}
                          label={""}
                          placeholder={""}
                          isRequired={true}
                          type={"text"}
                          errors={errors}
                          isDisabled={true}
                          defaultValue={single_shipment_data?.delivery_location}
                          min={""}
                          max={""}
                          icon=""
                        />
                      </div>
                    </div>
                    {/* ********* grid column ******** */}
                    <div className="mt-3 grid grid-cols-4 mb-2 items-center ">
                      {/* mode of transportation */}
                      <div className="mr-1">
                        <p className="text-xs black-text font-medium">
                          Transportation Mode<span className="red-text">*</span>
                        </p>
                        <CustomInput
                          control={control}
                          name={`transport_mode`}
                          id={`transport_mode`}
                          label={""}
                          placeholder={``}
                          isRequired={true}
                          type={"text"}
                          errors={errors}
                          isDisabled={true}
                          defaultValue={single_shipment_data?.mode_of_transport}
                          icon=""
                          min={""}
                          max={""}
                        />
                      </div>

                      {/* NEPC Number */}
                      <div className="mr-1">
                        <p className="text-xs black-text font-medium">
                          {" "}
                          NEPC Number<span className="red-text">*</span>
                        </p>
                        <CustomInput
                          control={control}
                          name={"nepc_number"}
                          id={"nepc_number"}
                          label={""}
                          placeholder={"NEPC Number"}
                          isRequired={true}
                          type={"number"}
                          errors={errors}
                          isDisabled={true}
                          defaultValue={single_shipment_data?.nepc_number}
                          min={""}
                          max={""}
                          icon={""}
                        />
                      </div>

                      {/* BL Number */}
                      <div className="mr-1">
                        <p className="text-xs black-text font-medium">
                          {" "}
                          B/L Number<span className="red-text">*</span>
                        </p>
                        <CustomInput
                          control={control}
                          name={"bl_number"}
                          id={"bl_number"}
                          label={""}
                          placeholder={"B/L"}
                          isRequired={true}
                          type={"number"}
                          errors={errors}
                          isDisabled={true}
                          defaultValue={single_shipment_data?.bl_number}
                          min={""}
                          max={""}
                          icon={""}
                        />
                      </div>

                      {/* office branch */}
                      <div className="ml-1">
                        <p className="text-xs black-text font-medium">
                          Office / Branch<span className="red-text">*</span>
                        </p>
                        <CustomInput
                          control={control}
                          name={"branch"}
                          id={"branch"}
                          label={""}
                          placeholder={"Branch"}
                          isRequired={true}
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

                    {/* ********* grid column ******** */}
                    <div className="mt-3 grid grid-cols-4 mb-2 items-center ">
                      {/* commodity type */}
                      <div className="mr-1">
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
                          isRequired={true}
                          type={"text"}
                          errors={errors}
                          isDisabled={false}
                          defaultValue={single_shipment_data?.goods_type}
                          min={""}
                          max={""}
                          icon={""}
                        />
                      </div>

                      {/* total value of goods */}
                      <div className="mx-1">
                        <p className="text-xs black-text font-medium">
                          Total Value of Goods(₦)
                          <span className="red-text">*</span>
                        </p>
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
                          defaultValue={single_shipment_data?.goods_value}
                          min={1}
                          max={""}
                          icon=""
                        />
                      </div>

                      {/* consignee name */}
                      <div className="mr-1">
                        <p className="text-xs black-text font-medium">
                          Consignee Name<span className="red-text">*</span>
                        </p>
                        <CustomInput
                          control={control}
                          name={"consignee_name"}
                          id={"consignee_name"}
                          label={""}
                          placeholder={"Consignee Name"}
                          isRequired={true}
                          type={"text"}
                          errors={errors}
                          isDisabled={true}
                          defaultValue={single_shipment_data?.consignee_name}
                          min={""}
                          max={""}
                          icon={""}
                        />
                      </div>

                      {/* consignee address */}
                      <div className="mr-1">
                        <p className="text-xs black-text font-medium">
                          Consignee Address<span className="red-text">*</span>
                        </p>
                        <CustomInput
                          control={control}
                          name={"consignee_address"}
                          id={"consignee_address"}
                          label={""}
                          placeholder={""}
                          isRequired={true}
                          type={"text"}
                          errors={errors}
                          isDisabled={true}
                          defaultValue={single_shipment_data?.consignee_address}
                          min={""}
                          max={""}
                          icon={""}
                        />
                      </div>
                    </div>

                    {/* ********* grid column ******** */}
                    <div className="mt-3 grid grid-cols-3 mb-2 items-center ">
                      {" "}
                      {/* do you require terminal handling */}
                      <div className="mt-3">
                        <p className="text-xs black-text font-medium mb-2">
                          Do you require Terminal Handling ?
                          <span className="red-text">*</span>
                        </p>
                        <div className="grid grid-cols-3">
                          <div className="">
                            <CustomRadio
                              selected={single_shipment_data?.terminal_handling}
                              label={"Yes"}
                              onClick={{}}
                            />
                          </div>

                          <div className="ml-2">
                            <CustomRadio
                              selected={
                                !single_shipment_data?.terminal_handling
                              }
                              label={"No"}
                              onClick={{}}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

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
                            defaultValue={
                              single_shipment_data?.additional_comments
                            }
                            icon=""
                          />
                        </div>
                      </div>
                    </div>

                    {/* submit button */}
                    <div className="grid grid-cols-3 mt-10 items-center">
                      <div className="w-22"></div>
                      <div></div>
                      <div className="w-22" style={{ justifyContent: "left" }}>
                        {" "}
                        {/* @ts-ignore */}
                        <PrimaryButton title="Submit" loading={loading} />
                      </div>
                    </div>
                  </div>{" "}
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state: any) => {
  const { single_shipment, error, loading } = state.shipments;
  return { single_shipment, error, loading };
};
export default connect(mapStateToProps, {
  getSingleShipment,
  editShipmentDetails,
})(Edit);
