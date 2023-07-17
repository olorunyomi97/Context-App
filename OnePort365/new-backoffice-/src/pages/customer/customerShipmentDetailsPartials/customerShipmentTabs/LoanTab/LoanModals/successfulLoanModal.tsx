import Modal from "react-modal";
import { Link } from "react-router-dom";
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

const ApproveModalSuccesful = (props: any) => {
    const { isLoanOpen, setIsLoanOpen } = props;
    return (
        <>
            <Modal
                isOpen={isLoanOpen}
                onRequestClose={() => {
                    setIsLoanOpen(false);
                }}
                style={customStyles}
                contentLabel="Rate successful modal"
            >
                <div className="flex">
                    <i className="ion-ios-close text-3xl ml-auto cursor-pointer" onClick={() => setIsLoanOpen(false)}></i>
                </div>
                <div className=" flex flex-col">
                    <img src={success} alt="" width={100} className="mx-auto" />

                    <div className="text-center mb-10">
                        <p className="text-xl black-text font-semibold mb-3">Loan Approved</p>
                        <p className="quote-text">The following loan application has been approved. A notification will be sent to the customer </p>
                        
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ApproveModalSuccesful