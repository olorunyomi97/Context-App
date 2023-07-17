import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

//style
import "./index.css";

//components
import CustomInput from "components/textInputs/CustomInput";
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import PrimaryButton from "components/buttons/PrimaryButton";
import GoogleButton from "components/buttons/GoogleButton";
import NavBar from "components/navBar";
import LinkedInButton from "components/buttons/LinkedInButton";
import CustomPhoneInput from "components/textInputs/CustomPhoneInput";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import SecondaryButton from "components/buttons/SecondaryButton";
import CustomSteps from "components/customSteps";
import { checkPassword } from "components/passwordStrengthMeter";
//image
import ship from "assets/images/ship.png";

//redux
import { validatePhoneAndEmail, clearErrors, registerUser } from "store/actions";

//helpers
import { getRedirect } from "helpers";

const SignUp = (props: any): JSX.Element => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const { validatePhoneAndEmail, clearErrors, registerUser, error, loading } = props;

    const [passwordError, setPasswordError] = useState(false);

    const [step, setStep] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
        clearErrors();
    }, []);

    const onSubmitStep1 = (data: any) => {
        const { email, phone } = data;
        data = {
            email,
            phone: phone.phone,
        };
        validatePhoneAndEmail(data, setStep);
    };

    const location = useLocation();
    const redirect = getRedirect(location, "dashboard");

    const onSubmitStep2 = (data: object) => {
        setStep(3);
    };

    const onSubmitSignUp = (data: any) => {
        //   @ts-ignore
        const test = checkPassword(data.password, null, 8);
        if (test < 4) {
            setPasswordError(true);
        }

        let phone_details = data.phone;
        data.phone = phone_details.phone;
        data.phone_code = phone_details.country_code;

        data.company_address = data.company_address.label;

        registerUser(data, `/verify-email?redirect=${redirect}`);
    };

    interface SocialLoginGoogleInterface {
        _profile: { email: string };
        _token: { idToken: string };
    }

    const handleSuccess = (data: any) => {};

    const handleSocialLoginGoogle = (data: SocialLoginGoogleInterface) => {
        let postdata = {
            email: data?.["_profile"]["email"],
            token: data?.["_token"]["idToken"],
        };
    };

    return (
        <>
            <NavBar />
            <div className="md:container md:mx-auto w-full max-width">
                <div className="md:grid lg:grid-cols-2 grid-cols-1 gap-4 md:mt-28 items-center w-full">
                    <div className="hidden lg:block">
                        <img src={ship} alt="" className="auth-illustration mx-auto" />
                    </div>

                    <div className="md:px-10 md:mx-5 md:p-12">
                        <div className="auth-card  ">
                            <div className="md:p-7 auth-grad">
                                {/* @ts-ignore */}
                                <div className="md:px-12 md:py-0 px-5 py-10">
                                    <CustomSteps currentStep={step} />
                                </div>
                            </div>
                            <div className="md:px-12 px-5 py-8">
                                <div className="flex">
                                    <h3 className="text-lg black-text-2 font-bold">{step === 1 ? "Sign Up" : step === 2 ? "Company details" : "Password"}</h3>
                                    {step > 3 ? (
                                        <></>
                                    ) : (
                                        <Link to="/signin" className="ml-auto text-md green-text">
                                            {" "}
                                            I have an account
                                        </Link>
                                    )}
                                </div>

                                {error ? <p className="bg-error p-3 text-center black-text text-sm my-4 rounded">{error}</p> : <></>}

                                <div className="mt-5">
                                    {step === 1 ? (
                                        <>
                                            {/* Begin step 1 */}
                                            <form onSubmit={handleSubmit(onSubmitStep1)}>
                                                <div className="">
                                                    <div className="grid grid-cols-2">
                                                        <div className="mr-1">
                                                            <CustomInput
                                                                control={control}
                                                                name={"firstname"}
                                                                id={"firstname"}
                                                                label={"First name"}
                                                                placeholder={"Enter your first name"}
                                                                isRequired={true}
                                                                type={"text"}
                                                                errors={errors}
                                                                isDisabled={false}
                                                                defaultValue={""}
                                                                min={""}
                                                                max={""}
                                                                icon={""}
                                                            />
                                                        </div>

                                                        <div className="ml-1">
                                                            <CustomInput
                                                                control={control}
                                                                name={"lastname"}
                                                                id={"lastname"}
                                                                label={"Last name"}
                                                                placeholder={"Enter your last name"}
                                                                isRequired={true}
                                                                type={"text"}
                                                                errors={errors}
                                                                isDisabled={false}
                                                                defaultValue={""}
                                                                min={""}
                                                                max={""}
                                                                icon={""}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="">
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
                                                    </div>
                                                    <div className="">
                                                        <CustomPhoneInput
                                                            control={control}
                                                            name={"phone"}
                                                            id={"phone"}
                                                            label={"Phone number"}
                                                            isRequired={true}
                                                            defaultValue={""}
                                                            placeholder={"Enter your phone number"}
                                                            isDisabled={false}
                                                            errors={errors}
                                                        />
                                                    </div>

                                                    <div className="flex items-center my-4">
                                                        <hr className="solid-hr  md:w-full w-9/12" />

                                                        <p className="text-xs text-center w-full  uppercase grey-text">or sign up with</p>
                                                        <hr className="solid-hr md:w-full w-9/12" />
                                                    </div>

                                                    <div className="grid grid-cols-2 my-5">
                                                        <div className="mr-1">
                                                            <GoogleButton
                                                                provider="google"
                                                                appId={process.env.REACT_APP_GOOGLE_CLIENT_ID ? process.env.REACT_APP_GOOGLE_CLIENT_ID : ""}
                                                                onLoginSuccess={handleSocialLoginGoogle}
                                                                //  onLoginFailure={handleSocialLoginFailure}
                                                            >
                                                                Google
                                                            </GoogleButton>
                                                        </div>

                                                        <div className="ml-1">
                                                            <LinkedInButton handleSuccess={handleSuccess} />
                                                        </div>
                                                    </div>

                                                    <div className="mt-5">
                                                        {/* @ts-ignore */}
                                                        <PrimaryButton title="Continue" loading={loading} />
                                                    </div>
                                                </div>
                                            </form>
                                            {/* end step 1 */}
                                        </>
                                    ) : step === 2 ? (
                                        <>
                                            {/* begin step 2 */}
                                            <form onSubmit={handleSubmit(onSubmitStep2)}>
                                                <div className="">
                                                    <p className="text-sm grey-text">Libero cursus vulputate malesuada ut. Fusce metus ut fusce duis eu. Enim urna lectus nisl, sagittis sit diam. </p>
                                                </div>

                                                <div className="mt-5">
                                                    <CustomInput
                                                        control={control}
                                                        name={"company_name"}
                                                        id={"company_name"}
                                                        label={"Company name"}
                                                        placeholder={"Enter your company name"}
                                                        isRequired={true}
                                                        type={"text"}
                                                        errors={errors}
                                                        isDisabled={false}
                                                        defaultValue={""}
                                                        min={""}
                                                        max={""}
                                                        icon={""}
                                                    />

                                                    <CustomGoogleInput
                                                        icon=""
                                                        control={control}
                                                        name={"company_address"}
                                                        id={"company_address"}
                                                        label={"Company address"}
                                                        placeholder={"Enter your company address"}
                                                        isRequired={true}
                                                        errors={errors}
                                                        isDisabled={false}
                                                        defaultValue={""}
                                                    />
                                                </div>

                                                <div className="mt-32">
                                                    <div className="flex w-full">
                                                        <div className="flex-auto w-16 mr-1">
                                                            {/* @ts-ignore */}
                                                            <SecondaryButton
                                                                title="Back"
                                                                icon="ion-ios-arrow-round-back"
                                                                onClick={() => {
                                                                    setStep(1);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex-auto w-64 ml-2">
                                                            {/* @ts-ignore */}
                                                            <PrimaryButton title="Continue" loading={loading} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            {/* end step 2 */}
                                        </>
                                    ) : (
                                        <>
                                            {/* begin step 3 */}
                                            <form onSubmit={handleSubmit(onSubmitSignUp)}>
                                                <div className="">
                                                    <CustomInput
                                                        control={control}
                                                        name={"password"}
                                                        id={"password"}
                                                        label={"Password"}
                                                        placeholder={"Enter your password"}
                                                        isRequired={true}
                                                        type={"password-with-strength-meter"}
                                                        errors={
                                                            passwordError
                                                                ? {
                                                                      password: {
                                                                          message: "please fullfil the password conditions above.",
                                                                      },
                                                                  }
                                                                : errors
                                                        }
                                                        isDisabled={false}
                                                        defaultValue={""}
                                                        min={""}
                                                        max={""}
                                                        icon={""}
                                                    />
                                                    {/* {passwordError && (
                            <div className="error-text">
                              <p>
                                please fullfil the password conditions above.
                              </p>
                            </div>
                          )} */}
                                                </div>

                                                <div className="mt-20">
                                                    <div className="mb-5">
                                                        {/* @ts-ignore */}
                                                        <CustomCheckBox name="terms" id="terms" label="terms" isRequired={true} defaultChecked={false} isDisabled={false} />
                                                    </div>
                                                    <div className="flex w-full">
                                                        <div className="flex-auto w-16 mr-1">
                                                            {/* @ts-ignore */}
                                                            <SecondaryButton
                                                                title="Back"
                                                                icon="ion-ios-arrow-round-back"
                                                                onClick={() => {
                                                                    setStep(2);
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex-auto w-64 ml-2">
                                                            {/* @ts-ignore */}
                                                            <PrimaryButton title="Continue" loading={loading} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            {/* end step 3 */}
                                        </>
                                    )}
                                </div>
                            </div>
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

export default connect(mapStateToProps, {
    validatePhoneAndEmail,
    clearErrors,
    registerUser,
})(SignUp);
