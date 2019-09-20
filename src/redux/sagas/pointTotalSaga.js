import { put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

function* fetchPointTotal(action) {
    try {
        console.log('the saga side conetst id is', action.payload)
        let fetchPointTotalResponse = yield axios.get(`/question/total/${action.payload}`)
        console.log('point total saga response!', fetchPointTotalResponse);
        yield put({
            type: 'SET_POINT_TOTAL',
            payload: fetchPointTotalResponse.data[0]
        })
    } catch (err) {
        console.log('error in POINT TOTAL GET', err)
    }
}

function* pointTotalSaga() {
    yield takeEvery('FETCH_POINT_TOTAL', fetchPointTotal)
}

export default pointTotalSaga;