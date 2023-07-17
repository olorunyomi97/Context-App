/**
 * API environment url
 */

////////////auth
export const loginUrl = "admin/login";
export const verifyLoginUrl = "admin/verify_login";
export const registerUrl = "auth/register";
export const validatePhoneAndEmailUrl = "auth/validate_auth_phone_and_email";
export const validateRegistrationUrl = "admin/verify_login";
export const resendVerificationUrl = "auth/resend_authentication_otp";
export const forgotPasswordUrl = "auth/forgot_password";

export const forgotPasswordOtpUrl = "auth/verify_forgot_password_otp";
export const resetPasswordUrl = "auth/validate_forgot_password";

// Admin
export const getAdminsUrl = "admin/get_all_admins"
export const createAdminUrl = "admin/create_admin"
export const deleteAdminUrl = "admin/delete_admin"
export const deactivateAdminUrl = "admin/toggle_admin_activity"
// Customers 

export const getCustomersUrl = "admin/customers/get_all_customers"
export const getSingleCustomerUrl = "admin/customers/get_customer_by_id"
export const createCustomersUrl = "admin/customers/create_customer"
export const updateCustomersUrl = "admin/customers/update_customer"
export const searchCustomerUrl = "admin/customers/get_users_by_search"
export const deleteCustomerUrl = "admin/customers/delete_customer"

// quotes
export const getQuotesUrl = "admin/quotes/get_all_quotes?quote_type=all"
export const getMyQuotesUrl = "admin/quotes/get_all_quotes?quote_type=my_quotes"
export const getCreatedQuotesUrl = "admin/quotes/get_all_quotes?quote_type=created_quotes"
export const getPendingAdminQuotesUrl = "admin/quotes/get_all_quotes?quote_type=pending_admin"
export const processPendingAdminQuotesUrl = "admin/quotes/process_quote_by_id"
export const getPendingCustomerQuotesUrl = "admin/quotes/get_all_quotes?quote_type=pending_customer"
export const getAcceptedQuotesUrl = "admin/quotes/get_all_quotes?quote_type=accepted"

export const getSingleQuoteUrl = "admin/quotes/get_quote_by_id"
export const attachQuoteUrl = "admin/quotes/attach_quote_to_rates_request"

// Quote (Miscellaneous) 
export const filterQuoteUrl = "admin/quotes/get_all_quotes?quote_type=all"

// New Quotes
export const getNewQuotesUrl = "admin/quotes/get_all_quotes"
export const getNewSingleQuoteUrl = "admin/quotes/get_quote_by_id"

// Bookings
export const getBookingsUrl = "admin/bookings/get_all_bookings"
export const getSingleBookingUrl = "admin/bookings/get_booking_details"
export const editBookingDetailsUrl = "admin/bookings/confirm_booking_details"
export const editBookingStatusUrl = "admin/bookings/update_booking_status"

// Shipment
export const getShipmentsUrl = "admin/shipments/get_all_shipments"
export const getSingleShipmentUrl = "admin/shipments/get_shipment_details"
export const addExportShipmentUrl = "admin/shipments/create_new_shipment"
export const editShipmentDetailsUrl = "admin/shipments/update_shipment"
export const editAirShipmentDetailsUrl = "admin/shipments/update_shipment"
export const editContainerDetailsUrl = "admin/containers/update_container_details"
export const editContainerStatussUrl = "admin/containers/update_container_status"
export const getContainerStatusHistoryUrl = "admin/containers/container_status_update_histories"
export const uploadShipmentDocsUrl = "admin/shipments/attach_document_to_shipment"
export const deleteShipmentUrl = "admin/shipments/delete_shipment"
export const deleteContainerUrl = "admin/containers/delete_container"

// Container
export const getContainersUrl = "admin/containers"

// invoices
export const getInvoicesUrl = "admin/invoices/get_all_invoices"
export const getSingleInvoiceUrl = "admin/invoices/get_invoices_by_quote_id"
export const getSingleInvoiceDetailsUrl = "admin/invoices/get_single_invoice_detail"
export const attachInvoiceUrl = "admin/invoices/upload_invoice"
export const attachProofOfPaymentUrl = "admin/invoices/upload_proof_of_payment"
export const deleteInvoiceUrl = "admin/invoices/upload_proof_of_payment"

