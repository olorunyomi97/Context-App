import { 
    CHANGE_PASSWORD, 
    CHANGE_PASSWORD_SUCCESS, 
    EDIT_PROFILE, 
    EDIT_PROFILE_SUCCESS, 
    API_ERROR, 
    GET_CURRENT_EXCHANGE_RATES,
    GET_CURRENT_EXCHANGE_RATES_SUCCESS,
    UPDATE_CURRENT_EXCHANGE_RATES,
    UPDATE_CURRENT_EXCHANGE_RATES_SUCCESS
} from "./constants";

export const changePassword = (data: any, callback: string) => {
    return {
        type: CHANGE_PASSWORD,
        payload: { data, callback },
    }
}

export const changePasswordSuccess = (response: any) => {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        payload: response, 
    }
}

export const editProfile = (data: string, callback: any)  => {
    console.log(data);
    console.log(callback);
    return {
        type: EDIT_PROFILE,
        payload: { data, callback },
        
    };
};
export const editProfileSuccess = (response: any) => {
    return {
        type: EDIT_PROFILE_SUCCESS,
        payload: response,
    };
};

export const getCurrentExchangeRates = () => {
    return {
        type:GET_CURRENT_EXCHANGE_RATES
    }
}

export const getCurrentExchangeRatesSuccess = (response: any) => {
    return {
        type: GET_CURRENT_EXCHANGE_RATES_SUCCESS,
        payload: response,
    }
}

export const updateCurrentExchangeRates = (data: any, callback:any) => {
    console.log(data);
    console.log(callback);
    return {
        type: UPDATE_CURRENT_EXCHANGE_RATES,
        payload: { data, callback }
    }
}

export const updateCurrentExchangeRatesSuccess = (response:any) => {
    return {
        type: UPDATE_CURRENT_EXCHANGE_RATES_SUCCESS,
        payload: response,
    }
}

export const SettingsApiError = (error: any) => {
    return {
        type: API_ERROR,
        payload: error,
    };
}