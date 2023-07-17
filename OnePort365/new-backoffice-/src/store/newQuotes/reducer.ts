import {
    GET_QUOTES_SUCCESS,
    GET_NEW_SINGLE_QUOTE_SUCCESS,
    API_ERROR
} from "./constants";

const initialState = {
    error: null,
    loading: true,
    new_quotes: [],
    new_single_quote: {},
}

const newQuotes = (state = initialState, action) => {
    switch (action.type) {
        case GET_QUOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                new_quotes: action.payload,
            }
        case GET_NEW_SINGLE_QUOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                new_single_quote: action.payload,
            }
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

export default newQuotes;