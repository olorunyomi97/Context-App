import { generateActions } from "helpers/generateActions";

export const GET_INVOICES = generateActions("GET_INVOICES");
export const GET_INVOICE_BY_RATE_ID = generateActions("GET_INVOICE_BY_RATE_ID");
export const GET_INVOICE_BY_TRX = generateActions("GET_INVOICE_BY_TRX");
export const GET_INVOICE_BY_ID = generateActions("GET_INVOICE_BY_ID");
export const UPLOAD_PROOF_OF_PAYMENT = generateActions(
  "UPLOAD_PROOF_OF_PAYMENT"
);

export const INITIALIZE_PAYMENT = generateActions("INITIALIZE_PAYMENT");
export const COMPLETE_PAYMENT = generateActions("COMPLETE_PAYMENT");

export const API_ERROR = "API_ERROR";
