import { call, put, takeEvery } from "redux-saga/effects";
import cogoToast from "cogo-toast";

import customerServices from "api/services/customer";

import { GET_CUSTOMERS, CREATE_CUSTOMER, UPDATE_CUSTOMER, GET_SINGLE_CUSTOMER, SEARCH_CUSTOMER, DELETE_CUSTOMER } from "./constants";
import { ResponseGenerator } from "store/type";
import { getCustomersSuccess, getSingleCustomerSuccess, createCustomerSuccess, updateCustomerSuccess, searchCustomerSuccess, deleteCustomerSuccess, CustomerApiError } from "./actions";

function* doGetCustomers() {
    try {
        const response: ResponseGenerator = yield call(customerServices.getCustomers);
        // console.log('Customers in Saga', response.data.data);
        yield put(getCustomersSuccess(response));
    } catch (error) {
        yield put(CustomerApiError(error));
    }
}

function* doGetSingeCustomer({ payload }: any) {
    try {
        const { id } = payload
        const response: ResponseGenerator = yield call(customerServices.getSingleCustomer, id);
        // console.log(response.data.data)
        yield put(getSingleCustomerSuccess(response));
    } catch (error) {
        yield put(CustomerApiError(error));
    }
}

function* doCreateCustomers({ payload }: any) {
    try {
        const { data } = payload;
        const response: ResponseGenerator = yield call(customerServices.createCustomers, data);

        if (response.data.status === "success") {
            yield put(createCustomerSuccess(response.data));

            cogoToast.success("Customer Successfully Created")

            window.location.replace(`${window.location.origin}/customers`);

        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(CustomerApiError(error));

    }
}

function* doUpdateCustomers({ payload }: any) {
    try {
        console.log(payload)
        const { data, callback } = payload;
        // console.log(data);
        // console.log(callback);
        const update_payload = { ...payload.data, ...payload.callback };
        console.log(update_payload)
        const response: ResponseGenerator = yield call(customerServices.updateCustomers, update_payload)

        if (response.data.status === "success") {
            yield put(updateCustomerSuccess(response.data));

            cogoToast.success("Customer Details Successfully Updated")
            window.location.reload();
            // window.location.replace(`${window.location.origin}/customers/customer-shipment/${data.id}`);
            // callback();
        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";
        cogoToast.error(message);
        yield put(CustomerApiError(error));
    }
}

function* doSearchCustomers({ payload }: any) {
    try {
        const { data } = payload;
        const response: ResponseGenerator = yield call(customerServices.searchCustomers, data);

        if (response.data.status === "success") {
            yield put(searchCustomerSuccess(response.data));
            // cogoToast.success("Customer Successfully Selected")
            // window.location.replace(`${window.location.origin}/customers`);

        }
    } catch (error) {
        const message = error["response"]["data"]["message"] || error.message || "network error";
        // cogoToast.error(message);
        yield put(CustomerApiError(error));

    }
}

function* doDeleteCustomer({ payload }: any) {
    try {
        const { id } = payload;
        console.log(id)
        const response: ResponseGenerator = yield call(customerServices.deleteCustomer, id)
        cogoToast.success('Customer successfully Deleted')
        window.location.replace(`${window.location.origin}/customers`);
        if (response.data) {
            yield put(deleteCustomerSuccess(response.data));
        }

    } catch (error) {
        const message = error["response"] || error.message || "network error";
        cogoToast.error(message);
        yield put(CustomerApiError(error));
    }
}



function* customersSaga() {
    yield takeEvery(GET_CUSTOMERS, doGetCustomers);
    yield takeEvery(GET_SINGLE_CUSTOMER, doGetSingeCustomer);
    yield takeEvery(CREATE_CUSTOMER, doCreateCustomers);
    yield takeEvery(UPDATE_CUSTOMER, doUpdateCustomers);
    yield takeEvery(SEARCH_CUSTOMER, doSearchCustomers);
    yield takeEvery(DELETE_CUSTOMER, doDeleteCustomer);
}

export default customersSaga;