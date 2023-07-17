import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
//style
import "./index.css";
//components
import CustomInput from "components/textInputs/CustomInput";
// import CustomCheckBox from "components/checkBox/CustomCheckbox";
import PrimaryButton from "components/buttons/PrimaryButton";
// import GoogleButton from "components/buttons/GoogleButton";
// import LinkedInButton from "components/buttons/LinkedInButton";
// import NavBar from "components/navBar";
//image
import ship from "assets/images/ship.png";
import OnePort from "assets/images/oneport-logo.png";
//redux
import { ValidateEmailAndPassword, loginUser, clearErrors } from "store/actions";
import { checkPassword } from "components/passwordStrengthMeter";
//helpers
import { getRedirect } from "helpers";

const SignIn = (props: any): JSX.Element => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    // const [step, setStep] = useState(1);
    const [passwordError, setPasswordError] = useState(false);

    const { loginUser, clearErrors, error, loading } = props;
    // const { ValidateEmailAndPassword, loginUser, clearErrors, error, loading } = props;

    useEffect(() => {
        window.scrollTo(0, 0);
        clearErrors();
    }, []);

    // const location = useLocation();
    // const redirect = getRedirect(location, "dashboard");

    // const onSubmit = (data: any) => {
    //     const { email, password } = data;
    //     data = {
    //         email,
    //         password: password.password,
    //     };
    //     ValidateEmailAndPassword(data, setStep)
    //     // loginUser(data, redirect);
    // };

    const location = useLocation();
    const redirect = getRedirect(location, "dashboard");

    const onSubmitLogin = (data: any) => {
        //   @ts-ignore
        const test = checkPassword(data.password, null, 8);
        if (test < 4) {
            setPasswordError(true);
        }

        // let phone_details = data.phone;
        // data.phone = phone_details.phone;
        // data.phone_code = phone_details.country_code;

        // data.company_address = data.company_address.label;

        loginUser(data, `/verify-email?redirect=${redirect}`);
    };
    
    interface SocialLoginGoogleInterface {
        _profile: { email: string };
        _token: { idToken: string };
    }

    // const handleSuccess = (data: any) => {};

    // const handleSocialLoginGoogle = (data: SocialLoginGoogleInterface) => {
    //     let postdata = {
    //         email: data?.["_profile"]["email"],
    //         token: data?.["_token"]["idToken"],
    //     };
    // };

    return (
        <>
            <div className="container mx-auto h-fit w-full max-width">
                <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 lg:mt-40">
					<div className="lg:block hidden">
                        <img src={ship} alt="" className="auth-illustration" />
                    </div>
                    <div className=" md:px-10 px-5 md:py-0 py-14">
                        <div className="auth-card md:mx-5 md:p-12">
                            {error ? <p className="bg-error p-3 text-center black-text text-sm my-4 lowercase rounded">{error}</p> : <></>}
                            <form onSubmit={handleSubmit(onSubmitLogin)}>
                                <div className="mt-5">
                                    <div className="">
										<img 
											className="ml-5 mb-5"
											src={OnePort} 
											alt="" 
											height='70%' 
											width='70%' 
										/>
                                        <CustomInput
                                            control={control}
                                            name={"email"}
                                            id={"email"}
                                            label={"Email Address"}
                                            placeholder={"Enter your email"}
                                            isRequired={true}
                                            type={"email"}
                                            errors={errors}
                                            isDisabled={false}
                                            defaultValue={""}
                                            min={""}
                                            max={""}
                                            icon=""
                                        />

                                        <CustomInput
                                            control={control}
                                            name={"password"}
                                            id={"password"}
                                            label={"Password"}
                                            isRequired={true}
                                            isDisabled={false}
                                            defaultValue={""}
                                            min={""}
                                            max={""}
                                            icon={""}
                                            placeholder={"Enter your password"}
                                            type={"password"}
                                            errors={errors}
                                        />
                                    </div>

                                    <div className="mt-5">
                                        {/* @ts-ignore */}
                                        <PrimaryButton title="Sign In" loading={loading} />
                                    </div>
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
    const { error, loading } = state.auth;
    return { error, loading };
};

export default connect(mapStateToProps, { ValidateEmailAndPassword, loginUser, clearErrors })(SignIn);
