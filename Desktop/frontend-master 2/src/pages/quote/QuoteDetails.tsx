import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import TermsModal from "components/terms/TermsModal";
import CustomPDFRenderer from "components/pdf/CustomPDFRenderer";
import CustomDownloadButton from "components/pdf/CustomDownloadButton";
import OutlineButton from "components/buttons/OutlineButton";
import PageLoading from "components/partials/pageLoading";

//redux
import { getQuotesById, acceptQuote, requestFollowUp } from "store/actions";

const QuoteDetails = (props: any) => {
  const params = useParams();

  const {
    quote_data,
    loading,
    accepting_quote,
    requesting_follow_up,
    getQuotesById,
    acceptQuote,
    requestFollowUp,
  } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [openAside, SetOpenAside] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getQuotesById(params.id);
  }, []);

  const onAccept = () => {
    const data = {
      id: params.id,
      data: {
        quote_id: quote_data.quote_uploads[0]._id,
      },
    };
    acceptQuote(data, closeModal);
  };

  const onRequestFollowUp = () => {
    const data = {
      id: params.id,
      data: {
        quote_id: quote_data.quote_uploads[0]._id,
      },
    };

    requestFollowUp(data, closeModal);
  };

  return (
    <>
      <div className="flex">
        <Aside
          activeTab="quote"
          openAside={openAside}
          SetOpenAside={SetOpenAside}
        />

        <div className="">
          <TopBar title={"Quotes"} SetOpenAside={SetOpenAside} />

          {loading ? (
            <>
              <PageLoading title={"quote details"} />
            </>
          ) : (
            <>
              <div className="dashboard-content-scroll">
                <div className="px-7 lg:px-14 lg:pt-10 container mx-auto w-full ">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <Link to={`/quote-summary/${params.id}`}>
                        <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                      </Link>
                      <p className="text-lg black-text font-semibold">
                        Shipment ID:{" "}
                        {params.id ? params.id.substring(0, 9) : ""}
                      </p>
                    </div>

                    {quote_data?.quote_uploads &&
                    quote_data.quote_uploads.length ? (
                      <CustomDownloadButton
                        url={quote_data.quote_uploads[0].quote_location}
                      />
                    ) : (
                      <> </>
                    )}
                  </div>

                  {quote_data?.quote_uploads &&
                  quote_data.quote_uploads.length ? (
                    <>
                      <CustomPDFRenderer
                        url={quote_data.quote_uploads[0].quote_location}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {quote_data?.quote_uploads &&
                  quote_data.quote_uploads.length ? (
                    <> </>
                  ) : (
                    <>
                      <div className="mt-5 bg-light-red rounded p-4">
                        <p className="red-text text-sm font-bold">
                          Please note
                        </p>
                        <p className="black-text text-sm mt-3 font-medium">
                          <>
                            {/* Origin clearance charge covers: Customs clearance;
                          THC, Documentation charges and Shipping origin charges
                          Upon receipt, acceptance of quote is expected within
                          two working days. */}
                          </>

                          <>Your quote is awaiting admin approval.</>
                        </p>
                      </div>
                    </>
                  )}

                  <hr className="solid-br my-10" />
                  {quote_data?.quote_details &&
                  quote_data?.quote_details.length &&
                  quote_data?.quote_details[0].quote_status !==
                    "pending_customer" ? (
                    <></>
                  ) : (
                    <>
                      {" "}
                      <div className="flex mb-5">
                        <div
                          className="solid-br py-2 px-7 bg-green rounded ml-auto cursor-pointer flex items-center"
                          onClick={() => setModalOpen(true)}
                        >
                          <p className="text-sm white-text mr-2 font-semibold">
                            Accept
                          </p>
                        </div>

                        {/* <div className="solid-br py-2 px-4 rounded ml-4 cursor-pointer">
                    <p className="text-sm black-text mr-2 font-semibold">
                      Contact us
                    </p>
                  </div> */}
                        <div className="ml-4">
                          {/* @ts-ignore  */}
                          <OutlineButton
                            loading={requesting_follow_up}
                            disabled={requesting_follow_up || accepting_quote}
                            title={"Contact us"}
                            onClick={() => onRequestFollowUp()}
                            style={{ width: "100px" }}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <TermsModal
                    modalIsOpen={modalOpen}
                    closeModal={closeModal}
                    loading={{ accepting_quote, requesting_follow_up }}
                    onAccept={onAccept}
                    onContact={onRequestFollowUp}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading, accepting_quote, requesting_follow_up, quote_data } =
    state.quote;
  return { error, loading, accepting_quote, requesting_follow_up, quote_data };
};

export default connect(mapStateToProps, {
  getQuotesById,
  acceptQuote,
  requestFollowUp,
})(QuoteDetails);
