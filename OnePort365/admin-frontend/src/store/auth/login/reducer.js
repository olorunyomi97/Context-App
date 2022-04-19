import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  CLEAR_API_ERROR,
  VERIFY_OTP,
  VERIFY_OTP_SUCCESS,
  RESEND_OTP_SUCCESS,
  RESEND_OTP
} from "./actionTypes"

const initialState = {
  error: "",
  loading: false,
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
      }
      break
    case LOGOUT_USER:
      state = { ...state }
      break
    case LOGOUT_USER_SUCCESS:
      state = { ...state }
      break
    case VERIFY_OTP:
        state = {
          ...state,
          loading: true,
        }
        break
    case VERIFY_OTP_SUCCESS:
          state = { ...state }
          break
    case RESEND_OTP:
            state = {
              ...state,
              loading: true,
            }
            break
   case RESEND_OTP_SUCCESS:
        state = {
          ...state,
          loading: false,
        }
            break

    case API_ERROR:
      state = { ...state, error: action.payload, loading: false }
      break
    case CLEAR_API_ERROR:
      state = { ...state, error: "" };
      break;
    default:
      state = { ...state }
      break
  }
  return state
}

export default login
