import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

//redux actions
import { getContainerById, getTripEventsById } from "store/actions";

//icons
import arrowL from "assets/icons/arrow-left2.svg";
import port from "assets/icons/home-port.svg";
import trail from "assets/icons/trail.svg";
import destination from "assets/icons/location-pin.svg";
import trailpoint from "assets/icons/trailpoint-two.svg";

//libraries
import { connect } from "react-redux";

//helpers
import { getStatusBg, getStausTextColor } from "helpers/statusHelper";
import { findDefaultPort, getPortNameByCode } from "helpers";

//components
import Map from "components/maps/Map";
import MasterMap from "components/maps/MasterMap";
import Layout from "components/layout/Layout";
import PageLoading from "components/partials/pageLoading";
import LoadingSpinner from "components/partials/LoadingSpinner";

const EventContainer = ({ eventList }) => (
    <>
        <div className="px-4 py-6 bottom-divider">
            <p className="black-text-3 font-normal">Events {`(${eventList?.length})`}</p>
            <p className="grey-text font-light text-sm">View all the events from this container</p>
        </div>
        <div className="list max-h-[438px] overflow-y-auto">
            {eventList?.map((item, idx) => <Event key={idx} item={item} />)}
        </div>
    </>
);

const Event = ({ item }) => {
    console.log('item>>>', item.event_timestamp)
    const [date, day, month, year, time] = new Date(item?.event_timestamp * 1000).toUTCString().split(' ');
    const formattedDate = `${date} ${month} ${year}`;

    const [hours, minutes, seconds] = (time ?? '').split(':');
    // Convert the hours to a 12-hour format and determine AM or PM
    const twelveHourFormat = ((parseInt(hours) + 11) % 12 + 1); // Ensure '12' for midnight
    const amOrPm = parseInt(hours) < 12 ? 'AM' : 'PM';

    const formattedTime = `${twelveHourFormat}:${minutes} ${amOrPm}`;

    return (
        <div className="klone px-4 py-6 flex justify-between items-center gap-x-3 bottom-divider">
            <div className="flex items-center gap-x-2 w-[65%] max-w-[65%]">
                <div className={`w-5 h-5 rounded-sm ${item.event_status === "warning" ? "bg-[#DB8900] " : "bg-[#FB3947]"}`} />
                <div className="">
                    <p className="grey-text font-medium text-sm capitalize">{item.event_status ? item.event_status : 'N/A'}</p>
                    <p className="grey-text font-light text-xs capitalize ">{item.event_description && item.event_description}</p>
                </div>
            </div>
            <div className="w-[35%] text-right">
                <p className="text-xs black-text-3 font-light">{formattedDate}</p>
                <p className="grey-text font-light text-[10px]">{formattedTime}</p>
            </div>
        </div>
    )
}

