import { generateActions } from "helpers/generateActions";

export const GET_RATE_BY_ID = generateActions("GET_RATE_BY_ID");

export const INITIATE_RATE_REQUEST = generateActions("INITIATE_RATE_REQUEST");

export const GET_INSURANCE_PROVIDERS = generateActions(
  "GET_INSURANCE_PROVIDERS"
);

export const CLEAR_INSURANCE_PROVIDERS = "CLEAR_INSURANCE_PROVIDERS";

export const FINALIZE_RATE_REQUEST = generateActions("FINALIZE_RATE_REQUEST");

export const UPLOAD_RATES_DOCS = generateActions("UPLOAD_RATES_DOCS");
export const UPLOAD_CARGO_DETAILS = generateActions("UPLOAD_CARGO_DETAILS");
export const UPLOAD_ADDITIONAL_SERVICES = generateActions(
  "UPLOAD_ADDITIONAL_SERVICES"
);

export const LIVE_RATE_REQUEST = generateActions("LIVE_RATE_REQUEST");

export const SAVE_LIVE_RATES_SELECTION = generateActions(
  "SAVE_LIVE_RATES_SELECTION"
);

export const GET_SELECTED_LIVE_RATES = generateActions(
  "GET_SELECTED_LIVE_RATES"
);

export const CONFIRM_LIVE_RATES = generateActions("CONFIRM_LIVE_RATES");

export const REQUEST_SHIPPING_FORM = generateActions("REQUEST_SHIPPING_FORM");

export const API_ERROR = "API_ERROR";

export const CLEAR_API_ERROR = "CLEAR_API_ERROR";
