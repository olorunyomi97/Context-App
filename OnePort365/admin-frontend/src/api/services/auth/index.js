import { post } from "../../../helpers/api_helper";
import {
  loginUrl,
  registerUrl,
  resendVerificationUrl,
  forgotPasswordUrl,
  validatePhoneAndEmailUrl,
  validateRegistrationUrl,
  forgotPasswordOtpUrl,
  changePasswordUrl,
  verifyOtpUrl,
  resendOtpUrl
} from "../../endpoints/index";

const login = (data) => {
  return post(loginUrl, data);
};

const register = (data) => {
  return post(registerUrl, data);
};

const forgotPassword = (data) => {
  return post(forgotPasswordUrl, data);
};

const verifyOtp = (data) => {
  return post(verifyOtpUrl, data);
};
const resendOtp = (data) => {
  return post(resendOtpUrl, data);
};

 
const changePassword = (data) => {
  return post(changePasswordUrl, data);
};

const forgotPasswordOtp = (data) => {
  return post(forgotPasswordOtpUrl, data);
};
const validatePhoneAndEmail = (data) => {
  return post(validatePhoneAndEmailUrl, data);
};

const validateRegistration = (data) => {
  return post(validateRegistrationUrl, data);
};

const resendVerification = (data) => {
  return post(resendVerificationUrl, data);
};

const authServices = {
  login,
  register,
  validatePhoneAndEmail,
  validateRegistration,
  resendVerification,
  forgotPassword,
  forgotPasswordOtp,
  changePassword,
  verifyOtp,
  resendOtp
};

export default authServices;
