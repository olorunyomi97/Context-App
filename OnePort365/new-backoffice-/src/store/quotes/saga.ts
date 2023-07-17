import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";

import quoteServices from "api/services/quotes";

import { GET_ALL_QUOTES, GET_MY_QUOTES, GET_MY_CREATED_QUOTES, GET_PENDING_ADMIN_QUOTES, PROCESS_PENDING_ADMIN_QUOTES ,GET_PENDING_CUSTOMER_QUOTES, GET_ACCEPTED_QUOTES, FILTER_QUOTES, GET_SINGLE_QUOTE, ATTACH_QUOTE } from "./constant";
import { ResponseGenerator } from "store/type";
import { getQuotesSuccess, getMyQuotesSuccess, getCreatedQuotesSuccess, getPendingAdminQuotesSuccess, processPendingAdminQuotesSuccess,getPendingCustomerQuotesSuccess, getAcceptedQuotesSuccess, filterQuotesSuccess,getSingleQuoteSuccess,attachQuoteSuccess, QuoteApiError } from "./actions";

function* doGetQuotes({payload} :any) {
    try {

        console.log(payload)
        
        const response: ResponseGenerator = yield call(quoteServices.getQuotes, payload);
        yield put(getQuotesSuccess(response));
    } catch(error) {
        yield put(QuoteApiError(error));
    }
}

function* doGetMyQuotes({payload} :any) {
    try {
        const response: ResponseGenerator = yield call(quoteServices.getMyQuotes, payload);
        yield put(getMyQuotesSuccess(response));
    } catch(error) {
        yield put(QuoteApiError(error));
    }
}

function* doGetCreatedQuotes({payload} :any) {
    try {
        const response: ResponseGenerator = yield call(quoteServices.getCreatedQuotes, payload);
        yield put(getCreatedQuotesSuccess(response));
    } catch(error) {
        yield put(QuoteApiError(error));
    }
}

function* doGetPendingAdminQuotes({payload} :any) {
    try {
        const response: ResponseGenerator = yield call(quoteServices.getPendingAdminQuotes, payload);
        yield put(getPendingAdminQuotesSuccess(response));
    } catch(error) {
        yield put(QuoteApiError(error));
    }
}


function* doGetPendingCustomersQuotes({payload} :any) {
    try {
        const response: ResponseGenerator = yield call(quoteServices.getPendingCustomerQuotes, payload);
        yield put(getPendingCustomerQuotesSuccess(response));
    } catch(error) {
        yield put(QuoteApiError(error));
    }
}

function* doGetAcceptedQuotes({payload} :any) {
    try {
        const response: ResponseGenerator = yield call(quoteServices.getAcceptedQuotes, payload);
        yield put(getAcceptedQuotesSuccess(response));
    } catch(error) {
        yield put(QuoteApiError(error));
    }
}

function* doProcessPendingAdminQuotes({ payload } :any) {
    try {
        const { id } = payload
        const response: ResponseGenerator = yield call(quoteServices.processPendingAdminQuotes, id);
        console.log(response.data.data)
        if (response.data.status === "success") { 
            yield put(processPendingAdminQuotesSuccess(response));
    
            cogoToast.success('Quote data successfully assigned');
    
            window.location.replace(`${window.location.origin}/quote-details/${id}`);
        }
    } catch(error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";
        // cogoToast.error(message);
        yield put(QuoteApiError(error));
    }
}


function* doGetSingeQuote({ payload } :any) {
    try {
        const { id } = payload
        const response: ResponseGenerator = yield call(quoteServices.getSingleQuote, id);
        console.log(response.data.data)
        yield put(getSingleQuoteSuccess(response));
    }  catch(error) {
        yield put(QuoteApiError(error));
    }
}

function* doAttachQuote({ payload }: any) {
    try {
        const { data, callback } = payload;
        const response: ResponseGenerator = yield call(quoteServices.attachQuote, data);

        if (response.data) {
            yield put(attachQuoteSuccess(response.data));
            cogoToast.success('Quote Attached Successfully');
            window.location.reload();
            // window.location.replace(`${window.location.origin}/quotes`);
            callback();
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(QuoteApiError(message));
    }
}

function* doFilterQuotes() {
    try {
        const response: ResponseGenerator = yield call(quoteServices.filterQuotes);
        yield put(filterQuotesSuccess(response));
    } catch(error) {
        yield put(QuoteApiError(error));
    }
}


function* quotesSaga() {
    yield takeEvery(GET_ALL_QUOTES, doGetQuotes);
    yield takeEvery(GET_MY_QUOTES, doGetMyQuotes);
    yield takeEvery(GET_MY_CREATED_QUOTES, doGetCreatedQuotes);
    yield takeEvery(GET_PENDING_ADMIN_QUOTES, doGetPendingAdminQuotes);
    yield takeEvery(PROCESS_PENDING_ADMIN_QUOTES, doProcessPendingAdminQuotes);
    yield takeEvery(GET_PENDING_CUSTOMER_QUOTES, doGetPendingCustomersQuotes);
    yield takeEvery(GET_ACCEPTED_QUOTES, doGetAcceptedQuotes);
    yield takeEvery(GET_SINGLE_QUOTE, doGetSingeQuote);
    yield takeEvery(ATTACH_QUOTE, doAttachQuote);
    yield takeEvery(FILTER_QUOTES, doFilterQuotes);
}

export default quotesSaga;