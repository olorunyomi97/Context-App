import {
  GET_QUOTES,
  GET_QUOTE_BY_ID,
  ACCEPT_QUOTE,
  REQUEST_FOLLOW_UP,
  API_ERROR,
} from "store/quote/constants";

const initialState = {
  error: "",
  loading: false,
  accepting_quote: false,
  requesting_follow_up: false,
  my_quotes: [],
  quote_data: {},
};

const quote = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_QUOTES.REQUEST || GET_QUOTE_BY_ID.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;
    case GET_QUOTES.SUCCESS:
      state = {
        ...state,
        loading: false,
        error: "",
        my_quotes: action.payload.data,
      };
      break;
    case GET_QUOTE_BY_ID.SUCCESS:
      state = {
        ...state,
        loading: false,
        quote_data: action.payload.data,
      };
      break;
    case ACCEPT_QUOTE.REQUEST:
      state = {
        ...state,
        accepting_quote: true,
        error: "",
      };
      break;
    case ACCEPT_QUOTE.SUCCESS:
      state = {
        ...state,
        accepting_quote: false,
        error: "",
      };
      break;

    case REQUEST_FOLLOW_UP.REQUEST:
      state = {
        ...state,
        requesting_follow_up: true,
        error: "",
      };
      break;
    case REQUEST_FOLLOW_UP.SUCCESS:
      state = {
        ...state,
        requesting_follow_up: false,
        error: "",
      };
      break;

    case API_ERROR:
      state = {
        ...state,
        error: action.payload,
        loading: false,
        accepting_quote: false,
        requesting_follow_up: false,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default quote;
