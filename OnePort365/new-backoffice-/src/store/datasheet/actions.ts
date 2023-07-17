import { 
    GET_DATASHEET_NAV, 
    GET_DATASHEET_NAV_SUCCESS,
    GET_DATASHEET_SUMMARY,
    GET_DATASHEET_SUMMARY_SUCCESS,
    MODIFY_DATASHEET,
    MODIFY_DATASHEET_SUCCESS,
    MODIFY_FORM_DATASHEET,
    MODIFY_FORM_DATASHEET_SUCCESS,
    API_ERROR,
} from "./constant";

export const getDatasheetGeneral = (data: any, callback: string) => {
    return {
        type: GET_DATASHEET_NAV,
        payload: { data, callback },
    }
}

export const getDatasheetGeneralSuccess = (response: any) => {
    return {
        type: GET_DATASHEET_NAV_SUCCESS,
        payload: response,
    }
}

export const getDatasheetSummary = (data: any, callback: any) => {
    return {
        type: GET_DATASHEET_SUMMARY,
        payload: { data, callback }
    }
}

export const getDatasheetSummarySuccess = (response: any) => {
    return {
        type: GET_DATASHEET_SUMMARY_SUCCESS,
        payload: response,
    }
}

export const modifyDatasheet = (data: string, callback: any)  => {
    console.log(data);
    console.log(callback);
    return {
        type: MODIFY_DATASHEET,
        payload: { data, callback },
        
    };
};
export const modifyDatasheetSuccess = (response: any) => {
    return {
        type: MODIFY_DATASHEET_SUCCESS,
        payload: response,
    };
};

export const modifyFormDatasheet = (data: string, callback: any)  => {
    console.log(data);
    console.log(callback);
    return {
        type: MODIFY_FORM_DATASHEET,
        payload: { data, callback },
        
    };
};
export const modifyFormDatasheetSuccess = (response: any) => {
    return {
        type: MODIFY_FORM_DATASHEET_SUCCESS,
        payload: response,
    };
};

export const datasheetApiError = (error: any) => {
    return {
        type: API_ERROR,
        payload: error,
    };
}