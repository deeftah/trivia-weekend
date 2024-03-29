import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* updateUserColor(action) {
  try {
    let updateUserColorResponse = yield axios.put('/team/color', action.payload)
    console.log('update user color saga response!', action.payload);
    yield put({
      type: 'FETCH_USER_DETAILS',
      payload: updateUserColorResponse.data
    })
  } catch (err) {
    console.log('error in USER COLOR PUT', err);
  }
}

function* fetchUserDetails(action) {
  try {
    let userDetailsResponse = yield axios.get('/api/user/color')
    console.log('fetch user details response!', action.payload);
    yield put({
      type: 'SET_USER_DETAILS',
      payload: userDetailsResponse.data
    })
  } catch (err) {
    console.log('error in USER DETAILS GET', err);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('UPDATE_USER_COLOR', updateUserColor)
  yield takeLatest('FETCH_USER_DETAILS', fetchUserDetails)
}

export default userSaga;
