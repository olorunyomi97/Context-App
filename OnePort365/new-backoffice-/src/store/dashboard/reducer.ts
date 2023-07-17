import { GET_DASHBOARD_ANALYTICS_SUCCESS, GET_DASHBOARD_UPDATES_SUCCESS, API_ERROR } from "./constants";

const initialState = {
    error: null,
    loading: true,
    dashboard_analytics: {},
    dashboard_updates: {},
}

const dashboard = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_DASHBOARD_ANALYTICS_SUCCESS:
            return {
                ...state,
                loading: false,
                dashboard_analytics: action.payload,
            }
        // case GET_DASHBOARD_ANALYTICS_SUCCESS:
        //     return {
        //         ...state,
        //         loading: false,
        //         dashboard_updates: action.payload.data,
        //     }
        case API_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        default:
            return state;
    }

}

export default dashboard;