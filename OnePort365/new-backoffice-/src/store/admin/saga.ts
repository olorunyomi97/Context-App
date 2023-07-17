import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";

import adminServices from "api/services/admin";

import { GET_ADMINS, CREATE_ADMIN, DELETE_ADMIN, DEACTIVATE_ADMIN } from "./constants";
import { ResponseGenerator } from "store/type";
import { getAdminsSuccess, createAdminSuccess, deleteAdminSuccess, deactivateAdminSuccess, AdminApiError } from "./actions";

function* doGetAdmins() {
    try {
        // const { data, callback } = payload;
        const response: ResponseGenerator = yield call(adminServices.getAdmins);
        // console.log('Admins in Saga', response.data.data);
        yield put(getAdminsSuccess(response));
    } catch (error) {
        yield put(AdminApiError(error));
    }
}

function* doCreateAdmins({ payload }: any) {
    try {
        const { data } = payload;
        const response: ResponseGenerator = yield call(adminServices.createAdmins, data)

        if (response.data.status === "success") {
            yield put(createAdminSuccess(response.data));
      
            cogoToast.success("Admin Successfully Created")

            window.location.replace(`${window.location.origin}/admins`);
            // .then(() => {
            //     setTimeout(function () {
            //         window.location.replace('/admins');
            //     }, 1000);
            // });
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(AdminApiError(error));
    }
}

function* doDeleteAdmin({ payload }: any)  {
    try {
        const { id } = payload;
        console.log(id)
        const response: ResponseGenerator = yield call(adminServices.deleteAdmins, id)
        cogoToast.success('Admin successfully Deleted')
        window.location.replace(`${window.location.origin}/admins`);
        // .then(() => {
        //     setTimeout(function () {
        //         window.location.replace('/admins');
        //     }, 1000);
        // });
        if (response.data) {
            yield put(deleteAdminSuccess(response.data));
        }
        
    } catch (error) {
        const message = error["response"] || error.message || "network error";
        cogoToast.error(message);
        yield put(AdminApiError(error));
    }
}

function* doDeactivateAdmin({ payload }: any)  {
    try {
        const { id, data } = payload;
        console.log(id)
        const response: ResponseGenerator = yield call(adminServices.deactivateAdmins, id, data)
        cogoToast.success('Admin Status Successfully Toggled')
        window.location.replace(`${window.location.origin}/admins`);
        // .then(() => {
        //     setTimeout(function () {
        //         window.location.replace('/admins');
        //     }, 1000);
        // });
        if (response.data) {
            yield put(deactivateAdminSuccess(response.data));
        }
        
    } catch (error) {
        const message = error["response"] || error.message || "network error";
        cogoToast.error(message);
        yield put(AdminApiError(error));
    }
}

function* adminsSaga() {
    yield takeEvery(GET_ADMINS, doGetAdmins);
    yield takeEvery(CREATE_ADMIN, doCreateAdmins);
    yield takeEvery(DELETE_ADMIN, doDeleteAdmin);
    yield takeEvery(DEACTIVATE_ADMIN, doDeactivateAdmin);
}

export default adminsSaga;