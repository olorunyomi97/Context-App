import { 
    GET_ALL_INVOICES_SUCCESS, 
    GET_SINGLE_INVOICE_SUCCESS, 
    GET_SINGLE_INVOICE_DETAILS,
    GET_SINGLE_INVOICE_DETAILS_SUCCESS,
    ATTACH_INVOICE, 
    ATTACH_INVOICE_SUCCESS,
    ATTACH_PROOF_OF_PAYMENT,
    ATTACH_PROOF_OF_PAYMENT_SUCCESS,
    DELETE_INVOICE,
    API_ERROR,
} from "./constant";

const initialState = {
    error: null,
    loading: true,
    invoices: [],
    single_invoice: {},
    single_invoice_details: {},
    invoice_data: null,
    proof_of_payment_data: null
}

const invoices = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ALL_INVOICES_SUCCESS:
            return {
                ...state,
                loading: false,
                invoices: action.payload,
            }
        case GET_SINGLE_INVOICE_SUCCESS:
            return {
                ...state,
                loading: false,
                single_invoice: action.payload,
            }
        case GET_SINGLE_INVOICE_DETAILS:
            return {
                ...state,
                loading: true,
                single_invoice_details: action.payload,
            }
        case GET_SINGLE_INVOICE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                single_invoice_details: action.payload,
            }
        case ATTACH_INVOICE:
            return {
                ...state,
                loading: true,
                error: "",
            }
        case ATTACH_INVOICE_SUCCESS:
            return {
                ...state,
                error: "",
                loading: false,
                invoice_data: action.payload,
            }
        case ATTACH_PROOF_OF_PAYMENT:
            return {
                ...state,
                loading: true,
                error: "",
            }
        case ATTACH_PROOF_OF_PAYMENT_SUCCESS:
            return {
                ...state,
                error: "",
                loading: false,
                proof_of_payment_data: action.payload,
            }
        case DELETE_INVOICE:
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

export default invoices;