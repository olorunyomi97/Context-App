import {
	CHANGE_PASSWORD,
	EDIT_PROFILE,
	EDIT_PROFILE_SUCCESS,
	API_ERROR
} from "store/settings/constants";

export const changePassword = (data: any, callback: any) => {
	return {
		type: CHANGE_PASSWORD.REQUEST,
		payload: { data, callback },
	};
};

export const changePasswordSuccess = (response: any) => {
	return {
		type: CHANGE_PASSWORD.SUCCESS,
		payload: response,
	};
};

export const editProfile = (data: string, callback: any) => {
	console.log(data);
	console.log(callback);
	return {
		type: EDIT_PROFILE,
		payload: { data, callback },
	};
};
export const editProfileSuccess = (response: any) => {
	return {
		type: EDIT_PROFILE_SUCCESS,
		payload: response,
	};
};

export const settingsApiError = (error: any) => {
	return {
		type: API_ERROR,
		payload: error,
	};
};
