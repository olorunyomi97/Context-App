import {
  GET_DATASHEET_BY_ID,
  COMPLETE_DATASHEET,
  API_ERROR,
} from "store/shipmentDataSheet/constants";

export const getDataSheetById = (data: string, callback: any) => {
  return {
    type: GET_DATASHEET_BY_ID.REQUEST,
    payload: { data, callback },
  };
};

export const getDataSheetByIdSuccess = (response: any) => {
  return {
    type: GET_DATASHEET_BY_ID.SUCCESS,
    payload: response,
  };
};

export const completeDatasheet = (data: any, callback: any) => {
  return {
    type: COMPLETE_DATASHEET.REQUEST,
    payload: { data, callback },
  };
};

export const completeDataSheetSuccess = (response: any) => {
  return {
    type: COMPLETE_DATASHEET.SUCCESS,
    payload: response,
  };
};

export const dataSheetApiError = (error: any) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
