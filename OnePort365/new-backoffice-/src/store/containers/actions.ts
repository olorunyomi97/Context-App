import { 
    GET_CONTAINERS, 
    GET_CONTAINERS_SUCCESS, 
    API_ERROR 
} from "./constants";

export const getContainers = (data:any) => {
    return {
        type: GET_CONTAINERS,
        payload: { data },
    }
}

export const getContainersuccess = (response: any) => {
    return {
        type: GET_CONTAINERS_SUCCESS,
        payload: response, 
    }
}

export const ContainerApiError = (error: any) => {
    return {
        type: API_ERROR,
        payload: error,
    };
};