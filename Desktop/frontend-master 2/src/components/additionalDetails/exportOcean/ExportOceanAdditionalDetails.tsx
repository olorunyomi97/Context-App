import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

//components
import ShipmentStepper from "components/rate/ShipmentStepper";
import ExportOceanInsurance from "components/additionalDetails/exportOcean/ExportOceanInsurance";
import PrimaryButtons from "components/buttons/PrimaryButtons";
import SecondaryButtons from "components/buttons/SecondaryButtons";
import OutlineButton from "components/buttons/OutlineButton";
import TrackingWarehouse from "components/additionalDetails/exportOcean/TrackingWarehouse";
import BookingSummary from "components/additionalDetails/exportOcean/BookingSummary";
import SuccessModal from "components/partials/SuccessModal";

//redux
import { selectAdditionalServices } from "store/actions";

const ExportOceanAdditionalDetails = (props) => {
  const navigate = useNavigate();

  const [oceanInsurance, setOceanInsurance] = useState(true);
  const [selectedInsurance, setSelectedInsurance] = useState("");
  const [includeTracking, setIncludeTracking] = useState(true);
  const [includeWarehouse, setIncludeWarehouse] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { loading, selectAdditionalServices, select_loading } = props;

  console.log("booking_loading>>>", loading);

  const location = useLocation();
  const shipment_id = location.state.id;

  const openBookingSummaryModal = () => {
    setShowSummary(true);
  };

  const closeBookingSummaryModal = () => {
    setShowSummary(false);
  };
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const onSubmit = () => {
    if (oceanInsurance && selectedInsurance === "") {
      toast.error("Please select insurance");
      return;
    }

    const data = {
      shipment_id,
      data: {
        marine_insurance: oceanInsurance,
        insurance_provider_id: selectedInsurance.toString(),
        with_tracker: includeTracking,
        warehousing: includeWarehouse,
        currency: "NGN", //@todo: get currency from previous selection in the rate page
      },
    };

    selectAdditionalServices(data, openBookingSummaryModal);
  };

  return (
    <div className="w-full md:w-[85%]">
      <ShipmentStepper />
      <ExportOceanInsurance
        oceanInsurance={oceanInsurance}
        setOceanInsurance={setOceanInsurance}
        selectedInsurance={selectedInsurance}
        setSelectedInsurance={setSelectedInsurance}
      />
      <TrackingWarehouse
        includeTracking={includeTracking}
        setIncludeTracking={setIncludeTracking}
        includeWarehouse={includeWarehouse}
        setIncludeWarehouse={setIncludeWarehouse}
      />
      <div className="">
        <div className="mt-8 flex justify-between">
          <div className="hidden md:block">
            <OutlineButton
              title="Cancel"
              style={{ color: "#59725C" }}
              onClick={() => navigate("/dashboard")}
              disabled={false}
              loading={false}
              icon={""}
            />
          </div>
          <div className="flex gap-x-6">
            <SecondaryButtons
              title="Previous Page"
              style={{ padding: "12px 14px" }}
              onClick={() => {
                navigate(-1);
              }}
              disabled={false}
              loading={false}
              icon={""}
            />
            <PrimaryButtons
              title="View Booking Summary"
              style={{}}
              onClick={() => onSubmit()}
              disabled={false}
              loading={select_loading}
              icon={""}
            />
          </div>
        </div>
      </div>
      {showSummary ? (
        <BookingSummary
          isOpen={showSummary}
          setIsOpen={closeBookingSummaryModal}
          setShowSuccessModal={setShowSuccessModal}
        />
      ) : null}
      {showSuccessModal ? (
        <SuccessModal
          modalIsOpen={showSuccessModal}
          closeModal={closeSuccessModal}
          heading="Booking Completed!!!"
          text="You have successfully completed your booking process. You will receive a quote shortly."
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { additionalServices, loading, select_loading } =
    state.additionalDetails;
  return {
    additionalServices,
    select_loading,
    loading,
  };
};

export default connect(mapStateToProps, { selectAdditionalServices })(
  ExportOceanAdditionalDetails
);
