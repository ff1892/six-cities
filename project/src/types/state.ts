import { Offer } from './offer';
import { AuthorizationStatus } from '../const';

export type State = {
  selectedCity: string,
  currentSorting: string,
  offers: Offer[],
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};
