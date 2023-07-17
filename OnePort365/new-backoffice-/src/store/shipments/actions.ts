import {
    GET_SHIPMENTS,
    GET_SHIPMENTS_SUCCESS,
    ADD_EXPORT_SHIPMENT,
    ADD_EXPORT_SHIPMENT_SUCCESS,
    GET_SINGLE_SHIPMENT,
    GET_SINGLE_SHIPMENT_SUCCESS,
    EDIT_SHIPMENT_DETAILS,
    EDIT_SHIPMENT_DETAILS_SUCCESS,
    EDIT_AIR_SHIPMENT_DETAILS,
    EDIT_AIR_SHIPMENT_DETAILS_SUCCESS,
    EDIT_CONTAINER_DETAILS,
    EDIT_CONTAINER_DETAILS_SUCCESS,
    EDIT_CONTAINER_STATUS,
    EDIT_CONTAINER_STATUS_SUCCESS,
    GET_CONTAINER_STATUS_HISTORY,
    GET_CONTAINER_STATUS_HISTORY_SUCCESS,
    UPLOAD_SHIPMENT_DOCS,
    UPLOAD_SHIPMENT_DOCS_SUCCESS,
    DELETE_SHIPMENT,
    DELETE_SHIPMENT_SUCCESS,
    DELETE_CONTAINER,
    DELETE_CONTAINER_SUCCESS,
    API_ERROR
} from "./constants";

export const getShipments = (data: any) => {
    return {
        type: GET_SHIPMENTS,
        payload: { data },
    }
}

export const getShipmentsSuccess = (response: any) => {
    return {
        type: GET_SHIPMENTS_SUCCESS,
        payload: response,
    }
}

export const addExportShipment = (data: any) => {
    console.log('Export Shipment Data', data)
    return {
        type: ADD_EXPORT_SHIPMENT,
        payload: { data },
    };
};

export const addExportShipmentSuccess = (response: any) => {
    return {
        type: ADD_EXPORT_SHIPMENT_SUCCESS,
        payload: response,
    };
};

export const getSingleShipment = (id: any, data: any) => {
    return {
        type: GET_SINGLE_SHIPMENT,
        payload: { id, data },
    };
};

export const getSingleShipmentSuccess = (response: any) => {
    return {
        type: GET_SINGLE_SHIPMENT_SUCCESS,
        payload: response,
    };
};

export const editShipmentDetails = (data: any, callback: any) => {
    console.log(data);
    console.log(callback);
    return {
        type: EDIT_SHIPMENT_DETAILS,
        payload: { data, callback },

    };
};
export const editShipmentDetailsSuccess = (response: any) => {
    return {
        type: EDIT_SHIPMENT_DETAILS_SUCCESS,
        payload: response,
    };
};

export const editAirShipmentDetails = (data: any, callback: any) => {
    console.log(data);
    console.log(callback);
    return {
        type: EDIT_AIR_SHIPMENT_DETAILS,
        payload: { data, callback },

    };
};
export const editAirShipmentDetailsSuccess = (response: any) => {
    return {
        type: EDIT_AIR_SHIPMENT_DETAILS_SUCCESS,
        payload: response,
    };
};

export const editContainerDetails = (data: any) => {
    console.log(data);
    return {
        type: EDIT_CONTAINER_DETAILS,
        payload: { data },

    };
};
export const editContainerDetailsSuccess = (response: any) => {
    return {
        type: EDIT_CONTAINER_DETAILS_SUCCESS,
        payload: response,
    };
};

export const editContainerStatus = (data: any) => {
    console.log(data);
    return {
        type: EDIT_CONTAINER_STATUS,
        payload: { data },

    };
};
export const editContainerStatusSuccess = (response: any) => {
    return {
        type: EDIT_CONTAINER_STATUS_SUCCESS,
        payload: response,
    };
};

export const getContainerStatusHistory = (id: any) => {
    return {
        type: GET_CONTAINER_STATUS_HISTORY,
        payload: { id },
    }
}

export const getContainerStatusHistorySuccess = (response: any) => {
    return {
        type: GET_CONTAINER_STATUS_HISTORY_SUCCESS,
        payload: response,
    }
}

export const uploadShipmentDocs = (data: any) => {
    console.log(data);
    // console.log(callback);
    return {
        type: UPLOAD_SHIPMENT_DOCS,
        payload: { data },

    };
};
export const uploadShipmentDocsSuccess = (response: any) => {
    return {
        type: UPLOAD_SHIPMENT_DOCS_SUCCESS,
        payload: response,
    };
};

export const deleteShipment = (id: any) => {
    return {
        type: DELETE_SHIPMENT,
        payload: { id },
    };
};

export const deleteShipmentSuccess = (response: any) => {
    return {
        type: DELETE_SHIPMENT_SUCCESS,
        payload: response,
    };
};

export const deleteContainer = (id: any) => {
    return {
        type: DELETE_CONTAINER,
        payload: { id },
    };
};

export const deleteContainerSuccess = (response: any) => {
    return {
        type: DELETE_CONTAINER_SUCCESS,
        payload: response,
    };
};

export const ShipmentApiError = (error: any) => {
    return {
        type: API_ERROR,
        payload: error,
    };
}