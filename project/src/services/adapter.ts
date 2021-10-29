import { Offer, OfferResponse } from '../types/offer';
import { CommentGet, CommentGetResponse } from '../types/comment';

export const adaptOfferToClient = (offer: OfferResponse): Offer => (
  Object.assign(
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
  )
);

export const adaptOffersGroupToClient = (offers: OfferResponse[]): Offer[] => (
  offers.map(adaptOfferToClient)
);

const adaptCommentToClient = (comment: CommentGetResponse): CommentGet => (
  Object.assign(
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
  )
);

export const adaptCommentsGorupToClient = (comments: CommentGetResponse[]): CommentGet[] => (
  comments.map(adaptCommentToClient)
);
