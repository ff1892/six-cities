import {
  adaptOfferToClient,
  adaptOffersGroupToClient,
  adaptCommentsGorupToClient
} from '../services/adapter';

import {
  loadOffers,
  loadCurrentOffer,
  loadCurrentOfferError,
  loadCurrentOfferComments,
  loadNearbyOffers,
  requireAuthorization,
  requireLogout
} from './action';

import { ThunkActionResult } from '../types/action';
import { saveToken, dropToken, Token } from '../services/token';
import { APIRoute, AuthorizationStatus } from '../const';
import { OfferResponse } from '../types/offer';
import { CommentGetResponse, CommentPost } from '../types/comment';
import { AuthData } from '../types/auth-data';

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
  async (_dispatch, _getState, api) => {
    await api.post((`${APIRoute.Comments}/${id}`), { comment, rating });
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      });
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data: { token } } = await api.post<{ token: Token }>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
