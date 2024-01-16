import { generateActions } from "helpers/generateActions";

//login
export const LOGIN_USER = generateActions("LOGIN_USER");
export const LOGOUT_USER = generateActions("LOGOUT_USER");

//register
export const REGISTER_USER = generateActions("REGISTER_USER");

//validate phone and email
export const VALIDATE_PHONE_AND_EMAIL = generateActions(
  "VALIDATE_PHONE_AND_EMAIL"
);

//forgot password
export const FORGOT_PASSWORD = generateActions("FORGOT_PASSWORD");
export const FORGOT_PASSWORD_OTP_VERIFY = generateActions(
  "FORGOT_PASSWORD_OTP_VERIFY"
);
export const RESET_PASSWORD = generateActions("RESET_PASSWORD");

//email validation on registration
export const VALIDATE_REGISTRATION = generateActions("VALIDATE_REGISTRATION");

//resend verification
export const RESEND_VERIFICATION = generateActions("RESEND_VERIFICATION");

export const API_ERROR = "API_ERROR";

export const CLEAR_API_ERROR = generateActions("CLEAR_API_ERROR");

export const VERIFY_LOGIN = "VERIFY_LOGIN";
export const VERIFY_USER_LOGIN = "VERIFY_USER_LOGIN";

export const COUNTRY_UPDATE = generateActions("COUNTRY_UPDATE");
