import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import RateShipmentDetails from "components/rates/RateShipmentDetails";
import PrimaryButton from "components/buttons/PrimaryButton";
import OutlineButton from "components/buttons/OutlineButton";
import SingleRate from "pages/shippingLine/RatePartials/SingleRate";
import { liveRateRequest, saveLiveRatesSelection } from "store/actions"
import RateFilter from "./RatePartials/singleRateFilter"
import SingleMarine from "./MarinePartials/SingleMarine";
import shipmentIcon from "assets/icons/shipment-icon.png";
import cogoToast from "cogo-toast";
import CustomCheckBox from "components/checkBox/CustomCheckbox";

const  ShippingLine = (props:any) => {
    const { live_rates, loading, liveRateRequest, saveLiveRatesSelection, saving_live_rates_selection  } = props
    const [openAside, SetOpenAside] = useState(false);
    const [rates, setRates] = useState([]);
    const [selectedRate, setSelectedRate] = useState("");
    const [selectedInsurance, setSelectedInsurance] = useState("");
    console.log(live_rates)
    // console.log(insurance)
    // console.log(live_rates?.insurance)

    //categories
    const [allCategories, setAllCategories] = useState(true);
    const [oceanFreight, setOceanFreight] = useState(false);
    const [marineInsurance, setMarineInsurance] = useState(false);
    const [haulage, setHaulage] = useState(false);
    const [inlandTrucking, setInlandTrucking] = useState(false);

    const params = useParams();

    useEffect(() => {
        if (params.id) {
            liveRateRequest(params.id);
        }
    }, [params.id]);

    const onSelectRate = (id: string) => {
        setSelectedRate(id);
    };

    const onSelectInsurance = (id: string) => {
        setSelectedInsurance(id);
    };

    const onSubmit = () => {
        // if (
        //     live_rates.insurance &&
        //     live_rates.insurance.length && !selectedInsurance
        // ) {
        // return cogoToast.error("Please select Marine Insurance");
        // }
      
        let oceanFreight_ = oceanFreight
        ? { freightify_req_id: "", freightify_offer_id: "", is_available: true }
        : { is_available: false };
    
        let insurance_ = selectedInsurance
        ? { provider_id: selectedInsurance["id"], provider: selectedInsurance["provider"], is_available: true }
        : { is_available: false };
    
        let data = {
        oceanFreight: oceanFreight_,
        insurance: insurance_,
        };
    
        saveLiveRatesSelection({ data, id: params.id });
        
    }

    return (
        <div className="flex">
            <Aside activeTab="rate" openAside={openAside} SetOpenAside={SetOpenAside} />
            <div>
                <TopBar title="Rates" SetOpenAside="{SetOpenAside}" />
                {
                    loading ? 
                    (
                        <div className="text-center my-3">
                            <Link to="#" className="text-success">
                                {/* @ts-ignore */}
                                <PrimaryButton title="Loading Ocean Freights" loading={loading} />
                            </Link>
                        </div>
                    ) : (
                            <>  <div className="dashboard-content">
                                    <div className="px-7 pt-5 lg:px-14 lg:pt-10 container">
                                        <RateShipmentDetails />
                                        
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="mt-2">
                                                {/* <RateFilter /> */}
                                                <div className="solid-br p-3 rounded-lg mt-5 mr-7 h-56">
                                                <p className="font-semibold black-text mb-5">Categories</p>
                                                <div className="mb-3">
                                                    <CustomCheckBox
                                                    name="all"
                                                    id="all"
                                                    label="All"
                                                    isRequired={false}
                                                    isDisabled={false}
                                                    onChange={(e: any) => {
                                                        setAllCategories(true);

                                                        setOceanFreight(false);
                                                        setMarineInsurance(false);
                                                    }}
                                                    defaultChecked={allCategories}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <CustomCheckBox
                                                    name="ocean_freight"
                                                    id="ocean_freight"
                                                    label="Ocean Freight"
                                                    isRequired={false}
                                                    isDisabled={false}
                                                    onChange={(e: any) => {
                                                        setOceanFreight(e.target.checked);
                                                        setAllCategories(false);
                                                    }}
                                                    defaultChecked={oceanFreight}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <CustomCheckBox
                                                    name="marine_insurance"
                                                    id="marine_insurance"
                                                    label="Marine Insurance"
                                                    isRequired={false}
                                                    isDisabled={false}
                                                    onChange={(e: any) => {
                                                        setMarineInsurance(e.target.checked);
                                                        setAllCategories(false);
                                                    }}
                                                    defaultChecked={marineInsurance}
                                                    />
                                                </div>
                                                {/* <div className="mb-3">
                                                    <CustomCheckBox
                                                    name="haulage"
                                                    id="haulage"
                                                    label="Haulage"
                                                    isRequired={false}
                                                    isDisabled={false}
                                                    onChange={(e: any) => setHaulage(e.target.checked)}
                                                    defaultChecked={haulage}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <CustomCheckBox
                                                    name="inland_trucking"
                                                    id="inland_trucking"
                                                    label="Inland trucking"
                                                    isRequired={false}
                                                    isDisabled={false}
                                                    onChange={(e: any) => setInlandTrucking(e.target.checked)}
                                                    defaultChecked={inlandTrucking}
                                                    />
                                                </div> */}
                                                </div> 
                                            </div>
                                            {/* Ocean Freight */}
                                            <div className="col-span-3 d-flex mb-7 mt-7 dashboard-content">
                                                <p className="black-text text-lg font-semibold">
                                                    Ocean Freight
                                                </p>
                                                {live_rates?.ocean_freight &&
                                                    live_rates?.ocean_freight?.freightifyPricing?.rateStatus ? (
                                                        live_rates?.ocean_freight?.freightifyPricing?.rateStatus.map((rate, index) => {
                                                            return (
                                                                <>
                                                                    <div className="" key={index}>
                                                                        <SingleRate
                                                                            id={index}
                                                                            rate={rate}
                                                                            selectedRate={selectedRate}
                                                                            onSelectRate={onSelectRate}
                                                                        />
                                                                    </div>
                                                                </>
                                                            );
                                                        }
                                                    )
                                                    
                                                    ) : (
                                                        <>
                                                            <div className="top-divider left-divider bottom-divider right-divider">
                                                                <div className="flex flex-col item-center justify-center lg:solid-br rounded">
                                                                    <img src={shipmentIcon} alt="" width={50} height={50} className="mx-auto pt-14" />

                                                                    <div className="mx-auto my-2 pb-14" style={{textAlign:'center'}}>
                                                                        <p className="quote-black-text">There are no Ocean Freights available at the moment</p>
                                                                        <p className="quote-black-text">click on the button below to get a notification</p>
                                                                        {/* <Link to="/new-shipment">
                                                                            <p className="btn bg-green white-text text-sm py-3 px-6 w-full rounded text-center mb-14">Start New Shipment</p>
                                                                        </Link> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                
                                                
                                                {/* Marine Insurance */}
                                                <div className="col-span-3 d-flex mb-7 pt-10 ">
                                                    <p className="black-text text-lg font-semibold mt-5">
                                                        Marine Insurance
                                                    </p>
                                                    {live_rates.insurance &&
                                                        live_rates.insurance.length? (
                                                            live_rates.insurance.map((insurance: any, index: number) => {
                                                                return (
                                                                    <>
                                                                        <div className="" key={index}>
                                                                            <SingleMarine
                                                                                id={insurance.id}
                                                                                insurance={insurance}
                                                                                selectedInsurance={selectedInsurance}
                                                                                onSelectInsurance={onSelectInsurance}
                                                                            />
                                                                        </div>
                                                                    </>
                                                                );
                                                            }
                                                        )
                                                    ) : (
                                                        <>
                                                            <div className="top-divider left-divider bottom-divider right-divider">
                                                                <div className="flex flex-col item-center justify-center lg:solid-br rounded">
                                                                    <img src={shipmentIcon} alt="" width={50} height={50} className="mx-auto pt-14" />

                                                                    <div className="mx-auto my-2 pb-14" style={{textAlign:'center'}}>
                                                                        <p className="quote-black-text">There are no Marine Insurance available at the moment</p>
                                                                        <p className="quote-black-text">click on the button below to get a notification</p>
                                                                        {/* <Link to="/new-shipment">
                                                                            <p className="btn bg-green white-text text-sm py-3 px-6 w-full rounded text-center mb-14">Start New Shipment</p>
                                                                        </Link> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                </div>
                                                


                                                <div className="flex mt-5">
                                                    <div className="ml-auto mr-3">
                                                        {/* @ts-ignore */}
                                                        <OutlineButton 
                                                            // loading={loading.requesting_follow_up} 
                                                            // disabled={loading.requesting_follow_up || loading.accepting_quote} 
                                                            // onClick={() => onContact()} 
                                                            title={"Cancel"} 
                                                            style={{ width: "10rem" }} 
                                                        />
                                                    </div>

                                                    {/* @ts-ignore */} 
                                                        <PrimaryButton 
                                                            loading={saving_live_rates_selection}
                                                            disabled={saving_live_rates_selection}
                                                            onClick={() => onSubmit()}
                                                            title="Proceed" 
                                                            style={{ width: "10rem" }} 
                                                        />
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </div>
                                </div>
                            </>

                        )
                    }
                
            </div>
        </div>
    )
}

// export default ShippingLine;

const mapStateToProps = (state: any) => {
    const { saving_live_rates_selection, live_rates, error, loading } = (state.adminrate);
    return { saving_live_rates_selection, live_rates, error, loading };
};

export default connect(mapStateToProps, {liveRateRequest, saveLiveRatesSelection})(ShippingLine);
