import { get, post } from "helpers/axios";
import { 
    getQuotesUrl, 
    getMyQuotesUrl,
    getCreatedQuotesUrl,
    getPendingAdminQuotesUrl,
    processPendingAdminQuotesUrl,
    getPendingCustomerQuotesUrl,
    getAcceptedQuotesUrl,
    getSingleQuoteUrl, 
    attachQuoteUrl ,
    filterQuoteUrl
} from "api/endpoints";

const getQuotes = (query :string) => {
    return get(getQuotesUrl + `${query}`)
}

const getMyQuotes =  (query :string) => {
    return get(getMyQuotesUrl  + `${query}`);
}

const getCreatedQuotes =  (query :string) => {
    return get(getCreatedQuotesUrl  + `${query}`);
}

const getPendingAdminQuotes =  (query :string) => {
    return get(getPendingAdminQuotesUrl  + `${query}`);
}

const processPendingAdminQuotes = (id: string) => {
    return get(processPendingAdminQuotesUrl + `/${id}`);
}

const getPendingCustomerQuotes =  (query :string) => {
    return get(getPendingCustomerQuotesUrl  + `${query}`);
}

const getAcceptedQuotes =  (query :string) => {
    return get(getAcceptedQuotesUrl  + `${query}`);
}

const getSingleQuote = (id: string) => {
    return get(getSingleQuoteUrl + `/${id}`);
};

const attachQuote = (data: any) => {
    return post(attachQuoteUrl + `/${data.id}`, data.data);
}

const filterQuotes = () => {
    return get(filterQuoteUrl);
}


const quoteServices = {
    getQuotes,
    getMyQuotes,
    getCreatedQuotes,
    getPendingAdminQuotes,
    processPendingAdminQuotes,
    getPendingCustomerQuotes,
    getAcceptedQuotes,
    getSingleQuote,
    attachQuote,
    filterQuotes,
}

export default quoteServices;