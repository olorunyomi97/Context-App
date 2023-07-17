import {
    GET_CONTAINERS,
    GET_CONTAINERS_SUCCESS,
    API_ERROR
} from "./constants";

const initialState = {
    error: null,
    loading: true,
    containers: [],
    total_containers: 0,
}

const containers = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONTAINERS_SUCCESS:
            return {
                ...state,
                loading: false,
                containers: action.payload.containers,
                total_containers: action.payload.total_containers,
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

export default containers;