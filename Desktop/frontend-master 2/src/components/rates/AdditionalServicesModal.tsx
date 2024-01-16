import { useState, useEffect } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import ReactTooltip from "react-tooltip";
import moment from "moment";

//components
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomSelect from "components/selectInputs/CustomSelect";

//icons
import arrowUp from "assets/icons/arrow-up.svg";
import arrowDown from "assets/icons/arrow-down.svg";
import movement from "assets/icons/movement.svg";

//redux
import {
  getInsuranceProviders,
  finalizeRateRequest,
  clearInsuranceProviders,
} from "store/actions";
import { formatCurrency } from "helpers";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "0px",
    transform: "translate(-50%, -50%)",
    // width: "810px",
    borderRadius: "10px",
    border: "0.01px solid #888",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
};

const AdditionalServicesModal = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const {
    modalIsOpen,
    closeModal,
    data,
    getInsuranceProviders,
    getting_insurance_providers,
    clearInsuranceProviders,
    insurance_providers,
    finalizing_rate_request,
    finalizeRateRequest,
  } = props;
  const [insurance, setInsurance] = useState(false);
  const [clauseType, setClauseType] = useState("A");
  const [selectedInsurance, setSelectedInsurance] = useState(null);

  // console.log("finalize", finalizing_rate_request)

  const initiateInsuranceRequest = () => {
    if (insurance) {
      let query = {
        clause_type: clauseType,
        shipping_type: data.shipping_type,
        goods_value: data.goods_value,
        insurer_country: "NG",
      };

      setSelectedInsurance(null);
      getInsuranceProviders(query);
    }
  };

  const onSubmit = () => {
    let data_ = {
      insurance: insurance,
      insurance_provider: selectedInsurance?.["provider"],
      insurance_provider_id: selectedInsurance?.["id"],
      insurance_clause: clauseType,
    };

    const newData = {
      id: data._id,
      data: data_,
    };

    finalizeRateRequest(newData, closeModal);
  };

  return (
    <>
      <div className="">
        <Modal
          isOpen={modalIsOpen}
          //   onAfterOpen={afterOpenModal}
          // onRequestClose={closeModal}
          style={customStyles}
          contentLabel="modal"
          className={""}
        >
          {/* <div className="flex">
           
          </div> */}
          {Object.entries(data).length ? (
            <>
              <div className="">
                <div className="grid grid-cols-3 items-center p-3 bg-green rounded-t-lg">
                  <div className="flex items-center">
                    <img
                      src={
                        data.shipping_type === "import" ? arrowDown : arrowUp
                      }
                      alt=""
                      width={40}
                      height={40}
                      className="bg-light-green p-2 rounded-full"
                    />

                    <p className="white-text text-sm ml-2 capitalize">
                      {data?.shipping_type}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="white-text text-sm">
                      {/* {moment(data.createdAt).format("LL")} */}
                    </p>
                  </div>
                  <div
                    className="text-center pr-5 w-16 ml-auto cursor-pointer "
                    onClick={closeModal}
                  >
                    <div className="bg-light-green rounded-full px-0.5 py-1">
                      <i className="ion-ios-close green-text text-3xl  "></i>
                    </div>
                  </div>
                </div>
                <div className="bg-spiral"></div>
                <div className="bg-light-green  grid grid-cols-3 gap-4 rounded-b-lg p-3 lg:p-7 items-center ">
                  <div className="">
                    <p className="black-text text-xs mb-5 font-semibold uppercase">
                      Origin
                    </p>
                    <p className="black-text text-lg lg:text-2xl font-bold">
                      {data?.origin_port_code}
                    </p>
                    <p className="black-text text-xs lg:text-sm  font-semibold">
                      {data?.origin_port_city}, {data?.origin_port_country}
                    </p>
                  </div>
                  <div className="mt-5">
                    <img
                      src={movement}
                      alt=""
                      width={150}
                      height={12}
                      className=""
                    />
                  </div>
                  <div className="">
                    <p className="black-text text-xs mb-5 font-semibold uppercase">
                      destination
                    </p>
                    <p className="black-text text-lg lg:text-2xl font-bold ">
                      {data?.destination_port_code}
                    </p>
                    <p className="black-text text-xs lg:text-sm  font-semibold">
                      {data?.destination_port_city},{" "}
                      {data?.destination_port_country}
                    </p>
                  </div>

                  <div className=""></div>
                  <div className="">
                    <p className="black-text lg:text-sm text-xs font-semibold">
                      Pickup Date:{" "}
                      {moment(data?.shipment_pickup_date).format("LL")}
                    </p>
                  </div>
                  <div className=""></div>
                </div>

                <div className="">
                  <div className="p-7">
                    <p className="black-text font-semibold">
                      Additional Services
                    </p>
                    <p className="black-text text-sm">
                      We have included additional services to make your shipping
                      order more seamless.
                    </p>
                  </div>

                  <div className="px-7 pb-7">
                    <div className="flex  items-center">
                      <label
                        className="black-text font-semibold mr-2"
                        htmlFor="insurance"
                      >
                        Add Insurance
                      </label>

                      <CustomCheckBox
                        name="insurance"
                        id="insurance"
                        label=""
                        isRequired={false}
                        isDisabled={false}
                        onChange={(value: boolean) => {
                          setInsurance(value);
                          if (value === false) {
                            setSelectedInsurance(null);
                            clearInsuranceProviders();
                          }
                        }}
                        defaultChecked={insurance}
                      />
                    </div>
                    <p className="black-text text-sm">
                      Covers the combined value of goods and initial freight
                      costs up to $500k
                    </p>

                    {insurance ? (
                      <>
                        <div className="flex items-center mt-4">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <label className="text-xs black-text font-medium">
                                Insurance Clause Type{" "}
                              </label>
                              <i
                                className="fa fa-question-circle-o ml-2 "
                                data-for="custom-tooltip"
                                data-tip={`${
                                  clauseType === "A"
                                    ? "CLAUSE A covers losses due to breakage, chipping, denting, bruising, theft, non-delivery, all water damage, etc. Also, covers Clause C."
                                    : "CLAUSE C covers the shipment against events such as fire, discharge of cargo in case of distress, explosion, accidents like sinking, capsizing, derailment, collision etc."
                                }`}
                                style={{ color: "#3ab44a" }}
                              />

                              <ReactTooltip
                                id="custom-tooltip"
                                className="custom-tooltip"
                                place="right"
                                arrowColor={"#f3f4f6"}
                                textColor={"#111827"}
                                backgroundColor="#f3f4f6"
                                html={true}
                              />
                            </div>
                            <select
                              className="text-xs black-text solid-br pr-4 pl-1 py-1.5 rounded mt-1"
                              onChange={(e) => setClauseType(e.target.value)}
                            >
                              <option value="A">Clause A</option>
                              <option value="C">Clause C</option>
                            </select>
                          </div>

                          <div className="mt-5 ml-5">
                            <button
                              className={`${
                                getting_insurance_providers && "opacity-50"
                              } bg-green text-white text-xs py-2 px-3 rounded`}
                              onClick={() => initiateInsuranceRequest()}
                            >
                              {getting_insurance_providers && (
                                <i className="fa fa-spinner fa-pulse mr-2"></i>
                              )}
                              See Insurance Providers
                            </button>
                          </div>
                        </div>

                        {/* <div className="__react_component_tooltip">
                          <ReactTooltip
                            id="custom-color"
                            className="custom-color bg-grey"
                            // place="right"
                            arrowColor={"#f3f4f6"}
                            textColor={"#111827"}
                            html={true}
                          />
                        </div> */}
                      </>
                    ) : null}

                    {getting_insurance_providers ? (
                      <>
                        <div className="text-xs grey-text my-4">
                          <p>
                            <em>Fetching insurance providers...</em>
                          </p>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 pt-4">
                      {insurance &&
                      insurance_providers.length &&
                      !getting_insurance_providers
                        ? insurance_providers.map((provider, index) => {
                            return (
                              <div
                                className={`${
                                  selectedInsurance === provider
                                    ? "active-br"
                                    : "solid-br"
                                }  rounded-lg p-3 cursor-pointer`}
                                onClick={() => setSelectedInsurance(provider)}
                              >
                                <p className="black-text text-sm font-semibold">
                                  {provider.insurer.name}
                                </p>
                                <p className="black-text text-xs my-1">
                                  Premium:
                                  {formatCurrency(
                                    provider.premium,
                                    provider.insurer.currency
                                  )}
                                </p>
                                <p className="black-text text-xs">
                                  Clause type: {provider.clause}
                                </p>
                              </div>
                            );
                          })
                        : null}
                    </div>

                    <div className="flex  md:mx-7  mx-5 pt-5 ">
                      <div className=" mx-auto md:ml-auto md:mx-0 lg:w-1/4 w-2/4 ">
                        {/* @ts-ignore */}

                        <PrimaryButton
                          title="Find Rates"
                          disabled={insurance && !selectedInsurance}
                          loading={finalizing_rate_request}
                          onClick={() => {
                            onSubmit();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </Modal>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const {
    error,
    getting_insurance_providers,
    insurance_providers,
    finalizing_rate_request,
  } = state.rate;
  return {
    error,
    getting_insurance_providers,
    insurance_providers,
    finalizing_rate_request,
  };
};

export default connect(mapStateToProps, {
  getInsuranceProviders,
  finalizeRateRequest,
  clearInsuranceProviders,
})(AdditionalServicesModal);
