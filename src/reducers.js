import { combineReducers } from 'redux';
import { INITIALIZE_IDENTITY } from './constants';

const identity = (state = false, { type, uuid }) => {
  switch (type) {
    case INITIALIZE_IDENTITY:
      return uuid;
    default:
      return state;
  }
};

export default combineReducers({ identity });
