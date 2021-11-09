import { adaptAuthInfoToClient } from '../../services/adapter';
import { requireAuthorization, switchUploadUserInfoStatus, loadUserInfo, requireLogout } from '../actions';
import { APIRoute, AuthorizationStatus, ToastMessages, UploadStatus } from '../../const';
import { ThunkActionResult } from '../../types/action';
import { saveToken, dropToken } from '../../services/token';
import { AuthData } from '../../types/auth-data';
import { UserInfoResponse } from '../../types/user';
import { toast } from 'react-toastify';

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get<UserInfoResponse>(APIRoute.Login)
      .then(({ data }) => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
        const adaptedUserResponse = adaptAuthInfoToClient(data);
        dispatch(loadUserInfo(adaptedUserResponse));
      });
  };

export const loginAction = ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      dispatch(switchUploadUserInfoStatus(UploadStatus.Posting));
      const { data } = await api.post<UserInfoResponse>(APIRoute.Login, { email, password });
      saveToken(data.token);
      const adaptedUserResponse = adaptAuthInfoToClient(data);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(loadUserInfo(adaptedUserResponse));
      dispatch(switchUploadUserInfoStatus(UploadStatus.Completed));
    } catch {
      toast(ToastMessages.LoginError);
      dispatch(switchUploadUserInfoStatus(UploadStatus.Error));
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
