import {
  GET_QUOTES,
  GET_QUOTE_BY_ID,
  ACCEPT_QUOTE,
  REQUEST_FOLLOW_UP,
  API_ERROR,
} from "store/quote/constants";

export const getMyQuotes = (data: any) => {
  return {
    type: GET_QUOTES.REQUEST,
    payload: { data },
  };
};

export const getMyQuotesSuccess = (response: any) => {
  return {
    type: GET_QUOTES.SUCCESS,
    payload: response,
  };
};

export const getQuotesById = (id: string) => {
  return {
    type: GET_QUOTE_BY_ID.REQUEST,
    payload: { id },
  };
};

export const getQuotesByIdSuccess = (response: any) => {
  return {
    type: GET_QUOTE_BY_ID.SUCCESS,
    payload: response,
  };
};

export const acceptQuote = (data: any, callback: any) => {
  return {
    type: ACCEPT_QUOTE.REQUEST,
    payload: { data, callback },
  };
};

export const acceptQuoteSuccess = (response: any) => {
  return {
    type: ACCEPT_QUOTE.SUCCESS,
    payload: response,
  };
};

export const requestFollowUp = (data: any, callback: any) => {
  return {
    type: REQUEST_FOLLOW_UP.REQUEST,
    payload: { data, callback },
  };
};

export const requestFollowUpSuccess = (response: any) => {
  return {
    type: REQUEST_FOLLOW_UP.SUCCESS,
    payload: response,
  };
};

export const quoteApiError = (error: any) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
