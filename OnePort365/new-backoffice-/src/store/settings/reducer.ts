import { CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, EDIT_PROFILE, EDIT_PROFILE_SUCCESS, API_ERROR, GET_CURRENT_EXCHANGE_RATES, GET_CURRENT_EXCHANGE_RATES_SUCCESS, UPDATE_CURRENT_EXCHANGE_RATES, UPDATE_CURRENT_EXCHANGE_RATES_SUCCESS } from "./constants";

const initialState = {
    error: null,
    loading: true,
    settings: [],
    exchange_rates: [],
}

const settings = (state = initialState, action: any) => {
    switch (action.type) {
        case CHANGE_PASSWORD:
            return {
                ...state,
                loading: true,
            };

        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case EDIT_PROFILE: 
            return {
                ...state,
                loading: true,
            }

        case EDIT_PROFILE_SUCCESS: 
            return {
                ...state,
                loading: false
            }
        
        case GET_CURRENT_EXCHANGE_RATES:
            return {
                ...state,
                loading: true,
            }
        case GET_CURRENT_EXCHANGE_RATES_SUCCESS: 
            return {
                ...state,
                loading: false,
                exchange_rates: action.payload
            }
        case UPDATE_CURRENT_EXCHANGE_RATES:
            return {
                ...state,
                loading: true,
                error: "",
            }
        case UPDATE_CURRENT_EXCHANGE_RATES_SUCCESS:
            return {
                ...state,
                loading: true,
                exchange_rates: action.payload
            }
        case API_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        default:
            return state;
        }
    
}

export default settings;