import { get, post } from "helpers/axios";

import {
    getRateByIdUrl,
    initiateAdminRateRequestUrl,
    updateAdminExportAdditionalServicesUrl,
    updateAdminExportCargoDetailsUrl,
    uploadAdminExportRatesDocsUrl,
    uploadAdminImportRatesDocsUrl,
    updateAdminImportCargoDetailsUrl,
    updateAdminImportAdditionalServicesUrl,
    // getLiveRatesUrl,
    initiateLiveRatesRequestUrl,
    saveLiveRatesSelectionUrl,
    getSelectedLiveRatesUrl,
    confirmLiveRatesUrl,
  } from "api/endpoints";

  const getRateById = (id: string) => {
    return get(getRateByIdUrl + `/${id}`);
  };

  const initiateAdminRateRequest = (data: object) => {
    return post(initiateAdminRateRequestUrl, data);
  };

  // const initiateAdminRateRequest = (data: any) => {
  //   return post(initiateAdminRateRequestUrl + `/${data.id}`, data);
  // };
  
  //export
  const uploadAdminExportRatesDocs = (data: any) => {
    return post(uploadAdminExportRatesDocsUrl + `/${data.id}`, data.data);
  };
  
  const updateAdminExportCargoDetails = (data: any) => {
    return post(updateAdminExportCargoDetailsUrl + `/${data.id}`, data.data);
  };
  
  const updateAdminExportAdditionalServices = (data: any) => {
    return post(updateAdminExportAdditionalServicesUrl + `/${data.id}`, data.data);
  };

  
  //import
  const uploadAdminImportRatesDocs = (data: any) => {
    return post(uploadAdminImportRatesDocsUrl + `/${data.id}`, data.data);
  };
  
  const updateAdminImportCargoDetails = (data: any) => {
    return post(updateAdminImportCargoDetailsUrl + `/${data.id}`, data.data);
  };
  
  const updateAdminImportAdditionalServices = (data: any) => {
    return post(updateAdminImportAdditionalServicesUrl + `/${data.id}`, data.data);
  };

  const initiateLiveRatesRequest = (id: string) => {
    return get(initiateLiveRatesRequestUrl + `/${id}`);
  };

  const saveLiveRatesSelection = (data: any) => {
    return post(saveLiveRatesSelectionUrl + `/${data.id}`, data.data);
  };
  
  const getSelectedLiveRates = (id: string) => {
    return get(getSelectedLiveRatesUrl + `/${id}`);
  };
  
  const confirmLiveRates = (id: string) => {
    return get(confirmLiveRatesUrl + `/${id}`);
  };

  // const getLiveRates = (id: string) => {
  //   return get(getLiveRatesUrl + `/${id}`);
  // };

  
  const AdminRateServices = {
    getRateById,
    initiateAdminRateRequest,
    uploadAdminExportRatesDocs,
    updateAdminExportCargoDetails,
    updateAdminExportAdditionalServices,
    uploadAdminImportRatesDocs,
    updateAdminImportCargoDetails,
    updateAdminImportAdditionalServices,
    initiateLiveRatesRequest,
    saveLiveRatesSelection,
    getSelectedLiveRates,
    confirmLiveRates,
  };
  
  export default AdminRateServices;
  