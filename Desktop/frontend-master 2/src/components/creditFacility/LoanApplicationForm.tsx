import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

//components
import CustomSelect from "components/selectInputs/CustomSelect";
import CustomInput from "components/textInputs/CustomInput";
import CustomDnD from "components/customDnD/CustomDnD";
import PrimaryButton from "components/buttons/PrimaryButton";
import OutlineButton from "components/buttons/OutlineButton";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";
import LoanSuccessModal from "components/creditFacility/LoanSuccessModal";

//helpers
import { parseAllPorts } from "helpers/index";

const _Json = require("sea-ports");

const LoanApplicationForm = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState(
    []
  );
  const [openModal, setOpenModal] = useState(false);

  const { previousStep } = props;

  const closeModal = () => {
    setOpenModal(false);
    window.location.replace(`${window.location.origin}/loan-history/:id`);
  };

  useEffect(() => {
    const parsePorts = parseAllPorts(_Json.JSON);
    setDefaultPortsOfDestination(parsePorts.destination);
  }, []);

  const [invoiceDoc, setInvoiceDoc] = useState("");
  const [invoiceDocError, setInvoiceDocError] = useState(false);

  //   let defaultDestination = defaultPortsOfDestination.filter((data) => {
  //     if (Object.keys(rate_data).length > 0) {
  //       if (data.value.province === rate_data.destination_port_province) {
  //         return data;
  //       }
  //     } else {
  //       return "";
  //     }
  //   });

  const onSubmit = (data: any) => {};

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="solid-br p-7 pb-10 mb-10 rounded">
          <div className="">
            <CustomSelect
              control={control}
              name={"product_service_type"}
              id={"product_service_type"}
              label={"Product Type"}
              placeholder={"select product type"}
              isRequired={true}
              errors={errors}
              isDisabled={false}
              options={[
                { label: "PLC", value: "PLC" },
                { label: "LLC", value: "LLC" },
              ]}
              defaultValue={""}
              icon=""
            />
          </div>

          <div className="">
            <CustomSelect
              control={control}
              name={"cargo_destination"}
              id={"cargo_destination"}
              label={"Cargo Destination"}
              placeholder={"select cargo destination"}
              isRequired={true}
              errors={errors}
              isDisabled={false}
              options={defaultPortsOfDestination}
              defaultValue={""}
              icon=""
            />
          </div>

          <div className="">
            <CustomCurrencyInput
              control={control}
              name={"loan_amount"}
              id={"loan_amount"}
              label={"Loan Amount (in Naira)"}
              placeholder={"Enter loan amount"}
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
          <div>
            <CustomSelect
              control={control}
              name={"business_sector"}
              id={"business_sector"}
              label={"Business Sector"}
              placeholder={"select business sector"}
              isRequired={true}
              errors={errors}
              isDisabled={false}
              options={[
                { label: "PLC", value: "PLC" },
                { label: "LLC", value: "LLC" },
              ]}
              defaultValue={""}
              icon=""
            />
          </div>

          <div>
            <CustomSelect
              control={control}
              name={"active_period"}
              id={"active_period"}
              label={"Active Period"}
              placeholder={"select active period"}
              isRequired={true}
              errors={errors}
              isDisabled={false}
              options={[
                { label: "less than 12 months", value: "PLC" },
                { label: "LLC", value: "LLC" },
              ]}
              defaultValue={""}
              icon=""
            />
          </div>

          <div>
            <CustomSelect
              control={control}
              name={"nature_of_business"}
              id={"nature_of_business"}
              label={"Nature of Business"}
              placeholder={"select nature of business"}
              isRequired={true}
              errors={errors}
              isDisabled={false}
              options={[
                { label: "B2B (We Sell to other businesses)", value: "B2B" },
                { label: "B2C", value: "B2C" },
              ]}
              defaultValue={""}
              icon=""
            />
          </div>

          <div>
            <CustomSelect
              control={control}
              name={"period_of_service"}
              id={"period_of_service"}
              label={"Period of Required Service"}
              placeholder={"select period of required service"}
              isRequired={true}
              errors={errors}
              isDisabled={false}
              options={[
                { label: "monthly", value: "B2B" },
                { label: "B2C", value: "B2C" },
              ]}
              defaultValue={""}
              icon=""
            />
          </div>

          <div className="">
            <CustomInput
              control={control}
              name={"tin_number"}
              id={"tin_number"}
              label={"TIN Number"}
              placeholder={"Enter your TIN number"}
              isRequired={true}
              type={"text"}
              errors={errors}
              isDisabled={false}
              defaultValue={""}
              min={""}
              max={""}
              icon=""
            />
          </div>

          <div className="mb-3">
            <p className="text-xs black-text font-medium mb-1">
              Invoice Document
            </p>
            <CustomDnD
              handleChange={setInvoiceDoc}
              file={invoiceDoc}
              error={invoiceDocError}
              name={"Invoice Document"}
              pdfOnly={false}
            />
          </div>

          <div className="">
            <CustomInput
              control={control}
              name={"invoice_date"}
              id={"invoice_date"}
              label={"Invoice Date"}
              placeholder={"Enter invoice date"}
              isRequired={true}
              type={"date"}
              errors={errors}
              isDisabled={false}
              defaultValue={""}
              min={""}
              max={""}
              icon=""
            />
          </div>

          <div className="grid grid-cols-2">
            <div className="mr-1">
              <CustomInput
                control={control}
                name={"account_reference"}
                id={"account_reference"}
                label={"Account Reference"}
                placeholder={"Enter account reference"}
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
              <CustomInput
                control={control}
                name={"application_id"}
                id={"application_id"}
                label={"Application ID"}
                placeholder={"Enter application ID"}
                isRequired={true}
                type={"email"}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                min={""}
                max={""}
                icon=""
              />
            </div>
          </div>

          <div className="">
            <CustomCurrencyInput
              control={control}
              name={"invoice_value"}
              id={"invoice_value"}
              label={"Invoice Value (in Naira)"}
              placeholder={"Enter invoice value"}
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

        <div className="flex my-10">
          <div className="lg:ml-auto mr-3">
            {/* @ts-ignore  */}
            <OutlineButton
              // loading={loading.requesting_follow_up}
              // disabled={loading.requesting_follow_up || loading.accepting_quote}
              title={"Previous"}
              onClick={() => previousStep()}
              style={{ width: "10rem" }}
            />
          </div>

          {/* @ts-ignore  */}
          <PrimaryButton
            // loading={loading.accepting_quote}
            // disabled={loading.accepting_quote || loading.requesting_follow_up}
            // onClick={() => onAccept()}
            title="Submit"
            style={{ width: "10rem" }}
          />
        </div>
      </form>

      <LoanSuccessModal modalIsOpen={openModal} closeModal={closeModal} />
    </>
  );
};

export default LoanApplicationForm;
