import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PrimaryButton from "components/buttons/PrimaryButton";
//icons
import LocationCard from "components/ratePartials/location";
import CargoCard from "components/ratePartials/cargo";
import ContactPersonsDetails from "components/ratePartials/contactPersonDetails";
import AdditionalDetailsCard from "components/ratePartials/additionalDetails";
import { getSingleQuote } from "store/actions";

const AcceptedQuoteDetails = (props: any) => {
    const params = useParams();
    const [openAside, SetOpenAside] = useState(false);
    const { loading, single_quote } = props;
    const quote_data = single_quote['data']?.['data']?.['quote_data'];
    const quote_upload_data = single_quote['data']?.['data']?.['uploads_data'];
    const quote_document_data = single_quote['data']?.['data']?.['document_data'];
    const datasheet_general = single_quote['data']?.['data']?.['datasheet_data']
    console.log(quote_data)
    console.log(quote_upload_data)
    console.log(datasheet_general)

    useEffect(() => {
        props.getSingleQuote(params.id);
    }, [getSingleQuote]);

    return (
        <>
            <div className="flex">
                <Aside
                    activeTab="quote"
                    openAside={openAside}
                    SetOpenAside={SetOpenAside}
                />
                <div className="dashboard-content">
                    <TopBar title={"Quote Summary"} SetOpenAside={SetOpenAside} />
                    <div className="">
                        <div className="container mx-auto w-full">
                            <>
                                <div className="lg:grid lg:grid-cols-2 lg:gap-4 mb-10">
                                    {
                                        loading ?
                                            (
                                                <div className="text-center my-3 ml-5">
                                                    <Link to="#" className="text-success">
                                                        {/* @ts-ignore */}
                                                        <PrimaryButton title="Loading Quotes" loading={loading} />
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className="quote-summary-margin">
                                                    <>
                                                        <div className="flex items-center mt-10 mb-2">
                                                            <div className="flex items-center">
                                                                <Link
                                                                    // to=""
                                                                    to="/quotes"
                                                                // onClick={() => {
                                                                //     window.location.href = `/accepted-quote-info/${params.id}`
                                                                // }}
                                                                >
                                                                    <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                                                                </Link>
                                                            </div>

                                                            <h3 className="quote-summary black-text">Quote Summary</h3>
                                                            <div className="flex items-center ml-auto">
                                                                <div className="ml-auto">
                                                                    {
                                                                        datasheet_general == null ? (
                                                                            <>
                                                                                <Link
                                                                                    // onClick={() => {
                                                                                    //     window.location.href = `/shipping-data-sheet/${quote_data[0]._id}?datasheet_id=${datasheet_general._id+"&sheet_section=company"}`
                                                                                    // }}
                                                                                    to="#"
                                                                                    className="not-allowed solid-br black-text-2 text-sm py-3 px-4 w-full rounded flex"
                                                                                    style={{ background: 'rgba(136, 136, 136, 0.15)' }}
                                                                                >
                                                                                    Shipping Datasheet
                                                                                </Link>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Link
                                                                                    onClick={() => {
                                                                                        window.location.href = `/shipping-data-sheet/${quote_data[0]._id}?datasheet_id=${datasheet_general._id + "&sheet_section=company"}`
                                                                                    }}
                                                                                    // onClick={() => {
                                                                                    //     window.location.href = `/shipping-data-sheet/${quote_data[0]._id}?datasheet_id=${datasheet_general._id}&sheet_section=company`
                                                                                    // }}
                                                                                    to="#"
                                                                                    className="bg-white solid-br black-text-2 text-sm py-3 px-4 w-full rounded flex"
                                                                                >
                                                                                    Shipping Datasheet
                                                                                </Link>
                                                                            </>
                                                                        )
                                                                    }

                                                                </div>
                                                                <div className="ml-3">
                                                                    <Link
                                                                        to={`/view-accepted-quote/${quote_data[0]._id}`}
                                                                        className="bg-green white-text-2 text-sm py-3 px-4 w-full rounded flex"
                                                                    >
                                                                        View Document
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center mobile-padding">
                                                            <p className="upload-text-2">Quote Created by: &nbsp;
                                                                {
                                                                    quote_data[0]?.['admin_creator_details'] === null || undefined ? (
                                                                        <>platform</>
                                                                    ) : (
                                                                        quote_data[0]?.['admin_creator_details']?.['firstname'] + "  " + quote_data[0]?.['admin_creator_details']?.['lastname']
                                                                    )
                                                                }
                                                            </p>
                                                        </div>

                                                        <div className="mobile-padding">
                                                            <ContactPersonsDetails single_quote={quote_data} />
                                                            <LocationCard single_quote={quote_data} />
                                                            {/* <DocumentCard  single_quote={quote_data} quote_document_data={quote_document_data} /> */}
                                                            <CargoCard single_quote={quote_data} />
                                                            <AdditionalDetailsCard single_quote={quote_data} />
                                                            {/* <ShippingLineCard /> */}
                                                            <div className="flex items-center mt-5 mb-5">
                                                                <h3 className="text-xl white-text font-semibold">Shipping ID:</h3>
                                                                <div className="ml-auto">
                                                                    <Link
                                                                        to={`/view-accepted-quote/${quote_data[0]._id}`}
                                                                        // className="bg-green py-2 px-3 rounded ml-auto text-sm white-text"
                                                                        className="bg-green white-text-2 text-sm py-3 px-4 w-full rounded flex"
                                                                    >
                                                                        View Document
                                                                    </Link>
                                                                </div>
                                                                {/* <Link 
                                                    to={`/upload-quote/${quote_data[0]._id}`}
                                                    className="bg-green py-2 px-3 rounded ml-auto text-sm white-text"
                                                >
                                                    Upload Quote
                                                </Link> */}
                                                            </div>
                                                        </div>
                                                    </>
                                                </div>
                                            )
                                    }
                                </div>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// export default AcceptedQuoteDetails


const mapStateToProps = (state: any) => {
    const { single_quote, loading } = state.quotes;
    return { single_quote, loading };
};

export default connect(mapStateToProps, { getSingleQuote })(AcceptedQuoteDetails);
