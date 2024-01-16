import {
  GET_INVOICES,
  GET_INVOICE_BY_ID,
  GET_INVOICE_BY_TRX,
  GET_INVOICE_BY_RATE_ID,
  UPLOAD_PROOF_OF_PAYMENT,
  INITIALIZE_PAYMENT,
  COMPLETE_PAYMENT,
  API_ERROR,
} from "./constants";

const initialState = {
  error: "",
  loading: false,
  uploading_proof: false,
  my_invoices: [],
  rate_invoice_data: {},
  invoice_data: {},
  initiating_payment: false,
  payment_response: {},
  pending_loan: false,
};

const invoice = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_INVOICES.REQUEST ||
      GET_INVOICE_BY_ID.REQUEST ||
      GET_INVOICE_BY_TRX.REQUEST ||
      GET_INVOICE_BY_RATE_ID.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;
    case GET_INVOICES.SUCCESS:
      state = {
        ...state,
        loading: false,
        error: "",
        my_invoices: action.payload.data.invoices,
        pending_loan: action.payload.data.has_pending_loan,
      };
      break;
    case GET_INVOICE_BY_ID.SUCCESS:
      state = {
        ...state,
        loading: false,
        invoice_data: action.payload.data,
      };
      break;
    case GET_INVOICE_BY_TRX.SUCCESS:
      state = {
        ...state,
        loading: false,
        invoice_data: action.payload.data,
      };
      break;
    case GET_INVOICE_BY_RATE_ID.SUCCESS:
      state = {
        ...state,
        loading: false,
        rate_invoice_data: action.payload.data,
      };
      break;

    case UPLOAD_PROOF_OF_PAYMENT.REQUEST:
      state = {
        ...state,
        uploading_proof: true,
        error: "",
      };
      break;
    case UPLOAD_PROOF_OF_PAYMENT.SUCCESS:
      state = {
        ...state,
        uploading_proof: false,
      };
      break;

    case INITIALIZE_PAYMENT.REQUEST || COMPLETE_PAYMENT.REQUEST:
      state = {
        ...state,
        initiating_payment: true,
      };
      break;

    case INITIALIZE_PAYMENT.SUCCESS:
      state = {
        ...state,
        initiating_payment: false,
      };
      break;

    case COMPLETE_PAYMENT.SUCCESS:
      state = {
        ...state,
        initiating_payment: false,
        payment_response: action.payload.data,
      };
      break;

    case API_ERROR:
      state = {
        ...state,
        error: action.payload,
        loading: false,
        uploading_proof: false,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default invoice;
