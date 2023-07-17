import {
    GET_RATE_BY_ID,
    INITIATE_ADMIN_RATE_REQUEST,
    UPLOAD_ADMIN_RATES_DOCS,
    UPLOAD_ADMIN_CARGO_DETAILS,
    UPLOAD_ADMIN_ADDITIONAL_SERVICES,
    LIVE_RATE_REQUEST,
    SAVE_LIVE_RATES_SELECTION,
    GET_SELECTED_LIVE_RATES,
    CONFIRM_LIVE_RATES,
    REQUEST_ADMIN_SHIPPING_FORM,
    API_ERROR,
    CLEAR_API_ERROR,
} from "./constants";

const initialState = {
    error: "",
    loading: false,
    admin_rate_data: null,
    live_rates: [],
    selected_live_rates: {},
    confirming_live_rates: false,
    saving_live_rates_selection: false,
};

const Adminrate = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_RATE_BY_ID.REQUEST:
            state = {
                ...state,
                loading: true,
                error: "",
            };
            break;

        case GET_RATE_BY_ID.SUCCESS:
            state = {
                ...state,
                error: "",
                loading: false,
                admin_rate_data: action.payload.data,
            };
            break;

        case INITIATE_ADMIN_RATE_REQUEST.REQUEST:
            state = {
                ...state,
                loading: true,
                error: "",
            };
            break;
        case INITIATE_ADMIN_RATE_REQUEST.SUCCESS:
            state = {
                ...state,
                error: "",
                loading: false,
                admin_rate_data: action.payload.data,
            };
            break;
        case UPLOAD_ADMIN_RATES_DOCS.REQUEST:
            state = {
                ...state,
                loading: true,
                error: "",
            };
            break;

        case UPLOAD_ADMIN_RATES_DOCS.SUCCESS:
            state = {
                ...state,
                error: "",
                loading: false,
                admin_rate_data: action.payload.data,
            };
            break;
        case UPLOAD_ADMIN_CARGO_DETAILS.REQUEST:
            state = {
                ...state,
                loading: true,
                error: "",
            };
            break;

        case UPLOAD_ADMIN_CARGO_DETAILS.SUCCESS:
            state = {
                ...state,
                error: "",
                loading: false,
                admin_rate_data: action.payload.data,
            };
            break;
        case UPLOAD_ADMIN_ADDITIONAL_SERVICES.REQUEST:
            state = {
                ...state,
                loading: true,
                error: "",
            };
            break;

        case UPLOAD_ADMIN_ADDITIONAL_SERVICES.SUCCESS:
            state = {
                ...state,
                error: "",
                loading: false,
                admin_rate_data: action.payload.data,
            };
            break;

        case LIVE_RATE_REQUEST.REQUEST:
            state = {
                ...state,
                loading: true,
                error: "",
            };
            break;

        case LIVE_RATE_REQUEST.SUCCESS:
            state = {
                ...state,
                error: "",
                loading: false,
                live_rates: action.payload.data,
            };
            break;
        case SAVE_LIVE_RATES_SELECTION.REQUEST:
            state = {
                ...state,
                saving_live_rates_selection: true,
                error: "",
                loading: true
            };
            break;
        case SAVE_LIVE_RATES_SELECTION.SUCCESS:
            state = {
                ...state,
                saving_live_rates_selection: false,
                error: "",
                loading: false
            };
            break;

        case GET_SELECTED_LIVE_RATES.REQUEST:
            state = {
                ...state,
                loading: true,
                error: "",
            };
            break;

        case GET_SELECTED_LIVE_RATES.SUCCESS:
            state = {
                ...state,
                loading: false,
                error: "",
                selected_live_rates: action.payload,
            };

            console.log(state.selected_live_rates);
            break;

        case CONFIRM_LIVE_RATES.REQUEST:
            state = {
                ...state,
                confirming_live_rates: true,
                error: "",
            };
            break;
        case CONFIRM_LIVE_RATES.SUCCESS:
            state = {
                ...state,
                confirming_live_rates: false,
                error: "",
            };
            break;
        case REQUEST_ADMIN_SHIPPING_FORM.REQUEST:
            state = {
                ...state,
                loading: true,
                error: "",
            };
            break;

        case REQUEST_ADMIN_SHIPPING_FORM.SUCCESS:
            state = {
                ...state,
                error: "",
                loading: false,
            };
            break;
        case API_ERROR:
            state = { ...state, error: action.payload, loading: false };
            break;

        case CLEAR_API_ERROR:
            state = { ...state, error: "" };
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
};

export default Adminrate;
