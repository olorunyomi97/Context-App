import {
  GET_DATASHEET_BY_ID,
  COMPLETE_DATASHEET,
  API_ERROR,
} from "store/shipmentDataSheet/constants";

const initialState = {
  error: "",
  fetching_datasheet: false,
  completing_datasheet: false,
  datasheet_data: {},
  specific_datasheet_section: {},
};

const shipmentDataSheet = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_DATASHEET_BY_ID.REQUEST:
      state = {
        ...state,
        fetching_datasheet: true,
        error: "",
      };
      break;

    case GET_DATASHEET_BY_ID.SUCCESS:
      state = {
        ...state,
        fetching_datasheet: false,
        error: "",
        datasheet_data: action.payload.data,
        specific_datasheet_section:
          action.payload.data.specific_datasheet_section,
      };
      break;

    case COMPLETE_DATASHEET.REQUEST:
      state = {
        ...state,
        completing_datasheet: true,
        error: "",
      };
      break;

    case COMPLETE_DATASHEET.SUCCESS:
      state = {
        ...state,
        completing_datasheet: false,
        error: "",
        datasheet_data: action.payload.data,
        specific_datasheet_section:
          action.payload.data.specific_datasheet_section,
      };
      break;

    case API_ERROR:
      state = {
        ...state,
        error: action.payload,
        fetching_datasheet: false,
        completing_datasheet: false,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default shipmentDataSheet;
