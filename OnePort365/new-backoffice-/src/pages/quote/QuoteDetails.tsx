import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PrimaryButton from "components/buttons/PrimaryButton";
import LocationCard from "components/ratePartials/location";
import CargoCard from "components/ratePartials/cargo";
import AdditionalDetailsCard from "components/ratePartials/additionalDetails";
import ContactPersonsDetails from "components/ratePartials/contactPersonDetails";
import Moment from 'react-moment';
import moment from "moment";

import { getSingleQuote } from "store/actions";

const QuoteDetails = (props: any) => {
    const params = useParams();
    const { loading, single_quote } = props;
    const [openAside, SetOpenAside] = useState(false);
    // console.log(params);
    // console.log(single_quote['data']?.['data']);
    // console.log(single_quote['data']?.['data']?.['quote_data']);
    const quote_data = single_quote['data']?.['data']?.['quote_data'];
    const quote_upload_data = single_quote['data']?.['data']?.['uploads_data'];
    const quote_document_data = single_quote['data']?.['data']?.['document_data'];
    // console.log(quote_data)
    // console.log(quote_upload_data)
    // console.log(quote_document_data)

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
                    <TopBar title={"Quote Summary"} SetOpenAside={SetOpenAside}/>
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
                                    {/* {
                                        single_quote?.data?.data.quote_data.map((data) => {
                                            return ( */}
                                                <>
                                                    <div className="flex items-center mt-10 mb-2 mobile-padding">
                                                        <div className="flex items-center">
                                                            <Link to="/quotes">
                                                                <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                                                            </Link>
                                                        </div>
                                                        <h3 className="text-xl black-text font-semibold">Quote Summary</h3>
                                                        
                                                        {
                                                            quote_data[0].quote_status == 'pending_admin' ? (
                                                                <>
                                                                    <div className="ml-auto">
                                                                        <Link 
                                                                            to={`/upload-quote/${quote_data[0]._id}`}
                                                                            className="bg-green white-text-2 text-sm py-3 px-4 w-full rounded flex" 
                                                                        >
                                                                            Upload Document
                                                                        </Link>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className="ml-auto">
                                                                        <Link 
                                                                            to={`/upload-quote/${quote_data[0]._id}`}
                                                                            className="bg-green white-text-2 text-sm py-3 px-4 w-full rounded flex" 
                                                                        >
                                                                            View / Reupload Document
                                                                        </Link>
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="flex items-center mobile-padding">
                                                        <p className="upload-text-2">Quote Created by: &nbsp;
                                                            {
                                                                quote_data[0]?.['admin_creator_details'] === null || undefined ? (
                                                                    <>platform</>
                                                                ) : (
                                                                    quote_data[0]?.['admin_creator_details']?.['firstname']   + "  " +  quote_data[0]?.['admin_creator_details']?.['lastname']
                                                                )
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center mobile-padding">
                                                        <p className="upload-text-2">Quote Created on: &nbsp;
                                                           {/* <Moment format="DD-MM-YYYY  hh:mmA"> {quote_data[0].createdAt} </Moment> */}
                                                           {moment(quote_data[0].createdAt).format("LL || h:mma")}
                                                        </p>
                                                    </div>
                                                    <div className="mobile-padding">
                                                        <ContactPersonsDetails single_quote={quote_data}/>
                                                        <LocationCard single_quote={quote_data}  />
                                                        {/* <DocumentCard  single_quote={quote_data} quote_document_data={quote_document_data}/> */}
                                                        <CargoCard single_quote={quote_data}/>
                                                        <AdditionalDetailsCard single_quote={quote_data}/>
                                                        {/* <ShippingLineCard /> */}
                                                        <div className="flex items-center mt-5 mb-5">
                                                            <h3 className="text-xl white-text font-semibold">Shipping ID:</h3>
                                                            {
                                                            quote_data[0].quote_status == 'pending_admin' ? (
                                                                <>
                                                                    <div className="ml-auto">
                                                                        <Link 
                                                                            to={`/upload-quote/${quote_data[0]._id}`}
                                                                            className="bg-green white-text-2 text-sm py-3 px-4 w-full rounded flex" 
                                                                        >
                                                                            Upload Document
                                                                        </Link>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className="ml-auto">
                                                                        <Link 
                                                                            to={`/upload-quote/${quote_data[0]._id}`}
                                                                            className="bg-green white-text-2 text-sm py-3 px-4 w-full rounded flex" 
                                                                        >
                                                                            View / Reupload Document
                                                                        </Link>
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                        </div>
                                                    </div>
                                                </>
                                            {/* )
                                        }
                                    )} */}
                                        
                                        
                                    </div>
                                 )
                                }
                            </div>
                            </>
                       
                        
                       
                        {/* ) : ( */}
                        {/* <>
                            <div className="flex flex-col item-center justify-center solid-br rounded" style={{ minHeight: 500 }}>
                                <img src={documentIcon} alt="" width={113} height={113} className="mx-auto mt-52" />

                                <div className="mx-auto my-2">
                                    <p className="grey-text my-3">You have no recorded documents yet</p>
                                    <Link to="/shipment-creation-for-customer">
                                        <p className="btn bg-green white-text text-sm py-3 px-6 w-full rounded text-center mb-52">Start New Shipment</p>
                                    </Link>
                                </div>
                            </div>
                        </> */}
                        {/* )} */}
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// export default Rates

const mapStateToProps = (state: any) => {
    const { single_quote, loading } = state.quotes;
    return { single_quote, loading };
};

export default connect(mapStateToProps, { getSingleQuote })(QuoteDetails);
