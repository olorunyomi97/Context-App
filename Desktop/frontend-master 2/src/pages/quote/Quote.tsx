import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import CustomTabs from "components/customTabs/CustomTabs";
import PageLoading from "components/partials/pageLoading";

//icons
import arrowUp from "assets/icons/arrow-up.svg";
import arrowDown from "assets/icons/arrow-down.svg";
import movement from "assets/icons/movement.svg";
import QuoteIcon from "assets/icons/quote.svg";

//redux
import { getMyQuotes } from "store/actions";

const Quote = (props: any) => {
  const { my_quotes, loading, getMyQuotes } = props;

  const [openAside, SetOpenAside] = useState(false);
  const [tab, setTab] = useState("Pending");

  useEffect(() => {
    getMyQuotes();
  }, []);

  return (
    <div className="lg:flex">
      <Aside
        activeTab="quote"
        openAside={openAside}
        SetOpenAside={SetOpenAside}
      />

      <div className="">
        <TopBar title={"Quotes"} SetOpenAside={SetOpenAside} />

        {loading ? (
          <>
            <PageLoading title={"quotes"} />
          </>
        ) : (
          <>
            <div className="dashboard-content-scroll">
              <div className="lg:px-14 lg:pt-10 container mx-auto  w-full">
                {/* <CustomTabs
            tabs={["Pending", "Approved"]}
            activeTab={tab}
            setActiveTab={setTab}
          /> */}
                <div className="mt-4">
                  {my_quotes.length ? (
                    <>
                      <div className="mt-4">
                        {/* desktop view  */}
                        <table className="desktop-only">
                          <thead>
                            <tr className="pb-5">
                              <th className="grey-text uppercase text-xs font-semibold text-left pl-3 pb-3">
                                shipment type
                              </th>
                              <th className="grey-text mx-2 uppercase text-xs font-semibold text-left px-10 pb-3">
                                origin
                              </th>
                              <th></th>
                              <th className="grey-text mx-2 uppercase text-xs font-semibold text-left px-10 pb-3">
                                destination
                              </th>
                              <th className="grey-text uppercase text-xs font-semibold text-left pr-5  pb-3">
                                date of issue
                              </th>
                              <th className="grey-text mx-2 uppercase text-xs font-semibold text-left pl-5 pb-3">
                                shipping id
                              </th>
                              <th className="grey-text uppercase text-xs font-semibold text-left px-10 pb-3">
                                status
                              </th>
                              <th className="px-16"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {my_quotes.map((data: any, index: number) => {
                              return (
                                <tr
                                  className="right-divider top-divider bottom-divider left-divider rounded w-full"
                                  key={index}
                                >
                                  <td className="py-5 pl-3">
                                    <div className="flex items-center">
                                      <img
                                        src={
                                          data.shipping_type === "export"
                                            ? arrowUp
                                            : arrowDown
                                        }
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="bg-light-green p-2 rounded-full"
                                      />
                                      <p className="ml-2 black-text font-semibold text-sm capitalize">
                                        {data.shipping_type}
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="mx-10">
                                      <p className="black-text font-semibold text-sm">
                                        {data.shipping_type === "export"
                                          ? data.origin_port_province
                                          : data.origin_port}
                                      </p>
                                      <p className="grey-text text-xs">
                                        {data.pickup_location
                                          ? data.pickup_location
                                          : data.origin_port_country}
                                      </p>
                                    </div>
                                  </td>

                                  <td>
                                    <img
                                      src={movement}
                                      alt=""
                                      width={101}
                                      height={12}
                                      className=""
                                    />
                                  </td>
                                  <td>
                                    <div className="mx-10">
                                      <p className="black-text font-semibold text-sm">
                                        {data.shipping_type === "export"
                                          ? data.destination_port_province
                                          : data.delivery_location}
                                      </p>
                                      <p className="grey-text text-xs">
                                        {data.destination_port_country}
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="">
                                      <p className="black-text font-semibold w-full text-sm">
                                        {" "}
                                        {moment(data.createdAt).format("LL")}
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <p className="black-text font-semibold pl-5 text-sm">
                                      {data._id.substring(0, 9)}
                                    </p>
                                  </td>
                                  <td>
                                    <p
                                      className={`${
                                        data.quote_status === "pending_admin"
                                          ? "bg-light-purple purple-text"
                                          : data.quote_status ===
                                            "pending_customer"
                                          ? "bg-light-yellow yellow-text"
                                          : data.quote_status === "accepted"
                                          ? "bg-light-green green-text"
                                          : "bg-light-red red-text"
                                      } text-xs font-semibold  py-2 px-3  mx-10 text-center rounded-full capitalize`}
                                    >
                                      {data.quote_status === "pending_admin"
                                        ? "preparing"
                                        : data.quote_status ===
                                          "pending_customer"
                                        ? "pending"
                                        : data.quote_status === "accepted"
                                        ? "accepted"
                                        : "rejected"}
                                    </p>
                                  </td>
                                  <td>
                                    <Link
                                      to={`/quote-summary/${data._id}`}
                                      className="bg-green white-text text-sm py-3 px-4 w-full rounded mr-3 "
                                    >
                                      View Details
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>

                        {/* mobile view */}
                        <div className="bg-grey py-2 mobile-only">
                          {my_quotes.map((data, index) => {
                            return (
                              <div className="bg-white mb-3" key={index}>
                                <div className="flex items-center py-3 px-7 bottom-divider">
                                  <img
                                    src={
                                      data.shipping_type === "export"
                                        ? arrowUp
                                        : arrowDown
                                    }
                                    alt=""
                                    width={35}
                                    height={35}
                                    className="bg-light-green p-2 rounded-full"
                                  />
                                  <p className="ml-2 black-text font-semibold text-sm capitalize">
                                    {data.shipping_type}
                                  </p>

                                  <p className="ml-auto black-text font-semibold text-sm">
                                    ID: {data._id.substring(0, 9)}
                                  </p>
                                </div>

                                <div className="grid grid-cols-3 gap-8 py-3 px-7 bottom-divider items-center ">
                                  <div className="">
                                    <p className="black-text font-semibold text-sm">
                                      {data.shipping_type === "export"
                                        ? data.origin_port_province
                                        : data.origin_port}
                                    </p>
                                    <p className="grey-text text-xs">
                                      {data.pickup_location
                                        ? data.pickup_location
                                        : data.origin_port_country}
                                    </p>
                                  </div>

                                  <div className="px-5">
                                    <img
                                      src={movement}
                                      alt=""
                                      width={80}
                                      height={12}
                                      className=""
                                    />
                                  </div>

                                  <div className="text-right">
                                    <p className="black-text font-semibold  text-sm">
                                      {data.shipping_type === "export"
                                        ? data.destination_port_province
                                        : data.delivery_location}
                                    </p>
                                    <p className="grey-text text-xs">
                                      {data.destination_port_country}
                                    </p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-3 px-7 bottom-divider items-center">
                                  <div className="">
                                    <p className="black-text font-semibold text-sm">
                                      {moment(data.createdAt).format("LL")}
                                    </p>
                                  </div>
                                  <div className="">
                                    <p
                                      className={`${
                                        data.quote_status === "pending_admin"
                                          ? "bg-light-purple purple-text"
                                          : data.quote_status ===
                                            "pending_customer"
                                          ? "bg-light-yellow yellow-text"
                                          : data.quote_status === "accepted"
                                          ? "bg-light-green green-text"
                                          : "bg-light-red red-text"
                                      }  text-xs font-semibold py-2 px-1.5  text-center rounded-full`}
                                    >
                                      {data.quote_status === "pending_admin"
                                        ? "preparing"
                                        : data.quote_status ===
                                          "pending_customer"
                                        ? "pending"
                                        : data.quote_status === "accepted"
                                        ? "accepted"
                                        : "rejected"}
                                    </p>
                                  </div>

                                  <Link
                                    to={`/quote-summary/${data._id}`}
                                    className="bg-green white-text text-xs py-2 text-center w-full rounded mr-3"
                                  >
                                    View Details
                                  </Link>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {/* end mobile view  */}
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="flex flex-col item-center justify-center solid-br-desktop rounded"
                        style={{ minHeight: 500 }}
                      >
                        <img
                          src={QuoteIcon}
                          alt=""
                          width={70}
                          height={70}
                          className="mx-auto mt-52"
                        />

                        <div className="mx-auto my-2">
                          <p className="grey-text my-3">
                            You have no recorded quotes yet
                          </p>
                          <Link to="/new-shipment">
                            <p className="btn bg-green white-text text-sm py-3 px-6 w-full rounded text-center mb-52">
                              Start New Shipment
                            </p>
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading, my_quotes } = state.quote;
  return { error, loading, my_quotes };
};

export default connect(mapStateToProps, { getMyQuotes })(Quote);
