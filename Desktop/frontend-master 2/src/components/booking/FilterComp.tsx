import React from "react";
import { useState } from "react";

//components
import CustomDefaultSelect from "components/selectInputs/CustomDefaultSelect";

//libraries
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useForm } from "react-hook-form";
import moment from "moment";

// icons
import calendar from "assets/icons/calendar1.svg";
import stroke from "assets/icons/stroke-down.svg";
import PrimaryButtons from "components/buttons/PrimaryButtons";

const FilterComp = (props: any): JSX.Element => {
  const {
    handleFilter,
    filteredBookings,
    applyFilter,
    filterDisplay,
    exportMain,
    setExportMain,
    importMain,
    setImportMain,
    air,
    setAir,
    haulage,
    setHaulage,
    ocean,
    setOcean,
    warehouse,
    setWarehouse,
    cbt,
    setCBT,
    setFilterDisplay,
    loading,
    dateRange,
    setDateRange,
    startDate,
    endDate,
    clear,
    setClear,
    type,
  } = props;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [shipmentType, setShipmentType] = useState("");
  const [shipmentTransportType, setShipmentTransportType] = useState("");
  const [, updateState] = React.useState();
  //@ts-ignore
  const forceUpdate = React.useCallback(() => updateState({}), []);
  // const [clear, setClear] = useState(false);
  //   const [filterDisplay, setFilterDisplay] = useState(false);

  const onSubmit = (data: any) => {
    setFilterDisplay(false);
    handleFilter({
      shipment_transport_type: shipmentTransportType,
      shipment_type: shipmentType,
      shipment_status:
        data.type_of_status.value === undefined
          ? ""
          : data.type_of_status.value,
      start_date:
        startDate === null ? "" : moment(startDate).format("MM/DD/YYYY"),
      end_date: endDate === null ? "" : moment(endDate).format("MM/DD/YYYY"),
    });
  };

  return (
    // {/* filtered page **********************/}
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={filterDisplay ? "bg-[white] w-full z-50 shadow-xl" : "hidden"}
    >
      {/* scroll */}
      <div className="py-6 rounded px-7 overflow-y-auto ">
        {/* head */}
        <div className="flex items-center justify-between">
          <p className="text-base black-text-3">Filter</p>

          <div className="cursor-pointer">
            <p
              className="text-sm font-medium text-[#8A0000]"
              onClick={() => {
                console.log("what is showing filter ");
                handleFilter({
                  shipment_transport_type: "",
                  shipment_type: "",
                  shipment_status: "",
                  start_date: "",
                  end_date: "",
                });
                setAir(false);
                setExportMain(false);
                setImportMain(false);
                setHaulage(false);
                setOcean(false);
                setFilterDisplay(false);
                // setDefaultValues(" ");
                // setClear(!clear);
                // forceUpdate();
              }}
            >
              Clear filter
            </p>
          </div>
        </div>

        {/* line */}
        <div className="w-full h-[1px] my-6 bg-[#F3F4F6]"></div>

        {/* shipment type */}
        <div className="">
          <p className="black-text-3 text-sm mb-[16px]">Shipment Type</p>

          {/* div */}
          <div className="flex items-center gap-x-[8px]">
            {/* Export */}

            <div
              className={
                exportMain
                  ? "bg-[#1F2937]  rounded-3xl py-1 px-2 cursor-pointer"
                  : "border border-[#D1D5DB] rounded-3xl py-1 px-2 cursor-pointer"
              }
              onClick={() => {
                setExportMain(true);
                setImportMain(false);
                setShipmentType("export");
              }}
            >
              <p
                className={
                  exportMain ? "text-xs text-[white]" : "text-xs text-[#6B7280]"
                }
              >
                Export
              </p>
            </div>

            {/* Import */}

            <div
              className={
                importMain
                  ? "bg-[#1F2937]  rounded-3xl py-1 px-2 cursor-pointer"
                  : "border border-[#D1D5DB] rounded-3xl py-1 px-2 cursor-pointer"
              }
              onClick={() => {
                setImportMain(true);
                setExportMain(false);
                setShipmentType("import");
              }}
            >
              <p
                className={
                  importMain ? "text-xs text-[white]" : "text-xs text-[#6B7280]"
                }
              >
                Import
              </p>
            </div>
          </div>
        </div>

        {/* Transport type */}
        <div className="">
          <p className="black-text-3 text-sm mt-6 mb-4">Transportation Type</p>

          {/* div */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
            <div
              className={
                ocean
                  ? "bg-[#1F2937] rounded-3xl py-1 px-2 cursor-pointer"
                  : "border border-[#D1D5DB] rounded-3xl py-1 px-2 cursor-pointer"
              }
              onClick={() => {
                setHaulage(false);
                setAir(false);
                setOcean(true);
                setWarehouse(false);
                setCBT(false);
                setShipmentTransportType("ocean_freight");
              }}
            >
              <p
                className={
                  ocean ? "text-xs text-[white]" : "text-xs text-[#6B7280]"
                }
              >
                Ocean
              </p>
            </div>

            <div
              className={
                air
                  ? "bg-[#1F2937] rounded-3xl py-1 px-2 cursor-pointer"
                  : "border border-[#D1D5DB] rounded-3xl py-1 px-2 cursor-pointer"
              }
              onClick={() => {
                setHaulage(false);
                setAir(true);
                setOcean(false);
                setWarehouse(false);
                setCBT(false);
                setShipmentTransportType("air_freight");
              }}
            >
              <p
                className={
                  air ? "text-xs text-[white]" : "text-xs text-[#6B7280]"
                }
              >
                Air
              </p>
            </div>

            <div
              className={
                haulage
                  ? "bg-[#1F2937] rounded-3xl py-1 px-2 cursor-pointer"
                  : "border border-[#D1D5DB] rounded-3xl py-1 px-2 cursor-pointer"
              }
              onClick={() => {
                setHaulage(true);
                setAir(false);
                setOcean(false);
                setWarehouse(false);
                setCBT(false);
                setShipmentTransportType("haulage");
              }}
            >
              <p
                className={
                  haulage ? "text-xs text-[white]" : "text-xs text-[#6B7280]"
                }
              >
                Haulage
              </p>
            </div>

            <div
              className={
                warehouse
                  ? "bg-[#1F2937] rounded-3xl py-1 px-2 cursor-pointer"
                  : "border border-[#D1D5DB] rounded-3xl py-1 px-2 cursor-pointer"
              }
              onClick={() => {
                setHaulage(false);
                setAir(false);
                setOcean(false);
                setWarehouse(true);
                setCBT(false);
                setShipmentTransportType("warehousing");
              }}
            >
              <p
                className={
                  warehouse ? "text-xs text-[white]" : "text-xs text-[#6B7280]"
                }
              >
                Warehouse
              </p>
            </div>

            <div
              className={
                cbt
                  ? "bg-[#1F2937] rounded-3xl py-1 px-2 cursor-pointer"
                  : "border border-[#D1D5DB] rounded-3xl py-1 px-2 cursor-pointer"
              }
              onClick={() => {
                setHaulage(false);
                setAir(false);
                setOcean(false);
                setWarehouse(false);
                setCBT(true);
                setShipmentTransportType("customs_brokerage");
              }}
            >
              <p
                className={
                  cbt ? "text-xs text-[white]" : "text-xs text-[#6B7280]"
                }
              >
                CBT
              </p>
            </div>
          </div>
        </div>

        {/* line */}
        <div className="w-full h-[1px] my-6 bg-[#F3F4F6]"></div>

        {/* status */}
        <div className="w-full ">
          <p className="black-text-3 text-sm">Status</p>
          {/* select */}
          <div className="mt-[-16px]">
            <CustomDefaultSelect
              control={control}
              name={"type_of_status"}
              id={"type_of_status"}
              label={""}
              placeholder={"Select Status"}
              isRequired={false}
              errors={errors}
              isDisabled={false}
              defaultValue={""}
              options={
                type === "booking"
                  ? [
                      { label: "New booking", value: "new booking" },
                      // { label: "Pending approval", value: "pending approval" },
                      { label: "Awaiting quotes", value: "awaiting quotes" },
                      { label: "Cancelled", value: "cancel" },
                    ]
                  : [
                      { label: "Active", value: "active" },
                      { label: "Pending", value: "pending" },
                      { label: "Cancelled", value: "cancel" },
                      { label: "Completed", value: "completed" },
                    ]
              }
              icon=""
            />
          </div>
        </div>

        {/* line */}
        <div className="w-full h-[1px] my-6 bg-[#F3F4F6]"></div>

        {/* est shipment date */}
        <div className="w-full">
          <p className="black-text-3 text-sm mb-[12px]">Est. Shipment Date</p>
          {/* date comp */}
          <div className="border border-[#E5E7EB] rounded flex items-center  px-4 ">
            {/* image */}
            <div className="min-h-[14px] h-[24px] w-[26px] min-w-[16px] mt-2">
              <img src={calendar} alt="" className=""></img>
            </div>
            <DatePicker
              className="w-[90%]  text-xs border-none rounded py-[18px]  black-text bg-white"
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              isClearable={true}
            />

            {/* image */}
            <div className="min-w-[13.67px] min-h-[5.83px]">
              <img src={stroke} alt="" className=""></img>
            </div>
          </div>
        </div>

        {/* cancel and apply filter button */}
        <div className="flex item-center gap-x-[24px] mt-[48px]">
          {/* cancel */}
          <div
            className="bg-[#F9FAFB] py-[10px] px-[14px] rounded cursor-pointer"
            onClick={() => setFilterDisplay(false)}
          >
            <p className="text-sm text-[#139C33]">Cancel</p>
          </div>

          {/* apply filter */}

          <PrimaryButtons
            title="Apply filter"
            style={{}}
            disabled={false}
            loading={loading}
            icon={""}
          />
        </div>
      </div>
    </form>
  );
};

export default FilterComp;
