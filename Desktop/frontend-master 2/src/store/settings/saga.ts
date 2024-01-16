import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

//services
import settingServices from "api/services/settings";

//helpers
import { errorHandler } from "helpers/errorHandler";

//redux
import { CHANGE_PASSWORD, EDIT_PROFILE, } from "store/settings/constants";
import { ResponseGenerator } from "store/type";
import { settingsApiError, editProfileSuccess, changePasswordSuccess } from "store/actions";

function* changePassword({ payload }: any) {
	try {
		const { data, callback } = payload;

		const response: ResponseGenerator = yield call(
			settingServices.changePassword,
			data
		);

		if (response.data.status === "success") {
			yield put(changePasswordSuccess(response.data));
			toast.success("Password changed successfully");

			callback();
		}
	} catch (error) {
		const message = errorHandler(error);
		yield put(settingsApiError(message));
	}
}

function* editProfile({ payload }: any) {
	try {
		console.log(payload);
		const edit_profile = { ...payload.data, ...payload.callback };
		console.log(editProfile);
		const response: ResponseGenerator = yield call(
			settingServices.editProfile,
			edit_profile
		);

		if (response.data.status === "success") {
			yield put(editProfileSuccess(response.data));
			toast.success("Profile Successfully Updated");
			// window.location.replace(`${window.location.origin}/signin`);
			window.location.reload();
		}
	} catch (error) {
		const message =
			error["response"]["data"]["message"] || error.message || "network error";
		toast.error(message);
		yield put(settingsApiError(error));
	}
}

function* settingSaga() {
	yield takeEvery(CHANGE_PASSWORD.REQUEST, changePassword);
	yield takeEvery(EDIT_PROFILE, editProfile);
}

export default settingSaga;
