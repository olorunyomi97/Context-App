import {
    GET_TRIP_EVENTS_BY_ID,
    API_ERROR
} from "./constants";

export const getTripEventsById = (id: string) => {
    return {
        type: GET_TRIP_EVENTS_BY_ID.REQUEST,
        payload: { id }
    }
}

export const getTripEventsByIdSuccess = (response: any) => {
    return {
        type: GET_TRIP_EVENTS_BY_ID.SUCCESS,
        payload: response
    }
}

export const trackingApiError = (error: any) => {
    return {
      type: API_ERROR,
      payload: error,
    };
  };