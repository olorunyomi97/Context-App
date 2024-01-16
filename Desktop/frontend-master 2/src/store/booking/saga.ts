import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

//services
import bookingServices from "api/services/booking";

//redux
import {
  CREATE_NEW_SHIPMENT,
  GET_SHIPMENT_BY_ID,
  GET_LIVE_RATE,
  GET_SPECIAL_RATE,
  SELECT_LIVE_OCEAN_RATE,
  RECORD_SHARED_RATE,
  UPLOAD_SHIPMENT_DOC,
  DELETE_SHIPMENT_DOC,
  CREATE_BOOKING,
  GET_BOOKING_DETAILS,
  CREATE_PUBLIC_BOOKING,
  SELECT_SPECIAL_RATE
} from "store/booking/constants";

import { ResponseGenerator } from "store/type";

import {
  bookingApiError,
  createNewShipmentSuccess,
  getShipmentByIdSuccess,
  getLiveRateSuccess,
  selectLiveOceanRateSuccess,
  uploadShipmentDocSuccess,
  deleteShipmentDocSuccess,
  createBookingSuccess,
  getBookingDetailsByIdSuccess,
  createPublicBookingSuccess,
  getSpecialRateSuccess,
  selectSpecialRateSuccess,
  recordSharedrateSuccess
} from "store/booking/actions";

//helpers
import mixpanel from "helpers/mixpanel";
import { errorHandler } from "helpers/errorHandler";

// @ts-ignore
let user_data = localStorage.getItem("user_data");
const user = user_data ? JSON.parse(user_data) : null;

