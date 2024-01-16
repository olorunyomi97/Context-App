import {
  LOGIN_USER,
  REGISTER_USER,
  VALIDATE_PHONE_AND_EMAIL,
  VALIDATE_REGISTRATION,
  RESEND_VERIFICATION,
  LOGOUT_USER,
  API_ERROR,
  CLEAR_API_ERROR,
  VERIFY_LOGIN,
  FORGOT_PASSWORD_OTP_VERIFY,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  COUNTRY_UPDATE
} from "store/auth/constants";

const initialState = {
  error: "",
  apiError: null,
  loading: false,
  otp_data: {},
  user_token: null,
  user_data: null,
  user_country: "NG"
};

const auth = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_USER.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case FORGOT_PASSWORD.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case FORGOT_PASSWORD.SUCCESS:
      state = {
        ...state,
        loading: false,
        error: "",
      };
      break;

    case FORGOT_PASSWORD.FAILURE:
      state = {
        ...state,
        loading: false,
        error: "error",
      };
      break;

    case FORGOT_PASSWORD_OTP_VERIFY.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case FORGOT_PASSWORD_OTP_VERIFY.SUCCESS:
      state = {
        ...state,
        loading: false,
        error: "",
      };
      break;

    case FORGOT_PASSWORD_OTP_VERIFY.FAILURE:
      state = {
        ...state,
        loading: false,
        error: "error",
      };
      break;

    case RESET_PASSWORD.SUCCESS:
      state = {
        ...state,
        loading: false,
        error: "",
      };
      break;

    case RESET_PASSWORD.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case RESET_PASSWORD.FAILURE:
      state = {
        ...state,
        loading: false,
        error: "error",
      };
      break;

    case LOGIN_USER.SUCCESS:
      Promise.resolve()
        .then(() => {
          localStorage.setItem("token", action.payload.jwt_token);
          localStorage.setItem(
            "user_data",
            JSON.stringify(action.payload.user)
          );
        })
        .then(() => {
          state = {
            ...state,
            user_token: action.payload.jwt_token,
            user_data: action.payload.user,
            loading: false,
            error: "",
          };
        })
        .then(() => {
          if (action.payload.user.last_login_date === undefined) {
            window.location.replace(
              `${window.location.origin}/team-verification/?email=${action.payload.user.email}`
            );
          } else {
            window.location.replace(
              `${window.location.origin}${action.payload.redirect}`
            );
          }
        });
      break;

    case REGISTER_USER.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case REGISTER_USER.SUCCESS:
      state = {
        ...state,
        otp_data: action.payload,
        loading: false,
        error: "",
      };
      break;

    case VALIDATE_PHONE_AND_EMAIL.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case VALIDATE_PHONE_AND_EMAIL.SUCCESS:
      state = {
        ...state,
        loading: false,
        error: "",
      };
      break;

    case VALIDATE_REGISTRATION.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case VALIDATE_REGISTRATION.SUCCESS:
      state = {
        ...state,
        user_token: action.payload.jwt_token,
        user_data: action.payload.user,
        loading: false,
        error: "",
      };
      break;

    case RESEND_VERIFICATION.REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;

    case RESEND_VERIFICATION.SUCCESS:
      state = {
        ...state,
        otp_data: action.payload,
        loading: false,
        error: "",
      };
      break;

    case VERIFY_LOGIN:
      state = {
        ...state,
        otp_data: action.payload,
        loading: false,
      };
      break;

    case COUNTRY_UPDATE.REQUEST:
      state = {
        ...state,
        user_country: action.payload
      }
      break;

    case LOGOUT_USER.REQUEST:
      localStorage.setItem("token", "");
      localStorage.setItem("user_data", "");
      sessionStorage.setItem("shipmentId", "");
      sessionStorage.setItem("openShipmentId", "");
      sessionStorage.setItem("invalidJobNumber", "");
      sessionStorage.setItem("jobNumber", "");
      sessionStorage.setItem('toSpecial', JSON.stringify(false));
      sessionStorage.setItem('haulageId', "")
      sessionStorage.setItem('customId', "")
      state = { ...state };
      break;

    case LOGOUT_USER.SUCCESS:
      state = { ...state };
      break;

    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;

    case CLEAR_API_ERROR:
      state = { ...state, error: "" };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default auth;
