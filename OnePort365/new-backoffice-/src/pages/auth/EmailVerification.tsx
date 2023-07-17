import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import OnePort from "assets/images/oneport-logo.png";
//style
import "./index.css";
// components
import PrimaryButton from "components/buttons/PrimaryButton";
// import NavBar from "components/navBar";

//redux
import { clearErrors, resendVerification, validateRegistration } from "store/actions";

//helpers
import { getRedirect } from "helpers";
import CustomOtpInput from "components/textInputs/CustomOtpInput";

const EmailVerification = (props: any): JSX.Element => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const {
        clearErrors,
        error,
        loading,

        validateRegistration,
        resendVerification,
    } = props;

    const [counter, setCounter] = useState(10);

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        //   @ts-ignore
        return () => clearInterval(timer);
    }, [counter]);

    useEffect(() => {
        window.scrollTo(0, 0);
        clearErrors();
    }, []);

    const location = useLocation();
    const redirect = getRedirect(location, "dashboard");

    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token") ?? " ";

    const otp_data = {
        verify_token: decodeURIComponent(token.replace(/ /g, "+")),
        email: urlParams.get("email"),
        otp_code: 0,
    };

    const onSubmit = (data: any) => {
        otp_data.otp_code = parseInt(data.otp_code);
        validateRegistration(otp_data, redirect);
    };

    const resendOtp = () => {
        setCounter(10);
        resendVerification({ email: otp_data.email }, `/verify-email?redirect=${redirect}`);
    };

    return (
        <>
            {/* <NavBar /> */}
			<div className="verification_logo" style={{ marginTop:'50px', marginBottom:'50px'}}>
				<img 
					src={OnePort} 
					height='20%' 
					width='20%' 
				/>
			</div>
            <div className=" container mx-auto w-full flex items-center justify-center">
                <div className="">
                    <div className="auth-card mx-5 md:p-12">
                        <div className="">
                            <h3 className="text-lg black-text-2 font-bold">Admin Login Verification</h3>
                        </div>

                        {error ? <p className="bg-error p-3 text-center black-text text-sm my-4 lowercase rounded">{error}</p> : <></>}

                        <div className="mt-10">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="">
                                    {/* @ts-ignore */}
                                    <CustomOtpInput control={control} label={`Enter the 6 Digit Token sent to your mail`} name="otp_code" isRequired={true} errors={errors} />
                                </div>
                                <div className="flex justify-center my-10">
                                    <p className=" text-center text-sm black-text">Didn't get the code?{"  "}</p>
                                    <p
                                        className={`text-sm green-text ${counter && "opacity-50"} ml-1`}
                                        onClick={() => {
                                            counter === 0 && resendOtp();
                                        }}
                                    >
                                        {" "}
                                        resend otp {counter === 0 ? " " : `in ${counter} seconds`}
                                    </p>
                                </div>
                                <div className="mt-5">
                                    {/* @ts-ignore */}
                                    <PrimaryButton title="Verify E-Mail" loading={loading} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state: any) => {
    const { error, loading, otp_data } = state.auth;
    return { error, loading, otp_data };
};

export default connect(mapStateToProps, {
    clearErrors,
    validateRegistration,
    resendVerification,
})(EmailVerification);
