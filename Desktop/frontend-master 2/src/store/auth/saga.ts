import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

//services
import authServices from "api/services/auth";
import quoteServices from "api/services/quote";

//redux
import {
  LOGIN_USER,
  REGISTER_USER,
  VALIDATE_PHONE_AND_EMAIL,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_OTP_VERIFY,
  VALIDATE_REGISTRATION,
  RESEND_VERIFICATION,
  RESET_PASSWORD,
} from "./constants";
import {
  apiError,
  loginSuccess,
  registerSuccess,
  forgotPasswordUserSuccess,
  VerifyOtpPasswordResetSuccess,
  validatePhoneAndEmailSuccess,
  validateRegistrationSuccess,
  resendVerificationSuccess,
  resetPasswordSuccess,
} from "./actions";
import { ResponseGenerator } from "store/type";

//helpers
import mixpanel from "helpers/mixpanel";
import { errorHandler } from "helpers/errorHandler";

function* loginUser({ payload }: any) {
  try {
    const { user, redirect } = payload;

    const response: ResponseGenerator = yield call(authServices.login, user);

    if (response.data) {
      // if (response.data.data.user.last_login_date === undefined) {
      //   localStorage.setItem("token", response.data.data.jwt_token);
      //   localStorage.setItem(
      //     "user_data",
      //     JSON.stringify(response.data.data.user.user)
      //   );
      //   window.location.replace(`${window.location.origin}/team-verification/?email=${response.data.data.user.email}`);
      //   return;
      // }
      if (response.data.data.verify_token) {
        window.location.replace(
          `${window.location.origin}/verify-email?email=${response.data.data.email}&token=${response.data.data.verify_token}&redirect=${redirect}`
        );
      } else {
        mixpanel.track("Login completed", {
          email: user.email,
        });

        response.data.data.redirect = redirect;

        yield put(loginSuccess(response.data.data));

        // await this.setUserToken(response)

        //check if redirect has a quote id
        // let quoteId = redirect.split("quote=")[1];

        // if (quoteId) {
        //   yield call(quoteServices.linkUserToQuote, {
        //     id: quoteId,
        //     token: response.data.data.jwt_token,
        //   });
        // }

        // window.location.replace(`${window.location.origin}${redirect}`);
      }
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(apiError(message));
  }
}

function* forgotPasswordUser({ payload }: any) {
  try {
    const { user, callback, verifyTokenCallback } = payload;
    const response: ResponseGenerator = yield call(
      authServices.forgotPassword,
      user
    );
    if (response.data.status === "success") {
      yield put(forgotPasswordUserSuccess(response.data));
      callback(2);
      verifyTokenCallback(response.data.data.verify_token);
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(apiError(message));
  }
}

function* VerifyOtpPasswordReset({ payload }: any) {
  try {
    const { user, callback, setResetTokenCallback } = payload;
    const response: ResponseGenerator = yield call(
      authServices.forgotPasswordOtp,
      user
    );
    if (response.data.status === "success") {
      yield put(VerifyOtpPasswordResetSuccess(response.data));
      setResetTokenCallback(response.data.data.password_reset_token);
      callback(3);
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(apiError(message));
  }
}

function* resetPassword({ payload }: any) {
  try {
    const { user, callback } = payload;
    const response: ResponseGenerator = yield call(
      authServices.resetPassword,
      user
    );

    if (response.data.status === "success") {
      yield put(resetPasswordSuccess(response.data));
      // callback(3);
      // toast.success("user password successfully reset", {
      //   onClose: () => (window.location.href = "password-confirmation"),
      // });
      // window.location.replace(`${window.location.origin}/password-confirmation`);
      callback();
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(apiError(message));
  }
}

function* registerUser({ payload }: any) {
  const { user, redirect } = payload;
  try {
    const response: ResponseGenerator = yield call(authServices.register, user);

    if (response.data) {
      mixpanel.track("Sign-up completed", {
        email: user.email,
        company_name: user.company_name,
        phone: user.phone,
      });
      yield put(registerSuccess(response.data.data));

      window.location.replace(
        `${window.location.origin}${redirect}&email=${response.data.data.email}&token=${response.data.data.verify_token}`
      );
    }
  } catch (error) {
    mixpanel.track(
      "Encountered an error while completing the sign-up process",
      {
        email: user.email,
        company_name: user.company_name,
        phone: user.phone,
      }
    );
    const message = errorHandler(error);
    yield put(apiError(message));
  }
}

function* validatePhoneAndEmail({ payload }: any) {
  try {
    const { data, callback } = payload;

    const response: ResponseGenerator = yield call(
      authServices.validatePhoneAndEmail,
      data
    );

    if (response.data.status === "success") {
      mixpanel.track("Sign-up start", {
        email: data.email,
        phone: data.phone,
      });

      yield put(validatePhoneAndEmailSuccess(response.data));
      callback(2);
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(apiError(message));
  }
}

function* validateRegistration({ payload }: any) {
  try {
    const { data, redirect } = payload;
    const response: ResponseGenerator = yield call(
      authServices.validateRegistration,
      data
    );

    if (response.data) {
      mixpanel.track("Account confirmed", {
        email: data.email,
      });

      yield put(validateRegistrationSuccess(response.data.data));
      localStorage.setItem("token", response.data.data.jwt_token);
      localStorage.setItem(
        "user_data",
        JSON.stringify(response.data.data.user)
      );

      window.location.replace(`${window.location.origin}${redirect}`);
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(apiError(message));
  }
}

function* resendVerification({ payload }: any) {
  try {
    const { data, redirect } = payload;

    const response: ResponseGenerator = yield call(
      authServices.resendVerification,
      data
    );

    if (response.data) {
      yield put(resendVerificationSuccess(response.data.data));

      toast.success("otp resent, check your e-mail", {
        onClose: () =>
          window.location.replace(
            `${window.location.origin}${redirect}&email=${response.data.data.email}&token=${response.data.data.verify_token}`
          ),
      });
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(apiError(message));
  }
}

// async function setUserToken(response) {
//   localStorage.setItem("token", response.data.data.jwt_token);
//   localStorage.setItem(
//     "user_data",
//     JSON.stringify(response.data.data.user)
//   );
// }

function* authSaga() {
  yield takeEvery(LOGIN_USER.REQUEST, loginUser);
  yield takeEvery(REGISTER_USER.REQUEST, registerUser);
  yield takeEvery(FORGOT_PASSWORD.REQUEST, forgotPasswordUser);
  yield takeEvery(FORGOT_PASSWORD_OTP_VERIFY.REQUEST, VerifyOtpPasswordReset);
  yield takeEvery(RESET_PASSWORD.REQUEST, resetPassword);

  yield takeEvery(VALIDATE_PHONE_AND_EMAIL.REQUEST, validatePhoneAndEmail);
  yield takeEvery(VALIDATE_REGISTRATION.REQUEST, validateRegistration);
  yield takeEvery(RESEND_VERIFICATION.REQUEST, resendVerification);
}

export default authSaga;
