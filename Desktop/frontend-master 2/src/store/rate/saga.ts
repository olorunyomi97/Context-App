import { call, put, takeEvery } from "redux-saga/effects";

//services
import rateServices from "api/services/rate";

//redux
import {
  INITIATE_RATE_REQUEST,
  GET_INSURANCE_PROVIDERS,
  FINALIZE_RATE_REQUEST,
  UPLOAD_RATES_DOCS,
  UPLOAD_CARGO_DETAILS,
  UPLOAD_ADDITIONAL_SERVICES,
  LIVE_RATE_REQUEST,
  REQUEST_SHIPPING_FORM,
  GET_RATE_BY_ID,
  SAVE_LIVE_RATES_SELECTION,
  GET_SELECTED_LIVE_RATES,
  CONFIRM_LIVE_RATES,
} from "store/rate/constants";
import { ResponseGenerator } from "store/type";
import {
  rateApiError,
  initiateRateRequestSuccess,
  getInsuranceProvidersSuccess,
  finalizeRateRequestSuccess,
  uploadRatesDocsSuccess,
  updateAdditionalServicesSuccess,
  updateCargoDetailsSuccess,
  liveRateRequestSuccess,
  saveLiveRatesSelectionSuccess,
  getSelectedLiveRatesSuccess,
  confirmLiveRatesSuccess,
  requestShippingFormSuccess,
  getRateByIdSuccess,
} from "store/actions";

//helpers
import mixpanel from "helpers/mixpanel";
import { errorHandler } from "helpers/errorHandler";

// @ts-ignore
let user_data = localStorage.getItem("user_data");
const user = user_data ? JSON.parse(user_data) : null;

function* getRateById({ payload }: any) {
  try {
    const { id } = payload;

    const response: ResponseGenerator = yield call(
      rateServices.getRateById,
      id
    );

    if (response.data) {
      yield put(getRateByIdSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(rateApiError(message));
  }
}

function* initiateRateRequest({ payload }: any) {
  try {
    const { data, callback } = payload;

    const response: ResponseGenerator = yield call(
      rateServices.initiateRateRequest,
      data
    );

    if (response.data) {
      mixpanel.track("Get Rate", {
        email: user.email,
      });

      yield put(initiateRateRequestSuccess(response.data));

      if (callback === "home") {
        window.location.replace(
          `${window.location.origin}/get-rate?shipment-type=${data.shipment_type}&id=${response.data.data._id}`
        );
      } else {
        callback();
      }
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(rateApiError(message));
  }
}

function* getInsuranceProviders({ payload }: any) {
  try {
    const { query } = payload;

    const response: ResponseGenerator = yield call(
      rateServices.getInsuranceProviders,
      query
    );

    if (response.data) {
      yield put(getInsuranceProvidersSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(rateApiError(message));
  }
}

function* finalizeRateRequest({ payload }: any) {
  try {
    const { data, callback } = payload;

    const response: ResponseGenerator = yield call(
      rateServices.finalizeRateRequest,
      data
    );

    if (response.data) {
      yield put(finalizeRateRequestSuccess(response.data));

      window.location.replace(`${window.location.origin}/rates/${data.id}`);
      callback();
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(rateApiError(message));
  }
}

function* uploadRatesDocs({ payload }: any) {
  try {
    const { data, callback, type } = payload;

    const response: ResponseGenerator = yield call(
      rateServices.uploadRatesDocs,

      data
    );

    if (response.data) {
      yield put(uploadRatesDocsSuccess(response.data, type));
      callback();
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(rateApiError(message));
  }
}

function* updateCargoDetails({ payload }: any) {
  try {
    const { data, callback, type } = payload;

    const response: ResponseGenerator = yield call(
      rateServices.updateCargoDetails,
      data
    );

    if (response.data) {
      yield put(updateCargoDetailsSuccess(response.data, type));
      callback();
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(rateApiError(message));
  }
}

function* updateAdditionalServices({ payload }: any) {
  try {
    const { data, type } = payload;

    const response: ResponseGenerator = yield call(
      rateServices.updateAdditionalServices,
      data
    );

    if (response.data) {
      yield put(updateAdditionalServicesSuccess(response.data, type));

      window.location.replace(
        // `${window.location.origin}/dashboard?quote=${response.data.data._id}`
        // `${window.location.origin}/quotes?quote=${response.data.data._id}`
        `${window.location.origin}/rates/${response.data.data._id}`
      );
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(rateApiError(message));
  }
}

function* initiateLiveRatesRequest({ payload }: any) {
  try {
    const { id } = payload;
    const response: ResponseGenerator = yield call(
      rateServices.initiateLiveRatesRequest,
      id
    );
    if (response.data) {
      yield put(liveRateRequestSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(rateApiError(message));
  }
}

function* saveLiveRatesSelection({ payload }: any) {
  try {
    const { data } = payload;

    const response: ResponseGenerator = yield call(
      rateServices.saveLiveRatesSelection,
      data
    );

    if (response.data) {
      yield put(saveLiveRatesSelectionSuccess(response.data));

      window.location.replace(
        `${window.location.origin}/booking-confirmation/${data.id}`
      );
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(rateApiError(message));
  }
}

function* getSelectedLiveRates({ payload }: any) {
  try {
    const { id } = payload;

    const response: ResponseGenerator = yield call(
      rateServices.getSelectedLiveRates,
      id
    );

    if (response.data) {
      mixpanel.track("Add insurance", {
        email: user.email,
      });

      yield put(getSelectedLiveRatesSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(rateApiError(message));
  }
}

function* confirmLiveRates({ payload }: any) {
  try {
    const { data } = payload;

    const response: ResponseGenerator = yield call(
      rateServices.confirmLiveRates,
      data
    );

    if (response.data) {
      yield put(confirmLiveRatesSuccess(response.data));

      window.location.replace(
        `${window.location.origin}/booking-summary/${data.id}`
      );
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(rateApiError(message));
  }
}

function* requestShippingForm({ payload }: any) {
  try {
    const { data, callback, type } = payload;

    const response: ResponseGenerator = yield call(
      rateServices.documentRequest,
      data
    );

    if (response.data) {
      yield put(requestShippingFormSuccess(response.data, type));
      callback();
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(rateApiError(message));
  }
}

function* rateSaga() {
  yield takeEvery(GET_RATE_BY_ID.REQUEST, getRateById);
  yield takeEvery(INITIATE_RATE_REQUEST.REQUEST, initiateRateRequest);
  yield takeEvery(GET_INSURANCE_PROVIDERS.REQUEST, getInsuranceProviders);
  yield takeEvery(FINALIZE_RATE_REQUEST.REQUEST, finalizeRateRequest);
  yield takeEvery(UPLOAD_RATES_DOCS.REQUEST, uploadRatesDocs);
  yield takeEvery(UPLOAD_CARGO_DETAILS.REQUEST, updateCargoDetails);
  yield takeEvery(UPLOAD_ADDITIONAL_SERVICES.REQUEST, updateAdditionalServices);
  yield takeEvery(LIVE_RATE_REQUEST.REQUEST, initiateLiveRatesRequest);
  yield takeEvery(SAVE_LIVE_RATES_SELECTION.REQUEST, saveLiveRatesSelection);
  yield takeEvery(GET_SELECTED_LIVE_RATES.REQUEST, getSelectedLiveRates);
  yield takeEvery(CONFIRM_LIVE_RATES.REQUEST, confirmLiveRates);
  yield takeEvery(REQUEST_SHIPPING_FORM.REQUEST, requestShippingForm);
}

export default rateSaga;
