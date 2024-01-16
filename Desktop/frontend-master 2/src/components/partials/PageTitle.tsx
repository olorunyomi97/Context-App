import React, { useState, useRef, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

//icons
import cross from "assets/icons/cross.svg";

//components
import PrimaryButtons from 'components/buttons/PrimaryButtons';
import NewShipmentModal from 'components/dashboard/NewShipmentModal';

interface PageTitleProp {
  text: string | ReactNode ;
  subtext: string;
  clearBooking?: () => void;
}

const PageTitle = ({ text, subtext, clearBooking }: PageTitleProp) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  let country = useSelector((state: any) => state.auth.user_country);

  const openShipmentModal = () => {
    setModalIsOpen(true);
  };
  const closeShipmentModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex flex-col justify-between md:flex-row md:items-center">
      <div className="mb-8 md:mb-0">
        <h2 className="text-[#344335] text-2xl capitalize mb-1">{text}</h2>
        <p className="grey-text text-sm">{subtext}</p>
      </div>
      <div ref={ref} className="relative">
        <PrimaryButtons
          title="Start New Shipment"
          style={{}}
          onClick={() => {
            country && country !== "KE" ? openShipmentModal() : navigate('/freight-details');
            clearBooking && clearBooking();
            // navigate('/freight-details');
          }}
          disabled={false}
          loading={false}
          icon={cross}
        />
        {modalIsOpen &&
          <div className="absolute z-[999999999999999] right-0 top-16">
            <NewShipmentModal
              modalIsOpen={modalIsOpen}
              closeModal={closeShipmentModal}
            />
          </div>
        }
      </div>
    </div>
  )
}

export default PageTitle;