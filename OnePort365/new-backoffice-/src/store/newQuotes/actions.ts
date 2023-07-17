import {
    GET_QUOTES,
    GET_QUOTES_SUCCESS,
    GET_NEW_SINGLE_QUOTE,
    GET_NEW_SINGLE_QUOTE_SUCCESS,
    API_ERROR
} from "./constants";

export const getNewQuotes = (data: any) => {
    return {
        type: GET_QUOTES,
        payload: { data }
    }
}

export const getNewQuotesSuccess = (response: any) => {
    return {
        type: GET_QUOTES_SUCCESS,
        payload: response,
    }
}

export const getNewSingleQuote = (id: any) => {
    return {
        type: GET_NEW_SINGLE_QUOTE,
        payload: { id },
    };
};

export const getNewSingleQuoteSuccess = (response: any) => {
    return {
        type: GET_NEW_SINGLE_QUOTE_SUCCESS,
        payload: response,
    };
};


export const NewQuotesApiError = (error: any) => {
    return {
        type: API_ERROR,
        payload: error,
    };
}