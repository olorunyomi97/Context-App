import {
  CREATE_LOAN_APPLICATION,
  API_ERROR,
} from "store/tradeFinance/constants";

export const createLoanApplication = (data: any, callback?: any) => {
  return {
    type: CREATE_LOAN_APPLICATION.REQUEST,
    payload: { data, callback },
  };
};

export const createLoanApplicationSuccess = (data: any, callback?: any) => {
  return {
    type: CREATE_LOAN_APPLICATION.SUCCESS,
    payload: { data, callback },
  };
};

export const tradeFinanceApiError = (error: any) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
