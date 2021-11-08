import { createReducer } from '@reduxjs/toolkit';
import { UserData } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { loadUserInfo, requireAuthorization, requireLogout } from '../action';

const initialState: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
};

const userData = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadUserInfo, (state, action) => {
      state.userInfo = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userInfo = null;
    });
});

export { userData };
