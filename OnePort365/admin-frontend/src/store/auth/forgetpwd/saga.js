import { takeEvery, put, call } from "redux-saga/effects"

// Login Redux States
import { FORGET_PASSWORD } from "./actionTypes"
import { userForgetPasswordSuccess, userForgetPasswordError } from "./actions"
 

 
//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user, history } }) {
  try {
       const response = yield call(null, user.email)
      if (response) {
        yield put(
          userForgetPasswordSuccess(
            "Reset link are sended to your mailbox, check there first"
          )
        )
      }
     
   
  } catch (error) {
    yield put(userForgetPasswordError(error))
  }
}

function* forgetPasswordSaga() {
  yield takeEvery(FORGET_PASSWORD, forgetUser)
}

export default forgetPasswordSaga
