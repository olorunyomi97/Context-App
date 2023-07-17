import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";

import containerServices from "api/services/containers";

import { GET_CONTAINERS } from "./constants";
import { ResponseGenerator } from "store/type";
import { getContainersuccess, ContainerApiError } from "./actions";

function* goGetContainers({ payload }: any) {
    try {
        const { data } = payload
        const response: ResponseGenerator = yield call(containerServices.getContainers, data);
        yield put(getContainersuccess(response.data.data));
    } catch (error) {
        yield put(ContainerApiError(error));
    }
}


function* containersSaga() {
    yield takeEvery(GET_CONTAINERS, goGetContainers);
}

export default containersSaga;