export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Offers = '/offer',
}

export enum APIRoute {
  Offers = '/hotels',
  Comments = '/comments',
  Nearby = '/nearby',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
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

export const DEFAULT_CITY = 'Paris';

export const DEFAULT_SORTING = 'Popular';

export const SortingTypes = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export enum MessageLength {
  Min = 50,
  Max = 300,
}
