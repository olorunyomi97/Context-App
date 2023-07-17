import { post } from "helpers/axios";
import { jobNumberGeneratorUrl } from "api/endpoints";

const generateJobNumber = (data: object) => {
    return post(jobNumberGeneratorUrl, data);
}

const JobNumberServices = {
    generateJobNumber
}

export default JobNumberServices;
