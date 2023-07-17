import { get, post } from "helpers/axios"

import { changePasswordUrl, editProfileUrl, getCurrentExchangeRatesUrl, updateCurrentExchangeRatesUrl } from "api/endpoints"

const changePassword = (data) => {
    return post(changePasswordUrl, data);
};

const editProfile = (data: any) => {
    return post(editProfileUrl, data)
}

const getCurrentExchangeRates = () => {
    return get(getCurrentExchangeRatesUrl)
}

const updateCurrentExchangeRates = (data: any) => {
    return post(updateCurrentExchangeRatesUrl, data)
}

const settingsServices = {
    changePassword,
    editProfile,
    getCurrentExchangeRates,
    updateCurrentExchangeRates,
  };
  
  export default settingsServices;
  