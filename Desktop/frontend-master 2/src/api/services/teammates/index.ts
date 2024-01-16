import {
  getTeammatesUrl,
  inviteTeammatesUrl,
  updateTeammateUrl,
  deleteTeammatesUrl,
} from "api/endpoints";

import { get, post, put, del } from "helpers/axios";

const getTeammates = (data: any) => {
  /**if theres a query parameter in the url */
  if (data.filter_shipment !== undefined || data.job !== undefined) {
    return get(`${getTeammatesUrl}?${data.filter_string}`);
  }
  return get(getTeammatesUrl);
};

const inviteTeammates = (data: any) => {
  return post(inviteTeammatesUrl, data);
};

const updateTeammates = (data: any) => {
  return put(updateTeammateUrl + `/${data.id}`, data.data);
};

const deleteTeammates = (id: string) => {
  return del(deleteTeammatesUrl + `/${id}`);
};

const teammatesServices = {
  getTeammates,
  inviteTeammates,
  updateTeammates,
  deleteTeammates,
};

export default teammatesServices;
