import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//libraries
import moment from "moment";
import { connect } from "react-redux";

//icons
import copy from "assets/icons/copy.svg";
import norate from "assets/icons/norate.svg";
import cross from "assets/icons/cross.svg";
import info from "assets/icons/info.svg";
import divider from "assets/icons/divider.svg";
import check from "assets/icons/grey-check.svg";
import calendar from "assets/icons/calendar.svg";
import shipment from "assets/icons/shipment.svg";
import caretup from "assets/icons/green-caretup.svg";
import disclaimer from "assets/icons/disclaimer-grey.svg";
import caretdown from "assets/icons/green-caretdown.svg";
import track from "assets/icons/notracking.svg";

import map from "assets/images/bigmap.png";

import August from "assets/images/August.jpg";

//helpers
import { getOrigin, getDestination } from "helpers/tableLocation";

//components
import Layout from "components/layout/Layout";
import PrimaryButtons from "components/buttons/PrimaryButtons";
import PageLoading from "components/partials/pageLoading";
import NewShipment from "components/dashboard/NewShipment";
import NewShipmentModal from "components/dashboard/NewShipmentModal";
import SingleCard from "components/dashboard/SingleCard";
import ContainerModal from "components/dashboard/ContainerModal";
import TrackingModal from "components/dashboard/TrackingModal";
import LoadingSpinner from "components/partials/LoadingSpinner";
import MasterMap from "components/maps/MasterMap";
import PageTitle from "components/partials/PageTitle";

//redux
import { getDashboardParams, clearShipment, clearBooking } from "store/actions";

import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const RecentBooking = ({ item }) => (
  <div className="py-5 px-6 bottom-divider-2">
    <div className="flex items-center gap-x-2">
      <p className="black-text font-normal">
        {item.shipment_type === "export" ? "Export" : "Import"}
      </p>
      <div><img src={divider} alt="" /></div>
      <p className="black-text font-light capitalize">
        {item.shipment_transport_type === "ocean_freight" && "Ocean Freight"}
        {item.shipment_transport_type === "air_freight" && "Air Freight"}
        {item.shipment_transport_type === "haulage" && "Haulage"}
        {item.shipment_transport_type === "warehousing" && "Warehousing"}
        {item.shipment_transport_type === "customs_brokerage" && "Customs Brokerage"}
      </p>
      <Link
        to={`/booking/${item?.["_id"]}`}
        className="lg:hidden ml-auto text-sm green-text-2 self-center place-self-center cursor-pointer font-normal"
      >
        View
      </Link>
    </div>
    <div className="mt-6 grid grid-cols-3 lg:grid-cols-4 gap-x-2 lg:gap-x-0">
      <div>
        <p className="font-light grey-text text-sm mb-1.5">Origin</p>
        <p className="black-text-3 text-sm">{getOrigin(item)}</p>
      </div>
      <div>
        <p className="font-light grey-text text-sm mb-1.5">Destination</p>
        <p className="black-text-3 text-sm">{getDestination(item)}</p>
      </div>
      <div className="self-center place-self-end lg:place-self-center">
        {item.shipment_status === "new booking" && <p className="text-xs text-[#0047A9] py-1 px-2 rounded-full bg-[#d0f5ff4d] font-normal w-fit text-center">New Booking</p>}
        {item.shipment_status === "awaiting quotes" && <p className="text-xs text-[#C27500] py-1 px-2 rounded-full bg-[#FFFADF] font-normal w-fit text-center">Awaiting Quotes</p>}
        {item.shipment_status === "cancelled" && <p className="text-xs text-red-600 py-1 px-2 rounded-full bg-red-100 font-normal w-fit text-center">Cancelled</p>}
      </div>
      <Link
        to={`/booking/${item?.["_id"]}`}
        className="hidden lg:block text-sm green-text-2 self-center place-self-center cursor-pointer font-normal"
      >
        View
      </Link>
    </div>
  </div>
);

