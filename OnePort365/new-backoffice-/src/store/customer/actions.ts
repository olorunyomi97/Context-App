import {
    GET_CUSTOMERS,
    GET_CUSTOMER_SUCCESS,
    GET_SINGLE_CUSTOMER,
    GET_SINGLE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER,
    CREATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER,
    UPDATE_CUSTOMER_SUCCESS,
    SEARCH_CUSTOMER,
    SEARCH_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER,
    DELETE_CUSTOMER_SUCCESS,
    API_ERROR
} from "./constants";

export const getCustomers = (query: string) => {
    return {
        type: GET_CUSTOMERS,
        payload: query
    }
}

export const getCustomersSuccess = (customer: any) => {
    return {
        type: GET_CUSTOMER_SUCCESS,
        payload: customer,
    };
};

export const getSingleCustomer = (id: any) => {
    return {
        type: GET_SINGLE_CUSTOMER,
        payload: { id },
    };
};

export const getSingleCustomerSuccess = (response: any) => {
    return {
        type: GET_SINGLE_CUSTOMER_SUCCESS,
        payload: response,
    };
};

export const createCustomer = (data: any, callback: any) => {
    return {
        type: CREATE_CUSTOMER,
        payload: { data, callback },
    };
};

export const createCustomerSuccess = (response: any) => {
    return {
        type: CREATE_CUSTOMER_SUCCESS,
        payload: response,
    };
};

export const updateCustomer = (data: any, callback: any) => {
    console.log(data);
    console.log(callback);
    return {
        type: UPDATE_CUSTOMER,
        payload: { data, callback },

    };
};
export const updateCustomerSuccess = (response: any) => {
    return {
        type: UPDATE_CUSTOMER_SUCCESS,
        payload: response,
    };
};

export const searchCustomer = (data: any, callback: any) => {
    return {
        type: SEARCH_CUSTOMER,
        payload: { data, callback },
    };
};

export const searchCustomerSuccess = (response: any) => {
    return {
        type: SEARCH_CUSTOMER_SUCCESS,
        payload: response,
    };
};

export const deleteCustomer = (id: any) => {
    return {
        type: DELETE_CUSTOMER,
        payload: { id },
    };
};

export const deleteCustomerSuccess = (response: any) => {
    return {
        type: DELETE_CUSTOMER_SUCCESS,
        payload: response,
    };
};

export const CustomerApiError = (error: any) => {
    return {
        type: API_ERROR,
        payload: error,
    };
}