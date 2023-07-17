import {
    CREATE_SHIPMENT,
    CREATE_SHIPMENT_SUCCESS,
    API_ERROR
} from "./constants";

const initialState = {
    error: null,
    loading: false,
}

const shipmentsPlus = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SHIPMENT:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case CREATE_SHIPMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                my_shipments: action.payload
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

export default shipmentsPlus;