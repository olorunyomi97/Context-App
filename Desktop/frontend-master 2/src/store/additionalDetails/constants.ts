import { generateActions } from "helpers/generateActions";

//insurance
export const GET_INSURANCE = generateActions("GET_INSURANCE");

//additional services
export const SELECT_ADDITIONAL_SERVICES = generateActions(
  "SELECT_ADDITIONAL_SERVICES"
);

//booking summary
export const GET_BOOKING_SUMMARY = generateActions("GET_BOOKING_SUMMARY");

//confirm booking
export const CONFIRM_BOOKING = generateActions("CONFIRM_BOOKING");

export const API_ERROR = "API_ERROR";
