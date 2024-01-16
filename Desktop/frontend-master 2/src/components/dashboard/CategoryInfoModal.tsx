import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";

//icons
import close from "assets/icons/close.svg";
import caretRight from "assets/icons/dashboard/rightcaret-white.svg";

//components
import LoadingSpinner from "components/partials/LoadingSpinner";

//redux actions
import { createNewShipment } from "store/actions";

const CategoryInfoModal = (props: any) => {
  const {
    closeShowCategory,
    image,
    freightType,
    freightShipment,
    error,
    loading,
    shipment_data,
    createNewShipment,
    closeModal,
  } = props;
  const [serviceType, setServiceType] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  console.log("freightShipment>>>", freightShipment);
  console.log("freightType>>>", freightType);

  //sets the service type for the create shipment modal
  useEffect(() => {
    if (freightType === "Air Freight") {
      setServiceType("air_freight");
    } else if (freightType === "Ocean Freight") {
      setServiceType("ocean_freight");
    } else if (freightType === "Haulage") {
      setServiceType("haulage");
    } else if (freightType === "Warehousing") {
      setServiceType("warehousing");
    } else if (freightType === "Custom Brokerage") {
      setServiceType("customs_brokerage");
    }
  }, [freightType]);

  // console.log("service>>>", serviceType)
  const goToBookings = () => {
    if (location.pathname.includes("booking")) {
      closeShowCategory();
      closeModal();
      window.location.reload();
    } else {
      navigate("/booking");
    }
  };

  const submitData = () => {
    const finalData = {
      shipment_type: freightShipment.toLowerCase(),
      shipment_transport_type: serviceType,
    };
    createNewShipment(finalData, goToBookings, true);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full flex items-center justify-center h-full bg-[#0618028c] z-[9999999999999999]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col bg-white rounded-lg w-[290px] md:w-[350px] mx-4 md:mx-0 max-h-[calc(100vh_-_50px)]">
        <div className="pt-7 px-6 pb-6 category-modal rounded-lg">
          <div
            className="flex justify-end cursor-pointer w-fit ml-auto"
            onClick={closeShowCategory}
          >
            <img src={close} alt="close" />
          </div>
          <div className="flex justify-center mt-11">
            {" "}
            <img src={image} alt="" />
          </div>
          <div className="mt-10 mb-11">
            <p className="text-[#005D00] text-center font-medium text-base">
              {freightType}
            </p>
            <p className="black-text-4 text-[13px] font-light text-center mt-4">
              Thank you for your interest in{" "}
              <span className="black-text-2 font-medium">
                "{freightShipment + " " + freightType}"
              </span>
              . A member of our sales team will reach out to you. Please click
              “Okay” to proceed.
            </p>
          </div>
          <button
            disabled={loading}
            className={`bg-[#109B32] rounded w-full flex items-center justify-center gap-x-2 py-3 ${
              loading ? "opacity-50" : ""
            }`}
            onClick={() => submitData()}
          >
            <span className="text-white text-[13px]">Okay</span>
            {loading ? (
              <LoadingSpinner top={false} color={"#fff"} height={"4"} />
            ) : (
              <span>
                <img src={caretRight} alt="" />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading, shipment_data } = state.booking;
  return { error, loading, shipment_data };
};
export default connect(mapStateToProps, { createNewShipment })(
  CategoryInfoModal
);
