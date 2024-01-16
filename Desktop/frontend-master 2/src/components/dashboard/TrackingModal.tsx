import React from "react";

//components
import LoadingSpinner from "components/partials/LoadingSpinner";
import MasterMap from "components/maps/MasterMap";

//icons
import close from "assets/icons/close.svg";

//library
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
    height: "calc(100vh - 100px)",
    maxHeight: "calc(100vh - 100px)",
    overflow: "scroll",
    // WebkitOverflowScrolling: "touch",
    transform: "translate(-50%, -50%)",
    width: "calc(100vw - 10%)",
    borderRadius: "4px",
    border: "0.01px solid #888",
  },
  overlay: {
    zIndex: "99999999999",
    backgroundColor: "rgba(6, 24, 2, 0.55)",
  },
};

const TrackingModal = ({
  showMap,
  frame,
  closeModal,
  frameLoading,
  setFrameLoading,
}) => {
  return (
    <div>
      <Modal
        isOpen={showMap}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        contentLabel="Container detail modal"
        className={"ratemodal"}
        ariaHideApp={false}
      >
        <>
          <div onClick={closeModal} className="p-2 pb-3 bottom-divider-2 flex justify-end">
            <img src={close} alt="" className="cursor-pointer" />
          </div>
          <div className=" w-full h-full">
            {frame && <MasterMap mapId={frame} />}
          </div>
          {/* {frameLoading && <LoadingSpinner height="10" />} */}
    
          {/* <iframe
            title="Tracking"
            src={frame}
            width="100%"
            height="600px"
            onLoad={() => setFrameLoading(false)}
          ></iframe> */}
          </>
      </Modal>
    </div>
  );
};

export default TrackingModal;
