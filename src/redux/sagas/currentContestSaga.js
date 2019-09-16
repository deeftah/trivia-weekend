import { put, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

function* fetchCurrentContest(action) {
    try {
        let currentContestResponse = yield axios.get('/currentContest', action.payload)
        console.log('current contest saga response!', currentContestResponse);
        yield put({
            type: 'SET_CURRENT_CONTEST',
            payload: currentContestResponse.data[0]
        })
    } catch (err) {
        console.log('error in CURRENT CONTEST GET', err);
    }
}

function* updateCurrentContest(action) {
    try {
        let updateCurrentContestResponse = yield axios.put('/currentContest', action.payload)
        console.log('update current contest saga response!', updateCurrentContestResponse);
        yield put({
            type: 'FETCH_CURRENT_CONTEST'
        })
    } catch (err) {
        console.log('error in CURRENT CONTEST PUT', err);
    }
}

function* updateCurrentContestDetails(action) {
    try {
        let updateCurrentContestDetailsResponse = yield axios.put ('/currentContest/details', action.payload)
        console.log('update current contest details saga response!', updateCurrentContestDetailsResponse);
        yield put({
            type: 'FETCH_CURRENT_CONTEST'
        })
    } catch (err) {
        console.log('error in CURRENT CONTEST DETAILS PUT', err);
    }
}

function* currentContestSaga() {
    yield takeEvery('FETCH_CURRENT_CONTEST', fetchCurrentContest);
    yield takeEvery('UPDATE_CURRENT_CONTEST', updateCurrentContest);
    yield takeLatest('UPDATE_CURRENT_CONTEST_DETAILS', updateCurrentContestDetails);
}

export default currentContestSaga;