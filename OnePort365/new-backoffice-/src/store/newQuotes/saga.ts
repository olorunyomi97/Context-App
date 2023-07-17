import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";
import newQuoteServices from "api/services/newQuotes";

import { GET_QUOTES, GET_NEW_SINGLE_QUOTE } from "./constants";
import { ResponseGenerator } from "store/type";
import { getNewQuotesSuccess, getNewSingleQuoteSuccess, NewQuotesApiError } from './actions';

function* doGetQuotes() {
    try {
        const response: ResponseGenerator = yield call(
            newQuoteServices.getNewQuotes
        );
        console.log("Quotes in Saga", response.data.data);
        yield put(getNewQuotesSuccess(response.data.data));
    } catch (error) {
        yield put(NewQuotesApiError(error));
    }
}

function* doGetNewSingeQuote({ payload }: any) {
    try {
        const { id } = payload;
        const response: ResponseGenerator = yield call(
            newQuoteServices.getNewSingleQuote,
            id
        );
        console.log(response.data.data);
        yield put(getNewSingleQuoteSuccess(response.data.data));
    } catch (error) {
        yield put(NewQuotesApiError(error));
    }
}

function* newQuotesSaga() {
    yield takeEvery(GET_QUOTES, doGetQuotes);
    yield takeEvery(GET_NEW_SINGLE_QUOTE, doGetNewSingeQuote);
}

export default newQuotesSaga;