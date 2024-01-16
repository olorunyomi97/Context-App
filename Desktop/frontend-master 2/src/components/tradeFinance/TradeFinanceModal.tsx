import Modal from "react-modal";

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

const TradeFinanceModal = (props: any) => {
  const { modalIsOpen, closeModal, data } = props;

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onAfterClose={() =>
          window.location.replace(`${window.location.origin}/invoices`)
        }
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
          <img src={success} alt="" width={95} className="mx-auto" />

          <div className="text-center">
            <p className="text-xl black-text font-semibold my-3">{data}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TradeFinanceModal;
