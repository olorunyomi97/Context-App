// @ts-nocheck
import { useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
// import moment from "moment";

//components
import CustomSelect from "components/selectInputs/CustomSelect";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomInput from "components/textInputs/CustomInput";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";
import ContainerDetails from "components/rates/ContainerDetails";

//helpers
import { findDefaultPort, getCurrentTimestamp } from "helpers";
import SecondaryButton from "components/buttons/SecondaryButton";
import AdditionalServicesModal from "./AdditionalServicesModal";

//redux
import { initiateRateRequest } from "store/actions";
import { useEffect } from "react";

const Export = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {
    defaultPortsOfOrigin,
    defaultPortsOfDestination,
    initiateRateRequest,
    rate_data,
    loading,
    getting_rates,
  } = props;

  // console.log("rate_data>>>", defaultPortsOfOrigin)

  const [containerDetails, setContainerDetails] = useState([{}]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const addNewContainer = () => {
    setContainerDetails([...containerDetails, {}]);
  };

  const containers = [];

  const removeContainer = (index: number) => {
    let newContainerDetails = containerDetails.filter((data, i) => {
      if (i !== index) {
        return data;
      }
    });
    setContainerDetails(newContainerDetails);
  };

  useEffect(() => {
    let newContainerDetails = [];
    if (rate_data?.container_details?.length > 0) {
      rate_data?.container_details?.map((data: any, index: number) => {
        newContainerDetails.push(data);
      });
    }

    if (newContainerDetails.length > 0) {
      setContainerDetails(newContainerDetails);
    }
  }, []);

  const defaultOrigin = findDefaultPort(
    defaultPortsOfOrigin,
    rate_data.origin_port_code
  );

  const defaultDestination = findDefaultPort(
    defaultPortsOfDestination,
    rate_data.destination_port_code
  );

  const onSubmit = (data: any) => {
    let totalContainers = 0;

    for (let i = 0; i < containerDetails.length; i++) {
      containers.push({
        container_count: data[`container_count_${i}`],
        container_size: data[`container_size_${i}`].value,
        container_type: data[`container_type_${i}`].value,
        container_weight: data[`weight_${i}`],
      });

      // totalContainers += parseInt(data[`container_count_${i}`]);
    }

    // if (totalContainers < 2 || totalContainers > 5) {
    //   return cogoToast.error(
    //     "Please enter a number of containers should be more than 1 or less than 6"
    //   );
    // }

    const newData = {
      shipment_type: "export",
      origin_port: data?.origin_port?.value?.unlocs[0],
      destination_port: data?.destination_port?.value?.unlocs[0],
      shipment_pickup_date: data?.shipment_pickup_date,
      value_of_goods: data?.goods_value,
      value_of_goods_currency: "NGN",
      containers,
    };

    initiateRateRequest(newData, openModal);
  };

  return (
    <>
      {getting_rates ? (
        <></>
      ) : (
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-4 gap-4 items-center md:px-10 md:pt-10 px-4 pt-4 pb-3">
              <CustomSelect
                control={control}
                name={"origin_port"}
                id={"origin_port"}
                label={"Select Origin Port"}
                placeholder={""}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                options={defaultPortsOfOrigin}
                defaultValue={defaultOrigin}
                icon=""
              />

              <CustomSelect
                control={control}
                name={"destination_port"}
                id={"destination_port"}
                label={"Select Destination Port"}
                placeholder={""}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                defaultValue={defaultDestination}
                options={defaultPortsOfDestination}
                icon=""
              />

              <CustomInput
                control={control}
                name={"shipment_pickup_date"}
                id={"shipment_pickup_date"}
                label={"Cargo pick-up date"}
                placeholder={"Enter pickup date"}
                isRequired={true}
                type={"date"}
                errors={errors}
                isDisabled={false}
                defaultValue={
                  rate_data?.shipment_pickup_date
                    ? rate_data?.shipment_pickup_date.slice(0, 10)
                    : new Date().toISOString().slice(0, 10)
                }
                // @ts-ignore
                min={getCurrentTimestamp(4)}
                //   @ts-ignore
                max={getCurrentTimestamp(10)}
                icon=""
              />

              <CustomCurrencyInput
                control={control}
                name={"goods_value"}
                id={"goods_value"}
                label={"Total value of Goods (₦)"}
                placeholder={""}
                isRequired={true}
                type={"number"}
                errors={errors}
                isDisabled={false}
                defaultValue={rate_data?.goods_value}
                min={1}
                max={""}
                icon=""
              />
            </div>

            <div className=" md:mb-10 md:mx-10 md:pt-10 md:pb-10 top-divider-dotted mx-5 pt-5 pb-5">
              <p className="black-text text-sm font-semibold mb-3 ">
                Enter Container Details
              </p>

              {containerDetails.map((item: any, index: number) => {
                let defaultValue = rate_data?.container_details?.length
                  ? rate_data?.container_details[index]
                  : {};
                return (
                  <div className="" key={index}>
                    <ContainerDetails
                      index={index}
                      control={control}
                      errors={errors}
                      defaultValue={defaultValue}
                      removeContainer={removeContainer}
                    />
                  </div>
                );
              })}

              <div className="lg:w-1/4 w-2/4 mt-5">
                {/* @ts-ignore */}
                <SecondaryButton
                  type="button"
                  title="Add More"
                  icon="ion-ios-add"
                  onClick={addNewContainer}
                />
              </div>
            </div>
            <div className="flex  md:mx-10 md:py-10 mx-5 py-5 pb-5 top-divider-dotted ">
              <div className=" mx-auto md:ml-auto md:mx-0 lg:w-1/4 w-2/4 ">
                {/* @ts-ignore */}

                <PrimaryButton title="Search Rates" loading={loading} />
              </div>
            </div>
          </form>

          <AdditionalServicesModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            data={rate_data}
          />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading, rate_data, getting_rates } = state.rate;
  return { error, loading, rate_data, getting_rates };
};

export default connect(mapStateToProps, { initiateRateRequest })(Export);
