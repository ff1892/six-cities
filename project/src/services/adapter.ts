import { Offer, OfferResponse } from '../types/offer';

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
