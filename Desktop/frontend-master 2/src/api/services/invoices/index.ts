import { get, post } from "helpers/axios";

import {
  getInvoiceByIdUrl,
  getInvoiceByTrxUrl,
  getInvoicesByRateIdUrl,
  getMyInvoicesUrl,
  uploadProofOfPaymentUrl,
  initiateInvoicePaymentUrl,
  completeInvoicePaymentUrl,
} from "api/endpoints";

const getMyInvoices = () => {
  return get(getMyInvoicesUrl);
};

const getInvoicesByRateId = (id: string) => {
  return get(getInvoicesByRateIdUrl + `/${id}`);
};

const getInvoiceByTrx = (trx: string) => {
  return get(getInvoiceByTrxUrl + `/${trx}`);
};

const getInvoiceById = (data: any) => {
  return get(getInvoiceByIdUrl + `/${data.rate_id}/${data.invoice_id}`);
};

const uploadProofOfPayment = (data: any) => {
  return post(uploadProofOfPaymentUrl + `/${data.invoice_id}`, data.data);
};

const initializePayment = (data: any) => {
  return post(initiateInvoicePaymentUrl + `/${data.invoice_id}`, data.data);
};

const completePayment = (data: any) => {
  return post(completeInvoicePaymentUrl, data);
};

const invoiceServices = {
  getMyInvoices,
  getInvoiceByTrx,
  getInvoicesByRateId,
  getInvoiceById,
  uploadProofOfPayment,
  initializePayment,
  completePayment,
};

export default invoiceServices;
