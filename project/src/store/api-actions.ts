import {
  adaptOfferToClient,
  adaptOffersGroupToClient,
  adaptCommentsGorupToClient,
  adaptAuthInfoToClient
} from '../services/adapter';

import {
  loadOffers,
  loadCurrentOffer,
  loadCurrentOfferError,
  loadCurrentOfferComments,
  uploadCurrentOfferComment,
  uploadCommentsError,
  loadNearbyOffers,
  requireAuthorization,
  loadUserInfo,
  requireLogout,
  loadFavoriteOffers,
  updateOffer
} from './action';

import { ThunkActionResult } from '../types/action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, ToastMessages } from '../const';
import { OfferResponse } from '../types/offer';
import { CommentGetResponse, CommentPost } from '../types/comment';
import { AuthData } from '../types/auth-data';
import { UserInfoResponse } from '../types/user';
import { toast } from 'react-toastify';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferResponse[]>(APIRoute.Offers);
    const adaptedData = adaptOffersGroupToClient(data);
    dispatch(loadOffers(adaptedData));
  };

export const fetchCurrentOfferAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<OfferResponse>(`${APIRoute.Offers}/${id}`);
      const adaptedData = adaptOfferToClient(data);
      dispatch(loadCurrentOffer(adaptedData));
    } catch {
      dispatch(loadCurrentOfferError());
    }
  };

export const fetchCurrentOfferCommentsAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<CommentGetResponse[]>(`${APIRoute.Comments}/${id}`);
    const adaptedData = adaptCommentsGorupToClient(data);
    dispatch(loadCurrentOfferComments(adaptedData));
  };

export const fetchNearbyOffersAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<OfferResponse[]>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);
    const adaptedData = adaptOffersGroupToClient(data);
    dispatch(loadNearbyOffers(adaptedData));
  };

export const commentPostAction = (id: string, { comment, rating }: CommentPost): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    dispatch(uploadCurrentOfferComment(true));
    try {
      await api.post((`${APIRoute.Comments}/${id}/'a'`), { comment, rating });
      dispatch(uploadCurrentOfferComment(false));
      fetchCurrentOfferCommentsAction(id);
    } catch {
      dispatch(uploadCommentsError());
      toast.info(ToastMessages.UploadingError);
      dispatch(uploadCurrentOfferComment(false));
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get<UserInfoResponse>(APIRoute.Login)
      .then(({data}) => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
        const adaptedUserResponse = adaptAuthInfoToClient(data);
        dispatch(loadUserInfo(adaptedUserResponse));
      });
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<UserInfoResponse>(APIRoute.Login, { email, password });
    saveToken(data.token);
    const adaptedUserResponse = adaptAuthInfoToClient(data);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(loadUserInfo(adaptedUserResponse));
  };

export const fetchFavoriteOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<OfferResponse[]>(APIRoute.Favorite);
    const adaptedData = adaptOffersGroupToClient(data);
    dispatch(loadFavoriteOffers(adaptedData));
  };

export const switchIsFavoriteAction = (id: number, status: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<OfferResponse>((`${APIRoute.Favorite}/${id}/${status}`));
    const adaptedData = adaptOfferToClient(data);
    dispatch(updateOffer(adaptedData));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
