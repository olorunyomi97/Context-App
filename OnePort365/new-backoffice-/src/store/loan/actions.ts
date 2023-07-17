import { 
    GET_LOAN_APPLICATIONS, 
    GET_LOAN_APPLICATIONS_SUCCESS, 
    GET_SINGLE_LOAN_APPLICATION,
    GET_SINGLE_LOAN_APPLICATION_SUCCESS,
    UPDATE_LOAN_PAYMENT_STATUS,
    UPDATE_LOAN_PAYMENT_STATUS_SUCCESS,
    API_ERROR 
} from "./constants";

export const getLoanApplications = (data:any) => {
    return {
        type: GET_LOAN_APPLICATIONS,
        payload: { data },
    }
}

export const getLoanApplicationSuccess = (response: any) => {
    return {
        type: GET_LOAN_APPLICATIONS_SUCCESS,
        payload: response, 
    }
}

export const getSingleLoanApplication = (id: any) => {
    return {
      type: GET_SINGLE_LOAN_APPLICATION,
      payload: { id },
    };
};

export const getSingleLoanApplicationSuccess = (response: any) => {
    return {
      type: GET_SINGLE_LOAN_APPLICATION_SUCCESS,
      payload: response,
    };
};

export const updateLoanPaymentStatus = (data: any)  => {
    console.log(data);
    return {
        type: UPDATE_LOAN_PAYMENT_STATUS,
        payload: { data },
        
    };
};
export const updateLoanPaymentStatusSuccess = (response: any) => {
    return {
        type: UPDATE_LOAN_PAYMENT_STATUS_SUCCESS,
        payload: response,
    };
};

export const LoanApplicationApiError = (error: any) => {
    return {
        type: API_ERROR,
        payload: error,
    };
};
