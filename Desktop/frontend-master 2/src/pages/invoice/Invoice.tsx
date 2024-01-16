import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import DataTable from "react-data-table-component";

//components
import Sidebar from "components/partials/Sidebar";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PageLoading from "components/partials/pageLoading";
import PaymentDrawer from "components/invoice/PaymentDrawer";
import Layout from "components/layout/Layout";

// import SecondaryButton from "components/buttons/SecondaryButton";
// import CustomInput from "components/textInputs/CustomInput";

//icons
// import arrowUp from "assets/icons/arrow-up.svg";
import arrowDown from "assets/icons/arrow-down.svg";
import movement from "assets/icons/movement.svg";
import InvoiceIcon from "assets/icons/invoice.svg";

//helpers
import { formatCurrency } from "helpers";
import { downloadCSV } from "helpers/jsonToCsv";
import { getMyInvoices } from "store/actions";

const Invoice = (props: any) => {
  const [openAside, SetOpenAside] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  const { my_invoices, getMyInvoices, loading, pending_loan } = props;

  useEffect(() => {
    getMyInvoices();
  }, []);

  useEffect(() => {
    setFilteredInvoices(my_invoices);
  }, [my_invoices]);

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
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
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };

  const columns = [
    {
      name: "Status",
      width: "90px",
      // conditionalCellStyles: [
      //   {
      //     when: row => row.invoice_status === "Open",
      //     style: {
      //       backgroundColor: "red"
      //     },
      //   }
      // ],
      selector: (row) => {
        return (
          <div
            className={`py-2 px-3 rounded-full mt-3 mb-3 ${
              row.invoice_status === "Open"
                ? row.invoice_status === "Paid"
                  ? "invoice_paid"
                  : "invoice_open"
                : "invoice_bookplaced"
            }`}
          >
            {row.invoice_status}{" "}
          </div>
        );
      },
    },
    {
      // name: "Related Shipment",
      name: "Shipment",
      allowOverflow: true,
      selector: (row) => {
        return (
          <Link
            to={`/booking-summary/${row.rate_id}`}
            className="underline cursor-pointer green-text"
          >
            {row.job_number}
          </Link>
        );
      },
    },

    // {
    //   name: "Charge Type",
    //   selector: "charge_type",
    // },
    {
      name: "Invoice Date",
      selector: (row) => moment(row.createdAt).format("DD/MM/YYYY"),
      sortable: true,
    },
    // {
    //   name: "Due Date",
    //   selector: "due_date",
    // },
    {
      name: "Currency",
      width: "80px",
      selector: (row) => row.invoice_currency,
    },
    {
      name: "Invoice Amount",
      selector: (row) =>
        formatCurrency(row.invoice_amount, row.invoice_currency),
      sortable: true,
    },
    {
      name: "Amount Paid",
      selector: (row) =>
        formatCurrency(row.invoice_amount_paid, row.invoice_currency),
      sortable: true,
    },
    {
      name: "Amount Due",
      selector: (row) =>
        formatCurrency(row.invoice_amount_pending, row.invoice_currency),
      sortable: true,
    },
    {
      name: "",
      width: "100px",
      selector: (row) => {
        return parseInt(row.invoice_amount_pending) === 0 ? (
          <></>
        ) : (
          <div
            className="bg-green p-1 rounded cursor-pointer"
            onClick={() => {
              setSelectedInvoice(row);
              setIsOpen(true);
            }}
          >
            <p className="text-xs text-center white-text font-semibold p-2">
              Pay Now
            </p>
          </div>
        );
      },
    },
    // {
    //   name: "",
    //   minWidth: "150px",
    //   style: {
    //     paddingRight: "10px"
    //   },
    //   selector: (row) => {
    //     return parseInt(row.invoice_amount_pending) === 0 ? (
    //       <></>
    //     ) :
    //     !pending_loan ?
    //       (
    //         <Link
    //           to="/invoice/trade-finance"
    //           state={{
    //             amount: row.invoice_amount_pending,
    //             currency: row.invoice_currency,
    //             job_number: row.job_number,
    //             invoice_id: row._id
    //           }}
    //         >
    //           <p className="bg-grey black-text p-1 rounded cursor-pointer text-xs text-center font-semibold py-3 px-3">
    //             Apply for Loan
    //           </p>
    //         </Link>
    //       ) :
    //       (
    //         <p className="bg-grey black-text p-1 rounded cursor-pointer text-xs text-center font-semibold py-3 px-3">
    //           Check loan status
    //         </p>
    //       )
    //   },
    // }
  ];
  // const conditionalRowStyles = [
  //   {
  //     when: (row) => row.invoice_status === "Booking placed",
  //     style: {
  //       position: "fixed",
  //     },
  //   },
  // ];

  const handleFilter = (value: string, type: string) => {
    let filteredData = my_invoices;
    if (value) {
      if (type === "search") {
        filteredData = my_invoices.filter((item) => {
          return (
            item.job_number.toLowerCase().includes(value.toLowerCase()) ||
            item.invoice_status.toLowerCase().includes(value.toLowerCase())
          );
        });
      } else if (type === "status") {
        filteredData = my_invoices.filter((item) => {
          return item.invoice_status.toLowerCase() === value.toLowerCase();
        });
      } else if (type === "currency") {
        filteredData = my_invoices.filter((item) => {
          return item.invoice_currency.toLowerCase() === value.toLowerCase();
        });
      }
    }
    setFilteredInvoices(filteredData);
  };

  //top actions on the table
  // const actionsMemo = useMemo(
  //   () => (
  //     <>
  //       <input
  //         placeholder="Search"
  //         className="form-input px-4 py-1.5 custom-input w-full black-text w-52 mr-2"
  //         onChange={handleFilter}
  //       />

  //       <ExportCSV
  //         onExport={() => downloadCSV(filteredInvoices, "invoices.csv")}
  //       />
  //     </>
  //   ),
  //   []
  // );

  return (
    <>
      {/* <Aside
        activeTab="invoice"
        openAside={openAside}
        SetOpenAside={SetOpenAside}
      /> */}
      {/* <Sidebar/> */}

      <Layout>
        {/* <TopBar title={"Invoices"} SetOpenAside={SetOpenAside} /> */}

        {loading ? (
          <>
            <PageLoading title={"invoices"} />
          </>
        ) : (
          <>
            <div className="lg:px-14 lg:pt-10 w-full dashboard-content-scroll">
              {my_invoices.length ? (
                <>
                  <div className="mt-4 w-full">
                    {/* Desktop view */}
                    <div className="pt-3 mx-5 solid-br">
                      <DataTable
                        //@ts-ignore
                        columns={columns}
                        data={filteredInvoices}
                        pagination
                        persistTableHead
                        responsive
                        actions={
                          <ActionsMemo
                            handleFilter={handleFilter}
                            filteredInvoices={filteredInvoices}
                          />
                        }
                        customStyles={customStyles}
                        selectableRows

                        // conditionalRowStyles={conditionalRowStyles}
                      />
                    </div>

                    {/* mobile view */}
                    {/* <div className="bg-grey py-2 mobile-only "> */}
                    <div className="bg-grey py-2 hidden ">
                      {my_invoices.map((data, index) => {
                        return (
                          <div className="bg-white mb-3" key={index}>
                            <div className="flex items-center py-3 px-7 bottom-divider">
                              <img
                                src={
                                  // data.shipping_type === "export"
                                  //   ? arrowUp
                                  //   :
                                  arrowDown
                                }
                                alt=""
                                width={35}
                                height={35}
                                className="bg-light-green p-2 rounded-full"
                              />
                              <p className="ml-2 black-text font-semibold text-sm capitalize">
                                {/* {data.shipping_type} */}
                              </p>

                              <p className="ml-auto black-text font-semibold text-sm">
                                {/* ID: {data._id.substring(0, 9)}  */}
                              </p>
                            </div>

                            <div className="grid grid-cols-3 gap-8 py-3 px-7 bottom-divider items-center">
                              <div className="">
                                <p className="black-text font-semibold text-sm">
                                  {/* {data.shipping_type === "export"
										? data.origin_port_province
										: data.origin_port} */}
                                </p>
                                <p className="grey-text text-xs">
                                  {/* {data.pickup_location
										? data.pickup_location
										: data.origin_port_country} */}
                                </p>
                              </div>

                              <div className="px-5">
                                <img
                                  src={movement}
                                  alt=""
                                  width={80}
                                  height={12}
                                  className=""
                                />
                              </div>

                              <div className="text-right">
                                <p className="black-text font-semibold  text-sm">
                                  {/* {data.shipping_type === "export"
										? data.destination_port_province
										: data.delivery_location} */}
                                </p>
                                <p className="grey-text text-xs">
                                  {/* {data.destination_port_country} */}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 py-3 px-7 bottom-divider items-center">
                              <div className="">
                                <p className="black-text font-semibold text-sm">
                                  {/* {moment(data.createdAt).format("LL")} */}
                                </p>
                              </div>
                              <div className="">
                                <p className="black-text text-xs font-semibold bg-yellow py-2 px-1.5 yellow-text  text-center rounded-full">
                                  partly paid
                                </p>
                              </div>

                              <Link
                                to="/shipment-invoice/475849HTF"
                                className="bg-green white-text text-xs py-2 text-center w-full rounded mr-3"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="flex flex-col item-center justify-center solid-br rounded"
                    style={{ minHeight: 500 }}
                  >
                    <img
                      src={InvoiceIcon}
                      alt=""
                      width={70}
                      height={70}
                      className="mx-auto mt-52"
                    />

                    <div className="mx-auto my-2">
                      <p className="grey-text my-3">
                        You have no recorded invoices yet
                      </p>
                      <Link to="/new-shipment">
                        <p className="btn bg-green white-text text-sm py-3 px-6 w-full rounded text-center mb-52">
                          Start New Shipment
                        </p>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </Layout>

      <PaymentDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        invoice={selectedInvoice}
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { loading, my_invoices, pending_loan } = state.invoice;
  return { loading, my_invoices, pending_loan };
};

//table actions
const ActionsMemo = (props: any): JSX.Element => {
  const { filteredInvoices, handleFilter } = props;
  return (
    <>
      <div className="mb-5 mr-3">
        {/* <label className="text-xs black-text" htmlFor={"status"}>
				Status
				</label> */}
        <div className="">
          <select
            name=""
            id="status"
            className=" px-4 py-2.5 text-xs rounded custom-input  w-full black-text bg-grey"
            onChange={(e) => handleFilter(e.target.value, "status")}
          >
            <option value="">Status</option>
            <option value="open">open</option>
            <option value="paid">paid</option>
            <option value="booking placed">booking placed</option>
          </select>
        </div>
      </div>

      <div className="mb-5 mr-3">
        {/* <label className="text-xs black-text" htmlFor={"currency"}>
				Currency
				</label> */}
        <div className="">
          <select
            name=""
            id="currency"
            className=" px-4 py-2.5 text-xs rounded custom-input  w-full black-text bg-grey"
            onChange={(e) => handleFilter(e.target.value, "currency")}
          >
            <option value="">Currency</option>
            <option value="usd">USD</option>
            <option value="ngn">NGN</option>
          </select>
        </div>
      </div>

      <div className="mb-5 mr-3">
        <ExportCSV
          onExport={() => downloadCSV(filteredInvoices, "invoices.csv")}
        />
      </div>
      <input
        placeholder="Search"
        className="form-input px-4 py-1.5 custom-input w-full black-text w-52 mb-5"
        onChange={(e) => handleFilter(e.target.value, "search")}
      />
    </>
  );
};

const ExportCSV = ({ onExport }) => (
  <button
    className="bg-grey black-text text-xs w-32 py-2.5 text-center rounded solid-br"
    onClick={(e) => onExport(e["target"]["value"])}
  >
    Export CSV
  </button>
);

export default connect(mapStateToProps, { getMyInvoices })(Invoice);
