import React from 'react';
import { useNavigate } from 'react-router-dom';

//icons
import close from "assets/icons/close.svg";
import errShipImg from "assets/icons/notshipment.svg";

//library
import Modal from "react-modal";

//components
import PrimaryButtons from 'components/buttons/PrimaryButtons';

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "calc(100vw - 10%)",
        borderRadius: "10px",
        border: "0.01px solid #888",
    },
    overlay: {
        zIndex: "90",
        backgroundColor: "rgba(6, 24, 2, 0.55)",
    },
};

interface OfapInvalidEmailType {
    buttonLinkTo?: string;
    primaryText?: string;
    secondaryText?: string;
    invalidJobNumber?: string | null;
}

const OfapInvalidEmail = ({ buttonLinkTo, invalidJobNumber }: OfapInvalidEmailType) => {
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center h-full bg-[#0618028c] z-[9999999999999999]">
            <div className='flex flex-col bg-white rounded-lg w-auto sm:w-[290px] md:w-[434px] mx-4 md:mx-0 max-h-[calc(100vh_-_50px)] p-6'>
                <div
                    className='flex justify-end ml-auto w-fit cursor-pointer'
                    onClick={() => navigate('/')}
                >
                    <img src={close} alt="" />
                </div>
                <div className='flex justify-center mt-[72px] mb-10'><img src={errShipImg} alt="" /></div>
                {buttonLinkTo === 'dashboard' && <p className='black-text-2 text-center text-xl mb-3'>{invalidJobNumber ? `#${invalidJobNumber}` : "This"} is not your shipment</p>}
                <p className='text-center black-text-4 font-light'>
                    { buttonLinkTo === 'dashboard' ? 'You have the ability to track only those shipments that are associated with your account.' : <>Sorry, you don't have access to view this rate. please contact the support team at <a href='mailto:support@oneport365.com' className='green-text underline cursor-pointer'>support@oneport365.com</a></>} 
                </p>
                <div className='mt-14 mb-6'>
                    {
                        buttonLinkTo === 'dashboard' ? 
                        <PrimaryButtons
                            title={'Back To Dashboard'}
                            onClick={() => navigate('/dashboard')}
                            disabled={false}
                            loading={false}
                            icon={""}
                        /> :
                        <PrimaryButtons
                            title={'Back To Landing'}
                            onClick={() => navigate('/')}
                            disabled={false}
                            loading={false}
                            icon={""}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default OfapInvalidEmail;