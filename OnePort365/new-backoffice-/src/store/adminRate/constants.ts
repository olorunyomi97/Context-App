import { generateActions } from "helpers/generateActions";

export const GET_RATE_BY_ID = generateActions("GET_RATE_BY_ID");

export const INITIATE_ADMIN_RATE_REQUEST = generateActions("INITIATE_ADMIN_RATE_REQUEST");

export const UPLOAD_ADMIN_RATES_DOCS = generateActions("UPLOAD_ADMIN_RATES_DOCS");
export const UPLOAD_ADMIN_CARGO_DETAILS = generateActions("UPLOAD_ADMIN_CARGO_DETAILS");
export const UPLOAD_ADMIN_ADDITIONAL_SERVICES = generateActions("UPLOAD_ADMIN_ADDITIONAL_SERVICES");

export const REQUEST_ADMIN_SHIPPING_FORM = generateActions("REQUEST_ADMIN_SHIPPING_FORM");

export const LIVE_RATE_REQUEST = generateActions("LIVE_RATE_REQUEST");
export const SAVE_LIVE_RATES_SELECTION = generateActions("SAVE_LIVE_RATES_SELECTION");
export const GET_SELECTED_LIVE_RATES = generateActions("GET_SELECTED_LIVE_RATES");
export const CONFIRM_LIVE_RATES = generateActions("CONFIRM_LIVE_RATES");

export const API_ERROR = "API_ERROR";

export const CLEAR_API_ERROR = "CLEAR_API_ERROR";
