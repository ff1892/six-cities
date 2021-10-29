import { Offer } from './offer';
import { CommentGet } from './comment';
import { AuthorizationStatus } from '../const';

export type State = {
  selectedCity: string,
  currentSorting: string,
  offers: Offer[],
  isOffersLoaded: boolean,
  currentOffer: Offer | null,
  isCurrentOfferLoaded: boolean;
  isCurrentOfferError: boolean;
  currentOfferComments: CommentGet[];
  isCommentsLoaded: boolean,
  nearbyOffers: Offer[];
  isNearbyOffersLoaded: boolean;
  authorizationStatus: AuthorizationStatus,
};
