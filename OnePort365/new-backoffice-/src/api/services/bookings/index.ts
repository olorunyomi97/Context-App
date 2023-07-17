import { get, put } from "helpers/axios";
import { getBookingsUrl, getSingleBookingUrl, editBookingDetailsUrl, editBookingStatusUrl } from "api/endpoints";

const getBookings = (query: string) => {
    return get(`${getBookingsUrl}?${query}`);
};

const getSingleBooking = (id: string, query: string) => {
    return get(getSingleBookingUrl + `/${id}?${query}`);
};

const editBookingDetails = (data: any) => {
    return put(editBookingDetailsUrl + `/${data.id}`, data);
}

const editBookingStatus = (data: any) => {
    return put(editBookingStatusUrl + `/${data.id}`, data);
}


const bookingsServices = {
    getBookings,
    getSingleBooking,
    editBookingDetails,
    editBookingStatus,
};

export default bookingsServices;
