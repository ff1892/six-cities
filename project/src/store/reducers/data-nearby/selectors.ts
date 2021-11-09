import { Offer } from '../../../types/offer';
import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';

export const getNearbyOffers = (state: State): Offer[] => (
  state[NameSpace.nearby].nearbyOffers
);

export const getLoadedNearbyOffersStatus = (state: State): boolean => (
  state[NameSpace.nearby].isNearbyOffersLoaded
);
