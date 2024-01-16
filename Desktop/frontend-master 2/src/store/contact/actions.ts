import { LEAVE_MESSAGE, REQUEST_CALL_BACK } from "store/contact/constants";

export const leaveMessage = (data: any, callback: any) => {
  return {
    type: LEAVE_MESSAGE.REQUEST,
    payload: { data, callback },
  };
};

export const leaveMessageSuccess = (response: any) => {
  return {
    type: LEAVE_MESSAGE.SUCCESS,
    payload: response,
  };
};

export const requestCallBack = (data: any, callback: any) => {
  return {
    type: REQUEST_CALL_BACK.REQUEST,
    payload: { data, callback },
  };
};
export const requestCallBackError = (data?: any) => {
  return {
    type: REQUEST_CALL_BACK.FAILURE,
    payload: { data },
  };
};

export const requestCallBackSuccess = (response: any) => {
  return {
    type: REQUEST_CALL_BACK.SUCCESS,
    payload: response,
  };
};
