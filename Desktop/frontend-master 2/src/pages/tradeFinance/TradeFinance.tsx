import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, connect } from "react-redux";
import { useLocation } from "react-router-dom";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
// import PageLoading from "components/partials/pageLoading";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";
import TradeFinanceModal from "components/tradeFinance/TradeFinanceModal";

//helpers
import { formatCurrency } from "helpers";

//actions
import { createLoanApplication } from "store/tradeFinance/actions";

import CustomInput from "components/textInputs/CustomInput";
import CustomSelect from "components/selectInputs/CustomSelect";
import CustomUploadInput from "components/textInputs/CustomUploadInput";

const TradeFinance = (props: any) => {
  const [openAside, SetOpenAside] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const location = useLocation();

  let user = useSelector((state: any) => state.auth.user_data);
  // @ts-ignore
  user = user ? user : JSON.parse(localStorage.getItem("user_data"));

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const { loading, loan_data, loan_message, createLoanApplication } = props;

  const onSubmit = (data: any) => {
    const cacData = new FormData();
    cacData.append("doc_name", data.utility_doc[0].name);
    cacData.append("doc_file", data.utility_doc[0]);

    const utilityData = new FormData();
    utilityData.append("doc_name", data.utility_doc[0].name);
    utilityData.append("doc_file", data.utility_doc[0]);

    let data_ = {
      id: data.id_no,
      loan_tenure: data?.loan_tenure.value,
      cac_document: cacData,
      job_number: location.state.job_number,
      loan_amount: data?.loan_amount,
      type_of_id: data?.type_id.value,
    };
    const newData = {
      id: location.state.invoice_id,
      data: data_,
    };
    createLoanApplication(newData, openModal);
  };

  return (
    <div className="flex">
      <Aside
        activeTab="invoice"
        openAside={openAside}
        SetOpenAside={SetOpenAside}
      />

      <div className="flex-1">
        <TopBar title={"Trade Finance"} SetOpenAside={SetOpenAside} />
        <div className="px-7 pt-5 lg:px-14 lg:pt-10 w-full dashboard-content-scroll no-overflow-x">
          <p>Fill out the following information to apply for the loan:</p>
          <div className="lg:w-3/4 ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid lg:grid-cols-2 lg:gap-3 lg:gap-x-6 mt-5">
                <CustomSelect
                  control={control}
                  name={"type_id"}
                  id={"type_id"}
                  label={"Type of ID"}
                  placeholder={""}
                  isRequired={true}
                  errors={errors}
                  isDisabled={false}
                  options={[
                    { label: "International Passport", value: "passport" },
                    { label: "Drivers License", value: "driver_license" },
                    { label: "Voters Card", value: "voters_card" },
                  ]}
                  defaultValue={[
                    { label: "International Passport", value: "passport" },
                  ]}
                  icon=""
                />
                <CustomInput
                  control={control}
                  name={"id_no"}
                  id={"id_no"}
                  label={"ID Number"}
                  placeholder={""}
                  isRequired={true}
                  type="text"
                  errors={errors}
                  isDisabled={false}
                  defaultValue={""}
                  min={""}
                  max={""}
                  icon={""}
                />
                <CustomInput
                  control={control}
                  name={"email"}
                  id={"email"}
                  label={"Email"}
                  placeholder={""}
                  isRequired={true}
                  type="text"
                  errors={errors}
                  isDisabled={true}
                  defaultValue={user.email}
                  min={""}
                  max={""}
                  icon={""}
                />
                <CustomInput
                  control={control}
                  name={"address"}
                  id={"address"}
                  label={"Address"}
                  placeholder={""}
                  isRequired={true}
                  type="text"
                  errors={errors}
                  isDisabled={true}
                  defaultValue={user.company_address}
                  min={""}
                  max={""}
                  icon={""}
                />
                <CustomCurrencyInput
                  control={control}
                  name={"loan_amount"}
                  id={"loan_amount"}
                  label={`Loan Amount (maximum of ${formatCurrency(
                    location.state.amount,
                    location.state.currency
                  )})`}
                  placeholder={""}
                  isRequired={true}
                  type={"number"}
                  errors={errors}
                  isDisabled={false}
                  defaultValue={location.state.amount}
                  min={1}
                  max={""}
                  icon={""}
                  place={"loan"} //added a place prop to help with conditional error validation based on where component is being used
                />
                <CustomSelect
                  control={control}
                  name={"loan_tenure"}
                  id={"loan_tenure"}
                  label={"Tenure of the loan"}
                  placeholder={""}
                  isRequired={true}
                  errors={errors}
                  isDisabled={false}
                  options={[
                    { label: "1 week", value: "1" },
                    { label: "2 weeks", value: "2" },
                    { label: "3 weeks", value: "3" },
                    { label: "4 weeks", value: "4" },
                  ]}
                  defaultValue={[{ label: "1 week", value: "1" }]}
                  icon=""
                />
                <CustomUploadInput
                  control={control}
                  id={"cac_doc"}
                  name={"cac_doc"}
                  label={"Upload CAC Document"}
                  placeholder={""}
                  defaultValue={""}
                  errors={errors}
                  isRequired={true}
                />
                <CustomUploadInput
                  control={control}
                  id={"utility_doc"}
                  name={"utility_doc"}
                  label={"Upload Utility Document"}
                  placeholder={""}
                  defaultValue={""}
                  errors={errors}
                  isRequired={true}
                />
                {/* <CustomInput
                                    control={control}
                                    name={"account_name"}
                                    id={"account_name"}
                                    label={"Account Name"}
                                    placeholder={""}
                                    isRequired={true}
                                    type="text"
                                    errors={errors}
                                    isDisabled={false}
                                    defaultValue={""}
                                    min={""}
                                    max={""}
                                    icon={""}
                                />
                                <CustomInput
                                    control={control}
                                    name={"account_no"}
                                    id={"account_no"}
                                    label={"Account Number"}
                                    placeholder={""}
                                    isRequired={true}
                                    type={"number"}
                                    errors={errors}
                                    isDisabled={false}
                                    defaultValue={""}
                                    min={""}
                                    max={""}
                                    icon={""}
                                />
                                <CustomInput
                                    control={control}
                                    name={"bank_name"}
                                    id={"bank_name"}
                                    label={"Bank Name"}
                                    placeholder={""}
                                    isRequired={true}
                                    type="text"
                                    errors={errors}
                                    isDisabled={false}
                                    defaultValue={""}
                                    min={""}
                                    max={""}
                                    icon={""}
                                /> */}
                <CustomInput
                  control={control}
                  name={"company_name"}
                  id={"company_name"}
                  label={"Company Name"}
                  placeholder={""}
                  isRequired={true}
                  type="text"
                  errors={errors}
                  isDisabled={true}
                  defaultValue={user.company_name}
                  min={""}
                  max={""}
                  icon={""}
                />
                <CustomInput
                  control={control}
                  name={"invoice_no"}
                  id={"invoice_no"}
                  label={"Job Number"}
                  placeholder={""}
                  isRequired={true}
                  type={"text"}
                  errors={errors}
                  isDisabled={true}
                  defaultValue={location.state.job_number}
                  min={""}
                  max={""}
                  icon={""}
                />
              </div>

              <div className="my-6">
                {/* @ts-ignore */}
                <PrimaryButton title="Submit" loading={loading} />
              </div>
            </form>
            <TradeFinanceModal
              modalIsOpen={modalIsOpen}
              closeModal={closeModal}
              data={loan_message}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading, loan_data, loan_message } = state.tradeFinance;
  return { error, loading, loan_data, loan_message };
};

export default connect(mapStateToProps, { createLoanApplication })(
  TradeFinance
);
