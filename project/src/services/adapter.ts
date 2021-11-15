import { Offer, OfferResponse } from '../types/offer';
import { CommentGet, CommentGetResponse } from '../types/comment';
import { UserInfo, UserInfoResponse } from '../types/user';

export const adaptOfferToClient = (offer: OfferResponse): Offer => ({
  id: offer.id,
  bedrooms: offer.bedrooms,
  city: {
    location: {
      latitude: offer.city.location.latitude,
      longitude: offer.city.location.longitude,
      zoom: offer.city.location.zoom,
    },
    name: offer.city.name,
  },
  description: offer.description,
  goods: offer.goods,
  host: {
    avatarUrl: offer.host['avatar_url'],
    id: offer.host.id,
    isPro: offer.host['is_pro'],
    name: offer.host.name,
  },
  images: offer.images,
  isFavorite: offer['is_favorite'],
  isPremium: offer['is_premium'],
  location: {
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
    zoom: offer.location.zoom,
  },
  maxAdults: offer['max_adults'],
  previewImage: offer['preview_image'],
  price: offer.price,
  rating: offer.rating,
  title: offer.title,
  type: offer.type,

});

export const adaptOffersGroupToClient = (offers: OfferResponse[]): Offer[] => (
  offers.map(adaptOfferToClient)
);

export const adaptCommentToClient = (comment: CommentGetResponse): CommentGet => ({
  comment: comment.comment,
  date: comment.date,
  id: comment.id,
  rating: comment.rating,
  user: {
    avatarUrl: comment.user['avatar_url'],
    id: comment.user.id,
    isPro: comment.user['is_pro'],
    name: comment.user.name,
    email: comment.user.email,
  },
});

export const adaptCommentsGroupToClient = (comments: CommentGetResponse[]): CommentGet[] => (
  comments.map(adaptCommentToClient)
);

export const adaptAuthInfoToClient = (authInfo: UserInfoResponse): UserInfo => ({
  avatarUrl: authInfo['avatar_url'],
  id: authInfo.id,
  isPro: authInfo['is_pro'],
  name: authInfo.name,
  email: authInfo.email,
  token: authInfo.token,
});
