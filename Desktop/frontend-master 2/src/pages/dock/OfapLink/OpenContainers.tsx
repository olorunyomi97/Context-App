import React from "react";
import { connect, useSelector } from "react-redux";

import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

//components
import Navbar from "components/dock/Navbar";
import PageLoading from "components/partials/pageLoading";
import NewShipment from "components/dashboard/NewShipment";
import OpenContainerTable from "pages/containers/OpenContainerTable";
import LoadingSpinner from "components/partials/LoadingSpinner";
import OfapLogin from "components/ofap/OfapLogin";
import CBTNotification from "components/rate/exportOcean/CBTNotification";

//icons
import tray from "assets/icons/tray.svg";
import cross from "assets/icons/cross.svg";
import search from "assets/icons/search.svg";
import arrowL from "assets/icons/arrow-left2.svg";
import arrowW from "assets/icons/arrow-right-green.svg";

import { getContainerByJobNumber } from "store/actions";


const OpenContainers = (props: any) => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const job:any = searchParams.get("j");

    const { jobnumber_containers, jobnumber_loading, totaljob_containers, table_loading, getContainerByJobNumber } = props;
    console.log("gret>>>", jobnumber_containers)

    const [showShipCondition, setShowShipCondition] = useState<boolean>(true);

    const ref = useRef<HTMLDivElement>(null); //new shipment button ref
    const scrollref = useRef<HTMLDivElement>(null); //scroll ref
    const query = searchParams.get("s");

    const [showLogin, setShowLogin] = useState(false);

    const closeLoginModal = () => {
        setShowLogin(false);
    }

    let user = useSelector((state: any) => state.auth.user_data);
    // @ts-ignore
    user = user ? user : localStorage.getItem("user_data");

    const [contSearch, setContSearch] = useState("");

    // usestate for serverside pagination
    const [page, setPage] = useState(0);
    const [startNum, setStartNum] = useState(1);
    const [endNum, setEndNum] = useState(10);

    //new shipment state
    const [showShipment, setShowShipment] = useState(false);
    const [filterObject, setFilterObject] = useState({ page: "0", count: "10" });

    const [filteredContainers, setFilteredContainers] = useState<any>([]);

    console.log("filterdCont>>>", filteredContainers)

    //page loading
    const [pageLoading, setPageLoading] = useState(false);

    // fetch a particular booking  with the url values
    const fetchContainers = () => {
        //@ts-ignore
        const filter_string = new URLSearchParams(filterObject).toString();
        setPageLoading(true);
        getContainerByJobNumber({
            id: job,
            filter_string: filter_string,
            job: query,
        });
    };

    // handle page change
    const handlePageChange = (page) => {
        setFilterObject({ ...filterObject, ...{ page: String(page - 1) } });
        // fetchShipment();
    };

    // handle per rows change
    const handlePerRowsChange = async (newPerPage, page) => {
        setFilterObject({
            ...filterObject,
            ...{ page: String(page), count: String(newPerPage) },
        });
        // fetchShipment();
    };

    //search functions
    const handleSearch = (value: string, type: string) => {
        if (value) {
            setFilterObject({ ...filterObject, ...{ page: "0", search: value } });
        } else {
            setFilterObject({ ...filterObject, ...{ page: "0", search: value } });
        }
    };

    //fetch container when object changes
    useEffect(() => {
        fetchContainers();
    }, [filterObject]);

    //fetch container
    useEffect(() => {
        setFilteredContainers(jobnumber_containers);
    }, [jobnumber_containers]);

    //click outside ctrl for new shipment button
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

    //scroll on table data change
    useEffect(() => {
        //@ts-ignore
        scrollref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [table_loading]);


    // useEffect(() => {
    //     getContainerByJobNumber(job)
    // }, [])

    return (
        <>
            <Navbar isNav={false} />
            <main className={`max-w-[1200px] mx-auto px-6 py-7`}>
                {jobnumber_loading ? <PageLoading title="containers" /> :
                    <div>
                        <div
                            className="grey-text flex items-center gap-x-1 mb-2 font-light cursor-pointer"
                            onClick={() => navigate(-1)}
                        >
                            <span>
                                <img src={arrowL} alt=""></img>
                            </span>
                            <p className="text-sm grey-text">Go Back</p>
                        </div>
                        <div className="text-sm sm:text-xl md:text-2xl flex items-center mb-6" ref={scrollref}>
                            <span className=" text-[#344336] mr-[6px]">Job Number</span>
                            <span className="grey-text-1 font-light">
                                #{job}
                            </span>
                            {/* <div
                            className={`py-1 px-2 ml-1.5 rounded-full w-fit text-center ${shipment_data.shipment_status === "active"
                                ? "bg-green-100"
                                : shipment_data.shipment_status === "new booking"
                                    ? "background-blue"
                                    : shipment_data.shipment_status === "pending"
                                        ? "background-blue"
                                        : shipment_data.shipment_status === "invoice accepted"
                                            ? "bg-[#FFFADF]"
                                            : shipment_data.shipment_status === "completed"
                                                ? "bg-[#FFFADF]"
                                                : shipment_data.shipment_status === "cancelled"
                                                    ? "bg-red-100"
                                                    : ""
                                }`}
                        >
                            <p
                                className={`text-xs capitalize text-center ${shipment_data.shipment_status === "new booking"
                                    ? "text-[#4B83F0]"
                                    : shipment_data.shipment_status === "pending"
                                        ? "text-[#4B83F0]"
                                        : shipment_data.shipment_status === "active"
                                            ? "text-[#059C01]"
                                            : shipment_data.shipment_status === "invoice accepted"
                                                ? "text-[#C27500]"
                                                : shipment_data.shipment_status === "completed"
                                                    ? "text-[#C27500]"
                                                    : shipment_data.shipment_status === "cancelled"
                                                        ? "text-red-600"
                                                        : ""
                                    }`}
                            >
                                {shipment_data.shipment_status}
                            </p>
                        </div> */}
                        </div>
                        <div className="mb-6">
                            <CBTNotification
                                text="Click 'View Details' to access complete tracking information. Ensure this shipment is linked to your Oneport 365 account."
                                containerInfo={true}
                            />
                        </div>
                        <div className="desktop-only relative">
                            {table_loading && (
                                <div className="absolute h-full w-full bg-[#7c8d788c] z-[999999] flex justify-center">
                                    <div className="pt-5">
                                        <LoadingSpinner
                                            top={false}
                                            height="10"
                                            loadingText="Loading table data"
                                        />
                                    </div>
                                </div>
                            )}
                            <OpenContainerTable
                                contSearch={contSearch}
                                setContSearch={setContSearch}
                                filteredShipments={filteredContainers}
                                total_count={totaljob_containers}
                                handlePerRowsChange={handlePerRowsChange}
                                handlePageChange={handlePageChange}
                                handleSearch={handleSearch}
                                filterObject={filterObject}
                                loading={jobnumber_loading}
                                setShowLogin={setShowLogin}
                                setShowShipCondition={setShowShipCondition}
                                job={job}
                            />
                        </div>
                        <div className="mobile-only">
                            {!jobnumber_loading ? (
                                <div>
                                    <div className="flex items-center justify-between sm:justify-start sm:gap-x-4">
                                        {/* search */}
                                        <div className="flex items-center gap-x-1 form-input px-4 py-1.5 custom-input w-[70%] sm:w-[auto] sm:w-full black-text sm:w-[264px] mb-5">
                                            <div className="min-w-[16px] h-[16px] ">
                                                <img src={search} alt="" />
                                            </div>
                                            <input
                                                placeholder="Search Containers"
                                                className="w-[100%]"
                                                onChange={(e) => {
                                                    setContSearch(e.target.value)
                                                    handleSearch(e.target.value, "search")
                                                }
                                                }
                                                value={contSearch}
                                            />
                                        </div>

                                        {/* filter */}
                                        {/* <div
                                        className="cursor-pointer px-4 flex items-center gap-x-1 border border-[#e5e7eb] rounded w-[28%] sm:w-[auto] h-[37.6px] mt-[-20px]"
                                        onClick={() => setMobileFilterDisplay(true)}
                                    >
                                        <div className="min-w-[16px] h-[16px] "><img src={filter} alt="" className="w-[100%]"></img></div>
                                        <p className="text-xs text-[#9CA3AF]">Filter</p>
                                    </div> */}
                                    </div>
                                    {filteredContainers.length > 0 ? (
                                        filteredContainers.map((item, idx) => (
                                            <div className="p-6 border-grey mb-2 rounded" key={item._id}>
                                                <div className="flex justify-between items-center mb-6">
                                                    <div
                                                        className={`py-1.5 px-2 rounded-lg mt-3 mb-3 w-[110px] text-center 
                                ${item.container_status.toLowerCase() ===
                                                                "pending approval"
                                                                ? "background-green"
                                                                : item.container_status.toLowerCase() ===
                                                                    "in transit"
                                                                    ? "bg-[#ECFBFF]"
                                                                    : item.container_status.toLowerCase() ===
                                                                        "new"
                                                                        ? "bg-[#FFFADF]"
                                                                        : item.container_status.toLowerCase() ===
                                                                            "file opening"
                                                                            ? "bg-[#ffe75d33]"
                                                                            : item.container_status.toLowerCase() ===
                                                                                "file closed"
                                                                                ? "bg-[#98ff9b4d]"
                                                                                : item.container_status.toLowerCase() ===
                                                                                    "cancelled"
                                                                                    ? "bg-red-100"
                                                                                    : ""
                                                            }`}
                                                    >
                                                        <p
                                                            className={`text-xs capitalize text-center ${item.container_status.toLowerCase() ===
                                                                "in transit"
                                                                ? "text-[#296FD8]"
                                                                : item.container_status.toLowerCase() ===
                                                                    "pending approval"
                                                                    ? "text-[#059C01]"
                                                                    : item.container_status.toLowerCase() ===
                                                                        "new"
                                                                        ? "text-[#C27500]"
                                                                        : item.container_status.toLowerCase() ===
                                                                            "file opening"
                                                                            ? "text-[#DB8900]"
                                                                            : item.container_status.toLowerCase() ===
                                                                                "file closed"
                                                                                ? "text-[#007200]"
                                                                                : item.container_status.toLowerCase() ===
                                                                                    "cancelled"
                                                                                    ? "text-red-600"
                                                                                    : ""
                                                                }`}
                                                        >
                                                            {item.container_status === "file opening" ? (
                                                                <span>In Progress</span>
                                                            ) : item.container_status === "file closed" ? (
                                                                <span>Completed</span>
                                                            ) : (
                                                                item.container_status
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-between items-center gap-x-2">
                                                        <p
                                                            className="text-xs green-text-3 font-medium cursor-pointer"
                                                            onClick={() => {
                                                                if (user) {
                                                                    navigate(`/shipments/${item?.shipment_details[0]["_id"]}`)
                                                                } else {
                                                                    sessionStorage.setItem("invalidJobNumber", job);
                                                                    sessionStorage.setItem("jobNumber", `${item?.shipment_details[0]["_id"]}`);
                                                                    setShowLogin(true);
                                                                    setShowShipCondition(true);
                                                                }

                                                            }
                                                            }
                                                        >
                                                            View Details
                                                        </p>
                                                        <span>
                                                            <img src={arrowW} alt="" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 pb-4">
                                                    <div>
                                                        <p className="grey-text text-sm mb-1.5">
                                                            Cont. Size (FT){" "}
                                                        </p>
                                                        <p className="black-text text-sm uppercase">
                                                            {item.container_size
                                                                ? item.container_size
                                                                : "N/A"}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="grey-text text-sm mb-1.5">
                                                            Cont. Number
                                                        </p>
                                                        <p className="black-text text-sm uppercase">
                                                            {item.container_number
                                                                ? item.container_number
                                                                : "N/A"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            <div className="mx-7 mt-8 block ">
                                                <div className="flex justify-center mb-1">
                                                    <img src={tray} alt="" />
                                                </div>
                                                <p className="text-center grey-text-3 font-light">
                                                    No data available
                                                </p>
                                                {totaljob_containers > 0 && (
                                                    <div
                                                        className="px-2 py-1.5 w-fit cursor-pointer rounded bg-[#109B32] mt-6 mx-auto font-light"
                                                        onClick={() => {
                                                            // handleFilter(
                                                            //     {
                                                            //         shipment_transport_type: "",
                                                            //         shipment_type: "",
                                                            //         shipment_status: "",
                                                            //         start_date: "",
                                                            //         end_date: "",
                                                            //     },
                                                            //     ""
                                                            // );
                                                            setStartNum(1);
                                                            setEndNum(10);
                                                            setPage(0);
                                                        }}
                                                    >
                                                        <p className="text-white">
                                                            Go back to containers
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                    {/* phone pagination */}
                                    {filteredContainers?.length > 0 && (
                                        <div className="mt-4 mx-7 items-center py-6 flex justify-between">
                                            {/* left */}
                                            {page === 0 ? (
                                                <div className="rotate-180" onClick={() => { }}>
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M4.957 2.917 9.04 7.001l-4.083 4.083"
                                                            stroke="#d6dfed"
                                                            stroke-width="1.5"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div
                                                    className="rotate-180"
                                                    onClick={() => {
                                                        handlePageChange(page);
                                                        setPage(page - 1);
                                                        setStartNum(startNum - 10);
                                                        setEndNum(endNum - 10);
                                                    }}
                                                >
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M4.957 2.917 9.04 7.001l-4.083 4.083"
                                                            stroke="#374151"
                                                            stroke-width="1.5"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                            )}

                                            {/* middle */}
                                            <p>
                                                {startNum} -{" "}
                                                {filteredContainers.length >= 10
                                                    ? endNum
                                                    : endNum -
                                                    (10 - (filteredContainers.length % 10))}{" "}
                                                of {totaljob_containers}
                                            </p>

                                            {/* right */}
                                            {page >= Math.ceil(totaljob_containers / 10 - 1) ? (
                                                <div className="" onClick={() => { }}>
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M4.957 2.917 9.04 7.001l-4.083 4.083"
                                                            stroke="#d6dfed"
                                                            stroke-width="1.5"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div
                                                    className=""
                                                    onClick={() => {
                                                        handlePageChange(page + 2);
                                                        setPage(page + 1);
                                                        setStartNum(startNum + 10);
                                                        setEndNum(
                                                            filteredContainers.length >= 10
                                                                ? endNum + 10
                                                                : endNum -
                                                                (10 - (filteredContainers.length % 10))
                                                        );
                                                    }}
                                                >
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M4.957 2.917 9.04 7.001l-4.083 4.083"
                                                            stroke="#374151"
                                                            stroke-width="1.5"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <LoadingSpinner />
                                </>
                            )}
                        </div>
                        <OfapLogin
                            id={""}
                            isOpen={showLogin}
                            closeModal={closeLoginModal}
                            showShipCondition={showShipCondition}
                            setShowShipCondition={setShowShipCondition}
                            isEmailRate={true}
                        />
                    </div>
                }
            </main>
        </>
    )
};

const mapStateToProps = (state: any) => {
    const { jobnumber_containers, jobnumber_loading, totaljob_containers, table_loading } = state.shipment;

    return { jobnumber_containers, totaljob_containers, jobnumber_loading, table_loading }
}

export default connect(mapStateToProps, { getContainerByJobNumber })(OpenContainers);