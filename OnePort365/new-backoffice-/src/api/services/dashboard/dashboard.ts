import { get } from "helpers/axios";
import { getDashboardAnalyticsUrl, getDashboardUpdatesUrl } from "api/endpoints";

const getDashboardAnalytics = () => {
    return get(getDashboardAnalyticsUrl);
}

const getDashboardUpdates = () => {
    return get(getDashboardUpdatesUrl);
}

const dashboardServices = {
    getDashboardAnalytics,
    getDashboardUpdates
}

export default dashboardServices;