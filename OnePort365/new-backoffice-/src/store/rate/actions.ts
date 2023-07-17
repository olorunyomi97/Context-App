import {
    INITIATE_RATE_REQUEST,
    UPLOAD_RATES_DOCS,
    UPLOAD_CARGO_DETAILS,
    UPLOAD_ADDITIONAL_SERVICES,
    REQUEST_SHIPPING_FORM,
    API_ERROR,
    CLEAR_API_ERROR,
} from "store/rate/constants";

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
