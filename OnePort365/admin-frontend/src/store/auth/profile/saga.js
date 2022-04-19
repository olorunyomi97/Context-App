import { takeEvery, fork,put, call,all } from "redux-saga/effects"

// Login Redux States
import { EDIT_PROFILE } from "./actionTypes"
import { profileSuccess, profileError } from "./actions"
 
 
function* editProfile({ payload: { user } }) {
  try {
       const response = yield call(
        null,
        user.username,
        user.idx
      )
      yield put(profileSuccess(response))
    
  } catch (error) {
    yield put(profileError(error))
  }
}
export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
