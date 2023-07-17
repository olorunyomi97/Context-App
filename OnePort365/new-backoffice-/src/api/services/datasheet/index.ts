import { get, post } from "helpers/axios";
import { modifyDataSheetUrl, getDatasheetSummaryUrl, getDatasheetNavUrl, modifyFormDataSheetUrl } from "api/endpoints"

const getDatasheetNav = (data: any) => {
    return get(getDatasheetNavUrl + `/${data.id}/${data.datasheet_id}`);
};

const getDatasheetSummary = (data: any) => {
    return get(getDatasheetSummaryUrl + `/${data.id}/${data.datasheet_id}?sheet_section=${data.sheet_section}`);
};

const modifyDatasheet = (data: any) => {
    console.log(data)
    return post(modifyDataSheetUrl + `/${data.id}/${data.category}`, data);
}

const modifyFormDatasheet = (data: any) => {
    console.log(data)
    return post(modifyFormDataSheetUrl + `/${data.id}/${data.category}`, data.data);
}


const datasheetServices = {
    getDatasheetNav,
    modifyDatasheet,
    modifyFormDatasheet,
    getDatasheetSummary,
}

export default datasheetServices;