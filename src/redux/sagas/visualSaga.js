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

function* updateVisual(action) {
    try {
        let visualUpdateResponse = yield axios.put('/visual', action.payload)
        console.log('visual update saga response!', action.payload);
        yield put({
            type: 'FETCH_VISUAL',
            payload: visualUpdateResponse.data
        })
    } catch (err) {
        console.log('error in VISUAL PUT', err);
    }
}

function* addVisual(action) {
    try {
        let visualAddResponse = yield axios.post('/visual', action.payload)
        console.log('visual add saga repsonse!', action.payload);
        yield put({
            type: 'FETCH_VISUAL',
            payload: visualAddResponse.data
        })
    } catch (err) {
        console.log('error in VISUAL ADD', err);
    }
}

function* visualSaga() {
    yield takeEvery('FETCH_VISUAL', fetchVisual);
    yield takeLatest('UPDATE_VISUAL', updateVisual);
    yield takeLatest('ADD_VISUAL', addVisual);
}

export default visualSaga;