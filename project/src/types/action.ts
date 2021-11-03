import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';

export enum ActionType {
  ChangeCity = 'state/changeCity',
  ChangeSorting = 'state/ChangeSorting',
  LoadOffers = 'data/LoadOffers',
  LoadCurrentOffer = 'data/LoadCurrentOffer',
  LoadCurrentOfferError = 'data/LoadCurrentOfferError',
  LoadCurrentOfferComments = 'data/LoadCurrentOfferComments',
  LoadNearbyOffers = 'data/LoadNearbyOffers',
  LoadFavoriteOffers = 'data/LoadFavoriteOffers',
  UpdateOffer = 'data/UpdateOffer',
  RequireAuthorization = 'user/RequireAuthorization',
  LoadUserInfo = 'user/LoadUserInfo',
  RequireLogout = 'user/requireLogout',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
