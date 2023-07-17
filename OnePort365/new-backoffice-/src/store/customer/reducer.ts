// import Customer from 'pages/customer/Customer';
import {
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
    API_ERROR
} from "./constants";

const initialState = {
    error: null,
    loading: true,
    customers: [],
    single_customer: {},
    search_result: [],
}

const customers = (state = initialState, action) => {
    switch (action.type) {
        case GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: action.payload,
            };

        case GET_SINGLE_CUSTOMER:
            return {
                ...state,
                loading: true,
            }

        case GET_SINGLE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                single_customer: action.payload,
            }
        case CREATE_CUSTOMER:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case CREATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: action.payload
            };

        case UPDATE_CUSTOMER:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case SEARCH_CUSTOMER:
            return {
                ...state,
                loading: true,
            };
        case SEARCH_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                search_result: action.payload.data,
            };
        case DELETE_CUSTOMER:
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

export default customers;