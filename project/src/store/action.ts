import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { CommentGet } from '../types/comment';
import { ActionType } from '../types/action';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction(
  ActionType.ChangeCity,
  (city: string) => ({
    payload: city,
  }),
);

export const changeSorting = createAction(
  ActionType.ChangeSorting,
  (currentSorting: string) => ({
    payload: currentSorting,
  }),
);

export const loadOffers = createAction(
  ActionType.LoadOffers,
  (offers: Offer[]) => ({
    payload: {
      offers,
    },
  }),
);

export const loadCurrentOffer = createAction(
  ActionType.LoadCurrentOffer,
  (currentOffer: Offer) => ({
    payload: currentOffer,
  }),
);

export const loadCurrentOfferError = createAction(ActionType.LoadCurrentOfferError);

export const loadCurrentOfferComments = createAction(
  ActionType.LoadCurrentOfferComments,
  (comments: CommentGet[]) => ({
    payload: {
      comments,
    },
  }),
);

export const loadNearbyOffers = createAction(
  ActionType.LoadNearbyOffers,
  (nearbyOffers: Offer[]) => ({
    payload: {
      nearbyOffers,
    },
  }),
);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }),
);

export const requireLogout = createAction(ActionType.RequireLogout);
