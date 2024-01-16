import {
  GET_SHIPMENTS,
  GET_SHIPMENTS_BY_ID,
  GET_PUBLIC_SHIPMENT_BY_ID,
  GET_CONTAINERS,
  GET_CONTAINER_BY_ID,
  GET_CONTAINER_BY_JOBNUMBER,
  API_ERROR,
} from "store/shipment/constants";

export const getShipments = (data: any) => {
  return {
    type: GET_SHIPMENTS.REQUEST,
    payload: { data },
  };
};

export const getShipmentsSuccess = (response: any) => {
  return {
    type: GET_SHIPMENTS.SUCCESS,
    payload: response,
  };
};

export const getContainers = (data: any) => {
  return {
    type: GET_CONTAINERS.REQUEST,
    payload: { data },
  };
};

export const getContainersSuccess = (response: any) => {
  return {
    type: GET_CONTAINERS.SUCCESS,
    payload: response,
  };
};

export const getContainerById = (id: string) => {
  return {
    type: GET_CONTAINER_BY_ID.REQUEST,
    payload: { id },
  };
};

export const getContainerByIdSuccess = (response: any) => {
  return {
    type: GET_CONTAINER_BY_ID.SUCCESS,
    payload: response,
  };
};

export const getContainerByJobNumber = (data: any) => {
  return {
    type: GET_CONTAINER_BY_JOBNUMBER.REQUEST,
    payload: { data },
  };
};

export const getContainerByJobNumberSuccess = (response: any) => {
  return {
    type: GET_CONTAINER_BY_JOBNUMBER.SUCCESS,
    payload: response,
  };
};
// export const uploadShipmentDoc = (data: any) => {
//   return {
//     type: UPLOAD_SHIPMENT_DOC.REQUEST,
//     payload: { data },
//   };
// };

// export const uploadShipmentDocSuccess = (response: any) => {
//   return {
//     type: UPLOAD_SHIPMENT_DOC.SUCCESS,
//     payload: response,
//   };
// };

export const getShipmentsById = (id: string) => {
  return {
    type: GET_SHIPMENTS_BY_ID.REQUEST,
    payload: { id },
  };
};

export const getShipmentsByIdSuccess = (response: any) => {
  return {
    type: GET_SHIPMENTS_BY_ID.SUCCESS,
    payload: response,
  };
};

export const getPublicShipmentById = (id: string) => {
  return {
    type: GET_PUBLIC_SHIPMENT_BY_ID.REQUEST,
    payload: { id },
  };
};

export const getPublicShipmentByIdSuccess = (response: any) => {
  return {
    type: GET_PUBLIC_SHIPMENT_BY_ID.SUCCESS,
    payload: response,
  };
};

export const shipmentApiError = (error: any) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
