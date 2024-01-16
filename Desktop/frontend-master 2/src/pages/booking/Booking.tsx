import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

//libraries
import moment from "moment";

//components
import PageLoading from "components/partials/pageLoading";
import Layout from "components/layout/Layout";
import FilterComp from "components/booking/FilterComp";
import PrimaryButtons from "components/buttons/PrimaryButtons";
import NewShipment from "components/dashboard/NewShipment";
import NewShipmentModal from "components/dashboard/NewShipmentModal";
import LoadingSpinner from "components/partials/LoadingSpinner";
import PageTitle from "components/partials/PageTitle";

//icons
import cross from "assets/icons/cross.svg";
import arrowR from "assets/icons/arrow-right-green.svg";
import filter from "assets/icons/Filter-grey.svg";
import download from "assets/icons/download.svg";
import search from "assets/icons/search.svg";
import divider from "assets/icons/divider.svg";
import tray from "assets/icons/tray.svg";

//helpers
import { downloadCSV } from "helpers/jsonToCsv";
import { getOrigin, getDestination } from "helpers/tableLocation";

//actions
import { getBookings, clearShipment, clearBooking } from "store/actions";
import BookingAntTable from "components/booking/bookingTable/BookingAntTable";

const Booking = (props: any) => {
  const [filterDisplay, setFilterDisplay] = useState(false);
  const [mobilefilterDisplay, setMobileFilterDisplay] = useState(false);

  const [exportMain, setExportMain] = useState<Boolean>(false);
  const [importMain, setImportMain] = useState<Boolean>(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [air, setAir] = useState<Boolean>(false);
  const [haulage, setHaulage] = useState<Boolean>(false);
  const [ocean, setOcean] = useState<Boolean>(false);
  const [warehouse, setWarehouse] = useState<Boolean>(false);
  const [cbt, setCBT] = useState<Boolean>(false);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [clear, setClear] = useState(false);

  const [filterObject, setFilterObject] = useState({ page: "0", count: "10" });
  const [filteredBookings, setFilteredBookings] = useState<any>([]);

  const navigate = useNavigate();

  const {
    loading,
    bookings,
    getBookings,
    total_bookings,
    clearShipment,
    table_loading,
    clearBooking,
  } = props;

  // usestate for serverside pagination
  const [pageLoading, setPageLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [startNum, setStartNum] = useState(1);
  const [endNum, setEndNum] = useState(10);
  const [showShipment, setShowShipment] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const filter_ref = useRef<HTMLDivElement>(null);
  const mobilefilter_ref = useRef<HTMLDivElement>(null);
  const scrollref = useRef<HTMLDivElement>(null);
  //   const [totalRows, setTotalRows] = useState(100);
  //   const [itemsPerPage, setItemsPerPage] = useState(10);


  const openShipmentModal = () => {
    setModalIsOpen(true);
    // setModalText(text);
  };

  const closeShipmentModal = () => {
    setModalIsOpen(false);
  };

  // fetch a particular booking  with the url values
  const fetchBooking = () => {
    const filter_string = new URLSearchParams(filterObject).toString();
    setPageLoading(true);
    getBookings(filter_string);
  };

  // handlepagechange
  const handlePageChange = (page) => {
    setFilterObject({ ...filterObject, ...{ page: String(page - 1) } });
  };

  // handle per rows change
  const handlePerRowsChange = async (newPerPage, page) => {
    setFilterObject({
      ...filterObject,
      ...{ page: String(page), count: String(newPerPage) },
    });
  };

  useEffect(() => {
    fetchBooking();
  }, [filterObject]);

  useEffect(() => {
    if (bookings.length != 0) {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings);
    }
  }, [bookings]);

  //handles searching
  const handleSearch = (value: string, type: string) => {
    if (value) {
      setFilterObject({ ...filterObject, ...{ page: "0", search: value } });
    } else {
      setFilterObject({ ...filterObject, ...{ page: "0", search: value } });
    }
  };

  //handles filtering
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

  // handling application of filter
  const applyFilter = () => {
    // only export
    // exportMain && handleFilter("export", "shipment");
  };

  //click outside
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

  useEffect(() => {
    //@ts-ignore
    scrollref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [table_loading]);

  return (
    <>
      <Layout>
        <div className="dashboard-content-scroll">
          {loading ? (
            <div className="mt-3">
              <PageLoading title={"bookings"} />
            </div>
          ) : (
            <>
              <div ref={scrollref}>
                <div className="mx-7 pt-4 md:pt-10 lg:mx-14 lg:pt-10 mb-6 lg:mb-0">
                  <PageTitle 
                    text={"Booking"} 
                    subtext="Here’s a list of all your booking." 
                    clearBooking={clearBooking} 
                  />
                </div>
                <div className="lg:mt-9 w-full h-fit ">
                  <div className="mt-4 w-full">
                    <div className="desktop-only relative md:mx-7 lg:mx-14">
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
                        className="absolute w-[336px] left-[50%] ml-[-300px] z-50"
                      >
                        <FilterComp
                          handleFilter={handleFilter}
                          filteredBookings={filteredBookings}
                          applyFilter={applyFilter}
                          filterDisplay={filterDisplay}
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
                          setFilterDisplay={setFilterDisplay}
                          loading={loading}
                          dateRange={dateRange}
                          setDateRange={setDateRange}
                          startDate={startDate}
                          endDate={endDate}
                          setClear={setClear}
                          clear={clear}
                          type={"booking"}
                        />
                      </div>

                      <BookingAntTable
                        filteredShipments={filteredBookings}
                        total_count={total_bookings}
                        handlePerRowsChange={handlePerRowsChange}
                        handlePageChange={handlePageChange}
                        handleSearch={handleSearch}
                        setFilterDisplay={setFilterDisplay}
                        filterObject={filterObject}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* mobile only */}
              {!loading && (
                <div className="mb-6 mobile-only">
                  <div className="flex items-center justify-between sm:justify-start sm:gap-x-[16px] mx-7 ">
                    {/* search */}
                    <div className="flex items-center gap-x-1 form-input px-4 py-1.5 custom-input w-[70%] sm:w-[auto] black-text mb-5">
                      <div className="min-w-[16px] h-[16px] ">
                        <img src={search} alt=""></img>
                      </div>
                      <input
                        placeholder="Search Bookings"
                        className="w-[100%]"
                        onChange={(e) => handleSearch(e.target.value, "search")}
                      />
                    </div>

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
                  <div className="fixed top-0 w-full" ref={mobilefilter_ref}>
                    <FilterComp
                      handleFilter={handleFilter}
                      filteredBookings={filteredBookings}
                      applyFilter={applyFilter}
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
                      loading={loading}
                      dateRange={dateRange}
                      setDateRange={setDateRange}
                      startDate={startDate}
                      endDate={endDate}
                      setClear={setClear}
                      clear={clear}
                      type={"booking"}
                    />
                  </div>

                  {filteredBookings?.length > 0
                    ? filteredBookings.map((data, index: number) => {
                        return (
                          <div
                            className={`bg-white mx-7 border border-grey-3 px-4 py-6 ${
                              index === 0 ? "top-divider-2" : ""
                            }`}
                            onClick={() => {
                              navigate(`/booking/${data?.["_id"]}`, {
                                state: {
                                  id: data?.["_id"],
                                  book_category: `${
                                    data.shipment_type +
                                    data.shipment_transport_type
                                  }`,
                                  service: data.shipment_transport_type,
                                },
                              });
                            }}
                          >
                            {/* awaiting */}
                            <div
                              className={`py-1 px-1.5 rounded-full mt-3 mb-3 w-fit ${
                                data.shipment_status === "pending approval"
                                  ? "background-green"
                                  : data.shipment_status === "new booking"
                                  ? "background-blue"
                                  : data.shipment_status === "awaiting quotes"
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
                                    : data.shipment_status ===
                                      "pending approval"
                                    ? "text-[#059C01]"
                                    : data.shipment_status === "awaiting quotes"
                                    ? "text-[#C27500]"
                                    : data.shipment_status === "cancelled"
                                    ? "text-red-600"
                                    : ""
                                }`}
                              >
                                {data.shipment_status}
                              </p>
                            </div>

                            <div className="flex gap-[15px] items-center mb-3">
                              {/* shipment type */}
                              <div>
                                {data?.shipment_type === "export" && (
                                  <p className="text-lg black-text-3 font-medium">
                                    Export
                                  </p>
                                )}
                                {data?.shipment_type === "import" && (
                                  <p className="text-lg black-text-3 font-medium">
                                    Import
                                  </p>
                                )}
                              </div>
                              <img src={divider} alt="divider" />
                              <div>
                                {data.shipment_transport_type ===
                                  "ocean_freight" && <p>Ocean Freight</p>}
                                {data.shipment_transport_type ===
                                  "air_freight" && <p>Air Freight</p>}
                                {data.shipment_transport_type === "haulage" && (
                                  <p>Haulage</p>
                                )}
                                {data.shipment_transport_type ===
                                  "warehousing" && <p>Warehousing</p>}
                                {data.shipment_transport_type ===
                                  "customs_brokerage" && (
                                  <p>Custom Brokerage</p>
                                )}
                              </div>
                            </div>

                            <div className="flex mb-2 justify-between">
                              <p className="text-[#6B7280] text-sm">
                                {moment(data.createdAt).format("DD/MM/YYYY")}
                              </p>
                              <div className="cursor-pointer">
                                <img src={arrowR} alt="" />
                              </div>
                            </div>

                            {/* line */}
                            <div className="w-[80%] h-[1px] bg-[#F3F4F6] my-4"></div>

                            {/* origin and destination */}
                            <div className="flex gap-[24px]">
                              {/* origin */}
                              <div className="mb-2">
                                <p className="text-sm grey-text mb-2">Origin</p>
                                <p className="text-sm black-text-3 font-medium capitalize">
                                  {getOrigin(data).length > 23
                                    ? getOrigin(data).slice(0, 24)
                                    : getOrigin(data)}
                                  {getOrigin(data).length > 23 && "..."}
                                </p>
                              </div>

                              {/* Destination */}
                              <div className="mb-2">
                                <p className="text-sm grey-text mb-2">
                                  Destination
                                </p>
                                <p className="text-sm black-text-3 font-medium capitalize">
                                  {getDestination(data).length > 23
                                    ? getDestination(data).slice(0, 24)
                                    : getDestination(data)}
                                  {getDestination(data).length > 23 && "..."}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : !loading && (
                        <div className="mx-7 mt-8 block ">
                          <div className="flex justify-center mb-1">
                            <img src={tray} alt="" />
                          </div>
                          <p className="text-center grey-text-3 font-light">
                            No data available
                          </p>
                          {total_bookings > 0 && (
                            <div
                              className="px-2 py-2 w-fit cursor-pointer rounded bg-[#109B32] mt-6 mx-auto font-light"
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
                                setFilterObject({ page: "0", count: "10" });
                              }}
                            >
                              <p className="text-white">Go back to bookings</p>
                            </div>
                          )}
                        </div>
                      )}

                  {/* phone pagination */}
                  {filteredBookings?.length > 0 && (
                    <div className="mt-4 mx-7  py-6 flex justify-between">
                      {/* left */}
                      {page === 0 ? (
                        <div
                          className="rotate-180 w-[24px] h-[24px]"
                          onClick={() => {}}
                        >
                          <svg
                            className="w-[100%] h-[100%]"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.95703 2.91732L9.04036 7.00065L4.95703 11.084"
                              stroke="#d6dfed"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div
                          className="rotate-180 w-[24px] h-[24px]"
                          onClick={() => {
                            handlePageChange(page);
                            setPage(page - 1);
                            setStartNum(startNum - 10);
                            setEndNum(endNum - 10);
                          }}
                        >
                          <svg
                            className="w-[100%] h-[100%]"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.95703 2.91732L9.04036 7.00065L4.95703 11.084"
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
                          {startNum}-
                          {filteredBookings.length >= 10
                            ? endNum
                            : endNum -
                              (10 - (filteredBookings.length % 10))}{" "}
                          of {total_bookings}
                        </p>
                      </div>

                      {/* right */}
                      {page >= Math.ceil(total_bookings / 10 - 1) ? (
                        <div className="w-[24px] h-[24px]" onClick={() => {}}>
                          <svg
                            className="w-[100%] h-[100%]"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.95703 2.91732L9.04036 7.00065L4.95703 11.084"
                              stroke="#d6dfed"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div
                          className="w-[24px] h-[24px] "
                          onClick={() => {
                            handlePageChange(page + 2);
                            setPage(page + 1);
                            setStartNum(startNum + 10);
                            setEndNum(
                              filteredBookings.length >= 10
                                ? endNum + 10
                                : endNum - (10 - (filteredBookings.length % 10))
                            );
                          }}
                        >
                          <svg
                            className="w-[100%] h-[100%]"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.95703 2.91732L9.04036 7.00065L4.95703 11.084"
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
              )}
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { loading, bookings, total_bookings, table_loading } = state.bookings;
  return { loading, bookings, total_bookings, table_loading };
};

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

export default connect(mapStateToProps, {
  getBookings,
  clearShipment,
  clearBooking,
})(Booking);
