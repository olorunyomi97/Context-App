import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";

import  settingsServices from "api/services/settings";

import { CHANGE_PASSWORD, EDIT_PROFILE, GET_CURRENT_EXCHANGE_RATES, UPDATE_CURRENT_EXCHANGE_RATES } from "./constants";
import { ResponseGenerator } from "store/type";
import { changePasswordSuccess, editProfileSuccess, getCurrentExchangeRatesSuccess, updateCurrentExchangeRatesSuccess ,SettingsApiError } from "./actions";


function* changePassword({ payload }: any) {
    try {
        const { data, callback } = payload;

        const response: ResponseGenerator = yield call(settingsServices.changePassword, data);

        if (response.data.status === "success") {
            console.log("here");

            yield put(changePasswordSuccess(response.data));
            cogoToast.success("Password changed successfully");
            // window.location.replace(`${window.location.origin}/signin`);
            window.localStorage.removeItem('token')
            window.location.reload()

            callback();
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(SettingsApiError(error));
    }
}

function* editProfile({ payload }:any) {
    try {
        console.log(payload)
        const edit_profile = { ...payload.data, ...payload.callback };
        console.log(editProfile)
        const response: ResponseGenerator = yield call(settingsServices.editProfile, edit_profile)

        if (response.data.status === "success") {
            yield put(editProfileSuccess(response.data));
            cogoToast.success("Profile Successfully Updated");
            // window.location.replace(`${window.location.origin}/signin`);
            window.localStorage.removeItem('token')
            window.location.reload()
        }
    }  catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(SettingsApiError(error));
    }
}

function* doGetExhangeRates() {
    try {
        const response: ResponseGenerator = yield call(settingsServices.getCurrentExchangeRates);
        console.log('Exchange Rates in Saga', response.data.data);
        yield put(getCurrentExchangeRatesSuccess(response));
    } catch (error) {
        yield put(SettingsApiError(error));
    }
}

function* doUpdateCurrentExchangeRates({ payload }:any) {
    try {
        console.log(payload)
        const update_current_exchange_rate = { ...payload.data, ...payload.callback };
        console.log(editProfile)
        const response: ResponseGenerator = yield call(settingsServices.updateCurrentExchangeRates, update_current_exchange_rate)

        if (response.data.status === "success") {
            yield put(updateCurrentExchangeRatesSuccess(response.data));
            cogoToast.success("Exchange Rate Successfully Updated");
            window.location.reload()
        }
    }  catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(SettingsApiError(error));
    }
}

function* settingsSaga() {
    yield takeEvery(CHANGE_PASSWORD, changePassword);
    yield takeEvery(EDIT_PROFILE, editProfile);
    yield takeEvery(GET_CURRENT_EXCHANGE_RATES, doGetExhangeRates);
    yield takeEvery(UPDATE_CURRENT_EXCHANGE_RATES, doUpdateCurrentExchangeRates);
}

export default settingsSaga;