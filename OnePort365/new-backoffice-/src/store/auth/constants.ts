import { generateActions } from "helpers/generateActions";

//login
export const LOGIN_USER = generateActions("LOGIN_USER");
export const VERIFY_OTP_LOGIN = generateActions("VERIFY_OTP_LOGIN");
export const LOGOUT_USER = generateActions("LOGOUT_USER");

//validate password and email
export const VALIDATE_PASSWORD_AND_EMAIL = generateActions("VALIDATE_PASSWORD_AND_EMAIL");


//register
export const REGISTER_USER = generateActions("REGISTER_USER");

//validate phone and email
export const VALIDATE_PHONE_AND_EMAIL = generateActions("VALIDATE_PHONE_AND_EMAIL");


//forgot password
export const FORGOT_PASSWORD = generateActions("FORGOT_PASSWORD");
export const FORGOT_PASSWORD_OTP_VERIFY = generateActions("FORGOT_PASSWORD_OTP_VERIFY");
export const CHANGE_PASSWORD = generateActions("CHANGE_PASSWORD")


//email validation on registration
export const VALIDATE_REGISTRATION = generateActions("VALIDATE_REGISTRATION");

//email validation on registration
export const VALIDATE_LOGIN = generateActions("VALIDATE_LOGIN");

//resend verification
export const RESEND_VERIFICATION = generateActions("RESEND_VERIFICATION");

export const API_ERROR = "API_ERROR";

export const CLEAR_API_ERROR = generateActions("CLEAR_API_ERROR");

export const VERIFY_LOGIN = generateActions("VERIFY_LOGIN");
export const VERIFY_LOGIN_SUCCESS = generateActions("VERIFY_LOGIN_SUCCESS");
export const VERIFY_USER_LOGIN = "VERIFY_USER_LOGIN";
