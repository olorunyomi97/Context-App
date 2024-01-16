import { useState } from "react";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PageLoading from "components/partials/pageLoading";

//icons
import arrowUp from "assets/icons/arrow-up.svg";
import arrowDown from "assets/icons/arrow-down.svg";
import movement from "assets/icons/movement.svg";

const RecentlySearched = () => {
  const [openAside, SetOpenAside] = useState(false);

  const [rates, setRates] = useState({ shipping_type: "import" });

  const loading = false;

  return (
    <>
      <div className="flex">
        <Aside
          activeTab="rate"
          openAside={openAside}
          SetOpenAside={SetOpenAside}
        />

        <div className="">
          <TopBar
            title={"Recently Searched Rates"}
            SetOpenAside={SetOpenAside}
          />
          {loading ? (
            <>
              <PageLoading title={"recently searched rates"} />
            </>
          ) : (
            <div className="px-7 lg:px-14 lg:pt-10 container">
              <div className="mb-7 bg-yellow p-7 rounded">
                <p className="black-text font-semibold mb-2">Notice</p>
                <p className="grey-text text-sm">
                  View history of recently searched rates and pack up from where
                  you left off.
                </p>
              </div>

              <div className={`solid-br rounded cursor-pointer mb-5 p-5`}>
                <div className="flex w-100">
                  <div className=" right-divider w-3/4">
                    <div className=" p-4 bottom-divider flex items-center">
                      <img
                        src={
                          rates.shipping_type === "export" ? arrowUp : arrowDown
                        }
                        alt=""
                        width={40}
                        height={40}
                        className="bg-light-green p-2 rounded-full"
                      />
                      <p className="black-text text-sm ml-2 capitalize font-semibold">
                        {" "}
                        {rates.shipping_type}
                      </p>
                    </div>
                    <div className="p-5 ">
                      {/* <div className="lg:grid grid-cols-2"> */}
                      <div className="items-center">
                        <div className="flex">
                          <div className="grid grid-cols-3 gap-4 p-3 items-center w-2.5/5">
                            <div className="">
                              <p className="black-text text-sm  font-bold">
                                {/* {shipment.shipping_type === "export"
                  ? shipment.origin_port_province
                  : shipment.origin_port} */}{" "}
                                Surulere
                              </p>
                              <p className="grey-text text-xs  mb-5 ">
                                {/* {shipment.pickup_location
                  ? shipment.pickup_location
                  : shipment.origin_port_country} */}{" "}
                                Lagos, Nigeria
                              </p>
                            </div>
                            <div className="">
                              <img
                                src={movement}
                                alt=""
                                width={46}
                                height={12}
                                className=""
                              />
                            </div>
                            <div className="">
                              <p className="black-text text-sm  font-bold ">
                                {/* {shipment.shipping_type === "export"
                  ? shipment.destination_port_province
                  : shipment.delivery_location} */}{" "}
                                Lisbon Port
                              </p>
                              <p className="grey-text text-xs  mb-5 ">
                                {/* {shipment.destination_port_country} */}{" "}
                                Lisbon, Portugal
                              </p>
                            </div>
                          </div>
                          <div className="w-1/5 ml-5">
                            <p className="grey-text text-xs mb-3">
                              Cargo details
                            </p>
                            <p className="black-text text-sm font-semibold">
                              {" "}
                              4 X 40ft
                            </p>
                          </div>
                          <div className="w-1.5/5">
                            <p className="grey-text text-xs mb-3">
                              Additional details
                            </p>
                            <div className="flex">
                              <p className="black-text text-sm font-semibold mr-4">
                                {" "}
                                Marine Insurance
                              </p>
                              <p className="black-text text-sm font-semibold ml-auto">
                                {" "}
                                12,0000 usd
                              </p>
                            </div>
                            <div className="flex mt-3">
                              <p className="black-text text-sm font-semibold">
                                {" "}
                                Warehousing
                              </p>
                              <p className="black-text text-sm font-semibold ml-auto">
                                {" "}
                                2 - 3 weeks
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=""></div>
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center w-1/4">
                    <div
                      className={`${"bg-green"} flex justify-center items-center rounded w-36 py-3`}
                    >
                      <p className="white-text font-semibold text-sm">
                        Show rates
                      </p>
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

export default RecentlySearched;