const ActiveShipment = ({ item, handleCopyClick, isCopied }) => (
  <div className="py-5 px-6 bottom-divider-2">
    <div className="flex items-center gap-x-2">
      <p className="black-text font-normal">
        {item.shipment_type === "export" ? "Export" : "Import"}
      </p>
      <div>
        <img src={divider} alt="" />
      </div>
      <p className="black-text font-light">
        {item.shipment_transport_type === "ocean_freight" && "Ocean Freight"}
        {item.shipment_transport_type === "air_freight" && "Air Freight"}
        {/* {item.shipment_transport_type  === "air_freight" && "Ocean Freight" } */}
        {item.shipment_transport_type === "haulage" && "Haulage"}
        {item.shipment_transport_type === "warehousing" && "Warehousing"}
        {item.shipment_transport_type === "customs_brokerage" &&
          "Customs Brokerage"}
      </p>
      <Link
        to={`/booking/${item?.["_id"]}`}
        className="lg:hidden ml-auto text-sm green-text-2 self-center place-self-center cursor-pointer font-normal"
      >
        View
      </Link>
    </div>
    <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-3">
      <div className="lg:col-span-2 xl:col-span-1">
        <p className="font-light grey-text text-sm mb-1.5">Job Number</p>
        <p className="black-text-3 text-sm flex items-center gap-x-1">
          <span>{item?.job_number}</span>
          <img
            src={isCopied[item._id] ? check : copy}
            className="cursor-pointer"
            alt=""
            onClick={() => handleCopyClick(item.job_number, item._id)}
          />
        </p>
      </div>
      <div className="lg:place-self-center">
        <p className="font-light grey-text text-sm mb-1.5">Date Created</p>
        <p className="black-text-3 text-sm">
          {item.createdAt ? moment(item.createdAt).format("DD-MM-YYYY") : "N/A"}
        </p>
      </div>
      <Link
        to={`/shipments/${item?.["_id"]}`}
        className="hidden lg:block text-sm green-text-2 self-center place-self-end xl:place-self-center cursor-pointer font-normal"
      >
        View
      </Link>
    </div>
  </div>
);

