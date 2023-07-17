import { post } from "helpers/axios";
import {
  initiateRateRequestUrl,
  updateExportAdditionalServicesUrl,
  updateExportCargoDetailsUrl,
  uploadExportRatesDocsUrl,
  uploadImportRatesDocsUrl,
  updateImportCargoDetailsUrl,
  updateImportAdditionalServicesUrl,
  requestNXPFormUrl,
  requestPARFormUrl,
} from "api/endpoints";

const initiateRateRequest = (data: object) => {
  return post(initiateRateRequestUrl, data);
};

//export
const uploadExportRatesDocs = (data: any) => {
  return post(uploadExportRatesDocsUrl + `/${data.id}`, data.data);
};

const updateExportCargoDetails = (data: any) => {
  return post(updateExportCargoDetailsUrl + `/${data.id}`, data.data);
};

const updateExportAdditionalServices = (data: any) => {
  return post(updateExportAdditionalServicesUrl + `/${data.id}`, data.data);
};

const requestNXPForm = (data: any) => {
  return post(requestNXPFormUrl + `/${data.id}`, data.data);
};

//import
const uploadImportRatesDocs = (data: any) => {
  return post(uploadImportRatesDocsUrl + `/${data.id}`, data.data);
};

const updateImportCargoDetails = (data: any) => {
  return post(updateImportCargoDetailsUrl + `/${data.id}`, data.data);
};

const updateImportAdditionalServices = (data: any) => {
  return post(updateImportAdditionalServicesUrl + `/${data.id}`, data.data);
};

const requestPARForm = (data: any) => {
  return post(requestPARFormUrl + `/${data.id}`, data.data);
};

const rateServices = {
  initiateRateRequest,
  uploadExportRatesDocs,
  updateExportCargoDetails,
  updateExportAdditionalServices,
  requestNXPForm,
  uploadImportRatesDocs,
  updateImportCargoDetails,
  updateImportAdditionalServices,
  requestPARForm,
};

export default rateServices;