// Loan Application //
export const getLoanApplicationsUrl = "admin/trade_finance/loan_applications"
export const getSingleLoanApplicationUrl = "admin/trade_finance/loan_application"
export const updateLoanPaymentStatusUrl = "admin/trade_finance/update_loan_payment_status"
// Datasheet
export const modifyDataSheetUrl = "admin/datasheet/complete_datasheet"
export const modifyFormDataSheetUrl = "admin/datasheet/complete_datasheet"
export const getDatasheetNavUrl = "admin/datasheet/get_datasheet_details"
export const getDatasheetSummaryUrl = "admin/datasheet/get_datasheet_details"

// Settings
export const profilePasswordUrl = ""
export const changePasswordUrl = "admin/profile/change_password";
export const editProfileUrl = "admin/profile/update_admin_profile";
export const getCurrentExchangeRatesUrl = "admin/settings/get_current_exchange_rate"
export const updateCurrentExchangeRatesUrl = "admin/settings/update_exchange_rates"

// Admin Rates
export const initiateAdminRateRequestUrl = "admin/rates/admin_initiate_request";
//export
export const uploadAdminExportRatesDocsUrl = "admin/rates/create_rates/upload_rates_documents";
export const updateAdminExportCargoDetailsUrl = "admin/rates/create_rates/update_cargo_details";
export const updateAdminExportAdditionalServicesUrl = "admin/rates/create_rates/additional_services";
export const requestAdminNXPFormUrl = "rates/create_nxp_request";

//import
export const uploadAdminImportRatesDocsUrl = "admin/rates/create_rates/upload_rates_documents";
export const updateAdminImportCargoDetailsUrl = "admin/rates/create_rates/update_cargo_details";
export const updateAdminImportAdditionalServicesUrl = "admin/rates/create_rates/additional_services";
export const requestAdminPARFormUrl = "rates/create_nxp_request";

// Admin Rates

////////////bookings
export const initiateRateRequestUrl = "rates/initiate_rate_request";

// LiveRates
export const initiateLiveRatesRequestUrl = "admin/live_rates/get_live_rates"
export const saveLiveRatesSelectionUrl = "admin/live_rates/select_preferred_rates"
export const getSelectedLiveRatesUrl = "admin/live_rates/get_selected_live_rate_summary"
export const confirmLiveRatesUrl = "admin/live_rates/select_preferred_rates"

////////////rates
export const getRateByIdUrl = "rates/get_rate_by_id";

//export
export const uploadExportRatesDocsUrl = "rates/create_export_rates/upload_rates_documents";
export const updateExportCargoDetailsUrl = "rates/create_export_rates/update_cargo_details";
export const updateExportAdditionalServicesUrl = "rates/create_export_rates/additional_services";
export const requestNXPFormUrl = "rates/create_nxp_request";

//import
export const uploadImportRatesDocsUrl = "rates/create_import_rates/upload_rates_documents";
export const updateImportCargoDetailsUrl = "rates/create_import_rates/update_cargo_details";
export const updateImportAdditionalServicesUrl = "rates/create_import_rates/additional_services";
export const requestPARFormUrl = "rates/create_nxp_request";



//quote
// export const getMyQuotesUrl = "quotes/my_quotes";
// export const getQuoteByIdUrl = "quotes/get_quote_by_id";

// Contact
export const getContactUsContactUrl = "admin/contacts/get_contact_requests?contact_type=contact_us";
export const getRequestCallbackContactUrl = "admin/contacts/get_contact_requests?contact_type=callback"
export const UpdateMessageStatusUrl = "admin/contacts/update_contact_status"



// Jon Number Generator
export const jobNumberGeneratorUrl = "/gen_job_number";

// Dashboard Analytics
export const getDashboardAnalyticsUrl = "admin/dashboard/get_platform_updates"
export const getDashboardUpdatesUrl = "admin/dashboard/get_platform_updates"