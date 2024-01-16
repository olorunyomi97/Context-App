import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

//services
import dashboardServices from "api/services/dashboard";

//redux
import {
	GET_DASHBOARD_PARAMS,
	GET_PENDING_DASHBOARD_QUOTES,
} from "store/dashboard/constants";
import { ResponseGenerator } from "store/type";
import {
	getDashboardParamsSuccess,
	getPendingDashboardQuotesSuccess,
	dashboardApiError,
} from "store/dashboard/actions";

//helpers
import { errorHandler } from "helpers/errorHandler";

function* initiatePendingDashboardQuotesRequest() {
	try {
		const response: ResponseGenerator = yield call(
			dashboardServices.getPendingDashboardQuotes
		);

		if (response.data) {
			yield put(getPendingDashboardQuotesSuccess(response.data));
		}
	} catch (error) {
		const message = errorHandler(error);
		yield put(dashboardApiError(message));
	}
}

function* initiateDashboardParamsRequest() {
	try {
		console.log("heyyy there>>>");
		const response: ResponseGenerator = yield call(
			dashboardServices.getDashboardParams
		);

		if (response.data) {
			yield put(getDashboardParamsSuccess(response.data));
		}
	} catch (error) {
		const message = errorHandler(error);
		yield put(dashboardApiError(message));
	}
}

function* dashboardSaga() {
	yield takeEvery(
		GET_PENDING_DASHBOARD_QUOTES.REQUEST,
		initiatePendingDashboardQuotesRequest
	);
	yield takeEvery(GET_DASHBOARD_PARAMS.REQUEST, initiateDashboardParamsRequest);
}

export default dashboardSaga;
