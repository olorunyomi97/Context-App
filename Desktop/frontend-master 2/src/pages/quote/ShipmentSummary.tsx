import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PageLoading from "components/partials/pageLoading";

//redux
import { getQuotesById } from "store/actions";

const ShipmentSummary = (props: any) => {
  const params = useParams();

  const { quote_data, loading, getQuotesById } = props;

  const [openAside, SetOpenAside] = useState(false);

  useEffect(() => {
    getQuotesById(params.id);
  }, []);

  return (
    <div className="lg:flex">
      <Aside
        activeTab="quote"
        openAside={openAside}
        SetOpenAside={SetOpenAside}
      />

      <div className="">
        <TopBar title={"Shipping Summary"} SetOpenAside={SetOpenAside} />

        {loading ||
        Object.entries(quote_data).length <= 0 ||
        !quote_data.quote_details.length ? (
          <>
            <PageLoading title={"quote summary"} />
          </>
        ) : (
          <>
            <div className="dashboard-content-scroll">
              <div className="px-7 lg:px-14 lg:pt-10 container lg:w-7/12">
                <div className="md:flex items-center">
                  <div className="flex items-center">
                    <Link to={`/quote-summary/${params.id}`}>
                      <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                    </Link>
                    <p className="text-lg black-text font-semibold">
                      Shipment ID: {params.id ? params.id.substring(0, 9) : ""}
                    </p>
                  </div>
                  <div className=" ml-auto">
                    <Link
                      to={`/quote/${params.id}`}
                      className="ml-auto solid-br text-xs black-text py-2 px-4 rounded mr-2"
                    >
                      View Quote
                    </Link>

                    {quote_data?.datasheet_data?._id ? (
                      <Link
                        to={`/shipment-datasheet/${params.id}?datasheet=${quote_data?.datasheet_data?._id}`}
                        className="ml-auto bg-green text-xs white-text py-2 px-4 rounded"
                      >
                        View Datasheet
                      </Link>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div className="solid-br rounded-lg mt-10">
                  <div className="p-3">
                    <p className="black-text text-sm font-semibold">Location</p>
                  </div>
                  <hr className="top-br w-full" />
                  <div className="p-3">
                    <div className="flex items-center">
                      <p className="text-xs black-text ">Type of Shipment</p>

                      <p className="text-xs black-text  ml-auto">
                        {quote_data?.quote_details[0]?.shipping_type}
                      </p>
                    </div>

                    <div className="flex items-center my-4">
                      <p className="text-xs black-text mr-3">Origin</p>

                      <p className="text-xs black-text ml-auto">
                        {" "}
                        {quote_data?.quote_details[0]?.pickup_location
                          ? quote_data?.quote_details[0]?.pickup_location
                          : quote_data?.quote_details[0]?.origin_port_country}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p className="text-xs black-text mr-4">Destination</p>

                      <p className="text-xs black-text  ml-auto">
                        {quote_data?.quote_details[0]?.shipping_type ===
                        "export"
                          ? quote_data?.quote_details[0]
                              ?.destination_port_province
                          : quote_data?.quote_details[0]?.delivery_location}
                        ,{" "}
                        {quote_data?.quote_details[0]?.destination_port_country}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="solid-br rounded-lg mt-7">
                  <div className="p-3">
                    <p className="black-text text-sm font-semibold">Document</p>
                  </div>
                  <hr className="top-br w-full" />
                  <div className="p-3">
                    {quote_data?.quote_details[0]?.shipping_type ===
                    "export" ? (
                      <>
                        <div className="flex items-center">
                          <p className="text-xs black-text ">NXP Form</p>

                          <p className="text-xs black-text  ml-auto">
                            {" "}
                            {quote_data?.quote_documents.length
                              ? quote_data?.quote_documents[0]
                                  .original_file_name
                              : "n/a"}
                          </p>
                        </div>

                        <div className="flex items-center mt-4">
                          <p className="text-xs black-text ">PFI Form</p>

                          <p className="text-xs black-text  ml-auto">
                            {" "}
                            {quote_data?.quote_documents.length
                              ? quote_data?.quote_documents[1]
                                  .original_file_name
                              : ""}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <div className="flex items-center mt-4">
                          <p className="text-xs black-text ">PAR Form</p>

                          <p className="text-xs black-text  ml-auto">
                            {quote_data?.quote_documents.length
                              ? quote_data?.quote_documents[0]
                                  .original_file_name
                              : "n/a"}
                          </p>
                        </div>{" "}
                      </>
                    )}
                  </div>
                </div>

                <div className="solid-br rounded-lg mt-7">
                  <div className="p-3">
                    <p className="black-text text-sm font-semibold">
                      Cargo Details
                    </p>
                  </div>
                  <hr className="top-br w-full" />
                  <div className="p-3">
                    <div className="flex items-center">
                      <p className="text-xs black-text ">No of container</p>

                      <p className="text-xs black-text  ml-auto">
                        {quote_data?.quote_details[0]?.container_count}
                      </p>
                    </div>

                    <div className="flex items-center my-4">
                      <p className="text-xs black-text ">Size of container</p>

                      <p className="text-xs black-text  ml-auto">
                        {quote_data?.quote_details[0]?.container_size} ft
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p className="text-xs black-text">Goods type</p>

                      <p className="text-xs black-text  ml-auto">
                        {quote_data?.quote_details[0]?.goods_type}
                      </p>
                    </div>

                    <div className="flex items-center my-4">
                      <p className="text-xs black-text">Total value of goods</p>

                      <p className="text-xs black-text  ml-auto">
                        ₦{" "}
                        {new Intl.NumberFormat("en-US").format(
                          quote_data?.quote_details[0]?.goods_value
                        )}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p className="text-xs black-text mr-3">
                        Cargo description
                      </p>

                      <p className="text-xs black-text  ml-auto">
                        {quote_data?.quote_details[0]?.cargo_description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="solid-br rounded-lg my-7">
                  <div className="p-3">
                    <p className="black-text text-sm font-semibold">
                      Additional Services
                    </p>
                  </div>
                  <hr className="top-br w-full" />
                  <div className="p-3">
                    <div className="flex items-center">
                      <p className="text-xs black-text ">
                        Do you need warehousing?
                      </p>

                      <p className="text-xs black-text  ml-auto">
                        {quote_data?.quote_details[0]?.warehousing
                          ? "yes"
                          : "no"}
                      </p>
                    </div>

                    <div className="flex items-center my-4">
                      <p className="text-xs black-text ">Insurance option</p>

                      <p className="text-xs black-text  ml-auto">
                        {quote_data?.quote_details[0]?.insurance ? "yes" : "no"}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p className="text-xs black-text">Duration</p>

                      <p className="text-xs black-text  ml-auto">
                        {quote_data?.quote_details[0]?.warehousing} week(s)
                      </p>
                    </div>

                    <div className="flex items-center mt-4">
                      <p className="text-xs black-text">Pick-up date</p>

                      <p className="text-xs black-text  ml-auto">
                        {moment(
                          quote_data?.quote_details[0]?.shipment_pickup_date
                        ).format("LL")}
                      </p>
                    </div>
                  </div>
                </div>
                {/* 
                <div className="solid-br rounded-lg my-7">
                  <div className="p-3">
                    <p className="black-text text-sm font-semibold">
                      Ocean Freight
                    </p>
                  </div>
                  <hr className="top-br w-full" />
                  <div className="p-3">
                    <div className="flex items-center">
                      <p className="text-xs black-text ">Type of Shipment</p>

                      <p className="text-xs black-text  ml-auto">test</p>
                    </div>

                    <div className="flex items-center my-4">
                      <p className="text-xs black-text ">Origin</p>

                      <p className="text-xs black-text  ml-auto">test</p>
                    </div>

                    <div className="flex items-center">
                      <p className="text-xs black-text">Destination</p>

                      <p className="text-xs black-text  ml-auto">test</p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </>
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
})(ShipmentSummary);
