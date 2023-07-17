import {
    CREATE_SHIPMENT,
    CREATE_SHIPMENT_SUCCESS,
    API_ERROR
} from "./constants";

export const createShipment = (data: any) => {
    console.log('Export Shipment Data', data)
    return {
        type: CREATE_SHIPMENT,
        payload: { data },
    };
};

export const createShipmentSuccess = (response: any) => {
    return {
        type: CREATE_SHIPMENT_SUCCESS,
        payload: response,
    };
};



export const ShipmentPlusApiError = (error: any) => {
    return {
        type: API_ERROR,
        payload: error,
    };
}