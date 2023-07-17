import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";

import AdminRateServices from "api/services/adminRate";

import { 
    GET_RATE_BY_ID, 
    INITIATE_ADMIN_RATE_REQUEST, 
    UPLOAD_ADMIN_RATES_DOCS, 
    UPLOAD_ADMIN_CARGO_DETAILS, 
    UPLOAD_ADMIN_ADDITIONAL_SERVICES , 
    LIVE_RATE_REQUEST,
    SAVE_LIVE_RATES_SELECTION,
    GET_SELECTED_LIVE_RATES,
    CONFIRM_LIVE_RATES,
} from "store/adminRate/constants";
import { ResponseGenerator } from "store/type";
import { 
    AdminRateApiError, 
    getRateByIdSuccess,
    initiateAdminRateRequestSuccess,
    uploadAdminRatesDocsSuccess, 
    updateAdminAdditionalServicesSuccess, 
    updateAdminCargoDetailsSuccess, 
    liveRateRequestSuccess,
    saveLiveRatesSelectionSuccess,
    getSelectedLiveRatesSuccess,
    confirmLiveRatesSuccess,
} from "store/actions";

function* getRateById({ payload }: any) {
    try {
        const { id } = payload;

        const response: ResponseGenerator = yield call(AdminRateServices.getRateById, id);

        if (response.data) {
            yield put(getRateByIdSuccess(response.data));
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        cogoToast.error(message);

        yield put(AdminRateApiError(message));
    }
}


function* initiateAdminRateRequest({ payload }: any) {
    try {
        const { data, callback } = payload;

        const response: ResponseGenerator = yield call(AdminRateServices.initiateAdminRateRequest, data);

        if (response.data) {
            console.log(response.data);
            yield put(initiateAdminRateRequestSuccess(response.data));
            // cogoToast.success("Admin Rate Initiated  Successfully")

            if (callback === "home") {
                window.location.replace(`${window.location.origin}/get-rate?shipment-type=${data.shipment_type}&id=${response.data.data._id}`);
                
            } else {
                callback();
            }
        }
    } catch (error) {
        console.log(error, "error here");
        const message = error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(AdminRateApiError(message));
    }
}


function* uploadAdminRatesDocs({ payload }: any) {
    try {
        const { data, callback, type } = payload;

        const response: ResponseGenerator = yield call(type === "export" ? AdminRateServices.uploadAdminExportRatesDocs : AdminRateServices.uploadAdminImportRatesDocs, data);

        if (response.data) {
            yield put(uploadAdminRatesDocsSuccess(response.data, type));
            // cogoToast.success("Admin uploaded Rate Documents Successfully")
            callback();
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        cogoToast.error(message);

        yield put(AdminRateApiError(message));
    }
}

function* updateAdminCargoDetails({ payload }: any) {
    try {
        const { data, callback, type } = payload;

        const response: ResponseGenerator = yield call(type === "export" ? AdminRateServices.updateAdminExportCargoDetails : AdminRateServices.updateAdminImportCargoDetails, data);

        if (response.data) {
            yield put(updateAdminCargoDetailsSuccess(response.data, type));
            // cogoToast.success("Admin updated Cargo Details Successfully")
            callback();
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        cogoToast.error(message);

        yield put(AdminRateApiError(message));
    }
}

function* updateAdminAdditionalServices({ payload }: any) {
    try {
        const { data, type } = payload;

        const response: ResponseGenerator = yield call(type === "export" ? AdminRateServices.updateAdminExportAdditionalServices : AdminRateServices.updateAdminImportAdditionalServices, data);

        if (response.data) {
            yield put(updateAdminAdditionalServicesSuccess(response.data, type));
            // cogoToast.success("Admin updated Additional Services Successfully")

            console.log(response.data.data)
            // window.location.replace(
            //     `${window.location.origin}/quotes`
            //     // `${window.location.origin}/rates?${response.data.data._id}`
            // );
            window.location.replace(
                `${window.location.origin}/quotes`
                // `${window.location.origin}/rates/${response.data.data._id}`
            );
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        cogoToast.error(message);
        yield put(AdminRateApiError(message));
    }
}

function* initiateLiveRatesRequest({ payload }: any) {
    try {
      const { id } = payload;
      const response: ResponseGenerator = yield call(AdminRateServices.initiateLiveRatesRequest, id);
      if (response.data) {
        yield put(liveRateRequestSuccess(response.data));
      }
    } catch (error) {
      const message =
        error["response"]["data"]["message"] || error.message || "network error";
      cogoToast.error(message);
      yield put(AdminRateApiError(message));
    }
}

function* saveLiveRatesSelection({ payload }: any) {
    try {
        const { data } = payload;

        const response: ResponseGenerator = yield call(AdminRateServices.saveLiveRatesSelection, data);

        if (response.data) {
            yield put(saveLiveRatesSelectionSuccess(response.data));

            // window.location.replace(`${window.location.origin}/rates-confirmation/${data.id}`);
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        cogoToast.error(message);

        yield put(AdminRateApiError(message));
    }
}

function* getSelectedLiveRates({ payload }: any) {
    try {
        const { id } = payload;

        const response: ResponseGenerator = yield call(AdminRateServices.getSelectedLiveRates, id);

        if (response.data) {
            yield put(getSelectedLiveRatesSuccess(response.data));
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        cogoToast.error(message);

        yield put(AdminRateApiError(message));
    }
}

function* confirmLiveRates({ payload }: any) {
    try {
        const { id, callback } = payload;

        const response: ResponseGenerator = yield call(AdminRateServices.confirmLiveRates, id);

        if (response.data) {
            yield put(confirmLiveRatesSuccess(response.data));

            callback();
            // window.location.replace(`${window.location.origin}/quotes`);
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        cogoToast.error(message);

        yield put(AdminRateApiError(message));
    }
}


function* adminrateSaga() {
    yield takeEvery(GET_RATE_BY_ID.REQUEST, getRateById);
    yield takeEvery(INITIATE_ADMIN_RATE_REQUEST.REQUEST, initiateAdminRateRequest);
    yield takeEvery(UPLOAD_ADMIN_RATES_DOCS.REQUEST, uploadAdminRatesDocs);
    yield takeEvery(UPLOAD_ADMIN_CARGO_DETAILS.REQUEST, updateAdminCargoDetails);
    yield takeEvery(UPLOAD_ADMIN_ADDITIONAL_SERVICES.REQUEST, updateAdminAdditionalServices);
    yield takeEvery(LIVE_RATE_REQUEST.REQUEST, initiateLiveRatesRequest);
    yield takeEvery(SAVE_LIVE_RATES_SELECTION.REQUEST, saveLiveRatesSelection);
    yield takeEvery(GET_SELECTED_LIVE_RATES.REQUEST, getSelectedLiveRates);
    yield takeEvery(CONFIRM_LIVE_RATES.REQUEST, confirmLiveRates);
    // yield takeEvery(REQUEST_SHIPPING_FORM.REQUEST, requestShippingForm);
}

export default adminrateSaga;