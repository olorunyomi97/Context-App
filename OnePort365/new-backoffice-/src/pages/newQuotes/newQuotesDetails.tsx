import React from 'react';
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PrimaryButton from "components/buttons/PrimaryButton";
import { getNewSingleQuote } from 'store/actions';

const NewQuotesDetails = (props: any) => {
    const params = useParams();
    const { loading, new_single_quote } = props;
    console.log(new_single_quote)
    const [openAside, SetOpenAside] = useState(false);

    useEffect(() => {
        props.getNewSingleQuote(params.id);
    }, [getNewSingleQuote]);


    return (
        <>
            <div className="flex">
                <Aside
                    activeTab="quotes"
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
                                                    {/* {
                                        new_single_quote?.data?.data.quote_data.map((data) => {
                                            return ( */}
                                                    <>
                                                        <div className="flex items-center mt-10 mb-2 mobile-padding">
                                                            <div className="flex items-center">
                                                                <Link to="/new-quotes">
                                                                    <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                                                                </Link>
                                                            </div>
                                                            <h3 className="text-xl black-text font-semibold">Quote Summary</h3>
                                                            {/*                                                         
                                                        {
                                                            quote_data[0].quote_status == 'pending_admin' ? ( */}
                                                            <>
                                                                <div className="ml-auto">
                                                                    <Link
                                                                        to=''
                                                                        // to={`/upload-quote/${quote_data[0]._id}`}
                                                                        className="bg-green white-text-2 text-sm py-3 px-4 w-full rounded flex"
                                                                    >
                                                                        Upload Document
                                                                    </Link>
                                                                </div>
                                                            </>
                                                            {/* ) : ( */}
                                                            <>
                                                                <div className="ml-auto">
                                                                    <Link
                                                                        to=''
                                                                        // to={`/upload-quote/${quote_data[0]._id}`}
                                                                        className="bg-green white-text-2 text-sm py-3 px-4 w-full rounded flex"
                                                                    >
                                                                        View / Reupload Document
                                                                    </Link>
                                                                </div>
                                                            </>
                                                            {/* )
                                                        } */}
                                                        </div>
                                                        <div className="flex items-center mobile-padding">
                                                            <p className="upload-text-2">Quote Created by: &nbsp;
                                                                {/* {
                                                                quote_data[0]?.['admin_creator_details'] === null || undefined ? (
                                                                    <>platform</>
                                                                ) : (
                                                                    quote_data[0]?.['admin_creator_details']?.['firstname']   + "  " +  quote_data[0]?.['admin_creator_details']?.['lastname']
                                                                )
                                                            } */}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center mobile-padding">
                                                            <p className="upload-text-2">Quote Created on: &nbsp;
                                                                {/* <Moment format="DD-MM-YYYY  hh:mmA"> {quote_data[0].createdAt} </Moment> */}
                                                                {/* {moment(quote_data[0].createdAt).format("LL || h:mma")} */}
                                                            </p>
                                                        </div>
                                                        <div className="mobile-padding">
                                                            {/* <ContactPersonsDetails new_single_quote={quote_data}/>
                                                        <LocationCard new_single_quote={quote_data}  />
                                                        <CargoCard new_single_quote={quote_data}/>
                                                        <AdditionalDetailsCard new_single_quote={quote_data}/> */}

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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// export default NewQuotesDetails;

const mapStateToProps = (state: any) => {
    const { new_single_quote, loading } = state.newQuotes;
    return { new_single_quote, loading };
};

export default connect(mapStateToProps, { getNewSingleQuote })(NewQuotesDetails);

