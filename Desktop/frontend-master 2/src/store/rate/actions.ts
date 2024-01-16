import {
  GET_RATE_BY_ID,
  INITIATE_RATE_REQUEST,
  GET_INSURANCE_PROVIDERS,
  CLEAR_INSURANCE_PROVIDERS,
  FINALIZE_RATE_REQUEST,
  UPLOAD_RATES_DOCS,
  UPLOAD_CARGO_DETAILS,
  UPLOAD_ADDITIONAL_SERVICES,
  LIVE_RATE_REQUEST,
  SAVE_LIVE_RATES_SELECTION,
  GET_SELECTED_LIVE_RATES,
  CONFIRM_LIVE_RATES,
  REQUEST_SHIPPING_FORM,
  API_ERROR,
  CLEAR_API_ERROR,
} from "store/rate/constants";

export const getRateById = (id: string) => {
  return {
    type: GET_RATE_BY_ID.REQUEST,
    payload: { id },
  };
};

export const getRateByIdSuccess = (response: any) => {
  return {
    type: GET_RATE_BY_ID.SUCCESS,
    payload: response,
  };
};

export const initiateRateRequest = (data: any, callback: any) => {
  return {
    type: INITIATE_RATE_REQUEST.REQUEST,
    payload: { data, callback },
  };
};

export const initiateRateRequestSuccess = (response: any) => {
  return {
    type: INITIATE_RATE_REQUEST.SUCCESS,
    payload: response,
  };
};

export const getInsuranceProviders = (query: any) => {
  return {
    type: GET_INSURANCE_PROVIDERS.REQUEST,
    payload: { query },
  };
};

export const getInsuranceProvidersSuccess = (response: any) => {
  return {
    type: GET_INSURANCE_PROVIDERS.SUCCESS,
    payload: response,
  };
};

export const clearInsuranceProviders = () => {
  return {
    type: CLEAR_INSURANCE_PROVIDERS,
  };
};

export const finalizeRateRequest = (data: any, callback: any) => {
  return {
    type: FINALIZE_RATE_REQUEST.REQUEST,
    payload: { data, callback },
  };
};

export const finalizeRateRequestSuccess = (response: any) => {
  return {
    type: FINALIZE_RATE_REQUEST.SUCCESS,
    payload: response,
  };
};

export const uploadRatesDocs = (data: any, callback: string, type: string) => {
  return {
    type: UPLOAD_RATES_DOCS.REQUEST,
    payload: { data, callback, type },
  };
};

export const uploadRatesDocsSuccess = (response: any, type: string) => {
  return {
    type: UPLOAD_RATES_DOCS.SUCCESS,
    payload: response,
  };
};

export const updateCargoDetails = (
  data: any,
  callback: string,
  type: string
) => {
  return {
    type: UPLOAD_CARGO_DETAILS.REQUEST,
    payload: { data, callback, type },
  };
};

export const updateCargoDetailsSuccess = (response: any, type: string) => {
  return {
    type: UPLOAD_CARGO_DETAILS.SUCCESS,
    payload: response,
  };
};

export const updateAdditionalServices = (data: any, type: string) => {
  return {
    type: UPLOAD_ADDITIONAL_SERVICES.REQUEST,
    payload: { data, type },
  };
};

export const updateAdditionalServicesSuccess = (
  response: any,
  type: string
) => {
  return {
    type: UPLOAD_ADDITIONAL_SERVICES.SUCCESS,
    payload: response,
  };
};

export const liveRateRequest = (id: string) => {
  return {
    type: LIVE_RATE_REQUEST.REQUEST,
    payload: { id },
  };
};

export const liveRateRequestSuccess = (response: any) => {
  return {
    type: LIVE_RATE_REQUEST.SUCCESS,
    payload: response,
  };
};

export const saveLiveRatesSelection = (data: any) => {
  return {
    type: SAVE_LIVE_RATES_SELECTION.REQUEST,
    payload: { data },
  };
};

export const saveLiveRatesSelectionSuccess = (response: any) => {
  return {
    type: SAVE_LIVE_RATES_SELECTION.SUCCESS,
    payload: response,
  };
};

export const getSelectedLiveRates = (id: string) => {
  return {
    type: GET_SELECTED_LIVE_RATES.REQUEST,
    payload: { id },
  };
};

export const getSelectedLiveRatesSuccess = (response: any) => {
  return {
    type: GET_SELECTED_LIVE_RATES.SUCCESS,
    payload: response,
  };
};

export const confirmLiveRates = (data: any) => {
  return {
    type: CONFIRM_LIVE_RATES.REQUEST,
    payload: { data },
  };
};

export const confirmLiveRatesSuccess = (response: any) => {
  return {
    type: CONFIRM_LIVE_RATES.SUCCESS,
    payload: response,
  };
};

export const requestShippingForm = (
  data: any,
  callback: string,
  type: string
) => {
  return {
    type: REQUEST_SHIPPING_FORM.REQUEST,
    payload: { data, callback, type },
  };
};

export const requestShippingFormSuccess = (response: any, type: string) => {
  return {
    type: REQUEST_SHIPPING_FORM.SUCCESS,
    payload: response,
  };
};

export const rateApiError = (error: any) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};

export const clearRateErrors = (error: any) => {
  return {
    type: CLEAR_API_ERROR,
    payload: error,
  };
};
