import { Offer } from '../../../types/offer';
import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';

export const getOffers = (state: State): Offer[] => (
  state[NameSpace.offers].offers
);

export const getLoadedOffersStatus = (state: State): boolean => (
  state[NameSpace.offers].isOffersLoaded
);
