import { get, post, del, put } from "helpers/axios";
import { getAdminsUrl, createAdminUrl, deleteAdminUrl, deactivateAdminUrl } from "api/endpoints";

const getAdmins = () => {
    return get(getAdminsUrl);
}

const createAdmins = (data: object) => {
    return post(createAdminUrl, data);
}

const deleteAdmins = (id: any) => {
    return del(deleteAdminUrl + `/${id}`);
};

const deactivateAdmins = (id: any, data) => {
    return put(deactivateAdminUrl + `/${id}` ,data);
};

// const deleteAdmins = admin_id => {
//     return del(deleteAdminUrl + `/${admin_id}`);
// };

const adminServices = {
    getAdmins,
    createAdmins,
    deleteAdmins,
    deactivateAdmins,
}

export default adminServices;