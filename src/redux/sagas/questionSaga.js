import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCurrentHourQuestions(action) {
    try {
        let contestId = action.payload
        console.log('the contest ID in the saga is', contestId)
        let currentHourQuestionsResponse = yield axios.get(`/question/${contestId}`)
        console.log('question get saga response!', currentHourQuestionsResponse);
        yield put({
            type: 'SET_QUESTION_DETAILS',
            payload: currentHourQuestionsResponse.data
        })
    } catch (err) {
        console.log('error in QUESTION GET', err)
    }
}

function* visualSaga() {
    yield takeEvery('FETCH_CURRENT_HOUR_QUESTIONS', fetchCurrentHourQuestions);
}

export default visualSaga;