import { Offer } from './offer';
import { CommentGet } from './comment';
import { RootState } from '../store/root-reducer';
import { AuthorizationStatus } from '../const';

export type AppData = {
  offers: Offer[],
  isOffersLoaded: boolean,
  currentOffer: Offer | null,
  isCurrentOfferLoaded: boolean,
  isCurrentOfferError: boolean,
  currentOfferComments: CommentGet[],
  isCommentsLoaded: boolean,
  nearbyOffers: Offer[],
  isNearbyOffersLoaded: boolean,
};

export type UserData = {
  authorizationStatus: AuthorizationStatus,
};

export type AppState = {
  selectedCity: string,
  currentSorting: string,
};

export type State = RootState;
