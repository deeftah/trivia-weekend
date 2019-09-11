const visualReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_VISUAL_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

export default visualReducer;