function* getShipmentById({ payload }: any) {
  try {
    const { id, format } = payload;

    const response: ResponseGenerator = yield call(
      bookingServices.getShipmentById,
      id,
      format
    );

    if (response.data) {
      yield put(getShipmentByIdSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error, false);
    yield put(bookingApiError(message));
  }
}

function* sendUploadShipmentDoc({ payload }: any) {
  const { data } = payload;
  try {
    const response: ResponseGenerator = yield call(
      bookingServices.uploadShipmentDoc,
      data
    );

    if (response.data) {
      yield put(uploadShipmentDocSuccess(response.data));
      toast.success("Document uploaded successfully", {
        autoClose: 3000,
      });
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(bookingApiError(message));
  }
}

function* deleteShipmentDoc({ payload }: any) {
  try {
    const { id, callback } = payload;

    const response: ResponseGenerator = yield call(
      bookingServices.deleteShipDoc,
      id
    );

    if (response.data) {
      yield put(
        deleteShipmentDocSuccess({
          id: id,
          data: response.data,
        })
      );
      if (callback === undefined) {
      } else {
        callback();
      }
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(bookingApiError(message));
  }
}

function* createNewShipment({ payload }: any) {
  try {
    const { data, callback, service } = payload;

    const response: ResponseGenerator = yield call(
      bookingServices.createNewShipment,
      data,
      service
    );

    if (response.data.status === "success") {
      mixpanel.track("Create Shipment", {
        email: user.email,
      });
      // console.log("responsedata>>>", response.data.data);
      yield put(createNewShipmentSuccess(response.data));
      // toast.success("Booking successfully created", {
      //   autoClose: 3000,
      // });

      if (callback === "home") {
        window.location.replace(
          `${window.location.origin}/get-rate?shipment-type=${data.shipment_type}&id=${response.data.data._id}`
        );
      } else if (callback === undefined) {
      } else {
        callback(response.data.data._id);
      }
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(bookingApiError(message));
  }
}
function* createBooking({ payload }: any) {
  try {
    const { data, callback } = payload;

    const response: ResponseGenerator = yield call(
      bookingServices.createBooking,
      data
    );

    if (response.data.status === "success") {
      mixpanel.track("Create Shipment", {
        email: user.email,
      });
      // console.log("responsedata>>>", response.data.data);
      yield put(createBookingSuccess(response.data));
      // toast.success("Booking successfully created", {
      //   autoClose: 3000,
      // });

      if (callback === "home") {
        window.location.replace(
          `${window.location.origin}/get-rate?shipment-type=${data.shipment_type}&id=${response.data.data._id}`
        );
      } else if (callback === undefined) {
      } else {
        callback(response.data.data._id);
      }
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(bookingApiError(message));
  }
}

function* createPublicBooking({ payload }: any) {
  try {
    const { data, callback } = payload;

    const response: ResponseGenerator = yield call(
      bookingServices.createPublicBooking,
      data
    );

    if (response.data.status === "success") {
      // mixpanel.track("Create Shipment", {
      //   email: user.email,
      // });
      // console.log("responsedata>>>", response.data.data);
      yield put(createPublicBookingSuccess(response.data));
      // toast.success("Booking successfully created", {
      //   autoClose: 3000,
      // });

      if (callback === "home") {
        window.location.replace(
          `${window.location.origin}/get-rate?shipment-type=${data.shipment_type}&id=${response.data.data._id}`
        );
      } else if (callback === undefined) {
      } else {
        callback(response.data.data._id);
      }
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(bookingApiError(message));
  }
}

function* getLiveRate({ payload }: any) {
  try {
    const { data } = payload;
    const response: ResponseGenerator = yield call(
      bookingServices.getLiveRate,
      data
    );
    if (response.data.status === "success") {
      yield put(getLiveRateSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(bookingApiError(message));
  }
}
function* getSpecialRate({ payload }: any) {
  try {
    const { data } = payload;
    const response: ResponseGenerator = yield call(
      bookingServices.getSpecialRate,
      data
    );
    if (response.data.status === "success") {
      yield put(getSpecialRateSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(bookingApiError(message));
  }
}

function* selectLiveOceanRate({ payload }: any) {
  try {
    const { data, callback } = payload;
    const response: ResponseGenerator = yield call(
      bookingServices.selectLiveOceanRate,
      data
    );
    if (response.data.status === "success") {
      yield put(selectLiveOceanRateSuccess(response.data));
      if (callback === undefined) {
      } else {
        callback();
      }
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(bookingApiError(message));
  }
}

function* recordSharedRate({ payload }: any) {
  try {
    const { data, callback } = payload;
    const response: ResponseGenerator = yield call(
      bookingServices.recordSharedRate,
      data
    );
    if (response.data.status === "success") {
      yield put(recordSharedrateSuccess(response.data));
      if (callback === undefined) {
      } else {
        callback();
      }
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(bookingApiError(message));
  }
}

function* selectSpecialRate({ payload }: any) {
  try {
    const { data, callback } = payload;
    const response: ResponseGenerator = yield call(
      bookingServices.selectSpecialRate,
      data
    );
    console.log("response>>>", response.data)
    if (response.data.status === "success") {
      yield put(selectSpecialRateSuccess(response.data));
      if (callback === undefined) {
      } else {
        callback(response.data.data.shipment_id);
      }
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(bookingApiError(message));
  }
}

function* getBookingDetailsById({ payload }: any) {
  try {
    const { id, isPublic } = payload;

    const response: ResponseGenerator = yield call(
      bookingServices.getBookingById,
      id,
      isPublic
    );

    if (response.data) {
      yield put(getBookingDetailsByIdSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(bookingApiError(message));
  }
}

function* bookingSaga() {
  yield takeEvery(CREATE_NEW_SHIPMENT.REQUEST, createNewShipment);
  yield takeEvery(GET_SHIPMENT_BY_ID.REQUEST, getShipmentById);
  yield takeEvery(GET_LIVE_RATE.REQUEST, getLiveRate);
  yield takeEvery(GET_SPECIAL_RATE.REQUEST, getSpecialRate);
  yield takeEvery(SELECT_LIVE_OCEAN_RATE.REQUEST, selectLiveOceanRate);
  yield takeEvery(SELECT_SPECIAL_RATE.REQUEST, selectSpecialRate);
  yield takeEvery(RECORD_SHARED_RATE.REQUEST, recordSharedRate);
  yield takeEvery(UPLOAD_SHIPMENT_DOC.REQUEST, sendUploadShipmentDoc);
  yield takeEvery(DELETE_SHIPMENT_DOC.REQUEST, deleteShipmentDoc);
  yield takeEvery(CREATE_BOOKING.REQUEST, createBooking);
  yield takeEvery(GET_BOOKING_DETAILS.REQUEST, getBookingDetailsById);
  yield takeEvery(CREATE_PUBLIC_BOOKING.REQUEST, createPublicBooking);
}

export default bookingSaga;
