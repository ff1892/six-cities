import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { CommentGet } from '../types/comment';
import { ActionType } from '../types/action';
import { AuthorizationStatus } from '../const';
import { UserInfo } from '../types/user';

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

export const uploadCommentsError = createAction(ActionType.UploadCommentsError);

export const uploadCurrentOfferComment = createAction(
  ActionType.UploadCurrentOfferComment,
  (isUploading: boolean) => ({
    payload: isUploading,
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

export const loadFavoriteOffers = createAction(
  ActionType.LoadFavoriteOffers,
  (favoriteOffers: Offer[]) => ({
    payload: {
      favoriteOffers,
    },
  }),
);

export const updateOffer = createAction(
  ActionType.UpdateOffer,
  (updatedOffer: Offer) => ({
    payload: {
      updatedOffer,
    },
  }),
);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }),
);

export const loadUserInfo = createAction(
  ActionType.LoadUserInfo,
  (userInfo: UserInfo) => ({
    payload: userInfo,
  }),
);


export const requireLogout = createAction(ActionType.RequireLogout);
