import { call, put, takeEvery } from "redux-saga/effects";
// import cogoToast from "cogo-toast";
import bookingsServices from "api/services/booking";

import { GET_BOOKINGS } from "store/bookings/constants";
import { ResponseGenerator } from "store/type";
import { getBookingsSuccess, BookingsApiError } from "./actions";

function* doGetBookings({ payload }: any) {
  try {
    const { data } = payload;
    const response: ResponseGenerator = yield call(
      bookingsServices.getBookings,
      data
    );
    yield put(getBookingsSuccess(response.data.data));
  } catch (error) {
    yield put(BookingsApiError(error));
  }
}

function* bookingsSaga() {
  yield takeEvery(GET_BOOKINGS.REQUEST, doGetBookings);
  // yield takeEvery(GET_SINGLE_BOOKING, doGetSingleBooking);
}

export default bookingsSaga;
