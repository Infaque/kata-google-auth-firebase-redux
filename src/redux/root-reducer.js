import { combineReducers } from 'redux';

import baseReducer from './base/base.reducer';

export default combineReducers({
    base: baseReducer
})