import { put, takeEvery, takeLatest } from 'redux-saga/effects';
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

function* addContest(action) {
    try {
        let addContestResponse = yield axios.post('/allContests', action.payload)
        console.log('add contest saga response!', addContestResponse);
        yield put({
            type: 'FETCH_ALL_CONTESTS',
            payload: addContestResponse.data
        })
    } catch (err) {
        console.log('error in ADD CONTEST POST', err);
    }
}

function* allContestsSaga() {
    yield takeEvery('FETCH_ALL_CONTESTS', fetchAllContests);
    yield takeLatest('ADD_CONTEST', addContest);
}

export default allContestsSaga;