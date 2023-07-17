import { get } from "helpers/axios";
import { getMyQuotesUrl, } from "api/endpoints";

const getMyQuotes = () => {
  return get(getMyQuotesUrl);
};

// const getQuoteById = (id: string) => {
//   return get(getQuoteByIdUrl + `/${id}`);
// };

const quoteServices = {
  getMyQuotes,
  // getQuoteById,
};

export default quoteServices;
