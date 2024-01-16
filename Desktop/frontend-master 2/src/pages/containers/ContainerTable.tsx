import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

//libraries
import { Table } from "antd";
import moment from "moment";

//icons
import search from "assets/icons/search.svg";
import filter from "assets/icons/Filter-grey.svg";

// helpers
import { getOrigin, getDestination } from "helpers/tableLocation";

const ContainerTable = (props: any) => {
  const {
    filteredShipments,
    total_count,
    handlePerRowsChange,
    handlePageChange,
    handleSearch,
    setFilterDisplay,
    filterObject,
    contSearch,
    setContSearch
  } = props;

  const navigate = useNavigate();

  const [page, setPage] = useState(parseInt(filterObject.page));
  const [data, setData] = useState(filteredShipments);

  // const [contSearch, setContSearch] = useState(job ? job : "");

  const [searchParams] = useSearchParams();
  const query = searchParams.get("j");

  useEffect(() => {
    setData(filteredShipments);
  }, [filteredShipments]);

  useEffect(() => {
    setPage(parseInt(filterObject.page));
  }, [filterObject]);


  const columns = [
    {
      title: "Job Number",
      dataIndex: "job_number",
      key: "job_number",
      // width: 150,
      render: (_, { shipment_details }) => (
        <>
          {shipment_details[0]?.job_number
            ? shipment_details[0]?.job_number
            : "N/A"}
        </>
      ),
    },
    {
      title: "Container Number",
      dataIndex: "shipment_type",
      key: "shipment_type",
      render: (_, { container_number }) => (
        <>{container_number ? <span>{container_number}</span> : "N/A"}</>
      ),
    },
    {
      title: "BL Number",
      dataIndex: "shipment_transport_type",
      key: "shipment_transport_type",
      render: (_, { shipment_details }) => (
        <>
          {shipment_details[0]?.bl_number
            ? shipment_details[0]?.bl_number
            : "N/A"}
        </>
      ),
    },
    {
      title: "Cont. Size (FT) ",
      dataIndex: "origin_port_code",
      key: "origin_port_code",
      render: (_, { container_size }) => (
        <>{container_size ? <span>{container_size}</span> : "N/A"}</>
      ),
    },
    {
      title: "Status",
      dataIndex: "shipment_status",
      key: "shipment_status",
      render: (_, row, { container_status }) => (
        <>
          <div
            className={`py-1.5 px-2 rounded-lg mt-3 mb-3 w-[110px] text-center 
                            ${
                              row?.container_status === "pending approval"
                                ? "background-green"
                                : row?.container_status?.toLowerCase() ===
                                  "in transit"
                                ? "bg-[#ECFBFF]"
                                : row?.container_status?.toLowerCase() === "new"
                                ? "bg-[#FFFADF]"
                                : row?.container_status?.toLowerCase() ===
                                  "file opening"
                                ? "bg-[#ffe75d33]"
                                : row?.container_status?.toLowerCase() ===
                                  "file closed"
                                ? "bg-[#98ff9b4d]"
                                : row?.container_status?.toLowerCase() ===
                                  "cancelled"
                                ? "bg-red-100"
                                : ""
                            }`}
          >
            <p
              className={`text-xs capitalize text-center ${
                row?.container_status?.toLowerCase() === "in transit"
                  ? "text-[#296FD8]"
                  : row?.container_status?.toLowerCase() === "pending approval"
                  ? "text-[#059C01]"
                  : row?.container_status?.toLowerCase() === "new"
                  ? "text-[#C27500]"
                  : row?.container_status?.toLowerCase() === "file opening"
                  ? "text-[#DB8900]"
                  : row?.container_status?.toLowerCase() === "file closed"
                  ? "text-[#007200]"
                  : row?.container_status?.toLowerCase() === "cancelled"
                  ? "text-red-600"
                  : ""
              }`}
            >
              {row?.container_status?.toLowerCase() === "file opening" ? (
                <span>In Progress</span>
              ) : row?.container_status?.toLowerCase() === "file closed" ? (
                <span>Completed</span>
              ) : (
                row.container_status
              )}
            </p>
          </div>
        </>
      ),
    },

    {
      title: "Tracking",
      key: "operation",
      fixed: "right",
      width: 190,
      render: (_, row, { inland_tracking_url }) => (
        <>
          {row.container_tracking_details.length > 0 ? (
            <p
              className="text-sm text-[#3AB44A] font-medium p-2 cursor-pointer"
              onClick={() => navigate(`/container/${row?.["_id"]}`)}
            >
              View Tracking
            </p>
          ) : (
            <p className="text-sm grey-text-1 font-normal p-2">Unavailable</p>
          )}
        </>
      ),
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
                placeholder="Search Containers"
                className=""
                onChange={(e) => {
                  setContSearch(e.target.value)
                  handleSearch(e.target.value, "search")
                }}
                value={contSearch}
              />
            </div>

            {/* filter */}
            {/* <div
                            className="cursor-pointer px-4 flex items-center gap-x-1 border border-[#e5e7eb] rounded  h-[37.6px] mt-[-20px]"
                            onClick={() => {
                                setFilterDisplay(true);
                            }}
                        >
                            <div><img src={filter} alt=""></img></div>
                            <p className="text-xs text-[#9CA3AF]">Filter</p>
                        </div> */}
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
              // console.log("page", page - 1);
              // console.log("pageSize", pageSize);
            },
          }}
          scroll={{ x: 1120 }}
        />
      </div>
    </div>
  );
};

export default ContainerTable;
