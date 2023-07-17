import {
    GET_BOOKINGS_SUCCESS,
    GET_SINGLE_BOOKING_SUCCESS,
    EDIT_BOOKING_DETAILS,
    EDIT_BOOKING_DETAILS_SUCCESS,
    EDIT_BOOKING_STATUS,
    EDIT_BOOKING_STATUS_SUCCESS,
    API_ERROR
} from "./constants";

const initialState = {
    error: null,
    loading: true,
    bookings: [],
    total_bookings: 0,
    single_booking: {},
}

const bookings = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                bookings: action.payload.bookings,
                total_bookings: action.payload.total_bookings
            }
        case GET_SINGLE_BOOKING_SUCCESS:
            return {
                ...state,
                loading: false,
                single_booking: action.payload,
            }
        case EDIT_BOOKING_DETAILS:
            return {
                ...state,
                loading: true,
            };
        case EDIT_BOOKING_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case EDIT_BOOKING_STATUS:
            return {
                ...state,
                loading: true,
            };
        case EDIT_BOOKING_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                single_booking: action.payload
            };
        case API_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        default:
            return state;
    }
}

export default bookings;