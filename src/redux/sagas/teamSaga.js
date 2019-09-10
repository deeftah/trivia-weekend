import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTeamDetails(action) {
    try {
        let teamResponse = yield axios.get('/team')
        console.log('saga response!', action.payload);
        yield put({
            type: 'SET_TEAM_DETAILS',
            payload: teamResponse.data[0]
        })
    } catch (err) {
        console.log('error in TEAM GET', err);
    }
}

function* updateImage(action) {
    try {
        let imageUpdateResponse = yield axios.put('/team/image', action.payload)
        console.log('image update saga response!', action.payload.newImage);
        yield put({
            type: 'FETCH_TEAM_DETAILS',
            payload: imageUpdateResponse.data
        })
    } catch (err) {
        console.log('error in IMAGE PUT', err);
    }
}

function* homeSaga() {
    yield takeEvery('FETCH_TEAM_DETAILS', fetchTeamDetails);
    yield takeEvery('UPDATE_IMAGE', updateImage);
}

export default homeSaga;