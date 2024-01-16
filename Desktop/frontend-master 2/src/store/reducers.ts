import { combineReducers } from "redux";

//User
import auth from "store/auth/reducer";
import rate from "store/rate/reducer";
import booking from "store/booking/reducer";
import quote from "store/quote/reducer";
import settings from "store/settings/reducer";
import invoice from "store/invoice/reducer";
import dashboard from "store/dashboard/reducer";
import shipmentDataSheet from "store/shipmentDataSheet/reducer";
import contact from "store/contact/reducer";
import shipment from "store/shipment/reducer";
import tradeFinance from "store/tradeFinance/reducer";
import bookings from "./bookings/reducer";
import additionalDetails from "store/additionalDetails/reducer";
import teammates from "store/teammates/reducer";
import tracking from "store/tracking/reducer";

const rootReducer = combineReducers({
  //public
  auth,
  rate,
  booking,
  quote,
  settings,
  invoice,
  dashboard,
  shipmentDataSheet,
  contact,
  shipment,
  tradeFinance,
  bookings,
  additionalDetails,
  teammates,
  tracking
});

export default rootReducer;
