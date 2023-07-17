import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";
import { useSelector } from "react-redux";

import shipmentServices from "api/services/shipments";
import mixpanel from "helpers/mixpanel";

import {
    GET_SHIPMENTS,
    GET_SINGLE_SHIPMENT,
    ADD_EXPORT_SHIPMENT,
    EDIT_SHIPMENT_DETAILS,
    EDIT_AIR_SHIPMENT_DETAILS,
    EDIT_CONTAINER_DETAILS,
    EDIT_CONTAINER_STATUS,
    GET_CONTAINER_STATUS_HISTORY,
    UPLOAD_SHIPMENT_DOCS,
    DELETE_SHIPMENT,
    DELETE_CONTAINER,
} from "./constants";
import { ResponseGenerator } from "store/type";
import {
    getShipmentsSuccess,
    getSingleShipmentSuccess,
    addExportShipmentSuccess,
    editShipmentDetailsSuccess,
    editAirShipmentDetailsSuccess,
    editContainerDetailsSuccess,
    editContainerStatusSuccess,
    getContainerStatusHistorySuccess,
    uploadShipmentDocsSuccess,
    deleteShipmentSuccess,
    deleteContainerSuccess,
    ShipmentApiError,
} from "./actions";

// let admin_data = useSelector((state: any) => state.auth.admin_data);
// @ts-ignore
// prettier-ignore
const admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));

function* doGetShipments({ payload }: any) {
    try {
        const { data } = payload;
        const response: ResponseGenerator = yield call(
            shipmentServices.getShipments,
            data
        );
        // console.log("Shipments in Saga", response.data.data);
        yield put(getShipmentsSuccess(response.data.data));
    } catch (error) {
        yield put(ShipmentApiError(error));
    }
}

function* doAddExporShipment({ payload }: any) {
    try {
        const { data } = payload;
        console.log(data);
        const response: ResponseGenerator = yield call(shipmentServices.addExportShipment, data);

        if (response.data.status === "success") {
            mixpanel.track("Admin Created New Shipment ", {
                email: admin_data.email,
            });
            yield put(addExportShipmentSuccess(response.data));
            cogoToast.success("Shipment Successfully Created");
            window.location.replace(`${window.location.origin}/shipments`);
        }
    } catch (error) {
        const message =
            error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(ShipmentApiError(error));
    }
}

function* doGetSingeShipment({ payload }: any) {
    try {
        const { id, data } = payload;
        const response: ResponseGenerator = yield call(
            shipmentServices.getSingleShipment,
            id,
            data
        );
        console.log(response.data.data);
        yield put(getSingleShipmentSuccess(response));
    } catch (error) {
        yield put(ShipmentApiError(error));
    }
}

function* doEditShipmentDetails({ payload }: any) {
    try {
        console.log(payload);
        const { data, callback } = payload;
        // console.log(data);
        // console.log(callback);
        const edit_payload = { ...payload.data, ...payload.callback };
        console.log(edit_payload);
        const response: ResponseGenerator = yield call(
            shipmentServices.editShipmentDetails,
            edit_payload
        );

        if (response.data.status === "success") {
            yield put(editShipmentDetailsSuccess(response.data));
            cogoToast.success("Shipment Details Successfully Updated");
            window.location.replace(
                `${window.location.origin}/shipments/shipment-standalone-details/${data.id}`
            );
            // callback();
        }
    } catch (error) {
        const message =
            error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(ShipmentApiError(error));
    }
}

function* doEditAirShipmentDetails({ payload }: any) {
    try {
        console.log(payload);
        const { data, callback } = payload;
        // console.log(data);
        // console.log(callback);
        const edit_payload = { ...payload.data, ...payload.callback };
        console.log(edit_payload);
        const response: ResponseGenerator = yield call(
            shipmentServices.editAirShipmentDetails,
            edit_payload
        );

        if (response.data.status === "success") {
            yield put(editAirShipmentDetailsSuccess(response.data));
            cogoToast.success("Shipment Details Successfully Updated");
            window.location.replace(
                `${window.location.origin}/shipments/shipment-air-details/${data.id}`
            );
            // callback();
        }
    } catch (error) {
        const message =
            error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(ShipmentApiError(error));
    }
}

//

