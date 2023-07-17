import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import ReactModal from "react-modal";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { processPendingAdminQuotes } from "store/actions";
import PrimaryButton from "components/buttons/PrimaryButton";

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


const MyQuoteModal = (props:any) => {
    let admin_data = useSelector((state: any) => state.auth.admin_data);
    // @ts-ignore
    admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));
    const { loading, isOpen, setIsOpen, id } = props;

    const params = useParams();
    console.log(id)
    const [openAside, SetOpenAside] = useState(false);
    const location = useLocation();
    const urlParams = new URLSearchParams(location.pathname);
  

    useEffect(() => {
        const quote_id_array = window.location.pathname.split("/")
        const quote_id = quote_id_array[2];
        props.processPendingAdminQuotes(quote_id);
    }, [processPendingAdminQuotes]);


    return (
        <>
            <Modal
               isOpen={isOpen} 
               onRequestClose={() => {
                   setIsOpen(false);
               }}
                style={customStyles}
                contentLabel="Rate successful modal"
            >
                {
                    loading ? 
                    (
                        <div className="text-center my-3 ml-5">
                            <Link to="#" className="text-success">
                                {/* @ts-ignore */}
                                <PrimaryButton title="Loading Quotes" loading={loading} />
                            </Link>
                        </div>
                    ) : (
                            <>
                                <div className="flex">
                        <i className="ion-ios-close text-3xl ml-auto cursor-pointer" onClick={() => setIsOpen(false)}></i>
                                    </div>
                                    <div className=" flex flex-col">

                                    <div className="text-center mb-10">
                                        <p className="text-xl black-text font-semibold mb-3">Hi  <span className="green-text">{admin_data.firstname}</span></p>
                                        <p className="quote-text">Are you sure you want to Process this Quote?</p>
                                        <div className="flex items-center mt-5" style={{justifyContent:'center'}}>
                                            <div>
                                                <>
                                                    <div className="mr-3">
                                                        <Link 
                                                            onClick={() => {
                                                                props.processPendingAdminQuotes(id)
                                                            }}
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
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        No
                                                    </Link>
                                                </div>
                                            </>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
            </Modal>
        </>
    //     <ReactModal 
    //     isOpen={isOpen} 
    //     onRequestClose={() => {
    //         setIsOpen(false);
    //     }}
    //     style={{
    //         overlay: {
    //           position: 'relative',
    //         }
    //     }}
    // >
    //     {
    //         loading ? 
    //         (
    //             <div className="text-center my-3 ml-5">
    //                 <Link to="#" className="text-success">
    //                     {/* @ts-ignore */}
    //                     <PrimaryButton title="Loading Quotes" loading={loading} />
    //                 </Link>
    //             </div>
    //         ) : (
    //             <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    //                 <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    //                 <div className="fixed z-10 inset-0">
    //                     <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        
    //                         <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:max-w-lg sm:w-full">
    //                             <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    //                                 <div className="sm:flex sm:items-start">
    //                                     <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
    //                                         <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
    //                                             <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    //                                         </svg>
    //                                     </div>
    //                                     <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
    //                                         <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Process This Quote</h3>
    //                                         <div className="mt-2">
    //                                             <p className="text-sm text-gray-500">Hi  <span className="green-text">{admin_data.firstname}</span>, Are you sure you want to Process this Quote?</p>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
    //                                 {/* <button
    //                                     onClick={() => {
    //                                         props.processPendingAdminQuotes(id)
    //                                     }}
    //                                     type="submit"
    //                                     className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
    //                                 >
    //                                     Yes 
    //                                 </button> */}
    //                                 <Link to="#" className="text-success">
    //                                     {/* @ts-ignore */}
    //                                     <PrimaryButton title="Yes" loading={loading} 
    //                                         onClick={() => {
    //                                             props.processPendingAdminQuotes(id)
    //                                         }}
    //                                         style={{paddingLeft:'20px',paddingRight: '20px'}}
    //                                     />
    //                                 </Link>
    //                                 <button
    //                                     type="submit"
    //                                     onClick={() => setIsOpen(false)}
    //                                     className="mr-3 mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
    //                                 >
    //                                     Cancel
    //                                 </button>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         )
    //     }
    // </ReactModal >
    
    )
}

// export default MyQuoteModal;


const mapStateToProps = (state: any) => {
    const { process_quotes, error, loading } = state.quotes;
    return { process_quotes, error, loading };
};

export default connect(mapStateToProps, {processPendingAdminQuotes})(MyQuoteModal);
