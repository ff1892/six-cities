import {
  Offer,
  Place,
  City,
  Host,
  HostResponse,
  OfferResponse
} from '../types/offer';

import {
  AuthorizationStatus,
  City as CitiesList,
  SortingType,
  UploadStatus
} from '../const';

import {
  CommentUser,
  CommentUserResponse,
  UserInfo,
  UserInfoResponse
} from '../types/user';

import { State } from '../types/state';
import { CommentGet, CommentGetResponse } from '../types/comment';
import { AuthData } from '../types/auth-data';
import { datatype, lorem, system, address, internet, name } from 'faker';

export const makeFakePlace = (): Place => ({
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  zoom: datatype.number(),
});

const makeFakeCity = (): City => ({
  name: address.city(),
  location: makeFakePlace(),
});

const makeFakeHost = (): Host => ({
  avatarUrl: internet.avatar(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: name.firstName(),
});

const makeFakeHostResponse = (): HostResponse => ({
  'avatar_url': internet.avatar(),
  id: datatype.number(),
  'is_pro': datatype.boolean(),
  name: name.firstName(),
});

export const makeFakeOffer = (): Offer => ({
  id: datatype.number(),
  bedrooms: datatype.number(),
  description: lorem.paragraph(),
  goods: [datatype.string(), datatype.string(), datatype.string()],
  images: [system.filePath(), system.filePath(), system.filePath()],
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  maxAdults: datatype.number(),
  previewImage:system.filePath(),
  price: datatype.number(),
  rating: datatype.number(),
  title: datatype.string(),
  type: lorem.word(),
  location: makeFakePlace(),
  city: makeFakeCity(),
  host: makeFakeHost(),
});

export const makeFakeOfferResponse = (): OfferResponse => ({
  id: datatype.number(),
  bedrooms: datatype.number(),
  description: lorem.paragraph(),
  goods: [datatype.string(), datatype.string(), datatype.string()],
  images: [system.filePath(), system.filePath(), system.filePath()],
  'is_favorite': datatype.boolean(),
  'is_premium': datatype.boolean(),
  'max_adults': datatype.number(),
  'preview_image':system.filePath(),
  price: datatype.number(),
  rating: datatype.number(),
  title: datatype.string(),
  type: lorem.word(),
  location: makeFakePlace(),
  city: makeFakeCity(),
  host: makeFakeHostResponse(),
});

export const makeFakeOffers = (): Offer[] => (
  new Array(3).fill(null).map(makeFakeOffer)
);

export const makeFakeOffersResponse = (): OfferResponse[] => (
  new Array(3).fill(null).map(makeFakeOfferResponse)
);

export const makeFakeUser = (): CommentUser => ({
  avatarUrl: internet.avatar(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: name.firstName(),
  email: internet.email(),
});

export const makeFakeUserResponse = (): CommentUserResponse => ({
  'avatar_url': internet.avatar(),
  id: datatype.number(),
  'is_pro': datatype.boolean(),
  name: name.firstName(),
  email: internet.email(),
});

export const makeFakeUserInfo = (): UserInfo => (
  Object.assign(
    {},
    makeFakeUser(),
    {token: datatype.string()},
  )
);

export const makeFakeUserInfoResponse = (): UserInfoResponse => (
  Object.assign(
    {},
    makeFakeUserResponse(),
    {token: datatype.string()},
  )
);

export const makeFakeAuthData = (): AuthData => ({
  login: internet.email(),
  password: internet.password(),
});

export const makeFakeComment = (): CommentGet => ({
  comment: datatype.string(),
  date: datatype.datetime().toString(),
  id: datatype.number(),
  rating: datatype.number(),
  user: makeFakeUser(),
});

export const makeFakeCommentResponse = (): CommentGetResponse => ({
  comment: datatype.string(),
  date: datatype.datetime().toString(),
  id: datatype.number(),
  rating: datatype.number(),
  user: makeFakeUserResponse(),
});

export const makeFakeCommentsResponse = (): CommentGetResponse[] => (
  new Array(3).fill(null).map(makeFakeCommentResponse)
);

export const getFakeStore = (authStatus: AuthorizationStatus): State => ({
  DATA_OFFERS: {
    offers: makeFakeOffers(),
    isOffersLoaded: true,
  },
  DATA_CURRENT_OFFER: {
    currentOffer: makeFakeOffer(),
    isCurrentOfferLoaded: true,
    isCurrentOfferError: false,
  },
  DATA_COMMENTS: {
    currentOfferComments: [],
    isCommentsLoaded: true,
    uploadCommentStatus: UploadStatus.Completed,
  },
  DATA_NEARBY: {
    nearbyOffers: [],
    isNearbyOffersLoaded: true,
  },
  DATA_FAVORITES: {
    favoriteOffers: [],
    isFavoriteOffersLoaded: true,
  },
  USER: {
    authorizationStatus: authStatus,
    userInfo: null,
    uploadUserInfoStatus: UploadStatus.Unknown,
  },
  STATE: {
    selectedCity: CitiesList.Paris,
    currentSorting: SortingType.Popularity,
  },
});
