import { 
    GET_LOAN_APPLICATIONS, 
    GET_LOAN_APPLICATIONS_SUCCESS,
    GET_SINGLE_LOAN_APPLICATION,
    GET_SINGLE_LOAN_APPLICATION_SUCCESS, 
    UPDATE_LOAN_PAYMENT_STATUS,
    UPDATE_LOAN_PAYMENT_STATUS_SUCCESS,
    API_ERROR 
} from "./constants";

const initialState = {
    error: null,
    loading: true,
    loan_applications : [],
    single_loan_application: {},
}

const loanApplications = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOAN_APPLICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                loan_applications: action.payload,
            };
        case GET_SINGLE_LOAN_APPLICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                single_loan_application: action.payload,
            }
        case UPDATE_LOAN_PAYMENT_STATUS:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_LOAN_PAYMENT_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                single_loan_application: action.payload
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

export default loanApplications;