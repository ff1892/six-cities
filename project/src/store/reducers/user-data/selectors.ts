import { State } from '../../../types/state';
import { AuthorizationStatus } from '../../../const';
import { NameSpace } from '../root-reducer';
import { UserInfo } from '../../../types/user';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => (
  state[NameSpace.user].authorizationStatus
);

export const getUserInfo = (state: State): UserInfo | null => (
  state[NameSpace.user].userInfo
);

export const getUploadUserInfoStatus = (state: State): string => (
  state[NameSpace.user].uploadUserInfoStatus
);
