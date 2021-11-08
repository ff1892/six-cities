import { UserData } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { loadUserInfo, requireAuthorization, requireLogout } from '../action';
import { userData } from './user-data';
import { makeFakeUserInfo } from '../../utils/mocks';

const state: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
};

const fakeUserInfo = makeFakeUserInfo();

describe('Reducer: userData', () => {
  it('without additional parameters should return initial state', () => {
    expect(userData(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });
  it('should update authorization status to "AUTH"', () => {
    expect(userData(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: null,
      });
  });
  it('should update authorization status to "NO_AUTH"', () => {
    expect(userData(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      });
  });
  it('should update authorization status to "NO_AUTH" and discard user info when logout', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: fakeUserInfo,
    };
    expect(userData(initialState, requireLogout))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      });
  });
  it('should update user info when load user info', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: null,
    };
    expect(userData(initialState, loadUserInfo(fakeUserInfo)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: fakeUserInfo,
      });
  });
});
