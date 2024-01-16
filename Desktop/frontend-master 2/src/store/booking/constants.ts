import { generateActions } from "helpers/generateActions";

export const API_ERROR = "API_ERROR";

export const CLEAR_BOOKING_ERROR = "CLEAR_BOOKING_ERROR";

export const CLEAR_SHIPMENT = "CLEAR_SHIPMENT";

export const CLEAR_BOOKING = "CLEAR_BOOKING";

export const CREATE_NEW_SHIPMENT = generateActions("CREATE_NEW_SHIPMENT");

export const GET_SHIPMENT_BY_ID = generateActions("GET_SHIPMENT_BY_ID");

export const GET_LIVE_RATE = generateActions("GET_LIVE_RATE");

export const GET_SPECIAL_RATE = generateActions("GET_SPECIAL_RATE");

export const SELECT_LIVE_OCEAN_RATE = generateActions("SELECT_LIVE_OCEAN_RATE");

export const SELECT_SPECIAL_RATE = generateActions("SELECT_SPECIAL_RATE");

export const RECORD_SHARED_RATE = generateActions("RECORD_SHARED_RATE");

export const UPLOAD_SHIPMENT_DOC = generateActions("UPLOAD_SHIPMENT_DOC");

export const DELETE_SHIPMENT_DOC = generateActions("DELETE_SHIPMENT_DOC");

export const CREATE_BOOKING = generateActions("CREATE_BOOKING");

export const CREATE_PUBLIC_BOOKING = generateActions("CREATE_PUBLIC_BOOKING");

export const GET_BOOKING_DETAILS = generateActions("GET_BOOKING_DETAILS")