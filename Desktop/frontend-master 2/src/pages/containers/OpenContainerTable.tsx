import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

//libraries
import { Table } from "antd";
import moment from "moment";

//icons
import search from "assets/icons/search.svg";
import filter from "assets/icons/Filter-grey.svg";

// helpers
import { getOrigin, getDestination } from "helpers/tableLocation";

//components
import OfapLogin from "components/ofap/OfapLogin";

const OpenContainerTable = (props: any) => {
  const {
    filteredShipments,
    total_count,
    handlePerRowsChange,
    handlePageChange,
    handleSearch,
    setFilterDisplay,
    filterObject,
    contSearch,
    setContSearch,
    setShowLogin,
    setShowShipCondition,
    job
  } = props;

  const navigate = useNavigate();

  const [page, setPage] = useState(parseInt(filterObject.page));
  const [data, setData] = useState(filteredShipments);

  let user = useSelector((state: any) => state.auth.user_data);
  // @ts-ignore
  user = user ? user : localStorage.getItem("user_data");

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
      title: "Container Number",
      dataIndex: "container_number",
      key: "container_number",
      render: (_, { container_number }) => (
        <>{container_number ? <span>{container_number}</span> : "N/A"}</>
      ),
    },
    {
      title: "Cont. Size (FT) ",
      dataIndex: "container_size",
      key: "container_size",
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
                            ${row?.container_status === "pending approval"
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
              className={`text-xs capitalize text-center ${row?.container_status?.toLowerCase() === "in transit"
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
      title: "",
      key: "operation",
      fixed: "right",
      width: 190,
      render: (_, row, { inland_tracking_url }) => (
        <>
            <p
              className="text-sm text-[#3AB44A] font-medium p-2 cursor-pointer"
              onClick={() => {
                if (user) {
                  navigate(`/shipments/${row?.shipment_details[0]["_id"]}`)
                } else {
                  sessionStorage.setItem("jobNumber", `${row?.shipment_details[0]["_id"]}`);
                  sessionStorage.setItem("invalidJobNumber", job); //job number here references the shipment id of the container
                  setShowShipCondition(true);
                  setShowLogin(true);
                }
              }}
            >
              View Details
            </p>
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

export default OpenContainerTable;
