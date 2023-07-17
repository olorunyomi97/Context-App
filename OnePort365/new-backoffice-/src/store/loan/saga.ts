import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";

import loanApplicationServices from "api/services/loanApplication";

import { GET_LOAN_APPLICATIONS, GET_SINGLE_LOAN_APPLICATION, UPDATE_LOAN_PAYMENT_STATUS } from "./constants";
import { ResponseGenerator } from "store/type";
import { getLoanApplicationSuccess, getSingleLoanApplicationSuccess, updateLoanPaymentStatusSuccess, LoanApplicationApiError } from "./actions";

function* doGetLoanApplication() {
    try {
        const response: ResponseGenerator = yield call(loanApplicationServices.getLoanApplications);
        // console.log('Loan Appli... in Saga', response.data.data);
        yield put(getLoanApplicationSuccess(response.data.data));
    } catch (error) {
        yield put(LoanApplicationApiError(error));
    }
}

function* doGetSingleLoanApplication({ payload } :any) {
    try {
        const { id } = payload
        const response: ResponseGenerator = yield call(loanApplicationServices.getSingleLoanApplication, id);
        // console.log(response.data.data)
        yield put(getSingleLoanApplicationSuccess(response.data.data));
    }  catch(error) {
        yield put(LoanApplicationApiError(error));
    }
}

function* doUpdateLoanPaymentStatus({ payload }: any) {
    try {
        // console.log(payload)
        // const edit_payload = { ...payload.data, ...payload.callback };
        // console.log(edit_payload)
        const { data } = payload;
        console.log(data)
        const response: ResponseGenerator = yield call(loanApplicationServices.updateLoanPaymentStatus, data)

        if (response.data.status === "success") {
            yield put(updateLoanPaymentStatusSuccess(response.data.data));
            cogoToast.success("Loan Payment Status Successfully Updated")
            window.location.replace(`${window.location.origin}/loan-application-details/${data.id}`);
            // callback();
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(LoanApplicationApiError(error));
    }
}


function* loanApplicationsSaga() {
    yield takeEvery(GET_LOAN_APPLICATIONS, doGetLoanApplication);
    yield takeEvery(GET_SINGLE_LOAN_APPLICATION, doGetSingleLoanApplication);
    yield takeEvery(UPDATE_LOAN_PAYMENT_STATUS, doUpdateLoanPaymentStatus);
}

export default loanApplicationsSaga;