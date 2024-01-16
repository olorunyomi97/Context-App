import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { Country, State, City } from "country-state-city";

//components
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import PageLoading from "components/partials/pageLoading";
import CustomSearchSelect from "components/selectInputs/CustomSearchSelect";

//redux
import { getDataSheetById, completeDatasheet } from "store/actions";

//helpers
import { formatCountryStatesCities } from "helpers/index";

const Billing = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const params = useParams();

  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [countries, setCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [cities, setCities] = useState([]);

  const { loading, completing_datasheet, completeDatasheet, nextStep } = props;

  const setCountry = (country: any) => {
    setCountryCode(country.country_code);
  };

  const setStateId = (state: any) => {
    setStateCode(state.state_code);
  };

  useEffect(() => {
    const countries = Country.getAllCountries();
    setCountries(formatCountryStatesCities(countries, "country"));
  }, []);

  useEffect(() => {
    if (countryCode) {
      const states = State.getStatesOfCountry(countryCode);
      setAllStates(formatCountryStatesCities(states, "state"));
    }
    if (stateCode) {
      const cities = City.getCitiesOfState(countryCode, stateCode);
      setCities(formatCountryStatesCities(cities, "state"));
    }
  }, [countryCode, stateCode]);

  const onSubmit = (data: any) => {
    data.billing_company_region = data.billing_company_region?.value;
    data.billing_company_city = data.billing_company_city?.value;
    data.billing_company_country = data.billing_company_country?.value;

    const newData = {
      rate_id: params.id,
      sheet_section: "billing_info",
      data,
    };

    completeDatasheet(newData, nextStep);
  };

  return (
    <>
      {loading ? (
        <>
          {" "}
          <PageLoading />{" "}
        </>
      ) : (
        <>
          <div className="mb-5 mt-3">
            <h3 className="text-xl font-semibold black-text">Billing</h3>
            {/* <p className="grey-text text-xs mt-1">
            Fill out your consignee details which should include
            specifications of the shipment with other required details stated
            below.
          </p> */}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-24 lg:w-7/12">
            <div className="">
              <CustomInput
                control={control}
                name={"billing_fullname"}
                id={"billing_fullname"}
                label={"Fullname"}
                placeholder={""}
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

            <div className="lg:grid grid-cols-2 gap-4">
              <CustomInput
                control={control}
                name={"billing_company_name"}
                id={"billing_company_name"}
                label={"Company name"}
                placeholder={""}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                min={""}
                max={""}
                icon=""
              />

              <CustomInput
                control={control}
                name={"billing_company_phone"}
                id={"billing_company_phone"}
                label={"Phone"}
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
            </div>

            <div className="lg:grid grid-cols-2 gap-4">
              <CustomInput
                control={control}
                name={"billing_doing_business_as"}
                id={"billing_doing_business_as"}
                label={"Doing Business As"}
                placeholder={""}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                min={""}
                max={""}
                icon=""
              />

              <CustomInput
                control={control}
                name={"billing_tax_id"}
                id={"billing_tax_id"}
                label={"VAT/Tax ID"}
                placeholder={""}
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

            <div className="">
              <CustomInput
                control={control}
                name={"billing_company_address"}
                id={"billing_company_address"}
                label={"Company Billing Address"}
                placeholder={""}
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

            <div className="lg:grid grid-cols-2 gap-4">
              <CustomSearchSelect
                control={control}
                name={"billing_company_country"}
                id={"billing_company_country"}
                label={"Country"}
                placeholder={""}
                isRequired={true}
                options={countries}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                callbackFunc={setCountry}
              />

              <CustomSearchSelect
                control={control}
                name={"billing_company_city"}
                id={"billing_company_city"}
                label={"State/Region"}
                placeholder={""}
                isRequired={false}
                options={allStates}
                errors={errors}
                isDisabled={!countryCode ? true : false}
                defaultValue={""}
                callbackFunc={setStateId}
              />
            </div>

            <div className="lg:grid grid-cols-2 gap-4">
              <CustomSearchSelect
                control={control}
                name={"billing_company_region"}
                id={"billing_company_region"}
                label={"Cities"}
                placeholder={""}
                isRequired={true}
                options={cities}
                errors={errors}
                isDisabled={!stateCode ? true : false}
                defaultValue={""}
              />

              <CustomInput
                control={control}
                name={"billing_company_zipcode"}
                id={"billing_company_zipcode"}
                label={"Zip Code"}
                placeholder={""}
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

            <div className="grid grid-cols-3 mt-10 items-center">
              <div className="">
                {/* @ts-ignore */}
                {/* <SecondaryButton
                  title="Back"
                  icon="ion-ios-arrow-round-back"
                  onClick={previousStep}
                /> */}
              </div>
              <div className="mx-auto"></div>
              <div className="">
                {/* @ts-ignore */}
                <PrimaryButton
                  title="Save & Continue"
                  loading={completing_datasheet}
                />
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  const {
    fetching_datasheet,
    completing_datasheet,
    specific_datasheet_section,
    datasheet_data,
  } = state.shipmentDataSheet;
  return {
    fetching_datasheet,
    completing_datasheet,
    specific_datasheet_section,
    datasheet_data,
  };
};

export default connect(mapStateToProps, {
  getDataSheetById,
  completeDatasheet,
})(Billing);
