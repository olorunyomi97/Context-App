import {
  GET_TEAMMATES,
  INVITE_TEAMMATES,
  UPDATE_TEAMMATES,
  DELETE_TEAMMATES,
  API_ERROR,
} from "store/teammates/constants";

const initialState = {
  error: "",
  loading: true,
  table_loading: false,
  my_teammates: [],
  total_teammates: "",
  invite_loading: false,
  invite_message: "",
  invite_data: {},
  delete_loading: false,
};

const teammates = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_TEAMMATES.REQUEST:
      state = {
        ...state,
        table_loading: true,
      };
      break;

    case GET_TEAMMATES.SUCCESS:
      state = {
        ...state,
        loading: false,
        table_loading: false,
        error: "",
        my_teammates: action.payload.data.customers,
        total_teammates: action.payload.data.total_customers,
      };
      break;

    case INVITE_TEAMMATES.REQUEST:
      state = {
        ...state,
        invite_loading: true,
      };
      break;

    case INVITE_TEAMMATES.SUCCESS:
      state = {
        ...state,
        error: "",
        invite_loading: false,
        invite_data: action.payload.data,
        invite_message: action.payload.data.message,
      };
      break;

    case UPDATE_TEAMMATES.REQUEST:
      state = {
        ...state,
        invite_loading: true,
      };
      break;

    case UPDATE_TEAMMATES.SUCCESS:
      state = {
        ...state,
        error: "",
        invite_loading: false,
        invite_data: action.payload.data,
        invite_message: action.payload.data.message,
      };
      break;

    case DELETE_TEAMMATES.REQUEST:
      state = {
        ...state,
        delete_loading: true,
      };
      break;

    case DELETE_TEAMMATES.SUCCESS:
      state = {
        ...state,
        delete_loading: false,
      };
      break;

    case API_ERROR:
      state = {
        ...state,
        loading: false,
        invite_loading: false,
        delete_loading: false,
        error: action.payload,
      };
      break;

    default:
      break;
  }

  return state;
};

export default teammates;
