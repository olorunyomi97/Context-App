import { useState } from "react";
import { Link } from "react-router-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

//components
import CustomTabs from "components/customTabs/CustomTabs";
import ShipmentCargoDetails from "components/shipment/cargoDetailsDrawer/ShipmentCargoDetails";
import ShipmentAdditionalDetails from "components/shipment/ShipmentAdditionalDetails";
import ShipmentDocuments from "components/shipment/ShipmentDocuments";
import ShipmentDetails from "components/shipment/ShipmentDetails";

const ShipmentDetailsDrawer = (props: any) => {
    const { isOpen, setIsOpen } = props;
    const [isCargoOpen, setIsCargoOpen] = useState(false);
    const [tab, setTab] = useState("Documents");

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
                <i className="ion-ios-close py-1 px-4 bg-grey text-3xl rounded-full black-text cursor-pointer" onClick={() => setIsOpen(false)}></i>

                <div className="flex items-center mt-10 mb-5">
                    <h3 className="text-xl black-text font-semibold">Shipment details</h3>

                    <Link to="/tracking/HT67484J" className="solid-br py-2 px-3 rounded ml-auto text-sm black-text">
                        Track this shipment
                    </Link>
                </div>

                <ShipmentDetails />

                <div className="my-10 w-full">
                    <CustomTabs tabs={["Documents", "Cargo Details", "Additional Services"]} activeTab={tab} setActiveTab={setTab} />
                </div>
                {tab === "Documents" ? (
                    <ShipmentDocuments />
                ) : tab === "Cargo Details" ? (
                    <ShipmentCargoDetails shipments={["HT67484J", "UTY7658", "RN93748", "CD765RT", "EE6445K", "OJ6435K"]} isOpen={isCargoOpen} setIsOpen={setIsCargoOpen} />
                ) : (
                    <ShipmentAdditionalDetails />
                )}
            </SlidingPane>
        </>
    );
};

export default ShipmentDetailsDrawer;
