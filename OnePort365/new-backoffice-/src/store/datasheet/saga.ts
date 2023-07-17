import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";

import datasheetServices from "api/services/datasheet";

import { GET_DATASHEET_NAV, GET_DATASHEET_SUMMARY, MODIFY_DATASHEET, MODIFY_FORM_DATASHEET } from "./constant";
import { ResponseGenerator } from "store/type";
import { getDatasheetGeneralSuccess, getDatasheetSummarySuccess, modifyDatasheetSuccess, modifyFormDatasheetSuccess, datasheetApiError } from "./actions";

function* doGetDatasheetNav({ payload }: any) {
    try {
        const { data } = payload;
        const response: ResponseGenerator = yield call(datasheetServices.getDatasheetNav, data);
        // console.log(response.data.data)
        yield put(getDatasheetGeneralSuccess(response));
    } catch (error) {
        yield put(datasheetApiError(error));
    }
}

function* doGetDatasheetSummary({ payload }: any) {
    try {
        const { data, callback } = payload;
        const response: ResponseGenerator = yield call(datasheetServices.getDatasheetSummary, data);
        console.log(response.data)
        // console.log(callback)

        if (response.data) {
            yield put(getDatasheetSummarySuccess(response));
            callback(response.data.data.datasheet_section)
        }
        // console.log(callback)
        // console.log(response)
    } catch (error) {
        // const message = error['response']['data']['message'] || error.message || "Network Error";
        yield put(datasheetApiError(error));
    }
}

function* doModifyDatasheet({ payload }: any) {
    try {
        console.log(payload)
        const modify_payload = { ...payload.data, ...payload.callback };
        console.log(modify_payload)
        const response: ResponseGenerator = yield call(datasheetServices.modifyDatasheet, modify_payload)

        if (response.data.status === "success") {
            yield put(modifyDatasheetSuccess(response.data));

            cogoToast.success("Datasheet Successfully Modified")
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(datasheetApiError(error));
    }
}

function* doModifyFormDatasheet({ payload }: any) {
    try {
        console.log(payload)
        const modify_form_payload = { ...payload.data, ...payload.callback };
        console.log(modify_form_payload)
        const response: ResponseGenerator = yield call(datasheetServices.modifyFormDatasheet, modify_form_payload)

        if (response.data.status === "success") {
            yield put(modifyFormDatasheetSuccess(response.data));

            cogoToast.success("Datasheet Successfully Modified")
            // window.location.reload();
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(datasheetApiError(error));
    }
}

function* datasheetSaga() {
    yield takeEvery(GET_DATASHEET_NAV, doGetDatasheetNav)
    yield takeEvery(GET_DATASHEET_SUMMARY, doGetDatasheetSummary)
    yield takeEvery(MODIFY_DATASHEET, doModifyDatasheet)
    yield takeEvery(MODIFY_FORM_DATASHEET, doModifyFormDatasheet)

}

export default datasheetSaga;