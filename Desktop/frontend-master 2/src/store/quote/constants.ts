import { generateActions } from "helpers/generateActions";

export const GET_QUOTES = generateActions("GET_QUOTES");
export const GET_QUOTE_BY_ID = generateActions("GET_QUOTE_BY_ID");
export const ACCEPT_QUOTE = generateActions("ACCEPT_QUOTE");
export const REQUEST_FOLLOW_UP = generateActions("REQUEST_FOLLOW_UP");

export const API_ERROR = "API_ERROR";
