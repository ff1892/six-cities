import { Offer } from '../../../types/offer';
import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';

export const getFavoriteOffers = (state: State): Offer[] => (
  state[NameSpace.favorites].favoriteOffers
);

export const getLoadedFavoriteOffersStatus = (state: State): boolean => (
  state[NameSpace.favorites].isFavoriteOffersLoaded
);
