import { generateActions } from "helpers/generateActions";

export const GET_DASHBOARD_PARAMS = generateActions("GET_DASHBOARD_PARAMS");
export const GET_PENDING_DASHBOARD_QUOTES = generateActions("GET_PENDING_DASHBOARD_QUOTES");

// export const API_ERROR = generateActions("API_ERROR");
export const API_ERROR = "API_ERROR";
