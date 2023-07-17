import {
    GET_BOOKINGS,
    GET_BOOKINGS_SUCCESS,
    GET_SINGLE_BOOKING,
    GET_SINGLE_BOOKING_SUCCESS,
    EDIT_BOOKING_DETAILS,
    EDIT_BOOKING_DETAILS_SUCCESS,
    EDIT_BOOKING_STATUS,
    EDIT_BOOKING_STATUS_SUCCESS,
    API_ERROR
} from "./constants";

export const getBookings = (data: any) => {
    return {
        type: GET_BOOKINGS,
        payload: { data }
    }
}

export const getBookingsSuccess = (response: any) => {
    return {
        type: GET_BOOKINGS_SUCCESS,
        payload: response,
    }
}

export const getSingleBooking = (id: any, data: any) => {
    return {
        type: GET_SINGLE_BOOKING,
        payload: { id, data },
    };
};

export const getSingleBookingSuccess = (response: any) => {
    return {
        type: GET_SINGLE_BOOKING_SUCCESS,
        payload: response,
    };
};

export const editBookingDetails = (data: any, callback: any) => {
    console.log(data);
    console.log(callback);
    return {
        type: EDIT_BOOKING_DETAILS,
        payload: { data, callback },

    };
};
export const editBookingDetailsSuccess = (response: any) => {
    return {
        type: EDIT_BOOKING_DETAILS_SUCCESS,
        payload: response,
    };
};


export const editBookingStatus = (data: any) => {
    console.log(data);
    return {
        type: EDIT_BOOKING_STATUS,
        payload: { data },

    };
};
export const editBookingStatusSuccess = (response: any) => {
    return {
        type: EDIT_BOOKING_STATUS_SUCCESS,
        payload: response,
    };
};


export const BookingssApiError = (error: any) => {
    return {
        type: API_ERROR,
        payload: error,
    };
}