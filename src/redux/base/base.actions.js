
export const updateMessage = message => ({
    type: 'UPDATE_MESSAGE',
    payload: message
});

export const changeUser = user => ({
    type: 'CHANGE_USER',
    payload: user
});

export const setSignedIntatus = status => ({
    type: 'SET_SIGNEDIN_STATUS',
    payload: status
});

export const setLoadingStatus = status => ({
    type: 'SET_LOADING_STATUS',
    payload: status
});