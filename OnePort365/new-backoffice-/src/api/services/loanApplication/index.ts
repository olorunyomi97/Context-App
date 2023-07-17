import { get,post,put } from "helpers/axios"
import { getLoanApplicationsUrl, getSingleLoanApplicationUrl, updateLoanPaymentStatusUrl } from "api/endpoints";

const getLoanApplications = () => {
    return get(getLoanApplicationsUrl);
}

const getSingleLoanApplication = (id: string) => {
    return get(getSingleLoanApplicationUrl + `/${id}`);
}

const updateLoanPaymentStatus = (data: any) => {
    return put(updateLoanPaymentStatusUrl + `/${data.id}`, data);
}


const loanApplicationServices = {
    getLoanApplications,
    getSingleLoanApplication,
    updateLoanPaymentStatus,
}

export default loanApplicationServices;