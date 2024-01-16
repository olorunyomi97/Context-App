import { useState, useEffect } from "react";
import moment from "moment";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import Navbar from "components/dock/Navbar";
import ShipmentDetailsCard from "components/shipment/ShipmentDetailsCard";
import CustomTabs from "components/customTabs/CustomTabs";
import PageLoading from "components/partials/pageLoading";

//icons
import arrowUp from "assets/icons/arrow-up.svg";
import arrowDown from "assets/icons/arrow-down.svg";

//redux
import { getPublicShipmentById } from "store/actions";

const ShipmentDetails = (props: any) => {
  const [tab, setTab] = useState("Shipment Details");

  const { loading, public_shipment_data, getPublicShipmentById } = props;

  const params = useParams();

  const [openAside, SetOpenAside] = useState(false);

  useEffect(() => {
    getPublicShipmentById(params.id);
  }, []);

  const shipments = [
    {
      id: 1,
      container_no: "123456",
      container_size: "20FT",
      container_type: "Dry",
      container_status: "Empty",
      last_updated: "2021-05-05T12:00:00.000Z",
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "50px",
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
      name: "Container Number",
      selector: (row) =>
        row?.container_number === null ? "N/A" : row?.container_number,
      sortable: true,
    },
    {
      name: "Seal Number",
      selector: (row) =>
        row?.shipping_line_seal_number === null
          ? "N/A"
          : row?.shipping_line_seal_number,
      sortable: true,
    },
    // {
    //   name: "Date Gated",
    //   selector: (row) =>
    //     row.date_gated ? moment(row.date_gated).format("DD/MM/YYYY") : "-",
    // },
    // {
    //   name: "Gross Weight",
    //   selector: "gross_weight",
    // },
    {
      name: "B/L Number",
      selector: (row) =>
        public_shipment_data[0]?.bl_number ? (
          public_shipment_data[0]?.bl_number === "" ? (
            "Unavailable"
          ) : (
            public_shipment_data[0]?.bl_number
          )
        ) : (
          <p>N/A</p>
        ),
    },
    // {
    //   name: "Date Sailed",
    //   selector: (row) =>
    //     row.date_sailed ? moment(row.date_sailed).format("DD/MM/YYYY") : "-",
    // },
    // {
    //   name: "Date Stuffed",
    //   selector: (row) =>
    //     row.date_stuffed ? moment(row.date_stuffed).format("DD/MM/YYYY") : "-",
    // },
    {
      name: "Size",
      selector: (row) => {
        return (
          <div>
            {/* {row?.container_size === undefined ? 'Unavailable' : row?.container_size} */}
            {public_shipment_data[0]?.container_size ? (
              public_shipment_data[0]?.container_size
            ) : (
              <span>N/A</span>
            )}
          </div>
        );
      },
    },
    {
      name: "Status",
      wrap: true,
      selector: (row) => {
        return <div>{row?.container_status}</div>;
      },
    },
    // {
    //   name: "Shipping Line Seal",
    //   selector: (row) =>
    //     row.shipping_line_seal_number ? row.shipping_line_seal_number : "-",
    // },
    // {
    //   name: "Update Issue",
    //   selector: "update_issue",
    // },
    // {
    //   name: "",
    //   selector: (row) => {
    //     return (
    //       <Link to={`#`} className="underline cursor-pointer green-text">
    //         View Details
    //       </Link>
    //     );
    //   },
    // },
  ];

  return (
    <div className="flex">
      {/* <NavBar /> */}
      <Aside
        activeTab="shipment"
        openAside={openAside}
        SetOpenAside={SetOpenAside}
      />
      <div className="flex-1 overflow-hidden">
        <TopBar title={"Shipments"} SetOpenAside={SetOpenAside} />
        <div className="lg:px-14 lg:pt-10 px-7 py-4">
          {loading ? (
            <PageLoading />
          ) : (
            <>
              <div className="bg-white" style={{ top: 20, position: "sticky" }}>
                <div className="grid grid-cols-3 items-center p-5 bg-green rounded-lg">
                  <div className="flex items-center">
                    <img
                      src={
                        public_shipment_data[0]?.shipment_type === "export"
                          ? arrowUp
                          : arrowDown
                      }
                      alt=""
                      width={40}
                      height={40}
                      className="bg-light-green p-2 rounded-full"
                    />

                    <p className="white-text text-sm ml-2 capitalize">
                      {" "}
                      {public_shipment_data[0]?.shipment_type}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="white-text text-xs opacity-75">
                      Cargo Pickup Date
                    </p>
                    <p className="white-text text-sm">
                      {moment(
                        public_shipment_data[0]?.cargo_pickup_date
                      ).format("LL")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="white-text text-xs opacity-75">Job Number</p>
                    <p className="white-text text-sm">
                      {public_shipment_data[0]?.job_number}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <CustomTabs
                    tabs={[
                      "Shipment Details",
                      "Container Details",
                      "Payment History",
                      "Tracking Details",
                    ]}
                    activeTab={tab}
                    setActiveTab={setTab}
                  />
                </div>
              </div>

              <div className="mt-10">
                {tab === "Shipment Details" && (
                  <>
                    <div className="top-divider left-divider right-divider rounded-t-lg">
                      <div className="grid grid-cols-2">
                        <p className="black-text text-sm py-3 px-5 ">
                          Job Number
                        </p>
                        <p className="black-text text-sm left-divider py-3 px-5 ">
                          {public_shipment_data[0]?.job_number}
                        </p>
                      </div>
                    </div>
                    <div className="solid-br ">
                      <div className="grid grid-cols-2">
                        <p className="black-text text-sm py-3 px-5 ">
                          Client Name
                        </p>
                        <p className="black-text text-sm left-divider py-3 px-5 ">
                          {public_shipment_data[0]?.client_name}
                        </p>
                      </div>
                    </div>
                    <div className="bottom-divider left-divider right-divider ">
                      <div className="grid grid-cols-2">
                        <p className="black-text text-sm py-3 px-5 ">
                          Client Email
                        </p>
                        <p className="black-text text-sm left-divider py-3 px-5 ">
                          {public_shipment_data[0]?.client_email}
                        </p>
                      </div>
                    </div>
                    <div className="bottom-divider left-divider right-divider ">
                      <div className="grid grid-cols-2">
                        <p className="black-text text-sm py-3 px-5 ">
                          B/L Number
                        </p>
                        <p className="black-text text-sm left-divider py-3 px-5 ">
                          {public_shipment_data[0]?.bl_number ? (
                            public_shipment_data[0]?.bl_number
                          ) : (
                            <span>N/A</span>
                          )}
                        </p>
                      </div>
                    </div>
                    {/* <div className="bottom-divider left-divider right-divider">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">
                        Container Details
                      </p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        <span>{public_shipment_data[0]?.container_details.length} container(s){" "}</span>
                        {public_shipment_data[0]?.container_details.map((item) => {
                          // <span>{item.container_size ? item.container_size : ''}</span>
                          if (item.container_size) {
                            return <span>x {item.container_size}{' '}</span>
                          }
                          return ''
                        })}
                      </p>
                    </div>
                  </div> */}
                    {/* <div className="bottom-divider left-divider right-divider">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">
                        Container Type
                      </p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        {public_shipment_data[0]?.container_type}
                      </p>
                    </div>
                  </div> */}
                    <div className="bottom-divider left-divider right-divider">
                      <div className="grid grid-cols-2">
                        <p className="black-text text-sm py-3 px-5 ">
                          Goods Type
                        </p>
                        <p className="black-text text-sm left-divider py-3 px-5 ">
                          {public_shipment_data[0]?.goods_type ? (
                            public_shipment_data[0]?.goods_type
                          ) : (
                            <span>N/A</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="bottom-divider left-divider right-divider">
                      <div className="grid grid-cols-2">
                        <p className="black-text text-sm py-3 px-5 ">
                          Activity status
                        </p>
                        <p className="black-text text-sm left-divider py-3 px-5 ">
                          {public_shipment_data[0]?.activity_status}
                        </p>
                      </div>
                    </div>
                    <div className="bottom-divider left-divider right-divider">
                      <div className="grid grid-cols-2">
                        <p className="black-text text-sm py-3 px-5 ">
                          Cargo Pickup Date
                        </p>
                        <p className="black-text text-sm left-divider py-3 px-5 ">
                          {moment(
                            public_shipment_data[0]?.cargo_pickup_date
                          ).format("LL")}
                        </p>
                      </div>
                    </div>
                    <div className="bottom-divider left-divider right-divider  rounded-b-lg">
                      <div className="grid grid-cols-2">
                        <p className="black-text text-sm py-3 px-5 ">
                          Post Shipment Done
                        </p>
                        <p className="black-text text-sm left-divider py-3 px-5 ">
                          {public_shipment_data[0]?.post_shipment_done
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                    </div>
                    {/* <div className="top-divider left-divider right-divider rounded-t-lg">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">
                        Shipment Batch
                      </p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        {public_shipment_data[0]?.batch}
                      </p>
                    </div>
                  </div>
                  <div className="solid-br ">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">
                        Shipment status
                      </p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        {public_shipment_data[0]?.shipment_status}
                      </p>
                    </div>
                  </div>
                  <div className="bottom-divider left-divider right-divider ">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">Gated in</p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        {public_shipment_data[0]?.has_gated_in ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="bottom-divider left-divider right-divider ">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">Sailed</p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        {public_shipment_data[0]?.has_sailed ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="bottom-divider left-divider right-divider">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">
                        Customs Brokerage
                      </p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        {public_shipment_data[0]?.customs_brokerage
                          ? "Yes"
                          : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="bottom-divider left-divider right-divider">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">
                        Terminal Handling
                      </p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        {public_shipment_data[0]?.terminal_handling
                          ? "Yes"
                          : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="bottom-divider left-divider right-divider">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">
                        Warehousing
                      </p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        {public_shipment_data[0]?.warehousing ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="bottom-divider left-divider right-divider">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">
                        Inland Logistics
                      </p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        {public_shipment_data[0]?.inland_logistics
                          ? "Yes"
                          : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="bottom-divider left-divider right-divider">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">
                        Ocean freight
                      </p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        {public_shipment_data[0]?.ocean_freight ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  <div className="bottom-divider left-divider right-divider  rounded-b-lg">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">
                        Marine Insurance
                      </p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        {public_shipment_data[0]?.marine_insurance
                          ? "Yes"
                          : "No"}
                      </p>
                    </div>
                  </div> */}

                    {/* <p className="black-text text-base mt-10 mb-3 font-semibold">
                    Origin Details
                  </p>

                  <div className="top-divider left-divider right-divider rounded-t-lg">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">
                        Origin Port
                      </p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        {public_shipment_data[0]?.origin_port_code}
                      </p>
                    </div>
                  </div>

                  <div className="solid-br">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">City</p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        Apapa
                      </p>
                    </div>
                  </div>

                  <div className="bottom-divider left-divider right-divider  rounded-b-lg">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">Country</p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        Nigeria
                      </p>
                    </div>
                  </div>

                  <p className="black-text text-base mt-10 mb-3 font-semibold">
                    Destination Details
                  </p>

                  <div className="top-divider left-divider right-divider rounded-t-lg">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">
                        Destination Port
                      </p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        {public_shipment_data[0]?.destination_port_code}
                      </p>
                    </div>
                  </div>

                  <div className="solid-br">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">City</p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        Ho Chi Minh City
                      </p>
                    </div>
                  </div>

                  <div className="bottom-divider left-divider right-divider  rounded-b-lg">
                    <div className="grid grid-cols-2">
                      <p className="black-text text-sm py-3 px-5 ">Country</p>
                      <p className="black-text text-sm left-divider py-3 px-5 ">
                        Vietnam
                      </p>
                    </div>
                  </div> */}
                  </>
                )}

                {tab === "Container Details" && (
                  <>
                    <div className="solid-br">
                      <DataTable
                        //@ts-ignore
                        columns={columns}
                        data={
                          public_shipment_data[0]?.container_details &&
                          public_shipment_data[0]?.container_details.length
                            ? public_shipment_data[0]?.container_details
                            : []
                        }
                        pagination
                        persistTableHead
                        responsive
                        // actions={
                        //   <ActionsMemo
                        //     handleFilter={handleFilter}
                        //     filteredInvoices={filteredInvoices}
                        //   />
                        // }
                        customStyles={customStyles}
                        //   selectableRows

                        // conditionalRowStyles={conditionalRowStyles}
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
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

      {/* <div className="mb-5 mr-3">
          <ExportCSV
            onExport={() => downloadCSV(filteredInvoices, "invoices.csv")}
          />
        </div> */}
      <input
        placeholder="Search"
        className="form-input px-4 py-1.5 custom-input w-full black-text w-52 mb-5"
        onChange={(e) => handleFilter(e.target.value, "search")}
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { loading, public_shipment_data } = state.shipment;
  return { loading, public_shipment_data };
};

export default connect(mapStateToProps, { getPublicShipmentById })(
  ShipmentDetails
);
