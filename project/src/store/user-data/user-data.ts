import { createReducer } from '@reduxjs/toolkit';
import { UserData } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { requireAuthorization, requireLogout } from '../action';

const initialState: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const userData = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

export { userData };
