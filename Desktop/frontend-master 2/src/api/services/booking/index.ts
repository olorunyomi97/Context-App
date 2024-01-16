import { get, post, del } from "helpers/axios";

import {
  createNewShipmentUrl,
  getShipmentByIdUrl,
  getLiveRateUrl,
  selectLiveOceanRateUrl,
  getBookingsUrl,
  uploadShipmentDocUrl,
  deleteShipDocUrl,
  createBookingUrl,
  createPublicBookingUrl,
  getBookingByIdUrl,
  getPublicBookingByIdUrl,
  getSpecialRateUrl,
  selectSpecialRateUrl,
  recordSharedRateUrl 
  // getSingleBookingUrl,
} from "api/endpoints";

const getBookings = (query: string) => {
  return get(`${getBookingsUrl}?${query}`);
};

// const getSingleBooking = (id: string) => {
//   return get(getSingleBookingUrl + `/${id}`);
// };

const createNewShipment = (data: object, service = false) => {
  return post(createNewShipmentUrl + `?service_unavailable=${service}`, data);
};

const createBooking = (data: object) => {
  return post(createBookingUrl, data);
};

const createPublicBooking = (data: object) => {
  return post(createPublicBookingUrl, data);
};

const getBookingById = (id: string, isPublic = true) => {
  if (!isPublic) {
    return get(getBookingByIdUrl + `/${id}`);
  }
  return get(getPublicBookingByIdUrl + `/${id}`);

};

const getShipmentById = (id: string, format = true) => {
  return get(getShipmentByIdUrl + `/${id}?format_containers=${format}`);
};

const deleteShipDoc = (id: string) => {
  return del(deleteShipDocUrl + `/${id}`);
};

const getLiveRate = (data: object) => {
  return get(getLiveRateUrl + `/${data["id"]}?${data["query"]}`);
};

const getSpecialRate = (data: object) => {
  return get(getSpecialRateUrl + `?container_size=${data["container_size"]}&container_type=${data["container_type"]}`);
};

const selectLiveOceanRate = (data: object) => {
  return post(selectLiveOceanRateUrl + `/${data["shipment_id"]}`, data);
};

const selectSpecialRate = (data: object) => {
  return post(selectSpecialRateUrl, data);
};

const recordSharedRate = (data: object) => {
  return post(recordSharedRateUrl, data);
};

const uploadShipmentDoc = (data: any) => {
  return post(uploadShipmentDocUrl + `/${data.id}`, data.data);
};

const bookingServices = {
  getBookings,
  // getSingleBooking,
  createNewShipment,
  getBookingById,
  getShipmentById,
  getLiveRate,
  getSpecialRate,
  selectLiveOceanRate,
  uploadShipmentDoc,
  deleteShipDoc,
  createBooking,
  createPublicBooking,
  selectSpecialRate,
  recordSharedRate
};

export default bookingServices;
