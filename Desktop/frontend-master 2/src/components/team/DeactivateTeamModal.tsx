import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import { connect } from "react-redux";

//icons
import close from "assets/icons/close.svg";
import success from "assets/icons/success.svg";

//components
import PrimaryButtons from "components/buttons/PrimaryButtons";
import SecondaryButtons from "components/buttons/SecondaryButtons";

//redux actions
import { deleteTeammate } from "store/actions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "30px",
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

const DeactivateTeamModal = (props: any) => {
  const navigate = useNavigate();
  const {
    modalIsOpen,
    closeModal,
    heading,
    text,
    delete_loading,
    deleteTeammate,
    userInfo,
  } = props;

  //callback functiom
  const onDelete = () => {
    closeModal();
    window.location.reload();
  };

  const deleteTeamMateFunc = () => {
    deleteTeammate(userInfo._id, onDelete);
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        onRequestClose={closeModal}
        // onAfterClose={() => window.location.replace(`${window.location.origin}/invoices`)}
        style={customStyles}
        className={"successmodal"}
        contentLabel="Booking successful modal"
      >
        <div onClick={closeModal} className="flex justify-end">
          <img src={close} alt="" className="cursor-pointer" />
        </div>
        <div className="flex flex-col">
          <div className="text-center mt-10 mb-14">
            <p className="text-2xl black-text-2 font-semibold my-3">
              Delete Team Member
            </p>
            <p className="black-text-4 text-sm font-light text-center mx-auto max-w-[250px]">
              Are you sure you want to delete this team member?
            </p>
          </div>
          <div className="flex flex-col gap-y-4 mb-10">
            <PrimaryButtons
              title="Yes! Delete"
              style={{}}
              onClick={() => deleteTeamMateFunc()}
              disabled={false}
              loading={delete_loading}
              icon={""}
            />
            <SecondaryButtons
              title="Cancel"
              style={{ padding: "12px 14px" }}
              onClick={closeModal}
              disabled={false}
              loading={false}
              icon={""}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { delete_loading } = state.teammates;
  return { delete_loading };
};

export default connect(mapStateToProps, { deleteTeammate })(
  DeactivateTeamModal
);
