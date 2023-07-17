import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import CustomInput from "components/textInputs/CustomInput";
import CustomSelect from "components/selectInputs/CustomSelect";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomerAutocomplete from "components/customerAutocomplete/customerAutocomplete";
import CustomTextarea from "components/textInputs/CustomTextarea";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import CustomRadio from "components/selectInputs/CustomRadio";
import { parseAllPorts } from "helpers/index";
import mixpanel from "helpers/mixpanel";
import { useSelector } from "react-redux";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import { getSingleShipment, editShipmentDetails } from "store/actions";
const _Json = require("sea-ports");

function Edit(props: any) {
  const params = useParams();
  const navigate = useNavigate();
  const [openAside, SetOpenAside] = useState(false);
  const { loading, single_shipment } = props;
  console.log(single_shipment);
  const [hazardous, setHazardous] = useState(false);
  const [bagged, setBagged] = useState(false);
  const [pickup, setPickup] = useState(false);
  const [haulage, setHaulage] = useState(false);
  const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
  const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState(
    []
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [dateRange, setDateRange] = useState([null, null]);
  const [warehousing, setWarehousing] = useState(false);
  const [startDate, endDate] = dateRange;
  const single_shipment_data = single_shipment?.data?.data?.shipment_data;
  const single_warehouse_data = single_shipment?.data?.data?.warehousing_data;
  console.log(single_shipment_data);
  console.log("params_id", params.id);

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
    // props.getSingleShipment(params.id);
    props.getSingleShipment(params.id, `format_containers=${true}`);
  }, []);

  const goToStandaloneDetails = () => {
    navigate(`/shipments/shipment-standalone-details/${params.id}`);
  };

  const onSubmit = (data: any) => {
    console.log(data.customer_id);
    const newData = {
      id: params.id,
      shipment_type: "import",
      shipment_transport_type: "warehousing",
      with_haulage: haulage,
      warehousing: true,
      customer_id: data.customer_id.value,
      port_of_discharge: data?.port_of_discharge,
      container_size: data?.container_size,
      container_type: data?.container_type,
      container_weight: data?.container_weight,
      container_count: data?.container_count,
      warehousing_duration: data?.warehousing_duration,
      goods_type: data?.goods_type,
      branch: data?.branch,
      cargo_bagged: bagged,
      total_cargo_bags: data?.total_cargo_bags,
      is_product_hazardous: hazardous,
      additional_comments: data?.additional_comments,
    };
    props.editShipmentDetails(newData, goToStandaloneDetails);
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
                      Job Number : {single_shipment_data?.job_number}
                    </p>
                  </div>
                  <div className="mt-2 ml-auto" style={{ textAlign: "right" }}>
                    <small>Shipments </small>
                    <small style={{ color: "grey" }}>
                      {" "}
                      / Edit Import Shipment & Warehousing
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:px-10 py-10 mb-3">
              <div className="py-10 px-5 right-divider left-divider top-divider bottom-divider shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                  <div className="lg:px-8 px-5">
                    <p className="add-shipment-text mb-5">
                      Import Shipment & Warehousing
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

                    {/* *****  grid column of 2 ******* */}
                    <div className="mt-3 grid grid-cols-1 items-center ">
                      {/* port of loading */}
                      <div className="mr-1">
                        <p className="text-xs black-text font-medium">
                          {" "}
                          Port Of Discharge<span className="red-text">*</span>
                        </p>
                        <CustomInput
                          control={control}
                          name={"port_of_discharge"}
                          id={"port_of_discharge"}
                          label={""}
                          placeholder={""}
                          isRequired={true}
                          type={"text"}
                          errors={errors}
                          isDisabled={true}
                          defaultValue={single_shipment_data?.port_of_discharge}
                          min={""}
                          max={""}
                          icon=""
                        />
                      </div>
                    </div>

                    {/*  */}

                    <div className="grid grid-cols-4">
                      {/* container size */}
                      <div>
                        <p className="text-xs black-text font-medium">
                          Size of Container
                          <span className="red-text">*</span>
                        </p>
                        <CustomInput
                          control={control}
                          name={`container_size`}
                          id={`container_size`}
                          label={""}
                          placeholder={`Size`}
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
                          icon=""
                        />
                      </div>

                      {/* container type */}
                      <div className="ml-1">
                        <p className="text-xs black-text font-medium">
                          Type of Container
                          <span className="red-text">*</span>
                        </p>
                        <CustomInput
                          control={control}
                          name={`container_type`}
                          id={`container_type`}
                          label={""}
                          placeholder={"Type"}
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
                          icon=""
                        />
                      </div>

                      {/* weight of cargo */}
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
                      {/* Number of cargo */}
                      <div className="ml-1">
                        <p className="text-xs black-text font-medium">
                          Number of Containers
                          <span className="red-text">*</span>
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
                          isDisabled={true}
                          defaultValue={
                            single_shipment_data?.container_details[0]
                              ?.container_count
                          }
                          min={""}
                          max={""}
                          icon={""}
                        />
                      </div>
                    </div>

                    {/* *****  grid column of 2 ******* */}
                    <div className="mt-3 grid grid-cols-3 items-center">
                      {/* warehousing duration */}
                      <div className="ml-1">
                        <p className="text-xs black-text font-medium">
                          Warehousing Duration (weeks)
                          <span className="red-text">*</span>
                        </p>
                        <CustomInput
                          control={control}
                          name={"warehousing_duration"}
                          id={"warehousing_duration"}
                          label={""}
                          placeholder={"Enter duration"}
                          isRequired={true}
                          type={"number"}
                          errors={errors}
                          isDisabled={false}
                          defaultValue={
                            single_warehouse_data?.warehousing_duration
                          }
                          min={"1"}
                          max={""}
                          icon=""
                        />
                        {/* <NewCustomDateFilter placeholder="mm/dd/yyyy - mm/dd/yyyy" /> */}
                      </div>

                      {/* commodity type */}
                      <div className="ml-1 mt-1">
                        <p className="text-xs black-text font-medium">
                          {" "}
                          Commodity Type<span className="red-text">*</span>
                        </p>
                        <CustomInput
                          control={control}
                          name={"goods_type"}
                          id={"goods_type"}
                          label={""}
                          placeholder={"Commodity Type"}
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
                          icon=""
                        />
                      </div>
                    </div>

                    {/* bagged cargo ? desktop*/}
                    <div className="mt-3 grid grid-cols-3 items-center">
                      <div className="mt-3">
                        <p className="text-xs black-text font-medium mb-2">
                          Is the Cargo Bagged ?
                          <span className="red-text">*</span>
                        </p>
                        <div className="grid grid-cols-3">
                          <div className="">
                            <CustomRadio
                              selected={single_warehouse_data?.cargo_bagged}
                              label={"Yes"}
                              onClick={{}}
                            />
                          </div>

                          <div className="ml-2">
                            <CustomRadio
                              selected={!single_warehouse_data?.cargo_bagged}
                              label={"No"}
                              onClick={{}}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* if yes number of bags */}
                    {single_warehouse_data?.cargo_bagged && (
                      <>
                        <div className="mt-3 grid grid-cols-4 items-center ">
                          <div className="ml-1">
                            <p className="text-xs black-text font-medium">
                              Number of bags<span className="red-text">*</span>
                            </p>
                            <CustomInput
                              control={control}
                              name={"total_cargo_bags"}
                              id={"total_cargo_bags"}
                              label={""}
                              placeholder={"Bags"}
                              isRequired={true}
                              type={"number"}
                              errors={errors}
                              isDisabled={false}
                              defaultValue={
                                single_warehouse_data?.total_cargo_bags
                              }
                              min={""}
                              max={""}
                              icon={""}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* pickup desktop*/}
                    <div className="mt-3 grid grid-cols-3 items-center ">
                      <div className="mt-3">
                        <p className="text-xs black-text font-medium mb-2">
                          Do you require Pickup ?
                          <span className="red-text">*</span>
                        </p>
                        <div className="grid grid-cols-3">
                          <div className="">
                            <CustomRadio
                              selected={single_shipment_data?.with_haulage}
                              label={"Yes"}
                              onClick={{}}
                            />
                          </div>

                          <div className="ml-2">
                            <CustomRadio
                              selected={!single_shipment_data?.with_haulage}
                              label={"No"}
                              onClick={{}}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* if yes pickup location */}
                    {single_shipment_data?.with_haulage && (
                      <div className="grid grid-cols-3">
                        <div
                          className="bg-light-yellow p-4 rounded-md mb-7"
                          style={{ background: " #fef3c7" }}
                        >
                          <p className="black-text text-sm font-semibold mb-2">
                            Note
                          </p>
                          <p className="black-text text-xs">
                            Please note that the customer is required to share
                            TDO.
                          </p>
                        </div>
                      </div>
                    )}
                    {/* harzardous  desktop*/}
                    <div className="mt-3 grid grid-cols-3 items-center  ">
                      <div className="mt-3">
                        <p className="text-xs black-text font-medium mb-2">
                          Is the Shipped Product Hazardous ?
                          <span className="red-text">*</span>
                        </p>
                        <div className="grid grid-cols-3">
                          <div className="">
                            <CustomRadio
                              selected={
                                single_shipment_data?.is_product_hazardous
                              }
                              label={"Yes"}
                              onClick={{}}
                            />
                          </div>

                          <div className="ml-2">
                            <CustomRadio
                              selected={
                                !single_shipment_data?.is_product_hazardous
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
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// export default Edit

const mapStateToProps = (state: any) => {
  const { single_shipment, error, loading } = state.shipments;
  return { single_shipment, error, loading };
};
export default connect(mapStateToProps, {
  getSingleShipment,
  editShipmentDetails,
})(Edit);
