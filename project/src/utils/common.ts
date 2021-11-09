import { Offer } from '../types/offer';
import { CommentGet } from '../types/comment';
import { MessageLength, SortingType } from '../const';

const RATING_RER_STAR = 20;

export const getRandomInteger = (a: number, b: number): number => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayValue = (array: string[]): string => (
  array[getRandomInteger(0, array.length - 1)]
);

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
    case (SortingType.PriceIncrease):
      return [...offers].sort((a, b) => a.price - b.price);
    case (SortingType.PriceDecrease):
      return [...offers].sort((a, b) => b.price - a.price);
    case (SortingType.TopRated):
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

export const sortCommentsByDateDown = (comments: CommentGet[]): CommentGet[] => (
  [...comments].sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date))
);

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
  const passwordReg = /^(?=.*[0-9])(?=.*[a-zA-Z])\w{2,}$/;
  if (passwordReg.test(password)) {
    return '';
  }
  return 'Password must contain at least 1 letter and 1 number.\n No spaces allowed';
};
