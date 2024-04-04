const INITIAL_STATE = {
    currentMesage: 'Hello, this is my initial message!',
    lastMessage: '',
    user: null,
    signedIn: false,
    loading: true
}

const baseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_MESSAGE':
            return {
                ...state,
                currentMesage: action.payload,
                lastMessage: state.currentMesage

            }

        case 'CHANGE_USER':
            return {
                ...state,
                user: action.payload
            }

        case 'SET_LOADING_STATUS':
            return {
                ...state,
                loading: action.payload
            }
        case 'SET_SIGNEDIN_STATUS':
            return {
                ...state,
                signedIn: action.payload
            }
        default:
            return state;
    }
}

export default baseReducer;

//all the logic of what to update goes here