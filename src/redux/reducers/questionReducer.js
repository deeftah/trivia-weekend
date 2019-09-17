const questionReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_QUESTION_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

export default questionReducer;