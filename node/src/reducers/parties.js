const partiesReducer = (state = [], action) => {
    switch(action.type){
        case "LOAD_PARTIES":
            return action.parties;
        case "CLEAR_PARTIES":
            return [];
        default:
            return state;
    }
}

export default partiesReducer;