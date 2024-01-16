import {
  GET_INSURANCE,
  SELECT_ADDITIONAL_SERVICES,
  GET_BOOKING_SUMMARY,
  CONFIRM_BOOKING,
  API_ERROR
} from "store/additionalDetails/constants";

const initialState = {
  error: "",
  apiError: null,
  loading: false,
  confirming_booking: false,
  select_loading: false,
  // booking_loading: false,
  insurance: [],
  additional_services: {},
  booking_summary: {},
  booking_confirmed: {}
};

const additionalDetails = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_INSURANCE.REQUEST:
      state = {
        ...state,
        loading: true,
        // select_loading: true,
        // booking_loading: true,
        error: "",
      };
      break;

    case CONFIRM_BOOKING.REQUEST:
      state = {
        ...state,
        confirming_booking: true,
        error: "",
      };
      break;

    case GET_BOOKING_SUMMARY.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case SELECT_ADDITIONAL_SERVICES.REQUEST:
      state = {
        ...state,
        select_loading: true,
        // booking_loading: true,
        error: "",
      };
      break;

    case GET_INSURANCE.SUCCESS:
      state = {
        ...state,
        loading: false,
        // select_loading: false,
        error: "",
        insurance: action.payload,
      };
      break;

    case SELECT_ADDITIONAL_SERVICES.SUCCESS:
      state = {
        ...state,
        // loading: false,
        // booking_loading: false,
        error: "",
        select_loading: false,
        additional_services: action.payload,
      };
      break;

    case GET_BOOKING_SUMMARY.SUCCESS:
      state = {
        ...state,
        loading: false,
        error: "",
        booking_summary: action.payload,
      };
      break;

    case CONFIRM_BOOKING.SUCCESS:
      state = {
        ...state,
        confirming_booking: false,
        booking_confirmed: action.payload.data,
        error: "",
      };
      break;

    case API_ERROR:
      state = {
        ...state,
        loading: false,
        confirming_booking: false,
        error: "error",
      };
      break;

    case CONFIRM_BOOKING.FAILURE:
      state = {
        ...state,
        loading: false,
        confirming_booking: false,
        error: "error",
      };
      break;

    case GET_INSURANCE.FAILURE ||
      SELECT_ADDITIONAL_SERVICES.FAILURE ||
      GET_BOOKING_SUMMARY.FAILURE:
      state = {
        ...state,
        loading: false,
        confirming_booking: false,
        error: "error",
      };
      break;

    default:
      break;
  }
  return state;
};

export default additionalDetails;
