import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";

import dashboardServices from "api/services/dashboard/dashboard";
import { GET_DASHBOARD_ANALYTICS } from "./constants";
import { ResponseGenerator } from "store/type";
import { getDashboardAnalyticsSuccess, DashboardApiError } from "./actions";

function* doGetDashboardAnalytics() {
    try {
        const response: ResponseGenerator = yield call(dashboardServices.getDashboardAnalytics);
        yield put(getDashboardAnalyticsSuccess(response.data.data));
    } catch (error) {
        yield put(DashboardApiError(error));
    }
}


// function* doGetDashboardUpdates() {
//     try {
//         const response: ResponseGenerator = yield call(dashboardServices.getDashboardUpdates);
//         yield put(getDashboardUpdatesSuccess(response));
//     } catch (error) {
//         yield put(DashboardApiError(error));
//     }
// }

function* dashboardSaga() {
    yield takeEvery(GET_DASHBOARD_ANALYTICS, doGetDashboardAnalytics);
    // yield takeEvery(GET_DASHBOARD_UPDATES, doGetDashboardUpdates);
}

export default dashboardSaga;