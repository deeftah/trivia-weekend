const teamUsersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TEAM_USER_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

export default teamUsersReducer;