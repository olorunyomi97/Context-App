import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
// import PublicRoute from "./PublicRoute";
import AuthRoute from "./AuthRoute";

//authentication
import SignIn from "pages/auth/SignIn";
import SignUp from "pages/auth/SignUp";
import EmailVerification from "pages/auth/EmailVerification";
import ForgotPassword from "pages/auth/ForgotPassword";

//404 page
import NotFound from "pages/notFound";

import Home from "pages/home/Home";

//terms
import Terms from "pages/terms/Terms";
import PrivacyPolicy from "pages/terms/PrivacyPolicy";

//dashboard
import Dashboard from "pages/dashboard/Dashboard";

// Admin
import Admin from "pages/administrator/admin";
import CreateAdmin from "pages/administrator/create";

// Customer
import Customer from "pages/customer/Customer";
import CreateCustomer from "pages/customer/create";
import EditCustomer from "pages/customer/edit";
import CustomerDetails from "pages/customer/customerDetails";
import CreateCustomerShipment from "pages/customer/shipmentPartials/createCustomerShipment";
import CustomerShipmentDetails from "pages/customer/customerShipmentDetailsPartials/customerShipmentDetails";
import CustomerShipmentDetailsInvoice from "pages/customer/customerShipmentDetailsPartials/customerShipmentTabs/InvoiceTab/InvoiceTabPartials/viewInvoice";
import CustomerShipmentDetailsLoan from "pages/customer/customerShipmentDetailsPartials/customerShipmentTabs/LoanTab/LoanTabPartials/loanHistoryTable";
import CustomerShipmentDetailsExtinversaLoanHistory from "pages/customer/customerShipmentDetailsPartials/customerShipmentTabs/LoanTab/LoanTabPartials/ExtinversaLoanSummary/ExtinversaLoanHistorySummary";
import CustomerShipmentDetailsTractionLoanHistory from "pages/customer/customerShipmentDetailsPartials/customerShipmentTabs/LoanTab/LoanTabPartials/TractionLoanSummary/tractionLoanSummary";
import CustomerShipmentDetailsOneportLoanHistory from "pages/customer/customerShipmentDetailsPartials/customerShipmentTabs/LoanTab/LoanTabPartials/OnePortLoanSummary/oneportLoanHistorySummary";
import SignOffForm from "pages/customer/customerShipmentDetailsPartials/customerShipmentTabs/LoanTab/LoanTabPartials/OnePortLoanSummary/SignoffForm.tsx/signOffForm";

//shipment
import Shipment from "pages/shipment/Shipment";
import NewShipmentPlus from "pages/shipment/shipmentPlus/index";
import ShipmentDetails from "pages/shipment/shipmentDetails/ShipmentDetails";
import ShipmentAirDetails from "pages/shipment/shipmentDetails/ShipmentAirDetails";
import ShipmentStandAloneDetails from "pages/shipment/shipmentDetails/ShipmentStandaloneDetails";
import Haulage from "pages/shipment/shipmentPlus/shipmentAndTransportCombination/OceanFreightComponent/OceanAndImport/OceanImportShipmentForm";
import EditOceanFreightExport from "pages/shipment/shipmentPlus/shipmentAndTransportCombination/OceanFreightComponent/OceanAndExport/edit";
import EditOceanFreightImport from "pages/shipment/shipmentPlus/shipmentAndTransportCombination/OceanFreightComponent/OceanAndImport/edit";
import EditHaulageExport from "pages/shipment/shipmentPlus/shipmentAndTransportCombination/HaulageComponent/ExportAndHaulage/edit";
import EditHaulageImport from "pages/shipment/shipmentPlus/shipmentAndTransportCombination/HaulageComponent/ImportAndHaulage/edit";
import ExportAirFreightDTDEdit from "pages/shipment/shipmentPlus/shipmentAndTransportCombination/AirFreightComponent/AirAndExport/DTDEdit";
import ExportAirFreightADEdit from "pages/shipment/shipmentPlus/shipmentAndTransportCombination/AirFreightComponent/AirAndExport/ADEdit";
import ImportAirFreightDTDEdit from "pages/shipment/shipmentPlus/shipmentAndTransportCombination/AirFreightComponent/AirAndImport/DTDEdit";
import ImportAirFreightADEdit from "pages/shipment/shipmentPlus/shipmentAndTransportCombination/AirFreightComponent/AirAndImport/ADEdit";
import EditExportWarehousing from "pages/shipment/shipmentPlus/shipmentAndTransportCombination/WarehousingComponent/ExportAndWarehousing/edit";
import EditImportWarehousing from "pages/shipment/shipmentPlus/shipmentAndTransportCombination/WarehousingComponent/ImportAndWarehousing/edit";
import EditExportCBT from "pages/shipment/shipmentPlus/shipmentAndTransportCombination/CBTComponent/ExportAndCBT/edit";
import EditImportCBT from "pages/shipment/shipmentPlus/shipmentAndTransportCombination/CBTComponent/ImportAndCBT/edit";

