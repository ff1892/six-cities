import { Offer, OfferResponse } from '../types/offer';
import { CommentGet, CommentGetResponse } from '../types/comment';
import { UserInfo, UserInfoResponse } from '../types/user';

export const adaptOfferToClient = (offer: OfferResponse): Offer => {
  const adaptedOffer = Object.assign(
    offer,
    {},
    {
      host: {
        avatarUrl: offer.host['avatar_url'],
        id: offer.host['id'],
        isPro: offer.host['is_pro'],
        name: offer.host['name'],
      },
      isFavorite: offer['is_favorite'],
      isPremium: offer['is_premium'],
      maxAdults: offer['max_adults'],
      previewImage: offer['preview_image'],
    },
  );

  return adaptedOffer;
};

export const adaptOffersGroupToClient = (offers: OfferResponse[]): Offer[] => (
  offers.map(adaptOfferToClient)
);

const adaptCommentToClient = (comment: CommentGetResponse): CommentGet => {
  const adaptedComment = Object.assign(
    comment,
    {},
    {
      user: {
        avatarUrl: comment.user['avatar_url'],
        id: comment.user['id'],
        isPro: comment.user['is_pro'],
        name: comment.user['name'],
      },
    },
  );

  return adaptedComment;
};

export const adaptCommentsGorupToClient = (comments: CommentGetResponse[]): CommentGet[] => (
  comments.map(adaptCommentToClient)
);

export const adaptAuthInfoToClient = (authInfo: UserInfoResponse): UserInfo => {
  const adaptedAuthInfo = Object.assign(
    authInfo,
    {},
    {
      avatarUrl: authInfo['avatar_url'],
      id: authInfo['id'],
      isPro: authInfo['is_pro'],
      name: authInfo['name'],
      email: authInfo['email'],
      token: authInfo['token'],
    },
  );

  return adaptedAuthInfo;
};
