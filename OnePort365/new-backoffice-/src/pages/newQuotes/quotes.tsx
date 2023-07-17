import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import ShipmentDropdown from "components/shipmentDropdown/shipmentDropdown";
import PrimaryButton from "components/buttons/PrimaryButton";
import "react-datepicker/dist/react-datepicker.css";
import { getNewQuotes } from "store/actions";
import Moment from "react-moment";
import moment from "moment";
import QuotesCsvData from "components/csvData/quotesCsvData";
import CustomDateFilter from "components/customDateFilter/customDateFilter";


const Quotes = (props: any) => {
    const { new_quotes, loading } = props
    const [openAside, SetOpenAside] = useState(false);
    const [filteredQuotes, setFilteredQuotes] = useState([]);
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [pending, setPending] = useState(true);
    console.log(new_quotes)
    console.log(new_quotes[0]?.destination_port_code)

    useEffect(() => {
        const timeout = setTimeout(() => {
            // setFilteredQuofilteredQuotes(filteredQuotes);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        props.getNewQuotes();
    }, []);

    useEffect(() => {
        setFilteredQuotes(new_quotes);
    }, [new_quotes]);

    const customStyles = {
        rows: {
            style: {
                minHeight: "72px",
                maxWidth: "100%",
            },
        },

        headCells: {
            style: {
                paddingLeft: "8px",
                paddingRight: "8px",
                backgroundColor: "#f0fdf4",
            },
        },

        cells: {
            style: {
                paddingLeft: "1px",
                paddingRight: "1px",
            },
        },
    };

    const columns = [
        {
            name: "Job Number",
            selector: (row) => {
                return (
                    <div
                        className="green-text cursor-pointer"
                        style={{
                            // marginLeft:'10px',
                            zIndex: 1,
                        }}
                        onClick={() => {
                            setSelectedQuote(row);
                            // window.location.href = `/shipments/shipment-details/${row?.["_id"]}`;
                        }}
                    >
                        <small>{row.job_number}</small>
                    </div>
                );
            },
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => {
                return (
                    <div className="bg-light-green green-text py-1 px-2 rounded-full mt-3 mb-3">
                        <small>{row.activity_status}</small>
                    </div>
                );
            },
            sortable: true,
        },


        {
            name: "Date Created",
            selector: (row) => {
                return (
                    <div className="grey-text py-1 px-2 rounded-full mt-3 mb-3">
                        <Moment format="DD-MM-YYYY">{row.createdAt}</Moment>
                    </div>
                );
            },
            sortable: true,
        },

        {
            name: "Origin",
            selector: (row) => {
                return (
                    <div>
                        <p className="font-semibold capitalize" style={{ justifyContent: 'center', whiteSpace: 'break-spaces' }}>
                            {row?.shipment_type === "export" &&
                                row?.shipment_transport_type === "ocean_freight" ? (
                                <p className='pl-8' style={{ whiteSpace: 'break-spaces', textAlign: 'center', justifyContent: 'center' }}>
                                    {row?.origin_port_code}
                                </p>
                            ) : row?.shipment_type === "import" &&
                                row?.shipment_transport_type === "ocean_freight" ? (
                                <p style={{ whiteSpace: 'break-spaces', textAlign: 'center', justifyContent: 'center' }}>
                                    {row?.port_of_discharge}
                                </p>
                            ) : row?.shipment_type === "export" &&
                                row?.shipment_transport_type === "haulage" ? (
                                <p className='pl-8' style={{ whiteSpace: 'break-spaces', textAlign: 'center', justifyContent: 'center' }}>
                                    {row?.terminal_port}
                                </p>
                            ) : row?.shipment_type === "import" &&
                                row?.shipment_transport_type === "haulage" ? (
                                <p style={{ whiteSpace: 'break-spaces', textAlign: 'center', justifyContent: 'center' }}>
                                    {row?.pickup_location}
                                </p>
                            ) : (
                                <p style={{ whiteSpace: 'break-spaces', textAlign: 'center', justifyContent: 'center' }}>
                                    {row?.origin_port_code}
                                </p>
                            )}
                        </p>
                    </div>
                );
            },
            sortable: true,
        },
        {
            name: "Destination",
            selector: (row) => {
                return (
                    <div>
                        <p className="font-semibold capitalize" style={{ justifyContent: 'center', whiteSpace: 'break-spaces' }}>
                            {row?.shipment_type === "export" &&
                                row?.shipment_transport_type === "ocean_freight" ? (
                                <p className='pl-8' style={{ whiteSpace: 'break-spaces', textAlign: 'center', justifyContent: 'center' }}>
                                    {row?.destination_port_code}
                                </p>
                            ) : row?.shipment_type === "import" &&
                                row?.shipment_transport_type === "ocean_freight" ? (
                                <p style={{ whiteSpace: 'break-spaces', textAlign: 'center', justifyContent: 'center' }}>
                                    {row?.delivery_location}
                                </p>
                            ) : row?.shipment_type === "export" &&
                                row?.shipment_transport_type === "haulage" ? (
                                <p style={{ whiteSpace: 'break-spaces', textAlign: 'center', justifyContent: 'center' }}>
                                    {row?.stuffing_location}
                                </p>
                            ) : row?.shipment_type === "import" &&
                                row?.shipment_transport_type === "haulage" ? (
                                <p style={{ whiteSpace: 'break-spaces', textAlign: 'center', justifyContent: 'center' }}>
                                    {row?.delivery_location}
                                </p>
                            ) : (
                                <p style={{ whiteSpace: 'break-spaces', textAlign: 'center', justifyContent: 'center' }}>
                                    {row?.destination_port_code}
                                </p>
                            )}
                        </p>
                    </div>
                );
            },
            sortable: true,
        },

        {
            name: "",
            selector: (row) => {
                return (
                    <div
                        className="bg-green p-1 rounded cursor-pointer"
                        style={{ justifyContent: "center" }}
                        onClick={() => {
                            setSelectedQuote(row);
                            window.location.href = `/new-quotes-details/${row?.["_id"]}`;
                        }}
                    >
                        <p className="text-xs text-center white-text font-semibold p-2">
                            <small>View Details</small>
                        </p>
                    </div>
                );
            },
        },



    ];


    const handleSearch = (event) => {
        console.log(event);
        let value = event.toLowerCase();
        const results: any = [];

        new_quotes.filter((new_quotes) => {
            if (
                new_quotes.job_number.toLowerCase().includes(value.toLowerCase())
            ) {
                results.push(new_quotes);
            }
        });

        setFilteredQuotes(results);
    };

    const handleFilter = (filter: any, type: string) => {
        let filtered = [];
        if (type === "shipment_date") {
            if (filter.length) {
                const [startDate, endDate] = filter;

                if (startDate && endDate) {
                    filtered = new_quotes.filter((shipment: any) => {
                        console.log(moment(shipment.shipment_date));
                        return (
                            moment(shipment.createdAt).isSameOrAfter(startDate) &&
                            moment(shipment.createdAt).isSameOrBefore(endDate)
                        );
                    });
                } else {
                    filtered = new_quotes;
                }
            }

        }

        setFilteredQuotes(filtered);
        console.log("filtered-shipments", filtered);
    };



    return (
        <div className="lg:flex">
            <Aside
                activeTab="quotes"
                openAside={openAside}
                SetOpenAside={SetOpenAside}
            />
            <div className="">
                <TopBar title={"Quotes"} SetOpenAside={SetOpenAside} />
                <div className="dashboard-content">
                    <div className="lg:px-10 lg:pt-5 container mx-auto w-full">
                        <CustomDateFilter handleFilter={handleFilter} />
                        <div>
                            <div className="lg:pb-3 lg:pt-3 grid grid-cols-2 gap-4">
                                <div className="mt-2">
                                    <p className="font-semibold text-lg pl-3 ">
                                        All Quotes{" "}
                                    </p>
                                </div>
                                <div className="mt-2 ml-auto" style={{ textAlign: "right" }}>
                                    <small>Quotes </small>
                                    <small style={{ color: "grey" }}> / All Quotes</small>
                                </div>
                            </div>
                        </div>
                        {loading ? (
                            <div className="text-center my-3">
                                <Link to="#" className="text-success">
                                    {/* @ts-ignore */}
                                    <PrimaryButton
                                        title="Loading Quotes"
                                        loading={loading}
                                    />
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="mt-2 w-full">
                                    {/* Desktop view */}
                                    <div className="desktop-only pt-3 solid-br">
                                        <DataTable
                                            // @ts-ignore
                                            columns={columns}
                                            data={filteredQuotes}
                                            pagination
                                            persistTableHead
                                            responsive
                                            actions={
                                                <ActionsMemo
                                                    // handleFilter={handleFilter}
                                                    handleSearch={handleSearch}
                                                    filteredQuotes={filteredQuotes}
                                                />
                                            }
                                            paginationPerPage={30}
                                            customStyles={customStyles}
                                            progressPending={pending}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// export default Quotes

const mapStateToProps = (state: any) => {
    const { new_quotes, error, loading } = state.newQuotes;
    return { new_quotes, error, loading };
};

const ActionsMemo = (props: any): JSX.Element => {
    const { filteredQuotes, handleFilter, handleSearch } = props;
    return (
        <>
            {/* <div className="mb-5 mr-3">
                <div className="">
                    <select
                        name=""
                        id="shipment_transport_type"
                        className=" px-4 py-2.5 text-xs rounded custom-input  w-full black-text bg-grey"
                        onChange={(e) =>
                            handleFilter(e.target.value, "shipment_transport_type")
                        }
                    >
                        <option value="">Transportation Type</option>
                        <option value="ocean_freight">Ocean Freight</option>
                        <option value="air_freight">Air Freight</option>
                        <option value="haulage">Haulage</option>
                    </select>
                </div>
            </div>

            <div className="mb-5 mr-3">
                <div className="">
                    <select
                        name=""
                        id="status"
                        className=" px-4 py-2.5 text-xs rounded custom-input  w-full black-text bg-grey"
                        onChange={(e) => handleFilter(e.target.value, "status")}
                    >
                        <option value="">Shipment Status</option>
                        <option value="active">Active/In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="booking placed">Booking Placed</option>
                    </select>
                </div>
            </div>

            <div className="mb-5 mr-3">
                <div className="">
                    <select
                        name=""
                        id="shipment_type"
                        className=" px-4 py-2.5 text-xs rounded custom-input  w-full black-text bg-grey"
                        onChange={(e) => handleFilter(e.target.value, "shipment_type")}
                    >
                        <option value="">Shipment Type</option>
                        <option value="import">Import</option>
                        <option value="export">Export</option>
                    </select>
                </div>
            </div> */}

            {/* <div className="mb-5 mr-1">
				<ExportCSV
					onExport={() => downloadCSV(filteredQuotes, "shipments.csv")}
				/>
			</div> */}

            <div className="mb-7 mr-1">
                <QuotesCsvData />
            </div>

            <input
                placeholder="Search Quotes"
                className="form-input px-3 py-1.5 custom-input w-full black-text w-40 mb-5"
                onChange={(e) => handleSearch(e.target.value)}
            />
        </>
    );
};

export default connect(mapStateToProps, { getNewQuotes })(Quotes);
