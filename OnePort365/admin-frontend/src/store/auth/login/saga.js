import { takeEvery, put, call, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER,VERIFY_OTP ,RESEND_OTP} from "./actionTypes"
import { loginSuccess, logoutUserSuccess, apiError ,verifyOTPSuccess,resendOTPSuccess} from "./actions"
 
//services
import authServices from "../../../api/services/auth";
 
function* loginUser({ payload: { user, setTokenStep,setOTPostData } }) {
 
  try {
       const response = yield call(authServices.login, {
        email: user.email,
        password: user.password,
      })
       if(response.status =="success"){
        setTokenStep(2);
        setOTPostData(response.data);
      } 
      yield put(loginSuccess(response.data))
   } catch (error) {
      const message =
      error["response"]["data"]["message"] || error.message || "network error";
        yield put(apiError(message))
  }

}

function* verifyOTP({ payload: {user} }) {
 
    try {
       const response = yield call(authServices.verifyOtp, {
       email: user.email,
       verify_token: user.verify_token,
       otp_code: user.otp_code
      });

      if(response.status =="success"){
       
        localStorage.setItem("authUser", JSON.stringify(response.data))
        window.location="dashboard"; 
      } 
      yield put(verifyOTPSuccess(response.data))
  } catch (error) {
    const message =
      error["response"]["data"]["message"] || error.message || "network error";
        yield put(apiError(message))
  }

}

function* resendOTP({ payload: {user} }) {
 
  try {
     const response = yield call(authServices.resendOtp, {
     email: user.email,
     verify_token: user.verify_token
    });

    if(response.status =="success"){
      yield put(resendOTPSuccess(response.data))
    } 
      
} catch (error) {
  const message =
    error["response"]["data"]["message"] || error.message || "network error";
      yield put(apiError(message))
}

}

 

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")

    
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}
 

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
  yield takeEvery(VERIFY_OTP, verifyOTP)
  yield takeEvery(RESEND_OTP, resendOTP)

   
}

export default authSaga
