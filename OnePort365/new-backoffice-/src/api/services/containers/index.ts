import { get, post, put } from "helpers/axios"
import { getContainersUrl } from "api/endpoints";

const getContainers = (query: string) => {
    return get(`${getContainersUrl}?${query}`);
}


const containerServices = {
    getContainers,
}

export default containerServices;