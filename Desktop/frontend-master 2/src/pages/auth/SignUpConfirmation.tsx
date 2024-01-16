import React from "react";
import { useNavigate } from "react-router-dom";

//icons
import check from "assets/dock/check.svg";
import arrowL from "assets/dock/arrow-left.svg";

//components
import Button from "components/dock/Button";
import OutlineButton from "components/buttons/OutlineButton";

const SignUpConfirmation = () => {
  const navigate = useNavigate();

  const toSpecial = JSON.parse(sessionStorage.getItem('toSpecial') ?? 'null') as boolean;
  const shipmentId = sessionStorage.getItem("shipmentId");
  const openShipmentId = sessionStorage.getItem("openShipmentId");
  const haulageId = sessionStorage.getItem("haulageId");
  const customId = sessionStorage.getItem("customId");

  return (
    <div className="bg-[#F8FAF8] h-screen flex items-center justify-center">
      <div className="sm:w-[450px] w-full p-6 sm:p-0 h-fit max-w-[450px]">
        <div className="flex justify-center">
          <img src={check} alt="" />
        </div>
        <div className="mt-[30px]">
          <h2 className="text-2xl black-text-3 text-center mb-2">
            Account Verifcation Complete
          </h2>
          <p className="text-xs grey-text font-light text-center mt-1 max-w-[317px] mx-auto">
            Your have successfully completed your account setup process, click
            the button below to view your dashboard
          </p>
        </div>
        <div className="mt-20">
          <Button
            title={`${openShipmentId ? 'Continue to view rates' 
            : toSpecial ? 'Continue to Special rates' 
            : (shipmentId || haulageId || customId) ? 'Continue Booking' : 'Continue to Dashboard'}`}
            isColored={true}
            style={{ width: "100%", fontWeight: "400" }}
            onClick={() => {
              if(toSpecial){
                navigate('/')
              } else if(openShipmentId){
                navigate(`/freight-rates/${openShipmentId}`)
              } else if (shipmentId) {
                navigate(`/shipment-information/${shipmentId}`)
              } else if(haulageId){
                navigate(`/haulages-details/${haulageId}`)
              } else if(customId){
                navigate(`/customs-brokerage/${customId}`)
              } else {
                navigate("/dashboard")
              }
            }}
          />
          <OutlineButton
            title="Back to Log in"
            disabled={false}
            onClick={() => {
              localStorage.setItem("token", "");
              localStorage.setItem("user_data", "");
              navigate("/signin");
            }}
            icon={arrowL}
            loading={false}
            style={{
              color: "#6b7280",
              width: "100%",
              border: "none",
              marginTop: "10px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpConfirmation;
