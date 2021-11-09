import { UserData } from '../../../types/state';
import { AuthorizationStatus } from '../../../const';
import { loadUserInfo, switchUploadUserInfoStatus, requireAuthorization, requireLogout } from '../../actions';
import { userData } from './user-data';
import { makeFakeUserInfo } from '../../../utils/mocks';
import { UploadStatus } from '../../../const';
import { datatype } from 'faker';

const state: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  uploadUserInfoStatus: UploadStatus.Unknown,
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
        uploadUserInfoStatus: UploadStatus.Unknown,
      });
  });
  it('should update authorization status to "NO_AUTH"', () => {
    expect(userData(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
        uploadUserInfoStatus: UploadStatus.Unknown,
      });
  });
  it('should update authorization status to "NO_AUTH" and discard user info when logout', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: fakeUserInfo,
      uploadUserInfoStatus: UploadStatus.Completed,
    };
    expect(userData(initialState, requireLogout))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
        uploadUserInfoStatus: UploadStatus.Unknown,
      });
  });
  it('should update user info when load user info', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: null,
      uploadUserInfoStatus: UploadStatus.Unknown,
    };
    expect(userData(initialState, loadUserInfo(fakeUserInfo)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: fakeUserInfo,
        uploadUserInfoStatus: UploadStatus.Unknown,
      });
  });
  it('should update upload status by upload comment', () => {
    const uploadStatus = datatype.string();
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userInfo: null,
      uploadUserInfoStatus: UploadStatus.Unknown,
    };
    const updatedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userInfo: null,
      uploadUserInfoStatus: uploadStatus,
    };
    expect(userData(initialState, switchUploadUserInfoStatus(uploadStatus)))
      .toEqual(updatedState);
  });
});
