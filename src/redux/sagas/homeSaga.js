import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchImage(action) {
    try {
        let imageResponse = yield axios.get('/home/image')
        console.log('saga response!', action.payload);
        yield put({
            type: 'SET_IMAGE',
            payload: imageResponse.data[0]
        })
    } catch (err) {
        console.log('error in IMAGE GET', err);
    }
}

function* updateImage(action) {
    try {
        let imageUpdateResponse = yield axios.put('home/image', action.payload)
        console.log('image update saga response!', action.payload.newImage);
        yield put({
            type: 'FETCH_IMAGE',
            payload: imageUpdateResponse.data
        })
    } catch (err) {
        console.log('error in IMAGE PUT', err);
    }
}

function* homeSaga() {
    yield takeEvery('FETCH_IMAGE', fetchImage);
    yield takeEvery('UPDATE_IMAGE', updateImage);
}

export default homeSaga;