const NewContainerDetails = (props: any) => {
    const { getting_containers, container_data, error, getContainerById, getTripEventsById, trip_events, loading } = props;

    const _Json = require("sea-ports");

    const navigate = useNavigate();

    const [eventList, setEventList] = useState([]);

    const params = useParams();
    const { id } = params;

    const [loadingFrame, setLoadingFrame] = useState(true);

    const intervalRef = useRef<number>();

    // const parsePorts = parseAllPorts(_Json.JSON);
    // console.log('defaultPort>>>', _Json.JSON)
    // console.log('namePort>>>', getPortNameByCode(_Json.JSON, 'AEKLF'))


    ///id1 64e343cdecbfd65c09e1c53d
    ///id2 64b6785bed04abafb88a803f

    //triangle pattern 64e9b7950164233f823bb5b7
    useEffect(() => {
        id && getContainerById(id);
        id && getTripEventsById(id);
    }, []);

    useEffect(() => {
        if(!loading){
            intervalRef.current = setInterval(() => {
                id && getTripEventsById(id);
                console.log('interval called')
            }, 300000) as any as number
        }

        return () => {
            intervalRef.current && clearInterval(intervalRef.current);
            console.log('cleaned up')
        }
    }, [loading])


    useEffect(() => {
        setEventList([...(trip_events?.event_details || [])].filter((item) => item?.event_status?.toLowerCase() !== 'periodic') as any)
    }, [trip_events])

    // const ScheduleItem = () => (
    //     <div className="flex gap-x-2">
    //         <span><img src={trailpoint} alt="" /></span>
    //         <div className="solid-br rounded flex-1">
    //             <p className="black-text-3 px-6 pt-6 pb-4 bottom-divider-2">Onne Port Terminal</p>
    //             <div className="pt-4 pb-6 px-6 flex flex-col gap-y-4">
    //                 <div className="grey-text font-light flex justify-between items-center">
    //                     <p className="text-sm max-w-[166px]">Load Vessel</p>
    //                     <p className="text-xs font-normal">9:23 am</p>
    //                 </div>
    //                 <div className="grey-text font-light flex justify-between items-center">
    //                     <p className="text-sm max-w-[120px] xl:max-w-[240px]">6 Jul 2023 : Discharge Vessel (MAERSK DAKAR)</p>
    //                     <p className="text-xs font-normal">9:23 am</p>
    //                 </div>

    //             </div>
    //         </div>
    //     </div>
    // )

    return (
        <Layout>
            <div className="px-4 pt-8 lg:pt-10 lg:px-10 dashboard-content-scroll">
                {getting_containers ? (
                    <PageLoading title="tracking details" />
                ) : (
                    <>
                        <div className="pb-3 md:pb-6 md:border-solid md:border-b-[#F3F4F6] md:border-b-[1px] flex flex-col gap-y-6 md:gap-y-0 md:flex-row md:justify-between md:items-center mb-4">
                            <div>
                                <div className="grey-text flex items-center gap-x-1 mb-2 font-light cursor-pointer" onClick={() => navigate("/container")}>
                                    <span><img src={arrowL} alt=""></img></span>
                                    <p className="text-sm grey-text">All Containers</p>
                                </div>
                                <div className="text-sm sm:text-xl md:text-2xl flex items-center">
                                    <span className=" text-[#344336] mr-[6px]">Cont. Number</span>
                                    <span className="grey-text-1 font-light uppercase">{container_data?.container_number ? `#${container_data?.container_number}` : "N/A"}</span>
                                    <div className={`py-1 px-2 ml-1.5 rounded-full w-fit text-center ${getStatusBg(container_data?.container_status?.toLowerCase())}`}>
                                        <p className={`text-xs capitalize text-center ${getStausTextColor(container_data?.container_status?.toLowerCase())}`}>
                                            {container_data?.container_status === "file opening" ? <span>In Progress</span> : container_data?.container_status === "file closed" ? <span>Completed</span> : container_data?.container_status}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-purpdle-100 min-h-[708px] h-auto flex flex-col lg:flex-row gap-x-5 border-grey">
                            <div className="bg-redd-100 lg:w-[30%] border-grey-right-2 mb-4 lg:mb-0">
                                <div className="px-4 py-6 bottom-divider">
                                    <div className="relative flex items-center gap-2 mb-5">
                                        <span><img src={port} alt="" className="min-w-[32px]" /></span>
                                        <div>
                                            <p className="grey-text font-light text-sm mb-1">Origin</p>
                                            <p className="black-text-3 text-sm font-medium">
                                                {container_data?.shipment_details?.length > 0 ?
                                                    container_data?.shipment_details[0].shipment_type === 'export' ? container_data?.shipment_details[0].stuffing_location ?  container_data?.shipment_details[0].stuffing_location : "N/A" :
                                                        container_data?.shipment_details[0].pickup_location ? container_data?.shipment_details[0].pickup_location : "N/A" : 'N/A'}
                                            </p>
                                        </div>
                                        <div className="hidden md:block">
                                            <img className="absolute top-11 left-4" src={trail} alt="" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span><img src={destination} className="min-w-[32px]" alt="" /></span>
                                        <div>
                                            <p className="grey-text font-light text-sm mb-1">Destination</p>
                                            <p className="black-text-3 text-sm font-medium">
                                                {container_data?.shipment_details?.length > 0 ? container_data?.shipment_details[0].shipment_type === 'export' ? container_data?.shipment_details[0].origin_port_code ? getPortNameByCode(_Json.JSON, container_data?.shipment_details[0].origin_port_code) : 'N/A' :
                                                    container_data?.shipment_details[0].delivery_location ? container_data?.shipment_details[0].delivery_location : 'N/A' : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden lg:block">
                                    {eventList?.length > 0 ? <EventContainer eventList={eventList} /> : <p className="p-6 black-text-3 font-light bottom-divider flex items-center gap-x-1">No Events</p>}
                                </div>
                            </div>
                            <div className={`bg-gray-200 lg:w-[70%] h-[708px]`}>
                                {trip_events?.event_details?.length > 0 ?
                                    <MasterMap mapId={id} originText={container_data?.shipment_details?.length > 0 ?
                                        container_data?.shipment_details[0].shipment_type === 'export' ? container_data?.shipment_details[0].stuffing_location :
                                            container_data?.shipment_details[0].pickup_location : 'N/A'} /> : <p className="p-6 black-text-3 font-light">No Map Detail</p>}
                                   
                            </div>
                            <div className="lg:hidden mt-4 lg:mt-0 top-divider">
                                {eventList?.length > 0 ? <EventContainer eventList={eventList} /> : <p className="p-6 black-text-3 font-light bottom-divider flex items-center gap-x-1">No Events</p>}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    const { getting_containers, container_data, error } = state.shipment;

    const { loading, error: tracking_error, trip_events } = state.tracking;

    return { getting_containers, container_data, error, loading, tracking_error, trip_events };
};

export default connect(mapStateToProps, { getContainerById, getTripEventsById })(NewContainerDetails);
