import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

//icons
import search from "assets/icons/search.svg";
import divider from "assets/icons/divider.svg";
import download from "assets/icons/download.svg";
import filter from "assets/icons/Filter-grey.svg";
import arrowR from "assets/icons/arrow-right-green.svg";
import tray from "assets/icons/tray.svg";
import cross from "assets/icons/cross.svg";

//libraries
import moment from "moment";
import { connect } from "react-redux";

//redux actions
import { getShipments, clearBooking } from "store/actions";

//helpers
// import { downloadCSV } from "helpers/jsonToCsv";
import { getOrigin, getDestination } from "helpers/tableLocation";

//components
import Layout from "components/layout/Layout";
import FilterComp from "components/booking/FilterComp";
import PrimaryButtons from "components/buttons/PrimaryButtons";
import PageLoading from "components/partials/pageLoading";
import LoadingSpinner from "components/partials/LoadingSpinner";
import ShipmentAntTable from "components/shipment/shipmentTable/ShipmentAntTable";
import NewShipmentModal from "components/dashboard/NewShipmentModal";
import PageTitle from "components/partials/PageTitle";

const Shipments = (props: any) => {
  const {
    booking_loading,
    my_shipments,
    getShipments,
    total_shipments,
    table_loading,
    clearBooking
  } = props;
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const filter_ref = useRef<HTMLDivElement>(null);
  const mobilefilter_ref = useRef<HTMLDivElement>(null);
  const scrollref = useRef<HTMLDivElement>(null);

  const query = searchParams.get("s");

  const [exportMain, setExportMain] = useState<Boolean>(false);
  const [importMain, setImportMain] = useState<Boolean>(false);

  const [air, setAir] = useState<Boolean>(false);
  const [haulage, setHaulage] = useState<Boolean>(false);
  const [ocean, setOcean] = useState<Boolean>(false);
  const [warehouse, setWarehouse] = useState<Boolean>(false);
  const [cbt, setCBT] = useState<Boolean>(false);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [clear, setClear] = useState(false);

  const [filterDisplay, setFilterDisplay] = useState(false);
  const [mobilefilterDisplay, setMobileFilterDisplay] = useState(false);
  const [filteredShipments, setFilteredShipments] = useState<any>([]);

  const [filterObject, setFilterObject] = useState({ page: "0", count: "10" });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // usestate for serverside pagination
  const [page, setPage] = useState(0);
  const [startNum, setStartNum] = useState(1);
  const [endNum, setEndNum] = useState(10);
  const [pageLoading, setPageLoading] = useState(false);

  const openShipmentModal = () => {
    setModalIsOpen(true);
    // setModalText(text);
  };

  const closeShipmentModal = () => {
    setModalIsOpen(false);
  };

  // fetch a particular booking  with the url values
  const fetchShipment = () => {
    const filter_string = new URLSearchParams(filterObject).toString();
    setPageLoading(true);
    getShipments({
      filter_string: filter_string,
      job: query,
    });
  };

  // handlepagechange
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

  useEffect(() => {
    fetchShipment();
  }, [filterObject]);

  useEffect(() => {
    setFilteredShipments(my_shipments);
  }, [my_shipments]);

  useEffect(() => {
    if (my_shipments?.length !== 0) {
      setFilteredShipments(my_shipments);
    } else {
      setFilteredShipments(my_shipments);
    }
  }, [my_shipments]);

  //creating the click outside to close drop down effect
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        filterDisplay &&
        filter_ref.current &&
        !filter_ref.current.contains(e.target)
      ) {
        setFilterDisplay(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [filterDisplay]);

  //creating the click outside to close drop down effect
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        mobilefilterDisplay &&
        mobilefilter_ref.current &&
        !mobilefilter_ref.current.contains(e.target)
      ) {
        setMobileFilterDisplay(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [mobilefilterDisplay]);

  //search functions
  const handleSearch = (value: string, type: string) => {
    if (value) {
      setFilterObject({ ...filterObject, ...{ page: "0", search: value } });
    } else {
      setFilterObject({ ...filterObject, ...{ page: "0", search: value } });
    }
  };

  //filter functions
  const handleFilter = (value: any, type: string) => {
    if (value) {
      setFilterObject({
        ...filterObject,
        ...{
          page: "0",
          shipment_transport_type: value.shipment_transport_type,
          shipment_type: value.shipment_type,
          shipment_status: value.shipment_status,
          start_date: value.start_date,
          end_date: value.end_date,
        },
      });
    }
  };
  // console.log("table>>>", table_loading);
  // console.log("totals>>>", total_shipments)

  useEffect(() => {
    //@ts-ignore
    scrollref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [table_loading]);

  return (
    <Layout>
      <div className="dashboard-content-scroll">
        <main className="px-4 pt-8 lg:pt-10 lg:px-10">
          {booking_loading ? (
            <PageLoading title={"shipments"} />
          ) : (
            <div ref={scrollref}>
              <div className="mb-10">
                <PageTitle 
                  text={"Shipments"} 
                  subtext="Here’s a list of all your shipments." 
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
                <div
                  ref={filter_ref}
                  className="absolute w-[336px] left-[52%] ml-[-300px] z-50"
                >
                  <FilterComp
                    handleFilter={handleFilter}
                    filterDisplay={filterDisplay}
                    filteredBookings={filteredShipments}
                    setFilterDisplay={setFilterDisplay}
                    air={air}
                    setAir={setAir}
                    haulage={haulage}
                    setHaulage={setHaulage}
                    ocean={ocean}
                    setOcean={setOcean}
                    warehouse={warehouse}
                    setWarehouse={setWarehouse}
                    cbt={cbt}
                    setCBT={setCBT}
                    exportMain={exportMain}
                    setExportMain={setExportMain}
                    importMain={importMain}
                    setImportMain={setImportMain}
                    loading={booking_loading}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    startDate={startDate}
                    endDate={endDate}
                    setClear={setClear}
                    clear={clear}
                    type={"shipment"}
                  />
                </div>
                {/* <p>Pauloooo</p> */}
                <ShipmentAntTable
                  filteredShipments={filteredShipments}
                  total_count={total_shipments}
                  handlePerRowsChange={handlePerRowsChange}
                  handlePageChange={handlePageChange}
                  handleSearch={handleSearch}
                  setFilterDisplay={setFilterDisplay}
                  filterObject={filterObject}
                  loading={booking_loading}
                />
              </div>
            </div>
          )}
        </main>

        {!booking_loading && (
          <main className="mobile-only mb-6 px-4 relative">
            <div className="flex items-center justify-between sm:justify-start sm:gap-x-4">
              {/* search */}
              <div className="flex items-center gap-x-1 form-input px-4 py-1.5 custom-input w-[70%] sm:w-[auto] sm:w-full black-text sm:w-[264px] mb-5">
                <div className="min-w-[16px] h-[16px] ">
                  <img src={search} alt="" />
                </div>
                <input
                  placeholder="Search Shipments"
                  className="w-[100%]"
                  onChange={(e) => handleSearch(e.target.value, "search")}
                />
              </div>

              {/* filter */}
              <div
                className="cursor-pointer px-4 flex items-center gap-x-1 border border-[#e5e7eb] rounded w-[28%] sm:w-[auto] h-[37.6px] mt-[-20px]"
                onClick={() => setMobileFilterDisplay(true)}
              >
                <div className="min-w-[16px] h-[16px] ">
                  <img src={filter} alt="" className="w-[100%]"></img>
                </div>
                <p className="text-xs text-[#9CA3AF]">Filter</p>
              </div>
            </div>

            {/* filter page */}
            <div className="fixed top-0 w-[95%]" ref={mobilefilter_ref}>
              <FilterComp
                handleFilter={handleFilter}
                filteredBookings={filteredShipments}
                // applyFilter={applyFilter}
                filterDisplay={mobilefilterDisplay}
                exportMain={exportMain}
                setExportMain={setExportMain}
                importMain={importMain}
                setImportMain={setImportMain}
                air={air}
                setAir={setAir}
                haulage={haulage}
                setHaulage={setHaulage}
                ocean={ocean}
                setOcean={setOcean}
                warehouse={warehouse}
                setWarehouse={setWarehouse}
                cbt={cbt}
                setCBT={setCBT}
                setFilterDisplay={setMobileFilterDisplay}
                loading={booking_loading}
                dateRange={dateRange}
                setDateRange={setDateRange}
                startDate={startDate}
                endDate={endDate}
                setClear={setClear}
                clear={clear}
                type={"shipment"}
              />
            </div>

            {filteredShipments?.length > 0 ? (
              filteredShipments.map((data, index: number) => (
                <div
                  key={data?.["_id"]}
                  className={`bg-white border cursor-pointer ${
                    index === 0 ? "top-divider-2" : ""
                  } border-grey-3 px-4 py-6`}
                  onClick={() => navigate(`/shipments/${data?.["_id"]}`)}
                >
                  <div className="flex gap-[15px] items-center mb-3">
                    <div>
                      {data?.shipment_type === "export" && (
                        <p className="text-lg black-text-3 font-normal">
                          Export
                        </p>
                      )}
                      {data?.shipment_type === "import" && (
                        <p className="text-lg black-text-3 font-normal">
                          Import
                        </p>
                      )}
                    </div>
                    <img src={divider} alt="divider" />
                    <div>
                      {data.shipment_transport_type === "ocean_freight" && (
                        <p className="text-lg black-text-3 font-normal">
                          Ocean Freight
                        </p>
                      )}
                      {data.shipment_transport_type === "air_freight" && (
                        <p className="text-lg black-text-3 font-normal">
                          Air Freight
                        </p>
                      )}
                      {data.shipment_transport_type === "haulage" && (
                        <p className="text-lg black-text-3 font-normal">
                          Haulage
                        </p>
                      )}
                      {data.shipment_transport_type === "warehousing" && (
                        <p className="text-lg black-text-3 font-normal">
                          Warehousing
                        </p>
                      )}
                      {data.shipment_transport_type === "customs_brokerage" && (
                        <p className=" text-lg black-text-3 font-normal">
                          Custom Brokerage
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex mb-2 justify-between">
                    <p className="text-[#6B7280] text-sm">
                      {moment(data.createdAt).format("DD-MM-YYYY")}
                    </p>
                    <div>
                      <img src={arrowR} alt=""></img>
                    </div>
                  </div>

                  <div
                    className={`py-1 px-1.5 rounded-full w-fit mt-3 mb-3 ${
                      data.shipment_status === "active"
                        ? "bg-green-100"
                        : data.shipment_status === "new booking"
                        ? "background-blue"
                        : data.shipment_status === "invoice accepted"
                        ? "bg-[#FFFADF]"
                        : data.shipment_status === "cancelled"
                        ? "bg-red-100"
                        : ""
                    }`}
                  >
                    <p
                      className={`text-xs capitalize text-center ${
                        data.shipment_status === "new booking"
                          ? "text-[#4B83F0]"
                          : data.shipment_status === "active"
                          ? "text-[#059C01]"
                          : data.shipment_status === "invoice accepted"
                          ? "text-[#C27500]"
                          : data.shipment_status === "cancelled"
                          ? "text-red-600"
                          : ""
                      }`}
                    >
                      {data.shipment_status}
                    </p>
                  </div>

                  {/* line */}
                  <div className="w-[80%] h-[1px] bg-[#F3F4F6] my-4"></div>

                  <div className="flex gap-x-6">
                    <div className="mb-2">
                      <p className="text-sm grey-text mb-2 font-light">
                        Origin
                      </p>
                      <p className="text-sm black-text-3 font-medium capitalize">
                        {getOrigin(data).length > 23
                          ? getOrigin(data).slice(0, 24)
                          : getOrigin(data)}
                        {getOrigin(data).length > 23 && "..."}
                      </p>
                    </div>

                    <div className="mb-2">
                      <p className="text-sm grey-text mb-2 font-light capitalize">
                        Destination
                      </p>
                      <p className="text-sm black-text-3 font-medium">
                        {getDestination(data).length > 23
                          ? getDestination(data).slice(0, 24)
                          : getDestination(data)}
                        {getDestination(data).length > 23 && "..."}
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
                  {total_shipments > 0 && (
                    <div
                      className="px-2 py-1.5 w-fit cursor-pointer rounded bg-[#109B32] mt-6 mx-auto font-light"
                      onClick={() => {
                        handleFilter(
                          {
                            shipment_transport_type: "",
                            shipment_type: "",
                            shipment_status: "",
                            start_date: "",
                            end_date: "",
                          },
                          ""
                        );
                        setStartNum(1);
                        setEndNum(10);
                        setPage(0);
                      }}
                    >
                      <p className="text-white">Go back to shipments</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* phone pagination */}
            {filteredShipments?.length > 0 && (
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
                <div>
                  <p>
                    {startNum} -{" "}
                    {filteredShipments.length >= 10
                      ? endNum
                      : endNum - (10 - (filteredShipments.length % 10))}{" "}
                    of {total_shipments}
                  </p>
                </div>

                {/* right */}
                {page >= Math.ceil(total_shipments / 10 - 1) ? (
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
                        filteredShipments.length >= 10
                          ? endNum + 10
                          : endNum - (10 - (filteredShipments.length % 10))
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
          </main>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: any) => {
  const {
    error,
    booking_loading,
    my_shipments,
    total_shipments,
    table_loading,
  } = state.shipment;
  return {
    error,
    booking_loading,
    my_shipments,
    total_shipments,
    table_loading,
  };
};

//table actions
// const ActionsMemo = (props: any): JSX.Element => {
//   const { filteredBookings, handleSearch, setFilterDisplay } = props;
//   return (
//     <div className="absolute w-[99%] h-full">
//       <div className=" pt-2 flex justify-between items-center">
//         <div className="flex items-center gap-x-[16px]">
//           {/* search */}
//           <div className="flex items-center gap-x-1 form-input px-4 py-1.5 custom-input w-full black-text w-[264px] mb-5">
//             <div className="">
//               <img src={search} alt=""></img>
//             </div>
//             <input
//               placeholder="Search Shipments"
//               className=""
//               onChange={(e) => handleSearch(e.target.value, "search")}
//             />
//           </div>

//           {/* filter */}
//           <div
//             className="cursor-pointer px-4 flex items-center gap-x-1 border border-[#e5e7eb] rounded  h-[37.6px] mt-[-20px]"
//             onClick={() => {
//               setFilterDisplay(true);
//             }}
//           >
//             {/* image */}
//             <div>
//               <img src={filter} alt=""></img>
//             </div>
//             {/* filter */}
//             <p className="text-xs text-[#9CA3AF]">Filter</p>
//           </div>
//         </div>

//         <div className="mb-5  desktop-only">
//           {/* <ExportCSV
//                         onExport={() => downloadCSV(filteredBookings, "bookings.csv")}
//                     /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

/* Export CSV */
const ExportCSV = ({ onExport }) => (
  <button
    className=" px-4  py-2.5 flex items-center gap-x-1  rounded border border-[#e5e7eb]"
    onClick={(e) => onExport(e["target"]["value"])}
  >
    <div className=" h-[16px] w-[16px]">
      <img src={download} alt=""></img>
    </div>
    <p className="text-[#9CA3AF] text-xs">Export</p>
  </button>
);

export default connect(mapStateToProps, { getShipments, clearBooking })(Shipments);
