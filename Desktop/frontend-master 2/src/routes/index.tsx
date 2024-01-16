import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AuthRoute from "./AuthRoute";

//Coming soon
import ComingSoon from "components/partials/ComingSoon";

//Authentication
import SignIns from "pages/auth/SignIns";
import SignsUp from "pages/auth/SignsUp";
import EmailVerifications from "pages/auth/EmailVerifications";
import PasswordConfirmation from "pages/auth/PasswordConfirmation";
import ForgotPasswords from "pages/auth/ForgotPasswords";
import SignUpConfirmation from "pages/auth/SignUpConfirmation";

//Booking
import Booking from "pages/booking/Booking";
import BookingDetailsRoot from "pages/booking/BookingDetailsRoot";

//404 page
import NotFound from "pages/notFound";

//Terms
import Terms from "pages/terms/Terms";
import PrivacyPolicy from "pages/terms/PrivacyPolicy";

//Rate Request
import RateRequest from "pages/rate/RateRequest";
import DashboardRateRequest from "pages/rate/DashboardRateRequest";

//Rates
import Rate from "pages/rates/Rate";
import DashboardRate from "pages/rate/DashboardRate";
import RateConfirmation from "pages/rate/RateConfirmation";
import RecentlySearched from "pages/rate/RecentlySearched";
import BookingConfirmation from "pages/rate/BookingConfirmation";
import BookingSummary from "pages/rate/BookingSummary";

//Shipping liner
import ShippingLiner from "pages/shippingLiner/ShippingLiner";

//Additional services
import AdditionalDetails from "pages/additionalDetails/AdditionalDetails";

//Dashboard
import Dashboards from "pages/dashboard/Dashboards";

//Shipment
import Shipments from "pages/shipment/Shipments";
import ShipmentDataSheet from "pages/shipmentDataSheet/ShipmentDataSheet";
import ShipmentDetailsRoot from "pages/shipment/ShipmentDetailsRoot";
import InvalidShipment from "pages/shipment/InvalidShipment";

//Tracking
import Tracking from "pages/tracking/Tracking";
import OpenContainers from "pages/dock/OfapLink/OpenContainers";

//Quote
import Quote from "pages/quote/Quote";
import QuoteDetails from "pages/quote/QuoteDetails";
import QuoteSummary from "pages/quote/QuoteSummary";
import ShipmentSummary from "pages/quote/ShipmentSummary";

//Invoice
import Invoice from "pages/invoice/Invoice";
import Invoices from "pages/invoice/Invoices";
import ShipmentInvoice from "pages/invoice/ShipmentInvoice";
import InvoiceDetails from "pages/invoice/InvoiceDetails";
import ConfirmTransaction from "pages/invoice/ConfirmTransaction";

//Tradefinance
import TradeFinance from "pages/tradeFinance/TradeFinance";

//Credit Facility
import LoanProvider from "pages/creditFacility/LoanProvider";
import LoanApplication from "pages/creditFacility/LoanApplication";
import LoanHistory from "pages/creditFacility/LoanHistory";
import LoanHistoryDetail from "pages/creditFacility/LoanHistoryDetail";
import CreditFacility from "pages/creditFacility/CreditFacility";
import CreditFacilityDetail from "pages/creditFacility/CreditFacilityDetail";

//Document
import Document from "pages/document/Document";
import Documents from "pages/document/Documents";

//Settings
import Settings from "pages/settings/Settings";

//New Home Page
// import NewHomePage from "pages/newHome/Landing/newHome";
// import About from "pages/newHome/About/about";
// import Contact from "pages/newHome/Contact/contact";
// import OceanFreightServices from "pages/newHome/services/oceanFreight";
// import AirFreightServices from "pages/newHome/services/airFreight";
// import InlandServices from "pages/newHome/services/inland";
// import CustomsBrokerage from "pages/newHome/services/customsBrokerage";
import BookingDetails from "pages/booking/BookingDetails";

//Dock
import Dock from "pages/dock/Dock/Dock";
import About from "pages/dock/About/About";
import Contact from "pages/dock/Contact/Contact";
import AirFreight from "pages/dock/services/AirFreight";
import OceanFreight from "pages/dock/services/OceanFreight";
import CustomsBrokerage from "pages/dock/services/CustomsBrokerage";
import InlandLogistics from "pages/dock/services/InlandLogistics";

