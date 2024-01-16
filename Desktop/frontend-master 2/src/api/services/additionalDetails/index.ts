import { get, post } from "helpers/axios";
import {
  getInsuranceUrl,
  selectAdditionalServicesUrl,
  getBookingSummaryUrl,
  confirmBookingUrl,
} from "api/endpoints";

const getInsurance = (data: object) => {
  return get(`${getInsuranceUrl}/${data["shipment_id"]}?${data["query"]}`);
};

const selectAdditionalServices = (data: object) => {
  return post(
    `${selectAdditionalServicesUrl}/${data["shipment_id"]}`,
    data["data"]
  );
};

const getBookingSummary = (id: string) => {
  return get(`${getBookingSummaryUrl}/${id}`);
};

const confirmBooking = (data: object) => {
  return post(`${confirmBookingUrl}`, data);
};

const additionalDetailsServices = {
  getInsurance,
  selectAdditionalServices,
  getBookingSummary,
  confirmBooking,
};

export default additionalDetailsServices;