// import Task1 from "components/UserFrontend/Task1";

// Container
import Containers from "pages/containers/containers";

//quote
import Quote from "pages/quote/Quote";
import QuoteDetails from "pages/quote/QuoteDetails";
import UploadQuote from "pages/quote/uploadQuote";
import AcceptedQuote from "pages/quote/partials/acceptedQuotesTab/acceptedQuotePartials/acceptedQuoteDetails";
import AcceptedQuoteInfo from "pages/quote/partials/acceptedQuotesTab/acceptedQuotePartials/acceptedQuoteInfo";
import ViewAcceptedQuote from "pages/quote/partials/acceptedQuotesTab/acceptedQuotePartials/viewAcceptedQuote";

// New Quotes
import Quotes from "pages/newQuotes/quotes";
import NewQuoteDetails from "pages/newQuotes/newQuotesDetails";

//invoice
import Invoice from "pages/invoice/Invoice";
import UploadInvoice from "pages/invoice/uploadInvoice";
import ShipmentInvoice from "pages/invoice/ShipmentInvoice";
import InvoiceDetails from "pages/invoice/InvoiceDetails";
import PaymentProof from "pages/invoice/invoicePartials/proofOfPayment";

// Loan Applications
import LoanApplication from "pages/loanApplications/loan";
import LoanApplicationDetails from "pages/loanApplications/loanDetails";

// shipping line
import ShippingLine from "pages/shippingLine/shippingLine";
import ShippingLineConfirmation from "pages/shippingLine/shippingLineConfirmation";

//settings
import Settings from "pages/settings/Settings";

// contacts
import Contacts from "pages/contacts/contact";

import Bookings from "pages/Bookings/Bookings";
import BookingDetails from "pages/Bookings/BookingDetails";
import BookingConfirmation from "pages/Bookings/BookingConfirmationPartials/BookingConfirmation";
import ExportOceanBookingEdit from "pages/Bookings/BookingConfirmationPartials/OceanFreightComponent/ExportOceanConfirmation";
import ImportOceanBookingEdit from "pages/Bookings/BookingConfirmationPartials/OceanFreightComponent/ImportOceanConfirmation";

