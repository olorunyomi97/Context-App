import {
    GET_SHIPMENTS_SUCCESS,
    ADD_EXPORT_SHIPMENT,
    ADD_EXPORT_SHIPMENT_SUCCESS,
    GET_SINGLE_SHIPMENT_SUCCESS,
    EDIT_SHIPMENT_DETAILS,
    EDIT_SHIPMENT_DETAILS_SUCCESS,
    EDIT_AIR_SHIPMENT_DETAILS,
    EDIT_AIR_SHIPMENT_DETAILS_SUCCESS,
    EDIT_CONTAINER_DETAILS,
    EDIT_CONTAINER_DETAILS_SUCCESS,
    EDIT_CONTAINER_STATUS,
    EDIT_CONTAINER_STATUS_SUCCESS,
    GET_CONTAINER_STATUS_HISTORY_SUCCESS,
    UPLOAD_SHIPMENT_DOCS,
    UPLOAD_SHIPMENT_DOCS_SUCCESS,
    DELETE_SHIPMENT,
    DELETE_CONTAINER,
    API_ERROR
} from "./constants";

const initialState = {
    error: null,
    loading: true,
    my_shipments: [],
    total_shipments: 0,
    single_shipment: {},
    single_container: [],
    container_status_history: [],
}

const shipments = (state = initialState, action) => {
    switch (action.type) {
        case GET_SHIPMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                my_shipments: action.payload.shipments,
                total_shipments: action.payload.total_shipments
            }
        case ADD_EXPORT_SHIPMENT:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case ADD_EXPORT_SHIPMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                my_shipments: action.payload
            };
        case GET_SINGLE_SHIPMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                single_shipment: action.payload,
            }
        case EDIT_SHIPMENT_DETAILS:
            return {
                ...state,
                loading: true,
            };
        case EDIT_SHIPMENT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case EDIT_AIR_SHIPMENT_DETAILS:
            return {
                ...state,
                loading: true,
            };
        case EDIT_AIR_SHIPMENT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case EDIT_CONTAINER_DETAILS:
            return {
                ...state,
                loading: true,
            };
        case EDIT_CONTAINER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                single_container: action.payload
            };
        case EDIT_CONTAINER_STATUS:
            return {
                ...state,
                loading: true,
            };
        case EDIT_CONTAINER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                single_container: action.payload
            };
        case GET_CONTAINER_STATUS_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                container_status_history: action.payload,
            }
        case UPLOAD_SHIPMENT_DOCS:
            return {
                ...state,
                loading: true,
            };
        case UPLOAD_SHIPMENT_DOCS_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case DELETE_SHIPMENT:
            return {
                ...state,
                loading: false,
            };
        case DELETE_CONTAINER:
            return {
                ...state,
                loading: false,
            };
        case API_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        default:
            return state;
    }
}

export default shipments;