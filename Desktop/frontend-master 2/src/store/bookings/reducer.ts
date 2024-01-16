import { GET_BOOKINGS, API_ERROR } from "store/bookings/constants";

const initialState = {
  error: null,
  loading: true,
  bookings: [],
  total_bookings: null,
  table_loading: false,
  // single_booking: {},
};

const bookings = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKINGS.SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: action.payload.bookings,
        total_bookings: action.payload.total_bookings,
        table_loading: false,
      };

    case GET_BOOKINGS.REQUEST:
      return {
        ...state,
        table_loading: true,
      };

    case API_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default bookings;
