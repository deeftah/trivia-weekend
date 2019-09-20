const pointTotalReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_POINT_TOTAL':
            return action.payload;
        default:
            return state;
    }
}

export default pointTotalReducer;