import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";
import { useSelector } from "react-redux";

import shipmentServices from "api/services/shipments";
import mixpanel from "helpers/mixpanel";

import { CREATE_SHIPMENT } from "./constants";
import { ResponseGenerator } from "store/type";
import { createShipmentSuccess, ShipmentPlusApiError } from "./actions";

// let admin_data = useSelector((state: any) => state.auth.admin_data);
// @ts-ignore
//prettier-ignore
const admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));

function* doCreateShipment({ payload }: any) {
	try {
		const { data } = payload;
		console.log(data);
		const response: ResponseGenerator = yield call(
			shipmentServices.addExportShipment,
			data
		);

		if (response.data.status === "success") {
			mixpanel.track("Admin Created New Shipment ", {
				email: admin_data.email,
			});
			yield put(createShipmentSuccess(response.data));
			cogoToast.success("Shipment Successfully Created");
			window.location.replace(`${window.location.origin}/shipments`);
		}
	} catch (error) {
		const message =
			error["response"]["data"]["message"] || error.message || "network error";
		cogoToast.error(message);
		yield put(ShipmentPlusApiError(error));
	}
}

function* shipmentsPlusSaga() {
	yield takeEvery(CREATE_SHIPMENT, doCreateShipment);
}

export default shipmentsPlusSaga;
