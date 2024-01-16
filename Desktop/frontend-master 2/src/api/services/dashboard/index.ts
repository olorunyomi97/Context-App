import { get } from "helpers/axios";

import {
  getDashboardParametersUrl,
  getPendingDashboardQuotesUrl,
} from "api/endpoints";

const getPendingDashboardQuotes = () => {
  return get(getPendingDashboardQuotesUrl);
};

const getDashboardParams = () => {
  return get(getDashboardParametersUrl);
};

const dashboardServices = {
  getPendingDashboardQuotes,
  getDashboardParams,
};

export default dashboardServices;
