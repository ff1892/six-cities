import { createReducer } from '@reduxjs/toolkit';
import { UserData } from '../../../types/state';
import { AuthorizationStatus, UploadStatus } from '../../../const';
import { loadUserInfo, switchUploadUserInfoStatus, requireAuthorization, requireLogout } from '../../actions';

const initialState: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  uploadUserInfoStatus: UploadStatus.Unknown,
};

const userData = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadUserInfo, (state, action) => {
      state.userInfo = action.payload;
    })
    .addCase(switchUploadUserInfoStatus, (state, action) => {
      state.uploadUserInfoStatus = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userInfo = null;
      state.uploadUserInfoStatus = UploadStatus.Unknown;
    });
});

export { userData };
