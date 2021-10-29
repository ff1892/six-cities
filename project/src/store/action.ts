import { Offer } from '../types/offer';
import { CommentGet } from '../types/comment';
import { ActionType } from '../types/action';
import { AuthorizationStatus } from '../const';

export const changeCity = (city: string) => ({
  type: ActionType.ChangeCity,
  payload: city,
} as const);

export const changeSorting = (currentSorting: string) => ({
  type: ActionType.ChangeSorting,
  payload: currentSorting,
} as const);

export const loadOffers = (offers: Offer[]) => ({
  type: ActionType.LoadOffers,
  payload: {
    offers,
  },
} as const);

export const loadCurrentOffer = (offer: Offer) => ({
  type: ActionType.LoadCurrentOffer,
  payload: offer,
} as const);

export const loadCurrentOfferError = () => ({
  type: ActionType.LoadCurrentOfferError,
} as const);

export const loadCurrentOfferComments = (comments: CommentGet[]) => ({
  type: ActionType.LoadCurrentOfferComments,
  payload: {
    comments,
  },
} as const);

export const loadNearbyOffers = (nearbyOffers: Offer[]) => ({
  type: ActionType.LoadNearbyOffers,
  payload: {
    nearbyOffers,
  },
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);
