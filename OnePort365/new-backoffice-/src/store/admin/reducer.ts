// import Admin from 'pages/administrator/admin';
import { 
    GET_ADMIN_SUCCESS, 
    CREATE_ADMIN, 
    CREATE_ADMIN_SUCCESS, 
    DELETE_ADMIN, 
    DEACTIVATE_ADMIN,
    API_ERROR 
} from "./constants";

const initialState = {
    error: null,
    loading: true,
    admins: [],
}

const admins = (state = initialState, action) => {
    switch (action.type) {
        case GET_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                admins: action.payload,
            };
        case CREATE_ADMIN:
            return {
                ...state,
                loading: true,
            };
        case CREATE_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case DELETE_ADMIN:
            return {
                ...state,
                loading: false,
            };
        case DEACTIVATE_ADMIN:
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

export default admins;