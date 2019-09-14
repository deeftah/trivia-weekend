const currentContestReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_CONTEST':
            return action.payload;
        default:
            return state;
    }
}

export default currentContestReducer;