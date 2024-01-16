import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//components
import Layout from "components/dock/Layout";
import Button from "components/dock/Button";
import CTA from "components/dock/CTA";
import Partners from "components/dock/Partners";
import RateSearch from "components/dashboard/RateSearch";
import TrackingSearch from "components/dock/TrackingSearch";
import DataCounter from "components/dock/DataCounter";
import CustomerSuccess from "components/dock/CustomerSuccess";
import LoadingSpinner from "components/partials/LoadingSpinner";
import OfapLogin from "components/ofap/OfapLogin";
import HeroCategory from "components/dock/HeroCategory";
//icons
// import divider from "assets/icons/divider.svg";
// import longdivider from "assets/dock/longdivider.svg";
import star from "assets/dock/star.svg";
import rate from "assets/dock/rate.svg";
import link from "assets/dock/link.svg";
import caretrightBlack from "assets/dock/caretright-black.svg";
import caretrightGreen from "assets/dock/caretright-green.svg";
import chevronDown from "assets/dock/chevronwhite-down.svg";
import caretDown from "assets/dock/caretdown-grey.svg"

//images
import oceanfreight from "assets/dock/images/ocean-freight.svg";
import airfreight from "assets/dock/images/airfreight.svg";
import inlandtruck from "assets/dock/images/inlandtruck.svg";

//helpers
import HomeCarousel, { HomeCarouselItem } from "components/dock/HomeCarousel";
import { parseAllPorts, getAllPorts, parseAllPortsNew, getAllowedPorts, formatCurrency } from "helpers";

//libraries
import { useForm } from "react-hook-form";
import { connect, useSelector } from "react-redux";
import moment from "moment";

import { createPublicBooking, createBooking, getLiveRate, getSpecialRate, selectLiveOceanRate, selectSpecialRate } from "store/actions";

//works
const works = [
  {
    id: 1,
    header: "Create an account",
    text: <>Click on <Link to="signup" className="underline">Create Account</Link> to initiate the shipment process. </>,
  },
  {
    id: 2,
    header: "Book a new shipment",
    text: <>Log in to <Link to="signin" className="underline">OnePort 365 </Link>to gain access to our streamlined shipment services, competitive rates, and outstanding customer support. Click on "Start Shipment" to begin.</>
  },
  {
    id: 3,
    header: "Confirm your shipment",
    text: `Our exceptional customer support team will promptly follow up with you and provide updates on all your bookings.`,
  },
  {
    id: 4,
    header: "Track and Monitor Shipment",
    text: `Keep track of your containers in transit with our reliable tracker, allowing you to stay informed about their whereabouts.`,
  },
];

const AccordionItem = (props: any) => {
  const contentEl = useRef<HTMLDivElement>(null);
  const { handleToggle, active, works } = props;
  const { header, id, text } = works;

  return (
    <div>
      <div className={`flex justify-between items-start cursor-pointer`} onClick={() => handleToggle(id)}>
        <div className="flex gap-x-6 lg:gap-x-8">
          <p className="text-white font-medium text-xl lg:text-2xl sato">{id}.</p>
          <p className="text-white font-medium text-xl lg:text-2xl flex items-center sato">{header} </p>
        </div>
        <div><img className={`min-w-[24px] transition-all ${active === id ? "rotate-180" : ""}`} src={chevronDown} alt="" /></div>
      </div>
      <div
        ref={contentEl} className={`mt-3 ml-[43px] lg:ml-[52px] text-[#ffffffb3] text-lg font-light relative h-0 overflow-hidden transition-[height] ease-in duration-75 sato ${active === id ? "h-auto" : ""}`}
        style={
          //@ts-ignore
          active === id
            ? { height: contentEl?.current?.scrollHeight }
            : { height: "0px" }
        }
      >
        {text}
      </div>
    </div>
  );
};

const SingleSpecialRate = ({ item, shipment_data, toShipmentInformation, user, setShowLogin, selecting_special_rate, selecting_special }) => (
  <div
    className="p-5 rounded-[10px] cursor-pointer border-[2px] border-solid border-[#E5E7EB] hover:border-[#139C33]"
    onClick={() => {
      if (!selecting_special) {
        toShipmentInformation(item?.special_rate_id, item?.destination_port_code)
      } else {
        console.log("loading!!!!")
      }
    }}
  >
    <div className="flex items-center justify-between">
      <p className="text-sm text-black font-medium">{item?.carrier_name}</p>
      <div className={`black-text-3 flex text-sm font-normal items-center gap-x-2`}>
        <p>{item?.origin_port_code}</p>
        <span><img src={link} alt="" /></span>
        <p>{item?.destination_port_code}</p>
      </div>
    </div>
    <div className="mt-3 mb-6 flex items-center justify-between">
      <p className={`text-xl font-normal text-[#004800]`}>
      {item?.total_amount_usd
        ? formatCurrency(item?.total_amount_usd, "USD")
        : "N/A"}
      </p>
      <p className="flex justify-end mb-2">{selecting_special_rate[item?.special_rate_id] && <LoadingSpinner height="5" top={false} />}</p>
    </div>
    <div className="top-divider text-sm pt-6 grid grid-cols-3">
      <div>
        <p className="grey-text font-light mb-1.5">Sailing Date</p>
        <p className={`black-text-3`}>
          {item?.sailing_date
            ? moment(item?.sailing_date).format("DD-MM-YYYY")
            : "N/A"}</p>
      </div>
      <div>
        <p className="grey-text font-light mb-1.5">Transit Time</p>
        <p className={`black-text-3`}>
          {item?.transit_time
            ? item?.transit_time === 0
              ? "N/A"
              : item?.transit_time + " days"
            : "N/A"}</p>
      </div>
      <div>
        <p className="grey-text font-light mb-1.5">Free Days</p>
        <p className={`black-text-3`}>
          {item?.detention_days === "N/A" ? 0 + item?.demurrage_days : item?.demurrage_days === "N/A" ? 0 + item?.detention_days : item?.detention_days + item?.demurrage_days}
          {" "}days
        </p>
      </div>
    </div>
  </div>
)

const DummySpecialRate = ({ item }) => (
  <div className="p-5 rounded-[10px] cursor-pointer border-[2px] border-solid border-[#E5E7EB] hover:border-[#139C33]">
    <div className="flex items-center justify-between">
      <p className="text-sm text-black font-medium">{item?.toUpperCase()}</p>
      <div className={`black-text-3 flex text-sm font-normal items-center gap-x-2 ${true ? 'blur-sm' : ''}`}>
        <p>N/AN/A</p>
        <span><img src={link} alt="" /></span>
        <p>N/AN/A</p>
      </div>
    </div>
    <div className="mt-3 mb-6 flex items-center justify-between">
      <p className={`text-xl font-normal text-[#004800] ${true ? 'blur-sm' : ''}`}>
       $N/A/N/A
      </p>
    </div>
    <div className="top-divider text-sm pt-6 grid grid-cols-3">
      <div>
        <p className="grey-text font-light mb-1.5">Sailing Date</p>
        <p className={`black-text-3 ${true ? 'blur-sm' : ''}`}>N/A/date</p>
      </div>
      <div>
        <p className="grey-text font-light mb-1.5">Transit Time</p>
        <p className={`black-text-3 ${true ? 'blur-sm' : ''}`}>N/A/date</p>
      </div>
      <div>
        <p className="grey-text font-light mb-1.5">Free Days</p>
        <p className={`black-text-3 ${true ? 'blur-sm' : ''}`}>N/A/date
        </p>
      </div>
    </div>
  </div>
)

const SingleLiner = ({ liner, selectedLiner, setSelectedLiner }) => (
  <div
    className={`flex items-center gap-x-2 px-4 py-3 border-solid border-[1px] border-[#9CA3AF] rounded w-auto min-w-fit cursor-pointer ${liner?.toLowerCase() === selectedLiner?.toLowerCase() ? "bg-[#1F2937] text-white border-[0px]" : "border-[#9CA3AF] text-[#1F2937]"}`}
    onClick={() => setSelectedLiner(liner?.toLowerCase())}
  >
    {liner}
  </div>
)

const _Json = require("sea-ports");

