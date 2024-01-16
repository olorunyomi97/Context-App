import {
  GET_DASHBOARD_PARAMS,
  GET_PENDING_DASHBOARD_QUOTES,
  API_ERROR,
} from "store/dashboard/constants";

export const getDashboardParams = (data) => {
  return {
    type: GET_DASHBOARD_PARAMS.REQUEST,
    payload: { data },
  };
};

export const getDashboardParamsSuccess = (response: any) => {
  return {
    type: GET_DASHBOARD_PARAMS.SUCCESS,
    payload: response,
  };
};

export const getPendingDashboardQuotes = (data) => {
  return {
    type: GET_PENDING_DASHBOARD_QUOTES.REQUEST,
    payload: { data },
  };
};

export const getPendingDashboardQuotesSuccess = (response: any) => {
  return {
    type: GET_PENDING_DASHBOARD_QUOTES.SUCCESS,
    payload: response,
  };
};

export const dashboardApiError = (error: any) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
