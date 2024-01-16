import React from "react";
import Modal from "react-modal";

//components
import PrimaryButton from "components/buttons/PrimaryButton";
import OutlineButton from "components/buttons/OutlineButton";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "2.2rem 1.5rem",
    transform: "translate(-50%, -50%)",
    width: "410px",
    borderRadius: "10px",
    border: "0.01px solid #888",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
};

const TermsModal = (props: any) => {
  const { modalIsOpen, closeModal, onAccept, onContact, loading } = props;
  return (
    <Modal
      isOpen={modalIsOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Terms modal"
    >
      <div className="">
        <div className="flex items-center">
          <p className="text-lg black-text font-semibold">
            Terms and Conditions
          </p>
          <div
            className="bg-grey rounded-full py-0 px-2.5 ml-auto cursor-pointer"
            onClick={closeModal}
          >
            <i className="ion-ios-close text-lg"></i>
          </div>
        </div>
        <div
          className="my-5 bg-grey p-3"
          style={{ maxHeight: 480, overflowY: "scroll" }}
        >
          <p className="text-sm black-text font-medium mb-3">
            1. Customs clearance would be provided by Logigrains Limited: A
            licenced customs brokerage provider.{" "}
          </p>
          <p className="text-sm black-text font-medium mb-3">
            2. Transit time is estimated time by carriers, and may vary
            depending on sailing dates of the specific service contracted.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            3. Ocean freight advised is subject to Environmental fuel surcharge
            from shipping line.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            4. Renomination and storage charges incurred as a result of delay in
            XP validation by CBN / vessel roll over will be borne by the client.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            5. Ocean Freight paid by One Port 365 will attract a 10% service fee
            on the total freight value.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            6. Exchange rate is subject to change according to carrier's
            exchange rate on the day of vessel sailing.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            {" "}
            7. A debit note will be raised seperately for only confirmed
            additional charges post sailing.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            8. Trucking demurrage of NGN20,000 per truck kicks in 24 hours post
            arrival at client's warehouse (without operations).
          </p>
          <p className="text-sm black-text font-medium mb-3">
            9. 7.5% VAT will be applicable at the time of invoicing.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            10. All documentation related to clearing shipments is to be
            provided by the CLIENT Including: Approved NXP, PFI, packing list,
            Commercial Invoice, NESS payment.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            11. CLIENT to ensure that all the details are correct and in order.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            12. CLIENT ensures that all permits required for the exportation of
            their commodity are provided and valid at the time of export.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            13. The Goods exported are the same as the Goods described in the
            PFI and other Shipping Documentation provided.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            14. SERVICE PROVIDER to be notified 48 Hrs prior to requesting
            containers for stuffing at facility.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            15. CLIENT to ensure that Goods are available for loading when
            trucks are provided at the warehouse/facility, to avoid delay in
            stuffing.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            16. CLIENT to ensure proper stuffing of Consignment in the
            container. Where necessary, use belts, ropes or pallets to secure
            goods as SERVICE PROVIDER shall not be held liable for any
            incidences during inspection by Customs & other Govt. Agencies.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            17. CLIENT to load SERVICE PROVIDER's Trucks within 24Hrs of arrival
            at Facility, Truck demurrage per day applies for delays beyond
            48Hrs.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            18. Timely payment of NESS by CLIENT and receipt shared within 24
            Hrs on advice to proceed by SERVICE PROVIDER.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            19. CLIENT to provide Shipping Instruction accurately on the
            DATASHEET.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            20. All Draft BLs sent by SERVICE PROVIDER to CLIENT to be vetted
            for amendments within 24Hrs of receipt.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            21. CLIENT is responsible for BL Corrections/Amendment Costs for any
            amendment on *approved* Draft BLs after Vessel Sails.
          </p>
          <p className="text-sm black-text font-medium mb-3">
            22. Prompt payment of freight to ensure timely issuance of
            OBL/Seawaybill.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {" "}
          {/* <div
            className="solid-br py-2 bg-green rounded cursor-pointer"
            onClick={onAccept}
          > */}
          {/* <p className="text-sm white-text mr-2 font-semibold text-center">
              I Accept
            </p> */}
          {/* @ts-ignore  */}
          <PrimaryButton
            loading={loading.accepting_quote}
            disabled={loading.accepting_quote || loading.requesting_follow_up}
            onClick={() => onAccept()}
            title="I Accept"
          />
          {/* </div> */}
          {/* @ts-ignore  */}
          <OutlineButton
            loading={loading.requesting_follow_up}
            disabled={loading.requesting_follow_up || loading.accepting_quote}
            title={"Contact us"}
            onClick={() => onContact()}
          />
          {/* <div className="solid-br py-2 rounded  text-center cursor-pointer">
            <p className="text-sm black-text mr-2 font-semibold">Contact us</p>
          </div> */}
        </div>
      </div>
    </Modal>
  );
};

export default TermsModal;
