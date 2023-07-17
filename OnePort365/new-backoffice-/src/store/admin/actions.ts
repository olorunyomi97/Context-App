import { 
    GET_ADMINS, 
    GET_ADMIN_SUCCESS,
    CREATE_ADMIN, 
    CREATE_ADMIN_SUCCESS, 
    DELETE_ADMIN, 
    DELETE_ADMIN_SUCCESS, 
    DEACTIVATE_ADMIN, 
    DEACTIVATE_ADMIN_SUCCESS, 
    API_ERROR
} from "./constants";

export const getAdmins = () => {
    return {
        type: GET_ADMINS,
        // payload: { data, callback },
    }
}

export const getAdminsSuccess = (admins:any) => {
    return {
        type: GET_ADMIN_SUCCESS,
        payload: admins,
    };
};

export const createAdmin = (data: any, callback: any)  => {
    return {
        type: CREATE_ADMIN,
        payload: { data, callback },
    };
};
export const createAdminSuccess = (response: any) => {
    return {
        type: CREATE_ADMIN_SUCCESS,
        payload: response,
    };
};

export const deleteAdmin = (id: any) => {
    return {
        type: DELETE_ADMIN,
        payload: { id },
    };
};

export const deleteAdminSuccess = (response: any) => {
    return {
        type: DELETE_ADMIN_SUCCESS,
        payload: response,
    };
};

export const deactivateAdmin = (id: any) => {
    return {
        type: DEACTIVATE_ADMIN,
        payload: { id },
    };
};

export const deactivateAdminSuccess = (response: any) => {
    return {
        type: DEACTIVATE_ADMIN_SUCCESS,
        payload: response,
    };
};

export const AdminApiError = (error: any) => {
    return {
        type: API_ERROR,
        payload: error,
    };
}