const Router = () => {
  return (
    <Routes>
      {/* user frontend tests */}
      {/* <Route path="/user-frontend-test" element={<Task1 />} /> */}
      {/* authentication */}
      <Route
        path="/signin"
        element={
          <AuthRoute>
            <SignIn />
          </AuthRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthRoute>
            <SignUp />
          </AuthRoute>
        }
      />
      <Route
        path="/verify-email"
        element={
          <AuthRoute>
            <EmailVerification />
          </AuthRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <AuthRoute>
            <ForgotPassword />
          </AuthRoute>
        }
      />
      {/* home  */}
      <Route
        path="/"
        element={
          <AuthRoute>
            <SignIn />
          </AuthRoute>
        }
      />
      {/* dashboard  */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* Admin */}
      <Route
        path="/admins"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admins/admin-creation"
        element={
          <ProtectedRoute>
            <CreateAdmin />
          </ProtectedRoute>
        }
      />
      {/* Customer Shipment Creation*/}
      <Route
        path="/shipment-creation-for-customer/:id"
        element={
          <ProtectedRoute>
            <CreateCustomerShipment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shipment-creation-for-customer"
        element={
          <ProtectedRoute>
            <CreateCustomerShipment />
          </ProtectedRoute>
        }
      />
      {/* Customer */}
      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <Customer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers/customer-creation"
        element={
          <ProtectedRoute>
            <CreateCustomer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers/edit-customer/:id"
        element={
          <ProtectedRoute>
            <EditCustomer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers/customer-shipment/:id"
        element={
          <ProtectedRoute>
            <CustomerDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers/customer-shipment-details/:id"
        element={
          <ProtectedRoute>
            <CustomerShipmentDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-shipment-details/invoice/:id"
        element={
          <ProtectedRoute>
            <CustomerShipmentDetailsInvoice />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-shipment-details/loan-history/:id"
        element={
          <ProtectedRoute>
            <CustomerShipmentDetailsLoan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-shipment-details/extinversa-loan-summary/:id"
        element={
          <ProtectedRoute>
            <CustomerShipmentDetailsExtinversaLoanHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-shipment-details/traction-loan-summary/:id"
        element={
          <ProtectedRoute>
            <CustomerShipmentDetailsTractionLoanHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-shipment-details/oneport-loan-summary/:id"
        element={
          <ProtectedRoute>
            <CustomerShipmentDetailsOneportLoanHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-shipment-details/oneport-signoff-form/:id"
        element={
          <ProtectedRoute>
            <SignOffForm />
          </ProtectedRoute>
        }
      />
      {/* shipment  */}
      <Route
        path="/shipments"
        element={
          <ProtectedRoute>
            <Shipment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-shipment"
        element={
          <ProtectedRoute>
            <NewShipmentPlus />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shipments/shipment-details/:id"
        element={
          <ProtectedRoute>
            <ShipmentDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shipments/shipment-air-details/:id"
        element={
          <ProtectedRoute>
            <ShipmentAirDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shipments/shipment-standalone-details/:id"
        element={
          <ProtectedRoute>
            <ShipmentStandAloneDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/haulage"
        element={
          <ProtectedRoute>
            <Haulage />
          </ProtectedRoute>
        }
      />
      <Route
        path="shipments/edit-oceanfreight-export-shipment/:id"
        element={
          <ProtectedRoute>
            <EditOceanFreightExport />
          </ProtectedRoute>
        }
      />
      <Route
        path="shipments/edit-oceanfreight-import-shipment/:id"
        element={
          <ProtectedRoute>
            <EditOceanFreightImport />
          </ProtectedRoute>
        }
      />
      <Route
        path="shipments/edit-haulage-export-shipment/:id"
        element={
          <ProtectedRoute>
            <EditHaulageExport />
          </ProtectedRoute>
        }
      />
      <Route
        path="shipments/edit-haulage-import-shipment/:id"
        element={
          <ProtectedRoute>
            <EditHaulageImport />
          </ProtectedRoute>
        }
      />
      {/* <Route
				path="shipments/edit-airfreight-export-shipment/:id"
				element={
					<ProtectedRoute>
						<EditAirFreightExport />
					</ProtectedRoute>
				}
			/> */}
      // EXPORT & DOOR TO DOOR
      <Route
        path="shipments/export-airfreight-door-to-door-edit/:id"
        element={
          <ProtectedRoute>
            <ExportAirFreightDTDEdit />
          </ProtectedRoute>
        }
      />
      // EXPORT & AIR DELIVERY
      <Route
        path="shipments/export-airfreight-airport-delivery-edit/:id"
        element={
          <ProtectedRoute>
            <ExportAirFreightADEdit />
          </ProtectedRoute>
        }
      />
      // IMPORT & DOOR TO DOOR
      <Route
        path="shipments/import-airfreight-door-to-door-edit/:id"
        element={
          <ProtectedRoute>
            <ImportAirFreightDTDEdit />
          </ProtectedRoute>
        }
      />
      // IMPORT & AIR DELIVERY
      <Route
        path="shipments/import-airfreight-airport-delivery-edit/:id"
        element={
          <ProtectedRoute>
            <ImportAirFreightADEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="shipments/export-warehousing-edit/:id"
        element={
          <ProtectedRoute>
            <EditExportWarehousing />
          </ProtectedRoute>
        }
      />
      <Route
        path="shipments/import-warehousing-edit/:id"
        element={
          <ProtectedRoute>
            <EditImportWarehousing />
          </ProtectedRoute>
        }
      />
      <Route
        path="shipments/export-cbt-edit/:id"
        element={
          <ProtectedRoute>
            <EditExportCBT />
          </ProtectedRoute>
        }
      />
      <Route
        path="shipments/import-cbt-edit/:id"
        element={
          <ProtectedRoute>
            <EditImportCBT />
          </ProtectedRoute>
        }
      />
      <Route
        path="/containers"
        element={
          <ProtectedRoute>
            <Containers />
          </ProtectedRoute>
        }
      />
      {/* Terms */}
      <Route path="/terms-of-service" element={<Terms />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      {/* quote  */}
      <Route
        path="/quotes"
        element={
          <ProtectedRoute>
            <Quote />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quote-details/:id"
        element={
          <ProtectedRoute>
            <QuoteDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload-quote/:id"
        element={
          <ProtectedRoute>
            <UploadQuote />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accepted-quote-details/:id"
        element={
          <ProtectedRoute>
            <AcceptedQuote />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accepted-quote-info/:id"
        element={
          <ProtectedRoute>
            <AcceptedQuoteInfo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/view-accepted-quote/:id"
        element={
          <ProtectedRoute>
            <ViewAcceptedQuote />
          </ProtectedRoute>
        }
      />
      {/* Bookings */}
      {/* ********* */}
      {/* ********* */}
      {/* New Quotes */}
      <Route
        path="/new-quotes"
        element={
          <ProtectedRoute>
            <Quotes />
          </ProtectedRoute>
        }
      />
      {/* QuotesById */}
      <Route
        path="/new-quotes-details/:id"
        element={
          <ProtectedRoute>
            <NewQuoteDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        }
      />
      {/* BookingsById */}
      {/* ********* */}
      {/* ********* */}
      <Route
        path="/bookings/booking-details/:id"
        element={
          <ProtectedRoute>
            <BookingDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings/edit-oceanfreight-export-booking/:id"
        element={
          <ProtectedRoute>
            <ExportOceanBookingEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings/edit-oceanfreight-import-booking/:id"
        element={
          <ProtectedRoute>
            <ImportOceanBookingEdit />
          </ProtectedRoute>
        }
      />
      BookingConfirmation
      <Route
        path="/bookings/booking-confirmation/:id"
        element={
          <ProtectedRoute>
            <BookingConfirmation />
          </ProtectedRoute>
        }
      />
      {/* invoice  */}
      <Route
        path="/invoices"
        element={
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload-invoice/:id"
        element={
          <ProtectedRoute>
            <UploadInvoice />
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
        path="/invoice-details/:id"
        element={
          <ProtectedRoute>
            <InvoiceDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload-payment-proof/:id"
        element={
          <ProtectedRoute>
            <PaymentProof />
          </ProtectedRoute>
        }
      />
      {/* Loan Application */}
      <Route
        path="/loan-applications"
        element={
          <ProtectedRoute>
            <LoanApplication />
          </ProtectedRoute>
        }
      />
      <Route
        path="/loan-application-details/:id"
        element={
          <ProtectedRoute>
            <LoanApplicationDetails />
          </ProtectedRoute>
        }
      />
      {/* Shipping Line  */}
      <Route
        path="/rates/:id"
        element={
          <ProtectedRoute>
            <ShippingLine />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rates-confirmation/:id"
        element={
          <ProtectedRoute>
            <ShippingLineConfirmation />
          </ProtectedRoute>
        }
      />
      {/* contacts  */}
      <Route
        path="/contacts"
        element={
          <ProtectedRoute>
            <Contacts />
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
      {/* not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
