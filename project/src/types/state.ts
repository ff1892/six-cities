import { Offer } from './offer';
import { CommentGet } from './comment';
import { UserInfo } from './user';
import { RootState } from '../store/reducers/root-reducer';
import { AuthorizationStatus } from '../const';

export type DataOffers = {
  offers: Offer[],
  isOffersLoaded: boolean,
};

export type DataCurrentOffer = {
  currentOffer: Offer | null,
  isCurrentOfferLoaded: boolean,
  isCurrentOfferError: boolean,
};

export type DataComments = {
  currentOfferComments: CommentGet[],
  isCommentsLoaded: boolean,
  uploadCommentStatus: string,
};

export type DataNearby = {
  nearbyOffers: Offer[],
  isNearbyOffersLoaded: boolean,
};

export type DataFavorites = {
  favoriteOffers: Offer[],
  isFavoriteOffersLoaded: boolean;
};

export type UserData = {
  authorizationStatus: AuthorizationStatus,
  userInfo: UserInfo | null,
  uploadUserInfoStatus: string,
};

export type AppState = {
  selectedCity: string,
  currentSorting: string,
};

export type State = RootState;
