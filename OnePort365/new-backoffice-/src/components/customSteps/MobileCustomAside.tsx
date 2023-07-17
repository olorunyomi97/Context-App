import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import PrimaryButton from "components/buttons/PrimaryButton";
import SlidingPane from "react-sliding-pane";
import { getDatasheetGeneral } from "store/actions";

// function MobileCustomStepAside(props: { items: object[], step: number, setStep: any }) {
const MobileCustomStepAside = (props:any) => {
    const { items, step, setStep, datasheetAside, SetDatasheetAside } = props;
    const { datasheet_nav, loading } = props;
    console.log(datasheet_nav['data']?.['data']?.['datasheet_general'])
    console.log(datasheet_nav)
    const datasheet_general = datasheet_nav['data']?.['data']?.['datasheet_general']

    const params = useParams();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const datasheet_id = urlParams.get("datasheet_id");
    const sheet_section = urlParams.get("sheet_section")
    console.log(sheet_section)
    console.log(datasheet_nav['data']?.['data']?.['datasheet_general'].company)
    useEffect(() => {
        const data = {
            id: params.id,
            datasheet_id: datasheet_id,
            sheet_section: sheet_section
        }
        props.getDatasheetGeneral(data)
    }, [getDatasheetGeneral])


    return (
        <>
            {loading ? (
                    <div className="text-center my-3 ml-5">
                        <Link to="#" className="text-success">
                            {/* @ts-ignore */}
                            {/* <PrimaryButton title="Loading Datasheet Navigation" loading={loading} /> */}
                        </Link>
                    </div>
                ) : (
                    <div
                        className="pl-14 pr-7 pt-5 lg:py-16 right-divider dashboard-content-scroll desktop-only"
                        style={{
                            boxShadow: "0 0px 20px -15px rgba(0, 0, 0, 0.3)",
                            minHeight: "90vh",
                        }}
                    >
                        {datasheetAside ? (
                            <>
                                <SlidingPane
                                className="custom-slider"
                                overlayClassName="some-custom-overlay-class"
                                isOpen={datasheetAside}
                                from="bottom"
                                hideHeader={true}
                                width="70%"
                                shouldCloseOnEsc={true}
                                onRequestClose={() => {
                                // triggered on "<" on left top click or on outside click
                                SetDatasheetAside(false);
                                }}
                            >
                                <div className="">
                                    <div className="flex">
                                        <i
                                        className="ion-ios-close py-1 px-4 bg-grey text-3xl rounded-full black-text cursor-pointer ml-auto"
                                        onClick={() => SetDatasheetAside(false)}
                                        ></i>
                                    </div>
                                    <ul>
                                        <div className="items-center cursor-pointer">
                                            <ul className='mb-3'>
                                                <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'company' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                                    {
                                                        datasheet_nav['data']?.['data']?.['datasheet_general'].company == true ? (
                                                            <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                                        ) : (
                                                            <i className="pl-2 ion-ios-alert alert-icon mr-2 text-xl"></i>
                                                        )
                                                    }
                                                    <Link 
                                                        to=""
                                                        // onClick={() => {
                                                        //     window.location.href = `/shipping-data-sheet/${datasheet_general.quotes_id}?datasheet_id=${datasheet_general._id+"&sheet_section=company"}`
                                                        // }}
                                                        onClick={() => {
                                                            window.location.href = `/shipping-data-sheet/${datasheet_general.quotes_id}?datasheet_id=${datasheet_general._id+"&sheet_section=company"}`
                                                        }}
                                                        state={{
                                                            datasheet_id: datasheet_id,
                                                            sheet_section: sheet_section,
                                                        }}
                                                    >
                                                        <span style={{fontSize: '15px'}}>Company Details</span>
                                                    </Link>
                                                </li>

                                                <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'container' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                                    {
                                                        datasheet_nav['data']?.['data']?.['datasheet_general'].container == true ? (
                                                            <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                                        ) : (
                                                            <i className="pl-2 ion-ios-alert alert-icon mr-2 text-xl"></i>
                                                        )
                                                    }
                                                    <Link 
                                                        to=""
                                                        
                                                        onClick={() => {
                                                            window.location.href = `/shipping-data-sheet/${datasheet_general.quotes_id}?datasheet_id=${datasheet_general._id+"&sheet_section=container"}`
                                                        }}
                                                        state={{
                                                            datasheet_id: datasheet_id,
                                                            sheet_section: sheet_section,
                                                        }}
                                                    >
                                                        <span style={{fontSize: '15px'}}>Container Details</span>
                                                    </Link>
                                                </li>

                                                <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'trade_partners' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                                    {
                                                        datasheet_nav['data']?.['data']?.['datasheet_general'].trade_partners == true ? (
                                                            <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                                        ) : (
                                                            <i className="pl-2 ion-ios-alert alert-icon mr-2 text-xl"></i>
                                                        )
                                                    }
                                                    <Link 
                                                        to=""
                                                        
                                                        onClick={() => {
                                                            window.location.href = `/shipping-data-sheet/${datasheet_general.quotes_id}?datasheet_id=${datasheet_general._id+"&sheet_section=trade_partners"}`
                                                        }}
                                                        state={{
                                                            datasheet_id: datasheet_id,
                                                            sheet_section: sheet_section,
                                                        }}
                                                    >
                                                        <span style={{fontSize: '15px'}}>Trade Partners</span>
                                                    </Link>
                                                </li>

                                                <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'consignee' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                                    {
                                                        datasheet_nav['data']?.['data']?.['datasheet_general'].consignee == true ? (
                                                            <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                                        ) : (
                                                            <i className="pl-2 ion-ios-alert alert-icon mr-2 text-xl"></i>
                                                        )
                                                    }
                                                    <Link 
                                                        to=""
                                                        onClick={() => {
                                                            window.location.href = `/shipping-data-sheet/${datasheet_general.quotes_id}?datasheet_id=${datasheet_general._id+"&sheet_section=consignee"}`
                                                        }}
                                                        state={{
                                                            datasheet_id: datasheet_id,
                                                            sheet_section: sheet_section,
                                                        }}
                                                    >
                                                        <span style={{fontSize: '15px'}}>Consignee</span>
                                                    </Link>
                                                </li>

                                                <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'notify_party' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                                    {
                                                        datasheet_nav['data']?.['data']?.['datasheet_general'].notify_party == true ? (
                                                            <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                                        ) : (
                                                            <i className="pl-2 ion-ios-alert alert-icon mr-2 text-xl"></i>
                                                        )
                                                    }
                                                    <Link 
                                                        to=""
                                                        
                                                        onClick={() => {
                                                            window.location.href = `/shipping-data-sheet/${datasheet_general.quotes_id}?datasheet_id=${datasheet_general._id+"&sheet_section=notify_party"}`
                                                        }}
                                                        state={{
                                                            datasheet_id: datasheet_id,
                                                            sheet_section: sheet_section,
                                                        }}
                                                    >
                                                        <span style={{fontSize: '15px'}}>Notify Party</span>
                                                    </Link>
                                                </li>

                                                <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'trade_terms' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                                    {
                                                        datasheet_nav['data']?.['data']?.['datasheet_general'].trade_terms == true ? (
                                                            <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                                        ) : (
                                                            <i className="pl-2 ion-ios-alert alert-icon mr-2 text-xl"></i>
                                                        )
                                                    }
                                                    <Link 
                                                        to=""
                                                        
                                                        onClick={() => {
                                                            window.location.href = `/shipping-data-sheet/${datasheet_general.quotes_id}?datasheet_id=${datasheet_general._id+"&sheet_section=trade_terms"}`
                                                        }}
                                                        state={{
                                                            datasheet_id: datasheet_id,
                                                            sheet_section: sheet_section,
                                                        }}
                                                    >
                                                        <span style={{fontSize: '15px'}}>Trade Terms</span>
                                                    </Link>
                                                </li>

                                                <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'point_of_stuffing' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                                    {
                                                        datasheet_nav['data']?.['data']?.['datasheet_general'].point_of_stuffing == true ? (
                                                            <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                                        ) : (
                                                            <i className="pl-2 ion-ios-alert alert-icon mr-2 text-xl"></i>
                                                        )
                                                    }
                                                    <Link 
                                                        // to={`/stuffing-point/${params.id}`}
                                                        to=""
                                                        onClick={() => {
                                                            window.location.href = `/shipping-data-sheet/${datasheet_general.quotes_id}?datasheet_id=${datasheet_general._id+"&sheet_section=point_of_stuffing"}`
                                                        }}
                                                        state={{
                                                            datasheet_id: datasheet_id,
                                                            sheet_section: sheet_section,
                                                        }}
                                                    >
                                                    <span style={{fontSize: '15px'}}>Point of Stuffing</span>
                                                    </Link>
                                                </li>

                                                <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'other_details' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                                    {
                                                        datasheet_nav['data']?.['data']?.['datasheet_general'].other_details == true ? (
                                                            <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                                        ) : (
                                                            <i className="pl-2 ion-ios-alert alert-icon mr-2 text-xl"></i>
                                                        )
                                                    }
                                                    <Link 
                                                        to=""
                                                        onClick={() => {
                                                            window.location.href = `/shipping-data-sheet/${datasheet_general.quotes_id}?datasheet_id=${datasheet_general._id+"&sheet_section=other_details"}`
                                                        }}
                                                        state={{
                                                            datasheet_id: datasheet_id,
                                                            sheet_section: sheet_section,
                                                        }}
                                                    >
                                                        <span style={{fontSize: '15px'}}>Other Details</span>
                                                    </Link>
                                                </li>

                                                <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'attach_documents' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                                    {
                                                        datasheet_nav['data']?.['data']?.['datasheet_general'].attach_documents == true ? (
                                                            <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                                        ) : (
                                                            <i className="pl-2 ion-ios-alert alert-icon mr-2 text-xl"></i>
                                                        )
                                                    }
                                                    <Link 
                                                        to=""
                                                        onClick={() => {
                                                            window.location.href = `/shipping-data-sheet/${datasheet_general.quotes_id}?datasheet_id=${datasheet_general._id+"&sheet_section=attach_documents"}`
                                                        }}
                                                        state={{
                                                            datasheet_id: datasheet_id,
                                                            sheet_section: sheet_section,
                                                        }}
                                                    >
                                                        <span style={{fontSize: '15px'}}>Attach Documents</span>
                                                    </Link>
                                                </li>

                                                <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'product-we-offer' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                                    {
                                                        datasheet_nav['data']?.['data']?.['datasheet_general'].product_we_offer == true ? (
                                                            <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                                        ) : (
                                                            <i className="pl-2 ion-ios-alert alert-icon mr-2 text-xl"></i>
                                                        )
                                                    }
                                                    {/* <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i> */}

                                                    <Link 
                                                        to=""
                                                        onClick={() => {
                                                            window.location.href = `/shipping-data-sheet/${datasheet_general.quotes_id}?datasheet_id=${datasheet_general._id+"&sheet_section=product_we_offer"}`
                                                        }}
                                                        state={{
                                                            datasheet_id: datasheet_id,
                                                            sheet_section: sheet_section,
                                                        }}
                                                    >
                                                        <span style={{fontSize: '15px'}}>Products We Offer</span>
                                                    </Link>
                                                </li>

                                                <li className={`black-text upload-text-2 mb-6 p-2' ${sheet_section === 'required_documents' ? "black-text text-xs items-center pt-3 pb-3 bg-grey" : ""}`}>
                                                    {
                                                        datasheet_nav['data']?.['data']?.['datasheet_general'].required_documents == true ? (
                                                            <i className="pl-2 ion-ios-checkmark-circle mr-2 text-xl green-text"></i>
                                                        ) : (
                                                            <i className="pl-2 ion-ios-alert alert-icon mr-2 text-xl"></i>
                                                        )
                                                    }
                                                    {/* <i className="ion-ios-checkmark-circle mr-2 text-xl green-text"></i> */}

                                                    <Link 
                                                        // to={`/stuffing-point/${params.id}`}
                                                        to=""
                                                        onClick={() => {
                                                            window.location.href = `/shipping-data-sheet/${datasheet_general.quotes_id}?datasheet_id=${datasheet_general._id+"&sheet_section=required_documents"}`
                                                        }}
                                                        state={{
                                                            datasheet_id: datasheet_id,
                                                            sheet_section: sheet_section,
                                                        }}
                                                    >
                                                        <span style={{fontSize: '15px'}}>What Documents?</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </ul>

                                </div>
                            </SlidingPane>
                            </>
                        ) : (
                            <></>
                        )}
                        
                    </div>
                )
            }
        </>
    );
}

// export default CustomStepAside;

const mapStateToProps = (state: any) => {
    const { datasheet_nav, error, loading } = state.datasheet;
    return { datasheet_nav, error, loading };
};

export default connect(mapStateToProps, {getDatasheetGeneral})(MobileCustomStepAside);


