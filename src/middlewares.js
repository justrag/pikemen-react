import { assocPath } from 'ramda';
import { getIdentity } from './selectors';

const remoteActionMiddleware = socket => ({ getState }) => next => action => {
  if (action.meta && action.meta.remote) {
    socket.emit(
      'action',
      assocPath(['meta', 'identity'], getIdentity(getState()), action)
    );
  }
  return next(action);
};

export default remoteActionMiddleware;
