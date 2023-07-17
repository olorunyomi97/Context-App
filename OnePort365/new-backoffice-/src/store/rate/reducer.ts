import {
  INITIATE_RATE_REQUEST,
  UPLOAD_RATES_DOCS,
  UPLOAD_CARGO_DETAILS,
  UPLOAD_ADDITIONAL_SERVICES,
  REQUEST_SHIPPING_FORM,
  API_ERROR,
  CLEAR_API_ERROR,
} from "store/rate/constants";

const initialState = {
  error: "",
  loading: false,
  rate_data: null,
};

const rate = (state = initialState, action: any) => {
  switch (action.type) {
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
        rate_data: action.payload.data,
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
