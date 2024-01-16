import React from "react";

//icons
import door from "assets/icons/door.svg";
import close from "assets/icons/close.svg";

//library
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    // padding: "1.5rem",
    maxHeight: "calc(100vh - 100px)",
    overflow: "scroll",
    // WebkitOverflowScrolling: "touch",
    transform: "translate(-50%, -50%)",
    width: "calc(100vw - 10%)",
    borderRadius: "10px",
    border: "0.01px solid #888",
  },
  overlay: {
    zIndex: "99999999999",
    backgroundColor: "rgba(6, 24, 2, 0.55)",
  },
};

interface LogoutProps {
  isOpen: boolean;
  closeModal: () => void;
  logoutUser: () => void;
  logout: () => void;
}

const LogoutModal = ({ isOpen, closeModal, logoutUser, logout }: LogoutProps) => {
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      contentLabel="Select rate modal"
      className={"ratemodal"}
      ariaHideApp={false}
    >
      <div className="logout-modal p-6">
        <div
          className="flex justify-end cursor-pointer w-fit ml-auto"
          onClick={closeModal}
        >
          <img src={close} alt="" />
        </div>
        <div className="flex justify-center mt-11">
          <img src={door} alt="" />
        </div>
        <div className="mt-10 mb-11">
          <p className="text-[#C70024] text-center font-medium text-base">
            Log Out
          </p>
          <p className="black-text-4 text-sm font-light text-center mt-4">
            <span className="black-text-4 font-medium">
              Are you sure you want to logout?
            </span>{" "}
            You will have to sign in to continue viewing your dashboard
          </p>
        </div>
        <div>
          <button
            className="bg-[#C70024] py-3 text-white text-sm font-normal rounded w-full mb-3"
            onClick={() => {
              logoutUser();
              logout();
            }}
          >
            Yes, Log out
          </button>
          <button
            className="bg-[#F9FAFB] py-3 text-[#AD0013] text-sm font-normal rounded w-full"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
