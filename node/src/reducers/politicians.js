const politiciansReducer = (state = [], action) => {
    switch(action.type){
        case "LOAD_POLITICIANS":
            return action.politicians;
        case "CLEAR_POLITICIANS":
            return [];
        default:
            return state;
    }
}

export default politiciansReducer;