//containers
import Containers from "pages/containers/Containers";
import ContainerDetails from "pages/containers/ContainerDetails";
import NewContainerDetails from "pages/containers/NewContainerDetails";
import MasterMap from "components/maps/MasterMap";

//Teams
import Team from "pages/team/Team";
import TeamVerification from "pages/auth/TeamVerification";

//freight details
import FreightDetails from "pages/ofap/FreightDetails";
import FreightRates from "pages/ofap/FreightRates";
import Haulage from "pages/haulage/Haulage";
import InHaulage from "pages/haulage/InHaulage";
import ShipmentInformation from "pages/ofap/ShipmentInformation";
import OpenShipmentInformation from "pages/dock/OfapLink/OpenShipmentInformation";
import OpenFreightRates from "pages/dock/OfapLink/OpenFreightRates";
import CustomBrokerage from "pages/customBrokerage/CustomBrokerage";
import InCustomBrokerage from "pages/customBrokerage/InCustomBrokerage";

//scroll manager
import { ScrollManager } from "components/scrollManager/ScrollManager";



const Router = () => {
  return (
    <ScrollManager>
      <Routes>
        {/* authentication */}
        <Route
          path="/signin"
          element={
            <AuthRoute>
              <SignIns />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <SignsUp />
            </AuthRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <AuthRoute>
              <EmailVerifications />
            </AuthRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AuthRoute>
              <ForgotPasswords />
            </AuthRoute>
          }
        />

        {/* home  */}

        {/* New Landing*/}
        <Route path="/" element={<Dock />} />
        <Route path="/about" element={<About />} />
        <Route path="/services/ocean-freight" element={<OceanFreight />} />
        <Route path="/services/air-freight" element={<AirFreight />} />
        <Route path="/services/inland-logistics" element={<InlandLogistics />} />
        <Route path="/services/custom-brokerage" element={<CustomsBrokerage />} />
        <Route path="/contact" element={<Contact />} />

        {/* Dock */}

        {/* dashboard  */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboards />
            </ProtectedRoute>
          }
        />

        {/* shipment  */}
        <Route
          path="/shipments"
          element={
            <ProtectedRoute>
              <Shipments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipment-datasheet/:id"
          element={
            <ProtectedRoute>
              <ShipmentDataSheet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipments/:id"
          element={
            <ProtectedRoute>
              <ShipmentDetailsRoot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invalidshipment"
          element={
            <ProtectedRoute>
              <InvalidShipment />
            </ProtectedRoute>
          }
        />

        {/* Rate request */}
        {/* <Route
          path={"/booking/details"}
          element={
            <ProtectedRoute>
              <Rate />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path={"/booking/shipping-liners"}
          element={
            <ProtectedRoute>
              <ShippingLiner />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path={"/booking/additional-services"}
          element={
            <ProtectedRoute>
              <AdditionalDetails />
            </ProtectedRoute>
          }
        /> */}

        <Route path="/get-rate" element={<RateRequest />} />

        {/* <Route
        path={"/new-shipment"}
        element={
          <ProtectedRoute>
            <DashboardRateRequest />
          </ProtectedRoute>
        }
      /> */}

        {/* <Route
        path="/new-shipment/:id"
        element={
          <ProtectedRoute>
            <DashboardRateRequest />
          </ProtectedRoute>
        }
      /> */}

        {/* Rates */}
        <Route
          path="/rates/:id"
          element={
            <ProtectedRoute>
              <DashboardRate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rates-confirmation/:id"
          element={
            <ProtectedRoute>
              <RateConfirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking-confirmation/:id"
          element={
            <ProtectedRoute>
              <BookingConfirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking-summary/:id"
          element={
            <ProtectedRoute>
              <BookingSummary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recently-searched-rates"
          element={
            <ProtectedRoute>
              <RecentlySearched />
            </ProtectedRoute>
          }
        />

        {/* tracking  */}
        <Route
          path="/tracking"
          element={
            <ProtectedRoute>
              <Tracking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tracking/:id"
          element={
            <ProtectedRoute>
              <Tracking />
            </ProtectedRoute>
          }
        />

        {/* Team Member Verification */}
        <Route
          path="/team-verification"
          element={
            <ProtectedRoute>
              <TeamVerification />
            </ProtectedRoute>
          }
        />
        <Route path="/signup-success" element={<SignUpConfirmation />} />
        <Route path="/password-confirmation" element={<PasswordConfirmation />} />

        {/* Terms */}
        <Route path="/terms-of-service" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* quote  */}
        {/* <Route
        path="/quotes"
        element={
          <ProtectedRoute>
            <Quote />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quote/:id"
        element={
          <ProtectedRoute>
            <QuoteDetails />
          </ProtectedRoute>
        }
      /> */}
        {/* <Route
        path="/quote-summary/:id"
        element={
          <ProtectedRoute>
            <QuoteSummary />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/shipment-summary/:id"
        element={
          <ProtectedRoute>
            <ShipmentSummary />
          </ProtectedRoute>
        }
      />

      {/* Custom Brokerage */}
      <Route
        path="/custom-brokerage"
        element={
          <ProtectedRoute>
            <CustomBrokerage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/custom-brokerage/:id"
        element={
          <ProtectedRoute>
            <CustomBrokerage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customs-brokerage/:id"
        element={
          <ProtectedRoute>
            <InCustomBrokerage />
          </ProtectedRoute>
        }
      />

      {/* Haulage */}
      <Route
        path="/haulage-details"
        element={
          <ProtectedRoute>
            <Haulage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/haulage-details/:id"
        element={
          <ProtectedRoute>
            <Haulage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/haulages-details/:id"
        element={
          <ProtectedRoute>
            <InHaulage />
          </ProtectedRoute>
        }
      />
      {/* ofap */}
      <Route
        path="/freight-details"
        element={
          <ProtectedRoute>
            <FreightDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/freight-details/:id"
        element={
          <ProtectedRoute>
            <FreightDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/freight-rates/:id"
        element={
          <ProtectedRoute>
            <FreightRates />
          </ProtectedRoute>
        }
      />
      <Route
        path="/openfreight-rates/:id"
        element={<OpenFreightRates /> }
      />
      <Route
        path="/shipment-information/:id"
        element={
          <ProtectedRoute>
            <ShipmentInformation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/openshipment-information/:id"
        element={<OpenShipmentInformation />}
      />

        {/* invoice  */}
        <Route
          path="/invoices"
          element={
            <ProtectedRoute>
              <Invoices />
              {/* <ComingSoon /> */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipment-invoice/:id"
          element={
            <ProtectedRoute>
              <ShipmentInvoice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoice/:id"
          element={
            <ProtectedRoute>
              <InvoiceDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoice/confirm-transaction/"
          element={
            <ProtectedRoute>
              <ConfirmTransaction />
            </ProtectedRoute>
          }
        />

        <Route
          path="/invoice/trade-finance"
          element={
            <ProtectedRoute>
              <TradeFinance />
            </ProtectedRoute>
          }
        />

        {/* credit facility */}
        <Route
          path="/loan-providers/:id"
          element={
            <ProtectedRoute>
              <LoanProvider />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loan-application/:id"
          element={
            <ProtectedRoute>
              <LoanApplication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loan-history/:id"
          element={
            <ProtectedRoute>
              <LoanHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loan-history/details/:id"
          element={
            <ProtectedRoute>
              <LoanHistoryDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/credit-facility/:id"
          element={
            <ProtectedRoute>
              <CreditFacility />
            </ProtectedRoute>
          }
        />
        <Route
          path="/credit-facility/details/:id"
          element={
            <ProtectedRoute>
              <CreditFacilityDetail />
            </ProtectedRoute>
          }
        />

        {/* document  */}
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          }
        />

        {/* settings  */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings/team"
          element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          }
        />

        {/* containers  */}
        <Route
          path="/container"
          element={
            <ProtectedRoute>
              <Containers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/open-container"
          element={<OpenContainers />}
        />
        <Route
          path="/container/:id"
          element={
            <ProtectedRoute>
              <NewContainerDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mapframe/:id"
          element={
            <ProtectedRoute>
                <MasterMap />
            </ProtectedRoute>
        }
        />

        {/* Booking */}
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        {/* Booking details */}

        <Route
          path="/booking/:id"
          element={
            <ProtectedRoute>
              {/* <BookingDetails /> */}
              <BookingDetailsRoot />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/booking/details" element={<NotFound />} /> */}
        {/* not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ScrollManager>
  );
};

export default Router;
