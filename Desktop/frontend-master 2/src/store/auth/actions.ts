import {
  LOGIN_USER,
  REGISTER_USER,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_OTP_VERIFY,
  VALIDATE_PHONE_AND_EMAIL,
  VALIDATE_REGISTRATION,
  RESEND_VERIFICATION,
  LOGOUT_USER,
  API_ERROR,
  CLEAR_API_ERROR,
  VERIFY_USER_LOGIN,
  VERIFY_LOGIN,
  RESET_PASSWORD,
  COUNTRY_UPDATE
} from "store/auth/constants";
import {
  IUserSignin,
  IUserSignUp,
  IUserForgotPassword,
  IValidatePhoneAndEmail,
} from "store/auth/types";

export const loginUser = (user: IUserSignin, redirect?: string) => {
  return {
    type: LOGIN_USER.REQUEST,
    payload: { user, redirect },
  };
};

export const setCountry = (response: any) => {
  return {
    type: COUNTRY_UPDATE.REQUEST,
    payload: response
  };
}

export const loginSuccess = (response: any) => {
  return {
    type: LOGIN_USER.SUCCESS,
    payload: response,
  };
};

export const verifyLogin = (response: any) => {
  return {
    type: VERIFY_LOGIN,
    payload: response,
  };
};

export const registerUser = (user: IUserSignUp, redirect: string) => {
  return {
    type: REGISTER_USER.REQUEST,
    payload: { user, redirect },
  };
};

export const registerSuccess = (response: any) => {
  return {
    type: REGISTER_USER.SUCCESS,
    payload: response,
  };
};

export const validatePhoneAndEmail = (
  data: IValidatePhoneAndEmail,
  callback: any
) => {
  return {
    type: VALIDATE_PHONE_AND_EMAIL.REQUEST,
    payload: { data, callback },
  };
};

export const validatePhoneAndEmailSuccess = (response: any) => {
  return {
    type: VALIDATE_PHONE_AND_EMAIL.SUCCESS,
    payload: response,
  };
};

export const validateRegistration = (data: any, redirect: string) => {
  return {
    type: VALIDATE_REGISTRATION.REQUEST,
    payload: { data, redirect },
  };
};

export const validateRegistrationSuccess = (response: any) => {
  return {
    type: VALIDATE_REGISTRATION.SUCCESS,
    payload: response,
  };
};

export const resendVerification = (
  data: { email: string },
  redirect: string
) => {
  return {
    type: RESEND_VERIFICATION.REQUEST,
    payload: { data, redirect },
  };
};

export const resendVerificationSuccess = (response: any) => {
  return {
    type: RESEND_VERIFICATION.SUCCESS,
    payload: response,
  };
};

export const verifyUserLogin = (verify_payload: any) => {
  return {
    type: VERIFY_USER_LOGIN,
    payload: { verify_payload },
  };
};

export const forgotPasswordUser = (
  user: IUserSignin,
  callback: any,
  verifyTokenCallback: any
) => {
  return {
    type: FORGOT_PASSWORD.REQUEST,
    payload: { user, callback, verifyTokenCallback },
  };
};

export const forgotPasswordUserSuccess = (response: any) => {
  return {
    type: FORGOT_PASSWORD.SUCCESS,
    payload: response,
  };
};

export const VerifyOtpPasswordReset = (
  user: IUserSignin,
  callback: any,
  setResetTokenCallback: any
) => {
  return {
    type: FORGOT_PASSWORD_OTP_VERIFY.REQUEST,
    payload: { user, callback, setResetTokenCallback },
  };
};

export const VerifyOtpPasswordResetSuccess = (response: any) => {
  return {
    type: FORGOT_PASSWORD_OTP_VERIFY.SUCCESS,
    payload: response,
  };
};

export const resetPassword = (user: any, callback: any) => {
  return {
    type: RESET_PASSWORD.REQUEST,
    payload: { user, callback },
  };
};

export const resetPasswordSuccess = (response: any) => {
  return {
    type: RESET_PASSWORD.SUCCESS,
    payload: response,
  };
};

export const logoutUser = (history?: any) => {
  return {
    type: LOGOUT_USER.REQUEST,
    payload: { history },
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER.SUCCESS,
    payload: {},
  };
};

export const apiError = (error: any) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};

export const clearErrors = (error: any) => {
  return {
    type: CLEAR_API_ERROR,
    payload: error,
  };
};
