import { call, put, takeEvery } from "redux-saga/effects";

//services
import additionalDetailsServices from "api/services/additionalDetails";

//redux
import {
  GET_INSURANCE,
  SELECT_ADDITIONAL_SERVICES,
  GET_BOOKING_SUMMARY,
  CONFIRM_BOOKING,
} from "./constants";

import {
  getInsuranceSuccess,
  selectAdditionalServicesSuccess,
  getBookingSummarySuccess,
  confirmBookingSuccess,
  confirmBookingApiError,
  confirmBookingError
} from "./actions";

//helpers
import { errorHandler } from "helpers/errorHandler";

function* getInsuranceSaga({ payload }: any) {
  try {
    const { data } = payload;
    const response = yield call(additionalDetailsServices.getInsurance, data);
    if (response.data.status === "success") {
      yield put(getInsuranceSuccess(response.data.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(confirmBookingApiError(message));
  }
}

function* selectAdditionalServicesSaga({ payload }: any) {
  try {
    const { data, callback } = payload;

    const response = yield call(
      additionalDetailsServices.selectAdditionalServices,
      data
    );
    if (response.data.status === "success") {
      yield put(selectAdditionalServicesSuccess(response.data.data));
      callback();
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(confirmBookingApiError(message));
  }
}

function* getBookingSummarySaga({ payload }: any) {
  try {
    const { id } = payload;
    const response = yield call(
      additionalDetailsServices.getBookingSummary,
      id
    );
    if (response.data.status === "success") {
      yield put(getBookingSummarySuccess(response.data.data));
    }
  } catch (error) {
    errorHandler(error, false);
  }
}

function* confirmBookingSaga({ payload }: any) {
  try {
    const { data, callback } = payload;
    const response = yield call(additionalDetailsServices.confirmBooking, data);
    if (response.data.status === "success") {
      yield put(confirmBookingSuccess(response.data.data));
      if(callback === undefined){
      }else{
        callback()
      }
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(confirmBookingApiError(message));
  }
}

function* additionalDetailsSaga() {
  yield takeEvery(GET_INSURANCE.REQUEST, getInsuranceSaga);
  yield takeEvery(
    SELECT_ADDITIONAL_SERVICES.REQUEST,
    selectAdditionalServicesSaga
  );
  yield takeEvery(GET_BOOKING_SUMMARY.REQUEST, getBookingSummarySaga);
  yield takeEvery(CONFIRM_BOOKING.REQUEST, confirmBookingSaga);
}

export default additionalDetailsSaga;
