import { get, post, put } from "helpers/axios";
import {
  getMyQuotesUrl,
  getQuoteByIdUrl,
  linkUserToQuoteUrl,
  acceptQuoteURl,
  requestFollowUpUrl,
} from "api/endpoints";

const getMyQuotes = () => {
  return get(getMyQuotesUrl);
};

const getQuoteById = (id: string) => {
  return get(getQuoteByIdUrl + `/${id}`);
};

const linkUserToQuote = (data: any) => {
  const { id, token } = data;
  let auth = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  return put(linkUserToQuoteUrl + `/${id}`, {}, auth);
};

const acceptQuote = (data: any) => {
  return post(acceptQuoteURl + `/${data.id}`, data.data);
};

const requestFollowUp = (data: any) => {
  return post(requestFollowUpUrl + `/${data.id}`, data.data);
};

const quoteServices = {
  getMyQuotes,
  getQuoteById,
  linkUserToQuote,
  acceptQuote,
  requestFollowUp,
};

export default quoteServices;
