import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";
import bookingsServices from "api/services/bookings";

import { GET_BOOKINGS, GET_SINGLE_BOOKING, EDIT_BOOKING_DETAILS, EDIT_BOOKING_STATUS } from "./constants";
import { ResponseGenerator } from "store/type";
import { getBookingsSuccess, getSingleBookingSuccess, editBookingDetailsSuccess, editBookingStatusSuccess, BookingssApiError } from "./actions";


function* doGetBookings({ payload }: any) {
    try {
        const { data } = payload
        const response: ResponseGenerator = yield call(bookingsServices.getBookings, data);
        console.log("Boookings in Saga", response.data.data.bookings);
        yield put(getBookingsSuccess(response.data.data));
    } catch (error) {
        yield put(BookingssApiError(error));
    }
}


function* doGetSingleBooking({ payload }: any) {
    try {
        const { id, data } = payload;
        const response: ResponseGenerator = yield call(bookingsServices.getSingleBooking, id, data);
        // console.log('booking details', response.data.data);
        yield put(getSingleBookingSuccess(response.data.data));
    } catch (error) {
        yield put(BookingssApiError(error));
    }
}

function* doConfirmBooking({ payload }: any) {
    try {
        console.log(payload);
        const { data, callback } = payload;
        // console.log(data);
        // console.log(callback);
        const edit_payload = { ...payload.data, ...payload.callback };
        console.log(edit_payload);
        const response: ResponseGenerator = yield call(
            bookingsServices.editBookingDetails,
            edit_payload
        );

        if (response.data.status === "success") {
            yield put(editBookingDetailsSuccess(response.data));
            cogoToast.success("Booking Details Successfully Confirmed");
            window.location.replace(`${window.location.origin}/bookings/booking-details/${data.id}`);
            // callback();
        }
    } catch (error) {
        const message =
            error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(BookingssApiError(error));
    }
}

function* doEditBookingStatus({ payload }: any) {
    try {
        const { data } = payload;
        console.log(data);
        const response: ResponseGenerator = yield call(bookingsServices.editBookingStatus, data);

        if (response.data.status === "success") {
            yield put(editBookingStatusSuccess(response.data.data));
            cogoToast.success("Container Status Successfully Updated");
            window.location.replace(`${window.location.origin}/bookings/booking-details/${data.id}`);
            // callback();
        }
    } catch (error) {
        const message =
            error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(BookingssApiError(error));
    }
}



function* bookingsSaga() {
    yield takeEvery(GET_BOOKINGS, doGetBookings);
    yield takeEvery(GET_SINGLE_BOOKING, doGetSingleBooking);
    yield takeEvery(EDIT_BOOKING_DETAILS, doConfirmBooking);
    yield takeEvery(EDIT_BOOKING_STATUS, doEditBookingStatus);
}

export default bookingsSaga;