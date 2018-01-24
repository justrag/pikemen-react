import { INITIALIZE_IDENTITY, JOIN_GAME } from './constants';
export const initializeIdentity = uuid => ({ type: INITIALIZE_IDENTITY, uuid });
export const joinGame = () => ({
  type: JOIN_GAME,
  meta: { remoteToServer: true }
});
