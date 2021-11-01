import { Offer } from './types/offer';
import { MessageLength } from './const';

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

export const updateOffersList = (offers: Offer[], updatedOffer: Offer): Offer[] => {
  const indexUpdate = offers.findIndex((offer) => offer.id === updatedOffer.id);
  if (indexUpdate === -1) {
    return offers;
  }

  return [
    ...offers.slice(0, indexUpdate),
    updatedOffer,
    ...offers.slice(indexUpdate + 1, offers.length),
  ];
};

export const updateFavoriteOffersList = (offers: Offer[], updatedOffer: Offer): Offer[] => {
  const indexUpdate = offers.findIndex((offer) => offer.id === updatedOffer.id);
  if (indexUpdate === -1) {
    return [...offers, updatedOffer];
  }
  return [
    ...offers.slice(0, indexUpdate),
    ...offers.slice(indexUpdate + 1, offers.length),
  ];
};

export const updateCurrentOffer = (offer: Offer, updatedOffer: Offer): Offer => {
  if (offer.id !== updatedOffer.id) {
    return offer;
  }
  return updatedOffer;
};

export const validateReviewForm = (text: string, rating: number): boolean => (
  text.length >= MessageLength.Min && text.length <= MessageLength.Max && Boolean(rating)
);

export const validatePassword = (password: string): string => {
  const passReg = /^(?=.*[0-9])(?=.*[a-zA-Z])\w{2,}$/;
  if (passReg.test(password)) {
    return '';
  }
  return 'Password must contain at least 1 letter and 1 number. No spaces allowed';

};
