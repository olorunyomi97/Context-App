import { post } from "helpers/axios";
import { leaveMessageUrl, requestCallBackUrl } from "api/endpoints";

const leaveMessage = (data) => {
  return post(leaveMessageUrl, data);
};

const requestCallBack = (data: any) => {
  return post(`${requestCallBackUrl}`, data);
};

const contactServices = {
  leaveMessage,
  requestCallBack,
};

export default contactServices;
