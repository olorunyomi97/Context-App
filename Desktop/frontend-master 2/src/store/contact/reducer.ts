import { LEAVE_MESSAGE, REQUEST_CALL_BACK } from "store/contact/constants";

const initialState = {
  error: "",
  loading: false,
};

const contact = (state = initialState, action: any) => {
  switch (action.type) {
    case LEAVE_MESSAGE.REQUEST:
      state = { ...state, loading: true, error: "" };
      break;

    case REQUEST_CALL_BACK.REQUEST:
      state = { ...state, loading: true, error: "" };
      break;

    case LEAVE_MESSAGE.SUCCESS:
      state = { ...state, loading: false, error: "" };
      break;

    case REQUEST_CALL_BACK.SUCCESS:
      state = { ...state, loading: false, error: "" };
      break;

    case REQUEST_CALL_BACK.FAILURE:
      state = { ...state, loading: false, error: action.payload.error };
      break;

    default:
      break;
  }
  return state;
};

export default contact;
