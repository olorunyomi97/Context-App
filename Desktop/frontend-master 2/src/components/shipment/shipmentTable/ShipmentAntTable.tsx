import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import moment from "moment";

//icons
import search from "assets/icons/search.svg";
import filter from "assets/icons/Filter-grey.svg";

// helpers
import { getOrigin, getDestination } from "helpers/tableLocation";

const ShipmentAntTable = (props: any) => {
  const {
    filteredShipments,
    total_count,
    handlePerRowsChange,
    handlePageChange,
    handleSearch,
    setFilterDisplay,
    filterObject,
  } = props;

  const navigate = useNavigate();
  const [page, setPage] = useState(parseInt(filterObject.page));
  // console.log("filteredShipments", filteredShipments);

  const [data, setData] = useState(filteredShipments);

  useEffect(() => {
    setData(filteredShipments);
  }, [filteredShipments]);

  useEffect(() => {
    setPage(parseInt(filterObject.page));
  }, [filterObject]);
  console.log("paggeeee", page);

  const columns = [
    {
      title: "Job Number",
      dataIndex: "job_number",
      key: "job_number",
      fixed: "left",
      render: (_, { job_number }) => <>{job_number ? job_number : "N/A"}</>,
    },

    {
      title: "Shipment Type",
      dataIndex: "shipment_type",
      key: "shipment_type",
      render: (_, { shipment_type }) => (
        <>{shipment_type === "export" ? <p>Export</p> : <p>Import</p>}</>
      ),
    },

    {
      title: "Service Type",
      dataIndex: "shipment_transport_type",
      key: "shipment_transport_type",
      render: (_, { shipment_transport_type }) => (
        <>
          {shipment_transport_type === "air_freight" && "Air Freight"}
          {shipment_transport_type === "ocean_freight" && "Ocean Freight"}
          {shipment_transport_type === "warehousing" && "Warehousing"}
          {shipment_transport_type === "customs_brokerage" &&
            "Customs Brokerage"}
          {shipment_transport_type === "haulage" && "Haulage"}
        </>
      ),
    },

    {
      title: "Origin",
      dataIndex: "origin_port_code",
      key: "origin_port_code",
      render: (_, row) => <span className="capitalize">{getOrigin(row)}</span>,
    },

    {
      title: "Destination",
      dataIndex: "destination_port_code",
      key: "destination_port_code",
      render: (_, row) => (
        <span className="capitalize">{getDestination(row)}</span>
      ),
    },

    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, { createdAt }) => (
        <>{moment(createdAt).format("DD/MM/YYYY")}</>
      ),
    },

    {
      title: "Status",
      dataIndex: "shipment_status",
      key: "shipment_status",
      render: (_, row, { shipment_status }) => (
        <>
          <div
            className={`py-1 px-1.5 rounded-full mt-3 mb-3 w-[115px] text-center ${
              row.shipment_status === "active"
                ? "bg-green-100"
                : row.shipment_status === "new booking"
                ? "background-blue"
                : row.shipment_status === "pending"
                ? "background-blue"
                : row.shipment_status === "invoice accepted"
                ? "bg-[#FFFADF]"
                : row.shipment_status === "completed"
                ? "bg-[#FFFADF]"
                : row.shipment_status === "cancelled"
                ? "bg-red-100"
                : ""
            }`}
          >
            <p
              className={`text-xs capitalize text-center ${
                row.shipment_status === "new booking"
                  ? "text-[#4B83F0]"
                  : row.shipment_status === "pending"
                  ? "text-[#4B83F0]"
                  : row.shipment_status === "active"
                  ? "text-[#059C01]"
                  : row.shipment_status === "invoice accepted"
                  ? "text-[#C27500]"
                  : row.shipment_status === "completed"
                  ? "text-[#C27500]"
                  : row.shipment_status === "cancelled"
                  ? "text-red-600"
                  : ""
              }`}
            >
              {row.shipment_status}
            </p>
          </div>
        </>
      ),
    },

    {
      title: "",
      key: "operation",
      fixed: "right",
      width: 140,
      render: (_, row) => {
        return parseInt(row.invoice_amount_pending) === 0 ? (
          <></>
        ) : (
          <div
            className="p-1 rounded cursor-pointer"
            onClick={() => {
              //   setSelectedInvoice(row);
              //   setIsOpen(true);
              navigate(`/shipments/${row?.["_id"]}`, {
                state: {
                  id: row?.["_id"],
                  ship_category: `${
                    row.shipment_type + row.shipment_transport_type
                  }`,
                  service: row.shipment_transport_type,
                },
              });
            }}
          >
            <p className="text-sm text-center text-[#3AB44A] font-medium p-2 cursor-pointer">
              View Details
            </p>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="mb-1">
        <div className="pt-2 flex justify-between items-center">
          <div className="flex items-center gap-x-[16px]">
            {/* search */}
            <div className="flex items-center gap-x-1 form-input px-4 py-1.5 custom-input w-full black-text w-[264px] mb-5">
              <div className="">
                <img src={search} alt=""></img>
              </div>
              <input
                placeholder="Search Shipments"
                className=""
                onChange={(e) => handleSearch(e.target.value, "search")}
              />
            </div>

            {/* filter */}
            <div
              className="cursor-pointer px-4 flex items-center gap-x-1 border border-[#e5e7eb] rounded  h-[37.6px] mt-[-20px]"
              onClick={() => setFilterDisplay(true)}>
              <div><img className="min-w-[16px]" src={filter} alt=""></img></div>
              <p className="text-xs text-[#9CA3AF]">Filter</p>
            </div>
          </div>

          <div className="mb-5 desktop-only">
            {/* <ExportCSV
                        onExport={() => downloadCSV(filteredBookings, "bookings.csv")}
                    /> */}
          </div>
        </div>
      </div>
      <div>
        <Table
          //   @ts-ignore
          columns={columns}
          dataSource={data}
          pagination={{
            defaultPageSize: 10,
            total: total_count,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            current: page + 1,
            showSizeChanger: true,
            pageSizeOptions: ["10", "15", "20", "30"],
            onChange: (page, pageSize) => {
              handlePageChange(page - 1);
              handlePerRowsChange(pageSize, page - 1);
              console.log("page", page - 1);
              console.log("pageSize", pageSize);
            },
          }}
          scroll={{ x: 1500 }}
        />
      </div>
    </div>
  );
};

export default ShipmentAntTable;
