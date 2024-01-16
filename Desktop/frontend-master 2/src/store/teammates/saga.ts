import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

//services
import teammatesServices from "api/services/teammates";

//helpers
import { errorHandler } from "helpers/errorHandler";

//constants
import {
  GET_TEAMMATES,
  INVITE_TEAMMATES,
  UPDATE_TEAMMATES,
  DELETE_TEAMMATES,
} from "./constants";

import { ResponseGenerator } from "store/type";

//actions
import {
  getTeammatesSuccess,
  getTeammatesApiError,
  inviteTeammateSuccess,
  updateTeammateSuccess,
  deleteTeammateSuccess,
} from "store/actions";

function* getTeammates({ payload }: any) {
  const { data } = payload;
  try {
    const response: ResponseGenerator = yield call(
      teammatesServices.getTeammates,
      data
    );

    if (response.data) {
      yield put(getTeammatesSuccess(response.data));
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(getTeammatesApiError(message));
  }
}

function* inviteTeammates({ payload }: any) {
  try {
    const { data, callback } = payload;

    const response: ResponseGenerator = yield call(
      teammatesServices.inviteTeammates,
      data
    );

    if (response.data) {
      yield put(inviteTeammateSuccess(response.data));
      toast.success("Team mate invited");
      if (callback === undefined) {
      } else {
        callback();
      }
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(getTeammatesApiError(message));
  }
}

function* updateTeammates({ payload }: any) {
  try {
    const { data, callback } = payload;

    const response: ResponseGenerator = yield call(
      teammatesServices.updateTeammates,
      data
    );

    if (response.data) {
      yield put(updateTeammateSuccess(response.data));
      toast.success("Team mate updated");
      if (callback === undefined) {
      } else {
        callback();
      }
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(getTeammatesApiError(message));
  }
}
function* deleteTeammates({ payload }: any) {
  try {
    const { id, callback } = payload;

    const response: ResponseGenerator = yield call(
      teammatesServices.deleteTeammates,
      id
    );

    if (response.data) {
      yield put(deleteTeammateSuccess({ id: id, data: response.data }));
      toast.success(response.data.message);
      if (callback === undefined) {
      } else {
        callback();
      }
    }
  } catch (error) {
    const message = errorHandler(error);
    yield put(getTeammatesApiError(message));
  }
}

export default function* teammatesSaga() {
  yield takeEvery(GET_TEAMMATES.REQUEST, getTeammates);
  yield takeEvery(INVITE_TEAMMATES.REQUEST, inviteTeammates);
  yield takeEvery(UPDATE_TEAMMATES.REQUEST, updateTeammates);
  yield takeEvery(DELETE_TEAMMATES.REQUEST, deleteTeammates);
}
