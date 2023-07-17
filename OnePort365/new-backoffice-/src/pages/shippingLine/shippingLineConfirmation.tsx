import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import RateShipmentDetails from "components/rates/RateShipmentDetails";
import PrimaryButton from "components/buttons/PrimaryButton";
import OutlineButton from "components/buttons/OutlineButton";
import RateSuccessModal from "components/rates/shippingLineSuccessModal";
import clock from "assets/icons/clock.svg";
import Maersk from "assets/logos/maersk.png";
import { getSelectedLiveRates, confirmLiveRates } from "store/actions";


const ShippingLineConfirmation = (props:any) => {
    const [openAside, SetOpenAside] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { loading, selected_live_rates, getSelectedLiveRates, confirmLiveRates } = props;
    
    const params = useParams();

    useEffect(() => {
    getSelectedLiveRates(params.id);
    }, []);

    const openModal_ = () => {
        setOpenModal(true);
    };
    
    const closeModal = () => {
    setOpenModal(false);
    window.location.replace(`${window.location.origin}/quotes`);
    };

    const confirmRates = () => {
    openModal_();
    // confirmLiveRates(params.id, openModal_);
    };
    console.log(selected_live_rates, params.id);

    return (
        <div className="flex">
          <Aside
            activeTab="rate"
            openAside={openAside}
            SetOpenAside={SetOpenAside}
          />
    
          <div className="">
            <TopBar title="Rate Confirmation" SetOpenAside={SetOpenAside} />
    
            {loading ? 
                (
                    <div className="text-center my-3">
                        <Link to="#" className="text-success">
                            {/* @ts-ignore */}
                            <PrimaryButton title="Loading Ocean Freights" loading={loading} />
                        </Link>
                    </div>
            ) : (
              <div className="px-7 pt-5 lg:px-14 lg:pt-20 container">
                <RateShipmentDetails />
                <div className="mt-10 pb-5 solid-br rounded-lg mb-10">
                    {selected_live_rates &&
                        Object.entries(selected_live_rates).length ? (
                            <>
                                <div className="d-flex  my-4 ml-4">
                                    <p className="black-text text-lg font-semibold">
                                    Ocean Freight
                                    </p>
                                </div>
            
                                <div className="solid-br p-4 mx-4 flex items-center rounded-lg">
                                    <div className="">
                                    <img src={Maersk} alt="" width={150} />
                                    </div>
                                <div className="pl-10 mx-auto items-center">
                                    <div className="flex ">
                                        <p className="text-sm black-text">Sailing Date</p>
                
                                        <p className="text-sm font-semibold black-text ml-auto">
                                        2nd April 2022
                                        </p>
                                    </div>
            
                                    <div className="flex  my-3">
                                        <p className="text-sm black-text mr-10">
                                            Estimated Time of Arrival
                                        </p>
                
                                        <p className="text-sm font-semibold black-text ml-auto">
                                            3 - 7 days
                                        </p>
                                    </div>
            
                                    <div className="flex ">
                                            <p className="text-sm black-text">Free Days</p>
                    
                                            <p className="text-sm font-semibold black-text ml-auto">
                                            Sundays
                                            </p>
                                    </div>
                                </div>
                                <div className="flex ml-auto">
                                    <p className="black-text font-semibold text-2xl">
                                        12,000.00
                                    </p>
                                    <p className="grey-text ml-1 font-semibold text-2xl">
                                        {" "}
                                        USD
                                    </p>
                                </div>
                            </div>
                            </>
                        ) : (
                        <></>
                    )}
    
                    {selected_live_rates &&
                    Object.entries(selected_live_rates).length ? (
                        <>
                        <div className="d-flex  my-4 ml-4">
                            <p className="black-text text-lg font-semibold">
                            Marine Insurance
                            </p>
                        </div>
        
                        <div className="solid-br p-4 mx-4 flex items-center rounded-lg">
                            <div className="">
                            {/* <img src={Maersk} alt="" width={150} /> */}
        
                            {/* <div className=" mt-3 bg-light-green flex p-2 active-br-light rounded">
                        <img src={clock} alt="" width={16} className="mr-2" />
                        <p className="black-text text-sm">ETA: 48 hrs 12m 06s</p>
                        </div> */}
        
                            <p className="text-lg black-text font-semibold">
                                {selected_live_rates.insurance.data.insurer?.name}
                            </p>
                            </div>
                            <div className="pl-10 mx-auto items-center">
                            <div className="flex ">
                                <p className="text-sm black-text">Start Date</p>
        
                                <p className="text-sm font-semibold black-text ml-auto">
                                2nd April 2022
                                </p>
                            </div>
        
                            <div className="flex  my-3">
                                <p className="text-sm black-text mr-10">Policy type</p>
        
                                <p className="text-sm font-semibold black-text ml-auto">
                                3 - 7 days
                                </p>
                            </div>
        
                            <div className="flex ">
                                <p className="text-sm black-text">Value asset</p>
        
                                <p className="text-sm font-semibold black-text ml-auto">
                                Sundays
                                </p>
                            </div>
                            </div>
                            <div className="flex ml-auto">
                            <p className="black-text font-semibold text-2xl">
                                {selected_live_rates.insurance.data.price}
                            </p>
                            <p className="grey-text ml-1 font-semibold text-2xl">
                                {" "}
                                {selected_live_rates.insurance.data.insurer.currency}
                            </p>
                            </div>
                        </div>
                        </>
                    ) : (
                        <></>
                    )}
    
                        <div className="my-10">
                            <hr className="solid br" />
                        </div>
                        <div className="flex mr-4 mb-6">
                            <div className="ml-auto mr-3">
                            {/* @ts-ignore  */}
                                <OutlineButton
                                    // loading={loading.requesting_follow_up}
                                    // disabled={loading.requesting_follow_up || loading.accepting_quote}
                                    title={"Cancel"}
                                    onClick={() => setOpenModal(true)}
                                    style={{ width: "10rem" }}
                                />
                            </div>
        
                            {/* @ts-ignore  */}
                            <PrimaryButton
                                // loading={loading.accepting_quote}
                                // disabled={loading.accepting_quote || loading.requesting_follow_up}
                                onClick={() => confirmRates()}
                                title="Confirm"
                                style={{ width: "10rem" }}
                            />
                        </div>
                    </div>
              </div>
            )}
    
            <RateSuccessModal modalIsOpen={openModal} closeModal={closeModal} />
          </div>
        </div>
      );
}

// export default ShippingLineConfirmation; 

const mapStateToProps = (state: any) => {
const { loading, selected_live_rates, confirming_live_rates } = state.rate;
return { loading, selected_live_rates, confirming_live_rates };
};

export default connect(mapStateToProps, {getSelectedLiveRates, confirmLiveRates})(ShippingLineConfirmation);