import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PageLoading from "components/partials/pageLoading";

//redux
import { getQuotesById } from "store/actions";

const QuoteSummary = (props: any) => {
  const params = useParams();

  const { quote_data, loading, getQuotesById } = props;

  const [openAside, SetOpenAside] = useState(false);

  useEffect(() => {
    getQuotesById(params.id);
  }, []);

  return (
    <div className="flex">
      <Aside
        activeTab="quote"
        openAside={openAside}
        SetOpenAside={SetOpenAside}
      />
      <div className="">
        <TopBar title={"Quote Summary"} SetOpenAside={SetOpenAside} />
        {loading ? (
          <>
            <PageLoading title={"quote summary"} />
          </>
        ) : (
          <div className="px-7 lg:px-14 lg:pt-10 container lg:w-8/12">
            <div className="flex items-center">
              <div className="flex items-center">
                <Link to="/quotes">
                  <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                </Link>
                <p className="lg:text-lg text-base black-text font-semibold">
                  Shipment ID: {params.id ? params.id.substring(0, 9) : ""}
                </p>
              </div>

              <div className="ml-auto flex items-center">
                <p className="grey-text capitalize">STATUS</p>

                {quote_data.quote_details ? (
                  <>
                    <p
                      className={`${
                        quote_data?.quote_details[0]?.quote_status ===
                        "pending_admin"
                          ? "bg-light-purple purple-text"
                          : quote_data?.quote_details[0]?.quote_status ===
                            "pending_customer"
                          ? "bg-light-yellow yellow-text"
                          : quote_data?.quote_details[0]?.quote_status ===
                            "accepted"
                          ? "bg-light-green green-text"
                          : "bg-light-red red-text"
                      } text-xs font-semibold  py-2 px-3  ml-3 text-center rounded-full capitalize`}
                    >
                      {quote_data?.quote_details[0]?.quote_status ===
                      "pending_admin"
                        ? "preparing"
                        : quote_data?.quote_details[0]?.quote_status ===
                          "pending_customer"
                        ? "pending"
                        : quote_data?.quote_details[0]?.quote_status ===
                          "accepted"
                        ? "accepted"
                        : "rejected"}
                    </p>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <hr className="solid-br mt-4 mb-10 w-full" />

            <div className="bg-grey lg:py-7 lg:px-10 p-5 rounded">
              <div className="flex items-center">
                <div className="lg:w-8/12 mr-2">
                  <p className="black-text  font-semibold">Quote</p>
                  <p className="grey-text text-xs mt-2">
                    Click the notification bar to view the shipment quote.
                  </p>
                </div>

                <Link
                  to={`/quote/${params.id}`}
                  className="ml-auto bg-green text-xs text-center white-text py-2 lg:px-4 rounded w-6/12 md:w-auto"
                >
                  View Details
                </Link>
              </div>
            </div>

            <div className="bg-grey lg:py-7 lg:px-10 p-5 my-5 rounded">
              <div className="flex items-center">
                <div className="lg:w-8/12 mr-2">
                  <p className="black-text  font-semibold">Shipment Summary</p>
                  <p className="grey-text text-xs mt-2">
                    Click to view location of your shipment and other relevant
                    shipping details.
                  </p>
                </div>

                <Link
                  to={`/shipment-summary/${params.id}`}
                  className="ml-auto bg-green text-xs text-center white-text py-2 px-4 rounded w-7/12 md:w-auto"
                >
                  View Details
                </Link>
              </div>
            </div>

            {quote_data?.quote_details &&
            quote_data?.quote_details[0]?.quote_status === "accepted" ? (
              <>
                {" "}
                <div className="bg-grey lg:py-7 lg:px-10 p-5 rounded">
                  <div className="flex items-center">
                    <div className=" lg:w-8/12 mr-2">
                      <p className="black-text  font-semibold">
                        Shipping Datasheet
                      </p>
                      <p className="grey-text text-xs mt-2">
                        Click to enter your cargo details and upload relevant
                        shipping documents.
                      </p>
                    </div>

                    <Link
                      to={`/shipment-datasheet/${params.id}${
                        quote_data?.datasheet_data
                          ? "?datasheet=" + quote_data?.datasheet_data?._id
                          : ""
                      }`}
                      className="ml-auto bg-green text-xs text-center white-text py-2 px-4 rounded w-7/12 md:w-auto"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading, quote_data } = state.quote;
  return { error, loading, quote_data };
};

export default connect(mapStateToProps, {
  getQuotesById,
})(QuoteSummary);
