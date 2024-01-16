import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

//components
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import CustomPhoneInput from "components/textInputs/CustomPhoneInput";
import PageLoading from "components/partials/pageLoading";

//redux
import { getDataSheetById, completeDatasheet } from "store/actions";

const CompanyDetails = (props: any) => {
  const params = useParams();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const {
    fetching_datasheet,
    completing_datasheet,
    specific_datasheet_section,
    updateDataSheetAside,
    getDataSheetById,
    completeDatasheet,
  } = props;

  let user = useSelector((state: any) => state.auth.user_data);
  let localStorageUser = localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data")!)
    : null;

  user = user ? user : localStorageUser;

  useEffect(() => {
    window.scrollTo(0, 0);

    const datasheet_id =
      specific_datasheet_section?.datasheet_id || urlParams.get("datasheet");

    const data = {
      rate_id: params.id,
      datasheet_id,
      sheet_section: "company",
    };

    if (datasheet_id) {
      getDataSheetById(data, reset);
    }
  }, []);

  const onSubmit = (data: any) => {
    data.company_address = data.company_address.label
      ? data.company_address.label
      : data.company_address;
    data.contact_person_phone = data.contact_person_phone.phone
      ? data.contact_person_phone.phone
      : data.contact_person_phone.toString();

    const newData = {
      rate_id: params.id,
      sheet_section: "company",
      data,
    };
    completeDatasheet(newData, updateDataSheetAside);
  };

  return (
    <>
      {fetching_datasheet ? (
        <>
          {" "}
          <PageLoading />{" "}
        </>
      ) : (
        <>
          {" "}
          <div className="mb-10">
            <h3 className="text-xl font-semibold black-text">
              Company Details
            </h3>
            <p className="grey-text text-xs mt-1">
              Amet morbi risus dui lectus id ultrices justo vel. Ut morbi donec
              est orci facilisi velit cursus quisque amet.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-24 lg:w-7/12">
            <div className="">
              <CustomInput
                control={control}
                name={"company_name"}
                id={"company_name"}
                label={"Company Name"}
                placeholder={"Enter company name"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={true}
                defaultValue={
                  specific_datasheet_section?.company_name || user?.company_name
                }
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="">
              {/* <CustomGoogleInput
                // icon={"ion-ios-pin"}
                icon=""
                control={control}
                name={"company_address"}
                id={"company_address"}
                label={"Company Address"}
                placeholder={`Enter your company address`}
                isRequired={true}
                errors={errors}
                isDisabled={true}
                defaultValue={specific_datasheet_section?.company_address}
              /> */}
              <CustomInput
                control={control}
                name={"company_address"}
                id={"company_address"}
                label={"Company Address"}
                placeholder={"Enter your company address"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={true}
                defaultValue={
                  specific_datasheet_section?.company_address ||
                  user?.company_address
                }
                min={""}
                max={""}
                icon=""
              />
            </div>
            <div className="">
              <CustomInput
                control={control}
                name={"postal_code"}
                id={"postal_code"}
                label={"Postal Code"}
                placeholder={"Enter postal code"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.postal_code}
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="">
              <CustomInput
                control={control}
                name={"contact_person"}
                id={"contact_person"}
                label={"Contact Person"}
                placeholder={"Enter full name of contact person"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={true}
                defaultValue={
                  specific_datasheet_section?.contact_person ||
                  user?.firstname + " " + user?.lastname
                }
                min={""}
                max={""}
                icon=""
              />
            </div>
            <div className="lg:grid grid-cols-2 gap-4">
              <CustomInput
                control={control}
                name={"contact_person_email"}
                id={"contact_person_email"}
                label={"Email"}
                placeholder={"Enter contact person's email"}
                isRequired={true}
                type={"email"}
                errors={errors}
                isDisabled={true}
                defaultValue={
                  specific_datasheet_section?.contact_person_email ||
                  user?.email
                }
                min={""}
                max={""}
                icon=""
              />

              {/* <CustomPhoneInput
                control={control}
                name={"contact_person_phone"}
                id={"contact_person_phone"}
                label={"Contact Number"}
                isRequired={true}
                defaultValue={
                  `${specific_datasheet_section?.contact_person_phone}` ||
                  `${user?.phone}`
                }
                placeholder={"Enter contact phone number"}
                isDisabled={true}
                errors={errors}
              /> */}

              <CustomInput
                control={control}
                name={"contact_person_phone"}
                id={"contact_person_phone"}
                label={"Contact Number"}
                placeholder={"Enter contact phone number"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={true}
                defaultValue={
                  specific_datasheet_section?.contact_person_phone ||
                  user?.phone
                }
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="">
              <CustomInput
                control={control}
                name={"tax_id"}
                id={"tax_id"}
                label={"Tax/VAT reference ID"}
                placeholder={"Enter tax/vat reference ID"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={specific_datasheet_section?.tax_id}
                min={""}
                max={""}
                icon=""
              />
            </div>
            <div className="grid grid-cols-3 mt-10 items-center">
              <div className=""></div>
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
})(CompanyDetails);
