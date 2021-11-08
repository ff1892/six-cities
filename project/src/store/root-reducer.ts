import { combineReducers } from 'redux';
import { dataFavorites } from './data-favorites/data-favorites';
import { dataOffers } from './data-offers/data-offers';
import { dataCurrentOffer } from './data-current-offer/data-current-offer';
import { dataComments } from './data-comments/data-comments';
import { dataNearby } from './data-nearby/data-nearby';
import { appState } from './app-state/app-state';
import { userData } from './user-data/user-data';

export enum NameSpace {
  offers = 'DATA_OFFERS',
  currentOffer = 'DATA_CURRENT_OFFER',
  comments = 'DATA_COMMENTS',
  nearby = 'DATA_NEARBY',
  favorites = 'DATA_FAVORITES',
  state = 'STATE',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.offers]: dataOffers,
  [NameSpace.currentOffer]: dataCurrentOffer,
  [NameSpace.comments]: dataComments,
  [NameSpace.nearby]: dataNearby,
  [NameSpace.favorites]: dataFavorites,
  [NameSpace.state]: appState,
  [NameSpace.user]: userData,
});

export type RootState = ReturnType<typeof rootReducer>;
