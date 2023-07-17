import { get } from "helpers/axios";
import { getNewQuotesUrl, getNewSingleQuoteUrl } from "api/endpoints";

const getNewQuotes = () => {
    return get(getNewQuotesUrl);
};

const getNewSingleQuote = (id: string) => {
    return get(getNewSingleQuoteUrl + `/${id}`);
};


const quoteServices = {
    getNewQuotes,
    getNewSingleQuote,
};

export default quoteServices;
