import { get, post } from "helpers/axios";
import { getContactUsContactUrl, getRequestCallbackContactUrl, UpdateMessageStatusUrl } from "api/endpoints";

const getContactUsContacts = () => {
    return get(getContactUsContactUrl);
}

const getRequestCallbackContacts = () => {
    return get(getRequestCallbackContactUrl);
}

const updateMessageStatus= (id: any, data) => {
    return post(UpdateMessageStatusUrl + `/${id}` ,data);
}

const contactServices = {
    getContactUsContacts,
    getRequestCallbackContacts,
    updateMessageStatus
}

export default contactServices;