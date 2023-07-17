import { GENERATE_JOB_NUMBER, GENERATE_JOB_NUMBER_SUCCESS, API_ERROR } from "./constants"

const initialState = {
    error: null,
    loading: false,
    job_number: [],
};

const jobNumberGenerator = (state = initialState, action) => {
    switch (action.type) {
        case GENERATE_JOB_NUMBER:
            return {
                ...state,
                loading: true,
            };
        case GENERATE_JOB_NUMBER_SUCCESS:
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

export default jobNumberGenerator;