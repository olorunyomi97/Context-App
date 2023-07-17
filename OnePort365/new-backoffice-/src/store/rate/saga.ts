import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";

//services
import rateServices from "api/services/rate";

//redux
import { INITIATE_RATE_REQUEST, UPLOAD_RATES_DOCS, UPLOAD_CARGO_DETAILS, UPLOAD_ADDITIONAL_SERVICES, REQUEST_SHIPPING_FORM } from "store/rate/constants";
import { ResponseGenerator } from "store/type";
import { rateApiError, initiateRateRequestSuccess, uploadRatesDocsSuccess, updateAdditionalServicesSuccess, updateCargoDetailsSuccess, requestShippingFormSuccess } from "store/actions";

function* initiateRateRequest({ payload }: any) {
    try {
        const { data, callback } = payload;

        const response: ResponseGenerator = yield call(rateServices.initiateRateRequest, data);

        if (response.data) {
            yield put(initiateRateRequestSuccess(response.data));
            console.log(response.data);

            if (callback === "home") {
                window.location.replace(`${window.location.origin}/get-rate?shipment-type=${data.shipment_type}&id=${response.data.data._id}`);
            } else {
                callback();
            }
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        cogoToast.error(message);

        yield put(rateApiError(message));
    }
}

function* uploadRatesDocs({ payload }: any) {
    try {
        const { data, callback, type } = payload;

        const response: ResponseGenerator = yield call(type === "export" ? rateServices.uploadExportRatesDocs : rateServices.uploadImportRatesDocs, data);

        if (response.data) {
            yield put(uploadRatesDocsSuccess(response.data, type));
            callback();
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        cogoToast.error(message);

        yield put(rateApiError(message));
    }
}

function* updateCargoDetails({ payload }: any) {
    try {
        const { data, callback, type } = payload;

        const response: ResponseGenerator = yield call(type === "export" ? rateServices.updateExportCargoDetails : rateServices.updateImportCargoDetails, data);

        if (response.data) {
            yield put(updateCargoDetailsSuccess(response.data, type));
            callback();
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        cogoToast.error(message);

        yield put(rateApiError(message));
    }
}

function* updateAdditionalServices({ payload }: any) {
    try {
        const { data, type } = payload;

        const response: ResponseGenerator = yield call(type === "export" ? rateServices.updateExportAdditionalServices : rateServices.updateImportAdditionalServices, data);

        if (response.data) {
            yield put(updateAdditionalServicesSuccess(response.data, type));

            window.location.replace(`${window.location.origin}/dashboard`);
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        cogoToast.error(message);
        yield put(rateApiError(message));
    }
}

function* requestShippingForm({ payload }: any) {
    try {
        const { data, callback, type } = payload;

        const response: ResponseGenerator = yield call(type === "export" ? rateServices.requestNXPForm : rateServices.requestPARForm, data);

        if (response.data) {
            yield put(requestShippingFormSuccess(response.data, type));
            callback();
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        cogoToast.error(message);

        yield put(rateApiError(message));
    }
}

function* rateSaga() {
    yield takeEvery(INITIATE_RATE_REQUEST.REQUEST, initiateRateRequest);
    yield takeEvery(UPLOAD_RATES_DOCS.REQUEST, uploadRatesDocs);
    yield takeEvery(UPLOAD_CARGO_DETAILS.REQUEST, updateCargoDetails);
    yield takeEvery(UPLOAD_ADDITIONAL_SERVICES.REQUEST, updateAdditionalServices);
    yield takeEvery(REQUEST_SHIPPING_FORM.REQUEST, requestShippingForm);
}

export default rateSaga;
