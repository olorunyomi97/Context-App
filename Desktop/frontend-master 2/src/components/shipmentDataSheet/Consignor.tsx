import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
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

const Consignor = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const {
    loading,
    prevStep,
    nextStep,
    completing_datasheet,
    completeDatasheet,
  } = props;

  const params = useParams();

  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [countries, setCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [cities, setCities] = useState([]);

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
    data.consignor_country = data.consignor_country?.value;
    data.consignor_state = data.consignor_state?.value;
    data.consignor_city = data.consignor_city?.value;

    const newData = {
      rate_id: params.id,
      sheet_section: "consignor",
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
            <h3 className="text-xl font-semibold black-text">Consignor</h3>
            <p className="grey-text text-xs mt-1">
              The Exporter of record for your shipment. Usually the factory,
              sourcing agent, etc.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-24 lg:w-7/12">
            <div className="lg:grid grid-cols-2 gap-4">
              <CustomInput
                control={control}
                name={"consignor_company_name"}
                id={"consignor_company_name"}
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
              />

              <CustomInput
                control={control}
                name={"consignor_fullname"}
                id={"consignor_fullname"}
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
                name={"consignor_email"}
                id={"consignor_email"}
                label={"Email"}
                placeholder={""}
                isRequired={true}
                type={"email"}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                min={""}
                max={""}
                icon=""
              />

              <CustomInput
                control={control}
                name={"consignor_phone"}
                id={"consignor_phone"}
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
              <CustomSearchSelect
                control={control}
                name={"consignor_country"}
                id={"consignor_country"}
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
                name={"consignor_state"}
                id={"consignor_state"}
                label={"State"}
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
                name={"consignor_city"}
                id={"consignor_city"}
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
                name={"consignor_postal_code"}
                id={"consignor_postal_code"}
                label={"Postal Code"}
                placeholder={""}
                isRequired={true}
                type={"number"}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                min={"1"}
                max={""}
                icon=""
              />
            </div>

            <div className="grid grid-cols-3 mt-10 items-center">
              <div className="">
                {/* @ts-ignore */}
                <SecondaryButton
                  title="Back"
                  icon="ion-ios-arrow-round-back"
                  onClick={prevStep}
                />
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
})(Consignor);
