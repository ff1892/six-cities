import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';

import { APIRoute,
  AuthorizationStatus,
  UploadStatus
} from '../../../const';

import { checkAuthAction,
  loginAction,
  logoutAction
} from './user';

import { requireAuthorization,
  requireLogout,
  loadUserInfo,
  switchUploadUserInfoStatus
} from '../../actions';

import { makeFakeUserInfoResponse, makeFakeAuthData } from '../../../utils/mocks';
import { adaptAuthInfoToClient } from '../../../services/adapter';
import { AUTH_TOKEN_KEY_NAME } from '../../../services/token';

const fakeUserInfoResponse = makeFakeUserInfoResponse();
const fakeUserInfo = adaptAuthInfoToClient(fakeUserInfoResponse);

describe('Api actions: user', () => {
  const onFakeUnathorized = jest.fn();
  const api = createApi(onFakeUnathorized());
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is "auth" and load user data when server return 200', async () => {
    const store = mockStore();
    mockApi
      .onGet(APIRoute.Login)
      .reply(200, fakeUserInfoResponse);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
      loadUserInfo(fakeUserInfo),
    ]);
  });

  it('should change posting status, load user info and dispatch requireAuthorization when POST /login', async () => {
    const fakeAuthData = makeFakeAuthData();
    mockApi
      .onPost(APIRoute.Login)
      .reply(200, fakeUserInfoResponse);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loginAction(fakeAuthData));

    expect(store.getActions()).toEqual([
      switchUploadUserInfoStatus(UploadStatus.Posting),
      requireAuthorization(AuthorizationStatus.Auth),
      loadUserInfo(fakeUserInfo),
      switchUploadUserInfoStatus(UploadStatus.Completed),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, fakeUserInfoResponse.token);
  });

  it('should dispatch Logout when DELETE /logout', async () => {
    mockApi
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([requireLogout()]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });
});
