import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//components
import RateSuccessModal from "components/rates/RateSuccessModal";

//icons
import ideas from "assets/icons/ideas.svg";
import { count } from "console";

const NotifyMe = (props: any): JSX.Element => {
  const { title } = props;
  const [openModal, setOpenModal] = useState(false);

  const { shipment } = props;

  let containerDetails = shipment.container_details ?? [];
  let count = parseInt(containerDetails[0]?.container_count);

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="flex  flex-col justify-center solid-br-desktop item-center h-86 py-10">
        <img src={ideas} alt="" width={150} className="mx-auto" />

        <div className="mx-auto my-2">
          {/* <p className="grey-text my-4 text-center text-sm">
            There are no <span className="font-semibold">2</span>{" "}
            available at the moment
            <br /> click on the button below to get a notification
          </p> */}
          {count > 5 ? (
            <p className="grey-text my-4 text-center text-sm">
              You can only book a maximum of{" "}
              <span className="font-semibold">5</span> containers on the
              platform. <br /> To book more than{" "}
              <span className="font-semibold">5</span> containers use the button
              below to request for a <br />{" "}
              <span className="font-semibold">Custom Quote</span> and we would
              get back to you in <span className="font-semibold">1</span>{" "}
              Business Day.
            </p>
          ) : (
            <p className="grey-text my-4 text-center text-sm">
              Freight rates not available for this{" "}
              <span className="font-semibold">port pair</span>. <br />
              Use the button below to request for a{" "}
              <span className="font-semibold">Custom Quote</span> and we would
              get back to you in <span className="font-semibold">1</span>{" "}
              Business Day.
            </p>
          )}
          <div className="mx-auto text-center my-5">
            <a
              className=" black-text text-xs underline "
              href="https://marketing.oneport365.com/e3t/Ctc/OR+113/d2nMYx04/VW1tlJ1RqxbgN8-BGfj5V85xW1vWpFD4LpnFyN7swVvS3lLB3V1-WJV7Cg-6bW8TwqHl7PWVXwW8qXjmw3qcYL5N6zQDPX_pqMDW55lz-Q3PbrHfW2c3dHS6zn2ZXW8nqg3p36x2hSN7qmxkYn8d9kW4CXTjf4fVWhDW34SdCs6WRrZHW8TY1NR2yJjhhW92Cv-S4tD4dpW6Sd8CR1T8MFMW3sshHw8MRrnwW9dSP061MgwqlW8VWg8-2Qp3-7W2DTCKS1-gdZkW49bjG24V1Bt0W1BZS0p387M16N5lS-NSf0_37W4sRBLV2glGbS3crj1"
              target="_blank"
              rel="noreferrer"
            >
              Contact Support on Whatsapp
            </a>
          </div>
          <div className="px-40">
            <p
              className="btn bg-green white-text text-xs py-3 px-6 w-full rounded text-center w-42 mx-auto cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              Request a custom quote
            </p>
          </div>
        </div>

        <RateSuccessModal
          modalIsOpen={openModal}
          closeModal={closeModal}
          type="notify_me"
        />
      </div>
    </>
  );
};

export default NotifyMe;
