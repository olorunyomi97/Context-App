import { generateActions } from "helpers/generateActions";

export const INITIATE_RATE_REQUEST = generateActions("INITIATE_RATE_REQUEST");

export const UPLOAD_RATES_DOCS = generateActions("UPLOAD_RATES_DOCS");
export const UPLOAD_CARGO_DETAILS = generateActions("UPLOAD_CARGO_DETAILS");
export const UPLOAD_ADDITIONAL_SERVICES = generateActions("UPLOAD_ADDITIONAL_SERVICES");

export const REQUEST_SHIPPING_FORM = generateActions("REQUEST_SHIPPING_FORM");

export const API_ERROR = "API_ERROR";

export const CLEAR_API_ERROR = "CLEAR_API_ERROR";
