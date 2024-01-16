import {
  API_ERROR,
  CLEAR_BOOKING_ERROR,
  CREATE_NEW_SHIPMENT,
  GET_SHIPMENT_BY_ID,
  GET_LIVE_RATE,
  GET_SPECIAL_RATE,
  SELECT_LIVE_OCEAN_RATE,
  SELECT_SPECIAL_RATE,
  RECORD_SHARED_RATE,
  UPLOAD_SHIPMENT_DOC,
  DELETE_SHIPMENT_DOC,
  CLEAR_SHIPMENT,
  CLEAR_BOOKING,
  CREATE_BOOKING,
  GET_BOOKING_DETAILS,
  CREATE_PUBLIC_BOOKING
} from "store/booking/constants";

// const initialState = {
//   error: "",
//   loading: false,
//   rate_result: {},
//   rate_data: {},
//   getting_rates: false,
//   rates_documents: [],
//   getting_insurance_providers: false,
//   insurance_providers: [],
//   finalizing_rate_request: false,
//   live_rates: [],
//   selected_live_rates: {},
//   confirming_live_rates: false,
//   saving_live_rates_selection: false,
// };

const initialState = {
  error: "",
  loading: false,
  live_rate_loading: false,
  rate_result: {},
  rate_data: {},
  shipment_data: {},
  booking_data: {},
  getting_booking: false,
  shipment_data_edit: {},
  getting_rates: false,
  getting_shipments: false,
  rates_documents: [],
  selecting_live_ocean_rate: {},
  getting_insurance_providers: false,
  insurance_providers: [],
  finalizing_rate_request: false,
  live_rates: [],
  selected_live_rates: {},
  confirming_live_rates: false,
  saving_live_rates_selection: false,
  container_details: [],
  upload_loading: false,
  uploaded_data: [],
  delete_shipdoc_loading: false,
  getting_special_rates: false,
  special_rates: [] || {},
  total_special_rate: null,
  selecting_special_rate: {},
  special_rate_data: {},
  selecting_special: false,
  recording_shared_rate: false,
  recorded_shared_rate_data: []
};

const booking = (state = initialState, action: any) => {
  console.log('action>>>', action)
  switch (action.type) {
    case CREATE_NEW_SHIPMENT.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case CREATE_NEW_SHIPMENT.SUCCESS:
      state = {
        ...state,
        error: "",
        loading: false,
        shipment_data: action.payload.data,
      };
      break;

    case CREATE_BOOKING.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case CREATE_BOOKING.SUCCESS:
      state = {
        ...state,
        error: "",
        loading: false,
        shipment_data: action.payload.data,
      };
      break;

    case CREATE_PUBLIC_BOOKING.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case CREATE_PUBLIC_BOOKING.SUCCESS:
      state = {
        ...state,
        error: "",
        loading: false,
        shipment_data: action.payload.data,
      };
      break;

    case GET_SHIPMENT_BY_ID.REQUEST:
      state = { ...state, getting_shipments: true, error: "" };
      break;

    case GET_SHIPMENT_BY_ID.SUCCESS:
      state = {
        ...state,
        error: "",
        getting_shipments: false,
        shipment_data: action.payload.data,
        shipment_data_edit: action.payload.data,
        container_details: action.payload.data.container_details,
      };
      break;

    case GET_BOOKING_DETAILS.REQUEST:
      state = { ...state, getting_booking: true, error: "" };
      break;

    case GET_BOOKING_DETAILS.SUCCESS:
      state = {
        ...state,
        error: "",
        getting_booking: false,
        booking_data: action.payload.data,
      };
      break;

    case GET_LIVE_RATE.REQUEST:
      state = {
        ...state,
        live_rate_loading: true,
        error: "",
      };
      break;

    case GET_LIVE_RATE.SUCCESS:
      state = {
        ...state,
        error: "",
        live_rate_loading: false,
        live_rates: action.payload.data,
      };
      break;

    case GET_SPECIAL_RATE.REQUEST:
      state = {
        ...state,
        getting_special_rates: true,
        error: "",
      };
      break;

    case GET_SPECIAL_RATE.SUCCESS:
      state = {
        ...state,
        error: "",
        getting_special_rates: false,
        special_rates: action.payload.data.rates,
        total_special_rate: action.payload.data.total_rates
      };
      break;

    case SELECT_LIVE_OCEAN_RATE.REQUEST:
      state = {
        ...state,
        error: "",
        selecting_live_ocean_rate: {
          [action.payload.data.rate_result_id]: true
        },
      };
      break;

    case SELECT_LIVE_OCEAN_RATE.SUCCESS:
      state = {
        ...state,
        error: "",
        selecting_live_ocean_rate: {
          [action.payload.data.rate_result_id]: false
        },
        rate_data: action.payload.data,
      };
      break;

    case SELECT_SPECIAL_RATE.REQUEST:
      state = {
        ...state,
        error: "",
        selecting_special: true,
        selecting_special_rate: {
          [action.payload.data.special_rate_id]: true
        },
      };
      break;

    case SELECT_SPECIAL_RATE.SUCCESS:
      state = {
        ...state,
        error: "",
        selecting_special: false,
        selecting_special_rate: {
          [action.payload.data.special_rate_id]: false
        },
        special_rate_data: action.payload.data,
      };
      break;

    case RECORD_SHARED_RATE.REQUEST:
      state = {
        ...state,
        error: "",
        recording_shared_rate: true,
      };
      break;

    case RECORD_SHARED_RATE.SUCCESS:
      state = {
        ...state,
        error: "",
        recording_shared_rate: false,
        recorded_shared_rate_data: action.payload.data,
      };
      break;

    case UPLOAD_SHIPMENT_DOC.REQUEST:
      state = {
        ...state,
        upload_loading: true,
        error: "",
      };
      break;

    case UPLOAD_SHIPMENT_DOC.SUCCESS:
      state = {
        ...state,
        upload_loading: false,
        uploaded_data: action.payload.data,
        //@ts-ignore
        document_data: action.payload.data.document_details,
        //@ts-ignore
        shipment_data: {
          ...state.shipment_data,
          document_details: [
            //@ts-ignore
            ...state.shipment_data.document_details,
            action.payload.data,
          ],
        },
      };
      break;

    case DELETE_SHIPMENT_DOC.REQUEST:
      state = {
        ...state,
        delete_shipdoc_loading: true,
        error: "",
      };
      break;

    case DELETE_SHIPMENT_DOC.SUCCESS:
      // console.log("action?>>>", action)
      // console.log("action2?>>>", action.payload)
      state = {
        ...state,
        delete_shipdoc_loading: false,
        shipment_data: {
          ...state.shipment_data,
          //@ts-ignore
          document_details: [
            //@ts-ignore
            ...state.shipment_data.document_details.filter(
              (item) => item._id !== action.payload.id
            ),
          ],
        },
      };
      break;

    case CREATE_BOOKING.FAILURE:
      state = {
        ...state,
        error: "error",
        loading: false,
      };
      break;

    case API_ERROR:
      state = {
        ...state,
        error: action.payload,
        loading: false,
        getting_shipments: false,
        recording_shared_rate: false
      };
      break;

    case CLEAR_BOOKING_ERROR:
      state = { ...state, error: "" };
      break;

    case CLEAR_SHIPMENT:
      state = { ...state, shipment_data: {} };
      break;

    case CLEAR_BOOKING:
      state = { ...state, booking_data: {} };
      break;

    default:
      state = { ...state };
      break;
  }

  return state;
};

export default booking;
