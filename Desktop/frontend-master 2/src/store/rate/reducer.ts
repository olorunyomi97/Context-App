import {
  INITIATE_RATE_REQUEST,
  GET_INSURANCE_PROVIDERS,
  CLEAR_INSURANCE_PROVIDERS,
  FINALIZE_RATE_REQUEST,
  UPLOAD_RATES_DOCS,
  UPLOAD_CARGO_DETAILS,
  UPLOAD_ADDITIONAL_SERVICES,
  LIVE_RATE_REQUEST,
  SAVE_LIVE_RATES_SELECTION,
  GET_SELECTED_LIVE_RATES,
  CONFIRM_LIVE_RATES,
  REQUEST_SHIPPING_FORM,
  API_ERROR,
  CLEAR_API_ERROR,
  GET_RATE_BY_ID,
} from "store/rate/constants";

const initialState = {
  error: "",
  loading: false,
  rate_result: {},
  rate_data: {},
  getting_rates: false,
  rates_documents: [],
  getting_insurance_providers: false,
  insurance_providers: [],
  finalizing_rate_request: false,
  live_rates: [],
  selected_live_rates: {},
  confirming_live_rates: false,
  saving_live_rates_selection: false,
};

const rate = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_RATE_BY_ID.REQUEST:
      state = { ...state, getting_rates: true, error: "" };
      break;

    case GET_RATE_BY_ID.SUCCESS:
      state = {
        ...state,
        error: "",
        getting_rates: false,
        rate_result: action.payload.data.rate_results,
        rate_data: action.payload.data.rates_data,
        rates_documents: action.payload.data.rates_documents,
      };
      break;

    case INITIATE_RATE_REQUEST.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case INITIATE_RATE_REQUEST.SUCCESS:
      state = {
        ...state,
        error: "",
        loading: false,
        rate_data: action.payload.data,
      };
      break;

    case GET_INSURANCE_PROVIDERS.REQUEST:
      state = {
        ...state,
        getting_insurance_providers: true,
        error: "",
      };
      break;

    case GET_INSURANCE_PROVIDERS.SUCCESS:
      state = {
        ...state,
        error: "",
        getting_insurance_providers: false,
        insurance_providers: action.payload.data,
      };
      break;

    case CLEAR_INSURANCE_PROVIDERS:
      state = {
        ...state,
        insurance_providers: [],
      };
      break;

    case FINALIZE_RATE_REQUEST.REQUEST:
      state = {
        ...state,
        finalizing_rate_request: true,
        error: "",
      };
      break;

    case FINALIZE_RATE_REQUEST.SUCCESS:
      state = {
        ...state,
        error: "",
        finalizing_rate_request: false,
      };
      break;

    case UPLOAD_RATES_DOCS.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case UPLOAD_RATES_DOCS.SUCCESS:
      state = {
        ...state,
        error: "",
        loading: false,
        rate_data: action.payload.data,
      };
      break;

    case UPLOAD_CARGO_DETAILS.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case UPLOAD_CARGO_DETAILS.SUCCESS:
      state = {
        ...state,
        error: "",
        loading: false,
        rate_data: action.payload.data,
      };
      break;

    case UPLOAD_ADDITIONAL_SERVICES.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case UPLOAD_ADDITIONAL_SERVICES.SUCCESS:
      state = {
        ...state,
        error: "",
        loading: false,
        rate_data: {},
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
      };
      break;

    case SAVE_LIVE_RATES_SELECTION.SUCCESS:
      state = {
        ...state,
        saving_live_rates_selection: false,
        error: "",
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

    case REQUEST_SHIPPING_FORM.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case REQUEST_SHIPPING_FORM.SUCCESS:
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

export default rate;
