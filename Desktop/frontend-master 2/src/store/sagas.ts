import { all, fork } from "redux-saga/effects";

//public
import authSaga from "store/auth/saga";
import rateSaga from "store/rate/saga";
import bookingSaga from "store/booking/saga";
import quoteSaga from "store/quote/saga";
import settingsSaga from "store/settings/saga";
import invoiceSaga from "store/invoice/saga";
import dashboardSaga from "store/dashboard/saga";
import shipmentDataSheetSaga from "store/shipmentDataSheet/saga";
import contactSaga from "store/contact/saga";
import shipmentSaga from "store/shipment/saga";
import tradeFinanceSaga from "store/tradeFinance/saga";
import bookingsSaga from "./bookings/saga";
import additionalDetailsSaga from "./additionalDetails/saga";
import teammatesSaga from "store/teammates/saga";
import trackingSaga from "store/tracking/saga"


export default function* rootSaga() {
  yield all([fork(authSaga)]);
  yield all([fork(rateSaga)]);
  yield all([fork(bookingSaga)]);
  yield all([fork(quoteSaga)]);
  yield all([fork(settingsSaga)]);
  yield all([fork(invoiceSaga)]);
  yield all([fork(dashboardSaga)]);
  yield all([fork(shipmentDataSheetSaga)]);
  yield all([fork(contactSaga)]);
  yield all([fork(shipmentSaga)]);
  yield all([fork(tradeFinanceSaga)]);
  yield all([fork(bookingsSaga)]);
  yield all([fork(additionalDetailsSaga)]);
  yield all([fork(teammatesSaga)]);
  yield all([fork(trackingSaga)]);
}
