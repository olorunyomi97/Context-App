import { callback } from "chart.js/dist/helpers/helpers.core";
import {
  API_ERROR,
  CLEAR_BOOKING_ERROR,
  CREATE_NEW_SHIPMENT,
  GET_SHIPMENT_BY_ID,
  GET_LIVE_RATE,
  GET_SPECIAL_RATE,
  SELECT_LIVE_OCEAN_RATE,
  SELECT_SPECIAL_RATE,
  RECORD_SHARED_RATE,
  UPLOAD_SHIPMENT_DOC,
  DELETE_SHIPMENT_DOC,
  CLEAR_SHIPMENT,
  CLEAR_BOOKING,
  CREATE_BOOKING,
  GET_BOOKING_DETAILS,
  CREATE_PUBLIC_BOOKING
} from "store/booking/constants";

export const createNewShipment = (
  data: any,
  callback: any,
  service?: boolean
) => {
  return {
    type: CREATE_NEW_SHIPMENT.REQUEST,
    payload: { data, callback, service },
  };
};

export const createNewShipmentSuccess = (response: any) => {
  return {
    type: CREATE_NEW_SHIPMENT.SUCCESS,
    payload: response,
  };
};

export const createBooking = (data, callback) => {
  return {
    type: CREATE_BOOKING.REQUEST,
    payload: { data, callback },
  };
};

export const createBookingSuccess = (response: any) => {
  return {
    type: CREATE_BOOKING.SUCCESS,
    payload: response,
  };
};

export const createPublicBooking = (data, callback) => {
  return {
    type: CREATE_PUBLIC_BOOKING.REQUEST,
    payload: { data, callback },
  };
};

export const createPublicBookingSuccess = (response: any) => {
  return {
    type: CREATE_PUBLIC_BOOKING.SUCCESS,
    payload: response,
  };
};

export const getBookingDetailsById = (id: string, isPublic?: boolean) => {
  return {
    type: GET_BOOKING_DETAILS.REQUEST,
    payload: { id, isPublic },
  };
};

export const getBookingDetailsByIdSuccess = (response: any) => {
  return {
    type: GET_BOOKING_DETAILS.SUCCESS,
    payload: response,
  };
};

export const uploadShipmentDoc = (data: any) => {
  return {
    type: UPLOAD_SHIPMENT_DOC.REQUEST,
    payload: { data },
  };
};

export const uploadShipmentDocSuccess = (response: any) => {
  return {
    type: UPLOAD_SHIPMENT_DOC.SUCCESS,
    payload: response,
  };
};

export const deleteShipmentDoc = (id: string, callback: any) => {
  return {
    type: DELETE_SHIPMENT_DOC.REQUEST,
    payload: { id, callback },
  };
};

export const deleteShipmentDocSuccess = (response: any) => {
  return {
    type: DELETE_SHIPMENT_DOC.SUCCESS,
    payload: response,
  };
};

export const getShipmentById = (id: string, format?: boolean) => {
  return {
    type: GET_SHIPMENT_BY_ID.REQUEST,
    payload: { id, format },
  };
};

export const getShipmentByIdSuccess = (response: any) => {
  return {
    type: GET_SHIPMENT_BY_ID.SUCCESS,
    payload: response,
  };
};

export const getLiveRate = (data: any) => {
  return {
    type: GET_LIVE_RATE.REQUEST,
    payload: { data },
  };
};

export const getLiveRateSuccess = (response: any) => {
  return {
    type: GET_LIVE_RATE.SUCCESS,
    payload: response,
  };
};

export const getSpecialRate = (data: any) => {
  return {
    type: GET_SPECIAL_RATE.REQUEST,
    payload: { data },
  };
};

export const getSpecialRateSuccess = (response: any) => {
  return {
    type: GET_SPECIAL_RATE.SUCCESS,
    payload: response,
  };
};

export const selectLiveOceanRate = (data: any, callback: any) => {
  return {
    type: SELECT_LIVE_OCEAN_RATE.REQUEST,
    payload: { data, callback },
  };
};

export const selectLiveOceanRateSuccess = (response) => {
  return {
    type: SELECT_LIVE_OCEAN_RATE.SUCCESS,
    payload: response,
  };
};

export const selectSpecialRate = (data: any, callback: any) => {
  return {
    type: SELECT_SPECIAL_RATE.REQUEST,
    payload: { data, callback },
  };
};

export const selectSpecialRateSuccess = (response) => {
  return {
    type: SELECT_SPECIAL_RATE.SUCCESS,
    payload: response,
  };
};

export const recordSharedRate = (data: any, callback: any) => {
  return {
    type: RECORD_SHARED_RATE.REQUEST,
    payload: { data, callback },
  };
};

export const recordSharedrateSuccess = (response) => {
  return {
    type: RECORD_SHARED_RATE.SUCCESS,
    payload: response,
  };
};

export const bookingApiError = (error: any) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};

export const clearBookingErrors = (error?: any) => {
  return {
    type: CLEAR_BOOKING_ERROR,
    payload: "",
  };
};

export const clearShipment = () => {
  return {
    type: CLEAR_SHIPMENT,
    payload: "",
  };
};

export const clearBooking = () => {
  return {
    type: CLEAR_BOOKING,
    payload: "",
  };
};
