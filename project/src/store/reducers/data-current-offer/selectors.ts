import { Offer } from '../../../types/offer';
import { State } from '../../../types/state';
import { NameSpace } from '../root-reducer';

export const getCurrentOffer = (state: State): Offer | null => (
  state[NameSpace.currentOffer].currentOffer
);

export const getLoadedCurrentOfferStatus = (state: State): boolean => (
  state[NameSpace.currentOffer].isCurrentOfferLoaded
);

export const getOfferErrorStatus = (state: State): boolean => (
  state[NameSpace.currentOffer].isCurrentOfferError
);
