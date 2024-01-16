import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

//services
import invoiceServices from "api/services/invoices";

//helpers
import { errorHandler } from "helpers/errorHandler";

//redux
import {
  GET_INVOICES,
  GET_INVOICE_BY_ID,
  GET_INVOICE_BY_RATE_ID,
  UPLOAD_PROOF_OF_PAYMENT,
  INITIALIZE_PAYMENT,
  COMPLETE_PAYMENT,
  GET_INVOICE_BY_TRX,
} from "store/invoice/constants";
import { ResponseGenerator } from "store/type";
import {
  getMyInvoicesSuccess,
  getInvoiceByIdSuccess,
  getInvoiceByTrxSuccess,
  confirmPaymentSuccess,
  getInvoicesByRateIdSuccess,
  uploadProofOfPaymentSuccess,
  invoiceApiError,
} from "store/actions";

function* initiateInvoicesRequest() {
  try {
    const response: ResponseGenerator = yield call(
      invoiceServices.getMyInvoices
    );

    if (response.data) {
      yield put(getMyInvoicesSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(invoiceApiError(message));
  }
}

function* getInvoicesByRateId({ payload }: any) {
  try {
    const { id } = payload;

    const response: ResponseGenerator = yield call(
      invoiceServices.getInvoicesByRateId,
      id
    );

    if (response.data) {
      yield put(getInvoicesByRateIdSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);

    yield put(invoiceApiError(message));
  }
}

function* getInvoiceById({ payload }: any) {
  try {
    const { data } = payload;

    const response: ResponseGenerator = yield call(
      invoiceServices.getInvoiceById,
      data
    );

    if (response.data) {
      yield put(getInvoiceByIdSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);

    yield put(invoiceApiError(message));
  }
}

function* getInvoiceByTrx({ payload }: any) {
  try {
    const { trx_ref } = payload;

    const response: ResponseGenerator = yield call(
      invoiceServices.getInvoiceByTrx,
      trx_ref
    );

    if (response.data) {
      yield put(getInvoiceByTrxSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(invoiceApiError(message));
  }
}

function* uploadProofOfPayment({ payload }: any) {
  try {
    const { data, callback } = payload;

    const response: ResponseGenerator = yield call(
      invoiceServices.uploadProofOfPayment,
      data
    );

    if (response.data) {
      yield put(uploadProofOfPaymentSuccess(response.data));
      callback();
      window.location.replace(`${window.location.origin}/invoices`);
      toast.success("proof of payment uploaded successfully");
    }
  } catch (error) {
    const message = errorHandler(error);

    yield put(invoiceApiError(message));
  }
}

function* initializePayment({ payload }: any) {
  try {
    const { data } = payload;

    const response: ResponseGenerator = yield call(
      invoiceServices.initializePayment,
      data
    );

    if (response.data) {
      window.location.replace(response.data.data.data.authorization_url);
    }
  } catch (error) {
    const message = errorHandler(error);

    yield put(invoiceApiError(message));
  }
}

function* completePayment({ payload }: any) {
  try {
    const { data } = payload;

    const response: ResponseGenerator = yield call(
      invoiceServices.completePayment,
      data
    );

    if (response.data) {
      yield put(confirmPaymentSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);

    yield put(invoiceApiError(message));
  }
}

function* invoiceSaga() {
  yield takeEvery(GET_INVOICES.REQUEST, initiateInvoicesRequest);
  yield takeEvery(GET_INVOICE_BY_RATE_ID.REQUEST, getInvoicesByRateId);
  yield takeEvery(GET_INVOICE_BY_ID.REQUEST, getInvoiceById);
  yield takeEvery(UPLOAD_PROOF_OF_PAYMENT.REQUEST, uploadProofOfPayment);
  yield takeEvery(INITIALIZE_PAYMENT.REQUEST, initializePayment);
  yield takeEvery(COMPLETE_PAYMENT.REQUEST, completePayment);
  yield takeEvery(GET_INVOICE_BY_TRX.REQUEST, getInvoiceByTrx);
}

export default invoiceSaga;
