import { 
    GET_ALL_INVOICES, 
    GET_ALL_INVOICES_SUCCESS, 
    GET_SINGLE_INVOICE, 
    GET_SINGLE_INVOICE_SUCCESS,
    GET_SINGLE_INVOICE_DETAILS, 
    GET_SINGLE_INVOICE_DETAILS_SUCCESS,
    ATTACH_INVOICE,
    ATTACH_INVOICE_SUCCESS, 
    ATTACH_PROOF_OF_PAYMENT,
    ATTACH_PROOF_OF_PAYMENT_SUCCESS,
    DELETE_INVOICE, 
    DELETE_INVOICE_SUCCESS, 
    API_ERROR, 
} from "./constant";

export const getAllInvoices = () => {
    return {
        type: GET_ALL_INVOICES,
    }
}

export const getInvoiceSuccess = (invoices: any) => {
    return {
        type: GET_ALL_INVOICES_SUCCESS,
        payload: invoices,
    }
}

export const getSingleInvoice = (id: any) => {
    return {
        type: GET_SINGLE_INVOICE,
        payload: { id },
    }
}

export const getSingleInvoiceSuccess = (response: any) => {
    return {
        type: GET_SINGLE_INVOICE_SUCCESS,
        payload: response,
    }
}

export const getSingleInvoiceDetails = (data: any, callback: string) => {
    return {
        type: GET_SINGLE_INVOICE_DETAILS,
        payload: { data, callback },
    }
}

export const getSingleInvoiceDetailsSuccess = (response: any) => {
    return {
        type: GET_SINGLE_INVOICE_DETAILS_SUCCESS,
        payload: response,
    }
}

export const attachInvoice = (data: any, callback: string) => {
    return {
        type: ATTACH_INVOICE,
        payload: { data, callback },
    }
}

export const attachInvoiceSuccess = (response: any) => {
    return {
        type: ATTACH_INVOICE_SUCCESS,
        payload: response, 
    }
}

export const attachProofOfPayment = (data: any, callback: string) => {
    return {
        type: ATTACH_PROOF_OF_PAYMENT,
        payload: { data, callback },
    }
}

export const attachProofOfPaymentSuccess = (response: any) => {
    return {
        type: ATTACH_PROOF_OF_PAYMENT_SUCCESS,
        payload: response, 
    }
}

export const deleteInvoice = (id: any) => {
    return {
        type: DELETE_INVOICE,
        payload: { id },
    };
};

export const deleteInvoiceSuccess = (response: any) => {
    return {
        type: DELETE_INVOICE_SUCCESS,
        payload: response,
    };
};

export const InvoiceApiError = (error:any) => {
    return {
        type: API_ERROR,
        payload: error,
    };
};