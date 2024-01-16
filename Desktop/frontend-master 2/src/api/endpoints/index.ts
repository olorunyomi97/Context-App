/**
 * API environment url
 */

////////////auth
export const loginUrl = "auth/login";

export const registerUrl = "auth/register";

export const validatePhoneAndEmailUrl = "auth/validate_auth_phone_and_email";

export const validateRegistrationUrl = "auth/verify_registration_otp";

export const resendVerificationUrl = "auth/resend_authentication_otp";

export const forgotPasswordUrl = "auth/forgot_password";
export const forgotPasswordOtpUrl = "auth/verify_forgot_password_otp";
export const resetPasswordUrl = "auth/reset_user_password";

////////////bookings
export const getBookingsUrl = "bookings/get_my_bookings";
export const createBookingUrl = "bookings/create_booking";
export const createPublicBookingUrl = "bookings/public/create_booking"
export const getBookingByIdUrl = "bookings/booking_details";
export const getPublicBookingByIdUrl = "bookings/public/booking_details";

/////////////tracking
export const getTripEventsByIdUrl = "trackers/get_trip_events"

////////////additional details
export const getInsuranceUrl = "live_rates/get_insurance_providers";
export const selectAdditionalServicesUrl =
  "additional_services/select_services";
export const getBookingSummaryUrl = "bookings/get_booking_summary";
export const confirmBookingUrl = "bookings/confirm_booking";

////////////rates
export const initiateRateRequestUrl = "live_rates/initiate_instant_quotes";
export const getRateByIdUrl = "rates/get_rate_by_id";
export const getInsuranceProvidersUrl = "live_rates/get_insurance_providers";
export const finalizeRateRequestUrl = "live_rates/finalize_instant_quotes";
export const recordSharedRateUrl = "live_rates/record_shared_rates";

//new shipment
export const createNewShipmentUrl = "shipments/create_new_shipment";
export const getShipmentByIdUrl = "shipments/get_shipments_details";
export const getLiveRateUrl = "live_rates/get_live_rates";
export const getSpecialRateUrl = "live_rates/get_special_rates"
export const uploadShipmentDocUrl = "shipments/attach_document_to_shipment";
export const deleteShipDocUrl = "shipments/delete_shipment_document";

export const initiateLiveRatesRequestUrl = "live_rates/get_generated_live_rate";
export const saveLiveRatesSelectionUrl = "live_rates/select_preferred_rates";
export const getSelectedLiveRatesUrl =
  "live_rates/get_selected_live_rate_summary";
export const confirmLiveRatesUrl = "live_rates/confirm_live_rates";
export const selectLiveOceanRateUrl = "live_rates/select_preferred_rates";
export const selectSpecialRateUrl = "live_rates/public/select_special_rate";

//export & //import
export const uploadRatesDocsUrl = "rates/get_rates/upload_rates_documents";
export const updateCargoDetailsUrl = "rates/get_rates/update_cargo_details";
export const updateAdditionalServicesUrl =
  "rates/get_rates/additional_services";

export const documentRequestUrl = "rates/create_document_request";

////////////quote
export const getMyQuotesUrl = "quotes/my_quotes";
export const getQuoteByIdUrl = "quotes/get_quote_by_id";
export const linkUserToQuoteUrl = "quotes/link_user_to_quotes";
export const acceptQuoteURl = "quotes/accept_quote";
export const requestFollowUpUrl = "quotes/request_quote_followup";

////////////settings
export const changePasswordUrl = "settings/change_password";
export const editProfileUrl = "profile/update_profile";

/////////////invoice
export const getInvoiceByIdUrl = "invoices/get_single_invoice_detail";
export const getInvoiceByTrxUrl = "payments/get_invoice_details_by_txn_ref";
export const getInvoicesByRateIdUrl = "invoices/get_invoices_by_quote_id";
export const getMyInvoicesUrl = "invoices/get_my_invoices";
export const uploadProofOfPaymentUrl = "invoices/upload_proof_of_payment";
export const initiateInvoicePaymentUrl = "payments/initiate_new_payment";
export const completeInvoicePaymentUrl = "payments/complete_payment";

/////////////tradeFinance
export const createLoanApplicationUrl = "trade_finance/loan_application";

//////////////documents
export const getDocumentByIdUrl = "documents/get_document_by_id";
export const getMyDocumentsUrl = "documents/get_my_documents";

//////////////dashboard
export const getPendingDashboardQuotesUrl =
  "dashboard/get_pending_dashboard_quotes";
export const getDashboardParametersUrl = "dashboard/get_dashboard_params";

//////////////shipments
export const getMyShipmentsUrl = "shipments/get_my_shipments";
// export const getShipmentByIdUrl = "shipments/get_shipments_details";
export const getPublicShipmentByIdUrl = "shipments/public/shipments_details";
export const getContainersUrl = "containers/get_my_containers";
export const getContainerByIdUrl = "containers/get_container";
export const getContainerByJobNumberUrl = "containers/get_containers_by_job_number";

//////////////data sheet
export const completeDataSheetUrl = "datasheet/complete_datasheet";
export const getDataSheetByIdUrl = "datasheet/get_datasheet_details";

//////////////notifications

///////////////contact us
export const leaveMessageUrl = "contact/make_contact_us_request";
export const requestCallBackUrl = "contact/make_callback_request";

////////////// team mates
export const getTeammatesUrl = "teammates";
export const inviteTeammatesUrl = "teammates/invite";
export const updateTeammateUrl = "teammates/update";
export const deleteTeammatesUrl = "teammates/deactivate";
