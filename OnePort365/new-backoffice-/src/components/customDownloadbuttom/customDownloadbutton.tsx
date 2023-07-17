import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleQuote } from "store/actions";
import { connect } from "react-redux";
// icons
import downloadIcon from "assets/icons/download.svg";
import PrimaryButton from "components/buttons/PrimaryButton";

const CustomDownloadButton = (props: any) => {
    const params = useParams();
    const { loading, single_quote } = props;
    // console.log(single_quote);
    const url = single_quote['data']?.['data']?.['uploads_data'];
    // console.log(url[0].quote_location);

    useEffect(() => {
        props.getSingleQuote(params.id);
    }, [getSingleQuote]);

    return (
        <>
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
                            <Link to={url} target="_blank" className="ml-auto" download>
                                <div className="solid-br py-2 px-4  rounded flex items-center cursor-pointer">
                                    <p className="text-sm black-text mr-2 font-semibold desktop-only">Download</p>
                                    <img src={downloadIcon} alt="" width={20} height={20} />
                                </div>
                            </Link>
                        </>
                        
                    
                )
            }
        </>
    );
};

// export default CustomDownloadButton;

const mapStateToProps = (state: any) => {
    const { single_quote, loading } = state.quotes;
    return { single_quote, loading };
};

export default connect(mapStateToProps, { getSingleQuote })(CustomDownloadButton);

