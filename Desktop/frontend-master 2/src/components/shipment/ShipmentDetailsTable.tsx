import React from "react";

//icons
import divider from "assets/icons/divider.svg";

const ShipmentDetailsTable = ({ tab, setTab, shipment_data }) => {
  // console.log("nwife>>>", shipment_data)
  return (
    <div className="mt-6 solid-br rounded mb-9">
      <div className="flex items-center gap-x-4 pt-4 px-6 pb-[17px]">
        <p
          className="black-text-3 font-normal text-base"
          onClick={() => setTab("con-details")}
        >
          Container Details
        </p>
        {/* <p><img src={divider} alt="" /></p>
        <p
          className={`${tab === "con-tracking"
            ? "text-[#005C00] font-normal"
            : "grey-text-1 font-light"
            } text-sm cursor-pointer`}
          onClick={() => setTab("con-tracking")}
        >
          Container Tracking
        </p> */}
      </div>
      <>
        {tab === "con-details" ? (
          <>
            <div className="hidden xl:block">
              {shipment_data?.container_details?.length > 0 ? (
                <table className="booking-details shipment-details">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Job Number</th>
                      <th>Cont. Number</th>
                      <th>BL Number</th>
                      <th>Cont. Size</th>
                      <th>Stuffing Date</th>
                      <th>Cont. Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipment_data?.container_details?.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td className="uppercase">
                          {shipment_data.job_number
                            ? shipment_data.job_number
                            : "N/A"}
                        </td>
                        <td className="uppercase">
                          {item.container_number
                            ? item.container_number
                            : "N/A"}
                        </td>
                        {/* <td className="uppercase">
                                                    {item.shipping_line_seal_number
                                                        ? item.shipping_line_seal_number
                                                        : "N/A"}
                                                </td> */}

                        <td className="uppercase">
                          {shipment_data.bl_number
                            ? shipment_data.bl_number
                            : "N/A"}
                        </td>
                        <td>
                          {item.container_size ? item.container_size : "N/A"}
                        </td>
                        <td>{item.date_stuffed ? item.date_stuffed : "N/A"}</td>
                        <td className="capitalize">
                          {item.container_type ? item.container_type : "N/A"}
                        </td>
                        <td>
                          {item.container_status ? (
                            item.container_status.toLowerCase() === "new" ? (
                              <p className="text-xs text-[#C27500] py-1 px-2 rounded-full bg-[#FFFADF] font-normal w-fit">
                                New
                              </p>
                            ) : item.container_status.toLowerCase() ===
                              "in transit" ? (
                              <p className="text-xs text-[#296FD8] py-1 px-2 rounded-full bg-[#ECFBFF] font-normal w-fit">
                                In Transit
                              </p>
                            ) : item.container_status.toLowerCase() ===
                              "file closed" ? (
                              <p className="text-xs text-[#007200] py-1 px-2 rounded-full bg-[#98ff9b4d] font-normal w-fit">
                                Completed
                              </p>
                            ) : item.container_status.toLowerCase() ===
                              "file opening" ? (
                              <p className="text-xs text-[#DB8900] py-1 px-2 rounded-full bg-[#ffe75d33] font-normal w-fit">
                                In Progress
                              </p>
                            ) : (
                              <p className="text-xs py-1 px-2 font-normal w-fit">
                                {item.container_status}
                              </p>
                            )
                          ) : (
                            "N/A"
                          )}
                        </td>
                        {/* <td>N/A</td> */}
                      </tr>
                    ))}

                    {/* <tr>
                                <td>2</td>
                                <td>COB3442217</td>
                                <td>11094</td>
                                <td>40</td>
                                <td>N/A</td>
                                <td>22-11-2022</td>
                                <td><p className="text-xs text-[#0047A9] py-1 px-2 rounded-full bg-[#d0f5ff4d] font-normal w-fit">New</p> </td>
                                <td>Container has left the warehouse</td>
                            </tr> */}
                  </tbody>
                </table>
              ) : (
                <>
                  <table className="booking-details shipment-details">
                    <tr>
                      <th>#</th>
                      <th>Cont. Number</th>
                      <th>Seal Number</th>
                      <th>Cont. Size (FT)</th>
                      <th>BL Number</th>
                      <th>Stuffing Date</th>
                    </tr>
                  </table>
                  <div className="flex flex-col justify-center items-center gap-y-2 mt-10 mb-11">
                    <p className="grey-text text-xl">No Container(s)</p>
                    <p className="text-sm font-light grey-text-1 max-w-[296px] text-center">
                      Kindly be patient as our sales representative uploads your
                      container details
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="xl:hidden">
              {shipment_data?.container_details?.length > 0 ? (
                shipment_data?.container_details?.map((item, idx) => (
                  <div key={idx}>
                    <p className="px-6 py-[17px] text-sm grey-text bg-[#F9FAFB]">
                      Load {idx + 1}
                    </p>
                    <div className="px-6 py-5 grid grid-cols-2 gap-y-6">
                      <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">
                          Job Number
                        </p>
                        <p className="black-text text-sm uppercase">
                          {shipment_data.job_number
                            ? shipment_data.job_number
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">
                          Cont. Number
                        </p>
                        <p className="black-text text-sm uppercase">
                          {item.container_number
                            ? item.container_number
                            : "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">
                          BL Number
                        </p>
                        <p className="black-text text-sm uppercase">
                          {shipment_data.bl_number
                            ? shipment_data.bl_number
                            : "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="grey-text text-sm pb-1.5 font-light">
                          Cont. Size (FT)
                        </p>
                        <p className="black-text text-sm uppercase">
                          {item.container_size ? item.container_size : "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="grey-text text-sm pb-1.5 font-light">
                          Stuffing Date
                        </p>
                        <p className="black-text text-sm uppercase">
                          {item.date_stuffed ? item.date_stuffed : "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="grey-text text-sm pb-1.5 font-light">
                          Cont. Type
                        </p>
                        <p className="black-text text-sm capitalize">
                          {item.container_type ? item.container_type : "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">
                          Container Status
                        </p>
                        <p className="black-text text-sm">
                          {item.container_status ? (
                            item.container_status.toLowerCase() === "new" ? (
                              <p className="text-xs text-[#059C01] py-1 px-2 rounded-full bg-[#99ff7d1a] font-normal w-fit">
                                New
                              </p>
                            ) : item.container_status.toLowerCase() ===
                              "in transit" ? (
                              <p className="text-xs text-[#0047A9] py-1 px-2 rounded-full bg-[#d0f5ff4d] font-normal w-fit">
                                In Transit
                              </p>
                            ) : item.container_status.toLowerCase() ===
                              "file closed" ? (
                              <p className="text-xs text-[#7B3A00] py-1 px-2 rounded-full bg-[#ffe75d1a] font-normal w-fit">
                                File Closed
                              </p>
                            ) : item.container_status.toLowerCase() ===
                              "file opening" ? (
                              <p className="text-xs text-[#005D00] py-1 px-2 rounded-full bg-[#99ff7d1a] font-normal w-fit">
                                In Progress
                              </p>
                            ) : (
                              <p className="text-xs py-1 px-2 font-normal w-fit">
                                {item.container_status}
                              </p>
                            )
                          ) : (
                            "N/A"
                          )}
                        </p>
                      </div>

                      {/* <div>
                                                <p className="grey-text text-sm  pb-1.5 font-light">
                                                    Stuffing Date
                                                </p>
                                                <p className="black-text text-sm">
                                                    {item.date_stuffed ? item.date_stuffed : "N/A"}
                                                </p>
                                            </div> */}

                      {/* <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">
                          Remarks
                        </p>
                        <p className="black-text text-sm">N/A</p>
                      </div> */}
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="bg-grey px-6 py-[18px] ">
                    <p className="text-sm text-[#004900] font-medium">Load 1</p>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-y-2 mt-8 my-6">
                    <p className="grey-text text-xl">No Container(s)</p>
                    <p className="text-sm font-light grey-text-1 max-w-[296px] text-center">
                      Kindly be patient as our sales representative uploads your
                      container details
                    </p>
                  </div>
                </>
              )}
              {/* <div>
                <p className="px-6 py-[17px] text-sm grey-text bg-[#F9FAFB]">Load 2</p>
                <div className="px-6 py-5 grid grid-cols-2 gap-y-6">
                    <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">Cont. Number</p>
                        <p className="black-text text-sm">COB3442217</p>
                    </div>

                    <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">Seal Number</p>
                        <p className="black-text text-sm">11094</p>
                    </div>

                    <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">Cont. Size (FT)</p>
                        <p className="black-text text-sm">40</p>
                    </div>

                    <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">BL Number</p>
                        <p className="black-text text-sm">302465193</p>
                    </div>

                    <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">Container Status</p>
                        <p className="black-text text-sm">In Transit </p>
                    </div>

                    <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">Stuffing Date</p>
                        <p className="black-text text-sm">22-11-2022</p>
                    </div>

                    <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">Remarks</p>
                        <p className="black-text text-sm">Stuffing Completed</p>
                    </div>
                </div>
            </div> */}
            </div>
          </>
        ) : (
          <>
            <div className="hidden xl:block">
              {shipment_data?.container_details?.length > 0 ? (
                <table className="booking-details shipment-details">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Container Number</th>
                      <th>Job Number</th>
                      <th>Container Status</th>
                      <th>Status Update Date</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipment_data?.container_details?.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td className="uppercase">
                          {item.container_number
                            ? item.container_number
                            : "N/A"}
                        </td>
                        <td>
                          {shipment_data.job_number
                            ? shipment_data.job_number
                            : "N/A"}
                        </td>
                        <td>
                          {item.container_status ? (
                            item.container_status === "NEW" ? (
                              <p className="text-xs text-[#059C01] py-1 px-2 rounded-full bg-[#99ff7d1a] font-normal w-fit">
                                New
                              </p>
                            ) : item.container_status === "In Transit" ? (
                              <p className="text-xs text-[#0047A9] py-1 px-2 rounded-full bg-[#d0f5ff4d] font-normal w-fit">
                                In Transit
                              </p>
                            ) : item.container_status === "File Closed" ? (
                              <p className="text-xs text-[#7B3A00] py-1 px-2 rounded-full bg-[#ffe75d1a] font-normal w-fit">
                                File Closed
                              </p>
                            ) : item.container_status === "File Opening" ? (
                              <p className="text-xs text-[#005D00] py-1 px-2 rounded-full bg-[#99ff7d1a] font-normal w-fit">
                                In-Progress
                              </p>
                            ) : (
                              <p className="text-xs py-1 px-2 font-normal w-fit">
                                {item.container_status}
                              </p>
                            )
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td>
                          {item.updatedAt
                            ? item?.updatedAt?.slice(0, 10)
                            : "N/A"}
                        </td>
                        <td>N/A</td>
                      </tr>
                    ))}
                    {/* <tr>
                                <td>2</td>
                                <td>Dummy Text</td>
                                <td>20</td>
                                <td>1000</td>
                                <td><p className="text-xs text-[#0047A9] py-1 px-2 rounded-full bg-[#d0f5ff4d] font-normal w-fit">New</p></td>
                                <td>22-11-2022</td>
                            </tr> */}
                  </tbody>
                </table>
              ) : (
                <>
                  <table className="booking-details shipment-details">
                    <tr>
                      <th>#</th>
                      <th>Container Number</th>
                      <th>Job Number</th>
                      <th>Container Status</th>
                      <th>Status Update Date</th>
                      <th>Remarks</th>
                    </tr>
                  </table>
                  <div className="flex flex-col justify-center items-center gap-y-2 mt-10 mb-11">
                    <p className="grey-text text-xl">No Container(s)</p>
                    <p className="text-sm font-light grey-text-1 max-w-[296px] text-center">
                      Kindly be patient as our sales representative uploads your
                      container details
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="xl:hidden">
              {shipment_data?.container_details?.length > 0 ? (
                shipment_data?.container_details?.map((item, idx) => (
                  <div key={idx}>
                    <p className="px-6 py-[17px] text-sm grey-text bg-[#F9FAFB]">
                      Load {idx + 1}
                    </p>
                    <div className="px-6 py-5 grid grid-cols-2 gap-y-6">
                      <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">
                          Cont. Number
                        </p>
                        <p className="black-text text-sm uppercase">
                          {item.container_number
                            ? item.container_number
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">
                          Job Number
                        </p>
                        <p className="black-text text-sm">
                          {shipment_data.job_number
                            ? shipment_data.job_number
                            : "N/A"}
                        </p>
                      </div>

                      {/* <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">Cont. Size (FT)</p>
                        <p className="black-text text-sm">{item.container_size ? item.container_size?.slice(0, 2) : "N/A"}</p>
                      </div>

                      <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">BL Number</p>
                        <p className="black-text text-sm">
                          {shipment_data.bl_number ? shipment_data.bl_number : "N/A"}
                        </p>
                      </div> */}

                      <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">
                          Container Status
                        </p>
                        <p className="black-text text-sm">
                          {item.container_status ? (
                            item.container_status === "NEW" ? (
                              <p className="text-xs text-[#059C01] py-1 px-2 rounded-full bg-[#99ff7d1a] font-normal w-fit">
                                New
                              </p>
                            ) : item.container_status === "In Transit" ? (
                              <p className="text-xs text-[#0047A9] py-1 px-2 rounded-full bg-[#d0f5ff4d] font-normal w-fit">
                                In Transit
                              </p>
                            ) : item.container_status === "File Closed" ? (
                              <p className="text-xs text-[#7B3A00] py-1 px-2 rounded-full bg-[#ffe75d1a] font-normal w-fit">
                                File Closed
                              </p>
                            ) : item.container_status === "File Opening" ? (
                              <p className="text-xs text-[#005D00] py-1 px-2 rounded-full bg-[#99ff7d1a] font-normal w-fit">
                                File Opening
                              </p>
                            ) : (
                              <p className="text-xs py-1 px-2 font-normal w-fit">
                                {item.container_status}
                              </p>
                            )
                          ) : (
                            "N/A"
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">
                          Status Update Date
                        </p>
                        <p className="black-text text-sm">
                          {item.updatedAt
                            ? item?.updatedAt?.slice(0, 10)
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="grey-text text-sm  pb-1.5 font-light">
                          Remarks
                        </p>
                        <p className="black-text text-sm">N/A</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="bg-grey px-6 py-[18px] ">
                    <p className="text-sm text-[#004900] font-medium">Load 1</p>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-y-2 mt-8 my-6">
                    <p className="grey-text text-xl">No Container(s)</p>
                    <p className="text-sm font-light grey-text-1 max-w-[296px] text-center">
                      Kindly be patient as our sales representative uploads your
                      container details
                    </p>
                  </div>
                </>
              )}

              {/* <div>
                        <p className="px-6 py-[17px] text-sm grey-text bg-[#F9FAFB]">Load 2*</p>
                        <div className="px-6 py-5 grid grid-cols-2 gap-y-6">
                            <div>
                                <p className="grey-text text-sm  pb-1.5 font-light">Cont. Number</p>
                                <p className="black-text text-sm">Dummy Text</p>
                            </div>

                            <div>
                                <p className="grey-text text-sm  pb-1.5 font-light">Seal Number</p>
                                <p className="black-text text-sm">11094</p>
                            </div>

                            <div>
                                <p className="grey-text text-sm  pb-1.5 font-light">Cont. Size (FT)</p>
                                <p className="black-text text-sm">40</p>
                            </div>

                            <div>
                                <p className="grey-text text-sm  pb-1.5 font-light">BL Number</p>
                                <p className="black-text text-sm">302465193</p>
                            </div>

                            <div>
                                <p className="grey-text text-sm  pb-1.5 font-light">Container Status</p>
                                <p className="black-text text-sm">In Transit </p>
                            </div>

                        </div>
                    </div> */}
            </div>
          </>
        )}
      </>
      <div className="py-7 hidden xl:block" />
    </div>
  );
};

export default ShipmentDetailsTable;
