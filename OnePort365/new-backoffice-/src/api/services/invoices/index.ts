import { get, post, del } from "helpers/axios";
import { getInvoicesUrl, getSingleInvoiceUrl, attachInvoiceUrl, attachProofOfPaymentUrl, getSingleInvoiceDetailsUrl, deleteInvoiceUrl } from "api/endpoints";

const getInvoices = () => {
    return get(getInvoicesUrl);
}

const getSingleInvoice = (id: string) => {
    return get(getSingleInvoiceUrl + `/${id}`);
};


const getSingleInvoiceDetails = (data: any) => {
    return get(getSingleInvoiceDetailsUrl + `/${data.id}/${data.invoice_id}`);
};

const attachInvoice = (data: any) => {
    return post(attachInvoiceUrl + `/${data.id}`, data.data);
}

const attachProofOfPayment = (data: any) => {
    return post(attachProofOfPaymentUrl + `/${data.id}`, data.data);
}

const deleteInvoice = (id: any) => {
    return del(deleteInvoiceUrl + `/${id}`)
}

const invoiceServices = {
    getInvoices,
    getSingleInvoice,
    attachInvoice,
    attachProofOfPayment,
    getSingleInvoiceDetails,
    deleteInvoice,
}

export default invoiceServices;