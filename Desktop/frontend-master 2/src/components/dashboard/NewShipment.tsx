import { useState } from "react";

//components
import NewShipmentModal from "components/dashboard/NewShipmentModal";
import CategoryInfoModal from "./CategoryInfoModal";

//

const NewShipment = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const [image, setImage] = useState<any>();
  const [freightType, setFreightType] = useState("");
  const [freightShipment, setFreightShipment] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const openModal = (text) => {
    setModalIsOpen(true);
    setModalText(text);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  //show category modal
  const showCategory = () => {
    setShowCategoryModal(true);
  };

  const closeShowCategory = () => {
    setShowCategoryModal(false);
  };

  return (
    <div className="p-4 shadow-lg rounded w-full md:w-[400px] bg-white">
      <div
        className="shipment-type flex gap-x-6 rounded border-grey-2 p-4 cursor-pointer mb-4"
        onClick={(e) => {
          openModal("Export");
          e.stopPropagation();
        }}
      >
        <div>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className="shipment-svg-fill" width="32" height="32" rx="5" fill="#F9FAFB" />
            <path className="shipment-svg" d="M20.6477 11.7884L11.8089 20.6272" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path className="shipment-svg" d="M13.5329 11.8024L20.6475 11.7871L20.6328 18.9023" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div>
          <p className="black-text-3 hover:green-text-2 font-medium mb-1">Export</p>
          <p className="text-sm grey-text">Send goods out of the country</p>
        </div>
      </div>
      <div
        className="shipment-type flex gap-x-6 rounded border-grey-2 p-4 cursor-pointer"
        onClick={(e) => {
          openModal("Import");
          e.stopPropagation();
        }}
      >
        <div>
          <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className="shipment-svg-fill" width="32" height="32" rx="4" fill="#F9FAFB" />
            <path className="shipment-svg" d="m11.35 20.212 8.84-8.84M18.467 20.198l-7.114.015.014-7.115" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div>
          <p className="black-text-3 font-medium mb-1">Import</p>
          <p className="text-sm grey-text">Bring goods into the country from abroad</p>
        </div>
      </div>
      {modalIsOpen && (
        <div>
          <NewShipmentModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            modalText={modalText}
            setImage={setImage}
            setFreightType={setFreightType}
            setFreightShipment={setFreightShipment}
            showCategory={showCategory}
          />
        </div>
      )}
      {showCategoryModal && (
        <CategoryInfoModal
          image={image}
          freightType={freightType}
          freightShipment={freightShipment}
          closeShowCategory={closeShowCategory}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default NewShipment;
