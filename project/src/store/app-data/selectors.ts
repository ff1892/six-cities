import { Offer } from '../../types/offer';
import { CommentGet } from '../../types/comment';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getOffers = (state: State): Offer[] => (
  state[NameSpace.data].offers
);

export const getLoadedOffersStatus = (state: State): boolean => (
  state[NameSpace.data].isOffersLoaded
);

export const getCurrentOffer = (state: State): Offer | null => (
  state[NameSpace.data].currentOffer
);

export const getLoadedCurrentOfferStatus = (state: State): boolean => (
  state[NameSpace.data].isCurrentOfferLoaded
);

export const getOfferErrorStatus = (state: State): boolean => (
  state[NameSpace.data].isCurrentOfferError
);

export const getOfferComments = (state: State): CommentGet[] => (
  state[NameSpace.data].currentOfferComments
);

export const getLoadedCommentsStatus = (state: State): boolean => (
  state[NameSpace.data].isCommentsLoaded
);

export const getNearbyOffers = (state: State): Offer[] => (
  state[NameSpace.data].nearbyOffers
);

export const getLoadedNearbyOffersStatus = (state: State): boolean => (
  state[NameSpace.data].isCommentsLoaded
);

export const getFavoriteOffers = (state: State): Offer[] => (
  state[NameSpace.data].favoriteOffers
);

export const getLoadedFavoriteOffersStatus = (state: State): boolean => (
  state[NameSpace.data].isFavoriteOffersLoaded
);


