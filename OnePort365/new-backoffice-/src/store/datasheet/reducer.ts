import { 
    GET_DATASHEET_NAV, 
    GET_DATASHEET_NAV_SUCCESS,
    GET_DATASHEET_SUMMARY,
    GET_DATASHEET_SUMMARY_SUCCESS,
    MODIFY_DATASHEET,
    MODIFY_DATASHEET_SUCCESS,
    MODIFY_FORM_DATASHEET,
    MODIFY_FORM_DATASHEET_SUCCESS,
    API_ERROR,
} from "./constant";

const initialState = {
    error: null,
    loading: true,
    fetching_datasheet: false,
    datasheet_nav: {},
    datasheet_data: {},
}

const datasheet = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATASHEET_NAV:
            return {
                ...state,
                loading: true,
                datasheet_nav: action.payload,
            }
        case GET_DATASHEET_NAV_SUCCESS:
            return {
                ...state,
                loading: false,
                datasheet_nav: action.payload
            }
        case GET_DATASHEET_SUMMARY:
            return {
                ...state,
                loading: true,
                datasheet_data: action.payload,
                fetching_datasheet: true,
            }
        case GET_DATASHEET_SUMMARY_SUCCESS:
            return {
                ...state,
                loading: false,
                datasheet_data: action.payload,
                fetching_datasheet: false,
            }
        case MODIFY_DATASHEET:
            return {
                ...state,
                loading: true,
            };
        case MODIFY_DATASHEET_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case MODIFY_FORM_DATASHEET:
            return {
                ...state,
                loading: true,
            };
        case MODIFY_FORM_DATASHEET_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case API_ERROR:
            return {
                ...state,
                error: action.payload,
                fetching_datasheet: false,
                loading: false,
            };

        default:
            return state;
        }
    
}

export default datasheet;