import { 
    GET_ALL_QUOTES, 
    GET_ALL_QUOTES_SUCCESS, 
    GET_MY_QUOTES,
    GET_MY_QUOTES_SUCCESS,
    GET_MY_CREATED_QUOTES,
    GET_MY_CREATED_QUOTES_SUCCESS,
    GET_PENDING_ADMIN_QUOTES,
    GET_PENDING_ADMIN_QUOTES_SUCCESS,
    PROCESS_PENDING_ADMIN_QUOTES,
    PROCESS_PENDING_ADMIN_QUOTES_SUCCESS,
    GET_PENDING_CUSTOMER_QUOTES,
    GET_PENDING_CUSTOMER_QUOTES_SUCCESS,
    GET_ACCEPTED_QUOTES,
    GET_ACCEPTED_QUOTES_SUCCESS,
    GET_SINGLE_QUOTE, 
    GET_SINGLE_QUOTE_SUCCESS, 
    ATTACH_QUOTE,
    ATTACH_QUOTE_SUCCESS, 
    API_ERROR,  
    FILTER_QUOTES,
    FILTER_QUOTES_SUCCESS,
} from "./constant";


export const getAllQuotes = (query: string) => {
    return {
        type: GET_ALL_QUOTES,
        payload: query
    };
};

export const getQuotesSuccess = (quotes:any) => {
    return {
        type: GET_ALL_QUOTES_SUCCESS,
        payload: quotes,
    };
};

export const getMyQuotes = (query: string) => {
    return {
        type: GET_MY_QUOTES,
        payload: query
    };
};

export const getMyQuotesSuccess = (my_quotes:any) => {
    return {
        type: GET_MY_QUOTES_SUCCESS,
        payload: my_quotes,
    };
};

export const getCreatedQuotes = (query: string) => {
    return {
        type: GET_MY_CREATED_QUOTES,
        payload: query
    };
};

export const getCreatedQuotesSuccess = (created_quotes:any) => {
    return {
        type: GET_MY_CREATED_QUOTES_SUCCESS,
        payload: created_quotes,
    };
};

export const getPendingAdminQuotes = (query: string) => {
    return {
        type: GET_PENDING_ADMIN_QUOTES,
        payload: query
    };
};

export const getPendingAdminQuotesSuccess = (pending_admin_quotes:any) => {
    return {
        type: GET_PENDING_ADMIN_QUOTES_SUCCESS,
        payload: pending_admin_quotes,
    };
};

export const processPendingAdminQuotes = (id: any) => {
    return {
        type: PROCESS_PENDING_ADMIN_QUOTES,
        payload: { id },
    };
};

export const processPendingAdminQuotesSuccess = (response: any)  => {
    return {
        type: PROCESS_PENDING_ADMIN_QUOTES_SUCCESS,
        payload: response,
    };
};

export const getPendingCustomerQuotes = (query: string) => {
    return {
        type: GET_PENDING_CUSTOMER_QUOTES,
        payload: query
    };
};

export const getPendingCustomerQuotesSuccess = (pending_customer_quotes:any) => {
    return {
        type: GET_PENDING_CUSTOMER_QUOTES_SUCCESS,
        payload: pending_customer_quotes,
    };
};

export const getAcceptedQuotes = (query: string) => {
    return {
        type: GET_ACCEPTED_QUOTES,
        payload: query
    };
};

export const getAcceptedQuotesSuccess = (accepted_quotes:any) => {
    return {
        type: GET_ACCEPTED_QUOTES_SUCCESS,
        payload: accepted_quotes,
    };
};

export const getSingleQuote = (id: any) => {
    return {
      type: GET_SINGLE_QUOTE,
      payload: { id },
    };
};

export const getSingleQuoteSuccess = (response: any) => {
    return {
      type: GET_SINGLE_QUOTE_SUCCESS,
      payload: response,
    };
};

export const attachQuote = (data: any, callback: string) => {
    return {
        type: ATTACH_QUOTE,
        payload: { data, callback },
    }
}

export const attachQuoteSuccess = (response: any) => {
    return {
        type: ATTACH_QUOTE_SUCCESS,
        payload: response, 
    }
}
  
export const filterQuotes = () => {
    return {
        type: FILTER_QUOTES,
    };
};

export const filterQuotesSuccess = (filter_quotes:any) => {
    return {
        type: FILTER_QUOTES_SUCCESS,
        payload: filter_quotes
    };
};

export const QuoteApiError = (error:any) => {
    return {
        type: API_ERROR,
        payload: error,
    };
};