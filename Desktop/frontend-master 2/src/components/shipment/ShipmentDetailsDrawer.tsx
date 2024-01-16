import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { connect } from "react-redux";

//components
import CustomTabs from "components/customTabs/CustomTabs";
import ShipmentCargoDetails from "components/shipment/ShipmentCargoDetails";
import ShipmentAdditionalDetails from "components/shipment/ShipmentAdditionalDetails";
import ShipmentDocuments from "components/shipment/ShipmentDocuments";
import ShipmentDetailsCard from "components/shipment/ShipmentDetailsCard";
import PageLoading from "components/partials/pageLoading";

//redux
import { getShipmentById } from "store/actions";

const ShipmentDetailsDrawer = (props: any) => {
  const {
    isOpen,
    setIsOpen,
    shipmentId,
    shipment_data,
    loading,
    getShipmentById,
  } = props;

  const [isCargoOpen, setIsCargoOpen] = useState(false);
  const [tab, setTab] = useState("Documents");

  useEffect(() => {
    getShipmentById(shipmentId);
  }, [shipmentId]);

  return (
    <>
      <SlidingPane
        className="custom-slider"
        overlayClassName="some-custom-overlay-class"
        isOpen={isOpen}
        hideHeader={true}
        // width="756px"
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setIsOpen(false);
        }}
      >
        <i
          className="ion-ios-close py-1 px-4 bg-grey text-3xl rounded-full black-text cursor-pointer"
          onClick={() => setIsOpen(false)}
        ></i>

        <div className="flex items-center mt-10 mb-5">
          <h3 className="text-xl black-text font-semibold">Shipment details</h3>

          {/* {!loading ? (
            <Link
              to="/tracking/HT67484J"
              className="solid-br py-2 px-3 rounded ml-auto text-sm black-text"
            >
              Track this shipment
            </Link>
          ) : null} */}
        </div>

        {loading ? (
          <>
            <PageLoading title={"shipment details"} />
          </>
        ) : (
          <>
            {/* <ShipmentDetailsCard /> */}

            <div className="my-10 w-full">
              <CustomTabs
                tabs={["Documents", "Cargo Details"]}
                activeTab={tab}
                setActiveTab={setTab}
              />
            </div>
            {tab === "Documents" ? (
              <ShipmentDocuments />
            ) : tab === "Cargo Details" ? (
              <ShipmentCargoDetails
                shipments={[
                  "HT67484J",
                  "UTY7658",
                  "RN93748",
                  "CD765RT",
                  "EE6445K",
                  "OJ6435K",
                ]}
                isOpen={isCargoOpen}
                setIsOpen={setIsCargoOpen}
              />
            ) : (
              <ShipmentAdditionalDetails />
            )}
          </>
        )}
      </SlidingPane>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { shipment_data, loading } = state.shipment;
  return { shipment_data, loading };
};

export default connect(mapStateToProps, { getShipmentById })(
  ShipmentDetailsDrawer
);
