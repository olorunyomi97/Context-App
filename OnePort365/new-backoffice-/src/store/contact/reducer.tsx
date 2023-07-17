import { GET_CONTACTS_SUCCESS, GET_REQUEST_CONTACTS_SUCCESS, UPDATE_MESSAGE_STATUS, API_ERROR } from "./constant";

const initialState = {
    error: null,
    loading: true,
    contacts: [],
    callback_contacts: [],
}

const contacts = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_CONTACTS_SUCCESS: 
            return {
                ...state,
                loading: false,
                contacts: action.payload,
        }
        case GET_REQUEST_CONTACTS_SUCCESS: 
            return {
                ...state,
                loading: false,
                callback_contacts: action.payload,
        }
        case UPDATE_MESSAGE_STATUS:
        return {
            ...state,
            loading: false,
        };
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

export default contacts;