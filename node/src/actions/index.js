export const setLogin = (loggedIn) => {
    if(loggedIn===true){
        return{
            type: 'SIGN_IN',
            status: loggedIn
        }
    }else{
        return{
            type: 'SIGN_OUT',
            status: loggedIn
        }
    }
 
}

export const setParties = (act, partiesList) => {
    if(act===1){
        return{
            type: 'LOAD_PARTIES',
            parties: partiesList
        }

    }else{
        return{
            type: 'CLEAR_PARTIES',
        }
    }
}

export const setPoliticians = (act, politiciansList) => {
    if(act===1){
        return{
            type: 'LOAD_POLITICIANS',
            politicians: politiciansList
        }

    }else{
        return{
            type: 'CLEAR_POLITICIANS',
        }
    }
}

export const setError = (errorMessage) => {
    return{
        type: 'SET_ERROR',
        message: errorMessage
    }
}
