import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PageLoading from "components/partials/pageLoading";
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import PrimaryButton from "components/buttons/PrimaryButton";

//helper
import { formatCurrency } from "helpers";

//redux
import { getRateById, confirmLiveRates } from "store/actions";
import { toast } from "react-toastify";

const BookingConfirmation = (props: any) => {
  const [openAside, SetOpenAside] = useState(false);
  const [attestation, setAttestation] = useState(false);
  const [oceanFreight, setOceanFreight] = useState(0);

  const params = useParams();

  const {
    rate_data,
    rate_result,
    getting_rates,
    getRateById,
    confirmLiveRates,
    confirming_live_rates,
  } = props;

  useEffect(() => {
    getRateById(params.id);
  }, []);

  // useEffect(() => {
  //   let oceanFreight_ = 0;

  //   if (rate_result) {
  //     if (rate_result.rates_data?.ocean_additional_details) {
  //       rate_result.rates_data?.ocean_additional_details.length > 0 &&
  //         rate_result.rates_data?.ocean_additional_details.map((data) => {
  //           if (rate_data?.rates_data_currency === "NGN") {
  //             oceanFreight_ += data.load_total_ngn_amount;
  //             setOceanFreight(oceanFreight_);
  //           } else {
  //             oceanFreight_ += data.load_total_usd_amount;
  //             setOceanFreight(oceanFreight_);
  //           }
  //         });
  //     }
  //   }
  // }, [rate_result]);

  useEffect(() => {
    let oceanFreight_ = 0;

    if (rate_result) {
      if (rate_result.rates_data?.charge_breakdown) {
        rate_result?.rates_data?.charge_breakdown?.ocean_charges[0].map(
          (data) => {
            console.log("here>>>>", rate_data?.rates_data_currency);
            if (rate_data?.rates_data_currency === "NGN") {
              console.log("amount>>>", data.amountNgn);
              oceanFreight_ += data.amountNgn;
              setOceanFreight(oceanFreight_);
            } else {
              oceanFreight_ += data.amountUsd;
              setOceanFreight(oceanFreight_);
            }
          }
        );
      }
    }
  }, [rate_result]);

  const onSubmit = () => {
    if (attestation) {
      let data = {
        instant_result_id: rate_data?.rates_data_id,
        rates_currency: rate_data?.rates_data_currency,
      };

      confirmLiveRates({ data, id: params.id });
    } else {
      toast.error("Please accept the attestation");
    }
  };

  return (
    <>
      <div className="flex">
        <Aside
          activeTab="rate"
          openAside={openAside}
          SetOpenAside={SetOpenAside}
        />

        <div className="">
          <TopBar title="Booking Confirmation" SetOpenAside={SetOpenAside} />

          {getting_rates ? (
            <>
              <PageLoading title={"booking confirmation"} />
            </>
          ) : (
            <div className="dashboard-content-scroll">
              <div className="px-7 pt-5  lg:px-14 lg:pt-10 container">
                <div className="lg:flex w-full">
                  <div className="lg:w-4/6 lg:mr-10">
                    <div className=" solid-br lg:p-7 p-3 rounded-md shadow-xl  bg-grey">
                      <div className="bg-white p-5">
                        <div className="flex w-full ">
                          <div className="w-1/5 text-center">
                            <i className="fa fa-building-o"></i>
                            <p className="black-text text-base  font-bold">
                              {rate_data.origin_port_code}
                            </p>
                            <p className="black-text text-xs  ">
                              {rate_data.origin_port_city},{" "}
                              {rate_data.origin_port_country}
                            </p>
                          </div>
                          <div className="w-3/5 text-center">
                            <i className="ion-ios-boat text-2xl pb-2 "></i>
                            <div className="bottom-divider"></div>
                          </div>
                          <div className="w-1/5 text-center">
                            <i className="fa fa-building-o"></i>
                            <p className="black-text text-base  font-bold">
                              {rate_data.destination_port_code}
                            </p>
                            <p className="black-text text-xs  ">
                              {rate_data.destination_port_city},{" "}
                              {rate_data.destination_port_country}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className=" flex my-2">
                        <div className="bg-white p-5 mr-3 text-center w-2/6">
                          <i className="ion-ios-boat text-2xl pb-2 "></i>
                          <p className="black-text text-xs lg:text-sm ">FCL</p>
                        </div>
                        <div className="bg-white p-5 w-4/5">
                          <div className="flex items-center">
                            <i className="ion-ios-time text-xl mr-2"></i>
                            <p className="grey-text text-xs lg:text-sm ">
                              Est transit time from pickup:{" "}
                              {rate_result?.rates_data?.transit_time}
                            </p>
                          </div>
                          <div className="flex items-center mt-3">
                            <i className="ion-ios-calendar text-xl mr-2"></i>
                            <p className="grey-text text-xs lg:text-sm ">
                              Goods Ready: Goods are ready
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-5">
                        <p className="black-text text-xs lg:text-sm font-semibold">
                          Load
                        </p>

                        <div className="flex gap-4 justify-center">
                          {rate_data?.container_details &&
                          rate_data?.container_details.length ? (
                            <>
                              {rate_data?.container_details.map(
                                (item: any, index: number) => {
                                  return (
                                    <div className=" flex justify-center items-center">
                                      <p className="black-text text-base  font-medium mr-2">
                                        {item.container_count}{" "}
                                        <span className="text-sm">X</span>
                                      </p>
                                      <div className="text-center">
                                        <i className="fa fa-table text-3xl "></i>
                                        <p className="black-text text-xs">
                                          Container(s)
                                        </p>
                                        <p className="black-text text-xs">
                                          {item.container_size}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex mt-2">
                        <div className="w-2/4 bg-white p-5">
                          <p className="black-text text-xs lg:text-sm font-semibold">
                            Ocean Freight:{" "}
                            <span className="font-normal">
                              {rate_result?.rates_data?.carrier_name}
                            </span>
                          </p>
                          <img
                            src={rate_result?.rates_data?.carrier_images}
                            alt=""
                            width={160}
                            className="mt-3 mx-auto"
                          />
                        </div>
                        <div className="w-2/4 mx-2 bg-white p-5">
                          <p className="black-text text-xs lg:text-sm font-semibold">
                            Insurance:{" "}
                            {rate_result?.rates_data?.charge_breakdown
                              ?.insurance_charges.length ? (
                              <>
                                {" "}
                                <span className="font-normal">
                                  {
                                    rate_result?.rates_data?.charge_breakdown
                                      ?.insurance_charges[0]?.provider
                                  }
                                </span>
                              </>
                            ) : (
                              <p className="text-grey text-xs">Not Available</p>
                            )}
                          </p>
                          <img
                            src={
                              rate_result?.rates_data?.charge_breakdown
                                ?.insurance_charges[0]?.image
                            }
                            alt=""
                            width={160}
                            className="mt-3 mx-auto"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="solid-br shadow-lg my-5 lg:p-7 p-3 left-divider-green rounded-md">
                      <p className="black-text text-xs lg:text-sm">
                        This rate is guaranteed until{" "}
                        {moment(rate_result?.rates_validity).format("LL")}. If
                        your goods are not gated in after this date, the Quote
                        may be subject to an adjustment inline with the
                        marketplace rate.
                      </p>
                    </div>

                    <div className="desktop-only">
                      <div className=" p-3 mb-5">
                        <CustomCheckBox
                          name="attestation"
                          id="attestation"
                          label="Attestation"
                          isRequired={false}
                          isDisabled={false}
                          onChange={(e) => setAttestation(e)}
                          defaultChecked={attestation}
                        />
                      </div>

                      <div className="mb-10">
                        {/* @ts-ignore */}
                        <PrimaryButton
                          title="Confirm & Book Shipment"
                          loading={confirming_live_rates}
                          onClick={onSubmit}
                          disabled={attestation === false}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-2/6 solid-br p-7 rounded-md shadow-xl lg:ml-auto h-2/5">
                    <p className="text-base black-text pb-3 font-semibold">
                      Price Details
                    </p>
                    <div className="flex py-2 bottom-divider">
                      <p className="grey-text text-xs">Ocean Freight</p>
                      <p className="grey-text text-xs ml-auto">
                        {formatCurrency(
                          oceanFreight,
                          rate_data?.rates_data_currency
                        )}
                      </p>
                    </div>
                    {/* <div className="flex py-2">
                      <p className="grey-text text-xs">
                        Customs brokerage & Bond
                      </p>
                      <p className="grey-text text-xs ml-auto">$275.00</p>
                    </div> */}
                    <div className="flex py-2">
                      <p className="grey-text text-xs">Duties & Taxes</p>
                      <p className="grey-text text-xs ml-auto">N/A</p>
                    </div>
                    {rate_result?.rates_data?.charge_breakdown
                      ?.insurance_charges &&
                      rate_result?.rates_data?.charge_breakdown
                        ?.insurance_charges.length &&
                      rate_result?.rates_data?.charge_breakdown?.insurance_charges.map(
                        (item: any, index: number) => {
                          return (
                            <div className="flex py-2 bottom-divider">
                              <p className="grey-text text-xs">
                                {item.description}
                              </p>
                              <p className="grey-text text-xs ml-auto">
                                {formatCurrency(
                                  rate_data?.rates_data_currency === "NGN"
                                    ? item.amount
                                    : item.amount_usd,
                                  rate_data?.rates_data_currency
                                )}
                              </p>
                            </div>
                          );
                        }
                      )}
                    <div className="bottom-divider">
                      {/* <p className="grey-text text-xs">
                        Based on goods value of $5,000.00 and initial freight
                        costs.
                      </p> */}
                    </div>

                    {rate_result?.rates_data?.charge_breakdown
                      ?.service_charges &&
                      rate_result?.rates_data?.charge_breakdown.service_charges
                        .length &&
                      rate_result?.rates_data?.charge_breakdown.service_charges.map(
                        (item: any, index: number) => {
                          return (
                            <div className="flex py-2 bottom-divider">
                              <p className="grey-text text-xs">
                                {item.description}
                              </p>
                              <p className="grey-text text-xs ml-auto">
                                {formatCurrency(
                                  rate_data?.rates_data_currency === "NGN"
                                    ? item.amount
                                    : item.amount_usd,
                                  rate_data?.rates_data_currency
                                )}
                              </p>
                            </div>
                          );
                        }
                      )}

                    <div className="flex py-3">
                      <p className="black-text text-lg font-semibold">Total:</p>
                      <p className="black-text text-lg font-semibold ml-auto">
                        {rate_data?.rates_data_currency}{" "}
                        {formatCurrency(
                          rate_data?.rates_data_currency === "NGN"
                            ? rate_result?.rates_data?.total_amount_ngn
                            : rate_result?.rates_data?.total_amount_usd,
                          rate_data?.rates_data_currency
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mobile-only mt-5">
                    <div className=" p-3 mb-5">
                      <CustomCheckBox
                        name="attestation"
                        id="attestation"
                        label="Attestation"
                        isRequired={false}
                        isDisabled={false}
                        onChange={(e) => setAttestation(e)}
                        defaultChecked={attestation}
                      />
                    </div>

                    <div className="mb-10">
                      {/* @ts-ignore */}
                      <PrimaryButton
                        title="Confirm & Book Shipment"
                        loading={confirming_live_rates}
                        onClick={onSubmit}
                        disabled={attestation === false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { rate_data, rate_result, getting_rates, confirming_live_rates } =
    state.rate;
  return { rate_data, rate_result, getting_rates, confirming_live_rates };
};

export default connect(mapStateToProps, { getRateById, confirmLiveRates })(
  BookingConfirmation
);
