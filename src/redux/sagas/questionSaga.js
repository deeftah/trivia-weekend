import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCurrentHourQuestions(action) {
    try {
        let contest = action.payload
        console.log('the contest ID in the saga is', contest)
        let currentHourQuestionsResponse = yield axios.get(`/question/${contest}`)
        console.log('question get saga response!', currentHourQuestionsResponse);
        yield put({
            type: 'SET_QUESTION_DETAILS',
            payload: currentHourQuestionsResponse.data
        })
    } catch (err) {
        console.log('error in QUESTION GET', err)
    }
}

function* addOrUpdateQuestion(action) {
    try {
        let question = action.payload
        console.log('FROM SAGA: the question is: ', question)
        if (!question.questionId) {
            let addOrUpdateQuestionResponse = yield axios.post(`/question`, action.payload)
            console.log('question POST saga response!', addOrUpdateQuestionResponse)
            let contest = {
                contestId: question.contestId,
                currentHour: question.questionHour
            }
            let queryString = Object.keys(contest).map(key => key + '=' + contest[key]).join('&');
            console.log('the saga query string is', queryString)
            yield put({
                type: 'FETCH_CURRENT_HOUR_QUESTIONS',
                payload: queryString
            })
        } else {
            let addOrUpdateQuestionResponse = yield axios.put(`/question`, action.payload)
            console.log('question PUT saga response!', addOrUpdateQuestionResponse)
            let contest = {
                contestId: question.contestId,
                currentHour: question.questionHour
            }
            let queryString = Object.keys(contest).map(key => key + '=' + contest[key]).join('&');
            console.log('the saga query string is', queryString)
            yield put({
                type: 'FETCH_CURRENT_HOUR_QUESTIONS',
                payload: queryString
            })
        }
    } catch (err) {
        console.log('error in ADD OR UPDATE QUESTION', err)
    }
}

function* visualSaga() {
    yield takeEvery('FETCH_CURRENT_HOUR_QUESTIONS', fetchCurrentHourQuestions);
    yield takeLatest('ADD_OR_UPDATE_QUESTION', addOrUpdateQuestion);
}

export default visualSaga;