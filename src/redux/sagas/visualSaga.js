import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchVisual(action) {
    try {
        let visualResponse = yield axios.get('/visual')
        console.log('visual saga response!', action.payload);
        yield put({
            type: 'SET_VISUAL_DETAILS',
            payload: visualResponse.data
        })
    } catch (err) {
        console.log('error in VISUAL GET', err);
    }
}

function* visualSaga() {
    yield takeEvery('FETCH_VISUAL', fetchVisual);
}

export default visualSaga;