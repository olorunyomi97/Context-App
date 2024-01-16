import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

//actions
import { GET_TRIP_EVENTS_BY_ID } from "./constants";

//services
import trackingServices from "api/services/tracking";

import { ResponseGenerator } from "store/type";

import {
    trackingApiError,
    getTripEventsByIdSuccess
} from "./actions";

//helpers
import mixpanel from "helpers/mixpanel";
import { errorHandler } from "helpers/errorHandler";

function* getTripEventsById({ payload }: any) {
    try {
        const { id } = payload;

        const response: ResponseGenerator = yield call(
            trackingServices.getTripEventsById,
            id
        );

        if (response.data) {
            yield put(getTripEventsByIdSuccess(response.data));
        }
    } catch (error) {
        const message = errorHandler(error, false);
        yield put(trackingApiError(message));
    }
}



function* trackingSaga() {
    yield takeEvery(GET_TRIP_EVENTS_BY_ID.REQUEST, getTripEventsById);
}

export default trackingSaga;