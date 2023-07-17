import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import CustomInput from "components/textInputs/CustomInput";
import CustomSelect from "components/selectInputs/CustomSelect";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomerAutocomplete from "components/customerAutocomplete/customerAutocomplete";
import CustomTextarea from "components/textInputs/CustomTextarea";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import CustomRadio from "components/selectInputs/CustomRadio";
import { Link } from "react-router-dom";
import { parseAllPorts } from "helpers/index";
import mixpanel from "helpers/mixpanel";
import { useSelector } from "react-redux";
import { createShipment } from "store/actions";
import DatePicker from "react-datepicker";
import NewCustomDateFilter from "components/customDateFilter/NewCustomDateFilter";

const _Json = require("sea-ports");

function ExportAndWarehousing(props: any) {
  const { loading } = props;
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

  const onSubmit = (data: any) => {
    console.log(data.customer_id);
    const newData = {
      shipment_type: "export",
      shipment_transport_type: "warehousing",
      warehousing: true,
      with_haulage: haulage,
      customer_id: data.customer_id.value,
      port_of_loading: data?.port_of_loading?.value,
      container_count: data?.container_count,
      container_size: data?.container_size.value,
      container_weight: data?.container_weight,
      container_type: data?.container_type.value,
      warehousing_duration: data?.warehousing_duration,
      goods_type: data?.goods_type,
      branch: data?.branch.value,
      cargo_bagged: bagged,
      total_cargo_bags: data?.total_cargo_bags,
      require_pickup: pickup,
      pickup_location: data?.pickup_location?.label,
      is_product_hazardous: hazardous,
      additional_comments: data?.additional_comments,
    };
    props.createShipment(newData);
    console.log(newData);
  };

  return (
    <div className="lg:px-10 py-10 mb-3">
      <form onSubmit={handleSubmit(onSubmit)} className="my-5">
        <div className="lg:px-8 px-5">
          <p className="add-shipment-text mb-5">
            Export Shipment & Warehousing
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

          {/* *****  grid column of 2 ******* */}
          <div className="mt-3 grid grid-cols-1 items-center ">
            {/* port of loading */}
            <div className="mr-1">
              <p className="text-xs black-text font-medium">
                {" "}
                Loading port<span className="red-text">*</span>
              </p>
              <CustomSelect
                control={control}
                name={"port_of_loading"}
                id={"port_of_loading"}
                label={""}
                placeholder={""}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                options={[
                  { label: "Apapa (NGAPP) Nigeria", value: "NGAPP" },
                  { label: "Onne (NGONN) Nigeria", value: "NGONN" },
                  { label: "Port Harcout (NGPHC) Nigeria", value: "NGPHC" },
                  { label: "Tincan/Lagos (NGTIN) Nigeria", value: "NGTIN" },
                ]}
                icon=""
              />
            </div>
          </div>

          {/* *****  grid column of 3 desktop ******* */}
          <div className="mt-3 grid grid-cols-4 items-center ">
            {/* container size */}
            <div>
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

            {/* container type */}
            <div className="ml-1">
              <p className="text-xs black-text font-medium">
                Type of Container<span className="red-text">*</span>
              </p>
              <CustomSelect
                control={control}
                name={`container_type`}
                id={`container_type`}
                label={""}
                placeholder={"Type"}
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

            {/* weight of cargo */}
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

            {/* Number of cargo */}
            <div className="ml-1">
              <p className="text-xs black-text font-medium">
                Number of Containers<span className="red-text">*</span>
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
          </div>

          {/* *****  grid column of 2 ******* */}
          <div className="mt-3 grid grid-cols-3 items-center">
            {/* warehousing duration */}
            <div className="ml-1">
              <p className="text-xs black-text font-medium">
                Warehousing Duration (weeks)<span className="red-text">*</span>
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
                defaultValue={""}
                min={"1"}
                max={""}
                icon=""
              />
              {/* <NewCustomDateFilter placeholder="mm/dd/yyyy - mm/dd/yyyy" /> */}
            </div>

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
                defaultValue={""}
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

          {/* bagged cargo ? desktop*/}
          <div className="mt-3 grid grid-cols-3 items-center  ">
            <div className="mt-3">
              <p className="text-xs black-text font-medium mb-2">
                Is the Cargo Bagged ?<span className="red-text">*</span>
              </p>
              <div className="grid grid-cols-3">
                <div className="">
                  <CustomRadio
                    selected={bagged}
                    label={"Yes"}
                    onClick={() => setBagged(true)}
                  />
                </div>

                <div className="ml-2">
                  <CustomRadio
                    selected={!bagged}
                    label={"No"}
                    onClick={() => setBagged(false)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* if yes number of bags */}
          {bagged && (
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
                    defaultValue={""}
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
                Do you require Pickup ?<span className="red-text">*</span>
              </p>
              <div className="grid grid-cols-3">
                <div className="">
                  <CustomRadio
                    selected={haulage}
                    label={"Yes"}
                    onClick={() => setHaulage(true)}
                  />
                </div>

                <div className="ml-2">
                  <CustomRadio
                    selected={!haulage}
                    label={"No"}
                    onClick={() => setHaulage(false)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* if yes pickup location */}
          {haulage && (
            <>
              <div className="mt-3 grid grid-cols-4 items-center ">
                <div className="mr-1">
                  <p className="text-xs black-text font-medium">
                    {" "}
                    Pickup location <span className="red-text">*</span>
                  </p>
                  <CustomGoogleInput
                    control={control}
                    name={"pickup_location"}
                    id={"pickup_location"}
                    label={""}
                    placeholder={""}
                    isRequired={false}
                    errors={errors}
                    isDisabled={false}
                    defaultValue={""}
                    icon=""
                  />
                </div>
              </div>
            </>
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
  );
}

// export default ExportAndWarehousing;

const mapStateToProps = (state: any) => {
  const { error, loading } = state.shipmentsPlus;
  return { error, loading };
};
export default connect(mapStateToProps, { createShipment })(
  ExportAndWarehousing
);
