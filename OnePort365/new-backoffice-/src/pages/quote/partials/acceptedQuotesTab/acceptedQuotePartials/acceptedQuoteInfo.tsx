import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PrimaryButton from "components/buttons/PrimaryButton";
// redux
import { getSingleQuote } from "store/actions";


const AcceptedQuotesInfo = (props: any) => {
    const params = useParams();
    const { loading, single_quote } = props;
    const quote_data = single_quote['data']?.['data']?.['quote_data'];
    const quote_upload_data = single_quote['data']?.['data']?.['uploads_data'];
    console.log(quote_data)
    console.log(quote_upload_data)

    useEffect(() => {
        props.getSingleQuote(params.id);
    }, [getSingleQuote]);

    return (
        <>
            <div className="flex">
                <Aside activeTab="quote" />
                <div>
                    <TopBar title={"Accepted Quotes"} />
					<div className="container mx-14 w-full">
                    {
                        loading ? 
                        (
                            <div className="text-center my-3 ml-5 mr-5">
                                <Link to="#" className="text-success">
                                    {/* @ts-ignore */}
                                    <PrimaryButton title="Loading Accepted Quote Info" loading={loading} />
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                                    <div className="rounded overflow-hidden mt-5">
                                        <div className="flex items-center">
                                            <Link to="/quotes">
                                                <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                                            </Link>
                                            <p className="text-lg black-text font-semibold"></p>
                                            <h3 className="black-text quote_summary">Shipping ID: {quote_data[0]._id}</h3>
                                            <Link to="#" className="bg-light-green black-text-2 text-sm py-2 px-3 green-text mx-5 text-center rounded-full ml-auto">
                                                Accepted
                                            </Link>
                                        </div> 
                                    </div>
                                </div>

                                <div className="py-1 mt-4 top-divider mr-5"style={{width: '90%'}}></div>

                                
                                <>
                                    <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                                        <div className="rounded overflow-hidden mt-5">
                                            <div className="px-6 py-1 top-divider right-divider bottom-divider left-divider w-full" style={{background: '#F4F6F9'}}>
                                                <div className="rounded overflow-hidden mb-3 mt-3 lg:grid-cols-1">
                                                    <div className="flex items-center">
                                                        <div className="mb-0 mt-0 mr-10">
                                                            <label htmlFor="upload-image" className="black-text-sm cursor-pointer">
                                                                <div className="font-semibold mb-0">Quote</div>
                                                                <p className="quote_text mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque debitis possimus aspernatur modi est.</p>
                                                            </label>
                                                            {/* <p className="font-semibold">Quote</p>
                                                            <p className="quote_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto ut molestiae dolores facilis minima.</p> */}
                                                        </div>
                                                        <div className="p-4 rounded-full flex ml-auto">
                                                        <Link
                                                            onClick={() => {
                                                                window.location.href = `/view-accepted-quote/${quote_data[0]._id}`
                                                            }}
                                                            to=""
                                                            className="bg-green solid-br white-text text-sm py-2 px-5 w-full rounded"
                                                            style={{textDecoration: 'none'}}
                                                            >
                                                            <small>View</small>
                                                        </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                                        <div className="rounded overflow-hidden mt-5">
                                            <div className="px-6 py-1 top-divider right-divider bottom-divider left-divider w-full" style={{background: '#F4F6F9'}}>
                                                <div className="rounded overflow-hidden mb-3 mt-3 lg:grid-cols-1">
                                                    <div className="flex items-center">
                                                        <div className="mb-0 mt-0 mr-10">
                                                            <label htmlFor="upload-image" className="black-text-sm cursor-pointer">
                                                                <div className="font-semibold mb-0">Shipping Summary</div>
                                                                <p className="quote_text mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque debitis possimus aspernatur modi est.</p>
                                                            </label>
                                                            {/* <p className="font-semibold">Quote</p>
                                                            <p className="quote_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto ut molestiae dolores facilis minima.</p> */}
                                                        </div>
                                                        <div className="p-4 rounded-full flex ml-auto">
                                                        <Link
                                                            onClick={() => {
                                                                window.location.href = `/accepted-quote-details/${quote_data[0]._id}`
                                                            }}
                                                            to=""
                                                            // to={`/view-accepted-quote/${params._id}`}
                                                            className="bg-green solid-br white-text text-sm py-2 px-5 w-full rounded"
                                                            style={{textDecoration: 'none'}}
                                                            >
                                                            <small>View</small>
                                                        </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            
                                        </div>
                                        
                                    </div>


                                    <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                                        <div className="rounded overflow-hidden mt-5">
                                            <div className="px-6 py-1 top-divider right-divider bottom-divider left-divider w-full" style={{background: '#F4F6F9'}}>
                                                <div className="rounded overflow-hidden mb-3 mt-3 lg:grid-cols-1">
                                                    <div className="flex items-center">
                                                        <div className="mb-0 mt-0 mr-10">
                                                            <label htmlFor="upload-image" className="black-text-sm cursor-pointer">
                                                                <div className="font-semibold mb-0">Shipping Data Sheet</div>
                                                                <p className="quote_text mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque debitis possimus aspernatur modi est.</p>
                                                            </label>
                                                            {/* <p className="font-semibold">Quote</p>
                                                            <p className="quote_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto ut molestiae dolores facilis minima.</p> */}
                                                        </div>
                                                        <div className="p-4 rounded-full flex ml-auto">
                                                        <Link
                                                            onClick={() => {
                                                                window.location.href = `/shipping-data-sheet/${quote_data[0]._id}`
                                                            }}
                                                            to=""
                                                            className="bg-green solid-br white-text text-sm py-2 px-5 w-full rounded"
                                                            style={{textDecoration: 'none'}}
                                                            >
                                                            <small>View</small>
                                                        </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            
                                        </div>
                                        
                                    </div>
                                </> 
                            </>
                        )
                    }
					</div>
                </div>
            </div>

            
        </>
    );
};

// export default AcceptedQuotesInfo;

const mapStateToProps = (state: any) => {
    const { single_quote, loading } = state.quotes;
    return { single_quote, loading };
};

export default connect(mapStateToProps, { getSingleQuote })(AcceptedQuotesInfo);

