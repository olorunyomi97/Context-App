import { combineReducers } from "redux";

//User
import auth from "store/auth/reducer";
import rate from "store/rate/reducer";
import admins from "store/admin/reducer";
import customers from "./customer/reducer";
import quotes from "./quotes/reducer";
import newQuotes from "./newQuotes/reducer"
import bookings from "./booking/reducer";
import shipments from "./shipments/reducer";
import shipmentsPlus from "./shipmentsPlus/reducer";
import containers from "./containers/reducer";
import invoices from "./invoice/reducer";
import loanApplications from "./loan/reducer";
import adminrate from "./adminRate/reducer";
import jobNumberGenerator from "./jobGenNum/reducer";
import settings from "./settings/reducer";
import dashboard from "./dashboard/reducer";
import datasheet from "./datasheet/reducer";
import contacts from "./contact/reducer";

const rootReducer = combineReducers({
  //public
  auth,
  rate,
  admins,
  customers,
  quotes,
  shipments,
  shipmentsPlus,
  newQuotes,
  bookings,
  containers,
  invoices,
  loanApplications,
  adminrate,
  jobNumberGenerator,
  settings,
  dashboard,
  datasheet,
  contacts,
});

export default rootReducer;
