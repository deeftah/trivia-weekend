const allContestsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_CONTESTS':
            return action.payload;
        default:
            return state;
    }
}

export default allContestsReducer;