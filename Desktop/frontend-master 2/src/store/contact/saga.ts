import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

//services
import contactServices from "api/services/contact";

//redux
import { LEAVE_MESSAGE, REQUEST_CALL_BACK } from "store/contact/constants";
import { ResponseGenerator } from "store/type";
import { leaveMessageSuccess, requestCallBackSuccess, requestCallBackError } from "./actions";

function* leaveMessage({ payload }: any) {
  try {
    const { data, callback } = payload;
    const response: ResponseGenerator = yield call(
      contactServices.leaveMessage,
      data
    );

    if (response.data) {
      yield put(leaveMessageSuccess(response.data));
      toast.success("Message sent successfully");
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    const message =
      error["response"]["data"]["message"] || error.message || "network error";

    toast.error(message);
  }
}

function* requestCallBack({ payload }: any) {
  try {
    const { data, callback } = payload;
    const response: ResponseGenerator = yield call(
      contactServices.requestCallBack,
      data
    );

    if (response.data) {
      yield put(requestCallBackSuccess(response.data));
      toast.success("Call back request sent successfully");
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    requestCallBackError()
    const message =
      error["response"]["data"]["message"] || error.message || "network error";

    toast.error(message);
  }
}

function* contactSaga() {
  yield takeEvery(LEAVE_MESSAGE.REQUEST, leaveMessage);
  yield takeEvery(REQUEST_CALL_BACK.REQUEST, requestCallBack);
}

export default contactSaga;
