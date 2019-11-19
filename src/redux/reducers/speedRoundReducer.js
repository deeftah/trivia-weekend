const speedRoundReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SPEED_ROUND':
            return action.payload;
        default:
            return state;
    }
}

export default speedRoundReducer;