import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { NameSpace } from '../root-reducer';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => (
  state[NameSpace.user].authorizationStatus
);
