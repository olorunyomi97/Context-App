import { 
    GET_ALL_QUOTES_SUCCESS,
    GET_MY_QUOTES_SUCCESS,
    GET_MY_CREATED_QUOTES_SUCCESS,
    GET_PENDING_ADMIN_QUOTES_SUCCESS,
    PROCESS_PENDING_ADMIN_QUOTES_SUCCESS,
    GET_PENDING_CUSTOMER_QUOTES_SUCCESS,
    GET_ACCEPTED_QUOTES_SUCCESS,
    GET_SINGLE_QUOTE_SUCCESS, 
    ATTACH_QUOTE, 
    API_ERROR, 
    FILTER_QUOTES_SUCCESS,
    ATTACH_QUOTE_SUCCESS 
} from "./constant";

const initialState = {
    error: null,
    loading: true,
    quotes: [],
    my_quotes: [],
    created_quotes: [],
    pending_admin_quotes: [],
    pending_customer_quotes: [],
    accepted_quotes: [],
    process_quotes: {},
    single_quote: {},
    quote_data: null,
    filter_quotes:{}
}

const quotes = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ALL_QUOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                quotes: action.payload,
            }
        case GET_MY_QUOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                my_quotes: action.payload,
            }
        case GET_MY_CREATED_QUOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                created_quotes: action.payload,
            }
        case GET_PENDING_ADMIN_QUOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                pending_admin_quotes: action.payload,
            }
        case PROCESS_PENDING_ADMIN_QUOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                process_quotes: action.payload,
            }
        case GET_PENDING_CUSTOMER_QUOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                pending_customer_quotes: action.payload,
            }
        case GET_ACCEPTED_QUOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                accepted_quotes: action.payload,
            }
        case GET_SINGLE_QUOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                single_quote: action.payload,
            }
        case ATTACH_QUOTE:
            return {
                ...state,
                loading: true,
                error: "",
            }
        case ATTACH_QUOTE_SUCCESS:
            return {
                ...state,
                error: "",
                loading: false,
                quote_data: action.payload,
            }
        case API_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        case FILTER_QUOTES_SUCCESS:
        return {
            ...state,
            loading: false,
            filter_quotes: action.payload,
        }
        default:
            return state;
        }
    
}

export default quotes;