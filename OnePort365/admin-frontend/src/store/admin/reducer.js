import {
  CREATE_ADMIN_USER,
  CREATE_ADMIN_USER_SUCCESSFUL,
  CREATE_ADMIN_USER_FAILED,
  API_ERROR
} from "./actionTypes"

const initialState = {
  error: "",
  message: null,
  loading: false,
  success:false,
}

const admin = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ADMIN_USER:
      state = {
        ...state,
        user: null,
        loading: true,
        error: null,
      }
      break
    case CREATE_ADMIN_USER_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        user: action.payload,
        message: action.payload,
        success:true,
        error: null,
      }
      break
    case CREATE_ADMIN_USER_FAILED:
      state = {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      }
      break
    case API_ERROR:
        state = { ...state, error: action.payload, loading: false }
        break
    default:
      state = { ...state }
      break
  }
  return state
}

export default admin
