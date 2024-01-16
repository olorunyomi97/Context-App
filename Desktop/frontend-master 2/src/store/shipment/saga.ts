import { call, put, takeEvery } from "redux-saga/effects";

//services
import shipmentServices from "api/services/shipment";

//helpers
import { errorHandler } from "helpers/errorHandler";

//redux
import {
  GET_SHIPMENTS,
  GET_SHIPMENTS_BY_ID,
  GET_PUBLIC_SHIPMENT_BY_ID,
  GET_CONTAINER_BY_ID,
  GET_CONTAINERS,
  GET_CONTAINER_BY_JOBNUMBER
} from "./constants";

import { ResponseGenerator } from "store/type";
import {
  getShipmentsSuccess,
  getShipmentByIdSuccess,
  getPublicShipmentByIdSuccess,
  getContainersSuccess,
  getContainerByIdSuccess,
  getContainerByJobNumberSuccess,
  // uploadShipmentDocSuccess,
  shipmentApiError,
} from "store/actions";

function* getShipments({ payload }: any) {
  const { data } = payload;
  try {
    const response: ResponseGenerator = yield call(
      shipmentServices.getShipments,
      data
    );

    if (response.data) {
      yield put(getShipmentsSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(shipmentApiError(message));
  }
}

function* getContainers({ payload }: any) {
  const { data } = payload;
  try {
    const response: ResponseGenerator = yield call(
      shipmentServices.getContainers,
      data
    );

    if (response.data) {
      yield put(getContainersSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(shipmentApiError(message));
  }
}

function* getContainerById({ payload }: any) {
  try {
    const { id } = payload;

    const response: ResponseGenerator = yield call(
      shipmentServices.getContainerById,
      id
    );

    if (response.data) {
      yield put(getContainerByIdSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(shipmentApiError(message));
  }
}
// function* sendUploadShipmentDoc({ payload }: any) {
//   const { data } = payload;
//   try {
//     const response: ResponseGenerator = yield call(
//       shipmentServices.uploadShipmentDoc,
//       data
//     );

//     if (response.data) {
//       yield put(uploadShipmentDocSuccess(response.data));
//     }
//   } catch (error) {
//     const message = errorHandler(error);
//     yield put(shipmentApiError(message));
//   }
// }

function* getShipmentsById({ payload }: any) {
  try {
    const { id } = payload;

    const response: ResponseGenerator = yield call(
      shipmentServices.getShipmentById,
      id
    );

    if (response.data) {
      yield put(getShipmentByIdSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(shipmentApiError(message));
  }
}

function* getPublicShipmentById({ payload }: any) {
  try {
    const { id } = payload;

    const response: ResponseGenerator = yield call(
      shipmentServices.getPublicShipmentById,
      id
    );

    if (response.data) {
      yield put(getPublicShipmentByIdSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(shipmentApiError(message));
  }
}

function* getContainerByJobNumber({ payload }: any) {
  try {
    const { data } = payload;

    const response: ResponseGenerator = yield call(
      shipmentServices.getContainerByJobNumber,
      data
    );

    if (response.data) {
      yield put(getContainerByJobNumberSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(shipmentApiError(message));
  }
}

export default function* shipmentSaga() {
  yield takeEvery(GET_SHIPMENTS.REQUEST, getShipments);
  yield takeEvery(GET_CONTAINERS.REQUEST, getContainers);
  yield takeEvery(GET_CONTAINER_BY_JOBNUMBER.REQUEST, getContainerByJobNumber);
  yield takeEvery(GET_SHIPMENTS_BY_ID.REQUEST, getShipmentsById);
  yield takeEvery(GET_CONTAINER_BY_ID.REQUEST, getContainerById);
  yield takeEvery(GET_PUBLIC_SHIPMENT_BY_ID.REQUEST, getPublicShipmentById);
  // yield takeEvery(UPLOAD_SHIPMENT_DOC.REQUEST, sendUploadShipmentDoc);
}
