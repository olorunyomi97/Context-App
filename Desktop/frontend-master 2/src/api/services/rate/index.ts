import { get, post } from "helpers/axios";
import {
  getRateByIdUrl,
  initiateRateRequestUrl,
  getInsuranceProvidersUrl,
  finalizeRateRequestUrl,
  updateAdditionalServicesUrl,
  updateCargoDetailsUrl,
  uploadRatesDocsUrl,
  initiateLiveRatesRequestUrl,
  documentRequestUrl,
  saveLiveRatesSelectionUrl,
  confirmLiveRatesUrl,
  getSelectedLiveRatesUrl,
  createNewShipmentUrl,
} from "api/endpoints";

const getRateById = (id: string) => {
  return get(getRateByIdUrl + `/${id}`);
};

const initiateRateRequest = (data: object) => {
  return post(initiateRateRequestUrl, data);
};

const createNewShipment = (data: object) => {
  return post(createNewShipmentUrl, data);
};

const getInsuranceProviders = (query: {
  clause_type: string;
  insurer_country: string;
  goods_value: string;
  shipping_type: string;
}) => {
  return get(
    getInsuranceProvidersUrl +
      `?clause_type=${query.clause_type}&insurer_country=${query.insurer_country}&goods_value=${query.goods_value}&shipping_type=${query.shipping_type}`
  );
};

const finalizeRateRequest = (data: any) => {
  return post(finalizeRateRequestUrl + `/${data.id}`, data.data);
};

//export & import
const uploadRatesDocs = (data: any) => {
  return post(uploadRatesDocsUrl + `/${data.id}`, data.data);
};

const updateCargoDetails = (data: any) => {
  return post(updateCargoDetailsUrl + `/${data.id}`, data.data);
};

const updateAdditionalServices = (data: any) => {
  return post(updateAdditionalServicesUrl + `/${data.id}`, data.data);
};

const initiateLiveRatesRequest = (id: string) => {
  return get(initiateLiveRatesRequestUrl + `/${id}`);
};

const documentRequest = (data: any) => {
  return post(documentRequestUrl + `/${data.id}`, data.data);
};

const saveLiveRatesSelection = (data: any) => {
  return post(saveLiveRatesSelectionUrl + `/${data.id}`, data.data);
};

const getSelectedLiveRates = (id: string) => {
  return get(getSelectedLiveRatesUrl + `/${id}`);
};

const confirmLiveRates = (data: any) => {
  return post(confirmLiveRatesUrl + `/${data.id}`, data.data);
};

const rateServices = {
  getRateById,
  initiateRateRequest,
  getInsuranceProviders,
  finalizeRateRequest,
  uploadRatesDocs,
  updateCargoDetails,
  updateAdditionalServices,
  initiateLiveRatesRequest,
  documentRequest,
  saveLiveRatesSelection,
  getSelectedLiveRates,
  confirmLiveRates,
  createNewShipment,
};

export default rateServices;
