import { get, post, del } from "helpers/axios";

import { getTripEventsByIdUrl } from "api/endpoints";

const getTripEventsById = (id: string) => {
    return get(getTripEventsByIdUrl + `/${id}`)
}

const trackingServices = {
    getTripEventsById
}

export default trackingServices;