const Summmary = ({ dashboard_params, total }) => {
  const data = {
    labels: [],
    datasets: [
      {
        // label: 'Poll',
        data: [
          dashboard_params?.containers?.in_transit,
          dashboard_params?.containers?.file_opening,
          dashboard_params?.containers?.new,
          dashboard_params?.containers?.file_closed,
        ],
        backgroundColor: [
          "rgba(103, 152, 255, 1)",
          "rgba(255, 201, 62, 1)",
          "rgba(194, 117, 0, 1)",
          "rgba(58, 180, 74, 1)",
        ],
        borderColor: [
          "rgba(103, 152, 255, 1)",
          "rgba(255, 201, 62, 1)",
          "rgba(194, 117, 0, 1)",
          "rgba(58, 180, 74, 1)",
        ],
        cutout: "90%",
        border: "0",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;

      ctx.save();
      ctx.font = "bold 30px Inter";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${dashboard_params?.containers?.total_containers}`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };
  return (
    <>
      {/* <SingleCard
        to="booking"
        text="Total Booking"
        image={calendar}
        data={dashboard_params?.shipments?.total_bookings}
        style={{ color: "#3AB44A" }}
      /> */}
      <SingleCard
        to="shipments"
        text="Total Shipment"
        image={shipment}
        data={dashboard_params?.shipments?.total_shipments}
        style={{ color: "#6798FF" }}
      />
      <div className="border-grey rounded">
        <p className="grey-text px-6 pt-6 pb-3.5 bottom-divider-2">
          Total Container
        </p>
        <div className="flex flex-col items-center gap-5 mt-5 mb-9 p-3">
          <div className="chart-container">
            <Doughnut
              data={data}
              options={options}
              plugins={[textCenter]}
            ></Doughnut>
          </div>
          <div className="grid grid-cols-2 gap-x-6 xl:gap-x-11 gap-y-3">
            <div className="flex items-center gap-x-1">
              <div className="w-3 h-3 bg-[#6798FF] rounded" />
              <span className="grey-text font-light">
                In Transit ({dashboard_params?.containers?.in_transit})
              </span>
            </div>
            <div className="flex items-center gap-x-1">
              <div className="w-3 h-3 bg-[#FFB323] rounded" />
              <span className="grey-text font-light">
                In Progress ({dashboard_params?.containers?.file_opening})
              </span>
            </div>
            <div className="flex items-center gap-x-1">
              <div className="w-3 h-3 bg-[#C27500] rounded" />
              <span className="grey-text font-light">
                New ({dashboard_params?.containers?.new})
              </span>
            </div>
            <div className="flex items-center gap-x-1">
              <div className="w-3 h-3 bg-[#3AB44A] rounded" />
              <span className="grey-text font-light">
                Completed ({dashboard_params?.containers?.file_closed})
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const NoContainerToDisplay = () => (
  <div className="text-center flex flex-col justify-center items-center">
    <div>
      <img src={track} alt="" />
    </div>
    <div className="mt-10">
      <p className="text-xl grey-text">No Containers To Display</p>
      <p className="text-sm grey-text-1 max-w-[313px]">
        To view your tracking information you need to have active containers
      </p>
    </div>
  </div>
);

const SingleContainer = ({
  item,
  frame,
  setFrame,
  setFrameLoading,
  containerNumber,
  setContainerNumber,
}) => (
  <div
    className={`border-b-solid border-b-[#e5e7eb] border-b-[1px] p-6 cursor-pointer ${
      containerNumber === item.container_number ? "rate-item rounded" : ""
    }`}
    onClick={() => {
      setFrame(item._id);
      setContainerNumber(item.container_number);
      setFrameLoading(true);
    }}
  >
    <div
      className={`py-1.5 px-2 rounded-xl w-[150px] text-center 
          ${
            item.container_status.toLowerCase() === "pending approval"
              ? "background-green"
              : item.container_status.toLowerCase() === "in transit"
              ? "bg-[#ECFBFF]"
              : item.container_status.toLowerCase() === "new"
              ? "bg-[#FFFADF]"
              : item.container_status.toLowerCase() === "file opening"
              ? "bg-[#ffe75d33]"
              : item.container_status.toLowerCase() === "file closed"
              ? "bg-[#98ff9b4d]"
              : item.container_status.toLowerCase() === "cancelled"
              ? "bg-red-100"
              : "bg-[#ededed]"
          }`}
    >
      <p
        className={`text-xs capitalize text-center ${
          item.container_status.toLowerCase() === "in transit"
            ? "text-[#296FD8]"
            : item.container_status.toLowerCase() === "pending approval"
            ? "text-[#059C01]"
            : item.container_status.toLowerCase() === "new"
            ? "text-[#C27500]"
            : item.container_status.toLowerCase() === "file opening"
            ? "text-[#DB8900]"
            : item.container_status.toLowerCase() === "file closed"
            ? "text-[#007200]"
            : item.container_status.toLowerCase() === "cancelled"
            ? "text-red-600"
            : ""
        }`}
      >
        {item.container_status.toLowerCase() === "file opening" ? (
          <span>In Progress</span>
        ) : item.container_status.toLowerCase() === "file closed" ? (
          <span>Completed</span>
        ) : (
          item.container_status
        )}
      </p>
    </div>
    <div className="flex justify-between items-center mt-6">
      <div>
        <p className="grey-text text-sm mb-1.5">Job Number</p>
        <p className="black-text uppercase text-sm font-medium">
          {item?.shipment_details[0].job_number
            ? item?.shipment_details[0].job_number
            : "N/A"}
        </p>
      </div>
      <div>
        <p className="grey-text text-sm mb-1.5">Cont. Number</p>
        <p className="black-text uppercase text-sm font-medium">
          {item?.container_number ? item?.container_number : "N/A"}
        </p>
      </div>
    </div>
  </div>
);

const Dashboards = (props: any) => {
  const { getDashboardParams, loading, dashboard_params, clearShipment, clearBooking } = props;

  const navigate = useNavigate();

  //user data
  let user = useSelector((state: any) => state.auth.user_data);
  // @ts-ignore
  user = user ? user : JSON.parse(localStorage.getItem("user_data"));

  const scrollref = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [showShipment, setShowShipment] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const [isCopied, setIsCopied] = useState<object>({});
  const [frame, setFrame] = useState("");
  const [containerNumber, setContainerNumber] = useState("");
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [showContainer, setShowContainer] = useState(false);
  const [showMap, setShowMap] = useState<boolean>(false);

  const [frameLoading, setFrameLoading] = useState(false);

  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (!dashboard_params) {
      setTotal(dashboard_params?.total_containers);
    }
  }, [dashboard_params]);

  const openShipmentModal = () => {
    setModalIsOpen(true);
    // setModalText(text);
  };

  const closeShipmentModal = () => {
    setModalIsOpen(false);
  };

  //close modal
  const closeModal = () => {
    // setShowContainer(false);
    setShowMap(false);
  };

  console.log("frame>>", frame)
  // let booking_data = useSelector((state: any) => state.booking.booking_data);
  // console.log('booktaHere>>', booking_data )

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token") || "";
    token && getDashboardParams();
  }, []);

  //copy function
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  //setting first map
  useEffect(() => {
    if (dashboard_params?.containers?.containers.length > 0) {
      setFrame(
        dashboard_params?.containers?.containers[0]?._id
      );
      setContainerNumber(
        dashboard_params?.containers?.containers[0]?.container_number
      );
      setFrameLoading(true);
    }
  }, [dashboard_params?.containers?.containers]);

  //scroll in function
  const scroll = () => {
    scrollref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setFrameLoading(true);
  };

  //scroll in
  // useEffect(() => {
  //   //@ts-ignore
  //   scrollref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // }, [frame]);

  // onClick handler function for the copy button
  const handleCopyClick = (copyText, id) => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied((prev) => ({
          ...prev,
          [id]: true,
        }));
        setTimeout(() => {
          setIsCopied((prev) => ({
            ...prev,
            [id]: false,
          }));
        }, 1100);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //creating the click outside to close drop down effect
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu, then close the menu
      if (showShipment && ref.current && !ref.current.contains(e.target)) {
        setShowShipment(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showShipment]);

  console.log("params>>>", dashboard_params);
  // console.log(
  //   "frame>>>",
  //   dashboard_params?.containers?.containers[0]?.inland_tracking_url
  // );

  return (
    <Layout>
      {loading ? (
        <PageLoading title="dashboard details." />
      ) : (
        <>
          <main className="px-4 pt-8 lg:pt-10 lg:px-10 dashboard-content-scroll">
            <PageTitle 
              text={<>Welcome, {user.firstname}</>} 
              subtext="Here’s an overview of all your activities" 
              clearBooking={clearBooking} 
            />

            <div className="my-10 solid-br rounded">
              <p className="px-6 pt-6 pb-4 bottom-divider">Overview</p>
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="col-span-3 grid grid-cols-1 lg:grid-cols-2 p-6">
                  <div className="lg:pr-10 lg:border-r-[1px] lg:border-r-solid lg:border-r-[#e5e7eb] pb-8 lg:pb-0 border-b-[1px] border-b-solid border-b-[#e5e7eb] lg:border-b-[0px]">
                    <SingleCard
                      to="booking"
                      text="Total Booking"
                      image={calendar}
                      data={dashboard_params?.shipments?.total_bookings}
                      style={{ color: "#3AB44A" }}
                    />
                    <div className="px-4 py-2 bg-[#F3F4F6] rounded flex items-start gap-x-3 mt-10">
                      <div><img src={disclaimer} alt="" /></div>
                      <p className="grey-text text-xs">This displays all your bookings over a period of time</p>
                    </div>
                  </div>
                  <div className="lg:pl-10 pt-8 lg:pt-0">
                    <SingleCard
                      to="shipments"
                      text="Total Shipment"
                      image={shipment}
                      data={dashboard_params?.shipments?.total_shipments}
                      style={{ color: "#6798FF" }}
                    />
                    <div className="px-4 py-2 bg-[#F3F4F6] rounded flex items-start gap-x-3 mt-10">
                      <div><img src={disclaimer} alt="" /></div>
                      <p className="grey-text text-xs">This displays all your shipments over a period of time</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 lg:border-l-solid lg:border-l-[1px] border-l-[#e5e7eb] lg:pl-10 pl-6 pt-6 pr-6 border-t-[1px] border-t-solid border-t-[#e5e7eb] lg:border-t-[0px]">
                  <div className="flex items-center gap-x-2">
                    <p className="black-text-4">Container Summary</p>
                    <div><img src={info} alt="" /></div>
                  </div>
                  <p className="black-text-3 text-2xl mt-8 font-medium mb-2.5">
                    {dashboard_params?.containers?.total_containers}
                  </p>

                  <div className="w-full flex">
                    <div
                      className={`h-1.5 bg-[#296FD8]`}
                      style={{
                        width: `${
                          (dashboard_params?.containers?.new /
                            dashboard_params?.containers?.total_containers) *
                          100
                        }%`,
                      }}
                    ></div>
                    <div
                      className={`h-1.5 bg-[#4CAF6E]`}
                      style={{
                        width: `${
                          (dashboard_params?.containers?.in_transit /
                            dashboard_params?.containers?.total_containers) *
                          100
                        }%`,
                      }}
                    ></div>
                    <div
                      className={`h-1.5 bg-[#CC8400]`}
                      style={{
                        width: `${
                          (dashboard_params?.containers?.file_opening /
                            dashboard_params?.containers?.total_containers) *
                          100
                        }%`,
                      }}
                    ></div>
                    <div
                      className={`h-1.5 bg-[#81899E]`}
                      style={{
                        width: `${
                          (dashboard_params?.containers?.file_closed /
                            dashboard_params?.containers?.total_containers) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-4 mt-7 pb-7 lg:pb-0">
                    <div>
                      <p className="text-sm font-light text-[#296FD8]">
                        New Cont.
                      </p>
                      <p className="text-[#4D525F] font-light mt-1.5">
                        {dashboard_params?.containers?.new}
                      </p>
                    </div>
                    <div>
                      <p className="font-light text-sm text-[#4CAF6E]">
                        In Transit
                      </p>
                      <p className="text-[#4D525F] font-light mt-1.5">
                        {dashboard_params?.containers?.in_transit}
                      </p>
                    </div>
                    <div>
                      <p className="font-light text-sm text-[#CC8400]">
                        In Progress
                      </p>
                      <p className="text-[#4D525F] font-light mt-1.5">
                        {dashboard_params?.containers?.file_opening}
                      </p>
                    </div>

                    <div>
                      <p className="font-light text-sm text-[#81899E]">
                        Complete
                      </p>
                      <p className="text-[#4D525F] font-light mt-1.5">
                        {dashboard_params?.containers?.file_closed}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="hidden mt-10 max-h-[593px] h-[593px] lg:grid grid-cols-1 lg:grid-cols-3 border-grey"
              ref={scrollref}
            >
              <div className="col-span-2 text-white font-light justify-center items-center flex-col p-4 hidden lg:flex w-full h-[593px]">
                {/* <div className="mb-10"><img src={track} alt="" /></div>
                <p className="grey-text text-xl text-center mb-2 font-medium">Container Tracking Incoming</p>
                <p className="grey-text-1 font-light max-w-[400px] text-center">Oneport365 tracking service is currently in development and will be available soon</p> */}
                {/* {frameLoading && <LoadingSpinner height="10" />} */}
                {/* {frame ? (
                  <iframe
                    title="Tracking"
                    src={`https://test.oneport365.com/mapframe/${frame}`}
                    // src={`http://localhost:3001/mapframe/${frame}`}
                    width="100%"
                    height="100%"
                    onLoad={() => setFrameLoading(false)}
                  ></iframe>
                ) : (
                  <NoContainerToDisplay />
                )} */}
                {frame ? <MasterMap mapId={frame} /> :  <NoContainerToDisplay />}
                {/* <iframe src="https://www.youtube.com/embed/dXBohfjc4WA" width="100%" height="480" title="test"></iframe>  */}
              </div>
              <div className="hidden lg:flex flex-col left-divider ">
                <p className="px-6 pt-6 pb-5 black-text-3 font-medium bottom-divider">
                  Container Tracking
                </p>
                <div className="max-h-[520px] h-[520px] overflow-y-auto">
                  {dashboard_params?.containers?.containers.length > 0 ? (
                    dashboard_params?.containers?.containers.map((item) => (
                      <SingleContainer
                        item={item}
                        key={item.container_number}
                        frame={frame}
                        containerNumber={containerNumber}
                        setContainerNumber={setContainerNumber}
                        setFrame={setFrame}
                        setFrameLoading={setFrameLoading}
                      />
                    ))
                  ) : (
                    <div className="px-6 h-full">
                      <div className="flex flex-col justify-center items-center h-full">
                        <p className="text-xl grey-text">No Container(s)</p>
                        <p className="text-sm grey-text-1 max-w-[200px] text-center">
                          Your active containers will be displayed here
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {/* <SingleCard
                  to="booking"
                  text="Total Booking"
                  image={calendar}
                  data={dashboard_params?.shipments?.total_bookings}
                  style={{ color: "#3AB44A" }}
                />
                <SingleCard
                  to="shipments"
                  text="Total Shipment"
                  image={shipment}
                  data={dashboard_params?.shipments?.total_shipments}
                  style={{ color: "#6798FF" }}
                />
                <div className="border-grey rounded">
                  <p className="grey-text px-6 pt-6 pb-3.5 bottom-divider-2">Total Container</p>
                  <div className="flex flex-col items-center gap-5 mt-5 mb-9">
                    <div className="w-[100px] h-[100px] bg-blue-400 rounded-full"></div>
                    <div className="grid grid-cols-2 gap-x-11 gap-y-3">
                      <div className="flex items-center gap-x-1">
                        <div className="w-3 h-3 bg-blue-500 rounded" />
                        <span className="grey-text font-light">In Transit (8)</span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <div className="w-3 h-3 bg-yellow-500 rounded" />
                        <span className="grey-text font-light">In Progress</span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded" />
                        <span className="grey-text font-light">New</span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <div className="w-3 h-3 bg-purple-500 rounded" />
                        <span className="grey-text font-light">Completed</span>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <Summmary dashboard_params={dashboard_params} total={total} /> */}
              </div>
            </div>

            {/* <div className="hidden lg:block border-grey-2 mt-8 rounded">
              <div className="px-6 pt-6 pb-4 flex items-center gap-x-2">
                <p className="text-base black-text-3">Container Details</p>
              </div>
              {dashboard_params?.containers?.containers.length > 0 ?
                <table className="booking-details shipment-details container-details">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Cont. Number</th>
                      <th>Seal Number</th>
                      <th>Cont. Size (FT)</th>
                      <th>BL Number</th>
                      <th>Stuffing Date</th>
                      <th><span className="hidden">nwife</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard_params?.containers?.containers.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td className="uppercase">{item?.container_number ? item?.container_number : "N/A"}</td>
                        <td className="uppercase">{item?.shipping_line_seal_number ? item?.shipping_line_seal_number : "N/A"}</td>
                        <td>{item?.container_size ? item?.container_size : "N/A"}</td>
                        <td>{item?.shipment_details[0]?.bl_number ? item?.shipment_details[0]?.bl_number : "N/A"}</td>
                        <td>{item?.date_stuffed ? moment(item?.date_stuffed).format("DD-MM-YYYY") : "N/A"}</td>
                        <td>
                          {item?.container_status ? item.container_status === "File Closed" ? <p className="text-xs text-[#C27500] py-1 px-2 rounded-full bg-[#FFFADF] font-normal w-fit text-center">File Closed</p> :
                            item.container_status === "NEW" ? <p className="text-xs text-[#0047A9] py-1 px-2 rounded-full bg-[#d0f5ff4d] font-normal w-fit">New</p> : <p>{item?.container_status}</p> : "N/A"
                          }
                        </td>
                        {item.inland_tracking_url ? <td
                          onClick={(e) => {
                            setFrame(item.inland_tracking_url);
                            scroll();
                          }}
                        >
                          <span className="green-text-2 cursor-pointer">View Map</span>
                        </td> : <td>N/A</td>}
                      </tr>
                    ))
                    }
                  </tbody>
                </table> :
                <>
                  <table className="booking-details shipment-details container-details">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Cont. Number</th>
                        <th>Seal Number</th>
                        <th>Cont. Size (FT)</th>
                        <th>BL Number</th>
                        <th>Stuffing Date</th>
                        <th><span className="hidden">nwife</span></th>
                      </tr>
                    </thead>
                  </table>
                  <div className="flex flex-col justify-center items-center gap-y-2 min-h-[200px]">
                    <p className="grey-text text-xl">No Container(s)</p>
                    <p className="text-sm font-light grey-text-1 max-w-[296px] text-center">
                      Kindly be patient as our sales representative uploads your
                      container details
                    </p>
                  </div>
                </>
              }
            </div> */}

            {/* <div className="lg:hidden mt-6 pb-6 bottom-divider-2">
              <p
                className="border-solid border-[#3AB44A] border-[1px] rounded-3xl py-3 text-center font-normal text-[#3AB44A] text-sm md:text-base cursor-pointer"
                onClick={() => setShowContainer(true)}
              >
                View Containers
              </p>
              <ContainerModal
                showContainer={showContainer}
                closeModal={closeModal}
                dashboard_params={dashboard_params}
                setFrame={setFrame}
                scroll={scroll}
              />
            </div> */}

            {/* <div className="lg:hidden border-grey-1 rounded mt-6 py-6 px-4 ">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowSummary(!showSummary)}
              >
                <div>
                  <p className="black-text-3 mb-1 font-medium">Summary</p>
                  <p className="text-sm grey-text-4 font-light">Here’s a breakdown of your activities</p>
                </div>
                <div><img src={showSummary ? caretup : caretdown} alt="" /></div>
              </div>
              {showSummary && <div className="mt-6 flex flex-col gap-y-8">
                <Summmary dashboard_params={dashboard_params} total={total} />
              </div>}
            </div> */}

            <>
              <div className="lg:hidden border-grey-2 mt-8 rounded">
                <div className="px-6 pt-6 pb-4 flex items-center gap-x-2">
                  <p className="text-base black-text-3">Container Details</p>
                </div>
                {dashboard_params?.containers?.containers.length > 0 ? (
                  <table className="booking-details shipment-details container-details">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Cont. Number</th>
                        {/* <th>Seal Number</th>
                        <th>Cont. Size (FT)</th> */}
                        {/* <th>BL Number</th>
                        <th>Stuffing Date</th> */}
                        <th>Status</th>
                        <th>
                          <span className="hidden">nwife</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard_params?.containers?.containers.map(
                        (item, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td className="uppercase">
                              {item?.container_number
                                ? item?.container_number
                                : "N/A"}
                            </td>
                            {/* <td className="uppercase">{item?.shipping_line_seal_number ? item?.shipping_line_seal_number : "N/A"}</td>
                          <td>{item?.container_size ? item?.container_size : "N/A"}</td> */}
                            {/* <td>{item?.shipment_details[0]?.bl_number ? item?.shipment_details[0]?.bl_number : "N/A"}</td>
                          <td>{item?.date_stuffed ? moment(item?.date_stuffed).format("DD-MM-YYYY") : "N/A"}</td> */}
                            <td>
                              {item?.container_status ? (
                                item?.container_status.toLowerCase() ===
                                "file closed" ? (
                                  <p className="text-xs text-[#007200] py-1 px-2 rounded-full bg-[#98ff9b4d] font-normal w-fit text-center">
                                    Completed
                                  </p>
                                ) : item?.container_status.toLowerCase() ===
                                  "new" ? (
                                  <p className="text-xs text-[#C27500] py-1 px-2 rounded-full bg-[#FFFADF] font-normal w-fit text-center">
                                    New
                                  </p>
                                ) : item?.container_status.toLowerCase() ===
                                  "file opening" ? (
                                  <p className="text-xs text-[#DB8900] py-1 px-2 rounded-full bg-[#ffe75d33] font-normal w-fit text-center">
                                    In-Progress
                                  </p>
                                ) : item?.container_status.toLowerCase() ===
                                  "in transit" ? (
                                  <p className="text-xs text-[#296FD8] py-1 px-2 rounded-full bg-[#ECFBFF] font-normal w-fit text-center">
                                    In-Transit
                                  </p>
                                ) : (
                                  <p>{item?.container_status}</p>
                                )
                              ) : (
                                "N/A"
                              )}
                            </td>
                            {item.container_tracking_details ? (
                              <td
                                onClick={(e) => {
                                  setFrame(item._id);
                                  setShowMap(true);
                                  setFrameLoading(true);
                                  // scroll();
                                }}
                              >
                                <span className="green-text-2 cursor-pointer">
                                  View Map
                                </span>
                              </td>
                            ) : (
                              <td>N/A</td>
                            )}
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                ) : (
                  <>
                    <table className="booking-details shipment-details container-details">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Cont. Number</th>
                          <th>Status</th>
                          {/* <th>Seal Number</th>
                          <th>Cont. Size (FT)</th>
                          <th>BL Number</th> */}
                          {/* <th>Stuffing Date</th> */}
                          <th>
                            <span className="hidden">nwife</span>
                          </th>
                        </tr>
                      </thead>
                    </table>
                    <div className="flex flex-col justify-center items-center gap-y-2 min-h-[200px]">
                      <p className="grey-text text-xl">No Container(s)</p>
                      <p className="text-sm font-light grey-text-1 max-w-[226px] text-center">
                        Your active containers will be displayed here
                      </p>
                    </div>
                  </>
                )}
                <TrackingModal
                  showMap={showMap}
                  frame={frame}
                  closeModal={closeModal}
                  frameLoading={frameLoading}
                  setFrameLoading={setFrameLoading}
                />
              </div>
            </>

            <div className="grid grid-cols-1 gap-y-8 lg:gap-y-0 lg:grid-cols-2 lg:gap-x-8 mt-8">
              <div className="rounded border-grey-2">
                <div className="p-6 bottom-divider-2 flex items-center gap-x-1">
                  <p>Recent Bookings</p>
                  <p className="text-sm w-[25px] h-[25px] p-1 rounded-[11px] bg-green-100 text-[#3AB44A] flex justify-center items-center">
                    {dashboard_params?.shipments?.recent_bookings.length}
                  </p>
                </div>
                <div className="">
                  {dashboard_params?.shipments?.recent_bookings?.length > 0 ? (
                    dashboard_params?.shipments?.recent_bookings.map((item) => (
                      <RecentBooking key={item._id} item={item} />
                    ))
                  ) : (
                    <div className="p-6 flex justify-center items-center min-h-[500px]">
                      <div className="">
                        <p className="grey-text text-xl">
                          No Recent Booking(s)
                        </p>
                        <p className="text-sm font-light grey-text-1 max-w-[200px] text-center">
                          Your new bookings will be displayed here
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded border-grey-2">
                <div className="p-6 bottom-divider-2 flex items-center gap-x-1">
                  <p>Active Shipments</p>
                  <p className="text-sm w-[25px] h-[25px] p-1 rounded-[11px] bg-blue-100 text-[#4B83F0] flex justify-center items-center">
                    {dashboard_params?.shipments?.active_shipments.length}
                  </p>
                </div>
                <div className="">
                  {dashboard_params?.shipments?.active_shipments?.length > 0 ? (
                    dashboard_params?.shipments?.active_shipments.map(
                      (item) => (
                        <ActiveShipment
                          key={item._id}
                          item={item}
                          isCopied={isCopied}
                          handleCopyClick={handleCopyClick}
                        />
                      )
                    )
                  ) : (
                    <div className="p-6 flex justify-center items-center min-h-[500px]">
                      <div className="">
                        <p className="grey-text text-xl">
                          No Active Shipment(s)
                        </p>
                        <p className="text-sm font-light grey-text-1 max-w-[200px] text-center">
                          Your active shipments will be displayed here
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* <iframe src="https://www.youtube.com/embed/dXBohfjc4WA" width="100%" height="480" title="test"></iframe> */}
            {/* <div className="grid grid-cols-1 gap-y-8 lg:gap-y-0 lg:grid-cols-2 lg:gap-x-8 mt-8 items-start">
              <div className="rounded border-grey-2">
                <div className="p-6 bottom-divider-2 flex items-center gap-x-1">
                  <p>Recent Bookings</p>
                  <p className="text-sm w-[25px] h-[25px] p-1 rounded-[11px] bg-green-100 text-[#3AB44A] flex justify-center items-center">{dashboard_params?.shipments?.recent_bookings.length}</p>
                </div>
                <div className="">
                  {dashboard_params?.shipments?.recent_bookings?.length > 0 ?
                    dashboard_params?.shipments?.recent_bookings.map((item) => (
                      <RecentBooking
                        key={item._id}
                        item={item}
                      />
                    )) :
                    <div className="p-6 flex justify-center items-center min-h-[500px]">
                      <div className="">
                        <p className="grey-text text-xl">No Recent Booking(s)</p>
                        <p className="text-sm font-light grey-text-1 max-w-[200px] text-center">
                          Your new bookings will be displayed here
                        </p>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <div className="rounded border-grey-2">
                <div className="p-6 bottom-divider-2 flex items-center gap-x-1">
                  <p>Active Shipments</p>
                  <p className="text-sm w-[25px] h-[25px] p-1 rounded-[11px] bg-blue-100 text-[#4B83F0] flex justify-center items-center">{dashboard_params?.shipments?.active_shipments.length}</p>
                </div>
                <div className="">
                  {dashboard_params?.shipments?.active_shipments?.length > 0 ?
                    dashboard_params?.shipments?.active_shipments.map((item) => (
                      <ActiveShipment
                        key={item._id}
                        item={item}
                        isCopied={isCopied}
                        handleCopyClick={handleCopyClick}
                      />
                    )) :
                    <div className="p-6 flex justify-center items-center min-h-[500px]">
                      <div className="">
                        <p className="grey-text text-xl">No Active Shipment(s)</p>
                        <p className="text-sm font-light grey-text-1 max-w-[200px] text-center">
                          Your active shipments will be displayed here
                        </p>
                      </div>
                    </div>
                  }
                </div>

              </div>
            </div> */}
          </main>
        </>
      )}
    </Layout>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading, dashboard_params } = state.dashboard;

  return { error, loading, dashboard_params };
};

export default connect(mapStateToProps, { getDashboardParams, clearShipment, clearBooking })(Dashboards);


// {/* <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-3">
// <div className="lg:col-span-2 xl:col-span-1">
//   <p className="font-light grey-text text-sm mb-1.5">Job Number</p>
//   <p className="black-text-3 text-sm flex items-center gap-x-1">
//     <span>{item?.job_number}</span>
//     <img
//       src={isCopied[item._id] ? check : copy}
//       className="cursor-pointer"
//       alt=""
//       onClick={() => handleCopyClick(item.job_number, item._id)}
//     />
//   </p>
// </div>
// <div className="lg:place-self-center">
//   <p className="font-light grey-text text-sm mb-1.5">Est. Shipment Date</p>
//   <p className="black-text-3 text-sm">
//     {item.createdAt ? moment(item.createdAt).format("DD-MM-YYYY") : "N/A"}
//   </p>
// </div>
// <Link
//   to={`/shipments/${item?.["_id"]}`}
//   className="hidden lg:block text-sm green-text-2 self-center place-self-end xl:place-self-center cursor-pointer font-normal"
// >View</Link>
// </div> */}
