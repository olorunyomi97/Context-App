import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PageLoading from "components/partials/pageLoading";
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomTabs from "components/customTabs/CustomTabs";
import Consignor from "components/shipmentDataSheet/Consignor";
import Consignee from "components/shipmentDataSheet/Consignee";
import AttachDocuments from "components/shipmentDataSheet/AttachDocuments";
import Billing from "components/shipmentDataSheet/Billing";
import ContainerDetails from "components/shipmentDataSheet/ContainerDetails";
import PaymentDrawer from "components/invoice/PaymentDrawer";

//helper
import { formatCurrency } from "helpers";

//logos
import Maersk from "assets/logos/maersk.png";

//icons
import movement from "assets/icons/movement.svg";

//redux
import { getRateById, getInvoicesByRateId } from "store/actions";

const BookingSummary = (props: any) => {
  const [openAside, SetOpenAside] = useState(false);
  const [tab, setTab] = useState("Action Required");
  const [payment, setPayment] = useState(true);
  const [contact, setContact] = useState(true);
  const [goods, setGoods] = useState(true);
  const [datasheet, setDatasheet] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [oceanFreight, setOceanFreight] = useState(0);

  const {
    getting_rates,
    rate_data,
    rate_result,
    loading,
    rate_invoice_data,
    getRateById,
    getInvoicesByRateId,
  } = props;

  const params = useParams();

  // console.log("rate-invoice-data>>>", rate_invoice_data)

  useEffect(() => {
    getRateById(params.id);
    getInvoicesByRateId(params.id);

    //@todo: if invoice is paid show summary first
    setTab("Payment");

    // if (rate_data || rate_result) {
    //   setTab("Summary");
    // }
  }, []);

  // useEffect(() => {
  //   let oceanFreight_ = 0;

  //   if (rate_invoice_data?.rates_result) {
  //     rate_invoice_data?.rates_result.rates_data?.ocean_additional_details
  //       .length > 0 &&
  //       rate_invoice_data?.rates_result.rates_data?.ocean_additional_details.map(
  //         (data) => {
  //           if (
  //             rate_invoice_data?.invoice_details?.invoice_currency === "NGN"
  //           ) {
  //             oceanFreight_ += data.load_total_ngn_amount;
  //             setOceanFreight(oceanFreight_);
  //           } else {
  //             oceanFreight_ += data.load_total_usd_amount;
  //             setOceanFreight(oceanFreight_);
  //           }
  //         }
  //       );
  //   }
  // });
  useEffect(() => {
    let oceanFreight_ = 0;

    if (rate_invoice_data?.rates_result) {
      if (rate_invoice_data?.rates_result.rates_data?.charge_breakdown) {
        rate_invoice_data?.rates_result.rates_data?.charge_breakdown?.insurance_charges.map(
          (data) => {
            if (
              rate_invoice_data?.invoice_details?.invoice_currency === "NGN"
            ) {
              oceanFreight_ += data.load_total_ngn_amount;
              setOceanFreight(oceanFreight_);
            } else {
              oceanFreight_ += data.load_total_usd_amount;
              setOceanFreight(oceanFreight_);
            }
          }
        );
      }
    }
  });

  const nextStep = () => {
    setDatasheet(datasheet + 1);
  };

  const prevStep = () => {
    if (datasheet > 1) {
      setDatasheet(datasheet - 1);
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

        <div className="flex-1">
          <TopBar title="Booking Summary" SetOpenAside={SetOpenAside} />

          {getting_rates || loading ? (
            <>
              <PageLoading title={"booking summary"} />
            </>
          ) : (
            <div className="dashboard-content-scroll">
              <div className="px-7 pt-5 lg:px-14 lg:pt-10 container mx-auto">
                <div className="">
                  {/* <div
                    className="top-divider bottom-divider py-3 px-5"
                    style={{ borderTopWidth: 2, borderBottomWidth: 2 }}
                  >
                    <p className="black-text text-sm  font-bold">
                      PO/SKU/Internal Reference
                    </p>
                    <p className="black-text grey-text mt-2 text-xs">
                      #S98FG9898
                    </p>
                  </div> */}

                  <div
                    className=" py-3 px-5 w-full"
                    style={{
                      borderWidth: 2,
                    }}
                  >
                    <p className=" grey-text text-xs capitalize">
                      shipment status
                    </p>
                    <p className="red-text my-1 text-base font-bold uppercase">
                      Booking Placed
                    </p>
                    {rate_data || rate_result ? (
                      <></>
                    ) : (
                      <p className=" grey-text  text-xs">
                        Please complete shipping instructions so that your
                        shipments can be processed
                      </p>
                    )}
                  </div>
                </div>

                <div className="my-5">
                  <CustomTabs
                    tabs={
                      rate_data || rate_result
                        ? ["Payment", "Summary"]
                        : ["Payment", "Action Required"]
                    }
                    activeTab={tab}
                    setActiveTab={setTab}
                  />
                </div>

                <div
                  className={isOpen || openAside ? "" : "z-10"}
                  style={{ top: 0, position: "sticky" }}
                >
                  <div className="bg-light-green text-center py-5 rounded-t-lg shadow-md">
                    <p className="black-text text-xl font-semibold">
                      Your Shipment is almost ready to go?
                    </p>
                    <p className="grey-text mt-1 text-xs">
                      {tab === "Payment"
                        ? "Please complete payment to proceed"
                        : "Fill in the required information below so the logistics provider can process your shipment."}
                    </p>
                  </div>
                  <div className="bg-white rounded-b-lg shadow-md pt-2 px-4 flex items-center">
                    <i className="ion-ios-boat text-2xl pb-2 "></i>
                    <p className="black-text ml-2 text-xs">
                      {rate_data?.origin_port_code},{" "}
                      {rate_data?.origin_port_province},{" "}
                      {rate_data?.origin_port_country}.
                    </p>
                    <img
                      src={movement}
                      alt=""
                      width={40}
                      height={20}
                      className="mx-4"
                    />
                    <p className="black-text ml-2 text-xs">
                      {rate_data?.destination_port_code},{" "}
                      {rate_data?.destination_port_province},{" "}
                      {rate_data?.destination_port_country}.
                    </p>
                  </div>
                </div>

                <div className="">
                  {tab === "Action Required" || tab === "Summary" ? (
                    <>
                      <div className="mt-5 flex">
                        <div className="lg:w-1/6 w-3/6 right-divider">
                          <div className="">
                            <div
                              className="flex items-center cursor-pointer"
                              onClick={() => setPayment(!payment)}
                            >
                              <p className="black-text ml-2 text-xs font-semibold mt-4 ">
                                Billing
                              </p>

                              <i
                                className={`${
                                  payment
                                    ? "ion-ios-arrow-up"
                                    : "ion-ios-arrow-down"
                                } text-sm ml-auto mt-4 mr-3`}
                              ></i>
                            </div>
                            {payment ? (
                              <>
                                {" "}
                                <p
                                  className={`${
                                    datasheet === 1
                                      ? "green-text font-bold"
                                      : "black-text"
                                  }  ml-2 text-xs my-4 cursor-pointer`}
                                  onClick={() => setDatasheet(1)}
                                >
                                  Billing Info
                                </p>
                              </>
                            ) : (
                              <></>
                            )}

                            <div
                              className={`flex items-center cursor-pointer ${
                                !contact || (contact && !payment) ? "mt-4" : ""
                              }`}
                              onClick={() => setContact(!contact)}
                            >
                              <p className="black-text ml-2 text-xs font-semibold ">
                                Contact Details
                              </p>
                              <i
                                className={`${
                                  contact
                                    ? "ion-ios-arrow-up"
                                    : "ion-ios-arrow-down"
                                } text-sm ml-auto mr-3`}
                              ></i>
                            </div>
                            {contact ? (
                              <>
                                {" "}
                                <p
                                  className={`${
                                    datasheet === 2
                                      ? "green-text font-bold"
                                      : "black-text"
                                  } ml-2 text-xs my-4 cursor-pointer`}
                                  onClick={() => setDatasheet(2)}
                                >
                                  Consignor
                                </p>
                                <p
                                  className={`${
                                    datasheet === 3
                                      ? "green-text font-bold"
                                      : "black-text"
                                  } ml-2 text-xs my-4 cursor-pointer`}
                                  onClick={() => setDatasheet(3)}
                                >
                                  Consignee
                                </p>
                              </>
                            ) : (
                              <></>
                            )}

                            <div
                              className="flex items-center cursor-pointer"
                              onClick={() => setGoods(!goods)}
                            >
                              <p className="black-text ml-2 text-xs my-4 font-semibold">
                                Your Goods
                              </p>
                              <i
                                className={`${
                                  goods
                                    ? "ion-ios-arrow-up"
                                    : "ion-ios-arrow-down"
                                } text-sm ml-auto mr-3`}
                              ></i>
                            </div>
                            {goods ? (
                              <>
                                {" "}
                                <p
                                  className={`${
                                    datasheet === 4
                                      ? "green-text font-bold"
                                      : "black-text"
                                  } ml-2 text-xs my-4 cursor-pointer`}
                                  onClick={() => setDatasheet(4)}
                                >
                                  Commodities
                                </p>
                                <p
                                  className={`${
                                    datasheet === 5
                                      ? "green-text font-bold"
                                      : "black-text"
                                  } ml-2 text-xs my-4 cursor-pointer`}
                                  onClick={() => setDatasheet(5)}
                                >
                                  Upload Documents
                                </p>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                        <div className="lg:w-10/12 lg:px-16 px-5 ">
                          {datasheet === 1 ? (
                            <Billing nextStep={nextStep} />
                          ) : datasheet === 2 ? (
                            <Consignor
                              nextStep={nextStep}
                              prevStep={prevStep}
                            />
                          ) : datasheet === 3 ? (
                            <Consignee
                              nextStep={nextStep}
                              prevStep={prevStep}
                            />
                          ) : datasheet === 4 ? (
                            <ContainerDetails
                              nextStep={nextStep}
                              prevStep={prevStep}
                            />
                          ) : datasheet === 5 ? (
                            // <UploadDocs />
                            <AttachDocuments prevStep={prevStep} />
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </>
                  ) : tab === "Payment" ? (
                    <>
                      <div className="mt-4">
                        <div className="flex items-center">
                          <div
                            className="text-center bg-green px-4 py-4 rounded cursor-pointer w-full"
                            onClick={() => setIsOpen(true)}
                          >
                            <p className="text-base text-white font-bold">
                              Proceed to payment
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 mt-4">
                          <div className="right-divider">
                            <div className="my-4 ">
                              <p className="grey-text text-sm mb-1">
                                Total Cost
                              </p>
                              <p className="black-text text-base font-semibold">
                                {formatCurrency(
                                  rate_invoice_data?.invoice_details
                                    ?.invoice_amount,
                                  rate_invoice_data?.invoice_details
                                    ?.invoice_currency
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="right-divider ">
                            <div className="m-4">
                              <p className="grey-text text-sm mb-1">
                                Total Paid
                              </p>
                              <p className="black-text text-base font-semibold">
                                {formatCurrency(
                                  rate_invoice_data?.invoice_details
                                    ?.invoice_amount_paid,
                                  rate_invoice_data?.invoice_details
                                    ?.invoice_currency
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="px-4">
                            <div className="m-4">
                              <p className="grey-text text-sm mb-1">
                                Amount Due
                              </p>
                              <p className="black-text text-base font-semibold">
                                {formatCurrency(
                                  rate_invoice_data?.invoice_details
                                    ?.invoice_amount_pending,
                                  rate_invoice_data?.invoice_details
                                    ?.invoice_currency
                                )}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-7">
                          <p className="black-text text-base font-semibold">
                            Cost Breakdown
                          </p>

                          <div className="my-4">
                            <div className="top-divider left-divider right-divider rounded-t-lg">
                              <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">
                                  Ocean Freight
                                </p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                  {formatCurrency(
                                    oceanFreight,
                                    rate_invoice_data?.invoice_currency
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="solid-br ">
                              <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">
                                  Duties & Taxes
                                </p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                  N/A
                                </p>
                              </div>
                            </div>
                            {rate_invoice_data?.rates_result?.rates_data
                              ?.charges?.insurance_charges &&
                            rate_invoice_data?.rates_result?.rates_data?.charges
                              ?.insurance_charges.length
                              ? rate_invoice_data?.rates_result?.rates_data?.charges.insurance_charges.map(
                                  (item: any, index: number) => {
                                    return (
                                      <div className="bottom-divider left-divider right-divider ">
                                        <div className="grid grid-cols-2">
                                          <p className="black-text text-sm py-3 px-5 ">
                                            {item.description}
                                          </p>
                                          <p className="black-text text-sm left-divider py-3 px-5 ">
                                            {formatCurrency(
                                              rate_invoice_data?.invoice_details
                                                ?.invoice_currency === "NGN"
                                                ? item.amount
                                                : item.amount_usd,
                                              rate_invoice_data?.invoice_details
                                                ?.invoice_currency
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  }
                                )
                              : null}
                            {rate_invoice_data?.rates_result?.rates_data
                              ?.charges?.service_charges &&
                              rate_invoice_data?.rates_result?.rates_data
                                ?.charges?.service_charges.length &&
                              rate_invoice_data?.rates_result?.rates_data?.charges.service_charges.map(
                                (item: any, index: number) => {
                                  return (
                                    <div className="bottom-divider left-divider right-divider ">
                                      <div className="grid grid-cols-2">
                                        <p className="black-text text-sm py-3 px-5 ">
                                          {item.description}
                                        </p>
                                        <p className="black-text text-sm left-divider py-3 px-5 ">
                                          {formatCurrency(
                                            rate_invoice_data?.invoice_details
                                              ?.invoice_currency === "NGN"
                                              ? item.amount
                                              : item.amount_usd,
                                            rate_invoice_data?.invoice_details
                                              ?.invoice_currency
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                }
                              )}

                            <div className="bottom-divider left-divider right-divider rounded-b-lg">
                              <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">
                                  Total
                                </p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                  {formatCurrency(
                                    rate_invoice_data?.invoice_details
                                      ?.invoice_currency === "NGN"
                                      ? rate_invoice_data?.rates_result
                                          ?.rates_data?.total_amount_ngn
                                      : rate_invoice_data?.rates_result
                                          ?.rates_data?.total_amount_usd,
                                    rate_invoice_data?.invoice_details
                                      ?.invoice_currency
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <PaymentDrawer
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        invoice={rate_invoice_data?.invoice_details}
                      />
                    </>
                  ) : (
                    <></>
                  )}
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
  const { getting_rates, error, rate_result, rate_data } = state.rate;
  const { loading, rate_invoice_data } = state.invoice;
  return {
    getting_rates,
    error,
    rate_result,
    rate_data,
    loading,
    rate_invoice_data,
  };
};
export default connect(mapStateToProps, { getRateById, getInvoicesByRateId })(
  BookingSummary
);
