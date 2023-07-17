import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import CustomDnD from "components/customDnD/CustomDnD";
// icons
import downloadIcon from "assets/icons/download.svg";
import requestIcon from "assets/icons/card.svg";
import { getSingleQuote } from "store/actions";
import PrimaryButton from "components/buttons/PrimaryButton";
import { attachQuote } from "store/actions";
import CustomDownloadButton from "components/customDownloadbuttom/customDownloadbutton";
import Iframe from "react-iframe";
import { useSelector } from "react-redux";

const UploadQuote = (props: any) => {
    let admin_data = useSelector((state: any) => state.auth.admin_data);
    // @ts-ignore
    admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));
	const pricing_manager_email = admin_data?.email
	console.log(pricing_manager_email);

    const [openAside, SetOpenAside] = useState(false);
    const params = useParams();
    const { loading, single_quote } = props;
    const [quoteFile, setQuoteFile] = useState("");
    const [quoteFileerror, setQuoteFileerror] = useState(false);

    // const [hasQuote, setHasQuote] = useState(true);
    // const [quotedoc, setQuotedoc] = useState("");
    // const error = "";
    const { handleSubmit, control, formState: { errors }} = useForm();
    
    console.log(params);
    console.log(single_quote);
    console.log(single_quote['data']?.['data']);
    console.log(single_quote['data']?.['data']?.['quote_data']);
    const quote_data = single_quote['data']?.['data']?.['quote_data'];
    const quote_upload_data = single_quote['data']?.['data']?.['uploads_data'];
    console.log(quote_data)
    console.log(quote_upload_data)
    console.log(quote_upload_data?.slice(-1))

    useEffect(() => {
        props.getSingleQuote(params.id);
    }, [getSingleQuote]);

    const { attachQuote  } = props;
    const urlParams = useParams();
    // console.log(urlParams.id)

    const onSubmit = () => { 
        const formData = new FormData();
        formData.append("quote_file" , quoteFile);
        
        const data = {
            data: formData,
            id:urlParams.id,
            
        };
        
        console.log(data);
        attachQuote(data, setQuoteFile(''));
    }

    // const onSubmit = () => { 
    //     if (hasQuote && !quotedoc) {
    //         setQuoteFileerror(true);
    //     } else {
    //         setQuoteFileerror(false);
    //     }
    //     if (hasQuote && quotedoc) { 
    //         const formData = new FormData();
    //         formData.append("quote_file" , quoteFile);
            
    //         const data = {
    //             data: formData,
    //             id:urlParams.id,
                
    //         };
            
    //         console.log(data);
    //         attachQuote(data, setQuoteFile(''));
    //     }

        
    // };
   

    return (
        <>
            <div className="flex">
                <Aside 
					activeTab="quote" 
					openAside={openAside}
					SetOpenAside={SetOpenAside}
				/>
                <div className="">
                    <TopBar title={"Quote Summary"} SetOpenAside={SetOpenAside}/>
                    <div className="dashboard-content mobile-padding">
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
                                            {/* <Link to="/quotes"> */}
                                            <Link 
                                                onClick={() => {
                                                    window.location.href = `/quote-details/${params.id}`
                                                }}
                                                to=""
                                            >
                                                <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                                            </Link>
                                        </div>
                                        <p className="text-lg black-text font-semibold">Shipping ID: {quote_data[0]._id} </p>
                                        {
                                            quote_upload_data.length == 0 ? (
                                                <>
                                                    
                                                </>
                                            ) : (
                                                <>
                                                    {/* <div className="flex items-center ml-auto">
                                                        <div className="solid-br py-2 px-4 rounded cursor-pointer flex ">
                                                            <p className="text-sm black-text mr-2 font-semibold"> Download</p>
                                                            <img src={downloadIcon} alt="" width={20} height={20} />
                                                        </div>
                                                    </div> */}
                                                </>
                                            )
                                        }
                                    </div>
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
                                                            <div className="mt-7">
                                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                                <CustomDnD 
                                                                    handleChange={setQuoteFile} 
                                                                    file={quoteFile} 
                                                                    error={quoteFileerror} 
                                                                    name={"Quote Document"} 
                                                                    pdfOnly={false} 
                                                                    onClick={onSubmit} 
                                                                />
                                                                    <div className="flex">
                                                                        <div className="mt-5 ml-auto">
                                                                            {/* @ts-ignore */}
                                                                            <PrimaryButton loading={loading} title="Attach Quote" style={{ paddingRight: 25, paddingLeft: 25 }} />
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>

                                                            {/* {
                                                                pricing_manager_email === 'georgeb@oneport365.com' ? (
                                                                    <>
                                                                        <div className="mt-7">
                                                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                                            <CustomDnD 
                                                                                handleChange={setQuoteFile} 
                                                                                file={quoteFile} 
                                                                                error={quoteFileerror} 
                                                                                name={"Quote Document"} 
                                                                                pdfOnly={false} 
                                                                                onClick={onSubmit} 
                                                                            />
                                                                                <div className="flex">
                                                                                    <div className="mt-5 ml-auto">
                                                                                        @ts-ignore
                                                                                        <PrimaryButton loading={loading} title="Attach Quote" style={{ paddingRight: 25, paddingLeft: 25 }} />
                                                                                    </div>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <p className="grey-text my-3 text-center"> Only the Commercial Department can attach a quote</p>
                                                                )
                                                            } */}
                                                            
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div>
                                                                <Iframe
                                                                    width="100%"
                                                                    height="500px"
                                                                    url={quote_upload_data?.slice(-1)[0].quote_location}
                                                                    allowFullScreen
                                                                    // onClick={quote_upload_data[0].quote_location}
                                                                />
                                                                <div>
                                                                    <div className="mt-5 bg-grey rounded p-4"></div>
                                                                    <div className="mt-5">
                                                                    </div>
                                                                    <hr className="solid-br my-5" />
                                                                </div>
                                                                <div>
                                                                    <p className="grey-text my-3 text-center">Reupload Document for this Quote if Necessary</p>
                                                                    <div className="mt-7">
                                                                        <form onSubmit={handleSubmit(onSubmit)}>
                                                                            <CustomDnD handleChange={setQuoteFile} file={quoteFile} error={quoteFileerror} name={"Quote Document"} pdfOnly={false} onClick={onSubmit} />
                                                                            <div className="flex">
                                                                                <div className="mt-5 ml-auto">
                                                                                    {/* @ts-ignore */}
                                                                                    <PrimaryButton loading={loading} title="Reupload Document" style={{ paddingRight: 25, paddingLeft: 25 }} />
                                                                                </div>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                                {/* {
                                                                    pricing_manager_email == 'georgeb@oneport365.com'  ?
                                                                    (
                                                                        <>
                                                                            <div>
                                                                                <p className="grey-text my-3 text-center">Reupload Document for this Quote if Necessary</p>
                                                                                <div className="mt-7">
                                                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                                                        <CustomDnD handleChange={setQuoteFile} file={quoteFile} error={quoteFileerror} name={"Quote Document"} pdfOnly={false} onClick={onSubmit} />
                                                                                        <div className="flex">
                                                                                            <div className="mt-5 ml-auto">
                                                                                                @ts-ignore
                                                                                                <PrimaryButton loading={loading} title="Reupload Document" style={{ paddingRight: 25, paddingLeft: 25 }} />
                                                                                            </div>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <p className="grey-text my-3 text-center"> Only the Commercial Department can re-attach a quote</p>
                                                                    )
                                                                } */}
                                                               
                                                            </div>
                                                        </>
                                                    )
                                                }                
                                            </>
                                        )
                                    }
                                    
                                    
                                        {/* <div className="mt-7">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <CustomDnD handleChange={setQuoteFile} file={quoteFile} error={quoteFileerror} name={"Quote Document"} pdfOnly={false} onClick={onSubmit} />
                                                <div className="flex">
                                                    <div className="mt-5 ml-auto">
                                                        <PrimaryButton loading={loading} title="Attach Quote" style={{ paddingRight: 25, paddingLeft: 25 }} />
                                                    </div>
                                                </div>
                                            </form>
                                        </div> */}
                                </div> 
                            </>
                        )
                    }
                    </div>   
                </div>
            </div>
        </>
    );
};

// export default UploadQuote;

const mapStateToProps = (state: any) => {
    const { single_quote, loading, attachQuote } = state.quotes;
    return { single_quote, loading, attachQuote };
};

export default connect(mapStateToProps, { getSingleQuote, attachQuote })(UploadQuote);

