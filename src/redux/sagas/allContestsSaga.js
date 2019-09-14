import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllContests(action) {
    try {
        let allContestsResponse = yield axios.get('/allContests', action.payload)
        console.log('all contests saga response!', allContestsResponse);
        yield put({
            type: 'SET_ALL_CONTESTS',
            payload: allContestsResponse.data
        })
    } catch (err) {
        console.log('error in ALL CONTESTS GET', err);
    }
}

function* allContestsSaga() {
    yield takeEvery('FETCH_ALL_CONTESTS', fetchAllContests);
}

export default allContestsSaga;