import React from 'react';
// import Quote from "assets/icons/quote-active.svg";
import kobo from "assets/images/kobo.png";

 const shippingLine = () => {
    return (
        <>
        <div className="solid-br p-4 flex items-center mt-5" >
            <p className="black-text ml-3 font-semibold text-sm">
                Ocean Freight
            </p>
        </div>
        <div className="rounded overflow-hidden">
            <div className="px-6 py-1 right-divider bottom-divider left-divider w-full">
                <div className="rounded overflow-hidden mb-3 mt-3">
                    <div className="px-6 py-4 right-divider top-divider bottom-divider left-divider rounded w-full">
                        <div className="flex items-center">
                            <img src={kobo} alt="" width='40%' height='40%' />
                            <div className="ml-auto">
                                <div className="font-bold mb-0 mt-0">
                                    12,000 USD
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        </>

    )
}

export default shippingLine;