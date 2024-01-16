import { get, post, put } from "helpers/axios";

import { changePasswordUrl, editProfileUrl } from "api/endpoints";

const changePassword = (data) => {
  return post(changePasswordUrl, data);
};

const editProfile = (data: any) => {
  return put(editProfileUrl, data);
};

const settingServices = {
  changePassword,
  editProfile,
};

export default settingServices;
