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

const LoanSuccessModal = (props: any) => {
  const { modalIsOpen, closeModal } = props;

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        //   onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="loan application successful modal"
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
            <p className="text-2xl black-text font-semibold mb-3">Submitted</p>
            <p className="text-sm grey-text font-medium mb-10">
              Your application has been submitted and waiting for review
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoanSuccessModal;
