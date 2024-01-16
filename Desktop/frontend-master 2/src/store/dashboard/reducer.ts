import {
  GET_DASHBOARD_PARAMS,
  GET_PENDING_DASHBOARD_QUOTES,
  API_ERROR,
} from "store/dashboard/constants";

const initialState = {
  error: "",
  loading: false,
  dashboard_params: {},
  pending_dashboard_quote: {},
};

const dashboard = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_DASHBOARD_PARAMS.REQUEST || GET_PENDING_DASHBOARD_QUOTES.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case GET_PENDING_DASHBOARD_QUOTES.SUCCESS:
      state = {
        ...state,
        loading: false,
        error: "",
        pending_dashboard_quote: action.payload.data,
      };
      break;

    case GET_DASHBOARD_PARAMS.SUCCESS: {
      state = {
        ...state,
        loading: false,
        error: "",
        dashboard_params: action.payload.data,
      };
      break;
    }

    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default dashboard;
