import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SlidingPane from "react-sliding-pane";
import PrimaryButton from 'components/buttons/PrimaryButton';
import CustomInput from "components/textInputs/CustomInput";
import movement from "assets/icons/movement.svg";
import { getCurrentExchangeRates, updateCurrentExchangeRates } from "store/actions";

const ExchangeRateDrawer = (props: any) => {
    const { isOpen, setIsOpen, loading, exchange_rates } = props;
    const currentExchangeRate = exchange_rates?.data?.data
    // console.log(currentExchangeRate)
    const [tab, setTab] = useState("Dollar");
    const { handleSubmit, control, formState: { errors } } = useForm();

    useEffect(() => {
        props.getCurrentExchangeRates();
    }, [getCurrentExchangeRates])

    const onSubmit = (data: any) => {
        console.log('Update Exchange Rate')
        props.updateCurrentExchangeRates(data, "/settings");
    };
    return (
        <>
            <SlidingPane
                className="custom-slider"
                overlayClassName="some-custom-overlay-class"
                isOpen={isOpen}
                hideHeader={true}
                width="756px"
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    setIsOpen(false);
                }}
            >
                {
                    loading ?
                        (
                            <div className="text-center my-3">
                                <Link to="#" className="text-success">
                                    {/* @ts-ignore */}
                                    <PrimaryButton title="Loading Exchange Rates" loading={loading} />
                                </Link>
                            </div>
                        ) : <>
                            <div className="">
                                <i className="ion-ios-close text-3xl ml-auto cursor-pointer py-2 px-3 bg-grey text-3xl rounded-full black-text" onClick={() => setIsOpen(false)}></i>
                                <div className="mt-10 px-2">
                                    <h1 className="text-2xl font-bold">Exchange Rate </h1>
                                    <div className="mt-7">
                                        <div className="grid lg:grid-cols-2">
                                            <div className='col-span-1'>
                                                <p className='text-xl black-text font-bold'>Current Exchange Rates</p>
                                                <div className="flex">
                                                    <div className="mr-2 solid-br p-2 flex items-center rounded-lg mb-5">
                                                        <p className="black-text ml-3 font-semibold text-sm">$1</p>
                                                        <div className="ml-auto">
                                                            <p className="black-text text-sm py-2 px-4 w-full flex">
                                                                {/* ₦{currentExchangeRate?.dollars} */}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="mr-2 solid-br p-2 flex items-center rounded-lg mb-5">

                                                        <p className="black-text ml-3 font-semibold text-sm">£1</p>
                                                        <div className="ml-auto">
                                                            <p className="black-text text-sm py-2 px-4 w-full flex">
                                                                {/* ₦{currentExchangeRate?.pounds} */}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="solid-br p-2 flex items-center rounded-lg mb-5">
                                                        <p className="black-text ml-3 font-semibold text-sm">€1</p>
                                                        <div className="ml-auto">
                                                            <p className="black-text text-sm py-2 px-4 w-full flex">
                                                                {/* ₦{currentExchangeRate?.euros} */}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <hr className="solid-b" />
                                                </div>

                                                <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                                                    <div>
                                                        <div className="mr-1">
                                                            <CustomInput
                                                                control={control}
                                                                name={"dollars"}
                                                                id={"dollars"}
                                                                label={"Update Current Dollar Rate"}
                                                                placeholder={"Update Current Dollar Rate"}
                                                                isRequired={true}
                                                                type={"numeric"}
                                                                errors={errors}
                                                                isDisabled={false}
                                                                // defaultValue={currentExchangeRate.dollars}
                                                                defaultValue={''}
                                                                min={""}
                                                                max={""}
                                                                icon={""}
                                                            />
                                                        </div>

                                                        <div className="mr-1">
                                                            <CustomInput
                                                                control={control}
                                                                name={"pounds"}
                                                                id={"pounds"}
                                                                label={"Update Current Pound Rate"}
                                                                placeholder={"Update Current Pound Rate"}
                                                                isRequired={true}
                                                                type={"numeric"}
                                                                errors={errors}
                                                                isDisabled={false}
                                                                // defaultValue={currentExchangeRate.pounds}
                                                                defaultValue={''}
                                                                min={""}
                                                                max={""}
                                                                icon={""}
                                                            />
                                                        </div>

                                                        <div className="mr-1">
                                                            <CustomInput
                                                                control={control}
                                                                name={"euros"}
                                                                id={"euros"}
                                                                label={"Update Current Euro Rate"}
                                                                placeholder={"Update Current Euro Rate"}
                                                                isRequired={true}
                                                                type={"numeric"}
                                                                errors={errors}
                                                                isDisabled={false}
                                                                // defaultValue={currentExchangeRate.euros}
                                                                defaultValue={''}
                                                                min={""}
                                                                max={""}
                                                                icon={""}
                                                            />
                                                        </div>
                                                        <div className="mt-5 w-20">
                                                            {" "}
                                                            {/* @ts-ignore */}
                                                            <PrimaryButton
                                                                title="Save"
                                                                loading={loading}
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </SlidingPane>
        </>
    )
}

// export default ExchangeRateDrawer;

const mapStateToProps = (state: any) => {
    const { exchange_rates, error, loading } = state.settings;
    return { exchange_rates, error, loading };
};

export default connect(mapStateToProps, { getCurrentExchangeRates, updateCurrentExchangeRates })(ExchangeRateDrawer);

