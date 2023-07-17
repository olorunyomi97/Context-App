import { get, post, put, del } from "helpers/axios"
import {
    getShipmentsUrl,
    addExportShipmentUrl,
    getSingleShipmentUrl,
    editShipmentDetailsUrl,
    editAirShipmentDetailsUrl,
    editContainerDetailsUrl,
    editContainerStatussUrl,
    getContainerStatusHistoryUrl,
    uploadShipmentDocsUrl,
    deleteShipmentUrl,
    deleteContainerUrl,
} from "api/endpoints";

const getShipments = (query: string) => {
    return get(`${getShipmentsUrl}?${query}`);
}

const getSingleShipment = (id: string, query: string) => {
    return get(getSingleShipmentUrl + `/${id}?${query}`);
};

const addExportShipment = (data: object) => {
    return post(addExportShipmentUrl, data);
}

const editShipmentDetails = (data: any) => {
    return put(editShipmentDetailsUrl + `/${data.id}`, data);
}

const editAirShipmentDetails = (data: any) => {
    return put(editAirShipmentDetailsUrl + `/${data.id}`, data);
}

const editContainerDetails = (data: any) => {
    return put(editContainerDetailsUrl + `/${data.id}`, data);
}

const editContainerStatus = (data: any) => {
    return put(editContainerStatussUrl + `/${data.id}`, data);
}

const getContainerStatusHistory = (id: string) => {
    return get(getContainerStatusHistoryUrl + `/${id}`)
}

const uploadShipmentDocs = (data: any) => {
    console.log('data>>>', data.document_name)
    return post(uploadShipmentDocsUrl + `/${data.id}` + `?document_name=${data.document_name}`, data.data);
}

const deleteShipment = (id: any) => {
    return del(deleteShipmentUrl + `/${id}`);
};

const deleteContainer = (id: any) => {
    return del(deleteContainerUrl + `/${id}`);
};

// const deleteContainer = (id: any, data) => {
//     return del(deleteContainerUrl + `/${id}`, data);
// };

const shipmentServices = {
    getShipments,
    addExportShipment,
    getSingleShipment,
    editShipmentDetails,
    editAirShipmentDetails,
    editContainerDetails,
    editContainerStatus,
    getContainerStatusHistory,
    uploadShipmentDocs,
    deleteShipment,
    deleteContainer,
}

export default shipmentServices;