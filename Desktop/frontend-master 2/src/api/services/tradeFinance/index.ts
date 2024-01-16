import { post } from "helpers/axios";

import { createLoanApplicationUrl } from "api/endpoints";

const createLoanApplication = (data: any) => {
  return post(createLoanApplicationUrl + `/${data.id}`, data.data);
};

const tradeFinanceServices = {
  createLoanApplication,
};

export default tradeFinanceServices;
