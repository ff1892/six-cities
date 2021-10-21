export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  FavoritesEmpty = '/favorites-empty',
  Offers = '/offer/:offerId',
  Offer = '/offer/',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum MarkerUrl {
  Default = 'img/pin.svg',
  Active = 'img/pin-active.svg'
}

export const MAX_RATING = 5;

export const RatingNames: { [key: number]: string } = {
  1: 'terribly',
  2: 'badly',
  3: 'not bad',
  4: 'good',
  5: 'perfect',
};

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const DEFAULT_CITY = 'Amsterdam';

export const DEFAULT_SORTING = 'Popular';

export const SortingTypes = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];
