import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";

//services
import authServices from "api/services/auth";
import mixpanel from "helpers/mixpanel";

//redux
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, VALIDATE_PHONE_AND_EMAIL, FORGOT_PASSWORD, FORGOT_PASSWORD_OTP_VERIFY, VALIDATE_REGISTRATION, RESEND_VERIFICATION, CHANGE_PASSWORD } from "./constants";
import { apiError, loginSuccess, registerSuccess, forgotPasswordUserSuccess, VerifyOtpPasswordResetSuccess, validatePhoneAndEmailSuccess, validateRegistrationSuccess, resendVerificationSuccess, postNewPasswordSuccess, logoutUserSuccess } from "./actions";
import { ResponseGenerator } from "store/type";
// @ts-ignore
const admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));


function* loginUser({ payload }: any) {
    try {
        const { user, redirect } = payload;
        const response: ResponseGenerator = yield call(authServices.login, user);
        if (response.data) {
            yield put(loginSuccess(response.data.data));
            console.log(response.data.data);
            window.location.replace(`${window.location.origin}${redirect}&email=${response.data.data.email}&token=${response.data.data.verify_token}`);
        } else {
            mixpanel.track('Lgin Completed', {
                email: admin_data.email,
            })
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        yield put(apiError(message));
    }
}

// function* verifyOTP({ payload }: any) {
//     try {
//         const { user } = payload;
//         const response = yield call(authServices.verifyLogin,
//             {
//                 email: user.email,
//                 verify_token: user.verify_token,
//                 otp_code: user.otp_code,
//             }
//         );

//         if (response.status == "success") {
//             // localStorage.setItem("authUser", JSON.stringify(response.data));
//             console.log(response.data.data);
//             localStorage.setItem("token", response.data.data);
//             // window.location.replace('/dashboard');
//         }
//         yield put(verifyLoginSuccess(response.data));
//     } catch (error) {
//         const message = error["response"]["data"]["message"] || error.message || "network error";
//         yield put(apiError(message));
//     }
// }


function* forgotPasswordUser({ payload }: any) {
    try {
        const { user, callback, verifyTokenCallback } = payload;
        const response: ResponseGenerator = yield call(authServices.forgotPassword, user);
        if (response.data.status === "success") {
            yield put(forgotPasswordUserSuccess(response.data));
            callback(2);
            verifyTokenCallback(response.data.data.verify_token);
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        yield put(apiError(message));
    }
}

function* VerifyOtpPasswordReset({ payload }: any) {
    try {
        const { user, callback, setResetTokenCallback } = payload;
        const response: ResponseGenerator = yield call(authServices.forgotPasswordOtp, user);
        if (response.data.status === "success") {
            yield put(VerifyOtpPasswordResetSuccess(response.data));
            setResetTokenCallback(response.data.data.password_reset_token);
            callback(3);
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        yield put(apiError(message));
    }
}

function* postNewPassword({ payload }: any) {
    try {
        const { user } = payload;
        const response: ResponseGenerator = yield call(authServices.changePassword, user);

        if (response.data.status === "success") {
            yield put(postNewPasswordSuccess(response.data));
            // callback(3);

            cogoToast.success("user password successfully reset").then(() => {
                window.location.href = "signin";
            });
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";
        yield put(apiError(message));
    }
}

function* registerUser({ payload }: any) {
    try {
        const { user, redirect } = payload;

        const response: ResponseGenerator = yield call(authServices.register, user);

        if (response.data) {
            yield put(registerSuccess(response.data.data));

            window.location.replace(`${window.location.origin}${redirect}&email=${response.data.data.email}&token=${response.data.data.verify_token}`);
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        yield put(apiError(message));
    }
}

function* validatePhoneAndEmail({ payload }: any) {
    try {
        const { data, callback } = payload;
        const response: ResponseGenerator = yield call(authServices.validatePhoneAndEmail, data);

        if (response.data.status === "success") {
            mixpanel.track("sign-up start", {
                email: admin_data.email,
                phone: admin_data.phone,
            })
            yield put(validatePhoneAndEmailSuccess(response.data));
            callback(2);
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        yield put(apiError(message));
    }
}

function* validateRegistration({ payload }: any) {
    try {
        const { data, redirect } = payload;
        const response: ResponseGenerator = yield call(authServices.validateRegistration, data);
        if (response.data) {
            // Comma here //
            // mixpanel.track("Account confirmed", {
            //     email: data.email,
            // });

            yield put(validateRegistrationSuccess(response.data.data));
            console.log(response.data.data.admin);

            localStorage.setItem("token", response.data.data.token);
            const admin_data = JSON.stringify(response.data.data.admin)
            localStorage.setItem("admin_data", admin_data)
            window.location.replace(`${window.location.origin}${redirect}`);
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        yield put(apiError(message));
    }
}

function* resendVerification({ payload }: any) {
    try {
        const { data, redirect } = payload;

        const response: ResponseGenerator = yield call(authServices.resendVerification, data);

        if (response.data) {
            yield put(resendVerificationSuccess(response.data.data));

            cogoToast.success("otp resent, check your e-mail").then(() => {
                window.location.replace(`${window.location.origin}${redirect}&email=${response.data.data.email}&token=${response.data.data.verify_token}`);
            });
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        yield put(apiError(message));
    }
}

function* logoutUser() {
    try {
        localStorage.removeItem("token")
    } catch (error) {
        yield put(apiError(error));
    }
    // localStorage.removeItem('token')
}

function* authSaga() {
    yield takeEvery(LOGIN_USER.REQUEST, loginUser);
    yield takeEvery(LOGOUT_USER.REQUEST, logoutUser);
    yield takeEvery(REGISTER_USER.REQUEST, registerUser);
    yield takeEvery(FORGOT_PASSWORD.REQUEST, forgotPasswordUser);
    yield takeEvery(FORGOT_PASSWORD_OTP_VERIFY.REQUEST, VerifyOtpPasswordReset);
    yield takeEvery(CHANGE_PASSWORD.REQUEST, postNewPassword);

    yield takeEvery(VALIDATE_PHONE_AND_EMAIL.REQUEST, validatePhoneAndEmail);
    yield takeEvery(VALIDATE_REGISTRATION.REQUEST, validateRegistration);
    yield takeEvery(RESEND_VERIFICATION.REQUEST, resendVerification);
}

export default authSaga;
