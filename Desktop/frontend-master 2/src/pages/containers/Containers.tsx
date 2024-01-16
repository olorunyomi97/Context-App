import React from "react";
import { connect } from "react-redux";

import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

//components
import Layout from "components/layout/Layout";
import PageLoading from "components/partials/pageLoading";
import NewShipment from "components/dashboard/NewShipment";
import NewShipmentModal from "components/dashboard/NewShipmentModal";
import PrimaryButtons from "components/buttons/PrimaryButtons";
import ContainerTable from "pages/containers/ContainerTable";
import LoadingSpinner from "components/partials/LoadingSpinner";
import PageTitle from "components/partials/PageTitle";

//icons
import tray from "assets/icons/tray.svg";
import search from "assets/icons/search.svg";
import cross from "assets/icons/cross.svg";
import arrowW from "assets/icons/arrow-right-green.svg";

//actions
import { getContainers, clearShipment, clearBooking } from "store/actions";

const Containers = (props: any) => {
  const {
    clearShipment,
    error,
    booking_loading,
    my_containers,
    getContainers,
    total_containers,
    table_loading,
    clearBooking 
  } = props;

  const [searchParams] = useSearchParams();
  const job = searchParams.get("j");

  const navigate = useNavigate();

  const ref = useRef<HTMLDivElement>(null); //new shipment button ref
  const scrollref = useRef<HTMLDivElement>(null); //scroll ref
  const query = searchParams.get("s");

  const [contSearch, setContSearch] = useState(job ? job : "");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // console.log("loWQuer>>>", query)

  // usestate for serverside pagination
  const [page, setPage] = useState(0);
  const [startNum, setStartNum] = useState(1);
  const [endNum, setEndNum] = useState(10);

  //new shipment state
  const [showShipment, setShowShipment] = useState(false);
  const [filterObject, setFilterObject] = useState({ page: "0", count: "10", search: job ? job : "" });

  const [filteredContainers, setFilteredContainers] = useState<any>([]);

  //page loading
  const [pageLoading, setPageLoading] = useState(false);

  const openShipmentModal = () => {
    setModalIsOpen(true);
    // setModalText(text);
  };

  const closeShipmentModal = () => {
    setModalIsOpen(false);
  };

  // fetch a particular booking  with the url values
  const fetchContainers = () => {
    //@ts-ignore
    const filter_string = new URLSearchParams(filterObject).toString();
    setPageLoading(true);
    getContainers({
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
    setFilteredContainers(my_containers);
  }, [my_containers]);

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

  // console.log("containersss>>>", my_containers)
  // console.log("container>>>", total_containers)
  // console.log("table_loadinng>>>", table_loading)

  return (
    <Layout>
      <div className="dashboard-content-scroll">
        <div className="px-4 pt-8 lg:pt-10 lg:px-10">
          {booking_loading ? (
            <PageLoading title="containers" />
          ) : (
            <div ref={scrollref}>
              <div className="mb-10">
                <PageTitle 
                  text={"Containers"} 
                  subtext="All your shipment containers are displayed here" 
                  clearBooking={clearBooking} 
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
                <ContainerTable
                  contSearch={contSearch}
                  setContSearch={setContSearch}
                  filteredShipments={filteredContainers}
                  total_count={total_containers}
                  handlePerRowsChange={handlePerRowsChange}
                  handlePageChange={handlePageChange}
                  handleSearch={handleSearch}
                  filterObject={filterObject}
                  loading={booking_loading}
                />
              </div>

              <div className="mobile-only">
                {!booking_loading ? (
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
                                ${
                                item.container_status.toLowerCase() ===
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
                                className={`text-xs capitalize text-center ${
                                  item.container_status.toLowerCase() ===
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
                                className="text-xs green-text-3 font-medium"
                                onClick={() =>
                                  navigate(`/container/${item?.["_id"]}`)
                                }
                              >
                                View Tracking
                              </p>
                              <span>
                                <img src={arrowW} alt="" />
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 pb-4 bottom-divider-2">
                            <div>
                              <p className="grey-text text-sm mb-1.5">
                                Job Number
                              </p>
                              <p className="black-text text-sm uppercase">
                                {item[0]?.job_number
                                  ? item[0]?.job_number
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
                          <div className="grid grid-cols-2 pt-4">
                            <div>
                              <p className="grey-text text-sm mb-1.5">
                                BL Number
                              </p>
                              <p className="black-text text-sm uppercase">
                                {item[0]?.bl_number
                                  ? item[0]?.bl_number
                                  : "N/A"}
                              </p>
                            </div>
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
                          {total_containers > 0 && (
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
                          <div className="rotate-180" onClick={() => {}}>
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
                          of {total_containers}
                        </p>

                        {/* right */}
                        {page >= Math.ceil(total_containers / 10 - 1) ? (
                          <div className="" onClick={() => {}}>
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
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: any) => {
  const {
    error,
    booking_loading,
    my_containers,
    total_containers,
    table_loading,
  } = state.shipment;
  return {
    error,
    booking_loading,
    my_containers,
    total_containers,
    table_loading,
  };
};

export default connect(mapStateToProps, { clearShipment, getContainers, clearBooking  })(
  Containers
);
