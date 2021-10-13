export enum AppRoute {
  Main = '/',
  MainEmpty = '/main-empty',
  SignIn = '/login',
  Favorites = '/favorites',
  FavoritesEmpty = '/favorites-empty',
  Offers = '/offer/:id',
  Offer = '/offer/',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const MAX_RATING = 5;

export enum RatingNames {
  rate1 = 'terribly',
  rate2 = 'badly',
  rate3 = 'not bad',
  rate4 = 'good',
  rate5 = 'perfect',
}
