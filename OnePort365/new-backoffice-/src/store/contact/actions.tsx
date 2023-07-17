import { 
    GET_CONTACTS, 
    GET_CONTACTS_SUCCESS, 
    GET_REQUEST_CONTACTS, 
    GET_REQUEST_CONTACTS_SUCCESS, 
    UPDATE_MESSAGE_STATUS,
    UPDATE_MESSAGE_STATUS_SUCCESS,
    API_ERROR 
} from "./constant"

export const getContacts = () => {
    return {
        type: GET_CONTACTS,
    }
}

export const getContactsSuccess = (contacts: any) => {
    return {
        type: GET_CONTACTS_SUCCESS,
        payload: contacts,
    }
}

export const getRequestContacts = () => {
    return {
        type: GET_REQUEST_CONTACTS,
    }
}

export const getRequestContactsSuccess = (callback_contacts: any) => {
    return {
        type: GET_REQUEST_CONTACTS_SUCCESS,
        payload: callback_contacts,
    }
}

export const updateStatus = (id: any, data) => {
    return {
        type: UPDATE_MESSAGE_STATUS,
        payload: { id, data },
    };
};

export const updateStatusSuccess = (response: any) => {
    return {
        type: UPDATE_MESSAGE_STATUS_SUCCESS,
        payload: response,
    };
};


export const ContactApiError = (error:any) => {
    return {
        type: API_ERROR,
        payload: error,
    };
};