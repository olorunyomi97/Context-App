import Modal from "react-modal";
import { Link } from "react-router-dom";

//icons
import success from "assets/icons/success.svg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: " 1.5rem",
    transform: "translate(-50%, -50%)",
    width: "410px",
    borderRadius: "10px",
    border: "0.01px solid #888",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
};

const RateSuccessModal = (props: any) => {
  const { modalIsOpen, closeModal, type } = props;

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        //   onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Rate successful modal"
      >
        <div className="flex">
          <i
            className="ion-ios-close text-3xl ml-auto cursor-pointer"
            onClick={closeModal}
          ></i>
        </div>
        <div className=" flex flex-col">
          <img src={success} alt="" width={125} className="mx-auto" />

          <div className="text-center">
            <p className="text-2xl black-text font-semibold mb-3">Successful</p>

            {type === "notify_me" ? (
              <p className="text-sm grey-text font-medium mb-3">
                Our support would reach out when the rates are available
              </p>
            ) : (
              <>
                <p className="text-sm grey-text font-medium mb-3">
                  Thank you for accepting our rate, Your quote will be sent to
                  you shortly
                </p>
              </>
            )}
          </div>

          {type == "notify_me" ? (
            <></>
          ) : (
            <>
              <Link
                // to="/tracking"
                to="/quotes"
                className="mx-auto bg-green py-3 px-5 rounded my-3"
              >
                <p className="text-sm font-semibold white-text">
                  Track Shipments
                </p>
              </Link>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default RateSuccessModal;
