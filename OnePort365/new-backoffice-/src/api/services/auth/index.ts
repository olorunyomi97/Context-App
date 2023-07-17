import { post } from "helpers/axios";
import {
  loginUrl,
  verifyLoginUrl,
  registerUrl,
  resendVerificationUrl,
  forgotPasswordUrl,
  validatePhoneAndEmailUrl,
  validateRegistrationUrl,
  forgotPasswordOtpUrl,
  changePasswordUrl
} from "api/endpoints";

const login = (data: object) => {
  return post(loginUrl, data);
};

const verifyLogin = (data: object) => {
  return post(verifyLoginUrl, data);
};

const register = (data: object) => {
  return post(registerUrl, data);
};

const forgotPassword = (data: object) => {
  return post(forgotPasswordUrl, data);
};

const changePassword = (data: object) => {
  return post(changePasswordUrl, data);
};

const forgotPasswordOtp = (data: object) => {
  return post(forgotPasswordOtpUrl, data);
};
const validatePhoneAndEmail = (data: object) => {
  return post(validatePhoneAndEmailUrl, data);
};

const validateRegistration = (data: object) => {
  return post(validateRegistrationUrl, data);
};

const resendVerification = (data: object) => {
  return post(resendVerificationUrl, data);
};

const authServices = {
  login,
  verifyLogin,
  register,
  validatePhoneAndEmail,
  validateRegistration,
  resendVerification,
  forgotPassword,
  forgotPasswordOtp,
  changePassword
};

export default authServices;
