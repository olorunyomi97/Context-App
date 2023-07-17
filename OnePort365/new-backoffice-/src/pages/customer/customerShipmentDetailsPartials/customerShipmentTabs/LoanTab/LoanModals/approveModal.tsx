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

const ApproveModal = (props: any) => {
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
                        <p className="text-xl black-text font-semibold mb-3">Are You Sure?</p>
                        <p className="quote-text">Are you sure you want to approve this application?</p>
                        <div className="flex items-center mt-5" style={{justifyContent:'center'}}>
                            <div>
                                <>
                                    <div className="mr-3">
                                        <Link 
                                            to=""
                                            className="bg-green white-text-2 text-sm py-3 px-14 w-full rounded flex" 
                                        >
                                            Yes
                                        </Link>
                                    </div>
                                </>
                            </div>
                            <div className="mb-1">
                            <>
                                <div>
                                    <Link 
                                        to=""
                                        className="solid-br black-text-2 text-sm py-3 px-14 w-full rounded flex" 
                                        onClick={() => setIsLoanOpen(false)}
                                    >
                                        No
                                    </Link>
                                </div>
                            </>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ApproveModal