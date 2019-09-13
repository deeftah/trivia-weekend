import { put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

function* fetchContestDetails(action) {
    try {
        let contestDetailsResponse = yield axios.get('/contest', action.payload)
        console.log('contest saga response!', contestDetailsResponse);
        yield put({
            type: 'SET_CONTEST_DETAILS',
            payload: contestDetailsResponse.data
        })
    } catch (err) {
        console.log('error in CONTEST DETAILS GET', err);
    }
}

function* contestSaga() {
    yield takeEvery('FETCH_CONTEST_DETAILS', fetchContestDetails);
}

export default contestSaga;