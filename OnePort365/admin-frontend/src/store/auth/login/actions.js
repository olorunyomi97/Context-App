import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SOCIAL_LOGIN,
  VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  CLEAR_API_ERROR,
  RESEND_OTP_SUCCESS,
  RESEND_OTP
} from "./actionTypes"

export const loginUser = (user, setTokenStep, setOTPostData) => {
  return {
    type: LOGIN_USER,
    payload: { user, setTokenStep,setOTPostData },
  }
}

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}


export const logoutUser = history => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  }
} 

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  }
} 

export const verifyOTP = (user) => {
  return {
    type: VERIFY_OTP,
    payload: {user},
  }
}

export const verifyOTPSuccess = user => {
  return {
    type: VERIFY_OTP_SUCCESS,
    payload: user,
  }
}


export const resendOTP = (user) => {
  return {
    type: RESEND_OTP,
    payload: {user},
  }
}

export const resendOTPSuccess = user => {
  return {
    type: RESEND_OTP_SUCCESS,
    payload: user,
  }
}
export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}

export const socialLogin = (data, history, type) => {
  return {
    type: SOCIAL_LOGIN,
    payload: { data, history, type },
  }
}

export const clearErrors = (error) => {
  return {
    type: CLEAR_API_ERROR,
    payload: error,
  };
};