import { 
    GET_RATE_BY_ID,
    INITIATE_ADMIN_RATE_REQUEST, 
    UPLOAD_ADMIN_RATES_DOCS,
    UPLOAD_ADMIN_CARGO_DETAILS,
    UPLOAD_ADMIN_ADDITIONAL_SERVICES,
    LIVE_RATE_REQUEST,
    SAVE_LIVE_RATES_SELECTION,
    GET_SELECTED_LIVE_RATES,
    CONFIRM_LIVE_RATES,
    REQUEST_ADMIN_SHIPPING_FORM,
    API_ERROR,
    CLEAR_API_ERROR,
} from "./constants";

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

export const initiateAdminRateRequest = (data: any, callback: any) => {
    return {
      type: INITIATE_ADMIN_RATE_REQUEST.REQUEST,
      payload: { data, callback },
    };
};

  export const initiateAdminRateRequestSuccess = (response: any) => {
    return {
      type: INITIATE_ADMIN_RATE_REQUEST.SUCCESS,
      payload: response,
    };
};
  
export const uploadAdminRatesDocs = (data: any, callback: string, type: string) => {
    return {
      type: UPLOAD_ADMIN_RATES_DOCS.REQUEST,
      payload: { data, callback, type },
    };
};
  
  export const uploadAdminRatesDocsSuccess = (response: any, type: string) => {
    return {
      type: UPLOAD_ADMIN_RATES_DOCS.SUCCESS,
      payload: response,
    };
};

export const updateAdminCargoDetails = (data: any, callback: string, type: string) => {
    return {
      type: UPLOAD_ADMIN_CARGO_DETAILS.REQUEST,
      payload: { data, callback, type },
    };
};

export const updateAdminCargoDetailsSuccess = (response: any, type: string) => {
    return {
      type: UPLOAD_ADMIN_CARGO_DETAILS.SUCCESS,
      payload: response,
    };
};

export const updateAdminAdditionalServices = (data: any, type: string) => {
    return {
      type: UPLOAD_ADMIN_ADDITIONAL_SERVICES.REQUEST,
      payload: { data, type },
    };
};

export const updateAdminAdditionalServicesSuccess = (response: any, type: string) => {
    return {
      type: UPLOAD_ADMIN_ADDITIONAL_SERVICES.SUCCESS,
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

export const confirmLiveRates = (id: any, callback: any) => {
  return {
    type: CONFIRM_LIVE_RATES.REQUEST,
    payload: { id, callback },
  };
};

export const confirmLiveRatesSuccess = (response: any) => {
  return {
    type: CONFIRM_LIVE_RATES.SUCCESS,
    payload: response,
  };
};


export const requestAdminShippingForm = (data: any, callback: string, type: string) => {
  return {
    type: REQUEST_ADMIN_SHIPPING_FORM.REQUEST,
    payload: { data, callback, type },
  };
};
  
export const requestAdminShippingFormSuccess = (response: any, type: string) => {
  return {
    type: REQUEST_ADMIN_SHIPPING_FORM.SUCCESS,
    payload: response,
  };
};

export const AdminRateApiError = (error: any) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
  
export const clearAdminRateErrors = (error: any) => {
  return {
    type: CLEAR_API_ERROR,
    payload: error,
  };
};
  