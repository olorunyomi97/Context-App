import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getContacts } from "store/actions";
import ReactModal from "react-modal";

const ViewMessage = (props: any) => {
    const { isOpen, setIsOpen, message} = props;
    useEffect(() => {
        props.getContacts();
    }, [getContacts])

    return (
        <ReactModal 
            isOpen={isOpen} 
            onRequestClose={() => {
                setIsOpen(false);
            }}
            style={{
                overlay: {
                position: 'relative',
                }
            }}
        >
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed z-10 inset-0">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                    
                        <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Message </h3>
                                        <p>
                                            {message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ReactModal >
    )
}

// export default ViewMessage


const mapStateToProps = (state: any) => {
    const { contacts, error, loading } = state.contacts;
    return { contacts, error, loading };
};

export default connect(mapStateToProps, {getContacts})(ViewMessage);