function* doEditContainerDetails({ payload }: any) {
    try {
        const { data } = payload;
        console.log(data);
        const response: ResponseGenerator = yield call(
            shipmentServices.editContainerDetails,
            data
        );

        if (response.data.status === "success") {
            mixpanel.track("Admin Updated Container Details ", {
                email: admin_data.email,
            });
            yield put(editContainerDetailsSuccess(response.data.data));
            cogoToast.success("Container Details Successfully Updated");
            window.location.replace(
                `${window.location.origin}/shipments/shipment-details/${data.id}`
            );
            // callback();
        }
    } catch (error) {
        const message =
            error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(ShipmentApiError(error));
    }
}

function* doEditContainerStatus({ payload }: any) {
    try {
        const { data } = payload;
        console.log(data);
        const response: ResponseGenerator = yield call(
            shipmentServices.editContainerStatus,
            data
        );

        if (response.data.status === "success") {
            mixpanel.track("Admin Updated Container Status", {
                email: admin_data.email,
            });
            yield put(editContainerStatusSuccess(response.data.data));
            cogoToast.success("Container Status Successfully Updated");
            window.location.replace(
                `${window.location.origin}/shipments/shipment-details/${data.id}`
            );
            // callback();
        }
    } catch (error) {
        const message =
            error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(ShipmentApiError(error));
    }
}

function* doGetContainerStatusHistory({ payload }: any) {
    const { id } = payload;
    try {
        const response: ResponseGenerator = yield call(
            shipmentServices.getContainerStatusHistory,
            id
        );
        console.log("Container Status History in Saga", response.data.data);
        yield put(getContainerStatusHistorySuccess(response));
    } catch (error) {
        yield put(ShipmentApiError(error));
    }
}

function* doUploadShipmentDocs({ payload }: any) {
    try {
        const { data, callback } = payload;
        const response: ResponseGenerator = yield call(
            shipmentServices.uploadShipmentDocs,
            data
        );

        if (response.data.status === "success") {
            yield put(uploadShipmentDocsSuccess(response.data));
            // callback();
            cogoToast.success("Document Successfully Uploaded");
            window.location.reload();
        }
    } catch (error) {
        const message =
            error["response"]["data"]["message"] || error.message || "network error";
        console.log(error);
        cogoToast.error(message);
        yield put(ShipmentApiError(error));
    }
}

function* doDeleteShipment({ payload }: any) {
    try {
        const { id } = payload;
        console.log(id);
        const response: ResponseGenerator = yield call(
            shipmentServices.deleteShipment,
            id
        );
        cogoToast.success("Shipment successfully Deleted");
        window.location.replace(`${window.location.origin}/shipments`);
        if (response.data) {
            yield put(deleteShipmentSuccess(response.data));
        }
    } catch (error) {
        const message = error["response"] || error.message || "network error";
        cogoToast.error(message);
        yield put(ShipmentApiError(error));
    }
}

function* doDeleteContainer({ payload }: any) {
    try {
        const { id } = payload;
        console.log(id);
        const response: ResponseGenerator = yield call(
            shipmentServices.deleteContainer,
            id
        );
        cogoToast.success("Container successfully Deleted");
        window.location.reload();
        // window.location.replace(`${window.location.origin}/shipments`);
        // window.location.replace(`${window.location.origin}/shipments/shipment-details/${data.id}`);
        if (response.data) {
            yield put(deleteShipmentSuccess(response.data));
        }
    } catch (error) {
        const message = error["response"] || error.message || "network error";
        cogoToast.error(message);
        yield put(ShipmentApiError(error));
    }
}

function* shipmentsSaga() {
    yield takeEvery(GET_SHIPMENTS, doGetShipments);
    yield takeEvery(ADD_EXPORT_SHIPMENT, doAddExporShipment);
    yield takeEvery(GET_SINGLE_SHIPMENT, doGetSingeShipment);
    yield takeEvery(EDIT_SHIPMENT_DETAILS, doEditShipmentDetails);
    yield takeEvery(EDIT_AIR_SHIPMENT_DETAILS, doEditAirShipmentDetails);
    yield takeEvery(EDIT_CONTAINER_DETAILS, doEditContainerDetails);
    yield takeEvery(EDIT_CONTAINER_STATUS, doEditContainerStatus);
    yield takeEvery(GET_CONTAINER_STATUS_HISTORY, doGetContainerStatusHistory);
    yield takeEvery(UPLOAD_SHIPMENT_DOCS, doUploadShipmentDocs);
    yield takeEvery(DELETE_SHIPMENT, doDeleteShipment);
    yield takeEvery(DELETE_CONTAINER, doDeleteContainer);
}

export default shipmentsSaga;
