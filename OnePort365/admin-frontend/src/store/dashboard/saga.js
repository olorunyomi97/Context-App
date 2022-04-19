import { call, put, takeEvery, all, fork } from "redux-saga/effects";

 


export function* watchGetChartsData() {
}

function* dashboardSaga() {
    yield all([fork(watchGetChartsData)]);
}

export default dashboardSaga;
