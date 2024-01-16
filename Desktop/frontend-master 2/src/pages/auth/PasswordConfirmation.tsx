import React from "react";
import { useNavigate } from "react-router-dom";

//icons
import check from "assets/dock/check.svg";
import arrowL from "assets/dock/arrow-left.svg";

//components
import Button from "components/dock/Button";
import OutlineButton from "components/buttons/OutlineButton";

//libraries
import { useForm } from "react-hook-form";

const PasswordConfirmation = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  return (
    <div className="bg-[#F8FAF8] h-screen flex items-center justify-center">
      <div className="sm:w-[450px] w-full p-6 sm:p-0 h-fit max-w-[450px]">
        <div className="flex justify-center">
          <img src={check} alt="" />
        </div>
        <div className="mt-[30px]">
          <h2 className="text-2xl black-text-3 text-center mb-2">
            New Password Set
          </h2>
          <p className="text-xs grey-text font-light text-center mt-1 max-w-[262px] mx-auto">
            Your password has been successfully reset, click the button below to
            login
          </p>
        </div>
        <div className="mt-20">
          <Button
            title="Proceed to Login"
            isColored={true}
            style={{ width: "100%", fontWeight: "400" }}
            onClick={() => navigate("/signin")}
          />
          {/* <OutlineButton title='Back to Log in' disabled={false} onClick={() => navigate("/signin")} icon={arrowL} loading={false} style={{ color: "#6b7280", width: "100%", border: "none", marginTop: "10px" }} /> */}
        </div>
      </div>
    </div>
  );
};

export default PasswordConfirmation;
