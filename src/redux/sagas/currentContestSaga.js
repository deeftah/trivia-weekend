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

function* addSpeedRound(action) {
    try {
        let addSpeedRoundResponse = yield axios.post('/currentContest/addSpeedRound', action.payload)
        console.log('add speed round saga response!', addSpeedRoundResponse);
        yield put({
            type: 'FETCH_SPEED_ROUND',
            payload: action.payload
        })
    } catch (err) {
        console.log('error in ADD SPEED ROUND POST', err);
    }
}

function* fetchSpeedRound(action) {
    try {
        let currentHour = action.payload.contestHour;
        console.log('the currrent hour after the speed round add is', currentHour)
        let fetchSpeedRoundResponse = yield axios.get(`/currentContest/fetchSpeedRound/${currentHour}`)
        console.log('speed round saga response!', fetchSpeedRoundResponse);
        yield put({
            type: 'SET_SPEED_ROUND',
            payload: fetchSpeedRoundResponse.data[0]
        })
    } catch (err) {
        console.log('error in SPEED ROUND GET', err);
    }
}

function* currentContestSaga() {
    yield takeEvery('FETCH_CURRENT_CONTEST', fetchCurrentContest);
    yield takeEvery('UPDATE_CURRENT_CONTEST', updateCurrentContest);
    yield takeLatest('UPDATE_CURRENT_CONTEST_DETAILS', updateCurrentContestDetails);
    yield takeEvery('ADD_SPEED_ROUND', addSpeedRound);
    yield takeEvery('FETCH_SPEED_ROUND', fetchSpeedRound);
}

export default currentContestSaga;