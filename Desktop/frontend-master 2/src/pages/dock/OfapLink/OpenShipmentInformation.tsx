import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { connect } from "react-redux";

import moment from 'moment';

//icons 
import pencil from "assets/icons/pencil.svg";
import divider from "assets/icons/divider.svg";
import left from "assets/icons/arrow-left2.svg";

import port from "assets/icons/home-port.svg";
import trail from "assets/icons/trail.svg";
import destination from "assets/icons/location-pin.svg";

import plus from "assets/icons/plus.svg";
import minus from "assets/icons/minus.svg";

import caretUp from "assets/icons/green-caretup.svg";
import caretDown from "assets/icons/green-caretdown.svg";

//libraries
import { useForm } from "react-hook-form";

//components
import Layout from 'components/dock/Layout';
// import ContactUsModal from 'components/ofap/ContactUsModal';
import EnquiryModal from 'components/ofap/EnquiryModal';
import SuccessModal from 'components/partials/SuccessModal';
import ClosableSuccessModal from 'components/partials/ClosableSuccessModal ';
import PageLoading from 'components/partials/pageLoading';

import CustomInput from "components/textInputs/CustomInput";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";
import CustomDefaultSelect from 'components/selectInputs/CustomDefaultSelect';
import CustomRadio from "components/selectInputs/CustomRadio";
import CBTNotification from 'components/rate/exportOcean/CBTNotification';

import PrimaryButtons from "components/buttons/PrimaryButtons";
import SecondaryButtons from "components/buttons/SecondaryButtons";
import OutlineButton from "components/buttons/OutlineButton";

//redux
import { getBookingSummary, confirmBooking, clearBooking, getBookingDetailsById } from "store/actions";

//helpers
import { formatCurrency } from 'helpers';


const SingleSummaryInfo = ({ text, value }) => (
    <div>
        <p className="text-sm grey-text font-light mb-2">{text}</p>
        <p className="text-sm black-text capitalize">{value}</p>
    </div>
)

