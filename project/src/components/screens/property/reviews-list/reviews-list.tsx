import { CommentGet } from '../../../../types/comment';
import Review from '../review/review';

const MAX_REVIEWS_COUNT = 10;

type ReviewsListProps = {
  reviews: CommentGet[];
};

function ReviewsList({reviews} : ReviewsListProps): JSX.Element {
  const shownReviews = reviews.slice(0, MAX_REVIEWS_COUNT);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{shownReviews.length}</span></h2>
      <ul className="reviews__list">
        {
          shownReviews.map((review) => <Review key={review.id} review={review} />)
        }
      </ul>
    </>
  );
}

export default ReviewsList;
