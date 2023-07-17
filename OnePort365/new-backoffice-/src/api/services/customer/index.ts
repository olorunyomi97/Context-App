import { get, post, put, del } from "helpers/axios";
import { getCustomersUrl, createCustomersUrl, updateCustomersUrl, getSingleCustomerUrl, searchCustomerUrl, deleteCustomerUrl } from "api/endpoints";

const getCustomers = () => {
    return get(getCustomersUrl);
}

const getSingleCustomer = (id: string) => {
    return get(getSingleCustomerUrl + `/${id}`);
}

const createCustomers = (data: object) => {
    return post(createCustomersUrl, data);
}

const updateCustomers = (data: any) => {
    return put(updateCustomersUrl + `/${data.id}`, data);
}

const searchCustomers = (data: object) => {
    return get(searchCustomerUrl + "?query=" + data);
}

const deleteCustomer = (id: any) => {
    return del(deleteCustomerUrl + `/${id}`);
};

const customerServices = {
    getCustomers,
    getSingleCustomer,
    createCustomers,
    updateCustomers,
    searchCustomers,
    deleteCustomer,
}

export default customerServices;