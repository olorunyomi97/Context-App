import React from "react";
import { LinkedIn } from "react-linkedin-login-oauth2";
import { useLocation } from "react-router-dom";

//helper
import { getRedirect } from "helpers";

const LinkedInButton = (props: any): JSX.Element => {
  const location = useLocation();
  const redirect = getRedirect(location, "dashboard");

  const { handleSuccess } = props;
  return (
    <LinkedIn
      clientId={
        process.env.REACT_APP_LINKEDIN_CLIENT_ID
          ? process.env.REACT_APP_LINKEDIN_CLIENT_ID
          : ""
      }
      //   onFailure={handleFailure}
      onSuccess={handleSuccess}
      scope={"r_emailaddress r_liteprofile"}
      redirectUri={`${window.location.origin}/linkedin?params=signin?${redirect}`}
    >
      {({ linkedInLogin }) => (
        <button
          className="social-btn btn bg-grey black-text text-base font-semibold py-3 w-full rounded"
          onClick={linkedInLogin}
        >
          <div className="flex justify-center items-center">
            <i
              className="ion-logo-linkedin mr-2"
              style={{ color: "#0A66C2", fontSize: 25 }}
            ></i>
            {"  "}
            LinkedIn
          </div>
        </button>
      )}
    </LinkedIn>
    //  @ts-ignore
    //   renderElement={({ onClick, disabled }) => (
    //     <button
    //       className="social-btn btn bg-grey black-text text-base ont-semibold py-3 w-full rounded"
    //       onClick={onClick}
    //       disabled={disabled}
    //     >
    //       <i
    //         className="ion-logo-linkedin mr-1"
    //         style={{ color: "#0D6DAD", fontSize: "16px" }}
    //       ></i>
    //       {"  "}
    //       LinkedIn
    //     </button>
    //   )}
  );
};

export default LinkedInButton;
