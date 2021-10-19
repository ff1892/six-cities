import { CommentGet } from '../../../../types/comment';
import { getStarsRatingStyle } from '../../../../util';

type ReviewProps = {
  review: CommentGet;
}

function Review({review}: ReviewProps): JSX.Element {
  const {comment, date, rating, user} = review;
  const {avatarUrl, name} = user;

  const getDisplayedDate = (currentDate: string): string => (
    new Date(currentDate).toLocaleString('en-GB', { month: 'short', year: '2-digit' })
  );

  const getAttributedDate = (currentDate: string): string => (
    new Date(currentDate).toLocaleString('en-CA')
  );

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt={`${name} avatar`} />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span
              style={{
                width: `${getStarsRatingStyle(rating)}`,
              }}
            />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={getAttributedDate(date)}>{getDisplayedDate(date)}</time>
      </div>
    </li>
  );
}

export default Review;
