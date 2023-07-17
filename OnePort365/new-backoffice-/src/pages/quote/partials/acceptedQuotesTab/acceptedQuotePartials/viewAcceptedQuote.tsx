import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import { getSingleQuote } from "store/actions";
import PrimaryButton from "components/buttons/PrimaryButton";
import { attachQuote } from "store/actions";
import Iframe from "react-iframe";

 const ViewAcceptedQuote = (props: any) => {
    const params = useParams();
    const { loading, single_quote } = props;
    
    // console.log(params);
    console.log(single_quote);
    console.log(single_quote['data']?.['data']);
    console.log(single_quote['data']?.['data']?.['quote_data']);
    const quote_data = single_quote['data']?.['data']?.['quote_data'];
    const quote_upload_data = single_quote['data']?.['data']?.['uploads_data'];
    console.log(quote_data)
    console.log(quote_upload_data)

    useEffect(() => {
        props.getSingleQuote(params.id);
    }, [getSingleQuote]);

    const urlParams = useParams();
    console.log(urlParams.id)

    return (
        <>
            <div className="flex">
            <Aside activeTab="quote" />
                <div className="">
                    <TopBar title={"Quotes"} />
                    <div className="dashboard-content">
                    {
                        loading ? 
                        (
                            <div className="text-center my-3">
                                <Link to="#" className="text-success">
                                    {/* @ts-ignore */}
                                    <PrimaryButton title="Loading" loading={loading} />
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="lg:px-14 lg:pt-10 container mx-auto  w-full">
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            <Link 
                                                to="#"
                                                onClick={() => {
                                                    window.location.href = `/accepted-quote-details/${params.id}`
                                                }}
                                                // onClick={() => {
                                                //     window.location.href = `/accepted-quote-info/${params.id}`
                                                // }}
                                            >
                                                <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                                            </Link>
                                        </div>
                                        <p className="text-lg black-text font-semibold">Shipping ID: {quote_data[0]._id} </p>
                                    </div>
                                    <>
                                        <div>
                                            <div className="mt-5 bg-grey rounded p-4"></div>
                                            <div className="mt-5">
                                            </div>
                                            <hr className="solid-br my-5" />
                                        </div>

                                        {
                                            quote_upload_data.length == 0 ? 
                                            (
                                                <>
                                                    <p className="grey-text my-3 text-center">No Document Attached to this Quote Yet. Attach Below</p>
                                                    
                                                </>
                                            ) : (
                                                <>
                                                    <div>
                                                        <Iframe
                                                            width="100%"
                                                            height="500px"
                                                            url={quote_upload_data[0].quote_location}
                                                            allowFullScreen
                                                            // onClick={quote_upload_data[0].quote_location}
                                                        />
                                                        <div>
                                                            <div className="mt-5 bg-grey rounded p-4"></div>
                                                            <div className="mt-5">
                                                            </div>
                                                            <hr className="solid-br my-5" />
                                                        </div>
                                                        
                                                    
                                                    </div>
                                                </>
                                            )
                                        }                
                                    </>
                                </div> 
                            </>
                        )
                    }
                    </div>
                </div>
            </div>
        </>
    )
}

// export default ViewAcceptedQuote;

const mapStateToProps = (state: any) => {
    const { single_quote, loading, attachQuote } = state.quotes;
    return { single_quote, loading, attachQuote };
};

export default connect(mapStateToProps, { getSingleQuote, attachQuote })(ViewAcceptedQuote);

