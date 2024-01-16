import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

//icons
import close from "assets/icons/close.svg"
import success from "assets/icons/success.svg";

//components
import PrimaryButtons from "components/buttons/PrimaryButtons";
import { clearBooking } from "store/actions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "30px 30px",
    maxHeight: "calc(100vh - 100px)",
    overflow: "hidden",
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

interface SuccessProps {
  modalIsOpen?: any;
  heading?: any;
  text?: any;
  subtext?: any;
  toDashboard?: any;
  setShowSuccessModal?: any;
  closeModal?: any;
  clearBooking?: any;
}

const SuccessModal = ({ modalIsOpen, heading, text, subtext, toDashboard = true, setShowSuccessModal, clearBooking }: SuccessProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        // onRequestClose={closeModal}
        // onAfterClose={() => window.location.replace(`${window.location.origin}/dashboard`)}
        style={customStyles}
        className={"successmodal"}
        contentLabel="Booking successful modal"
      >
        {/* <div onClick={closeModal} className="flex ml-auto cursor-pointer w-fit mb-2.5">
         <img src={close} className="" alt="" />
        </div> */}
        <div className="flex flex-col">
          <img src={success} alt="" width={95} className="mx-auto" />
          <div className=" mt-10 mb-14">
            <p className="text-2xl black-text-2 font-semibold text-center my-3">
              {heading}
            </p>
            <p className="black-text-4 text-sm font-light text-center">{text}</p>
            {subtext && <p className="text-sm font-light black-text-4 text-center mt-2">{subtext}</p>}
          </div>
          {toDashboard ? <div>
            <PrimaryButtons
              title="Go Back To Dashboard"
              style={{}}
              onClick={() => {
                navigate("/dashboard");
                clearBooking();
              }}
              disabled={false}
              loading={false}
              icon={""}
            />
          </div> :
          <div>
              <PrimaryButtons
                title="Close"
                style={{}}
                onClick={() => setShowSuccessModal(false)}
                disabled={false}
                loading={false}
                icon={""}
              />
            </div>
          }
        </div>
      </Modal>
    </>
  );
};

export default SuccessModal;
