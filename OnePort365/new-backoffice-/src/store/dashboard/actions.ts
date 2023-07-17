import {
    GET_DASHBOARD_ANALYTICS,
    GET_DASHBOARD_ANALYTICS_SUCCESS,
    GET_DASHBOARD_UPDATES,
    GET_DASHBOARD_UPDATES_SUCCESS,
    API_ERROR
} from "./constants";

export const getDashboardAnalytics = () => {
    return {
        type: GET_DASHBOARD_ANALYTICS,
    }
}

export const getDashboardAnalyticsSuccess = (response: any) => {
    return {
        type: GET_DASHBOARD_ANALYTICS_SUCCESS,
        payload: response,
    }
}

// export const getDashboardUpdates = () => {
//     return {
//         type: GET_DASHBOARD_UPDATES,
//     }
// }

// export const getDashboardUpdatesSuccess = (response: any) => {
//     return {
//         type: GET_DASHBOARD_UPDATES_SUCCESS,
//         payload: response,
//     }
// }

export const DashboardApiError = (error: any) => {
    return {
        type: API_ERROR,
        payload: error,
    };
}