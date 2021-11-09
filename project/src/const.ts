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
} as const;

export const City = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
} as const;

export const SortingType = {
  Popularity: 'Popular',
  PriceDecrease: 'Price: high to low',
  PriceIncrease: 'Price: low to high',
  TopRated: 'Top rated first',
} as const;

export enum MessageLength {
  Min = 50,
  Max = 300,
}

export enum ToastMessages {
  UploadingError = 'Unable to upload a comment. Please, try again.',
  OffersError = 'Unable to load offers. Please, refresh the page.',
  NearbyOffersError = 'Unable to load offers nearby.',
  CommentsError = 'Unable to load reviews.',
  LoginError = 'Unable to sign in. Please, try again.'
}

export enum UploadStatus {
  Unknown = 'UNKNOWN',
  Posting = 'POSTING',
  Completed = 'COMPLETED',
  Error = 'ERROR',
}
