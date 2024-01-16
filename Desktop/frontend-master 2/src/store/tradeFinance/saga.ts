import { call, put, takeEvery } from "redux-saga/effects";
import { ResponseGenerator } from "store/type";

//constants
import { CREATE_LOAN_APPLICATION } from "store/tradeFinance/constants";

//services
import tradeFinanceServices from "api/services/tradeFinance";

//actions
import { createLoanApplicationSuccess, tradeFinanceApiError } from "./actions";

//handler
import { errorHandler } from "helpers/errorHandler";

function* createLoanApplicationRequest({ payload }: any) {
  try {
    const { data, callback } = payload;

    const response: ResponseGenerator = yield call(
      tradeFinanceServices.createLoanApplication,
      data
    );

    if (response.data) {
      yield put(createLoanApplicationSuccess(response.data));

      if (callback === "home") {
        window.location.replace(
          `${window.location.origin}/get-rate?shipment-type=${data.shipment_type}&id=${response.data.data._id}`
        );
      } else {
        callback();
      }
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(tradeFinanceApiError(message));
  }
}

function* tradeFinanceSaga() {
  yield takeEvery(
    CREATE_LOAN_APPLICATION.REQUEST,
    createLoanApplicationRequest
  );
}

export default tradeFinanceSaga;
