import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import {
    CREATE_ADMIN_USER,
  } from "./actionTypes"

import {createAdminUserSuccessful,apiError} from "./actions"

//services
import adminManagementServices from "../../api/services/admin/index";
 
function* createAdminUser({ payload: { user } }) {
    try {
        const response = yield call(adminManagementServices.create, {
         email: user.email,
         firstname: user.firstname,
         lastname: user.lastname,
         phone: user.phone,
       })
        if(response.status =="success"){
            //success
           // window.location="admins/overview";
       } 
       yield put(createAdminUserSuccessful(response.data))
    } catch (error) {
       const message =
       error["response"]["data"]["message"] || error.message || "network error";
         yield put(apiError(message))
   }
}

function* adminSaga() {
    yield takeEvery(CREATE_ADMIN_USER, createAdminUser)

 }

export default adminSaga
