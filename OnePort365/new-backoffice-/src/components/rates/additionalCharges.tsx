const AdditionalCharges = (props:any) => {
    const { charges, totalCharge } = props;
    console.log(charges)

    return (
        <div>
            <div className="top-divider">
                <p className="text-sm black-text  ml-5 my-3">Charges subject to the information below</p>
            </div>
            <>
            {
                charges &&
                    charges.length &&
                    charges.map((charge: any) => {
                        return (
                            <div className="top-divider flex px-5">
                                <div className="">
                                    <p className="text-sm grey-text  my-3">{charge.description}</p>
                                </div>
                                <div className="ml-auto">
                                    <p className="text-sm black-text my-3 ml-auto font-semibold">
                                        {new Intl.NumberFormat("en-US").format(charge.amountUsd)} <span className="grey-text uppercase font-normal">usd</span>
                                    </p>
                                </div>
                            </div>
                        );
                    })
                }
                <div className="top-divider flex px-5">
                    <div className="ml-auto">
                        <p className="text-sm black-text my-3 ml-auto font-semibold">
                            <span className="font-normal">Subtotal:</span>{" "} {new Intl.NumberFormat("en-US").format(totalCharge)}{" "}
                            <span className="grey-text uppercase font-normal ">usd</span>
                        </p>
                    </div>
                </div>

                <div className="bg-light-green py-3 px-5 flex">
                    <div className="ml-auto">
                        <p className="text-lg black-text my-3 ml-auto font-semibold">
                            <span className="font-normal text-sm">Total:</span>{" "} {new Intl.NumberFormat("en-US").format(totalCharge)}{" "}
                            <span className="grey-text uppercase font-normal ">usd</span>
                        </p>
                    </div>
                </div>


            {/* {charges &&
                charges.length &&
                    charges.map((charge: any) => {
                    return (
                        <div className="top-divider flex px-5">
                            <div className="">
                                <p className="text-sm grey-text  my-3">Advance Manifest Security Charge</p>
                            </div>
                            <div className="ml-auto">
                                <p className="text-sm black-text my-3 ml-auto font-semibold">
                                    30.00 <span className="grey-text uppercase font-normal">usd</span>
                                </p>
                            </div>
                        </div>
                        <div className="top-divider flex px-5">
                            <div className="">
                                <p className="text-sm grey-text my-3">High Security Seal Charge (HSS)</p>
                            </div>
                            <div className="ml-auto">
                                <p className="text-sm black-text my-3 ml-auto font-semibold">
                                    30.00 <span className="grey-text uppercase font-normal">usd</span>
                                </p>
                            </div>
                        </div>
                        <div className="top-divider flex px-5">
                            <div className="">
                                <p className="text-sm grey-text my-3">Origin Terminal Handling Charge (OTHC)</p>
                            </div>
                            <div className="ml-auto">
                                <p className="text-sm black-text my-3 ml-auto font-semibold">
                                    30.00 <span className="grey-text uppercase font-normal">usd</span>
                                </p>
                            </div>
                        </div>
                        <div className="top-divider flex px-5">
                            <div className="">
                                <p className="text-sm grey-text  my-3">Documentation Fee Origin</p>
                            </div>
                            <div className="ml-auto">
                                <p className="text-sm black-text my-3 ml-auto font-semibold">
                                    30.00 <span className="grey-text uppercase font-normal">usd</span>
                                </p>
                            </div>
                        </div>
                        <div className="top-divider flex px-5">
                            <div className="ml-auto">
                                <p className="text-sm black-text my-3 ml-auto font-semibold">
                                    <span className="font-normal">Subtotal:</span> 30.00 <span className="grey-text uppercase font-normal ">usd</span>
                                </p>
                            </div>
                        </div>
                    )
                }
            } */}
            </>
            
        </div>
    );
};
export default AdditionalCharges;

// const mapStateToProps = (state: any) => {
//     const { live_rates, error, loading } = state.liverates;
//     return { live_rates, error, loading };
// };

// export default connect(mapStateToProps)(AdditionalCharges);