const OpenShipmentInformation = (props: any) => {
    const { loading, booking_summary, getBookingSummary, getBookingDetailsById, getting_booking, booking_data, confirmBooking, clearBooking, confirming_booking } = props;

    const { handleSubmit, control, resetField, formState: { errors }, reset } = useForm();

    const [prefix, setPrefix] = useState("$");
    const [currency, setCurrency] = useState("USD");

    const [includeHaulage, setIncludeHaulage] = useState(true);
    const [includeCBT, setIncludeCBT] = useState(true);

    const navigate = useNavigate();

    const [showSummary, setShowSummary] = useState(false);

    const [showContactModal, setShowContactModal] = useState(false);
    const [showSucess, setShowSuccess] = useState(false);
    const [showContactSucess, setShowContactSuccess] = useState(false);
    

    const [prices, setPrices] = useState({});

    const [counter, setCounter] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        if (booking_summary?.ocean_freight?._id !== undefined) {
            const charges = booking_summary?.ocean_freight?.charges[0];

            const chargesObject = {};
            charges.forEach(charge => {
                chargesObject[charge.description] = charge.amountUsd * counter;
            });

            setPrices(chargesObject);
            setTotalAmount(booking_summary?.ocean_freight?.rates_data.total_amount_usd * counter)
        }
    }, [booking_summary, counter])

    const params = useParams();
    const { id } = params;

    const closeContactModal = () => {
        setShowContactModal(false)
    }

    const closeSuccessContactModal = () => {
        setShowContactSuccess(false)
    }

    const showSuccessModal = () => {
        setShowSuccess(true)
    }

    // const closeSuccessModal = () => {
    //     setIsMessageSent(false)
    // }
    // const onSuccess = () => {
    //     setShowContactModal(false);
    //     setShowContactSuccess(true);
    // }

    const confirmSubmit = (data: any) => {
        const _data = {
            commodity_description: data.commodity_description,
            goods_type: data.commodity_type,
            shipment_id: id,
            container_count: counter,
            goods_value: data.goods_value,
            goods_value_currency: currency,
            incoterms: data.incoterm.value,
            haulage: includeHaulage,
            customs_brokerage: includeCBT
        }

        confirmBooking(_data, showSuccessModal);
    }

    useEffect(() => {
        id && getBookingSummary(id)
        id && getBookingDetailsById(id)
    }, [])

    console.log("summary>>>", booking_summary);
    console.log("bookingHere>>>", booking_data)

    return (
        <Layout>
            <main className="px-4 pt-8 lg:pt-10 lg:px-10 dashboard-content-scroll">
                {loading || getting_booking ? <PageLoading title="shipment information" /> :
                    <>
                        <div className="w-full lg:w-4/5">
                            <div className="flex items-center gap-x-1 mb-3 cursor-pointer" onClick={() => navigate(-1)}>
                                <span><img src={left} alt="arrowleft" /></span>
                                <p className="text-sm grey-text font-light">Go Back</p>
                            </div>
                            <div className='flex items-center gap-2 mb-9'>
                                <p className="grey-text-1 text-2xl capitalize">{booking_data?.shipment_type ? booking_data?.shipment_type : "N/A"}</p>
                                <span><img src={divider} alt="" /></span>
                                <p className="black-text-2 text-2xl">Shipment Information</p>
                            </div>

                            <div className="pb-8">
                                <div className="rounded solid-br bg-[#109b320d]">
                                    <div className="px-5 md:pl-8 py-6 md:pr-6 flex items-center border-b-[1px] border-solid border-[#e5e7eb]">
                                        <p className="black-text-3 text-lg font-normal">Ocean Freight Summary</p>
                                        {/* <Link
                                            to="/freight-details"
                                            className="flex items-center gap-1 ml-auto text-base"
                                        >
                                            <img src={pencil} alt="" />
                                            <span className="green-text hidden md:block">Edit details</span>
                                        </Link> */}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 px-5 md:px-8 py-6">
                                        <div className="bg-reds-200 pr-4 md:border-solid md:border-[#E5E7EB] md:border-r-[1px]">
                                            <div className="bg-yellows">
                                                <p className="pb-6 black-text-4 font-normal">Freight Details</p>
                                                <div className="sm:flex items-center justify-between md:block">
                                                    <div className="relative flex items-center gap-2 mb-5">
                                                        <span><img src={port} alt="" /></span>
                                                        <div>
                                                            <p className="grey-text font-light text-sm mb-1">Port of Loading</p>
                                                            <p className="black-text-3 text-sm font-medium">{booking_data?.origin_port ? booking_data?.origin_port : "N/A"}</p>
                                                        </div>
                                                        <div className="hidden md:block">
                                                            <img className="absolute top-11 left-4" src={trail} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-5">
                                                        <span><img src={destination} alt="" /></span>
                                                        <div>
                                                            <p className="grey-text font-light text-sm mb-1">Port of Destination</p>
                                                            <p className="black-text-3 text-sm font-medium">{booking_data?.destination_port ? booking_data?.destination_port : "N/A"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden md:block bg-purples-100 col-span-2 md:pl-4 border-t-[1px] border-solid border-[#E5E7EB] md:border-t-[0px] pt-6 md:pt-0">
                                            <div className="grid grid-cols-2 gap-x-4 md:gap-x-0 gap-y-4 md:gap-y-0 md:grid-cols-4 pb-6 border-solid border-[#E5E7EB] md:border-b-[1px]">
                                                <SingleSummaryInfo text="Container Type" value={booking_data?.container_details ? booking_data?.container_details[0]?.container_type : "N/A"} />
                                                <SingleSummaryInfo text="Container Size" value={booking_data?.container_details ? booking_data?.container_details[0]?.container_size : "N/A"} />
                                                <SingleSummaryInfo text="Carrier" value={booking_summary?.ocean_freight?.rates_data?.carrier_name ? booking_summary?.ocean_freight?.rates_data?.carrier_name : "N/A"} />
                                                <SingleSummaryInfo text="Valid Until" value={booking_summary?.ocean_freight?.rates_validity ? moment(booking_summary?.ocean_freight?.rates_validity).format("DD-MM-YYYY") : "N/A"} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-4 md:gap-x-0 gap-y-4 md:gap-y-0 md:grid-cols-3 md:pt-6 border-solid border-[#E5E7EB] border-b-[1px] md:border-b-[0px] pb-6 md:pb-0">
                                                <SingleSummaryInfo text="Cargo Ready Date" value={booking_data?.cargo_ready_date ? moment(booking_data?.cargo_ready_date).format("DD-MM-YYYY") : "N/A"} />
                                                <SingleSummaryInfo
                                                    text="Transit Time"
                                                    // value={booking_summary?.ocean_freight?.rates_data?.transit_time ? booking_summary?.ocean_freight?.rates_data?.transit_time : "N/A"}
                                                    value={
                                                        booking_summary?.ocean_freight?.rates_data?.route_schedule.length > 0
                                                            ? booking_summary?.ocean_freight?.rates_data?.route_schedule[0]?.transitTime :
                                                            booking_summary?.ocean_freight?.rates_data?.transit_time
                                                                ? booking_summary?.ocean_freight?.rates_data?.transit_time.includes("Days") ? booking_summary?.ocean_freight?.rates_data?.transit_time : booking_summary?.ocean_freight?.rates_data?.transit_time + " days"
                                                                : "N/A"}
                                                />
                                                <SingleSummaryInfo
                                                    text="Free Days"
                                                    // value={booking_summary?.ocean_freight?.rates_data?.demurrage_days ? booking_summary?.ocean_freight?.rates_data?.demurrage_days === 0 ? "N/A" : booking_summary?.ocean_freight?.rates_data?.demurrage_days + " days" : "N/A"}
                                                    value={(booking_summary?.ocean_freight?.rates_data?.detention_days || booking_summary?.ocean_freight?.rates_data?.demurrage_days) ? booking_summary?.ocean_freight?.rates_data?.detention_days + booking_summary?.ocean_freight?.rates_data?.demurrage_days + " days" : "N/A"}
                                                />
                                            </div>
                                        </div>
                                        {showSummary &&
                                            <div className="md:hidden bg-purples-100 col-span-2 md:pl-4 border-t-[1px] border-solid border-[#E5E7EB] md:border-t-[0px] pt-6 md:pt-0">
                                                <div className="grid grid-cols-2 gap-x-4 md:gap-x-0 gap-y-4 md:gap-y-0 md:grid-cols-4 pb-6 border-solid border-[#E5E7EB] md:border-b-[1px]">
                                                    <SingleSummaryInfo text="Container Type" value={booking_data?.container_details ? booking_data?.container_details[0]?.container_type : "N/A"} />
                                                    <SingleSummaryInfo text="Container Size" value={booking_data?.container_details ? booking_data?.container_details[0]?.container_size : "N/A"} />
                                                    <SingleSummaryInfo text="Carrier" value={booking_summary?.ocean_freight?.rates_data?.carrier_name ? booking_summary?.ocean_freight?.rates_data?.carrier_name : "N/A"} />
                                                    <SingleSummaryInfo text="Valid Until" value={booking_summary?.ocean_freight?.rates_validity ? moment(booking_summary?.ocean_freight?.rates_validity).format("DD-MM-YYYY") : "N/A"} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-x-4 md:gap-x-0 gap-y-4 md:gap-y-0 md:grid-cols-3 md:pt-6 border-solid border-[#E5E7EB] border-b-[1px] md:border-b-[0px] pb-6 md:pb-0">
                                                    <SingleSummaryInfo text="Cargo Ready Date" value="2023-06-18" />
                                                    <SingleSummaryInfo
                                                        text="Transit Time"
                                                        // value={booking_summary?.ocean_freight?.rates_data?.transit_time ? booking_summary?.ocean_freight?.rates_data?.transit_time : "N/A"}
                                                        value={
                                                            booking_summary?.ocean_freight?.rates_data?.route_schedule.length > 0
                                                                ? booking_summary?.ocean_freight?.rates_data?.route_schedule[0]?.transitTime :
                                                                booking_summary?.ocean_freight?.rates_data?.transit_time
                                                                    ? booking_summary?.ocean_freight?.rates_data?.transit_time.includes("Days") ? booking_summary?.ocean_freight?.rates_data?.transit_time : booking_summary?.ocean_freight?.rates_data?.transit_time + " days"
                                                                    : "N/A"}
                                                    />
                                                    <SingleSummaryInfo
                                                        text="Free Days"
                                                        value={(booking_summary?.ocean_freight?.rates_data?.detention_days || booking_summary?.ocean_freight?.rates_data?.demurrage_days) ? booking_summary?.ocean_freight?.rates_data?.detention_days + booking_summary?.ocean_freight?.rates_data?.demurrage_days + " days" : "N/A"}
                                                    />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div onClick={() => setShowSummary(!showSummary)} className="cursor-pointer pb-6 md:hidden">
                                        <p className="green-text text-center text-base mb-3">
                                            {showSummary ? "Collapse Summary" : "View Complete Summary"}
                                        </p>
                                        <span className="flex justify-center">
                                            <img
                                                src={showSummary ? caretUp : caretDown}
                                                alt=""
                                                onClick={() => setShowSummary(!showSummary)}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="pb-8">
                                <div className="px-6 py-6 breakdown-border rounded">
                                    <h2 className="text-lg black-text-3">Freight Charges</h2>
                                    <p className="grey-text-4 text-sm font-light">Payment Breakdown</p>
                                    <div className="mt-4 pb-4 bottom-divider-2">
                                        <CBTNotification
                                            width="100%"
                                            haulage={false}
                                            text="The charge below comprises of only your ocean freight charge, total charge will be confirmed by our sales person after you complete your booking. "
                                            shipInfo={true}
                                            isClosable={false}
                                        />
                                    </div>
                                    <div className="flex items-center gap-x-8 mt-10">
                                        <p className="black-text-3">Container Count</p>
                                        <div className="flex items-center gap-x-3">
                                            <span
                                                onClick={() => {
                                                    if (counter === 1)
                                                        return
                                                    setCounter((prev) => prev - 1)
                                                }}
                                                className="cursor-pointer"
                                            ><img src={minus} alt="" /></span>
                                            <p className="text-sm black-text-4">{counter}</p>
                                            <span
                                                onClick={() => setCounter((prev) => prev + 1)}
                                                className="cursor-pointer"
                                            ><img src={plus} alt="" /></span>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <div>
                                            {Object.entries(prices).map(([description, amountUsd], idx) => (
                                                <div className="flex items-center justify-between" key={idx}>
                                                    <p className="black-text-3 font-light mb-6">{description}</p>
                                                    <p className="black-text-3 font-light mb-6">{formatCurrency((amountUsd), "USD")}</p>
                                                    {/* <p className="mb-6 black-text w-20">{amountUsd}</p> */}
                                                </div>
                                            ))}
                                            {/* {booking_summary?.ocean_freight?.charges[0].map((item, idx) => (
                                                <div key={idx} className="flex items-center justify-between">
                                                    <p className="black-text-3 font-light mb-6">{item.description ? item.description : "N/A"}</p>
                                                    <p className="mb-6 black-text w-20">{item.amountUsd ? formatCurrency(item.amountUsd, "USD") : "N/A"}</p>
                                                </div>
                                            ))} */}
                                            {/* <div className="flex items-center justify-between">
                                                <p className="grey-text-1 mb-6">Amendments</p>
                                                <p className="mb-6 black-text w-20">N730,750</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="grey-text-1 mb-6">Vessel Risk Surcharge</p>
                                                <p className="mb-6 black-text w-20">N730,750</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="grey-text-1 mb-6">Marine Fuel Recovery</p>
                                                <p className="mb-6 black-text w-20">N1,270,750</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="grey-text-1 mb-6">Marine Fuel Recovery</p>
                                                <p className="mb-6 black-text w-20">N1,270,750</p>
                                            </div> */}
                                        </div>

                                    </div>
                                    <div className="flex items-center justify-end gap-x-4">
                                        <p className="grey-text-1 text-sm font-medium">Total</p>
                                        <p className="text-2xl black-text">{booking_summary?.total_amount ? formatCurrency(totalAmount, "USD") : "N/A"}</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(confirmSubmit)}>
                                <div className="pb-10 border-b-[1px] border-solid border-[#EAEFEB]">
                                    <div>
                                        <p className="text-lg black-text-3">Additional Information</p>
                                        <p className="grey-text font-light text-sm">Please provide additional details of the freight</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-11">
                                        <CustomInput
                                            control={control}
                                            name={"commodity_type"}
                                            id={"commodity_type"}
                                            label={"Commodity Type"}
                                            placeholder={""}
                                            isRequired={true}
                                            type="text"
                                            errors={errors}
                                            isDisabled={false}
                                            //@ts-ignore
                                            defaultValue={''}
                                            min={""}
                                            max={""}
                                            icon={""}
                                        />
                                        <CustomInput
                                            control={control}
                                            name={"commodity_description"}
                                            id={"commodity_description"}
                                            label={"Commodity Description "}
                                            placeholder={""}
                                            isRequired={true}
                                            type="text"
                                            errors={errors}
                                            isDisabled={false}
                                            //@ts-ignore
                                            defaultValue={''}
                                            min={""}
                                            max={""}
                                            icon={""}
                                        />
                                        <CustomCurrencyInput
                                            control={control}
                                            name={"goods_value"}
                                            id={"goods_value"}
                                            label={"Total value of Goods"}
                                            placeholder={""}
                                            isRequired={true}
                                            type={"number"}
                                            errors={errors}
                                            isDisabled={false}
                                            defaultValue={""}
                                            min={1}
                                            max={""}
                                            icon=""
                                            resetField={resetField}
                                            currency={currency}
                                            setCurrency={setCurrency}
                                            prefix={prefix}
                                            setPrefix={setPrefix}
                                        />
                                        <CustomDefaultSelect
                                            control={control}
                                            name={`incoterm`}
                                            id={`incoterm`}
                                            label={"Incoterms"}
                                            placeholder={"Select"}
                                            isRequired={true}
                                            errors={errors}
                                            isDisabled={false}
                                            options={[
                                                { label: "CIF", value: "CIF" },
                                                { label: "FOB", value: "FOB" },
                                                { label: "CFR", value: "CFR" },
                                                { label: "EXWORKS", value: "EXWORKS" },
                                            ]}
                                            defaultValue={""}
                                            icon=""
                                        />
                                    </div>
                                </div>

                                <div className="pt-10 pb-20 border-b-[1px] border-solid border-[#EAEFEB]">
                                    <div className="flex flex-col gap-x-4 md:items-center md:flex-row md:justify-between">
                                        <p className="black-text-3 text-lg font-medium mb-1 flex-1">Haulage</p>
                                  
                                            <div className="flex flex-1 mt-6 md:mt-0">
                                                <CustomRadio
                                                    selected={includeHaulage ? true : false}
                                                    label={"Include Haulage"}
                                                    onClick={() => setIncludeHaulage(true)}
                                                    style={{ flex: "1" }}
                                                />
                                                <CustomRadio
                                                    selected={includeHaulage === false ? true : false}
                                                    label={"No Haulage"}
                                                    onClick={() => setIncludeHaulage(false)}
                                                    style={{ flex: "1" }}
                                                />
                                            </div>
                          
                                    </div>
                                    <div className="mt-10 flex flex-col gap-x-4 md:items-center md:flex-row md:justify-between">
                                        <p className="black-text-3 text-lg font-medium mb-1 flex-1">CB(Customs Brokerage)</p>
                                        <div className="flex items-center flex-1 mt-6 md:mt-0">
                                            <CustomRadio
                                                selected={includeCBT ? true : false}
                                                label={"Include CB"}
                                                onClick={() => setIncludeCBT(true)}
                                                style={{ flex: "1" }}
                                            />
                                            <CustomRadio
                                                selected={includeCBT === false ? true : false}
                                                label={"No CB"}
                                                onClick={() => setIncludeCBT(false)}
                                                style={{ flex: "1" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xs grey-text mt-3"><span className='text-red-500'>*</span>{" "}By clicking on confirm booking, means you agree to Oneport 365 booking <a href="https://www.oneport365.com/terms-of-service" target='_blank' rel="noreferrer" className="green-text">terms and conditions</a> and if you will like to enquire more or talk to a sales representative, click on the enquire button.</div>
                                <div className="mt-8 flex justify-between">
                                    <div className="hidden md:block">
                                        <OutlineButton
                                            title="Cancel"
                                            style={{ color: "#59725C" }}
                                            onClick={() => {
                                                clearBooking()
                                                navigate('/dashboard')
                                            }}
                                            type={"button"}
                                            disabled={false}
                                            loading={false}
                                            icon={""}
                                        />
                                    </div>
                                    <div className="flex gap-x-6">
                                        <SecondaryButtons
                                            title="Make Enquiry"
                                            style={{ padding: "12px 14px" }}
                                            onClick={() => setShowContactModal(true)}
                                            disabled={false}
                                            loading={false}
                                            type={"button"}
                                            icon={""}
                                        />
                                        <PrimaryButtons
                                            title="Confirm Booking"
                                            style={{}}
                                            // onClick={() => setIsMessageSent(true)}
                                            disabled={false}
                                            loading={confirming_booking}
                                            icon={""}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* <EnquiryModal
                            id={id}
                            isOpen={showContactModal}
                            closeModal={closeContactModal} 
                            setShowContactModal={setShowContactModal}
                            setShowContactSuccess={setShowContactSuccess}
                        /> */}
                        <SuccessModal
                            modalIsOpen={showSucess}
                            heading={"Booking Successful"}
                            text={"Congrats, your booking has been placed."}
                            subtext={<>A mail has been sent to you detailing the next steps and our sales agent will contact you in 1-2 business days. If you have any further questions please call Kayode on <a className='green-text' href='tel:+234906 688 5913'>+234906 688 5913</a>.</>}
                            
                        // closeModal={closeSuccessModal}
                        />
                        <ClosableSuccessModal
                            modalIsOpen={showContactSucess}
                            heading={"Message Sent"}
                            text={"Thank you for contacting support, our team will reach out to you soon."}
                            closeModal={closeSuccessContactModal}
                        />
                    </>
                }
            </main>
        </Layout>
    )
};

const mapStateToProps = (state) => {
    const { loading, booking_summary, confirming_booking } = state.additionalDetails;
    const { getting_booking, booking_data } = state.booking;

    return { loading, booking_summary, getting_booking, booking_data, confirming_booking };
};

export default connect(mapStateToProps, { getBookingSummary, getBookingDetailsById, confirmBooking, clearBooking })(OpenShipmentInformation);