import React from "react";

//icons
import close from "assets/icons/close.svg";

//library
import moment from "moment";
import Modal from "react-modal";

//modal styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    // padding: " 1.5rem",
    maxHeight: "calc(100vh - 100px)",
    overflow: "scroll",
    // WebkitOverflowScrolling: "touch",
    transform: "translate(-50%, -50%)",
    width: "calc(100vw - 10%)",
    borderRadius: "8px",
    border: "0.01px solid #888",
  },
  overlay: {
    zIndex: "99999999999",
    backgroundColor: "rgba(6, 24, 2, 0.55)",
  },
};

const ContainerModal = ({
  showContainer,
  closeModal,
  dashboard_params,
  setFrame,
  scroll,
}) => {
  console.log("today>>>", dashboard_params);
  return (
    <div>
      <Modal
        isOpen={showContainer}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        contentLabel="Container detail modal"
        className={"ratemodal"}
        ariaHideApp={false}
      >
        <div>
          <div className="flex justify-between items-center px-6 pt-6 pb-5 bottom-divider-2">
            <p className="black-text-3 font-medium">Container Details</p>
            <div onClick={closeModal}>
              <img src={close} alt="" className="cursor-pointer" />
            </div>
          </div>
          <div className="p-4">
            {/* <input type="text" name="" id="" className="p-1.5 breakdown-border rounded w-full grey-text" placeholder="Search Container" /> */}
            {dashboard_params?.containers?.containers.length > 0 ? (
              <table className="booking-details shipment-details container-details modal-table mt-4">
                <thead>
                  <tr>
                    <th>#</th>
                    <th style={{ fontSize: "12px" }}>Cont. Number</th>
                    <th style={{ fontSize: "12px" }}>Status</th>
                    <th>
                      <span className="hidden">nwife</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard_params?.containers?.containers.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>
                        {item?.container_number
                          ? item?.container_number
                          : "N/A"}
                      </td>
                      <td>
                        {item?.container_status ? (
                          item?.container_status === "File Closed" ? (
                            <p className="text-xs text-[#0047A9] py-1 px-2 rounded-full bg-[#d0f5ff4d] font-normal w-fit text-center">
                              File Closed
                            </p>
                          ) : item?.container_status === "NEW" ? (
                            <p className="text-xs text-[#C27500] py-1 px-2 rounded-full bg-[#FFFADF] font-normal w-fit text-center">
                              New
                            </p>
                          ) : item?.container_status === "File Opening" ? (
                            <p className="text-xs text-[#005D00] py-1 px-2 rounded-full bg-[#99ff7d1a] font-normal w-fit text-center">
                              In-Progress
                            </p>
                          ) : item?.container_status === "In Transit" ? (
                            <p className="text-xs text-[#0047A9] py-1 px-2 rounded-full bg-[#d0f5ff4d] font-normal w-fit text-center">
                              In-Transit
                            </p>
                          ) : (
                            <p>{item?.container_status}</p>
                          )
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td
                        onClick={() => {
                          closeModal();
                          setFrame(item.inland_tracking_url);
                          scroll();
                        }}
                      >
                        <span className="green-text-2 cursor-pointer">
                          View Map
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <>
                <table className="booking-details shipment-details container-details">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="text-xs">Cont. Number</th>
                      <th className="text-xs">Status</th>
                      <th>
                        <span className="hidden">nwife</span>
                      </th>
                    </tr>
                  </thead>
                </table>
                <div className="flex flex-col justify-center items-center gap-y-2 min-h-[200px]">
                  <p className="grey-text text-xl">No Container(s)</p>
                  <p className="text-sm font-light grey-text-1 max-w-[296px] text-center">
                    Kindly be patient as our sales representative uploads your
                    container details
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ContainerModal;
