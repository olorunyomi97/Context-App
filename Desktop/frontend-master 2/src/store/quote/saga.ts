import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

//services
import quoteServices from "api/services/quote";

//helpers
import { errorHandler } from "helpers/errorHandler";

//redux
import {
  GET_QUOTES,
  GET_QUOTE_BY_ID,
  ACCEPT_QUOTE,
  REQUEST_FOLLOW_UP,
} from "./constants";
import { ResponseGenerator } from "store/type";
import {
  getMyQuotesSuccess,
  getQuotesByIdSuccess,
  acceptQuoteSuccess,
  requestFollowUpSuccess,
  quoteApiError,
} from "store/actions";

function* initiateQuotesRequest() {
  try {
    const response: ResponseGenerator = yield call(quoteServices.getMyQuotes);

    if (response.data) {
      yield put(getMyQuotesSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(quoteApiError(message));
  }
}

function* getQuoteById({ payload }: any) {
  try {
    const { id } = payload;

    const response: ResponseGenerator = yield call(
      quoteServices.getQuoteById,
      id
    );

    if (response.data) {
      yield put(getQuotesByIdSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(quoteApiError(message));
  }
}

function* acceptQuote({ payload }: any) {
  try {
    const { data, callback } = payload;

    const response: ResponseGenerator = yield call(
      quoteServices.acceptQuote,
      data
    );
    if (response.data) {
      yield put(acceptQuoteSuccess(response.data));
      callback();
      window.location.replace(`${window.location.origin}/quotes`);
      toast.success("Quote accepted successfully");
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(quoteApiError(message));
  }
}

function* requestFollowUp({ payload }: any) {
  try {
    const { data } = payload;

    const response: ResponseGenerator = yield call(
      quoteServices.requestFollowUp,
      data
    );

    if (response.data) {
      yield put(requestFollowUpSuccess(response.data));
      toast.success("Follow up request sent successfully");
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(quoteApiError(message));
  }
}

function* quoteSaga() {
  yield takeEvery(GET_QUOTES.REQUEST, initiateQuotesRequest);
  yield takeEvery(GET_QUOTE_BY_ID.REQUEST, getQuoteById);
  yield takeEvery(ACCEPT_QUOTE.REQUEST, acceptQuote);
  yield takeEvery(REQUEST_FOLLOW_UP.REQUEST, requestFollowUp);
}

export default quoteSaga;
