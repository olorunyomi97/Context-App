import {
  CREATE_LOAN_APPLICATION,
  API_ERROR,
} from "store/tradeFinance/constants";

const initialState = {
  error: "",
  loading: false,
  loan_data: {},
  loan_message: "",
};

const tradeFinance = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_LOAN_APPLICATION.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case CREATE_LOAN_APPLICATION.SUCCESS:
      state = {
        ...state,
        error: "",
        loading: false,
        loan_data: action.payload.data,
        loan_message: action.payload.data.message,
      };
      break;

    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;

    default:
      state = { ...state };
      break;
  }

  return state;
};

export default tradeFinance;
