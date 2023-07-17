import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";

import JobNumberServices from "api/services/jobNumberGenerator";

import { GENERATE_JOB_NUMBER } from "./constants";
import { ResponseGenerator } from "store/type";
import { generateJobNumberSuccess, JobNumApiError } from "./actions";

function* generateJobNumber({ payload }: any) {
    try {
        const { data } = payload;
        const response: ResponseGenerator = yield call(JobNumberServices.generateJobNumber, data);

        if (response.data) {
            yield put(generateJobNumberSuccess(response.data))
            console.log(response.data);

             setTimeout(function () {
                window.location.replace('/admins');
            }, 2000);

        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";

        cogoToast.error(message);

        yield put(JobNumApiError(message));
    }
}

function* jobNumberGeneratorSaga() {
    yield takeEvery(GENERATE_JOB_NUMBER, generateJobNumber);
}

export default jobNumberGeneratorSaga