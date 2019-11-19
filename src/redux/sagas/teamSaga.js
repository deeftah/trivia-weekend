import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTeamDetails(action) {
    try {
        let teamResponse = yield axios.get('/team')
        console.log('saga response!', action.payload);
        yield put({
            type: 'SET_TEAM_DETAILS',
            payload: teamResponse.data[0]
        })
    } catch (err) {
        console.log('error in TEAM GET', err);
    }
}

function* fetchTeamUsers(action) {
    try {
        let teamUsersResponse = yield axios.get('/team/users')
        console.log('team users saga response!', action.payload);
        yield put({
            type: 'SET_TEAM_USER_DETAILS',
            payload: teamUsersResponse.data
        })
    } catch (err) {
        console.log('error in TEAM USERS GET', err);
    }
}

function* updateCaptain(action) {
    try {
        let updateCaptainResponse = yield axios.put('/team/users', action.payload)
        console.log('captain update saga response!', action.payload);
        yield put({
            type: 'FETCH_TEAM_USERS',
            payload: updateCaptainResponse.data
        })
    } catch (err) {
        console.log('error in TEAM CAPTAIN REMOVE (PUT)', err)
    }
}

function* updateImage(action) {
    try {
        let imageUpdateResponse = yield axios.put('/team/image', action.payload)
        console.log('image update saga response!', action.payload.newImage);
        yield put({
            type: 'FETCH_TEAM_DETAILS',
            payload: imageUpdateResponse.data
        })
    } catch (err) {
        console.log('error in IMAGE PUT', err);
    }
}

function* updateBoilerplate(action) {
    try {
        let boilerplateUpdateResponse = yield axios.put('/team/boilerplate', action.payload)
        console.log('boilerplate update saga response!', action.payload);
        yield put({
            type: 'FETCH_TEAM_DETAILS',
            payload: boilerplateUpdateResponse.data
        })
    } catch (err) {
        console.log('error in BOILERPLATE PUT', err);
    }
}

function* updateAccessId(action) {
    try {
        let accessIdUpdateResponse = yield axios.put('team/accessId', action.payload)
        console.log('access id update saga response!', action.payload);
        yield put({
            type: 'FETCH_TEAM_DETAILS',
            payload: accessIdUpdateResponse.data
        })
    } catch (err) {
        console.log('error in ACCESS ID PUT', err);
    }
}

function* updateTeamName(action) {
    try {
        let teamNameUpdateResponse = yield axios.put('team/teamName', action.payload)
        console.log('team name update saga response!', action.payload);
        yield put({
            type: 'FETCH_TEAM_DETAILS',
            payload: teamNameUpdateResponse.data
        })
    } catch (err) {
        console.log('error in TEAM NAME PUT', err);
    }
}

function* deleteTeamMember(action) {
    try {
        console.log('THE TEAM MEMBER ACTION', action)
        console.log('THE TEAM MEMBER ACTION.PAYLOAD', action.payload)
        let deleteTeamMemberResponse = yield axios.delete(`team/${action.payload}`)
        console.log('delete team member saga response!', action.payload);
        yield put({
            type: 'FETCH_TEAM_USERS',
            payload: deleteTeamMemberResponse.data
        })
    } catch (err) {
        console.log('error in TEAM MEMBER DELETE', err);
    }
}

function* teamSaga() {
    yield takeEvery('FETCH_TEAM_DETAILS', fetchTeamDetails);
    yield takeEvery('FETCH_TEAM_USERS', fetchTeamUsers);
    yield takeEvery('UPDATE_CAPTAIN', updateCaptain);
    yield takeLatest('UPDATE_IMAGE', updateImage);
    yield takeLatest('UPDATE_BOILERPLATE', updateBoilerplate);
    yield takeLatest('UPDATE_ACCESS_ID', updateAccessId);
    yield takeLatest('UPDATE_TEAM_NAME', updateTeamName);
    yield takeLatest('DELETE_TEAM_MEMBER', deleteTeamMember);
}

export default teamSaga;