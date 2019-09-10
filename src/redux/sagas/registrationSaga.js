import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registerTeam(action) {
  try {
    let registerTeamResponse = yield axios.post('api/user/register/team', action.payload)
    action.payload.teamId = registerTeamResponse.data[0].id
    yield put({
      type: 'SET_USER_INFO',
      payload: action.payload
    })
    

  } catch (error) {
    yield put({ type: 'REGISTRATION_FAILED' })
  }
}

function* fetchTeamId(action) {
  try {
    console.log('the action.payload is', action.payload);
    let teamName = action.payload;
    console.log('and now here the team name is:', teamName);
    
    let teamIdResponse = yield axios.get(`api/user/register/team/${teamName}`)

    console.log('saga response for Team ID:', teamIdResponse.data[0]);

    yield put({
      type: 'SET_TEAM_ID',
      payload: teamIdResponse.data[0]
    })
  } catch (error) {
    console.log('error in TEAM ID GET:', error);
    
  }
}

function* registrationSaga() {
    yield takeLatest('TEAM_REGISTER', registerTeam);
    yield takeLatest('SET_USER_INFO', registerUser);
    yield takeEvery('FETCH_TEAM_ID', fetchTeamId)
  }

  export default registrationSaga;
