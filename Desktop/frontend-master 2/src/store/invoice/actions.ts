import {
  GET_INVOICES,
  GET_INVOICE_BY_RATE_ID,
  GET_INVOICE_BY_TRX,
  GET_INVOICE_BY_ID,
  UPLOAD_PROOF_OF_PAYMENT,
  API_ERROR,
  INITIALIZE_PAYMENT,
  COMPLETE_PAYMENT,
} from "store/invoice/constants";

export const getMyInvoices = (data: any) => {
  return {
    type: GET_INVOICES.REQUEST,
    payload: { data },
  };
};

export const getMyInvoicesSuccess = (response: any) => {
  return {
    type: GET_INVOICES.SUCCESS,
    payload: response,
  };
};

export const getInvoicesByRateId = (id: string) => {
  return {
    type: GET_INVOICE_BY_RATE_ID.REQUEST,
    payload: { id },
  };
};

export const getInvoicesByRateIdSuccess = (response: any) => {
  return {
    type: GET_INVOICE_BY_RATE_ID.SUCCESS,
    payload: response,
  };
};

export const getInvoiceById = (data: any) => {
  return {
    type: GET_INVOICE_BY_ID.REQUEST,
    payload: { data },
  };
};

export const getInvoiceByIdSuccess = (response: any) => {
  return {
    type: GET_INVOICE_BY_ID.SUCCESS,
    payload: response,
  };
};

export const getInvoiceByTrx = (trx_ref: any) => {
  return {
    type: GET_INVOICE_BY_TRX.REQUEST,
    payload: { trx_ref },
  };
};

export const getInvoiceByTrxSuccess = (response: any) => {
  return {
    type: GET_INVOICE_BY_TRX.SUCCESS,
    payload: response,
  };
};

export const uploadProofOfPayment = (data: any) => {
  return {
    type: UPLOAD_PROOF_OF_PAYMENT.REQUEST,
    payload: { data },
  };
};

export const uploadProofOfPaymentSuccess = (response: any) => {
  return {
    type: UPLOAD_PROOF_OF_PAYMENT.SUCCESS,
    payload: response,
  };
};

export const initializePayment = (data: any) => {
  return {
    type: INITIALIZE_PAYMENT.REQUEST,
    payload: { data },
  };
};

export const initializePaymentSuccess = (response: any) => {
  return {
    type: INITIALIZE_PAYMENT.SUCCESS,
    payload: response,
  };
};

export const confirmPayment = (data: any) => {
  return {
    type: COMPLETE_PAYMENT.REQUEST,
    payload: { data },
  };
};

export const confirmPaymentSuccess = (response: any) => {
  return {
    type: COMPLETE_PAYMENT.SUCCESS,
    payload: response,
  };
};

export const invoiceApiError = (error: any) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
