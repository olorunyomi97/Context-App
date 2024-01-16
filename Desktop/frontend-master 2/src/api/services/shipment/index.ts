import {
  getMyShipmentsUrl,
  getPublicShipmentByIdUrl,
  getShipmentByIdUrl,
  getContainersUrl,
  getContainerByIdUrl,
  getContainerByJobNumberUrl
} from "api/endpoints";
import { get, post } from "helpers/axios";

const getShipments = (data: any) => {
  /**if theres a query parameter in the url */
  if (data.filter_shipment !== undefined || data.job !== undefined) {
    return get(`${getMyShipmentsUrl}?${data.filter_string}`);
  }
  return get(getMyShipmentsUrl);
};

const getContainers = (data: any) => {
  /**if theres a query parameter in the url */
  if (data.filter_shipment !== undefined || data.job !== undefined) {
    return get(`${getContainersUrl}?${data.filter_string}`);
  }
  return get(getContainersUrl);
};

const getContainerById = (id: string) => {
  return get(getContainerByIdUrl + `/${id}`);
};
// const uploadShipmentDoc = (data: any) => {
//   console.log("datahere>>>", data)
//   return post(uploadShipmentDocUrl + `/${data.id}`, data.data)
// }
const getShipmentById = (id: string) => {
  return get(`${getShipmentByIdUrl}/${id}`);
};

const getPublicShipmentById = (id: string) => {
  return get(`${getPublicShipmentByIdUrl}/${id}`);
};

const getContainerByJobNumber = (data: any) => {
  /**if theres a query parameter in the url */
  if (data.filter_shipment !== undefined || data.job !== undefined) {
    return get(`${getContainerByJobNumberUrl}/${data.id}?${data.filter_string}`);
  }
  return get(`${getContainerByJobNumberUrl}/${data.id}`);

  // return get(`${getContainerByJobNumberUrl}/${id}`);
};

const shipmentServices = {
  getShipments,
  getShipmentById,
  getPublicShipmentById,
  getContainers,
  getContainerById,
  getContainerByJobNumber
};

export default shipmentServices;
