import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//libraries
import { useForm } from "react-hook-form";

//componenets
import FreightDetails from "components/rate/FreightDetails";
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButtons from "components/buttons/PrimaryButtons";
import SecondaryButtons from "components/buttons/SecondaryButtons";
import SuccessModal from "components/partials/SuccessModal";
import ShipmentNotfication from "components/rate/ShipmentNotfication";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";
import CustomDefaultSelect from "components/selectInputs/CustomDefaultSelect";

//helpers
import { parseAllPorts } from "helpers";
import mixpanel from "helpers/mixpanel";

const FreightQuickForm = () => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState("NGN");
  const [prefix, setPrefix] = useState("₦");
  const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
  const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState(
    []
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {
    handleSubmit,
    control,
    resetField,
    formState: { errors },
  } = useForm();

  const _Json = require("sea-ports");

  let user = useSelector((state: any) => state.auth.user_data);
  // @ts-ignore
  user = user ? user : JSON.parse(localStorage.getItem("user_data"));

  useEffect(() => {
    const parsePorts = parseAllPorts(_Json.JSON);
    setDefaultPortsOfOrigin(parsePorts.origin);
    setDefaultPortsOfDestination(parsePorts.destination);

    mixpanel.track("Start new quick freight shipment", { email: user.email });
  }, [user.email]);

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <div>
        <p className="text-2xl blsck-text-2">Freight Quick Form</p>
        <p className="text-sm black-text-4 font-light mt-1">
          Please provide the details of the freight
        </p>
      </div>
      <FreightDetails
        defaultPortsOfOrigin={defaultPortsOfOrigin}
        defaultPortsOfDestination={defaultPortsOfDestination}
        control={control}
        errors={errors}
        resetField={resetField}
        extras={false}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8 pb-11 bottom-divider">
        <CustomDefaultSelect
          control={control}
          name={"transportation_mode"}
          id={"transportation_mode"}
          label={"TransportationMode"}
          placeholder={"Select mode"}
          isRequired={true}
          errors={errors}
          isDisabled={false}
          defaultValue={{ label: "Ocean Freight", value: "Ocean Freight" }}
          options={[
            { label: "Ocean Freight", value: "Ocean Freight" },
            { label: "Air Freight", value: "Air Freight" },
          ]}
          icon=""
        />
        <ShipmentNotfication
          subtext={"Ocean Freight Bundle"}
          text={"Includes both Customs Brokerage (CBT) and Haulage services."}
          style={{ maxHeight: "80px" }}
        />
        {/* <CustomInput
                    control={control}
                    name={"company_name"}
                    id={"company_name"}
                    label={"Company Name"}
                    placeholder={""}
                    isRequired={true}
                    type={"text"}
                    errors={errors}
                    isDisabled={false}
                    defaultValue={""}
                    min={""}
                    max={""}
                    icon=""
                /> */}
        {/* <CustomInput
                    control={control}
                    name={"company_email"}
                    id={"company_email"}
                    label={"Email Address"}
                    placeholder={"example@company.com"}
                    isRequired={true}
                    type={"email"}
                    errors={errors}
                    isDisabled={false}
                    defaultValue={""}
                    min={""}
                    max={""}
                    icon=""
                /> */}
        <CustomCurrencyInput
          control={control}
          name={"goods_value"}
          id={"goods_value"}
          label={"Total value of Goods"}
          placeholder={""}
          isRequired={true}
          type={"number"}
          errors={errors}
          isDisabled={false}
          defaultValue={""}
          min={1}
          max={""}
          icon=""
          currency={currency}
          setCurrency={setCurrency}
          resetField={resetField}
          prefix={prefix}
          setPrefix={setPrefix}
        />
        <CustomInput
          control={control}
          name={`container_count`}
          id={`container_count`}
          label={"Container Count"}
          placeholder={""}
          isRequired={true}
          type={"number"}
          errors={errors}
          isDisabled={false}
          defaultValue={""}
          min={""}
          max={""}
          icon=""
        />
        <CustomDefaultSelect
          control={control}
          name={`container_type`}
          id={`container_type`}
          label={"Container Type"}
          placeholder={`Select`}
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
        <CustomDefaultSelect
          control={control}
          name={`container_size`}
          id={`container_size`}
          label={"Container Size"}
          placeholder={`Select`}
          isRequired={true}
          errors={errors}
          isDisabled={false}
          options={[
            { label: "20 FT", value: "20FT" },
            { label: "40 FT", value: "40FT" },
            { label: "40 HC FT", value: "40HC FT" },
          ]}
          defaultValue={""}
          icon=""
        />
      </div>
      {showSuccessModal && (
        <SuccessModal
          modalIsOpen={showSuccessModal}
          closeModal={closeSuccessModal}
          heading={"Thank You"}
          text={"Our team will get back to you shortly."}
        />
      )}
      <div className="mt-8 flex justify-end">
        <div className="pb-5 flex gap-x-6">
          <SecondaryButtons
            title="Cancel"
            style={{ padding: "12px 14px" }}
            onClick={() => navigate("/dashboard")}
            disabled={false}
            loading={false}
            icon={""}
          />
          <PrimaryButtons
            title="Submit"
            style={{}}
            onClick={() => console.log("first")}
            disabled={false}
            loading={false}
            icon={""}
          />
        </div>
      </div>
    </>
  );
};

export default FreightQuickForm;
