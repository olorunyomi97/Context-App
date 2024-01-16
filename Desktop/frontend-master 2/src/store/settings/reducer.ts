import {
	CHANGE_PASSWORD,
	EDIT_PROFILE,
	EDIT_PROFILE_SUCCESS,
	API_ERROR
} from "store/settings/constants";

const initialState = {
	error: "",
	loading: false,
};

const settings = (state = initialState, action: any) => {
	switch (action.type) {
		case CHANGE_PASSWORD.REQUEST:
			state = { ...state, loading: true, error: "" };
			break;
		case CHANGE_PASSWORD.SUCCESS:
			state = { ...state, error: "", loading: false };
			break;
		case EDIT_PROFILE:
			return {
				...state,
				loading: true,
			};

		case EDIT_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
			};

		case API_ERROR:
			state = { ...state, error: action.payload, loading: false };
			break;

		default:
			state = { ...state };
			break;
	}
	return state;
};

export default settings;
