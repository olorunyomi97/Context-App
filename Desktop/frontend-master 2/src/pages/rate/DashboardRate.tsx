import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import RateShipmentDetails from "components/rates/RateShipmentDetails";
import PrimaryButton from "components/buttons/PrimaryButton";
import OutlineButton from "components/buttons/OutlineButton";
import SingleRate from "components/rates/SingleRate";
import SingleInsurance from "components/rates/SingleInsurance";
import PageLoading from "components/partials/pageLoading";
import CustomCheckBox from "components/checkBox/CustomCheckbox";

//logos
import Kobo360 from "assets/logos/kobo.png";
import Cma from "assets/logos/cma.png";

//redux
import { liveRateRequest, saveLiveRatesSelection } from "store/actions";
import { getRateById } from "store/actions";

import NotifyMe from "components/rates/NotifyMe";
import EmptyResult from "components/partials/EmptyResult";

const DashboardRate = (props: any) => {
  const [openAside, SetOpenAside] = useState(false);
  const [rates, setRates] = useState([]);
  const [selectedRate, setSelectedRate] = useState("");
  const [selectedInsurance, setSelectedInsurance] = useState("");
  const [currency, setCurrency] = useState("NGN");

  const params = useParams();
  const {
    loading,
    live_rates,
    liveRateRequest,
    saveLiveRatesSelection,
    saving_live_rates_selection,
    getRateById,
    rate_data,
  } = props;

  //categories
  const [allCategories, setAllCategories] = useState(true);
  const [oceanFreight, setOceanFreight] = useState(false);
  const [marineInsurance, setMarineInsurance] = useState(false);
  const [haulage, setHaulage] = useState(false);
  const [inlandTrucking, setInlandTrucking] = useState(false);

  useEffect(() => {
    if (params.id) {
      liveRateRequest(params.id);
      getRateById(params.id);
    }
  }, [params.id]);

  const onSelectRate = (id: string) => {
    setSelectedRate(id);

    let data = {
      instant_result_id: id,
      rates_currency: currency,
    };

    saveLiveRatesSelection({ data, id: params.id });
  };

  const onSelectInsurance = (id: string) => {
    setSelectedInsurance(id);
  };

  return (
    <div className="flex">
      <Aside
        activeTab="rate"
        openAside={openAside}
        SetOpenAside={SetOpenAside}
      />

      <div className="flex-1">
        <TopBar title="Rates" SetOpenAside={SetOpenAside} />

        {loading ? (
          <>
            <PageLoading title={"rates"} />
          </>
        ) : (
          <div className="dashboard-content-scroll">
            <div className="px-7 pt-5 lg:px-14 lg:pt-10 container mx-auto">
              <RateShipmentDetails shipment={rate_data} />

              <div className="flex">
                <div className="mt-5 pb-5 w-full">
                  <div className="">
                    <div className="flex mb-7">
                      <div className=" ml-auto">
                        {/* <label className="text-xs black-text font-medium">
                          Insurance Clause Type
                        </label> */}
                        {/* <select className="text-xs black-text solid-br pr-4 pl-1 py-1.5 rounded mt-1">
                          <option value="clause A">Cheapest</option>
                          <option value="clause C">Fastest</option>
                        </select> */}
                      </div>
                      <div className="ml-3">
                        <div className="flex">
                          <div
                            className={`${
                              currency === "NGN"
                                ? "bg-green active-br"
                                : "solid-br"
                            } py-2 px-4 rounded-l cursor-pointer`}
                            onClick={() => setCurrency("NGN")}
                          >
                            <p
                              className={`${
                                currency === "NGN" ? "white-text" : "black-text"
                              } text-xs`}
                            >
                              NGN
                            </p>
                          </div>
                          <div
                            className={`${
                              currency === "USD"
                                ? "bg-green active-br"
                                : "solid-br"
                            } py-2 px-4 rounded-r cursor-pointer`}
                            onClick={() => setCurrency("USD")}
                          >
                            <p
                              className={`${
                                currency === "USD" ? "white-text" : "black-text"
                              } text-xs`}
                            >
                              USD
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {live_rates.length ? (
                      live_rates.map((rate, index) => {
                        return (
                          <>
                            <div className="" key={index}>
                              <SingleRate
                                currency={currency}
                                id={rate._id}
                                rate={rate.rates_data}
                                selectedRate={selectedRate}
                                onSelectRate={onSelectRate}
                                loading={saving_live_rates_selection}
                                // images={
                                //   // live_rates.ocean_freight.ocean_freight_images
                                // }
                              />
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <NotifyMe title="Ocean Freights" shipment={rate_data} />
                    )}
                  </div>

                  <div className="my-7 bg-yellow p-7 rounded">
                    <p className="black-text font-semibold mb-2">Important</p>
                    <p className="grey-text text-xs">
                      Click on 'additional charges apply' to view description of
                      full rates and any sub-payments that adds up to your total
                      charge.
                    </p>
                  </div>

                  {/* <div className="mb-10">
                    <hr className="solid br" />
                  </div> */}
                  {/* <div className="flex "> */}
                  {/* <div className="ml-auto mr-3"> */}
                  {/* @ts-ignore  */}
                  {/* <OutlineButton
                        // loading={loading.requesting_follow_up}
                        // disabled={loading.requesting_follow_up || loading.accepting_quote}
                        title={"Cancel"}
                        // onClick={() => onContact()}
                        style={{ width: "10rem" }}
                      />
                    </div> */}

                  {/* @ts-ignore  */}
                  {/* <PrimaryButton
                      loading={saving_live_rates_selection}
                      disabled={saving_live_rates_selection}
                      onClick={() => onSubmit()}
                      title="Proceed"
                      style={{ width: "10rem" }}
                    /> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { loading, live_rates, saving_live_rates_selection, rate_data } =
    state.rate;
  return {
    loading,
    live_rates,
    saving_live_rates_selection,
    rate_data,
  };
};

export default connect(mapStateToProps, {
  liveRateRequest,
  saveLiveRatesSelection,
  getRateById,
})(DashboardRate);
