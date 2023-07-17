import React from "react";

//icons
import arrowUp from "assets/icons/arrow-up.svg";
import movement from "assets/icons/movement.svg";

const RateShipmentDetails = () => {
    return (
        <>
            <div className="bg-green flex py-3 px-5 items-center rounded-t-lg">
                <img src={arrowUp} alt="" width={30} height={30} className="bg-light-green p-2 rounded-full mr-2" />
                <p className="text-white">Export</p>

                <p className="text-white ml-auto">Shipping ID: 12345788</p>
            </div>
            <div className="solid-br p-3 flex gap-5 rounded-b-lg items-center">
                <div className="bg-light-green py-3 flex items-center justify-center rounded active-br-light w-2/4">
                    <div className="">
                        <p className="quote-black-text-2 font-semibold">Apapa</p>
                        <p className="quote-black-text-2 text-xs lg:text-sm ">Lagos, Nigeria.</p>
                    </div>

                    <div className="">
                        <img src={movement} alt="" width={40} height={10} className="mx-4" />
                    </div>

                    <div className="">
                        <p className="quote-black-text-2 font-semibold ">Arlington</p>
                        <p className="quote-black-text-2 text-xs lg:text-sm ">Lagos, Nigeria.</p>
                    </div>
                </div>

                <div className="w-1/5">
                    <div className="right-divider">
                        <p className="quote-black-text-2 text-sm">Size of container </p>
                        <p className="quote-black-text-2 font-semibold">40 ft</p>
                    </div>
                </div>

                <div className="w-1/5">
                    <div className="right-divider">
                        <p className="quote-black-text-2 text-sm ">No. of container </p>
                        <p className="quote-black-text-2 font-semibold">18</p>
                    </div>
                </div>

                <div className="w-1/4">
                    <div className="">
                        <p className="quote-black-text-2 text-sm "> Goods Type </p>
                        <p className="quote-black-text-2 font-semibold">Finished Goods</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RateShipmentDetails;
