import { Offer } from './offer';

export type State = {
  selectedCity: string,
  offers: Offer[],
  currentSorting: string,
};
