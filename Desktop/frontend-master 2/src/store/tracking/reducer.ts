import {
    API_ERROR,
    GET_TRIP_EVENTS_BY_ID
} from "store/tracking/constants";

const initialState = {
    error: '',
    loading: true,
    trip_events: {}
}

const tracking = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_TRIP_EVENTS_BY_ID.REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;

        case GET_TRIP_EVENTS_BY_ID.SUCCESS:
            state = {
                ...state,
                loading: false,
                trip_events: action.payload.data
            }
            break;

        case API_ERROR:
            state = {
                ...state,
                error: action.payload,
                loading: false
            }
            break;

        default:
            state = { ...state }
            break;
    }

    return state;
}

export default tracking;