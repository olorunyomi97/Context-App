import {
  GET_INSURANCE,
  SELECT_ADDITIONAL_SERVICES,
  GET_BOOKING_SUMMARY,
  CONFIRM_BOOKING,
  API_ERROR
} from "store/additionalDetails/constants";

export const getInsurance = (data: any) => {
  return {
    type: GET_INSURANCE.REQUEST,
    payload: { data },
  };
};

export const getInsuranceSuccess = (response: any) => {
  return {
    type: GET_INSURANCE.SUCCESS,
    payload: response,
  };
};

export const selectAdditionalServices = (data: any, callback: any) => {
  return {
    type: SELECT_ADDITIONAL_SERVICES.REQUEST,
    payload: { data, callback },
  };
};

export const selectAdditionalServicesSuccess = (response: any) => {
  return {
    type: SELECT_ADDITIONAL_SERVICES.SUCCESS,
    payload: response,
  };
};

export const getBookingSummary = (id: any) => {
  return {
    type: GET_BOOKING_SUMMARY.REQUEST,
    payload: { id },
  };
};

export const getBookingSummarySuccess = (response: any) => {
  return {
    type: GET_BOOKING_SUMMARY.SUCCESS,
    payload: response,
  };
};

export const confirmBooking = (data: any, callback?: any) => {
  return {
    type: CONFIRM_BOOKING.REQUEST,
    payload: { data, callback },
  };
};

export const confirmBookingSuccess = (response: any) => {
  return {
    type: CONFIRM_BOOKING.SUCCESS,
    payload: response,
  };
};

export const confirmBookingApiError = (error: any) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};

export const confirmBookingError = () => {
  return {
    type: CONFIRM_BOOKING.FAILURE,
  };
};
