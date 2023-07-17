import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";

import contactServices from "api/services/contact";

import { GET_CONTACTS, GET_REQUEST_CONTACTS, UPDATE_MESSAGE_STATUS } from "./constant";
import { ResponseGenerator } from "store/type";
import { getContactsSuccess, getRequestContactsSuccess, updateStatusSuccess, ContactApiError } from "./actions";

function* doGetContacts() {
    try {
        const response: ResponseGenerator = yield call(contactServices.getContactUsContacts);
        yield put(getContactsSuccess(response));
    } catch(error) {
        yield put(ContactApiError(error));
    }
}

function* doGetRequestCallbackContacts() {
    try {
        const response: ResponseGenerator = yield call(contactServices.getRequestCallbackContacts);
        yield put(getRequestContactsSuccess(response));
    } catch(error) {
        yield put(ContactApiError(error));
    }
}

function* doUpdateStatus({payload} : any) {
    try {
        const { id, data } = payload;
        const response: ResponseGenerator = yield call(contactServices.updateMessageStatus, id, data)
        cogoToast.success('Message Status Successfully Updated')
        window.location.replace(`${window.location.origin}/contacts`);
        if (response.data) {
            yield put(updateStatusSuccess(response.data));
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(ContactApiError(error));
    }
}

function* contactsSaga() {
    yield takeEvery(GET_CONTACTS, doGetContacts);
    yield takeEvery(GET_REQUEST_CONTACTS, doGetRequestCallbackContacts);
    yield takeEvery(UPDATE_MESSAGE_STATUS, doUpdateStatus);
}

export default contactsSaga;