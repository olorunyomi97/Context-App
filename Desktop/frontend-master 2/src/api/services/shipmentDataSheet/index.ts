import { get, post } from "helpers/axios";
import { completeDataSheetUrl, getDataSheetByIdUrl } from "api/endpoints";

const completeDataSheet = (data) => {
  return post(
    `${completeDataSheetUrl}/${data.rate_id}/${data.sheet_section}`,
    data.data
  );
};

const getDataSheetById = (data) => {
  return get(
    `${getDataSheetByIdUrl}/${data.rate_id}/${data.datasheet_id}?sheet_section=${data.sheet_section}`
  );
};

const dataSheetServices = {
  completeDataSheet,
  getDataSheetById,
};

export default dataSheetServices;
