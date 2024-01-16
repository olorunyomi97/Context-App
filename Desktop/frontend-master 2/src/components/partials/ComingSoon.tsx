import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//icons
import cross from "assets/icons/cross.svg";

//components
import Layout from "components/layout/Layout";
import NewShipment from "components/dashboard/NewShipment";
import PrimaryButtons from "components/buttons/PrimaryButtons";
import OutlineButton from "components/buttons/OutlineButton";

interface ComingSoonProps {
  pagetitle: string;
  pagesubtitle: string;
  icon: any;
}

const ComingSoon = ({ pagetitle, pagesubtitle, icon }: ComingSoonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [showShipment, setShowShipment] = useState(false);

  let user = useSelector((state: any) => state.auth.user_data);
  // @ts-ignore
  user = user ? user : JSON.parse(localStorage.getItem("user_data"));

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu, then close the menu
      if (showShipment && ref.current && !ref.current.contains(e.target)) {
        setShowShipment(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showShipment]);

  return (
    <Layout>
      <main className="px-4 pt-8 lg:pt-10 lg:px-10">
        <div className="flex flex-col justify-between md:flex-row md:items-center">
          <div className="mb-8 md:mb-0">
            <h2 className="text-[#344335] text-2xl">{pagetitle}</h2>
            <p className="grey-text text-sm">{pagesubtitle}</p>
          </div>
          <div ref={ref} className="relative">
            <PrimaryButtons
              title="Start New Shipment"
              style={{}}
              onClick={() => setShowShipment(!showShipment)}
              disabled={false}
              loading={false}
              icon={cross}
            />
            {showShipment && (
              <div className="absolute z-10 right-0 top-16">
                <NewShipment />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center h-[calc(99vh_-_152px)]">
          <div className="mb-8">
            <img src={icon} alt="" />
          </div>
          <p className="text-2xl md:text-4xl black-text max-w-[545px] text-center">
            Hello,{" "}
            {user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}!
            We are working on {pagetitle}
          </p>
          <p className="text-lg md:text-xl mt-5 font-light max-w-[610px] text-center grey-text">
            Our team is hard at work developing {pagetitle}. It's not available
            just yet, but you'll be the first to know when it's ready.
          </p>

          <div className="flex flex-col gap-y-5 md:gap-y-0 md:flex-row md:gap-x-16 items-center max-w-[610px] mt-12 md:border-[1px] md:border-solid md:border-{#e5e7eb} rounded py-2 md:pr-1 md:pl-4">
            <p className="grey-text-1 font-light">Head back to the dashboard</p>
            <OutlineButton
              title="Dashboard"
              style={{ color: "#3AB44A", border: "1px solid #3AB44A" }}
              onClick={() => navigate("/dashboard")}
              disabled={false}
              loading={false}
              icon={""}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ComingSoon;
