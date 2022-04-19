import {
  CREATE_ADMIN_USER,
  CREATE_ADMIN_USER_SUCCESSFUL,
  CREATE_ADMIN_USER_FAILED,
  API_ERROR
} from "./actionTypes"

export const createAdminUser = user => {
  return {
    type: CREATE_ADMIN_USER,
    payload: { user },
  }
}
export const createAdminUserSuccessful = user => {
  return {
    type: CREATE_ADMIN_USER_SUCCESSFUL,
    payload: user,
  }
}
export const createAdminUserFailed = user => {
  return {
    type: CREATE_ADMIN_USER_FAILED,
    payload: user,
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}