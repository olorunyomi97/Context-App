import { call, put, takeEvery } from "redux-saga/effects";

//services
import dataSheetServices from "api/services/shipmentDataSheet";

//helpers
import { errorHandler } from "helpers/errorHandler";

//redux
import {
  GET_DATASHEET_BY_ID,
  COMPLETE_DATASHEET,
} from "store/shipmentDataSheet/constants";
import { ResponseGenerator } from "store/type";
import {
  getDataSheetByIdSuccess,
  completeDataSheetSuccess,
  dataSheetApiError,
} from "./actions";

function* initiateDataSheetRequest({ payload }: any) {
  try {
    const { data, callback } = payload;

    const response: ResponseGenerator = yield call(
      dataSheetServices.getDataSheetById,
      data
    );

    if (response.data) {
      yield put(getDataSheetByIdSuccess(response.data));
      if (
        callback &&
        response.data &&
        response.data.data &&
        response.data.data.specific_datasheet_section
      ) {
        callback(response.data.data.specific_datasheet_section);
      }
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(dataSheetApiError(message));
  }
}

function* completeDataSheet({ payload }: any) {
  try {
    const { data, callback } = payload;
    const response: ResponseGenerator = yield call(
      dataSheetServices.completeDataSheet,
      data
    );

    if (response.data) {
      yield put(completeDataSheetSuccess(response.data));

      if (callback) {
        callback();
      }
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(dataSheetApiError(message));
  }
}

function* shipmentDataSheetSaga() {
  yield takeEvery(GET_DATASHEET_BY_ID.REQUEST, initiateDataSheetRequest);
  yield takeEvery(COMPLETE_DATASHEET.REQUEST, completeDataSheet);
}

export default shipmentDataSheetSaga;
