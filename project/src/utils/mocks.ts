import { Offer, Place, City, Host } from '../types/offer';
import { CommentUser, UserInfo } from '../types/user';
import { CommentGet } from '../types/comment';
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

export const makeFakeUser = (): CommentUser => ({
  avatarUrl: internet.avatar(),
  id: datatype.number(),
  isPro: datatype.boolean(),
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
