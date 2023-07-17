import { all, fork } from "redux-saga/effects";

//public
import authSaga from "store/auth/saga";
import rateSaga from "store/rate/saga";
import adminsSaga from "./admin/saga";
import customersSaga from "./customer/saga";
import quotesSaga from "./quotes/saga";
import shipmentsSaga from "./shipments/saga";
import shipmentsPlusSaga from "./shipmentsPlus/saga";
import containersSaga from "./containers/saga";
import invoiceSaga from "./invoice/saga";
import loanApplicationsSaga from "./loan/saga";
import adminrateSaga from "./adminRate/saga";
import jobNumberGeneratorSaga from "./jobGenNum/saga";
import settingsSaga from "./settings/saga";
import datasheetSaga from "./datasheet/saga";
import contactsSaga from "./contact/saga";
import dashboardSaga from "./dashboard/saga";
import newQuotesSaga from "./newQuotes/saga";
import bookingsSaga from "./booking/saga";


export default function* rootSaga() {
  yield all([fork(authSaga)]);
  yield all([fork(rateSaga)]);
  yield all([fork(adminsSaga)]);
  yield all([fork(customersSaga)]);
  yield all([fork(quotesSaga)]);
  yield all([fork(shipmentsSaga)]);
  yield all([fork(shipmentsPlusSaga)]);
  yield all([fork(containersSaga)]);
  yield all([fork(invoiceSaga)]);
  yield all([fork(loanApplicationsSaga)]);
  yield all([fork(adminrateSaga)]);
  yield all([fork(jobNumberGeneratorSaga)]);
  yield all([fork(settingsSaga)]);
  yield all([fork(dashboardSaga)]);
  yield all([fork(datasheetSaga)]);
  yield all([fork(contactsSaga)]);
  yield all([fork(newQuotesSaga)]);
  yield all([fork(bookingsSaga)]);
}
