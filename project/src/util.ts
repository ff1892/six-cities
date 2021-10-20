const RATING_RER_STAR = 20;

export const getStarsRatingStyle = (rating: number): string => {
  const ratingInPercent = Math.round(rating) * RATING_RER_STAR;
  return `${ratingInPercent.toString()}%`;
};
