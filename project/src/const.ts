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
