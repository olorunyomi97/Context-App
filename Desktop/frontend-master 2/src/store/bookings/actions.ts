import { GET_BOOKINGS, API_ERROR } from "store/bookings/constants";

export const getBookings = (data: any) => {
  return {
    type: GET_BOOKINGS.REQUEST,
    payload: { data },
  };
};

export const getBookingsSuccess = (response: any) => {
  return {
    type: GET_BOOKINGS.SUCCESS,
    payload: response,
  };
};

export const BookingsApiError = (error: any) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
