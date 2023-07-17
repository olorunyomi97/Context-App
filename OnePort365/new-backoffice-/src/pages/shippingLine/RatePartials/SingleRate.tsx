import { useState } from "react";
import AdditionalCharges from "../../../components/rates/additionalCharges";
import chevronDown from "assets/icons/chevron-up.svg";
import chevronUp from "assets/icons/chevron-up.svg";
import Maersk from "assets/logos/maersk.png";


const SingleRate = (props: any) => {
    const { selectedRate, onSelectRate, id, rate } = props;
    const [showAdditionalCharges, setShowAdditionalCharges] = useState(false);
    console.log(rate);
    // const [selectedRate, setSelectedRate] = useState("1");

    // const onSelectRate = (id: string) => {
    //   setSelectedRate(id);
    // };
    

    // console.log(live_rates['data']?.['data']?.['ocean_live_rates']?.['offers'])
    // const ocean_freights = live_rates['data']?.['data']?.['ocean_live_rates']?.['offers']

    return (
        <div>
            {/* {
                ocean_freights?.map((data, index) => {
                    return ( */}
                        <>
                            <div
                                className={`${
                                selectedRate === id ? "active-br" : "solid-br"
                                } rounded cursor-pointer mb-5 p-5`}
                                onClick={() => onSelectRate(id)}
                                key={id}
                            >
                                <div className="flex w-100">
                                    <div className=" right-divider w-3/4">
                                        <div className=" p-4 bottom-divider flex">
                                            {selectedRate === id ? (
                                                <i className="ion-ios-checkmark-circle green-text text-4xl mr-2"></i>
                                            ) : (
                                                <i
                                                className="ion-ios-radio-button-off text-4xl mr-2"
                                                style={{ color: "#989898" }}
                                                ></i>
                                            )}
                                            {/* <img src={Maersk} alt="" width={150} /> */}
                                            <p className="ocean_freight_title">{rate?.carrierName}</p>
                                        </div>
                                        <div className="p-5 ">
                                        {/* <div className="lg:grid grid-cols-2"> */}
                                            <div className="items-center">
                                                <div className="flex w-2/4">
                                                    <p className="text-sm black-text">Sailing Date</p>
                                                    <p className="text-sm font-semibold black-text ml-auto">
                                                    {/* {data?.productOffer?.carrierScac} */}
                                                    2nd April 2022
                                                    </p>
                                                </div>
                                                <div className="flex w-2/4 my-3">
                                                    <p className="text-sm black-text">
                                                        Estimated Time of Arrival
                                                    </p>
                                                    <p className="text-sm font-semibold black-text ml-auto">
                                                        {/* {data?.productOffer?.destinationPort} */}
                                                        3 - 7 days
                                                    </p>
                                                </div>
                                                <div className="flex w-2/4">
                                                    <p className="text-sm black-text">Free Days</p>
                                                    <p className="text-sm font-semibold black-text ml-auto">
                                                    {/* {data?.freightifyId} */}Sundays
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=""></div>
                                        {/* </div> */}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center w-1/4">
                                        <div
                                            className={`${
                                                selectedRate === id ? "bg-dark-grey" : "bg-green"
                                            } flex justify-center items-center rounded w-36 py-3`}
                                        >
                                            <p className="white-text font-semibold text-sm">
                                                {selectedRate === id ? "Selected" : "Select"}
                                            </p>
                                        </div>
                                        <div
                                            className="flex items-center mt-2"
                                            onClick={() => {
                                                setShowAdditionalCharges(!showAdditionalCharges);
                                            }}
                                        >
                                            <p className="additional_charges black-text text-sm mr-2">
                                                Additional charges apply
                                            </p>
                                        <img
                                            src={showAdditionalCharges ? chevronUp : chevronDown}
                                            alt=""
                                            width={16}
                                        />
                                        </div>
                                    </div>
                                </div>
                                {/* Additional Charges */}
                                {showAdditionalCharges ? (
                                    <>
                                        <AdditionalCharges 
                                            charges={rate?.productPrice?.charges}
                                            totalCharge={rate?.productPrice?.totalUSDAmount}
                                        />
                                        {/* <div className="top-divider">
                                            <p className="text-sm black-text  ml-5 my-3">Charges subject to the information below</p>
                                        </div>
                                        <div className="top-divider flex px-5">
                                            <div className="">
                                                <p className="text-sm grey-text  my-3">{data?.productPrice?.charges[0]?.description}</p>
                                            </div>
                                            <div className="ml-auto">
                                                <p className="text-sm black-text my-3 ml-auto font-semibold">
                                                    {data?.productPrice?.charges[0]?.amountUsd}
                                                    <span className="grey-text uppercase font-normal">usd</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="top-divider flex px-5">
                                            <div className="">
                                                <p className="text-sm grey-text my-3">{data?.productPrice?.charges[1]?.description}</p>
                                            </div>
                                            <div className="ml-auto">
                                                <p className="text-sm black-text my-3 ml-auto font-semibold">
                                                    {data?.productPrice?.charges[1]?.amountUsd}
                                                    <span className="grey-text uppercase font-normal">usd</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="top-divider flex px-5">
                                            <div className="">
                                                <p className="text-sm grey-text my-3">{data?.productPrice?.charges[2]?.description}</p>
                                            </div>
                                            <div className="ml-auto">
                                                <p className="text-sm black-text my-3 ml-auto font-semibold">
                                                    {data?.productPrice?.charges[2]?.amountUsd} 
                                                    <span className="grey-text uppercase font-normal">usd</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="top-divider flex px-5">
                                            <div className="">
                                                <p className="text-sm grey-text  my-3">{data?.productPrice?.charges[3]?.description}</p>
                                            </div>
                                            <div className="ml-auto">
                                                <p className="text-sm black-text my-3 ml-auto font-semibold">
                                                    {data?.productPrice?.charges[3]?.amountUsd} 
                                                    <span className="grey-text uppercase font-normal">usd</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex px-5" style={{backgroundColor: '#f0fdf4'}}>
                                            <div className="ml-auto mt-2 mb-2">
                                                <p className="text-sm black-text my-3 ml-auto font-semibold">
                                                    <span className="font-normal">Subtotal:</span> {data?.productPrice?.totalUSDAmount} 
                                                    <span className="grey-text uppercase font-normal ">usd</span>
                                                </p>
                                            </div>
                                        </div> */}
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </>
                    {/* )
                })
            } */}
        </div>
        
  );
};
export default SingleRate;