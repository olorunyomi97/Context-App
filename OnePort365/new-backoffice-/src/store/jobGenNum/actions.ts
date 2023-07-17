import { GENERATE_JOB_NUMBER, GENERATE_JOB_NUMBER_SUCCESS, API_ERROR } from "./constants";
// import { IGenerateJobNumber } from "./types";

export const generateJobNumber = (data: any, callback: any) => {
    return {
        type: GENERATE_JOB_NUMBER,
        payload: { data, callback },
    };
};

export const generateJobNumberSuccess = (response: any) => {
    return {
        type: GENERATE_JOB_NUMBER_SUCCESS,
        payload: response,
    }
}

export const JobNumApiError = (error: any) => {
    return {
      type: API_ERROR,
      payload: error,
    };
  };