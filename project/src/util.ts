import { Offer } from './types/offer';
import { AuthorizationStatus } from './const';

const RATING_RER_STAR = 20;

export const getStarsRatingStyle = (rating: number): string => {
  const ratingInPercent = Math.round(rating) * RATING_RER_STAR;
  return `${ratingInPercent.toString()}%`;
};

export const getDisplayedDate = (currentDate: string): string => (
  new Date(currentDate).toLocaleString('en-GB', { month: 'short', year: '2-digit' })
);

export const getAttributedDate = (currentDate: string): string => (
  new Date(currentDate).toLocaleString('en-CA')
);

export const filterOffersByCity = (offers: Offer[], city: string): Offer[] => (
  offers.filter((offer) => offer.city.name === city)
);

export const sortOffers = (sortingType: string, offers: Offer[]): Offer[] => {
  switch (sortingType) {
    case ('Price: low to high'):
      return [...offers].sort((a, b) => a.price - b.price);
    case ('Price: high to low'):
      return [...offers].sort((a, b) => b.price - a.price);
    case ('Top rated first'):
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;
