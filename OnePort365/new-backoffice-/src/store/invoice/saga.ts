import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";

import invoiceServices from "api/services/invoices";

import { GET_ALL_INVOICES, GET_SINGLE_INVOICE, ATTACH_INVOICE, ATTACH_PROOF_OF_PAYMENT, GET_SINGLE_INVOICE_DETAILS, DELETE_INVOICE } from "./constant";
import { ResponseGenerator } from "store/type";
import { getInvoiceSuccess, getSingleInvoiceSuccess, getSingleInvoiceDetailsSuccess, attachInvoiceSuccess, attachProofOfPaymentSuccess, deleteInvoiceSuccess, InvoiceApiError } from "./actions";

function* doGetInvoices() {
    try {
        const response: ResponseGenerator = yield call(invoiceServices.getInvoices);
        yield put (getInvoiceSuccess(response.data.data));
    } catch(error) {
        yield put(InvoiceApiError(error));
    }
}

function* doGetSingleInvoice({ payload } :any) {
    try {
        const { id } = payload
        const response: ResponseGenerator = yield call(invoiceServices.getSingleInvoice, id)
        console.log(response.data.data)
        yield put(getSingleInvoiceSuccess(response));
    }  catch(error) {
        yield put(InvoiceApiError(error));
    }
}

function* doGetSingleInvoiceDetails({ payload } :any) {
    try {
        const { data } = payload
        const response: ResponseGenerator = yield call(invoiceServices.getSingleInvoiceDetails, data)
        console.log(response.data.data)
        yield put(getSingleInvoiceDetailsSuccess(response));
    }  catch(error) {
        yield put(InvoiceApiError(error));
    }
}

function* doAttachInvoice({ payload }: any) {
    try {
        const { data, callback } = payload;
        const response: ResponseGenerator = yield call(invoiceServices.attachInvoice, data);

        if (response.data) {
            yield put(attachInvoiceSuccess(response.data));
            console.log(response.data.data)
            console.log(response.data.data._id)
            cogoToast.success('Invoice Attached Successfully');
            // window.location.reload();
            // window.location.replace(`${window.location.origin}/invoices`);
            window.location.replace(`${window.location.origin}/shipment-invoice/${data.id}`);
            callback();
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(InvoiceApiError(message));
    }
}

function* doAttachProofOfPayment({ payload }: any) {
    try {
        const { data, callback } = payload;
        const response: ResponseGenerator = yield call(invoiceServices.attachProofOfPayment, data);

        if (response.data) {
            yield put(attachProofOfPaymentSuccess(response.data));
            console.log(response.data.data)
            console.log(response.data.data._id)
            cogoToast.success('Proof Of Payment Attached Successfully');
            // window.location.replace(`${window.location.origin}/shipment-invoice/${data.id}`);
            callback();
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(InvoiceApiError(message));
    }
}


function* doDeleteInvoice({ payload }: any)  {
    try {
        const { id } = payload;
        console.log(id)
        const response: ResponseGenerator = yield call(invoiceServices.deleteInvoice, id)
        cogoToast.success('Invoice successfully Deleted')
        // window.location.replace(`${window.location.origin}/invoices`);
        if (response.data) {
            yield put(deleteInvoiceSuccess(response.data));
        }
        
    } catch (error) {
        const message = error["response"] || error.message || "network error";
        cogoToast.error(message);
        yield put(InvoiceApiError(error));
    }
}

function* invoiceSaga() {
    yield takeEvery(GET_ALL_INVOICES, doGetInvoices);
    yield takeEvery(GET_SINGLE_INVOICE, doGetSingleInvoice);
    yield takeEvery(GET_SINGLE_INVOICE_DETAILS, doGetSingleInvoiceDetails);
    yield takeEvery(ATTACH_INVOICE, doAttachInvoice);
    yield takeEvery(ATTACH_PROOF_OF_PAYMENT, doAttachProofOfPayment);
    yield takeEvery(DELETE_INVOICE, doDeleteInvoice);
}

export default invoiceSaga;