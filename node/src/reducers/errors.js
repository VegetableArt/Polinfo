const errorMessageReducer = (state = "", action) => {
    switch(action.type){
        case "SET_ERROR":
            return action.message;
        default:
            return state;
    }
}

export default errorMessageReducer;