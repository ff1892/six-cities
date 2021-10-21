import { Offer } from './types/offer';

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