const Dock = (props: any) => {
  const { error, loading, shipment_data, createPublicBooking, getLiveRate, live_rates, live_rate_loading, selecting_live_ocean_rate, selectLiveOceanRate, getSpecialRate, getting_special_rates, special_rates, createBooking, selectSpecialRate, selecting_special_rate, special_rate_data, selecting_special } = props;

  const { handleSubmit, control, resetField, formState: { errors }, reset } = useForm();

  let user = useSelector((state: any) => state.auth.user_data);
  let country = useSelector((state: any) => state.auth.user_country);
  console.log('country>>>', country)

  // @ts-ignore
  user = user ? user : localStorage.getItem("user_data");

  const [id, setId] = useState(""); //ID gotten from select special rate

  const [heroText, setHeroText] = useState("Book Your International Shipments In Minutes");
  const [heroCategory, setHeroCategory] = useState("ocean_freight");

  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  const scrollref = useRef<HTMLDivElement>(null);

  const [haulageId, setHaulageId] = useState("");
  const [customId, setCustomId] = useState("");

  const [jobNumber, setJobNumber] = useState("")
  const [showLogin, setShowLogin] = useState(false);

  const [haulageCategory, setHaulageCategory] = useState("porttodoor")

  const [originPort, setOriginPort] = useState<string | {}>("");

  const [specialRates, setSpecialRates] = useState<any[]>([]);

  const [linerList, setLinerList] = useState<any[]>([]);
  const [selectedLiner, setSelectedLiner] = useState("");
  const [linerCount, setLinerCount] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(9);

  const sizeref = useRef<HTMLDivElement>(null);
  const typeref = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState("20FT");
  const [type, setType] = useState("DRY");

  const [showContainerType, setShowContainerType] = useState(false);
  const [showContainerSize, setShowContainerSize] = useState(false);

  const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
  const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
  const [allPorts, setAllPorts] = useState([]);
  const [allowedPorts, setAllowedPorts] = useState([]);

  //fetches the ports
  useEffect(() => {
    //@ts-ignore
    const parsePorts = parseAllPortsNew(_Json.JSON, originPort?.value?.country);
    setDefaultPortsOfOrigin(parsePorts.origin);
    setDefaultPortsOfDestination(parsePorts.destination);
    setAllPorts(getAllPorts(_Json.JSON))
    setAllowedPorts(getAllowedPorts(_Json.JSON))
    resetField("destination_port")
  }, [originPort]);

  //function that contorls accordion
  const handleToggle = (index: any) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  //function is obsolete, used to close login modal that shows on clicking special rates as a logged out user
  const closeLoginModal = () => {
    setShowLogin(false);
  }

  //call back function that determines navigation after a booking is created for an ocean freight
  const goToFreightRates = (booking_id) => {
    user ? navigate(`/freight-rates/${booking_id}`, { state: { source: "public" } }) : navigate(`/openfreight-rates/${booking_id}`, { state: { source: "public" } })
  }

  const goToHaulageBooking = (booking_id) => {
    if(user){
      navigate(`/haulages-details/${booking_id}`) 
    }else {
      setShowLogin(true);
      setHaulageId(booking_id)
      sessionStorage.setItem("haulageId", booking_id);
    }
  }

  const goToCustomsBooking = (booking_id) => {
    if(user){
      navigate(`/customs-brokerage/${booking_id}`) 
    }else {
      setShowLogin(true);
      setCustomId(booking_id)
      sessionStorage.setItem("customId", booking_id);
    }
  }

  //submits the form rates
  const onSubmit = (data: any) => {
    const destinationPorts = ["nigeria", "ghana", "kenya", "senegal", "cameroon", "côte d'ivoire" ]

    const _data = {
      // "shipment_type": data?.origin_port?.value?.country?.toLowerCase() === "nigeria" || data.origin_port.value.country?.toLowerCase() === "ghana" || data.origin_port.value.country?.toLowerCase() === "kenya" ? "export" : "import",
      "shipment_type": destinationPorts.includes(data?.origin_port?.value?.country?.toLowerCase()) ? "export" : "import",
      "shipment_transport_type": 'ocean_freight',
      "origin_port_code": data?.origin_port?.value?.unlocs[0],
      "destination_port_code": data?.destination_port?.value?.unlocs[0],
      "container_size": data.container_size.value.split("|")[0].trim(""),
      "container_type": data.container_size.value.split("|")[1].trim(""),
      "cargo_ready_date": data.cargo_ready_date
    }

    const _importData = {
      shipment_type: "import",
      shipment_transport_type:"haulage",
      port_of_discharge: data?.origin_port?.value?.unlocs[0],
      delivery_location: data?.location?.label,
      container_size: data.container_size.value.split("|")[0].trim(""),
      container_type: data.container_size.value.split("|")[1].trim(""),
      container_weight: data?.container_weight
    }

    const _exportData = {
      shipment_type: "export",
      shipment_transport_type:"haulage",
      port_of_loading: data?.origin_port?.value?.unlocs[0],
      stuffing_location: data?.location?.label,
      container_size: data.container_size.value.split("|")[0].trim(""),
      container_type: data.container_size.value.split("|")[1].trim(""),
      container_weight: data?.container_weight
    }

    let _brokerageData: any = {
      shipment_type: data?.shipment_type?.value,
      shipment_transport_type: "customs_brokerage",
      container_size: data.container_size.value.split("|")[0].trim(""),
      container_type: data.container_size.value.split("|")[1].trim(""),
      goods_type: data.commodity_type
    }

    _brokerageData = data?.shipment_type?.value === 'import' 
    ? { ..._brokerageData, port_of_discharge : data?.origin_port?.value?.unlocs[0] } 
    : { ..._brokerageData, port_of_loading: data?.origin_port?.value?.unlocs[0] }

    if (!user) {
      if(heroCategory === "ocean_freight"){
        createPublicBooking(_data, goToFreightRates);
      }else if(heroCategory === "haulage"){
        createPublicBooking(haulageCategory === "porttodoor" ? _importData : _exportData, goToHaulageBooking)
      }else if(heroCategory === "custom_brokerage"){
        createPublicBooking(_brokerageData, goToCustomsBooking)
      }
    } else {
      if(heroCategory === "ocean_freight"){
        createBooking(_data, goToFreightRates);
      }else if(heroCategory === "haulage"){
        createBooking(haulageCategory === "porttodoor" ? _importData : _exportData, goToHaulageBooking)
      }else if(heroCategory === "custom_brokerage"){
        createBooking(_brokerageData, goToCustomsBooking);
      }
    }
  }

  console.log('heroCategory>>>', heroCategory)
  //callback function that navigates teh user to a page after his tracking info is searched
  const trackSubmit = (data: any) => {
    // if(user){
    //   navigate(`/container?j=${data.job_number}`)
    // } else {
    //   sessionStorage.setItem("jobNumber", data.job_number);
    //   setJobNumber("")
    //   setShowLogin(true);
    // }
    navigate(`/open-container?j=${data.job_number}`)
  }

  //scroll in function
  useEffect(() => {
    scrollref?.current?.scrollIntoView({ behavior: 'smooth', block: "center"})
  }, [itemsPerPage]);

  //set the special rate to an array
  useEffect(() => {
    let uniqueLiners: any = [];
    user && special_rates.forEach((liner) => {
      if (!uniqueLiners.includes(liner?.carrier_name.trim())) {
        uniqueLiners.push(liner?.carrier_name.trim())
      }
    })

    let _uniqueLiners: any = [];
    _uniqueLiners = !user && Object.keys(special_rates)

    user ? setLinerList(uniqueLiners) : setLinerList(_uniqueLiners)
    user ? setSelectedLiner(uniqueLiners[0]) : setSelectedLiner(_uniqueLiners[0])

    user && setSpecialRates(special_rates?.filter((item) => item?.carrier_name.trim() === uniqueLiners[0].trim()));
  }, [special_rates, user]);

  //sorts the special rate
  useEffect(() => {
    //const original = [live_rates?.ocean_freight?.filter((item) => item?.rates_data?.offer_type.toLowerCase() === "contract")]
    if (selectedLiner) {
      setItemsPerPage(9);
      if(user){
        setSpecialRates(special_rates?.filter((item) => item?.carrier_name.trim().toLowerCase() === selectedLiner.trim().toLowerCase()))
      }else if(!user){
        setLinerCount(special_rates[selectedLiner?.toUpperCase()])
      };
    } 
  }, [selectedLiner, user])


  //to shipment information, callback function for the special rate card.
  const toShipmentInformation = (rateId, destination) => {
    const destinationCodes = ["GHTEM", "GHTKD", "KEMBA", "KENBO", "NGAPP", "NGCBQ", "NGLOS", "NGONN", "NGPHC", "NGTIN", "NGWAR", "SNDKR", "CMDLA", "CIABJ", "CISPY"];

    selectSpecialRate({
      "shipment_type": destinationCodes.includes(destination) ? "import" : "export",
      "container_size": size,
      "container_type": type?.toLowerCase(),
      "special_rate_id": rateId
    },
      (id) => {
        //the id here is gotten from the callback function passed to the saga
        if (user) {
          navigate(`/shipment-information/${id}`, { state: { id: shipment_data?._id } })
        } else {
          sessionStorage.setItem("shipmentId", id);
          setId(id);
          setShowLogin(true);
        }
      } 
    )
  }

  //fetches the special rates
  useEffect(() => {
    ((user !== undefined) || (user !== '')) && getSpecialRate({
      container_type: type.toLowerCase(),
      container_size: size
    })
  }, [size, type, user])

  //creating the click outside to close drop down effect
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu, then close the menu
      if (showContainerSize && sizeref.current && !sizeref.current.contains(e.target)) {
        setShowContainerSize(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showContainerSize]);

  //creating the click outside to close drop down effect
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu, then close the menu
      if (showContainerType && typeref.current && !typeref.current.contains(e.target)) {
        setShowContainerType(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showContainerType]);

  // console.log("special_rates>>>", special_rates);
  // console.log('counts>>', linerCount)
  // console.log("selected>>>", selectedLiner)
  // console.log(">>ser", special_rates.filter(item => item.carrier_name.includes("MSC")))
  // console.log("special>>", specialRates)
  // console.log("liner", linerList);
  // console.log("shipmentDa>>>", shipment_data)
  // console.log("theRaTes>>>", specialRates);
  // console.log("live>>>", specialRates)
  // console.log("selectedLiner>>>", selectedLiner)
 

  return (
    <Layout isNav={true}>
      <div className="dock mt-[-93px] pt-[93px]">
        <div className="max-w-[1200px] h-auto lg:h-[528px] mx-auto flex flex-col justify-center items-center gap-x-[10px] px-6 py-12 lg:py-20">
          <h1 className={`text-white sato font-medium md:font-semibold lg:font-bold text-[32px] md:text-[40px] lg:text-[54px] mx-auto ${heroCategory === "haulage" ? 'max-w-[867px]' : 'max-w-[747px]'} leading-[35px] md:leading-[45px] lg:leading-[65px] xl:leading-[74px] text-center mb-10 lg:mb-14`}>{heroText}</h1>
          <div className="bg-white w-full md:w-[500px] lg:w-full rounded-[10px] relative z-[25]">
              <div className={`flex max-w-[479px] overflow-x-auto xsm:max-w-none border-solid border-b-[2px] border-[#e5e7eb4d] ${heroCategory === 'haulage' ? 'mb-3' : 'mb-8' } rounded-tr-[10px]`}>
                {/* <div
                  className={`flex items-center gap-x-2 mb-6 px-6 py-4 ${heroCategory === "ocean_freight" ? "bg-[#3AB44A] rounded-tl-[10px]" : "bg-transparent"} pb-4 w-fit cursor-pointer`}
                  onClick={() => {
                    setHeroCategory("rates");
                    setHeroText("Book Your International Shipments In Minutes")
                  }}
                >
                  <div>
                    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="m6.037 12.318 2.495-3.242 2.845 2.235 2.44-3.15" stroke={heroCategory === "ocean_freight" ? "#FFF" : "#6B7280"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <circle cx="16.663" cy="3.5" stroke={heroCategory === "ocean_freight" ? "#FFF" : "#6B7280"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" r="1.602" />
                      <path d="M12.437 2.6H6.381c-2.51 0-4.066 1.777-4.066 4.287v6.735c0 2.51 1.525 4.28 4.066 4.28h7.17c2.51 0 4.065-1.77 4.065-4.28V7.756" stroke={heroCategory === "ocean_freight" ? "#FFF" : "#6B7280"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <p className={`text-sm font-light ${heroCategory === "ocean_freight" ? 'text-white' : 'black-text-3'}`}>Ocean Freight</p>
                </div> */}
                <HeroCategory 
                    svg={
                    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.279 6.542c-.163.095-.154.18.128 1.26.147.565.26 1.043.248 1.061-.01.018-.097.044-.19.058-.354.053-.91.206-.972.267-.056.056-.065.263-.082 1.955l-.019 1.892-.21.077c-.823.299-1.594.614-1.634.667-.036.048-.048.373-.048 1.313v1.25l.102.08c.1.08.13.08 1.437.07 1.27-.01 1.337-.015 1.388-.085.085-.116.069-.312-.03-.382-.073-.05-.255-.06-1.224-.06H3.035v-1.859l.831-.308c5.086-1.889 10.613-3.332 15.875-4.147.349-.053.657-.098.684-.098.124 0-.063 1.19-.29 1.84-.288.827-.543 1.205-1.429 2.111-.948.97-1.458 1.629-1.74 2.242l-.1.22h-2.3c-2.554 0-2.473-.008-2.471.24.001.304-.086.294 2.629.294 2.352 0 2.407-.002 2.503-.077a.406.406 0 0 0 .125-.2c.053-.248.363-.783.7-1.212.278-.351.649-.76 1.21-1.335.802-.82 1.099-1.282 1.395-2.171.23-.695.343-1.356.343-2.017 0-.31-.01-.364-.081-.436-.072-.071-.11-.078-.316-.057-.394.042-1.943.289-2.89.461l-.898.164-1.346-.777a72.773 72.773 0 0 0-1.478-.84c-.124-.06-.192-.06-.986.002-.47.036-1.09.086-1.38.111l-.524.046-.036-.115c-.404-1.304-.461-1.458-.558-1.502-.067-.03-.416-.045-1.092-.045H8.42l-.094.094c-.051.051-.093.124-.092.162 0 .038.101.42.223.85.151.531.21.791.18.807a1.455 1.455 0 0 1-.29.05l-.248.024-.279-.927c-.197-.654-.302-.946-.358-.993-.07-.06-.182-.067-1.097-.066-.64 0-1.044.016-1.087.041Zm2.063 1.255.232.763-.12.02-.635.097a9.9 9.9 0 0 0-.563.093c-.027.01-.061-.04-.084-.125l-.227-.876-.19-.735H7.11l.232.763Zm3.038-.172c.1.314.178.574.173.579-.004.004-.305.04-.668.08l-.66.07-.073-.25c-.04-.137-.12-.412-.176-.612-.057-.2-.111-.384-.121-.41-.015-.04.123-.047.662-.039l.681.01.182.572Zm3.648.997c.134.075.245.148.245.162 0 .014-.443.1-.985.191-3.293.556-6.232 1.21-8.16 1.816l-.182.056V9.566l.488-.1c1.707-.356 3.704-.602 7.596-.937.699-.06.728-.057.998.094Zm1.495.863c.38.218.464.281.408.304-.04.016-.407.1-.817.186-2.28.481-5.115 1.233-7.61 2.017a83.86 83.86 0 0 0-2.49.825c-.063.025-.068-.023-.068-.696v-.723l.64-.196c1.944-.595 4.566-1.159 8.457-1.819.537-.091.981-.167.989-.17.007-.001.228.12.492.272Zm-.015 2.36a.257.257 0 0 0-.086.42c.178.178.508-.018.43-.254-.043-.127-.22-.212-.344-.165Zm-1.655.445a.255.255 0 0 0 .011.343c.155.154.447.036.447-.182a.255.255 0 0 0-.458-.16Zm-1.505.32c-.252.197.002.566.285.414.234-.124.115-.487-.161-.493a.461.461 0 0 0-.124.079Zm-5.45 3.456c-.104.132-.1.226.015.34.09.09.116.094.556.094.44 0 .467-.005.556-.094.118-.117.12-.25.005-.357-.08-.077-.128-.083-.57-.083-.476 0-.483.001-.562.1Zm2.644-.041c-.058.04-.085.098-.085.181.001.248.106.294.668.294.42 0 .448-.005.537-.094.118-.117.12-.25.006-.357-.081-.076-.129-.083-.565-.083-.37 0-.496.013-.561.059Z" fill={heroCategory === "ocean_freight" ? "#FFF" : "#6B7280"}  />
                      <path clip-rule="evenodd" d="M5.279 6.542c-.163.095-.154.18.128 1.26.147.565.26 1.043.248 1.061-.01.018-.097.044-.19.058-.354.053-.91.206-.972.267-.056.056-.065.263-.082 1.955l-.019 1.892-.21.077c-.823.299-1.594.614-1.634.667-.036.048-.048.373-.048 1.313v1.25l.102.08c.1.08.13.08 1.437.07 1.27-.01 1.337-.015 1.388-.085.085-.116.069-.312-.03-.382-.073-.05-.255-.06-1.224-.06H3.035v-1.859l.831-.308c5.086-1.889 10.613-3.332 15.875-4.147.349-.053.657-.098.684-.098.124 0-.063 1.19-.29 1.84-.288.827-.543 1.205-1.429 2.111-.948.97-1.458 1.629-1.74 2.242l-.1.22h-2.3c-2.554 0-2.473-.008-2.471.24.001.304-.086.294 2.629.294 2.352 0 2.407-.002 2.503-.077a.406.406 0 0 0 .125-.2c.053-.248.363-.783.7-1.212.278-.351.649-.76 1.21-1.335.802-.82 1.099-1.282 1.395-2.171.23-.695.343-1.356.343-2.017 0-.31-.01-.364-.081-.436-.072-.071-.11-.078-.316-.057-.394.042-1.943.289-2.89.461l-.898.164-1.346-.777a72.773 72.773 0 0 0-1.478-.84c-.124-.06-.192-.06-.986.002-.47.036-1.09.086-1.38.111l-.524.046-.036-.115c-.404-1.304-.461-1.458-.558-1.502-.067-.03-.416-.045-1.092-.045H8.42l-.094.094c-.051.051-.093.124-.092.162 0 .038.101.42.223.85.151.531.21.791.18.807a1.455 1.455 0 0 1-.29.05l-.248.024-.279-.927c-.197-.654-.302-.946-.358-.993-.07-.06-.182-.067-1.097-.066-.64 0-1.044.016-1.087.041Zm2.063 1.255.232.763-.12.02-.635.097a9.9 9.9 0 0 0-.563.093c-.027.01-.061-.04-.084-.125l-.227-.876-.19-.735H7.11l.232.763Zm3.038-.172c.1.314.178.574.173.579-.004.004-.305.04-.668.08l-.66.07-.073-.25c-.04-.137-.12-.412-.176-.612-.057-.2-.111-.384-.121-.41-.015-.04.123-.047.662-.039l.681.01.182.572Zm3.648.997c.134.075.245.148.245.162 0 .014-.443.1-.985.191-3.293.556-6.232 1.21-8.16 1.816l-.182.056V9.566l.488-.1c1.707-.356 3.704-.602 7.596-.937.699-.06.728-.057.998.094Zm1.495.863c.38.218.464.281.408.304-.04.016-.407.1-.817.186-2.28.481-5.115 1.233-7.61 2.017a83.86 83.86 0 0 0-2.49.825c-.063.025-.068-.023-.068-.696v-.723l.64-.196c1.944-.595 4.566-1.159 8.457-1.819.537-.091.981-.167.989-.17.007-.001.228.12.492.272Zm-.015 2.36a.257.257 0 0 0-.086.42c.178.178.508-.018.43-.254-.043-.127-.22-.212-.344-.165Zm-1.655.445a.255.255 0 0 0 .011.343c.155.154.447.036.447-.182a.255.255 0 0 0-.458-.16Zm-1.505.32c-.252.197.002.566.285.414.234-.124.115-.487-.161-.493a.461.461 0 0 0-.124.079Zm-5.45 3.456c-.104.132-.1.226.015.34.09.09.116.094.556.094.44 0 .467-.005.556-.094.118-.117.12-.25.005-.357-.08-.077-.128-.083-.57-.083-.476 0-.483.001-.562.1Zm2.644-.041c-.058.04-.085.098-.085.181.001.248.106.294.668.294.42 0 .448-.005.537-.094.118-.117.12-.25.006-.357-.081-.076-.129-.083-.565-.083-.37 0-.496.013-.561.059Z" stroke={heroCategory === "ocean_freight" ? "#FFF" : "#6B7280"}  stroke-width=".2" mask="url(#a)" />
                    </svg>
                    }
                    text='ocean_freight'
                    heroText={'Book Your International Shipments In Minutes'}
                    name={"Ocean Freight"}
                    heroCategory={heroCategory}
                    setHeroCategory={setHeroCategory}
                    setHeroText={setHeroText}
                    reset={reset}
                />
                {country && country !== "KE" && (<>
                  <HeroCategory 
                      svg={
                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.734 5.553a.745.745 0 0 0-.372.416c-.058.203-.051 5.877.007 5.987.109.203.328.243.484.087l.096-.096V6.123H16.02v2.873c0 2.11.012 2.897.045 2.96.109.203.328.243.484.087.08-.081.096-.134.096-.332v-.236h1.924c1.168 0 1.98.015 2.065.04.198.054.38.186.53.383.21.275.203.28-.4.28-.51 0-.532.003-.625.095-.091.092-.096.12-.096.572 0 .602.042.744.292.994.227.228.398.292.777.292h.26v1.406h-.804l-.121-.244c-.722-1.457-2.82-1.457-3.542.001-.08.161-.142.242-.181.234-.052-.01-.062-.185-.08-1.27-.02-1.38-.015-1.351-.262-1.4-.105-.021-.144-.006-.244.093l-.118.12v2.466H9.539l-.081-.184c-.347-.782-1.222-1.264-2.078-1.143-.618.086-1.24.536-1.499 1.083l-.116.244-.898-.01-.898-.01v-.703l.75-.01.75-.01.08-.103c.105-.134.1-.258-.015-.392l-.094-.11H2.184l-.094.11c-.116.134-.12.258-.013.393l.08.103H3.325v.4c.002.305.019.438.073.557.168.366.307.406 1.393.408l.86.002.048.3c.262 1.648 2.306 2.26 3.424 1.025.223-.246.444-.695.475-.962.012-.103.03-.227.04-.275l.017-.088h7.014l.06.322c.08.42.226.722.488 1.005.427.461.832.638 1.46.638s1.033-.177 1.46-.638c.268-.29.406-.57.485-.99l.063-.331.562-.013.562-.012.096-.112.096-.112-.012-1.9c-.01-1.849-.013-1.906-.096-2.108-.193-.47-.634-.876-1.073-.989-.132-.033-.21-.078-.233-.13-.018-.044-.14-.506-.27-1.028l-.235-.95.122-.102.122-.103-.016-.413c-.014-.355-.03-.442-.123-.62-.126-.243-.354-.483-.561-.587-.276-.14-.525-.163-1.768-.163h-1.206l-.013-.46c-.011-.41-.023-.472-.107-.59a.746.746 0 0 0-.253-.204c-.154-.07-.395-.073-6.294-.072-5.038 0-6.154.01-6.25.053Zm15.594 1.986a.756.756 0 0 1 .351.475l.023.14h-3.057v-.707l1.28.012c1.13.01 1.293.02 1.403.08ZM11.09 9.94l-1.438 1.435-.752-.749c-.479-.477-.79-.758-.86-.775-.22-.053-.428.201-.34.414.024.058.444.503.933.99.81.804.902.884 1.022.884.123 0 .253-.12 1.725-1.593 1.45-1.45 1.593-1.604 1.593-1.72a.326.326 0 0 0-.319-.32c-.114 0-.266.139-1.564 1.434Zm8.594-.136c.134.543.244 1 .243 1.016 0 .016-.74.03-1.642.03h-1.64V8.817h2.794l.245.986Zm1.688 3.35v.352h-.25c-.216 0-.261-.014-.35-.103-.09-.09-.104-.135-.104-.352v-.248h.704v.351Zm-18.598-.198c-.14.14-.147.286-.018.415l.096.096H4.96c1.16 0 2.136-.011 2.171-.024.071-.028.178-.213.178-.31 0-.034-.052-.114-.115-.177l-.114-.114H2.888l-.114.114Zm7.437 1.253a.32.32 0 0 0-.188.35c.054.245-.05.236 2.663.236h2.469l.08-.103c.107-.135.103-.259-.013-.393l-.094-.11-2.415-.007c-1.352-.005-2.454.007-2.502.027Zm-2.258.645c.339.055.736.366.914.714.174.342.175.844.002 1.185-.517 1.018-1.928 1.02-2.428.004-.116-.235-.128-.295-.127-.594.001-.281.018-.367.109-.554.191-.396.59-.705 1-.775.178-.03.232-.028.53.02Zm10.939-.017c.6.111 1.06.593 1.134 1.19.05.404-.17.935-.491 1.19a1.353 1.353 0 0 1-2.17-.738c-.188-.74.324-1.514 1.086-1.64.113-.02.207-.037.208-.04.002-.002.106.015.233.038Zm-11.574.776c-.48.3-.371 1.012.18 1.177.312.094.712-.143.77-.456.085-.448-.15-.763-.587-.788-.186-.01-.263.004-.363.067Zm11.051-.01c-.387.191-.443.792-.099 1.063a.63.63 0 0 0 .86-.051.641.641 0 0 0 .06-.836c-.164-.229-.546-.31-.82-.176Z" fill={heroCategory === "haulage" ? "#FFF" : "#6B7280"} />
                          <path clip-rule="evenodd" d="M3.734 5.553a.745.745 0 0 0-.372.416c-.058.203-.051 5.877.007 5.987.109.203.328.243.484.087l.096-.096V6.123H16.02v2.873c0 2.11.012 2.897.045 2.96.109.203.328.243.484.087.08-.081.096-.134.096-.332v-.236h1.924c1.168 0 1.98.015 2.065.04.198.054.38.186.53.383.21.275.203.28-.4.28-.51 0-.532.003-.625.095-.091.092-.096.12-.096.572 0 .602.042.744.292.994.227.228.398.292.777.292h.26v1.406h-.804l-.121-.244c-.722-1.457-2.82-1.457-3.542.001-.08.161-.142.242-.181.234-.052-.01-.062-.185-.08-1.27-.02-1.38-.015-1.351-.262-1.4-.105-.021-.144-.006-.244.093l-.118.12v2.466H9.539l-.081-.184c-.347-.782-1.222-1.264-2.078-1.143-.618.086-1.24.536-1.499 1.083l-.116.244-.898-.01-.898-.01v-.703l.75-.01.75-.01.08-.103c.105-.134.1-.258-.015-.392l-.094-.11H2.184l-.094.11c-.116.134-.12.258-.013.393l.08.103H3.325v.4c.002.305.019.438.073.557.168.366.307.406 1.393.408l.86.002.048.3c.262 1.648 2.306 2.26 3.424 1.025.223-.246.444-.695.475-.962.012-.103.03-.227.04-.275l.017-.088h7.014l.06.322c.08.42.226.722.488 1.005.427.461.832.638 1.46.638s1.033-.177 1.46-.638c.268-.29.406-.57.485-.99l.063-.331.562-.013.562-.012.096-.112.096-.112-.012-1.9c-.01-1.849-.013-1.906-.096-2.108-.193-.47-.634-.876-1.073-.989-.132-.033-.21-.078-.233-.13-.018-.044-.14-.506-.27-1.028l-.235-.95.122-.102.122-.103-.016-.413c-.014-.355-.03-.442-.123-.62-.126-.243-.354-.483-.561-.587-.276-.14-.525-.163-1.768-.163h-1.206l-.013-.46c-.011-.41-.023-.472-.107-.59a.746.746 0 0 0-.253-.204c-.154-.07-.395-.073-6.294-.072-5.038 0-6.154.01-6.25.053Zm15.594 1.986a.756.756 0 0 1 .351.475l.023.14h-3.057v-.707l1.28.012c1.13.01 1.293.02 1.403.08ZM11.09 9.94l-1.438 1.435-.752-.749c-.479-.477-.79-.758-.86-.775-.22-.053-.428.201-.34.414.024.058.444.503.933.99.81.804.902.884 1.022.884.123 0 .253-.12 1.725-1.593 1.45-1.45 1.593-1.604 1.593-1.72a.326.326 0 0 0-.319-.32c-.114 0-.266.139-1.564 1.434Zm8.594-.136c.134.543.244 1 .243 1.016 0 .016-.74.03-1.642.03h-1.64V8.817h2.794l.245.986Zm1.688 3.35v.352h-.25c-.216 0-.261-.014-.35-.103-.09-.09-.104-.135-.104-.352v-.248h.704v.351Zm-18.598-.198c-.14.14-.147.286-.018.415l.096.096H4.96c1.16 0 2.136-.011 2.171-.024.071-.028.178-.213.178-.31 0-.034-.052-.114-.115-.177l-.114-.114H2.888l-.114.114Zm7.437 1.253a.32.32 0 0 0-.188.35c.054.245-.05.236 2.663.236h2.469l.08-.103c.107-.135.103-.259-.013-.393l-.094-.11-2.415-.007c-1.352-.005-2.454.007-2.502.027Zm-2.258.645c.339.055.736.366.914.714.174.342.175.844.002 1.185-.517 1.018-1.928 1.02-2.428.004-.116-.235-.128-.295-.127-.594.001-.281.018-.367.109-.554.191-.396.59-.705 1-.775.178-.03.232-.028.53.02Zm10.939-.017c.6.111 1.06.593 1.134 1.19.05.404-.17.935-.491 1.19a1.353 1.353 0 0 1-2.17-.738c-.188-.74.324-1.514 1.086-1.64.113-.02.207-.037.208-.04.002-.002.106.015.233.038Zm-11.574.776c-.48.3-.371 1.012.18 1.177.312.094.712-.143.77-.456.085-.448-.15-.763-.587-.788-.186-.01-.263.004-.363.067Zm11.051-.01c-.387.191-.443.792-.099 1.063a.63.63 0 0 0 .86-.051.641.641 0 0 0 .06-.836c-.164-.229-.546-.31-.82-.176Z" stroke={heroCategory === "haulage" ? "#FFF" : "#6B7280"} stroke-width=".1" mask="url(#a)" />
                        </svg>
                      }
                      text='haulage'
                      heroText={'We Ensure Your Cargo Reaches Its Destination Safely And On Time'}
                      name={"Haulage"}
                      heroCategory={heroCategory}
                      setHeroCategory={setHeroCategory}
                      setHeroText={setHeroText}
                      reset={reset}
                  />
                  <HeroCategory 
                      svg={
                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.895 3.928c-.19.06-.48.361-.539.559a1.727 1.727 0 0 0-.047.399v.237l-1.455.012-1.456.011-.254.12a1.63 1.63 0 0 0-.758.76l-.12.253-.012 1.61-.011 1.61-2.372.012-2.371.01-.176.092c-.24.126-.455.338-.58.572l-.103.196v6.992l.104.195c.124.234.34.447.58.572l.175.092 2.374.011 2.373.011-.023.094c-.04.16.057.654.178.902.152.314.429.588.743.737l.253.12h10.82l.255-.12c.322-.153.6-.432.757-.758l.122-.254V6.279l-.12-.254a1.63 1.63 0 0 0-.76-.758l-.253-.12-1.455-.012-1.455-.012v-.262c-.002-.453-.25-.828-.622-.94-.203-.06-3.599-.054-3.793.007Zm.235.623c-.184.095-.198.18-.187 1.092.01.825.013.852.1.938l.088.089h3.355l.09-.09c.087-.087.088-.104.088-.984s-.002-.898-.089-.986l-.089-.089-1.63-.01c-1.258-.007-1.652.002-1.726.04ZM9.563 5.807a.923.923 0 0 0-.575.475l-.097.19-.012 1.515-.012 1.515h.939l.011-1.377c.015-1.862-.098-1.724 1.427-1.74l1.065-.012v-.621l-1.28.003c-.912.001-1.333.017-1.466.052Zm7.746.253v.313l1.064.012c1.192.013 1.185.011 1.355.31l.081.143-.01 5.834c-.01 5.709-.012 5.836-.086 5.934-.042.055-.12.134-.176.175-.097.075-.213.077-4.68.087-5.017.01-4.686.025-4.911-.216a.572.572 0 0 1-.124-.254l-.023-.146h-.94l.024.28c.043.505.31.84.74.929.144.03 1.726.04 5.304.032l5.099-.01.194-.1a.945.945 0 0 0 .483-.623c.06-.28.06-11.986 0-12.266a.945.945 0 0 0-.483-.623l-.194-.1-1.359-.012-1.358-.012v.313Zm-6.875 2.202v1.26l.173.07c.24.1.49.33.629.58l.116.209v6.992l-.09.168c-.14.262-.345.463-.604.592l-.237.119h8.763V7.002h-1.05c-.93 0-1.056.007-1.104.065a.957.957 0 0 1-.249.156l-.195.09H13.03l-.195-.09a.958.958 0 0 1-.249-.156c-.047-.058-.173-.065-1.104-.065h-1.05v1.26Zm7.041 1.093-.634.634-.246-.244c-.2-.198-.269-.243-.373-.243a.326.326 0 0 0-.32.32c0 .11.056.184.4.529.571.573.48.597 1.466-.39.707-.708.79-.805.79-.92a.326.326 0 0 0-.32-.32c-.114 0-.2.07-.763.634Zm-5.242.562a.405.405 0 0 0-.08.21c0 .059.036.153.08.21l.081.102h2.801l.081-.103a.405.405 0 0 0 .081-.21.405.405 0 0 0-.08-.209l-.082-.103h-2.8l-.082.103Zm-8.534.25c-.16.048-.369.263-.414.427-.052.187-.053 6.38 0 6.562.05.177.256.384.428.432.187.052 6.379.052 6.566 0 .172-.048.378-.255.429-.432.052-.181.051-6.375 0-6.562-.049-.172-.256-.378-.433-.429-.074-.02-.42-.038-.769-.038h-.635v.576c0 .524-.01.594-.093.772a.79.79 0 0 1-.454.446c-.164.074-.252.08-1.328.08-1.13 0-1.156-.002-1.35-.092a.911.911 0 0 1-.48-.529c-.025-.082-.045-.397-.045-.701v-.552l-.654.003c-.36.002-.706.019-.768.038Zm2.054.486c.018.76-.079.704 1.243.704s1.225.055 1.243-.704l.013-.526H5.74l.013.526Zm11.722 1.514-.634.634-.246-.243c-.2-.199-.269-.244-.373-.244a.326.326 0 0 0-.32.32c0 .11.056.184.4.53.571.572.48.597 1.466-.39.707-.709.79-.806.79-.92a.326.326 0 0 0-.32-.32c-.114 0-.2.07-.763.633Zm-5.242.563a.405.405 0 0 0-.08.21c0 .058.036.152.08.209l.081.103h2.801l.081-.103a.405.405 0 0 0 .081-.21.405.405 0 0 0-.08-.21l-.082-.102h-2.8l-.082.103Zm5.242 2.25-.634.634-.246-.244c-.2-.198-.269-.243-.373-.243a.326.326 0 0 0-.32.32c0 .11.056.184.4.529.571.573.48.597 1.466-.39.707-.708.79-.805.79-.92a.326.326 0 0 0-.32-.32c-.114 0-.2.07-.763.634Zm-13.523.25a.405.405 0 0 0-.08.21c0 .058.036.152.08.209l.081.103h2.176l.081-.103a.322.322 0 0 0 0-.42l-.08-.102H4.032l-.08.103Zm8.281.312a.405.405 0 0 0-.08.21c0 .059.036.153.08.21l.081.102h2.801l.081-.103a.405.405 0 0 0 .081-.21.405.405 0 0 0-.08-.209l-.082-.103h-2.8l-.082.103Zm-8.28.938a.405.405 0 0 0-.082.21c0 .058.037.152.081.209l.081.103H5.584l.081-.103a.322.322 0 0 0 0-.42l-.08-.102H4.032l-.08.103Z" fill={heroCategory === "custom_brokerage" ? "#FFF" : "#6B7280"}  />
                        </svg>
                      }
                      text='custom_brokerage'
                      heroText={'We Handle Your Customs Clearance With Precision.'}
                      name={"Custom Brokerage"}
                      heroCategory={heroCategory}
                      setHeroCategory={setHeroCategory}
                      setHeroText={setHeroText}
                      reset={reset}
                  />
                </>)}
                <HeroCategory 
                    svg={
                      <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1.667h.028c3.905.015 7.07 3.201 7.056 7.102v.077c-.053 2.787-1.729 5.1-3.125 6.55-.397.414-.82.811-1.256 1.183a.622.622 0 0 1-.807-.945c.403-.344.796-.714 1.166-1.1 1.242-1.288 2.732-3.327 2.778-5.71.012-3.275-2.597-5.902-5.817-5.916H10c-3.21 0-5.827 2.602-5.839 5.81a7.6 7.6 0 0 0 1.55 4.354c1.12 1.49 2.818 3.069 4.432 4.12a.62.62 0 0 1-.34 1.141.617.617 0 0 1-.34-.1c-1.727-1.125-3.547-2.816-4.746-4.413a8.839 8.839 0 0 1-1.8-5.06C2.932 4.823 6.107 1.668 10 1.668ZM8.546 8.845a1.453 1.453 0 0 0 2.904 0c0-.8-.651-1.45-1.452-1.45a.621.621 0 1 1 0-1.242 2.697 2.697 0 0 1 2.696 2.692 2.697 2.697 0 0 1-5.392 0 .622.622 0 0 1 1.244 0Z" fill={heroCategory === "tracking" ? "#FFF" : "#4B5563"} />
                    </svg>
                    }
                    text='tracking'
                    heroText={'Seamlessly Track Your Shipments in One Place'}
                    name={"Tracking"}
                    heroCategory={heroCategory}
                    setHeroCategory={setHeroCategory}
                    setHeroText={setHeroText}
                    reset={reset}
                />
                
                {/* <div
                  className={`flex items-center gap-x-2 mb-6 px-6 py-4 ${heroCategory === "haulage" ? "bg-[#3AB44A]" : "bg-transparent"} pb-4 w-fit cursor-pointer`}
                  onClick={() => {
                    setHeroCategory("haulage");
                    setHeroText("Book Your International Shipments In Minutes")
                  }}
                >
                  <div>
                    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="m6.037 12.318 2.495-3.242 2.845 2.235 2.44-3.15" stroke={heroCategory === "haulage" ? "#FFF" : "#6B7280"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <circle cx="16.663" cy="3.5" stroke={heroCategory === "haulage" ? "#FFF" : "#6B7280"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" r="1.602" />
                      <path d="M12.437 2.6H6.381c-2.51 0-4.066 1.777-4.066 4.287v6.735c0 2.51 1.525 4.28 4.066 4.28h7.17c2.51 0 4.065-1.77 4.065-4.28V7.756" stroke={heroCategory === "haulage" ? "#FFF" : "#6B7280"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <p className={`text-sm font-light ${heroCategory === "haulage" ? 'text-white' : 'black-text-3'}`}>Haulage</p>
                </div> */}
                {/* <div
                  className={`flex items-center gap-x-2 mb-6 ${heroCategory === "tracking" ? "border-[#3AB44A]" : "border-transparent"} border-solid border-b-[5px] pb-4 w-fit cursor-pointer`}
                  onClick={() => {
                    setHeroCategory("tracking")
                    setHeroText("Seamlessly Track Your Shipments in One Place.")
                  }}
                >
                  <div>
                    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1.667h.028c3.905.015 7.07 3.201 7.056 7.102v.077c-.053 2.787-1.729 5.1-3.125 6.55-.397.414-.82.811-1.256 1.183a.622.622 0 0 1-.807-.945c.403-.344.796-.714 1.166-1.1 1.242-1.288 2.732-3.327 2.778-5.71.012-3.275-2.597-5.902-5.817-5.916H10c-3.21 0-5.827 2.602-5.839 5.81a7.6 7.6 0 0 0 1.55 4.354c1.12 1.49 2.818 3.069 4.432 4.12a.62.62 0 0 1-.34 1.141.617.617 0 0 1-.34-.1c-1.727-1.125-3.547-2.816-4.746-4.413a8.839 8.839 0 0 1-1.8-5.06C2.932 4.823 6.107 1.668 10 1.668ZM8.546 8.845a1.453 1.453 0 0 0 2.904 0c0-.8-.651-1.45-1.452-1.45a.621.621 0 1 1 0-1.242 2.697 2.697 0 0 1 2.696 2.692 2.697 2.697 0 0 1-5.392 0 .622.622 0 0 1 1.244 0Z" fill={heroCategory === "tracking" ? "#139C33" : "#6B7280"} />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-[#112211]">Tracking</p>
                </div> */}
              </div>
              <div className="px-6 pb-6">
              {heroCategory === 'haulage' && 
              <div className="flex items-center gap-x-6 mb-6 w-fit" onClick={() => reset()}>
                  <p className={`text-sm cursor-pointer font-light ${haulageCategory === "porttodoor" ? "border-[#3AB44A] green-text-2" : "border-transparent grey-text-1"} border-solid border-b-[2px] pb-2.5 w-fit cursor-pointer`} onClick={() => setHaulageCategory("porttodoor")}>Port to Door</p>
                  <p className={`text-sm cursor-pointer font-light ${haulageCategory === "doortoport" ? "border-[#3AB44A] green-text-2" : "border-transparent grey-text-1"} border-solid border-b-[2px] pb-2.5 w-fit cursor-pointer`} onClick={() => setHaulageCategory("doortoport")}>Door to Port</p>
              </div>}
              {(heroCategory === "ocean_freight" || heroCategory === "haulage" || heroCategory === "custom_brokerage") &&
                <form onSubmit={handleSubmit(onSubmit)}>
                  <RateSearch
                    control={control}
                    errors={errors}
                    originPort={originPort}
                    setOriginPort={setOriginPort}
                    defaultPortsOfOrigin={defaultPortsOfOrigin}
                    defaultPortsOfDestination={defaultPortsOfDestination}
                    allPorts={allPorts}
                    allowedPorts={allowedPorts}
                    loading={loading}
                    heroCategory={heroCategory}
                    haulageCategory={haulageCategory}
                  />
                </form>}
                {heroCategory === "tracking" &&
                <form onSubmit={handleSubmit(trackSubmit)}>
                  <TrackingSearch
                    control={control}
                    errors={errors}
                  />
                </form>
                }
              </div>
            </div>
        </div>
      </div>

      <div className="py-14">
        <div className="max-w-[1200px] mx-auto px-6 relative" ref={scrollref}>
          <div className="relative min-h-[843px]">
            <h1 className="text-[40px] sato black-text-2 font-medium">Special Rates</h1>
            {getting_special_rates ? <LoadingSpinner /> :
              <>
                <div className="mt-10 pb-8 bottom-divider-2 flex flex-col gap-y-5 md:gap-y-0 md:flex-row md:justify-between md:items-center gap-x-3 relative z-[20]">
                  <div className="flex items-center gap-x-3">
                    <div className="relative" ref={sizeref}>
                      <div
                        className="flex items-center gap-x-2 px-4 py-3 border-solid border-[1px] border-[#9CA3AF] rounded w-fit cursor-pointer"
                        onClick={() => setShowContainerSize(!showContainerSize)}
                      >
                        <p>{size}</p>
                        <span><img src={caretDown} alt="" /></span>
                      </div>
                      {showContainerSize &&
                        <div className="absolute w-[100px] p-1 text-sm black-text-3 bg-white shadow-[1px_4px_12px_-1px_rgba(44,78,39,0.15)] rounded">
                          <p className={`p-2 cursor-pointer ${size === "20FT" ? "bg-green-100 text-[#139C33]" : "text-[#1F2937]"} rounded`}
                            onClick={() => {
                              setSize("20FT");
                              setShowContainerSize(false);
                            }}
                          >
                            20FT
                          </p>
                          <p
                            className={`p-2 ${size === "40FT" ? "bg-green-100 text-[#139C33]" : "text-[#1F2937]"} cursor-pointer rounded`}
                            onClick={() => {
                              setSize("40FT");
                              setShowContainerSize(false);
                            }}
                          >
                            40FT
                          </p>
                          <p
                            className={`p-2 ${size === "40FT HC" ? "bg-green-100 text-[#139C33]" : "text-[#1F2937]"} cursor-pointer rounded`}
                            onClick={() => {
                              setSize("40FT HC");
                              setShowContainerSize(false);
                            }}
                          >
                            40FT HC
                          </p>
                        </div>
                      }
                    </div>
                    <div className="relative" ref={typeref}>
                      <div
                        className="flex items-center gap-x-2 px-4 py-3 border-solid border-[1px] border-[#9CA3AF] rounded w-fit cursor-pointer"
                        onClick={() => setShowContainerType(!showContainerType)}
                      >
                        <p>{type}</p>
                        <span><img src={caretDown} alt="" /></span>
                      </div>
                      {showContainerType &&
                        <div className="absolute w-[100px] p-1 text-sm black-text-3 bg-white shadow-[1px_4px_12px_-1px_rgba(44,78,39,0.15)] rounded">
                          <p
                            className={`p-2 cursor-pointer ${type === "DRY" ? "bg-green-100 text-[#139C33]" : "text-[#1F2937]"} rounded`}
                            onClick={() => {
                              setType("DRY");
                              setShowContainerType(false);
                            }}
                          >
                            DRY
                          </p>
                          <p
                            className={`p-2 cursor-pointer ${type === "REEFER" ? "bg-green-100 text-[#139C33]" : "text-[#1F2937]"} rounded`}
                            onClick={() => {
                              setType("REEFER");
                              setShowContainerType(false);
                            }}>REEFER</p>
                        </div>
                      }
                    </div>
                  </div>
                  {/* <span className="hidden md:block"><img src={longdivider} alt="" /></span> */}
                  <div className="flex scrollbar items-center gap-x-3 max-w-[520px] lg:max-w-[750px] overflow-auto">
                    {/* <div
                          className={`flex items-center gap-x-2 px-4 py-3 border-solid border-[1px] min-w-fit ${selectedLiner === "" ? "bg-[#1F2937] text-white" : "border-[#9CA3AF] text-[#1F2937]"}  rounded w-fit cursor-pointer`}
                          onClick={() => {
                            setSelectedLiner("")
                            setSpecialRates(live_rates?.ocean_freight.filter((item) => item?.rates_data?.offer_type.toLowerCase() === "contract"))
                          }}
                        >
                          ALL RATES
                        </div> */}
                    {linerList?.length > 0 && linerList?.map((item, idx) => <SingleLiner key={idx} liner={item} selectedLiner={selectedLiner} setSelectedLiner={setSelectedLiner} />)}
                  </div>
                </div>
                {!user ?   
                 <>
                    <div className="card-rates pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      <div><DummySpecialRate item={selectedLiner} /></div>
                      <div className="hidden md:block"><DummySpecialRate item={selectedLiner} /></div>
                      <div className="hidden md:block"><DummySpecialRate item={selectedLiner} /></div>
                    </div>
                </> : special_rates?.length > 0 ?
                  <>
                    <div className="card-rates pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {[...specialRates]?.slice(0, itemsPerPage)?.map((item, idx) => (
                        <SingleSpecialRate
                          key={item?.special_rate_id}
                          item={item}
                          user={user}
                          shipment_data={shipment_data}
                          toShipmentInformation={toShipmentInformation}
                          setShowLogin={setShowLogin}
                          selecting_special_rate={selecting_special_rate}
                          selecting_special={selecting_special}
                        />
                      ))
                      }
                    </div>
                    {(specialRates?.length >= itemsPerPage) &&
                      <div className="mt-10">
                        <p className="text-center text-sm black-text-3 mb-4">Viewing {itemsPerPage} of {specialRates?.length} special rates</p>
                        <button
                          className="border-solid flex px-12 mx-auto border-[1px] border-[#374151] rounded py-3"
                          onClick={() => itemsPerPage > 9 ? setItemsPerPage(9) : setItemsPerPage(specialRates?.length)}
                        >
                          {itemsPerPage > 9 ? "Show Less" : "Show All"}
                        </button>
                      </div>}
                  </>
                  : <p className="mt-4">No Rates To Display</p>
                }
              </>
            }
          </div>
          {!user && !getting_special_rates && 
          <div className="h-[843px] w-full absolute special-rate top-0 left-0 flex flex-col items-center justify-end pb-[120px]">
            <h2 className="sato mb-3 text-lg text-center lg:text-2xl black-text-2">Want to view our exclusive special rates?</h2>
            <p className="black-text-4 mb-14 max-w-[300px] text-center font-light sato">Sign in or create an account to view all <span className="green-text-2 font-semibold">{linerCount}</span> of our available special rates for this liner.</p>
            <Button
              title="Create an Account"
              style={{ width: "270px" }}
              onClick={() => {
                navigate("/signup");
                sessionStorage.setItem("toSpecial", JSON.stringify(true));
              }}
            />
            <p className="black-text text-sm mt-7 sato">Already have an account? <Link to='/signin' onClick={() => sessionStorage.setItem("toSpecial", JSON.stringify(true))} className="green-text-2 text-sm sato cursor-pointer">Sign in</Link></p>
          </div>}
        </div>
      </div>

      <OfapLogin
        id={id}
        haulage_ID={haulageId}
        custom_ID={customId}
        isOpen={showLogin}
        setHaulageId={setHaulageId}
        setCustomId={setCustomId}
        closeModal={closeLoginModal}
      />

      <Partners isDock={true} />
      <section className="py-[80px] lg:py-[120px] solutions">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-5xl max-w-[700px] mx-auto text-center black-text-3 font-medium lg:leading-[67px] mb-4 lg:mb-6 sato">
              Trusted <span className="font-bold sato">freight solutions</span>{" "}
              for your supply chain.
            </h2>
            <p className="text-sm md:text-lg lg:text-xl font-light black-text-4 max-w-[448px] mx-auto text-center sato">
              Let us handle the details and you can focus on growing your
              business.
            </p>
          </div>

          <div className="max-w-[1040px] mx-auto flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-1/2">
              <div
                className="bg-white rounded-xl pt-4 px-4 pb-9 solid-br"
                data-aos="fade-up"
              >
                <div className="h-[249px] md:h-auto">
                  <img className="rounded-xl" src={oceanfreight} alt="" />
                </div>
                <p className="text-base md:text-lg lg:text-xl font-normal py-6 green-text-3 sato">Ocean Freight Service</p>
                <p className="text-xl md:text-2xl black-text-4 font-light pb-7 sato">
                  Cost-effective shipping option for large and bulky goods that
                  can withstand longer transit times.
                </p>
                <p
                  onClick={() => navigate("/services/ocean-freight")}
                  className="flex items-center gap-x-1 cursor-pointer"
                >
                  <span className="text-base md:text-xl sato">Ship across the ocean today</span>
                  <img src={caretrightBlack} alt="" />
                </p>
              </div>
              <div
                onClick={() => navigate("signup")}
                className="mt-11 p-6 md:p-8 md:pt-12 md:pb-[105px] bg-[#111827] rounded-[15px] cursor-pointer"
                id="start"
                data-aos="fade-up"
              >
                <p className="flex items-center gap-x-1.5 mb-8">
                  <span className="text-[32px] md:text-4xl text-white sato font-medium">
                    Start today
                  </span>
                  <img src={star} alt="" />
                </p>
                <p className="semi-grey-text font-light text-xl md:text-2xl max-w-[436px] leading-[38px] sato">
                  Take the first step and book your shipment today with our top-notch freight forwarding service – your gateway to seamless global shipment!
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div
                className="bg-white rounded-xl pt-4 px-4 pb-9 solid-br"
                data-aos="fade-up"

              >
                <div className="h-auto md:h-auto rounded-xl">
                  <img className="rounded-xl" src={airfreight} alt="" />
                </div>
                <p className="text-base md:text-lg lg:text-xl font-normal py-6 green-text-3 sato">Air Freight Service</p>
                <p className="text-xl md:text-2xl black-text-4 pb-7 font-light sato">
                  Fast and efficient shipping option for time-sensitive and
                  high-value goods that need to be delivered quickly.
                </p>
                <p
                  onClick={() => navigate("/services/air-freight")}
                  className="flex items-center gap-x-1 cursor-pointer"
                >
                  <span className="text-base md:text-xl sato">Take off with Air Freight!</span>
                  <img src={caretrightBlack} alt="" />
                </p>
              </div>

              <div
                className="bg-white rounded-xl pt-4 px-4 pb-9 mt-10 solid-br"
                data-aos="fade-up"
              >
                <div className="h-auto md:h-auto">
                  <img className="rounded-xl" src={inlandtruck} alt="" />
                </div>
                <p className="text-base md:text-lg lg:text-xl font-normal py-6 green-text-3 sato">Haulage Service</p>
                <p className="text-xl md:text-2xl black-text-4 pb-7 font-light sato">
                  Flexible shipping option for smaller shipments, LTL cargo, and
                  time-sensitive goods that require door-to-door delivery.
                </p>
                <p
                  onClick={() => navigate("/services/inland-logistics")}
                  className="flex items-center gap-x-1 pb-2 cursor-pointer"
                >
                  <span className="text-base md:text-xl sato">Hassle-Free Haulage Solutions!</span>
                  <img src={caretrightBlack} alt="" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DataCounter />
      <section className="pt-20 lg:pt-[104px] pb-20 lg:pb-[118px]" id="work">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 gap-y-16 lg:gap-y-0 lg:gap-x-10 lg:grid-cols-2">
            <div>
              <h3 className="text-white text-4xl pb-16 mb-16 border-solid border-b-[1px] border-b-[#344336] font-bold sato">
                How Does It Work?
              </h3>
              <div className="flex flex-col gap-y-14">
                {works.map((work, index) => (
                  <AccordionItem
                    key={index}
                    active={active}
                    handleToggle={handleToggle}
                    works={work}
                  />
                ))}
              </div>
            </div>
            <div className="lg:flex justify-end items-start" data-aos="fade-up">
              <div
                className="p-7 lg:p-9 rounded-[15px] md:w-[460px] lg:h-[558px]"
                id="work-start"
              >
                <h3 className="black-text-3 text-[34px] lg:text-5xl font-medium lg:font-bold max-w-[500px] lg:max-w-[392px] leading-[49px] lg:leading-[65px] sato">
                  Start Your First Shipment Today!
                </h3>
                <p className="mt-6 grey-text text-xl lg:text-2xl font-light mb-10 lg:mb-12 leading-8 sato">
                  You'll be guided through every step, making the process seamless and stress-free
                </p>
                <div className="mb-[140px]">
                  <Button
                    title="Start Shipping today"
                    icon={star}
                    style={{ width: "257px" }}
                    onClick={() => navigate("/signup")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CustomerSuccess />
      <CTA />
    </Layout>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading, shipment_data, live_rates, live_rate_loading, selecting_live_ocean_rate, getting_special_rates, special_rates, selecting_special_rate, special_rate_data, selecting_special } = state.booking;

  return { error, loading, shipment_data, live_rates, live_rate_loading, selecting_live_ocean_rate, getting_special_rates, special_rates, selecting_special_rate, special_rate_data, selecting_special };
}

export default connect(mapStateToProps, { createPublicBooking, getLiveRate, selectLiveOceanRate, getSpecialRate, createBooking, selectSpecialRate })(Dock);
