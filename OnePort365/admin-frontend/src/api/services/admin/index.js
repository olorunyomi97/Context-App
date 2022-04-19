import { post } from "../../../helpers/api_helper";
import {
    createAdminUrl,
} from "../../endpoints/index";

const create = (data) => {
  return post(createAdminUrl, data);
};
 

const adminManagementServices = {
    create
};

export default adminManagementServices;
