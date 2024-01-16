import {
  GET_SHIPMENTS,
  GET_SHIPMENTS_BY_ID,
  GET_PUBLIC_SHIPMENT_BY_ID,
  GET_CONTAINERS,
  API_ERROR,
  GET_CONTAINER_BY_ID,
  GET_CONTAINER_BY_JOBNUMBER
} from "store/shipment/constants";

const initialState = {
  error: "",
  loading: false,
  booking_loading: true,
  table_loading: false,
  my_shipments: [],
  total_shipments: null,
  shipment_data: {},
  public_shipment_data: {},
  upload_loading: false,
  uploaded_data: {},
  document_data: [],
  my_containers: [],
  total_containers: null,
  getting_containers: false,
  container_data: {},
  jobnumber_containers: [],
  jobnumber_loading: true,
  totaljob_containers: null
};

const shipment = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_SHIPMENTS_BY_ID.REQUEST || GET_PUBLIC_SHIPMENT_BY_ID.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case GET_SHIPMENTS.SUCCESS:
      state = {
        ...state,
        booking_loading: false,
        table_loading: false,
        error: "",
        my_shipments: action.payload.data.shipments,
        total_shipments: action.payload.data.total_shipments,
      };
      break;

    case GET_CONTAINERS.SUCCESS:
      state = {
        ...state,
        booking_loading: false,
        table_loading: false,
        error: "",
        my_containers: action.payload.data[0].containers,
        total_containers: action.payload.data[0].total_containers,
      };
      break;

    case GET_SHIPMENTS.REQUEST:
      state = {
        ...state,
        table_loading: true,
      };
      break;

    case GET_CONTAINERS.REQUEST:
      state = {
        ...state,
        table_loading: true,
      };
      break;

    case GET_CONTAINER_BY_ID.REQUEST:
      state = {
        ...state,
        getting_containers: true,
      };
      break;

    case GET_CONTAINER_BY_ID.SUCCESS:
      state = {
        ...state,
        getting_containers: false,
        container_data: action.payload.data,
      };
      break;

    case GET_SHIPMENTS_BY_ID.SUCCESS:
      state = {
        ...state,
        loading: false,
        shipment_data: action.payload.data,
      };
      break;

    case GET_PUBLIC_SHIPMENT_BY_ID.SUCCESS:
      state = {
        ...state,
        loading: false,
        public_shipment_data: action.payload.data,
      };
      break;

    case GET_CONTAINER_BY_JOBNUMBER.REQUEST:
      state = {
        ...state,
        table_loading: true
      };
      break;

    case GET_CONTAINER_BY_JOBNUMBER.SUCCESS:
      state = {
        ...state,
        error: "",
        table_loading: false,
        jobnumber_loading: false,
        jobnumber_containers: action.payload.data[0].containers,
        totaljob_containers: action.payload.data[0].total_containers
      };
      break;

    // case UPLOAD_SHIPMENT_DOC.REQUEST:
    //   state = {
    //     ...state,
    //     upload_loading: true,
    //     error: "",
    //   };
    //   break;

    // case UPLOAD_SHIPMENT_DOC.SUCCESS:
    //   state = {
    //     ...state,
    //     upload_loading: false,
    //     uploaded_data: action.payload.data,
    //     document_data: action.payload.data.document_details,
    //     shipment_data: {}
    //   };
    //   break;

    case API_ERROR:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;

    default:
      break;
  }
  return state;
};

export default shipment;
