const INITIAL_STATE = {
    currentMesage: 'Hello, this is my initial message!',
    lastMessage: ''
}

const baseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_MESSAGE':
            return {
                currentMesage: action.payload,
                lastMessage: state.currentMesage

            }

            
        default:
            return state;
    }
}

export default baseReducer;

//all the logic of what to update goes here